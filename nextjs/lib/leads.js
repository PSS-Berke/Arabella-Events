// Lead storage for the /admin page (server only), in a Neon Postgres database.
// The connection string (DATABASE_URL) is added to the project automatically
// when Neon is connected through Vercel's Storage tab. The table creates
// itself on first use, so there is no separate migration step.
import { neon } from '@neondatabase/serverless';

function db() {
  return neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

export function leadsConfigured() {
  return Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

let tableReady;
function ensureTable(sql) {
  tableReady ??= sql`
    CREATE TABLE IF NOT EXISTS leads (
      id          bigserial PRIMARY KEY,
      created_at  timestamptz NOT NULL DEFAULT now(),
      names       text NOT NULL,
      email       text NOT NULL,
      phone       text,
      venue_date  text,
      guest_count text,
      budget      text,
      packages    text,
      referral    text,
      vision      text,
      contacted   boolean NOT NULL DEFAULT false
    )`.catch((err) => {
    tableReady = undefined; // retry on the next request
    throw err;
  });
  return tableReady;
}

export async function saveLead(v) {
  const sql = db();
  await ensureTable(sql);
  const [row] = await sql`
    INSERT INTO leads (names, email, phone, venue_date, guest_count, budget, packages, referral, vision)
    VALUES (${v.names}, ${v.email}, ${v.phone}, ${v.venueDate}, ${v.guestCount}, ${v.budget}, ${v.packages}, ${v.referral || null}, ${v.vision || null})
    RETURNING id`;
  return row.id;
}

export async function listLeads() {
  const sql = db();
  await ensureTable(sql);
  const rows = await sql`SELECT * FROM leads ORDER BY created_at DESC`;
  return rows.map((r) => ({
    id: String(r.id),
    createdAt: new Date(r.created_at).toISOString(),
    names: r.names,
    email: r.email,
    phone: r.phone,
    venueDate: r.venue_date,
    guestCount: r.guest_count,
    budget: r.budget,
    packages: r.packages,
    referral: r.referral,
    vision: r.vision,
    contacted: r.contacted,
  }));
}

function toId(id) {
  if (!/^\d{1,18}$/.test(String(id))) throw new Error('Invalid lead id');
  return String(id);
}

export async function setContacted(id, contacted) {
  const sql = db();
  await sql`UPDATE leads SET contacted = ${Boolean(contacted)} WHERE id = ${toId(id)}`;
}

export async function deleteLead(id) {
  const sql = db();
  await sql`DELETE FROM leads WHERE id = ${toId(id)}`;
}
