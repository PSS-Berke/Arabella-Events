// Replacement backend for the live site's Wix Forms submission (which cannot
// migrate). Validates the payload and delivers it via the Resend REST API —
// plain fetch, no npm dependency. Configure in .env(.local):
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

  let res;
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: values.email,
        subject: `New inquiry from ${values.names} — arabellasweddings.com contact form`,
        text,
      }),
    });
  } catch {
    return Response.json({ error: SEND_FAILURE }, { status: 502 });
  }

  if (!res.ok) {
    return Response.json({ error: SEND_FAILURE }, { status: 502 });
  }

  return Response.json({ ok: true });
}
