import Image from 'next/image';
import { GALLERY_ITEMS, GALLERY_EXTRA_VIDEOS } from '@/lib/gallery-content';

import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Wedding Gallery | Scottsdale & Sedona Weddings',
  description:
    "A gallery of Arizona weddings planned and designed by Arabella's Weddings & Events, from Sedona's red rocks to Scottsdale's desert resorts.",
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

export default function GalleryPage() {
  return (
    <main className="bg-white">
      {/* Present for crawlers and screen readers; the live page shows no heading here. */}
      <h1 className="sr-only">Wedding Gallery — Scottsdale &amp; Sedona Weddings</h1>
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
