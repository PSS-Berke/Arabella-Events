// Replacement backend for the live site's Wix Forms submission (which cannot
// migrate). Validates the payload and delivers it via the Resend REST API —
// plain fetch, no npm dependency. Configure in .env(.local):
//   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL

const EMAIL_RE = /^.+@.+\.[a-zA-Z]{2,63}$/;

// Mirrors CONTACT_FIELDS in lib/contact-content.js (kept dependency-free so the
// route has no client-side imports). All fields are required, as on live.
const FIELDS = [
  { key: 'names', label: 'First & Last Names', max: 5000 },
  { key: 'email', label: 'Email Address', max: 250 },
  { key: 'phone', label: 'Phone Number', max: 5000 },
  { key: 'venueDate', label: 'Venue & Date', max: 5000 },
  { key: 'guestCount', label: 'Guest Count?', max: 100 },
  { key: 'budget', label: 'Budget?', max: 100 },
  { key: 'packages', label: 'Which packages are you most interested in?', max: 100 },
  { key: 'referral', label: 'How did you hear about us?', max: 150 },
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

  const text = FIELDS.map((field) => `${field.label}\n${values[field.key]}`).join('\n\n');

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
