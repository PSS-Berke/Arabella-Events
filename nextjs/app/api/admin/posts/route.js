import { revalidatePath, revalidateTag } from 'next/cache';
import { isAdmin } from '@/lib/admin-auth';
import { DATE_RE, POSTS_TAG, SLUG_RE, deletePost, getPostForEdit, savePost, slugTaken } from '@/lib/posts';

// Save (POST) or delete (DELETE) a blog post from /admin/blog. Admin only.

const PHOTO_SRC = /^(\/media\/\S+|https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\/\S+)$/;
const str = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const httpUrl = (v) => {
  const s = str(v, 500);
  return /^https?:\/\/\S+$/.test(s) ? s : '';
};

function refreshPublicPages(...slugs) {
  revalidateTag(POSTS_TAG);
  revalidatePath('/');
  revalidatePath('/blog');
  revalidatePath('/sitemap.xml');
  for (const slug of slugs) if (slug) revalidatePath(`/blog/${slug}`);
}

function clean(body) {
  const errors = [];
  const title = str(body.title, 200);
  const slug = str(body.slug, 120).toLowerCase();
  const date = str(body.date, 10);
  if (!title) errors.push('Add a title.');
  if (!SLUG_RE.test(slug)) errors.push('The web address can only use lowercase letters, numbers and dashes.');
  if (!DATE_RE.test(date)) errors.push('Choose the wedding date.');

  let cover = null;
  if (body.cover?.src) {
    const c = body.cover;
    if (!PHOTO_SRC.test(c.src) || !(c.width > 0) || !(c.height > 0)) errors.push('The cover photo could not be read. Try uploading it again.');
    else cover = { src: c.src, alt: str(c.alt, 300), width: Math.round(c.width), height: Math.round(c.height) };
  }

  const photographerName = str(body.photographer?.name, 120);
  const photographer = photographerName ? { name: photographerName, ...(httpUrl(body.photographer?.url) && { url: httpUrl(body.photographer.url) }) } : null;

  const vendors = (Array.isArray(body.vendors) ? body.vendors : [])
    .slice(0, 40)
    .map((v) => ({ role: str(v?.role, 120), name: str(v?.name, 160), ...(httpUrl(v?.url) && { url: httpUrl(v.url) }) }))
    .filter((v) => v.role && v.name);

  return {
    errors,
    post: {
      slug,
      title,
      date,
      status: body.status === 'published' ? 'published' : 'draft',
      couple: str(body.couple, 160),
      location: str(body.location, 200),
      excerpt: str(body.excerpt, 600),
      description: str(body.description, 300) || null,
      cover,
      photographer,
      vendors,
      press: [],
      photos: [],
      body: typeof body.body === 'string' ? body.body.slice(0, 100000) : '',
    },
  };
}

export async function POST(request) {
  if (!isAdmin()) return Response.json({ error: 'Please log in again.' }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (!body) return Response.json({ error: 'Invalid request.' }, { status: 400 });

  const { errors, post } = clean(body);
  if (errors.length) return Response.json({ error: errors.join(' ') }, { status: 400 });

  const originalSlug = typeof body.originalSlug === 'string' && body.originalSlug ? body.originalSlug : null;
  try {
    let existing = null;
    if (originalSlug) {
      existing = await getPostForEdit(originalSlug);
      if (!existing) return Response.json({ error: 'That post no longer exists.' }, { status: 404 });
      // Keep fields the editor doesn't show (press links, end-of-post photo grid).
      post.press = existing.press || [];
      post.photos = existing.photos || [];
      if (existing.publishedAt) post.slug = existing.slug; // published addresses never change
    }
    if (post.slug !== originalSlug && (await slugTaken(post.slug))) {
      return Response.json({ error: 'Another post already uses that web address. Change it slightly.' }, { status: 409 });
    }
    const slug = await savePost(originalSlug, post);
    refreshPublicPages(slug, originalSlug);
    const saved = await getPostForEdit(slug);
    return Response.json({ ok: true, post: saved });
  } catch (err) {
    console.error('Admin: could not save post', err);
    return Response.json({ error: 'Could not save the post. Please try again.' }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!isAdmin()) return Response.json({ error: 'Please log in again.' }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const slug = str(body?.slug, 120);
  if (!SLUG_RE.test(slug)) return Response.json({ error: 'Invalid post.' }, { status: 400 });
  try {
    await deletePost(slug);
    refreshPublicPages(slug);
    return Response.json({ ok: true });
  } catch (err) {
    console.error('Admin: could not delete post', err);
    return Response.json({ error: 'Could not delete the post.' }, { status: 500 });
  }
}
