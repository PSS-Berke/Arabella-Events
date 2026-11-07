import Image from 'next/image';
import Link from 'next/link';
import { AdminShell, adminGate } from '@/components/admin/AdminGate';
import { listAllPosts, postsDbConfigured } from '@/lib/posts';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Blog | AWE Admin', robots: { index: false, follow: false } };

const BTN =
  'inline-block border border-[#443221] bg-[#443221] px-6 py-3 text-[11px] uppercase tracking-[0.22em] text-white no-underline transition-colors hover:bg-transparent hover:text-[#443221]';

function shortDate(iso) {
  if (!iso) return '';
  const [y, m, d] = iso.slice(0, 10).split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

export default async function AdminBlogPage() {
  const gate = adminGate('Blog');
  if (gate) return gate;
  if (!postsDbConfigured()) {
    return (
      <AdminShell title="Blog">
        <p className="text-[15px] font-light">The database isn’t connected yet. Connect Neon to this project in Vercel → Storage, then redeploy.</p>
      </AdminShell>
    );
  }

  let posts = [];
  let failed = false;
  try {
    posts = await listAllPosts();
  } catch (err) {
    console.error('Admin: could not load posts', err);
    failed = true;
  }
  const published = posts.filter((p) => p.status === 'published').length;

  return (
    <AdminShell title="Blog" action={<Link href="/admin/blog/new" className={BTN}>New post</Link>}>
      {failed ? (
        <p role="alert" className="text-[15px] text-[#c0392b]">Couldn’t load posts right now. Please refresh in a minute.</p>
      ) : (
        <>
          <p className="m-0 mb-6 text-[13px] uppercase tracking-[0.16em] text-[#80695a]">
            {published} published · {posts.length - published} {posts.length - published === 1 ? 'draft' : 'drafts'}
          </p>
          {posts.length === 0 ? (
            <p className="border border-dashed border-[#e0d6ca] px-6 py-12 text-center text-[15px] font-light text-[#80695a]">
              No posts yet. Start one with “New post”.
            </p>
          ) : (
            <ul className="m-0 grid list-none gap-3 p-0">
              {posts.map((post) => (
                <li key={post.slug} className="flex items-center gap-4 border border-[#e6ddd2] bg-white p-3 pr-5">
                  <Link href={`/admin/blog/${post.slug}`} className="shrink-0" aria-label={`Edit ${post.title}`}>
                    {post.cover ? (
                      <Image src={post.cover.src} alt="" width={post.cover.width} height={post.cover.height} sizes="72px" className="h-[90px] w-[72px] object-cover" />
                    ) : (
                      <div className="flex h-[90px] w-[72px] items-center justify-center bg-[#f3ece3] font-script text-[22px] text-[#9a8158]">awe</div>
                    )}
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span
                        className={`px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] ${
                          post.status === 'published' ? 'bg-[#e8efe4] text-[#4f6b48]' : 'bg-[#f6ead9] text-[#9a6a2c]'
                        }`}
                      >
                        {post.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                      <span className="text-[11px] uppercase tracking-[0.14em] text-[#a8978a]">
                        {[post.couple, shortDate(post.date), post.location].filter(Boolean).join(' · ')}
                      </span>
                    </div>
                    <Link href={`/admin/blog/${post.slug}`} className="mt-1 block truncate font-display text-[20px] text-[#443221] no-underline hover:underline">
                      {post.title}
                    </Link>
                    <p className="m-0 mt-0.5 text-[12px] text-[#a8978a]">Last edited {shortDate(post.updatedAt)}</p>
                  </div>
                  <div className="hidden shrink-0 gap-4 sm:flex">
                    <Link href={`/admin/blog/${post.slug}`} className="text-[11px] uppercase tracking-[0.18em] text-[#443221]">Edit</Link>
                    {post.status === 'published' ? (
                      <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" className="text-[11px] uppercase tracking-[0.18em] text-[#80695a]">View ↗</a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </AdminShell>
  );
}
