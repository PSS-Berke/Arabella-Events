import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { pageMeta, SITE_URL, BRAND } from '@/lib/seo';
import { POSTS, getPost, formatDate } from '@/lib/blog-content';
import PostBody from '@/components/PostBody';

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
    image: `${SITE_URL}${post.cover.src}`,
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

      <Image
        src={post.cover.src}
        alt={post.cover.alt}
        width={post.cover.width}
        height={post.cover.height}
        priority
        sizes="(min-width: 760px) 680px, 100vw"
        className="mx-auto my-12 h-auto w-full max-w-[560px]"
      />

      <PostBody markdown={post.body} />

      {post.photos.length ? (
        <div className="mt-14 grid grid-cols-2 gap-3">
          {post.photos.map((p) => (
            <Image key={p.src} src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width: 760px) 340px, 48vw" className="h-auto w-full" />
          ))}
        </div>
      ) : null}

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
