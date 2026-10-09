'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// A carousel of photo collages. `slides` is an array of slides; each slide is
// three photos [{ src, alt, pos? }]: the first fills the tall left panel, the
// other two stack on the right. `pos` is an optional object-position (e.g.
// '80% 50%') to keep a subject in frame. Cross-fades every 5.5s (paused for
// reduced motion), with arrows and dots.
export default function CollageCarousel({ slides }) {
  const [i, setI] = useState(0);
  const n = slides.length;
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 5500);
    return () => clearInterval(t);
  }, [n, i]);
  const arrow =
    'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center border-0 bg-white/85 text-[22px] leading-none text-[#443221] transition-colors hover:bg-white';
  const cell = (p, sizes) => (
    <div className="relative overflow-hidden bg-[#efe6db]">
      <Image src={p.src} alt={p.alt} fill sizes={sizes} className="object-cover" style={p.pos ? { objectPosition: p.pos } : undefined} />
    </div>
  );
  return (
    <div className="w-full">
      <div className="relative grid">
        {slides.map((s, k) => (
          <div
            key={k}
            aria-hidden={k !== i}
            className={`col-start-1 row-start-1 grid aspect-[4/3] grid-cols-[3fr_2fr] grid-rows-2 gap-2 transition-opacity duration-[1200ms] ease-in-out md:gap-3 ${k === i ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            <div className="row-span-2 grid">{cell(s[0], '(min-width: 900px) 520px, 55vw')}</div>
            {cell(s[1], '(min-width: 900px) 340px, 40vw')}
            {cell(s[2], '(min-width: 900px) 340px, 40vw')}
          </div>
        ))}
        <button type="button" aria-label="Previous photos" onClick={() => setI((i - 1 + n) % n)} className={`${arrow} left-3`}>
          &lsaquo;
        </button>
        <button type="button" aria-label="Next photos" onClick={() => setI((i + 1) % n)} className={`${arrow} right-3`}>
          &rsaquo;
        </button>
      </div>
      <div className="mt-5 flex justify-center gap-3">
        {slides.map((_, k) => (
          <button
            key={k}
            type="button"
            aria-label={`Show collage ${k + 1}`}
            aria-current={k === i}
            onClick={() => setI(k)}
            className={`h-[7px] w-[7px] cursor-pointer rounded-full border-0 p-0 transition-colors ${k === i ? 'bg-[#80695a]' : 'bg-[#d9cfc3] hover:bg-[#b8a898]'}`}
          />
        ))}
      </div>
    </div>
  );
}
