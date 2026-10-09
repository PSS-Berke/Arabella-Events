import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { GALLERY_ITEMS, GALLERY_EXTRA_VIDEOS } from '@/lib/gallery-content';

import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Wedding Gallery & Custom Design | Scottsdale & Sedona',
  description:
    "Custom wedding design and a gallery of Arizona weddings planned and designed by Arabella's Weddings & Events, from Sedona's red rocks to Scottsdale's desert resorts.",
  path: '/gallery',
});

/*
 * Design + Gallery, rebuilt Oct 2026 to read simply, top to bottom:
 *   1. a candlelit banner with the page title,
 *   2. "the art of Design": a clean grid of our tablescapes and details,
 *   3. "the Gallery": every wedding photo and film clip in balanced columns,
 *   4. a closing call to action.
 * The old freeform collage (stationery screenshots and an "inquire now" list of
 * menus, place cards, table numbers, and mirrors) was removed at Arabella's
 * request; components/CollageGallery.js is no longer used.
 */

// Every player on this page loops. Raw markup keeps the `muted` attribute in
// the server-rendered HTML (React drops the muted prop, and without it
// browsers block autoplay until hydration).
function GalleryVideo({ src, poster, label, className, style }) {
  const html = `<video src="${src}" poster="${poster}" loop autoplay muted playsinline controls preload="metadata" aria-label="${label}" style="display:block;width:100%;height:100%;object-fit:cover"></video>`;
  return <div className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />;
}

const HERO = GALLERY_ITEMS[0]; // wide 4.7:1 film clip, full width above the columns
const REST = GALLERY_ITEMS.slice(1);
// The home- and packages-page clips are woven in at their `slot` indices so
// motion is spread across the columns.
const EXTRAS = new Map(GALLERY_EXTRA_VIDEOS.map((v) => [v.slot, v]));
const FLOW = REST.flatMap((item, i) => (EXTRAS.has(i) ? [EXTRAS.get(i), item] : [item]));
const ratio = (item) => (item.ar ? item.ar : `${item.d.w} / ${item.d.h}`);

// "the art of Design": tablescapes and details, all full-resolution.
const DESIGN = [
  { src: '/media/cabin-tablescape-forest-table-a0e8e91e.jpg', alt: 'A long candlelit table set beneath towering pines', w: 1334, h: 2000 },
  { src: '/media/hh-long-table-tapers-menus-111372ff.jpg', alt: 'Long white table with taper candles in tall glass hurricanes', w: 1067, h: 1600 },
  { src: '/media/cabin-tablescape-candles-closeup-262bd28b.jpg', alt: 'Mauve pillar and ivory taper candles with white roses in bud vases on a chiffon runner', w: 1334, h: 2000 },
  { src: '/media/tlaquepaque-long-tables-candelabras-b3ab62f7.jpg', alt: 'Long candlelit tables with gold candelabras and red roses in a Tlaquepaque courtyard at night', w: 1333, h: 2000 },
  { src: '/media/hh-monogram-menu-place-setting-dabe7000.jpg', alt: 'A monogrammed place setting with gold flatware', w: 1067, h: 1600 },
  { src: '/media/crystal-chandelier-amaranth-1b294729.jpg', alt: 'Crystal chandelier draped with red amaranth beneath string lights', w: 1333, h: 2000 },
  { src: '/media/hh-tables-balconies-string-lights-f4068ce2.jpg', alt: 'Reception tables under string lights between courtyard balconies', w: 1067, h: 1600 },
  { src: '/media/film-sculptural-cake-monogram-61ca5afb.jpg', alt: 'A sculptural ivory wedding cake with the couple’s monogram', w: 1078, h: 1600 },
  { src: '/media/cabin-tablescape-autumn-trees-8558bb08.jpg', alt: 'Ivory and mauve candlelit tablescape under towering autumn trees', w: 1334, h: 2000 },
];

