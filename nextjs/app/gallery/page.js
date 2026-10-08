import Image from 'next/image';
import CollageGallery from '@/components/CollageGallery';
import { GALLERY_ITEMS, GALLERY_EXTRA_VIDEOS } from '@/lib/gallery-content';

import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Wedding Gallery & Custom Design | Scottsdale & Sedona',
  description:
    "Custom wedding design, stationery and signage, and a gallery of Arizona weddings planned and designed by Arabella's Weddings & Events, from Sedona's red rocks to Scottsdale's desert resorts.",
  path: '/gallery',
});

// Every player on this page loops indefinitely. Raw markup
// (dangerouslySetInnerHTML) is used so the `muted` attribute is present in the
// server-rendered HTML — React does not serialize the muted prop, and without
// it browsers block autoplay until hydration. `preload="metadata"` keeps the
// page light: browsers hold muted autoplay until a clip scrolls into view, so
// only the hero fetches video up front.
function GalleryVideo({ src, poster, label, className, style }) {
  const html = `<video src="${src}" poster="${poster}" loop autoplay muted playsinline controls preload="metadata" aria-label="${label}" style="display:block;width:100%;height:100%;object-fit:cover"></video>`;
  return <div className={className} style={style} dangerouslySetInnerHTML={{ __html: html }} />;
}

// The live gallery is a freeform Wix mesh collage: boxes overlap, bleed ±415px
// past the centered column, and sit on uneven gutters. This lays the same media
// out as balanced masonry columns instead — one flow at every breakpoint, no
// overlap, a single gap value throughout (see .awe-masonry in globals.css).
// Aspect ratios are the sources' own, which is what live showed: every mesh box
// matches its image's intrinsic ratio, so nothing was ever cropped.
const HERO = GALLERY_ITEMS[0]; // wide 4.7:1 video — reads as a banner, so it
const REST = GALLERY_ITEMS.slice(1); // spans the full width above the columns.

// The home- and services-page clips are woven into the flow at their `slot`
// indices so motion is spread across the columns rather than clustered.
const EXTRAS = new Map(GALLERY_EXTRA_VIDEOS.map((v) => [v.slot, v]));
const FLOW = REST.flatMap((item, i) => (EXTRAS.has(i) ? [EXTRAS.get(i), item] : [item]));

const ratio = (item) => (item.ar ? item.ar : `${item.d.w} / ${item.d.h}`);

// Tablescape row under the custom-design collage.
const TABLESCAPE = [
  { src: '/media/cabin-tablescape-place-settings-13796f7a.jpg', alt: 'Scalloped gold-rimmed plates with custom menus, champagne napkins and gold flatware' },
  { src: '/media/cabin-tablescape-candles-closeup-262bd28b.jpg', alt: 'Mauve pillar and ivory taper candles with white roses in bud vases on a chiffon runner' },
  { src: '/media/cabin-shoot-placing-menus-8202a2db.jpg', alt: 'Tucking custom menus onto gold-rimmed place settings' },
  { src: '/media/cabin-tablescape-autumn-trees-8558bb08.jpg', alt: 'Ivory and mauve candlelit tablescape under towering autumn trees' },
  { src: '/media/tlaquepaque-long-tables-candelabras-b3ab62f7.jpg', alt: 'Long candlelit tables with gold candelabras and red roses in a Tlaquepaque courtyard at night' },
  { src: '/media/crystal-chandelier-amaranth-1b294729.jpg', alt: 'Crystal chandelier draped with red amaranth beneath string lights' },
];

export default function GalleryPage() {
  return (
    <main className="bg-white text-charcoal">
      {/* Custom design (was its own page, /custom-design-stationery-rentals,
          which now redirects here). The collage's "CUSTOM design" title is the
          page's h1 — see components/CollageGallery.js. */}
      {/* overflow-x-clip: the collage bleeds past both viewport edges by
          design; clip it here so the page itself can't scroll sideways. */}
      <section id="custom-design" className="scroll-mt-48 overflow-x-clip">
        <CollageGallery />
        <div className="mx-auto max-w-[1000px] px-6 pb-16 pt-6 text-center md:px-10 lg:pt-16">
          <div className="font-script text-[38px] leading-none sm:text-[44px] md:text-[62px]">tablescape</div>
          <h2 className="mb-[34px] mt-1.5 font-display text-[22px] font-light tracking-[0.13em] sm:text-[27px] md:text-[38px] md:tracking-[0.19em]">DESIGN</h2>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
            {TABLESCAPE.map((p) => (
              <Image
                key={p.src}
                src={p.src}
                alt={p.alt}
                width={1334}
                height={2000}
                sizes="(min-width: 1000px) 310px, (min-width: 768px) 32vw, 48vw"
                className="h-auto w-full"
              />
            ))}
          </div>
        </div>
      </section>

      <div id="gallery" className="scroll-mt-48 border-t border-[#e6ddd2] pt-14 text-center md:pt-20">
        <div className="font-script text-[38px] leading-none sm:text-[44px] md:text-[62px]">The</div>
        <h2 className="mb-10 mt-1.5 font-display text-[22px] font-light tracking-[0.13em] sm:text-[27px] md:text-[38px] md:tracking-[0.19em]">GALLERY</h2>
      </div>
      <div className="mx-auto max-w-[1500px] px-2 py-2 md:px-3 md:py-3 lg:px-4 lg:py-4">
        <GalleryVideo
          src={HERO.src}
          poster={HERO.poster}
          label={HERO.label}
          className="mb-2 w-full md:mb-3 lg:mb-3.5"
          style={{ aspectRatio: ratio(HERO) }}
        />
        <div className="awe-masonry">
          {FLOW.map((item, i) =>
            item.type === 'video' ? (
              <GalleryVideo
                key={item.src}
                src={item.src}
                poster={item.poster}
                label={item.label}
                style={{ aspectRatio: ratio(item) }}
              />
            ) : (
              <Image
                key={item.src}
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                priority={i < 4}
                sizes="(min-width: 1024px) 24vw, (min-width: 768px) 32vw, 48vw"
              />
            )
          )}
        </div>
      </div>
    </main>
  );
}
