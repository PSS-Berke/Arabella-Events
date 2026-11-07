// Contact form backend (Nov 2026, replaces FormSubmit). Validates the inquiry,
// emails it to Arabella through the Resend REST API, then sends the couple an
// auto-reply. Plain fetch, no npm dependency. Configure in Vercel or .env.local:
//   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL

const EMAIL_RE = /^.+@.+\.[a-zA-Z]{2,63}$/;

// Mirrors CONTACT_FIELDS in lib/contact-content.js (kept dependency-free so the
// route has no client-side imports). `optional` fields may be blank.
const FIELDS = [
  { key: 'names', label: 'Names', max: 300 },
  { key: 'email', label: 'Email', max: 250 },
  { key: 'phone', label: 'Phone', max: 50 },
  { key: 'venueDate', label: 'Venue & date', max: 300 },
  { key: 'guestCount', label: 'Guest count', max: 100 },
  { key: 'budget', label: 'Overall wedding budget', max: 100 },
  { key: 'packages', label: 'Interested in', max: 100 },
  { key: 'referral', label: 'How did you hear about us?', max: 150, optional: true },
  { key: 'vision', label: 'Their vision', max: 5000, optional: true },
];

const SEND_FAILURE =
  'We could not send your message right now. Please try again, or email us directly at arabella@arabellasweddings.com.';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Honeypot: a hidden field real visitors never fill. Pretend success so bots
  // don't retry, but send nothing.
  if (typeof body?.website === 'string' && body.website.trim()) {
    return Response.json({ ok: true });
  }

  const values = {};
  for (const field of FIELDS) {
    const raw = body?.[field.key];
    const value = typeof raw === 'string' ? raw.trim() : '';
    if (!value) {
      if (field.optional) {
        values[field.key] = '';
        continue;
      }
      return Response.json({ error: `"${field.label}" is required.` }, { status: 400 });
    }
    if (value.length > field.max) {
      return Response.json({ error: `"${field.label}" is too long.` }, { status: 400 });
    }
    values[field.key] = value;
  }
  if (!EMAIL_RE.test(values.email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return Response.json(
      {
        error:
          'The contact form is not set up yet. Please email us directly at arabella@arabellasweddings.com.',
      },
      { status: 503 }
    );
  }

  const text = FIELDS.map((field) => `${field.label}\n${values[field.key] || '(not given)'}`).join('\n\n');

  const send = (email) =>
    fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: CONTACT_FROM_EMAIL, ...email }),
    });

  // 1. The inquiry to Arabella. This one must succeed.
  let res;
  try {
    res = await send({
      to: [CONTACT_TO_EMAIL],
      reply_to: values.email,
      subject: `New inquiry from ${values.names} — arabellasweddings.com contact form`,
      text,
    });
  } catch {
    return Response.json({ error: SEND_FAILURE }, { status: 502 });
  }
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    console.error('Contact form: Resend rejected the inquiry email', res.status, detail);
    return Response.json({ error: SEND_FAILURE }, { status: 502 });
  }

  // 2. The auto-reply to the couple. Best effort: the inquiry already reached
  // Arabella, so a failure here is logged but doesn't fail the form.
  try {
    const reply = await send({
      to: [values.email],
      reply_to: CONTACT_TO_EMAIL,
      subject: 'We received your inquiry — Arabella’s Weddings & Events',
      text: autoReplyText(values),
    });
    if (!reply.ok) console.error('Contact form: auto-reply failed', reply.status, await reply.text().catch(() => ''));
  } catch (err) {
    console.error('Contact form: auto-reply failed', err);
  }

  return Response.json({ ok: true });
}

function autoReplyText(values) {
  return [
    `Hi ${values.names},`,
    '',
    'Thank you so much for reaching out! Your inquiry came through, and I can’t wait to hear more about your celebration.',
    '',
    'I personally read every message and will be in touch within 48 hours. In the meantime, feel free to reply to this email with any photos, inspiration, or questions.',
    '',
    'Here’s what you sent us:',
    '',
    summaryText(values),
    '',
    'Warmly,',
    'Arabella',
    'Arabella’s Weddings & Events',
    'arabellasweddings.com',
  ].join('\n');
}

function summaryText(values) {
  return FIELDS.map((field) => `${field.label}: ${values[field.key] || '(not given)'}`).join('\n');
}
