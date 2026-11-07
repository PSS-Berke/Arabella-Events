// Blog posts (server only). Since Nov 2026 the posts live in the Neon
// database so Arabella can write and edit them at /admin/blog. The first time
// the table is created it is filled from lib/blog-content.js, which also stays
// as the fallback if the database is ever unreachable (or not configured, as
// in local development without a DATABASE_URL).
import { neon } from '@neondatabase/serverless';
import { POSTS as SEED_POSTS } from '@/lib/blog-content';

export const POSTS_TAG = 'posts';
export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function dbUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL;
}

export function postsDbConfigured() {
  return Boolean(dbUrl());
}

// Public pages read through Next's data cache (tagged so a save refreshes
// them at once); the admin always reads fresh.
function db({ fresh = false } = {}) {
  return neon(dbUrl(), {
    fetchOptions: fresh ? { cache: 'no-store' } : { next: { tags: [POSTS_TAG], revalidate: 3600 } },
  });
}

let ready;
function ensureTables() {
  ready ??= (async () => {
    const sql = db({ fresh: true });
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        slug         text PRIMARY KEY,
        status       text NOT NULL DEFAULT 'draft',
        title        text NOT NULL,
        couple       text NOT NULL DEFAULT '',
        location     text NOT NULL DEFAULT '',
        date         text NOT NULL,
        excerpt      text NOT NULL DEFAULT '',
        description  text,
        cover        jsonb,
        photographer jsonb,
        vendors      jsonb NOT NULL DEFAULT '[]',
        press        jsonb NOT NULL DEFAULT '[]',
        photos       jsonb NOT NULL DEFAULT '[]',
        body         text NOT NULL DEFAULT '',
        published_at timestamptz,
        created_at   timestamptz NOT NULL DEFAULT now(),
        updated_at   timestamptz NOT NULL DEFAULT now()
      )`;
    await sql`CREATE TABLE IF NOT EXISTS site_meta (key text PRIMARY KEY, value text)`;
    // Copy the hand-written posts in exactly once, so deleting every post
    // later never brings them back.
    const [seeded] = await sql`SELECT value FROM site_meta WHERE key = 'posts_seeded'`;
    if (!seeded) {
      for (const p of SEED_POSTS) {
        await sql`
          INSERT INTO posts (slug, status, title, couple, location, date, excerpt, description, cover, photographer, vendors, press, photos, body, published_at)
          VALUES (${p.slug}, 'published', ${p.title}, ${p.couple || ''}, ${p.location || ''}, ${p.date}, ${p.excerpt || ''},
                  ${p.description || null}, ${p.cover ? JSON.stringify(p.cover) : null}, ${p.photographer ? JSON.stringify(p.photographer) : null},
                  ${JSON.stringify(p.vendors || [])}, ${JSON.stringify(p.press || [])}, ${JSON.stringify(p.photos || [])}, ${p.body || ''}, now())
          ON CONFLICT (slug) DO NOTHING`;
      }
      await sql`INSERT INTO site_meta (key, value) VALUES ('posts_seeded', ${new Date().toISOString()}) ON CONFLICT (key) DO NOTHING`;
    }
  })().catch((err) => {
    ready = undefined; // try again on the next request
    throw err;
  });
  return ready;
}

function rowToPost(r) {
  return {
    slug: r.slug,
    status: r.status,
    title: r.title,
    couple: r.couple,
    location: r.location,
    date: r.date,
    excerpt: r.excerpt,
    ...(r.description ? { description: r.description } : {}),
    cover: r.cover || null,
    ...(r.photographer ? { photographer: r.photographer } : {}),
    vendors: r.vendors || [],
    ...(r.press?.length ? { press: r.press } : {}),
    photos: r.photos || [],
    body: r.body,
    updatedAt: r.updated_at ? new Date(r.updated_at).toISOString() : null,
    publishedAt: r.published_at ? new Date(r.published_at).toISOString() : null,
  };
}

const byDateDesc = (a, b) => b.date.localeCompare(a.date);

/** Published posts, newest first, for the public site. */
export async function getPublishedPosts() {
  if (!postsDbConfigured()) return SEED_POSTS;
  // No table setup here: the admin creates and fills the table. Until then
  // (or if the database is down) the built-in posts show, which are the same.
  try {
    const rows = await db()`SELECT * FROM posts WHERE status = 'published' ORDER BY date DESC, created_at DESC`;
    return rows.map(rowToPost);
  } catch (err) {
    if (err?.digest === 'DYNAMIC_SERVER_USAGE') throw err; // Next's own signal, not a failure
    console.error('Blog: database unavailable, showing built-in posts', err?.message || err);
    return SEED_POSTS;
  }
}

export async function getPublishedPost(slug) {
  const posts = await getPublishedPosts();
  return posts.find((p) => p.slug === slug) || null;
}

// ---- Admin ---------------------------------------------------------------

export async function listAllPosts() {
  await ensureTables();
  const rows = await db({ fresh: true })`SELECT * FROM posts ORDER BY date DESC, created_at DESC`;
  return rows.map(rowToPost).sort(byDateDesc);
}

export async function getPostForEdit(slug) {
  await ensureTables();
  const [row] = await db({ fresh: true })`SELECT * FROM posts WHERE slug = ${slug}`;
  return row ? rowToPost(row) : null;
}

export async function slugTaken(slug) {
  await ensureTables();
  const [row] = await db({ fresh: true })`SELECT 1 FROM posts WHERE slug = ${slug}`;
  return Boolean(row);
}

/**
 * Create or update a post. `originalSlug` is null for a new post. A draft
 * can change its slug; once a post has been published its web address is
 * kept so links to it never break.
 */
export async function savePost(originalSlug, p) {
  await ensureTables();
  const sql = db({ fresh: true });
  const json = (v) => (v == null ? null : JSON.stringify(v));
  if (!originalSlug) {
    await sql`
      INSERT INTO posts (slug, status, title, couple, location, date, excerpt, description, cover, photographer, vendors, press, photos, body, published_at)
      VALUES (${p.slug}, ${p.status}, ${p.title}, ${p.couple}, ${p.location}, ${p.date}, ${p.excerpt}, ${p.description},
              ${json(p.cover)}, ${json(p.photographer)}, ${json(p.vendors)}, ${json(p.press)}, ${json(p.photos)}, ${p.body},
              ${p.status === 'published' ? new Date().toISOString() : null})`;
    return p.slug;
  }
  await sql`
    UPDATE posts SET
      slug = CASE WHEN published_at IS NULL THEN ${p.slug} ELSE slug END,
      status = ${p.status}, title = ${p.title}, couple = ${p.couple}, location = ${p.location}, date = ${p.date},
      excerpt = ${p.excerpt}, description = ${p.description}, cover = ${json(p.cover)}, photographer = ${json(p.photographer)},
      vendors = ${json(p.vendors)}, body = ${p.body},
      published_at = CASE WHEN ${p.status} = 'published' AND published_at IS NULL THEN now() ELSE published_at END,
      updated_at = now()
    WHERE slug = ${originalSlug}`;
  const [row] = await sql`SELECT slug FROM posts WHERE slug IN (${originalSlug}, ${p.slug}) ORDER BY updated_at DESC LIMIT 1`;
  return row?.slug || originalSlug;
}

export async function deletePost(slug) {
  await ensureTables();
  await db({ fresh: true })`DELETE FROM posts WHERE slug = ${slug}`;
}
