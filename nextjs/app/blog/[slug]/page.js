import Image from 'next/image';
import Link from 'next/link';
import PostCover from '@/components/PostCover';
import { notFound } from 'next/navigation';
import { pageMeta, SITE_URL, BRAND } from '@/lib/seo';
import { POSTS, getPost, formatDate } from '@/lib/blog-content';
import PostBody from '@/components/PostBody';
import { LOVE_NOTES, MORE_LOVE_NOTES } from '@/lib/love-notes-content';

// The couple's review from Kind Words. Blog posts sometimes use a shorter
// name than the review does, so a few are mapped by hand.
const REVIEW_NAME = { 'Isa & Dylan': 'Isabella & Dylan' };
function coupleReview(couple) {
  const name = REVIEW_NAME[couple] || couple;
  return [...MORE_LOVE_NOTES, ...LOVE_NOTES].find((r) => r.name === name && r.text) || null;
}

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPost(params.slug);
  if (!post) return {};
  return pageMeta({ title: `${post.title} | ${post.couple}`, description: post.description ?? post.excerpt, path: `/blog/${post.slug}` });
}

export default function BlogPost({ params }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  // BlogPosting structured data so search engines read it as an article.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    ...(post.cover && { image: `${SITE_URL}${post.cover.src}` }),
    author: { '@type': 'Person', name: 'Arabella', url: `${SITE_URL}/arabella` },
    publisher: { '@id': `${SITE_URL}/#business`, name: BRAND },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    description: post.excerpt,
  };

  return (
    <main className="mx-auto max-w-[760px] px-6 pb-16 pt-12 text-[#443221] md:px-10 md:pt-[70px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <Link href="/blog" className="text-[11px] font-light uppercase tracking-[0.18em] text-brown no-underline transition-colors hover:text-tan">
        &larr; All weddings
      </Link>

      <header className="mt-8 text-center">
        <p className="m-0 text-[11px] font-light uppercase tracking-[0.18em] text-brown">
          {post.couple} &middot; {formatDate(post.date)} &middot; {post.location}
        </p>
        <h1 className="m-0 mt-4 font-display text-[26px] font-light leading-[1.3] tracking-[0.12em] md:text-[36px]">
          {post.title.toUpperCase()}
        </h1>
        {post.photographer ? (
          <p className="m-0 mt-5 text-[11px] font-light uppercase tracking-[0.2em] text-brown">
            Photographed by{' '}
            {post.photographer.url ? (
              <a
                href={post.photographer.url}
                target="_blank"
                rel="noreferrer"
                className="font-display text-[16px] normal-case italic tracking-[0.04em] text-[#443221] underline decoration-[#d9cfc3] underline-offset-4 transition-colors hover:text-tan"
              >
                {post.photographer.name}
              </a>
            ) : (
              <span className="font-display text-[16px] normal-case italic tracking-[0.04em] text-[#443221]">{post.photographer.name}</span>
            )}
          </p>
        ) : null}
        {post.press?.length ? (
          <p className="m-0 mt-5 text-[11px] font-light uppercase tracking-[0.2em] text-brown">
            As featured in{' '}
            {post.press.map((p, i) => (
              <span key={p.name}>
                {i > 0 ? ' & ' : ''}
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-[16px] normal-case italic tracking-[0.04em] text-[#443221] underline decoration-[#d9cfc3] underline-offset-4 transition-colors hover:text-tan"
                >
                  {p.name}
                </a>
                {p.note ? ` · ${p.note}` : ''}
              </span>
            ))}
          </p>
        ) : null}
      </header>

      <PostCover post={post} priority sizes="(min-width: 760px) 680px, 100vw" className="mx-auto my-12 h-auto w-full max-w-[560px]" />

      {/* "Designed to leave you in awe." sits just above Arabella's "With love,"
          sign-off in every story (or at the end, if a story has no sign-off). */}
      {(() => {
        const m = [...post.body.matchAll(/\*{1,2}With love,\*{1,2}/g)].pop();
        const awe = (
          <p className="m-0 mx-auto my-10 max-w-[680px] text-center font-display text-[19px] italic tracking-[0.04em] text-[#9a8158] md:text-[22px]">
            Designed to leave you in awe.
          </p>
        );
        if (!m) return (<><PostBody markdown={post.body} />{awe}</>);
        return (
          <>
            <PostBody markdown={post.body.slice(0, m.index)} />
            {awe}
            <PostBody markdown={post.body.slice(m.index)} />
          </>
        );
      })()}

      {post.photos.length ? (
        <div className="mt-14 grid grid-cols-2 gap-3">
          {post.photos.map((p) => (
            <Image key={p.src} src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 760px) 340px, 48vw" className="h-auto w-full" />
          ))}
        </div>
      ) : null}

      {/* The vendor team (`vendors` on the post in lib/blog-content.js) */}
      {post.vendors?.length ? (
        <section className="mt-16 border-t border-[#e6ddd2] pt-12 text-center">
          <div className="font-script text-[40px] leading-none md:text-[54px]">the vendor</div>
          <h2 className="m-0 mt-1 font-display text-[18px] font-normal uppercase tracking-[0.22em] md:text-[22px]">Team</h2>
          <ul className="m-0 mx-auto mt-8 grid max-w-[560px] list-none gap-x-10 gap-y-5 p-0 sm:grid-cols-2">
            {post.vendors.map((v) => (
              <li key={v.role + v.name}>
                <p className="m-0 text-[10px] font-light uppercase tracking-[0.24em] text-brown">{v.role}</p>
                {v.url ? (
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block font-display text-[17px] tracking-[0.04em] text-[#443221] underline decoration-[#d9cfc3] underline-offset-4 transition-colors hover:text-tan"
                  >
                    {v.name}
                  </a>
                ) : (
                  <p className="m-0 mt-1 font-display text-[17px] tracking-[0.04em]">{v.name}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* What they said: the couple's own review from Kind Words, when they left one */}
      {(() => {
        const review = coupleReview(post.couple);
        if (!review) return null;
        return (
          <section className="mt-16 border-t border-[#e6ddd2] pt-12 text-center">
            <div className="font-script text-[40px] leading-none md:text-[54px]">what they said&hellip;</div>
            <blockquote className="m-0 mx-auto mt-8 max-w-[640px] whitespace-pre-line font-display text-[18px] italic leading-[1.7] text-[#5a4634] md:text-[20px]">
              &ldquo;{review.text}&rdquo;
            </blockquote>
            <p className="m-0 mt-6 text-[11px] font-light uppercase tracking-[0.24em] text-brown">&mdash; {review.name}</p>
            <Link
              href="/love-notes"
              className="mt-6 inline-block border-b border-[#d9cfc3] pb-1 text-[11px] font-light uppercase tracking-[0.2em] text-[#443221] no-underline transition-colors hover:border-tan hover:text-tan"
            >
              Read more kind words &rarr;
            </Link>
          </section>
        );
      })()}

      <div className="mt-16 border-t border-[#e6ddd2] pt-12 text-center">
        <div className="font-script text-[38px] leading-none md:text-[52px]">Let&rsquo;s begin</div>
        <Link
          href="/contact"
          className="mt-6 inline-block border-b border-[#443221] pb-1 text-[12px] font-light uppercase tracking-[0.18em] transition-colors hover:border-tan"
        >
          Plan your wedding with us
        </Link>
      </div>
    </main>
  );
}
