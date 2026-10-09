'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

// Homepage hero: an editorial triptych of 35mm film portraits (Dana Maruna)
// that slowly cross-fades between sets of three, under a soft dark wash with
// the headline and calls to action on top. On phones only the first photo of
// each set shows, which suits the tall frames. Pauses on the first set for
// visitors who prefer reduced motion.
//
// To change photos: every entry must be a tall (2:3) photo; keep three per set.
const SETS = [
  [
    { src: '/media/film-veil-stone-archway-0a2b8ea4.jpg', alt: 'A bride in a cathedral veil beneath a stone archway, on 35mm film' },
    { src: '/media/film-chapel-altar-golden-8a6b890a.jpg', alt: 'A couple at the golden altar of the Tlaquepaque chapel' },
    { src: '/media/film-red-rock-sunset-veil-f2d40900.jpg', alt: 'A bride in a lace veil glowing at sunset above the Sedona red rocks' },
  ],
  [
    { src: '/media/film-veil-staircase-bw-ea1f5e9b.jpg', alt: 'A bride lifting her veil on a shadowed staircase, in black and white' },
    { src: '/media/film-lace-mantilla-chapel-7d603713.jpg', alt: 'A bride in a lace mantilla before the chapel altar' },
    { src: '/media/film-sculptural-cake-monogram-61ca5afb.jpg', alt: 'A sculptural ivory wedding cake with the couple’s monogram' },
  ],
  [
    { src: '/media/film-bride-gown-courtyard-039b96a4.jpg', alt: 'A bride seated with her gown spread across a Tlaquepaque courtyard' },
    { src: '/media/film-twirl-photo-booth-e2018908.jpg', alt: 'A groom twirling his bride before a vintage photo booth' },
    { src: '/media/film-candles-fireplace-b617fac6.jpg', alt: 'Dozens of candles glowing in a brick fireplace' },
  ],
];

// Phones show one moody photo per slide instead of a set (Oct 2026: Jordan &
// Austin in the chapel, the black-and-white veil, then the candles).
const MOBILE = [
  { src: '/media/film-lace-mantilla-chapel-7d603713.jpg', alt: 'A bride in a lace mantilla before the chapel altar' },
  { src: '/media/film-veil-staircase-bw-ea1f5e9b.jpg', alt: 'A bride lifting her veil on a shadowed staircase, in black and white' },
  { src: '/media/film-candles-fireplace-b617fac6.jpg', alt: 'Dozens of candles glowing in a brick fireplace' },
];

export default function HomeHero() {
  const [i, setI] = useState(0);
  // Headline swap: "Wedding Planning & design" shows first, then fades out and
  // "Designed to leave you in awe" rises in its place and stays.
  const [awe, setAwe] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAwe(true), 2200);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % SETS.length), 6500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative isolate grid h-[92vh] min-h-[640px] max-h-[980px] w-full overflow-hidden bg-[#1d1915]">
      {SETS.map((set, n) => (
        <div
          key={n}
          aria-hidden={n !== i}
          className={`relative col-start-1 row-start-1 grid grid-cols-1 gap-[3px] transition-opacity duration-[2000ms] ease-in-out md:grid-cols-3 ${n === i ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="relative md:hidden">
            <Image src={MOBILE[n].src} alt={MOBILE[n].alt} fill priority={n === 0} sizes="100vw" className="object-cover" />
          </div>
          {set.map((p, k) => (
            <div key={p.src} className="relative hidden md:block">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                priority={n === 0}
                sizes="(min-width: 768px) 34vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ))}
      <div aria-hidden="true" className="relative col-start-1 row-start-1 bg-gradient-to-b from-black/50 via-black/55 to-black/70 md:from-black/30 md:via-black/40 md:to-black/60" />

      {/* Top padding clears the white AWE header that floats over the hero */}
      <div className="relative z-10 col-start-1 row-start-1 flex flex-col items-center justify-center px-6 pt-32 text-center text-white md:pt-40 xl:pt-64">
        <p className="m-0 text-[11px] font-light uppercase tracking-[0.32em] md:text-[12px]">
          Sedona &middot; Scottsdale &middot; Destination
        </p>
        <div className="mt-5 grid place-items-center">
          <h1
            className={`col-start-1 row-start-1 m-0 font-display text-[34px] font-normal uppercase leading-[1.15] tracking-[0.14em] transition-all duration-[900ms] ease-in-out sm:text-[46px] md:text-[60px] ${awe ? 'pointer-events-none -translate-y-3 opacity-0 blur-[3px]' : 'opacity-100'}`}
          >
            Wedding Planning
            <span className="block font-script text-[44px] normal-case tracking-normal sm:text-[56px] md:text-[72px]">&amp; Design</span>
          </h1>
          <div
            aria-hidden={!awe}
            className={`col-start-1 row-start-1 flex flex-col items-center transition-all delay-[350ms] duration-[1200ms] ease-out ${awe ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-6 opacity-0 blur-[6px]'}`}
          >
            <p className="m-0 font-display text-[22px] font-normal uppercase tracking-[0.28em] text-white sm:text-[30px] md:text-[40px]">
              Designed to leave you in
            </p>
            <Image
              src="/media/awe-logo-white-bbd258a1.png"
              alt="AWE"
              width={648}
              height={242}
              className="mt-4 h-auto w-[260px] sm:w-[340px] md:w-[460px]"
            />
          </div>
        </div>
      </div>

      {/* Photographer credit: every hero photo is Dana Maruna's 35mm film work */}
      <a
        href="https://danamarunaphoto.com/"
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-6 right-1/2 z-10 translate-x-1/2 whitespace-nowrap text-[10px] font-light uppercase tracking-[0.22em] text-white/80 no-underline transition-colors hover:text-white md:bottom-6 md:right-6 md:translate-x-0"
      >
        Film photography by Dana Maruna Photo
      </a>
    </section>
  );
}