export default function GalleryPage() {
  return (
    <main className="bg-white text-[#443221]">
      {/* Banner */}
      <section className="relative isolate flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-[#1d1915] px-6 py-24 text-center text-white">
        <Image
          src="/media/hh-dusk-long-table-guests-6a2464bf.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="awe-settle -z-20 object-cover object-[50%_55%]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/45 to-black/70" />
        <p className="awe-rise m-0 text-[11px] font-light uppercase tracking-[0.3em] text-[#c9b48a]" style={{ animationDelay: '0.1s' }}>
          Design &middot; Weddings &middot; Details
        </p>
        <div className="awe-rise mt-6 font-script text-[56px] leading-none text-[#e9dcc4] md:text-[84px]" style={{ animationDelay: '0.3s' }}>
          our
        </div>
        <h1 className="awe-rise m-0 mt-2 font-display text-[34px] font-normal uppercase tracking-[0.24em] md:text-[58px]" style={{ animationDelay: '0.6s' }}>
          Design &amp; Gallery
        </h1>
        <div className="mt-8 flex w-full max-w-[520px] items-center gap-5" aria-hidden="true">
          <span className="awe-draw h-px flex-1 origin-right bg-[#c9b48a]" style={{ animationDelay: '1s' }} />
          <Image
            src="/media/awe-logo-champagne-29e404bd.png"
            alt=""
            width={648}
            height={242}
            priority
            className="awe-rise h-auto w-[100px] md:w-[120px]"
            style={{ animationDelay: '1s' }}
          />
          <span className="awe-draw h-px flex-1 origin-left bg-[#c9b48a]" style={{ animationDelay: '1s' }} />
        </div>
        <nav aria-label="On this page" className="awe-rise mt-10 flex gap-10" style={{ animationDelay: '1.4s' }}>
          {[
            { href: '#design', label: 'Design' },
            { href: '#gallery', label: 'Gallery' },
          ].map((j) => (
            <a
              key={j.href}
              href={j.href}
              className="border-b border-transparent pb-1 text-[11px] font-light uppercase tracking-[0.26em] text-white/85 no-underline transition-colors hover:border-[#c9b48a] hover:text-white"
            >
              {j.label}
            </a>
          ))}
        </nav>
      </section>

      {/* The art of design */}
      <section id="design" className="scroll-mt-24 px-6 py-20 md:py-28">
        <Reveal className="text-center">
          <div className="font-script text-[44px] leading-none md:text-[60px]">the art of</div>
          <h2 className="m-0 mt-2 font-display text-[24px] font-normal uppercase tracking-[0.18em] sm:text-[30px] md:text-[36px]">Design</h2>
          <p className="m-0 mx-auto mt-6 max-w-[560px] text-[15px] font-light leading-[1.95] tracking-[0.03em] text-pretty">
            Candlelight, linens, florals, and every last detail, designed from a blank page for each couple.
          </p>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-[1180px] grid-cols-2 gap-2 md:grid-cols-3 md:gap-4">
          {DESIGN.map((p, n) => (
            <Reveal key={p.src} delay={(n % 3) * 120} className="overflow-hidden">
              <Image
                src={p.src}
                alt={p.alt}
                width={p.w}
                height={p.h}
                sizes="(min-width: 1180px) 380px, (min-width: 768px) 32vw, 48vw"
                className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-[1500ms] ease-out hover:scale-[1.04]"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* The gallery */}
      <section id="gallery" className="scroll-mt-24 border-t border-[#e6ddd2] pt-20 md:pt-28">
        <Reveal className="px-6 text-center">
          <div className="font-script text-[44px] leading-none md:text-[60px]">the</div>
          <h2 className="m-0 mt-2 font-display text-[24px] font-normal uppercase tracking-[0.18em] sm:text-[30px] md:text-[36px]">Gallery</h2>
          <p className="m-0 mx-auto mt-6 max-w-[560px] text-[15px] font-light leading-[1.95] tracking-[0.03em] text-pretty">
            Real weddings across Sedona, Scottsdale, and beyond.
          </p>
        </Reveal>
        <div className="mx-auto mt-14 max-w-[1500px] px-2 pb-2 md:px-3 md:pb-3 lg:px-4 lg:pb-4">
          <GalleryVideo
            src={HERO.src}
            poster={HERO.poster}
            label={HERO.label}
            className="mb-2 w-full md:mb-3 lg:mb-3.5"
            style={{ aspectRatio: ratio(HERO) }}
          />
          <div className="awe-masonry">
            {FLOW.map((item) =>
              item.type === 'video' ? (
                <GalleryVideo key={item.src} src={item.src} poster={item.poster} label={item.label} style={{ aspectRatio: ratio(item) }} />
              ) : (
                <Image
                  key={item.src}
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="px-6 py-20 text-center md:py-28">
        <Reveal>
          <div className="font-script text-[48px] leading-none md:text-[66px]">let&rsquo;s create</div>
          <h2 className="m-0 mt-2 font-display text-[22px] font-normal uppercase tracking-[0.2em] md:text-[32px]">Something only yours</h2>
          <Link
            href="/contact"
            className="mt-10 inline-block border border-[#443221] px-9 py-3 text-[12px] font-normal uppercase tracking-[0.22em] text-[#443221] no-underline transition-colors duration-500 hover:bg-[#443221] hover:text-white"
          >
            Inquire
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
