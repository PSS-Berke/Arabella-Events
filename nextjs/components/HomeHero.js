'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Full-bleed homepage hero: a slow cross-fade through large landscape photos
// under a soft dark wash, with the headline and two calls to action on top.
// Every slide must be a landscape photo at least ~1500px wide, or it will look
// soft at full screen width. Pauses (stays on the first slide) for visitors
// who prefer reduced motion.
const SLIDES = [
  { src: '/media/hh-long-table-sycamores-db3920b9.jpg', alt: 'Long white banquet table with candles and orange florals beneath the sycamores at Tlaquepaque', pos: 'center 60%' },
  { src: '/media/49b5c3_33d10f6b6fbe4d9fba5226a86077a934-eefdba11.jpg', alt: 'Groom carrying the train of the bride’s lace gown along a stone wall', pos: 'center' },
  { src: '/media/sweetheart-table-toast-f7f72605.jpg', alt: 'Bride kissing the groom on the cheek at their candlelit sweetheart table', pos: 'center 40%' },
  { src: '/media/hm-creekside-portrait-efa1940c.jpg', alt: 'Bride in a long veil with the groom beside Oak Creek in the forest', pos: 'center 45%' },
  { src: '/media/cabin-shoot-lighting-tablescape-2ab0112a.jpg', alt: 'Lighting the candles on a long forest tablescape beneath autumn trees', pos: 'center' },
];

const BTN =
  'inline-block border px-7 py-3 text-[12px] font-light uppercase tracking-[0.2em] no-underline transition-colors';

export default function HomeHero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative isolate grid h-[78vh] min-h-[520px] max-h-[880px] w-full overflow-hidden bg-[#2b2420]">
      {SLIDES.map((s, n) => (
        <div
          key={s.src}
          aria-hidden={n !== i}
          className={`relative col-start-1 row-start-1 transition-opacity duration-[1800ms] ease-in-out ${n === i ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={n === 0}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: s.pos }}
          />
        </div>
      ))}
      <div aria-hidden="true" className="relative col-start-1 row-start-1 bg-gradient-to-b from-black/25 via-black/35 to-black/55" />

      <div className="relative z-10 col-start-1 row-start-1 flex flex-col items-center justify-center px-6 text-center text-white">
        <p className="m-0 text-[11px] font-light uppercase tracking-[0.32em] md:text-[12px]">
          Sedona &middot; Scottsdale &middot; Destination
        </p>
        <h1 className="m-0 mt-5 font-display text-[34px] font-normal uppercase leading-[1.15] tracking-[0.14em] sm:text-[46px] md:text-[60px]">
          Wedding Planning
          <span className="block font-script text-[44px] normal-case tracking-normal sm:text-[56px] md:text-[72px]">&amp; Design</span>
        </h1>
        <p className="m-0 mt-5 max-w-[520px] text-[14px] font-light leading-[1.9] tracking-[0.06em] text-white/90 md:text-[15px]">
          Thoughtfully designed, meticulously planned celebrations, so you can simply be present.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className={`${BTN} border-white bg-white text-[#443221] hover:bg-transparent hover:text-white`}>
            Inquire
          </Link>
          <Link href="/services" className={`${BTN} border-white/80 text-white hover:bg-white hover:text-[#443221]`}>
            View packages
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3">
        {SLIDES.map((s, n) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Show photo ${n + 1}`}
            aria-current={n === i}
            onClick={() => setI(n)}
            className={`h-[7px] w-[7px] cursor-pointer rounded-full border-0 p-0 transition-colors ${n === i ? 'bg-white' : 'bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </section>
  );
}
