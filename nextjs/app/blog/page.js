import Image from 'next/image';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { POSTS, formatDate } from '@/lib/blog-content';

export const metadata = pageMeta({
  title: 'Wedding Blog | Real Weddings in Sedona & Scottsdale',
  description:
    'Real weddings planned and designed by Arabella’s Weddings & Events, with the design story, details, and creative team behind each celebration.',
  path: '/blog',
});

// Blog index: newest first. Posts live in lib/blog-content.js.
export default function BlogIndex() {
  return (
    <main className="mx-auto max-w-[1000px] px-6 pb-16 pt-12 text-[#443221] md:px-10 md:pt-[70px]">
      <section className="pb-[62px] text-center">
        <h1 className="m-0 font-script text-[38px] font-normal leading-none sm:text-[44px] md:text-[62px]">Real Weddings</h1>
        <p className="mx-auto mb-0 mt-6 max-w-[620px] text-[14.5px] font-light leading-[2] tracking-[0.05em] text-pretty">
          The stories, details, and design behind the celebrations we plan.
        </p>
      </section>

      <section className="flex flex-wrap justify-center gap-14 border-t border-[#e6ddd2] pt-[62px] md:gap-10">
        {POSTS.map((post) => (
          <article key={post.slug} className="flex w-full flex-col md:w-[calc(50%-20px)]">
            <Link href={`/blog/${post.slug}`} className="group block no-underline text-inherit">
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                width={post.cover.width}
                height={post.cover.height}
                sizes="(min-width: 1000px) 440px, (min-width: 768px) 45vw, 90vw"
                className="mb-6 aspect-[4/5] h-auto w-full object-cover transition-opacity group-hover:opacity-90"
              />
              <p className="m-0 text-[11px] font-light uppercase tracking-[0.18em] text-brown">
                {post.couple} &middot; {formatDate(post.date)} &middot; {post.location}
              </p>
              <h2 className="m-0 mt-3 font-display text-[20px] font-light tracking-[0.12em] md:text-[23px]">{post.title.toUpperCase()}</h2>
              <p className="m-0 mt-3 text-[14.5px] font-light leading-[1.9] tracking-[0.03em] text-pretty">{post.excerpt}</p>
              <span className="mt-4 inline-block border-b border-[#443221] pb-1 text-[12px] font-light uppercase tracking-[0.18em] transition-colors group-hover:border-tan">
                Read the story
              </span>
            </Link>
          </article>
        ))}
      </section>

      <div className="mt-16 border-t border-[#e6ddd2] pt-12 text-center">
        <Link
          href="/vendors"
          className="inline-block border-b border-[#443221] pb-1 text-[12px] font-light uppercase tracking-[0.18em] transition-colors hover:border-tan"
        >
          Our featured vendors &amp; venues
        </Link>
      </div>
    </main>
  );
}
