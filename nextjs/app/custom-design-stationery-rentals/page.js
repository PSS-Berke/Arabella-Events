import Image from 'next/image';
import CollageGallery from '@/components/CollageGallery';

// Live tab title — note the double space after STATIONARY, copied exactly from live.
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Custom Wedding Stationery, Signage & Rentals | Arizona',
  description:
    'Bespoke invitations, signage, menus, custom wedding websites, and rentals designed in-house for Scottsdale and Sedona weddings.',
  path: '/custom-design-stationery-rentals',
});

// Image-only page: a freeform overlapping collage of 15 images (title graphic,
// film portraits, stationery mockups, and the static "inquire now" offerings
// graphic). Nothing on this page is interactive on live — no links, no
// lightbox, no CTA — so none are added here.
//
// Desktop (lg+): absolutely positioned items on a centered 980px reference
// column; negative left offsets bleed off the left viewport edge, offsets
// > 980 bleed off the right (body has overflow-x-hidden). Explicit z-index
// values reproduce the live DOM stacking order. The pointer pans the stage so
// the bled-off edges can be brought on screen — see CollageGallery.
// Mobile (< lg): a centered single-column stack in visual order.
// Not on live (added Oct 2026): a tablescape row under the collage, showing
// the menus and table design from the offerings list in use.
const TABLESCAPE = [
  { src: '/media/cabin-tablescape-place-settings-13796f7a.jpg', alt: 'Scalloped gold-rimmed plates with custom menus, champagne napkins and gold flatware' },
  { src: '/media/cabin-tablescape-candles-closeup-262bd28b.jpg', alt: 'Mauve pillar and ivory taper candles with white roses in bud vases on a chiffon runner' },
  { src: '/media/cabin-shoot-placing-menus-8202a2db.jpg', alt: 'Tucking custom menus onto gold-rimmed place settings' },
  { src: '/media/cabin-tablescape-autumn-trees-8558bb08.jpg', alt: 'Ivory and mauve candlelit tablescape under towering autumn trees' },
  { src: '/media/tlaquepaque-long-tables-candelabras-b3ab62f7.jpg', alt: 'Long candlelit tables with gold candelabras and red roses in a Tlaquepaque courtyard at night' },
  { src: '/media/crystal-chandelier-amaranth-1b294729.jpg', alt: 'Crystal chandelier draped with red amaranth beneath string lights' },
];

export default function CustomDesignStationary() {
  return (
    <main className="text-charcoal">
      <CollageGallery />
      <section className="mx-auto max-w-[1000px] px-6 pb-16 pt-6 text-center md:px-10 lg:pt-16">
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
      </section>
    </main>
  );
}
