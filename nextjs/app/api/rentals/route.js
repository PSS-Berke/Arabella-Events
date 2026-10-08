// Online rental reservations ("reserve now, pay later") from /rentals.
// Re-checks every item, quantity and price against lib/rentals-content.js so
// the emailed total can't be edited in the browser, then delivers the request
// through Resend exactly like the contact form (same env vars — see
// app/api/contact/route.js and .env.example). Nothing is charged.

import { RENTALS } from '@/lib/rentals-content';

const EMAIL_RE = /^.+@.+\.[a-zA-Z]{2,63}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_UNKNOWN = 100; // matches components/RentalReservation.js

const SEND_FAILURE =
  'We could not send your reservation right now. Please try again, or email us directly at arabella@arabellasweddings.com.';

const text = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const money = (n) => `$${n.toLocaleString('en-US')}`;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const name = text(body?.name, 200);
  const email = text(body?.email, 250);
  const phone = text(body?.phone, 50);
  const date = text(body?.date, 10);
  const venue = text(body?.venue, 500);

  if (!name || !email || !phone || !date) {
    return Response.json({ error: 'Please fill in your name, email, phone, and event date.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }
  if (!DATE_RE.test(date) || Number.isNaN(Date.parse(`${date}T12:00:00Z`))) {
    return Response.json({ error: 'Please choose a valid event date.' }, { status: 400 });
  }

  const requested = Array.isArray(body?.items) ? body.items.slice(0, RENTALS.length) : [];
  const lines = [];
  for (const r of requested) {
    const item = RENTALS.find((it) => it.name === r?.name && typeof it.unitPrice === 'number');
    const qty = Number.parseInt(r?.qty, 10);
    const addOn = item?.addOn ? Number.parseInt(r?.addOn, 10) || 0 : 0;
    if (!item || !(qty > 0) || qty > (item.available ?? MAX_UNKNOWN) || addOn < 0 || addOn > qty) {
      return Response.json({ error: 'One of the items in your reservation is no longer valid. Please refresh and try again.' }, { status: 400 });
    }
    lines.push({ item, qty, addOn, subtotal: qty * item.unitPrice + addOn * (item.addOn?.unitPrice ?? 0) });
  }
  if (!lines.length) {
    return Response.json({ error: 'Please choose at least one item.' }, { status: 400 });
  }
  const total = lines.reduce((n, l) => n + l.subtotal, 0);

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    return Response.json(
      { error: 'Online reservations are not set up yet. Please email us directly at arabella@arabellasweddings.com.' },
      { status: 503 }
    );
  }

  const itemText = lines
    .map((l) => {
      const add = l.addOn ? ` + ${l.addOn} × ${l.item.addOn.name} @ ${money(l.item.addOn.unitPrice)}` : '';
      return `${l.qty} × ${l.item.name} @ ${money(l.item.unitPrice)}${add} = ${money(l.subtotal)}`;
    })
    .join('\n');

  const emailText = [
    `Event date\n${date}`,
    `Name\n${name}`,
    `Email\n${email}`,
    `Phone\n${phone}`,
    `Venue / delivery address\n${venue || '(not given)'}`,
    `Items\n${itemText}`,
    `Total (before delivery or extras)\n${money(total)}`,
    'Nothing was charged. Confirm availability and send an invoice.',
  ].join('\n\n');

  let res;
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Rental reservation for ${date} from ${name} — ${money(total)}`,
        text: emailText,
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
