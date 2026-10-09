'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// A small cross-fading photo carousel for the About page. `photos` is
// [{ src, alt, w, h }]. Advances every 5s (paused for reduced motion), with
// arrows and dots to move by hand. Photos sit in a fixed 4:5 frame.
export default function AboutCarousel({ photos }) {
  const [i, setI] = useState(0);
  const n = photos.length;
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 5000);
    return () => clearInterval(t);
  }, [n, i]);
  const arrow =
    'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center border-0 bg-white/80 text-[22px] leading-none text-[#443221] transition-colors hover:bg-white';
  return (
    <div className="mx-auto w-full">
      <div className="relative grid aspect-[4/5] overflow-hidden bg-[#efe6db]">
        {photos.map((p, k) => (
          <div
            key={p.src}
            aria-hidden={k !== i}
            className={`col-start-1 row-start-1 transition-opacity duration-[1200ms] ease-in-out ${k === i ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 320px, 92vw" className="object-cover" />
          </div>
        ))}
        <button type="button" aria-label="Previous photo" onClick={() => setI((i - 1 + n) % n)} className={`${arrow} left-3`}>
          &lsaquo;
        </button>
        <button type="button" aria-label="Next photo" onClick={() => setI((i + 1) % n)} className={`${arrow} right-3`}>
          &rsaquo;
        </button>
      </div>
      <div className="mt-5 flex justify-center gap-3">
        {photos.map((p, k) => (
          <button
            key={p.src}
            type="button"
            aria-label={`Show photo ${k + 1}`}
            aria-current={k === i}
            onClick={() => setI(k)}
            className={`h-[7px] w-[7px] cursor-pointer rounded-full border-0 p-0 transition-colors ${k === i ? 'bg-[#80695a]' : 'bg-[#d9cfc3] hover:bg-[#b8a898]'}`}
          />
        ))}
      </div>
    </div>
  );
}
