'use client';
import { useEffect, useState } from 'react';
import { REVIEWS } from '@/lib/content';

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % REVIEWS.length), 8000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="bg-creamdeep px-6 py-14 md:px-10 md:pb-[76px] md:pt-[86px]">
      <div className="mx-auto max-w-[900px] text-center">
        <div className="mb-[26px] font-script text-[44px] text-script">Kind Words</div>
        <p className="m-0 text-[14px] font-light leading-[2.05] tracking-[0.05em] text-cocoa text-pretty">{REVIEWS[i]}</p>
        <div className="mt-[34px] flex justify-center gap-[14px]">
          {REVIEWS.map((_, n) => (
            <button
              key={n}
              onClick={() => setI(n)}
              aria-label={'Testimonial ' + (n + 1)}
              className={['h-[7px] w-[7px] cursor-pointer rounded-full border border-brass p-0', n === i ? 'bg-brass' : 'bg-transparent'].join(' ')}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
