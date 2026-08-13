'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { REVIEWS } from '@/lib/content';

// Live Wix slideshow (comp-m5q4d698): 5 slides, autoplay every 5000ms with a
// 1500ms cross-fade, no pause on hover, no heading; the whole quote links to
// /love-notes; 6px dot indicators sit below (near-invisible on white, as live).
export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="px-6 pb-[66px] pt-[17px]">
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
              <Link href="/love-notes" tabIndex={n === i ? 0 : -1} className="mx-auto block w-full max-w-[720px]">
                <p className="m-0 text-center font-body text-[17px] leading-[1.4] text-charcoal md:text-[22px]">{q}</p>
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
                'mx-[9.5px] h-[6px] w-[6px] cursor-pointer rounded-full border-0 p-0 ' +
                (n === i ? 'bg-[rgba(212,212,210,0.36)]' : 'bg-[#fafafa]')
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
