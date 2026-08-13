'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { IMG } from '@/lib/content';

// Live Wix hero (comp-mbcserd2): a 986x404 slideshow of 12 slides — full-bleed
// wedding-photo backgrounds over a #282626 underlay, most with the glowing AWE
// banner graphic overlaid (367x150 on slide 1; 600x245 on later slides, offsets
// per slide from the live mesh CSS). Autoplay 5000ms, 1500ms cross-fade,
// no pause on hover; light-gray prev/next chevrons ~19px from each edge.
const BANNER_ALT = "AWE — Arabella's Weddings & Events";

// banner geometry: {left, top} in px on the 986x404 canvas; w = banner width
const SLIDES = [
  { src: IMG.hero, alt: 'Dark red-on-black wedding tablescape with red roses, beaded centerpieces, and red pillar candles in glass hurricanes', banner: { left: 309, top: 263, w: 367, h: 150 } },
  { src: '/media/49b5c3_33d10f6b6fbe4d9fba5226a86077a934-eefdba11.jpg', alt: 'Groom carrying the train of the bride’s lace gown along a stone wall', banner: { left: 196, top: 174, w: 600, h: 245 } },
  { src: '/media/49b5c3_234154263ff147d199e82bff55ba1353-fb4a2a69.jpg', alt: 'Couple slow dancing at a candlelit reception in black and white', banner: { left: 168, top: 171, w: 600, h: 245 } },
  { src: '/media/49b5c3_5ab528bae5314a48b450ca0d36747fda-0376629c.jpg', alt: 'String lights over a black-and-white checkered dance floor at night', banner: { left: 187, top: 173, w: 600, h: 245 } },
  { src: '/media/49b5c3_c7589d2d72ba43e587156670211e70eb-9b96694f.jpg', alt: 'Candlelit reception dinner table with guests', banner: { left: 180, top: 173, w: 600, h: 245 } },
  { src: '/media/49b5c3_78fe1885a38046fba26d86b696e73888-eafea6e3.jpg', alt: 'First dance in a courtyard, black and white', banner: { left: 176, top: 171, w: 600, h: 245 } },
  { src: '/media/49b5c3_87f5bd9f18e14fe396bc4261b7cb38d8-bccd25cd.jpg', alt: 'Wedding party cheering as the couple holds hands beneath floral arch arrangements', banner: { left: 147, top: 171, w: 600, h: 245 } },
  { src: '/media/49b5c3_c995702281254ebe9d98757b1711fdd7-a6e5a266.jpg', alt: 'Bride wiping away a tear during the first look on a terrace', banner: null },
  { src: '/media/49b5c3_450e8d63a2574003ae41cd54403b34e1-f5284b5a.jpg', alt: 'Bride and groom smiling close together', banner: null },
  { src: '/media/49b5c3_1eab58b202bd4c65b93ff3b1f4bed021-279ea395.png', alt: 'Custom wedding stationery suite', banner: { left: 201, top: 173, w: 600, h: 245 } },
  { src: '/media/49b5c3_9ef1ba13afb54fe1b8bdf1de267a8b19-286cdf49.jpg', alt: 'Couple laughing together in a doorway', banner: { left: 219, top: 173, w: 600, h: 245 } },
  { src: '/media/49b5c3_1d5a0b260a3e444d9021bb7ccfc09b0f-1a5f5c67.jpg', alt: 'Cutting a slice of the white wedding cake', banner: null },
];

const pct = (v, of) => `${((v / of) * 100).toFixed(2)}%`;

function Chevron({ dir }) {
  return (
    <svg width="15" height="40" viewBox="0 0 15 40" fill="none" aria-hidden="true">
      <path
        d={dir === 'prev' ? 'M13 2 L2 20 L13 38' : 'M2 2 L13 20 L2 38'}
        stroke="#E8E6E6"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeroSlideshow() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [i]);
  const go = (d) => setI((n) => (n + d + SLIDES.length) % SLIDES.length);
  return (
    <section className="mt-[19px] flex justify-center">
      <div className="relative w-full max-w-[986px]">
        <div className="relative grid aspect-[986/404] w-full overflow-hidden bg-[#282626]">
          {SLIDES.map((s, n) => (
            <div
              key={s.src}
              aria-hidden={n !== i}
              className={
                'relative col-start-1 row-start-1 transition-opacity duration-[1500ms] ease-in-out ' +
                (n === i ? 'opacity-100' : 'pointer-events-none opacity-0')
              }
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={n === 0}
                sizes="(max-width: 986px) 100vw, 986px"
                className="object-cover object-center"
              />
              {s.banner && (
                <Image
                  src={IMG.glowBanner}
                  alt={BANNER_ALT}
                  width={s.banner.w * 2}
                  height={s.banner.h * 2}
                  className="absolute z-10 h-auto"
                  style={{
                    left: pct(s.banner.left, 986),
                    top: pct(s.banner.top, 404),
                    width: pct(s.banner.w, 986),
                  }}
                />
              )}
            </div>
          ))}
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(-1)}
            className="absolute left-[19px] top-1/2 z-20 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0"
          >
            <Chevron dir="prev" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => go(1)}
            className="absolute right-[19px] top-1/2 z-20 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-0"
          >
            <Chevron dir="next" />
          </button>
        </div>
      </div>
    </section>
  );
}
