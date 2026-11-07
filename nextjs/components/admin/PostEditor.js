'use client';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { upload } from '@vercel/blob/client';
import PostBody from '@/components/PostBody';
import PostCover from '@/components/PostCover';

// The blog editor at /admin/blog. Writes the same simple Markdown the posts
// have always used (see components/PostBody.js), with buttons for headings,
// emphasis, dividers and photos so Arabella never has to type the syntax.

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const LABEL = 'mb-1.5 block text-[10.5px] uppercase tracking-[0.2em] text-[#80695a]';
const INPUT =
  'block w-full border border-[#e0d6ca] bg-white px-3.5 py-2.5 text-[15px] font-light text-[#443221] outline-none transition-colors placeholder:text-[#b3a597] focus:border-[#443221]';
const TOOL =
  'cursor-pointer border border-[#e0d6ca] bg-white px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[#443221] transition-colors hover:border-[#443221] disabled:cursor-default disabled:opacity-50';
const PRIMARY =
  'cursor-pointer border border-[#443221] bg-[#443221] px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-transparent hover:text-[#443221] disabled:cursor-default disabled:opacity-50';
const SECONDARY =
  'cursor-pointer border border-[#443221] bg-white px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#443221] transition-colors hover:bg-[#443221] hover:text-white disabled:cursor-default disabled:opacity-50';

const BLANK = {
  slug: '',
  status: 'draft',
  title: '',
  couple: '',
  location: '',
  date: '',
  excerpt: '',
  description: '',
  cover: null,
  photographer: { name: '', url: '' },
  vendors: [{ role: 'Planning & Design', name: 'Arabella’s Weddings & Events', url: '' }],
  body: '',
  publishedAt: null,
};

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/, '');
}

function formatDate(iso) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso || '')) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

function fromPost(p) {
  if (!p) return BLANK;
  return {
    ...BLANK,
    ...p,
    description: p.description || '',
    photographer: { name: p.photographer?.name || '', url: p.photographer?.url || '' },
    vendors: (p.vendors || []).map((v) => ({ role: v.role || '', name: v.name || '', url: v.url || '' })),
  };
}

async function readSize(file) {
  try {
    const bmp = await createImageBitmap(file);
    const size = { width: bmp.width, height: bmp.height };
    bmp.close?.();
    return size;
  } catch {
    return await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }
}

function uploadName(file, slug) {
  const base = file.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'photo';
  const ext = (file.name.match(/\.(jpe?g|png|webp)$/i)?.[1] || 'jpg').toLowerCase();
  return `blog/${slug || 'draft'}/${base}.${ext}`;
}

