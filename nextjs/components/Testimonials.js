'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { REVIEW_QUOTES } from '@/lib/content';

// Homepage review carousel: one short pull-quote per slide (REVIEW_QUOTES in
// lib/content.js), autoplaying every 6000ms with a 1500ms cross-fade. The
// couple's name sits under each quote; if they have a blog post, it links to
// their story. Full reviews live on /love-notes.
export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % REVIEW_QUOTES.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="pb-20 pt-2 md:pb-24">
      <div className="mx-auto w-full max-w-[860px]">
        <div className="grid pt-12">
          {REVIEW_QUOTES.map((r, n) => (
            <figure
              key={r.name}
              aria-hidden={n !== i}
              className={
                'col-start-1 row-start-1 m-0 flex flex-col items-center justify-center transition-opacity duration-[1500ms] ease-in-out ' +
                (n === i ? 'opacity-100' : 'pointer-events-none opacity-0')
              }
            >
              <blockquote className="m-0 text-center font-display text-[22px] italic leading-[1.55] text-[#443221] md:text-[28px]">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-center text-[11px] font-light uppercase tracking-[0.22em] text-brown">
                {r.post ? (
                  <Link
                    href={`/blog/${r.post}`}
                    tabIndex={n === i ? 0 : -1}
                    className="text-inherit no-underline transition-colors hover:text-tan"
                  >
                    {r.name} &middot; Read their story &rarr;
                  </Link>
                ) : (
                  r.name
                )}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 flex items-center justify-center">
          {REVIEW_QUOTES.map((r, n) => (
            <button
              key={r.name}
              type="button"
              onClick={() => setI(n)}
              aria-label={`Review from ${r.name}`}
              aria-current={n === i}
              className={
                'mx-[7px] h-[7px] w-[7px] cursor-pointer rounded-full border-0 p-0 transition-colors ' +
                (n === i ? 'bg-[#80695a]' : 'bg-[#d9cfc3] hover:bg-[#b8a898]')
              }
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/love-notes"
            className="inline-block border-b border-[#443221] pb-1 text-[12px] font-light uppercase tracking-[0.2em] text-[#443221] no-underline transition-colors hover:border-tan hover:text-tan"
          >
            Read more kind words
          </Link>
        </div>
      </div>
    </section>
  );
}
