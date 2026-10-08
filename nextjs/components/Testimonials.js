'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { REVIEWS } from '@/lib/content';

// Homepage review carousel: 5 slides, autoplay every 5000ms with a 1500ms
// cross-fade; the whole quote links to /love-notes. Restyled Oct 2026 (serif
// italic quotes, visible dots) — live's near-invisible dots were dropped.
export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="pb-20 pt-2 md:pb-24">
      <div className="mx-auto w-full max-w-[988px]">
        <div className="grid pt-[53px]">
          {REVIEWS.map((q, n) => (
            <div
              key={n}
              aria-hidden={n !== i}
              className={
                'col-start-1 row-start-1 transition-opacity duration-[1500ms] ease-in-out ' +
                (n === i ? 'opacity-100' : 'pointer-events-none opacity-0')
              }
            >
              <Link href="/love-notes" tabIndex={n === i ? 0 : -1} className="mx-auto block w-full max-w-[760px] no-underline">
                <p className="m-0 text-center font-display text-[18px] italic leading-[1.65] text-[#4a3a2c] md:text-[21px]">&ldquo;{q}&rdquo;</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-[45px] flex items-center justify-center">
          {REVIEWS.map((_, n) => (
            <button
              key={n}
              type="button"
              onClick={() => setI(n)}
              aria-label={'Slide ' + (n + 1)}
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