export default function PostEditor({ initial }) {
  const router = useRouter();
  const [post, setPost] = useState(() => fromPost(initial));
  const [originalSlug, setOriginalSlug] = useState(initial?.slug || null);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [tab, setTab] = useState('write');
  const [busy, setBusy] = useState('');
  const [message, setMessage] = useState(null); // { kind: 'error' | 'ok', text }
  const [dirty, setDirty] = useState(false);
  const bodyRef = useRef(null);
  const photoInput = useRef(null);
  const coverInput = useRef(null);
  const pendingSelection = useRef(null);

  // After a toolbar edit re-renders the story, put the cursor (or selection)
  // where the edit wants it, e.g. over "Section heading" ready to type over.
  useLayoutEffect(() => {
    const sel = pendingSelection.current;
    const el = bodyRef.current;
    if (!sel || !el) return;
    pendingSelection.current = null;
    el.focus();
    el.setSelectionRange(sel[0], sel[1]);
  }, [post.body]);

  const wasPublished = Boolean(post.publishedAt);
  const isNew = !originalSlug;

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  function set(field, value) {
    setDirty(true);
    setPost((p) => {
      const next = { ...p, [field]: value };
      if (field === 'title' && !slugTouched && !wasPublished) next.slug = slugify(value);
      return next;
    });
  }

  // ---- Body editing helpers ------------------------------------------------

  function edit(fn) {
    const el = bodyRef.current;
    if (!el) return;
    const { selectionStart: start, selectionEnd: end, value } = el;
    const { text, selStart, selEnd } = fn(value, start, end);
    pendingSelection.current = [selStart, selEnd];
    setDirty(true);
    setPost((p) => ({ ...p, body: text }));
  }

  // Put a block (heading, divider, photo) on its own paragraph at the cursor.
  function insertBlock(block, selectFrom, selectTo) {
    edit((value, start) => {
      const before = value.slice(0, start).replace(/\s*$/, '');
      const after = value.slice(start).replace(/^\s*/, '');
      const lead = before ? `${before}\n\n` : '';
      const text = `${lead}${block}${after ? `\n\n${after}` : '\n'}`;
      const at = lead.length;
      return { text, selStart: at + (selectFrom ?? block.length), selEnd: at + (selectTo ?? block.length) };
    });
  }

  function heading(prefix, placeholder) {
    edit((value, start, end) => {
      const chosen = value.slice(start, end).trim();
      const label = chosen || placeholder;
      const before = value.slice(0, start).replace(/\s*$/, '');
      const after = value.slice(end).replace(/^\s*/, '');
      const lead = before ? `${before}\n\n` : '';
      const text = `${lead}${prefix}${label}${after ? `\n\n${after}` : '\n'}`;
      const at = lead.length + prefix.length;
      return { text, selStart: at, selEnd: at + label.length };
    });
  }

  function wrap(mark, placeholder) {
    edit((value, start, end) => {
      const chosen = value.slice(start, end) || placeholder;
      const text = value.slice(0, start) + mark + chosen + mark + value.slice(end);
      return { text, selStart: start + mark.length, selEnd: start + mark.length + chosen.length };
    });
  }

  async function uploadFiles(files) {
    const list = [...files].filter((f) => /^image\/(jpeg|png|webp)$/.test(f.type));
    if (!list.length) return [];
    const done = [];
    for (const file of list) {
      const size = await readSize(file);
      const blob = await upload(uploadName(file, post.slug), file, { access: 'public', handleUploadUrl: '/api/admin/upload' });
      done.push({ src: blob.url, ...size });
    }
    return done;
  }

  async function addPhotos(e) {
    const files = e.target.files;
    e.target.value = '';
    if (!files?.length) return;
    setBusy(files.length > 1 ? `Uploading ${files.length} photos…` : 'Uploading photo…');
    setMessage(null);
    try {
      const photos = await uploadFiles(files);
      // Two photos together sit side by side on the post.
      const placeholder = 'Describe the photo';
      const lines = photos.map((p) => `![${placeholder}](${p.src} ${p.width}x${p.height})`).join('\n');
      insertBlock(lines, 2, 2 + placeholder.length);
      setMessage({ kind: 'ok', text: 'Photo added. Type a short description in place of “Describe the photo”.' });
    } catch (err) {
      setMessage({ kind: 'error', text: err?.message?.includes('set up') ? err.message : 'The photo didn’t upload. Please try again.' });
    }
    setBusy('');
  }

  async function setCover(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy('Uploading cover…');
    setMessage(null);
    try {
      const [photo] = await uploadFiles([file]);
      if (photo) set('cover', { src: photo.src, width: photo.width, height: photo.height, alt: post.cover?.alt || '' });
    } catch (err) {
      setMessage({ kind: 'error', text: 'The cover didn’t upload. Please try again.' });
    }
    setBusy('');
  }

  // ---- Saving ----------------------------------------------------------------

  async function save(status) {
    if (!post.title.trim()) return setMessage({ kind: 'error', text: 'Add a title first.' });
    if (!SLUG_RE.test(post.slug)) return setMessage({ kind: 'error', text: 'The web address can only use lowercase letters, numbers and dashes.' });
    if (!post.date) return setMessage({ kind: 'error', text: 'Choose the wedding date.' });
    setBusy(status === 'published' ? (wasPublished ? 'Updating…' : 'Publishing…') : 'Saving…');
    setMessage(null);
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...post, status, originalSlug }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 401) return window.location.reload();
      if (!res.ok || !data.ok) throw new Error(data.error || 'Could not save the post.');
      setPost(fromPost(data.post));
      setDirty(false);
      setSlugTouched(true);
      const texts = {
        published: wasPublished ? 'Updated. The live post has your changes.' : 'Published. It’s live on the blog now.',
        draft: initial?.status === 'published' || post.status === 'published' ? 'Moved back to drafts. It’s no longer on the blog.' : 'Draft saved.',
      };
      setMessage({ kind: 'ok', text: texts[status] });
      if (data.post.slug !== originalSlug) {
        setOriginalSlug(data.post.slug);
        router.replace(`/admin/blog/${data.post.slug}`);
      }
    } catch (err) {
      setMessage({ kind: 'error', text: err.message });
    }
    setBusy('');
  }

  async function remove() {
    if (!originalSlug) return router.push('/admin/blog');
    if (!window.confirm(`Delete “${post.title || 'this post'}”? This can’t be undone.`)) return;
    setBusy('Deleting…');
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: originalSlug }),
      });
      if (!res.ok) throw new Error();
      setDirty(false);
      router.push('/admin/blog');
      router.refresh();
    } catch {
      setMessage({ kind: 'error', text: 'Could not delete the post. Please try again.' });
      setBusy('');
    }
  }

  // ---- Vendors -----------------------------------------------------------------

  function setVendor(i, field, value) {
    set(
      'vendors',
      post.vendors.map((v, n) => (n === i ? { ...v, [field]: value } : v))
    );
  }

  const previewPost = useMemo(() => ({ ...post, cover: post.cover?.src ? post.cover : null }), [post]);
  const status = post.status === 'published' ? 'Published' : 'Draft';

  return (
    <main className="mx-auto w-full max-w-[1100px] px-4 pb-24 pt-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <a href="/admin/blog" className="text-[11px] uppercase tracking-[0.18em] text-[#80695a] no-underline hover:text-[#443221]">
          ← All posts
        </a>
        <span className={`px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] ${post.status === 'published' ? 'bg-[#e8efe4] text-[#4f6b48]' : 'bg-[#f6ead9] text-[#9a6a2c]'}`}>
          {isNew ? 'New draft' : status}
        </span>
        {dirty ? <span className="text-[12px] italic text-[#9a8158]">Unsaved changes</span> : null}
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Main column */}
        <div className="min-w-0">
          <label htmlFor="post-title" className={LABEL}>Title</label>
          <input
            id="post-title"
            value={post.title}
            onChange={(e) => set('title', e.target.value)}
            placeholder="An Intimate Wildflower Wedding Along Oak Creek"
            className={`${INPUT} font-display text-[24px] tracking-[0.02em]`}
          />

          <label htmlFor="post-excerpt" className={`${LABEL} mt-5`}>Short summary <span className="normal-case tracking-normal text-[#b3a597]">(shown on the blog page)</span></label>
          <textarea
            id="post-excerpt"
            rows={3}
            value={post.excerpt}
            onChange={(e) => set('excerpt', e.target.value)}
            placeholder="Two or three sentences about the wedding."
            className={`${INPUT} resize-y`}
          />

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3">
            <div className="flex border border-[#e0d6ca] bg-white" role="tablist" aria-label="Editor view">
              {[
                ['write', 'Write'],
                ['preview', 'Preview'],
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`cursor-pointer px-4 py-2 text-[11px] uppercase tracking-[0.18em] ${tab === key ? 'bg-[#443221] text-white' : 'bg-white text-[#443221]'}`}
                >
                  {label}
                </button>
              ))}
            </div>
            {tab === 'write' ? (
              <div className="flex flex-wrap gap-1.5" onMouseDown={(e) => e.target.closest('button') && e.preventDefault()}>
                <button type="button" className={TOOL} onClick={() => heading('## ', 'Section heading')}>Heading</button>
                <button type="button" className={TOOL} onClick={() => heading('### ', 'Small heading')}>Subheading</button>
                <button type="button" className={`${TOOL} font-semibold`} onClick={() => wrap('**', 'bold text')}>B</button>
                <button type="button" className={`${TOOL} italic`} onClick={() => wrap('*', 'italic text')}>I</button>
                <button type="button" className={TOOL} onClick={() => insertBlock('---')}>Divider</button>
                <button type="button" className={TOOL} onClick={() => insertBlock('**With love,**\nArabella')}>Sign-off</button>
                <button type="button" className={TOOL} disabled={Boolean(busy)} onClick={() => photoInput.current?.click()}>+ Photos</button>
                <input ref={photoInput} type="file" accept="image/jpeg,image/png,image/webp" multiple hidden onChange={addPhotos} />
              </div>
            ) : null}
          </div>

          {tab === 'write' ? (
            <>
              <textarea
                id="post-body"
                ref={bodyRef}
                aria-label="Story"
                value={post.body}
                onChange={(e) => set('body', e.target.value)}
                placeholder={'Tell the story of the day…\n\nLeave a blank line between paragraphs. Use the buttons above for headings and photos.'}
                className={`${INPUT} mt-3 min-h-[520px] resize-y text-[15.5px] leading-[1.85]`}
              />
              <p className="m-0 mt-2 text-[12px] leading-[1.6] text-[#a8978a]">
                Choose several photos at once to show them side by side. “Designed to leave you in awe.” is added above your sign-off automatically.
              </p>
            </>
          ) : (
            <article className="mt-3 border border-[#e6ddd2] bg-white px-5 py-10 sm:px-10">
              <header className="text-center">
                <p className="m-0 text-[11px] font-light uppercase tracking-[0.18em] text-[#80695a]">
                  {[post.couple, formatDate(post.date), post.location].filter(Boolean).join(' · ')}
                </p>
                <h2 className="m-0 mt-4 font-display text-[26px] font-light leading-[1.3] tracking-[0.12em] md:text-[32px]">
                  {(post.title || 'Untitled').toUpperCase()}
                </h2>
                {post.photographer.name ? (
                  <p className="m-0 mt-4 text-[11px] uppercase tracking-[0.2em] text-[#80695a]">
                    Photographed by <span className="font-display text-[16px] normal-case italic tracking-[0.04em] text-[#443221]">{post.photographer.name}</span>
                  </p>
                ) : null}
              </header>
              <PostCover post={previewPost} sizes="560px" className="mx-auto my-10 h-auto w-full max-w-[460px]" />
              {post.body.trim() ? <PostBody markdown={post.body} /> : <p className="text-center text-[#a8978a]">Nothing written yet.</p>}
            </article>
          )}

          {/* Vendor team */}
          <section className="mt-10">
            <h2 className="m-0 font-display text-[18px] uppercase tracking-[0.18em]">The vendor team</h2>
            <p className="m-0 mt-1 text-[13px] text-[#a8978a]">Shown at the end of the post. Links are optional.</p>
            <div className="mt-4 grid gap-2">
              {post.vendors.map((v, i) => (
                <div key={i} className="grid gap-2 sm:grid-cols-[1fr_1fr_1fr_auto]">
                  <input aria-label="Role" placeholder="Role, e.g. Photography" value={v.role} onChange={(e) => setVendor(i, 'role', e.target.value)} className={INPUT} />
                  <input aria-label="Name" placeholder="Name" value={v.name} onChange={(e) => setVendor(i, 'name', e.target.value)} className={INPUT} />
                  <input aria-label="Website" placeholder="https://… (optional)" value={v.url} onChange={(e) => setVendor(i, 'url', e.target.value)} className={INPUT} />
                  <button type="button" className={TOOL} onClick={() => set('vendors', post.vendors.filter((_, n) => n !== i))} aria-label={`Remove ${v.role || 'vendor'}`}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button type="button" className={`${TOOL} mt-3`} onClick={() => set('vendors', [...post.vendors, { role: '', name: '', url: '' }])}>
              + Add vendor
            </button>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="flex min-w-0 flex-col gap-6 lg:sticky lg:top-[84px] lg:self-start">
          <div className="border border-[#e6ddd2] bg-white p-5">
            <div className="flex flex-col gap-2">
              {post.status === 'published' ? (
                <>
                  <button type="button" className={PRIMARY} disabled={Boolean(busy)} onClick={() => save('published')}>Update post</button>
                  <button type="button" className={SECONDARY} disabled={Boolean(busy)} onClick={() => save('draft')}>Unpublish</button>
                </>
              ) : (
                <>
                  <button type="button" className={PRIMARY} disabled={Boolean(busy)} onClick={() => save('published')}>Publish</button>
                  <button type="button" className={SECONDARY} disabled={Boolean(busy)} onClick={() => save('draft')}>Save draft</button>
                </>
              )}
            </div>
            <p aria-live="polite" className={`m-0 mt-3 min-h-[20px] text-[13px] leading-[1.5] ${message?.kind === 'error' ? 'text-[#c0392b]' : 'text-[#4f6b48]'}`}>
              {busy || message?.text || ''}
            </p>
            {post.status === 'published' && originalSlug ? (
              <a href={`/blog/${originalSlug}`} target="_blank" rel="noreferrer" className="text-[11px] uppercase tracking-[0.18em] text-[#80695a]">
                View live post ↗
              </a>
            ) : null}
          </div>

          <div className="border border-[#e6ddd2] bg-white p-5">
            <span className={LABEL}>Cover photo</span>
            {post.cover?.src ? (
              <>
                <PostCover post={previewPost} sizes="280px" className="aspect-[4/5] h-auto w-full object-cover" />
                <label htmlFor="cover-alt" className={`${LABEL} mt-3`}>Describe the cover</label>
                <input
                  id="cover-alt"
                  value={post.cover.alt}
                  onChange={(e) => set('cover', { ...post.cover, alt: e.target.value })}
                  placeholder="The couple beneath the red rocks"
                  className={INPUT}
                />
              </>
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center bg-[#f3ece3] text-center text-[13px] text-[#a8978a]">No cover yet</div>
            )}
            <div className="mt-3 flex gap-2">
              <button type="button" className={TOOL} disabled={Boolean(busy)} onClick={() => coverInput.current?.click()}>
                {post.cover?.src ? 'Replace' : 'Upload cover'}
              </button>
              {post.cover?.src ? (
                <button type="button" className={TOOL} onClick={() => set('cover', null)}>Remove</button>
              ) : null}
            </div>
            <input ref={coverInput} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={setCover} />
          </div>

          <div className="flex flex-col gap-4 border border-[#e6ddd2] bg-white p-5">
            <div>
              <label htmlFor="post-couple" className={LABEL}>Couple</label>
              <input id="post-couple" value={post.couple} onChange={(e) => set('couple', e.target.value)} placeholder="Jenna & Derek" className={INPUT} />
            </div>
            <div>
              <label htmlFor="post-date" className={LABEL}>Wedding date</label>
              <input id="post-date" type="date" value={post.date} onChange={(e) => set('date', e.target.value)} className={INPUT} />
            </div>
            <div>
              <label htmlFor="post-location" className={LABEL}>Venue & place</label>
              <input id="post-location" value={post.location} onChange={(e) => set('location', e.target.value)} placeholder="Amara Resort & Spa, Sedona" className={INPUT} />
            </div>
            <div>
              <label htmlFor="post-photographer" className={LABEL}>Photographer</label>
              <input
                id="post-photographer"
                value={post.photographer.name}
                onChange={(e) => set('photographer', { ...post.photographer, name: e.target.value })}
                placeholder="Name"
                className={INPUT}
              />
              <input
                aria-label="Photographer website"
                value={post.photographer.url}
                onChange={(e) => set('photographer', { ...post.photographer, url: e.target.value })}
                placeholder="https://… (optional)"
                className={`${INPUT} mt-2`}
              />
            </div>
            <div>
              <label htmlFor="post-slug" className={LABEL}>Web address</label>
              <input
                id="post-slug"
                value={post.slug}
                disabled={wasPublished}
                onChange={(e) => {
                  setSlugTouched(true);
                  set('slug', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
                }}
                className={`${INPUT} text-[13px] disabled:bg-[#f6f1ea] disabled:text-[#80695a]`}
              />
              <p className="m-0 mt-1.5 break-all text-[12px] text-[#a8978a]">
                arabellasweddings.com/blog/{post.slug || '…'}
                {wasPublished ? <><br />Fixed once published, so links keep working.</> : null}
              </p>
            </div>
            <div>
              <label htmlFor="post-description" className={LABEL}>Google description <span className="normal-case tracking-normal text-[#b3a597]">(optional)</span></label>
              <textarea
                id="post-description"
                rows={3}
                value={post.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="Uses the short summary if left blank."
                className={`${INPUT} resize-y text-[14px]`}
              />
            </div>
          </div>

          <button type="button" onClick={remove} disabled={Boolean(busy)} className="cursor-pointer self-start border-0 bg-transparent p-0 text-[11px] uppercase tracking-[0.18em] text-[#a04535] underline-offset-4 hover:underline">
            {isNew ? 'Discard' : 'Delete post'}
          </button>
        </aside>
      </div>
    </main>
  );
}
