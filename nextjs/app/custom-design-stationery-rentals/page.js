import Image from 'next/image';
import { COLLAGE, COLLAGE_IMAGES } from '@/lib/custom-design-content';

// Live tab title — note the double space after STATIONARY, copied exactly from live.
export const metadata = {
  title: "CUSTOM DESIGN | STATIONARY  | Arabella's Weddings & Events | AWE",
  alternates: { canonical: '/custom-design-stationary-rentals' },
  openGraph: { url: '/custom-design-stationary-rentals', siteName: "Arabella's Weddings & Events | AWE ", type: 'website' },
};

// Image-only page: a freeform overlapping collage of 15 images (title graphic,
// film portraits, stationery mockups, and the static "inquire now" offerings
// graphic). Nothing on this page is interactive on live — no links, no
// lightbox, no CTA — so none are added here.
//
// Desktop (lg+): absolutely positioned items on a centered 980px reference
// column; negative left offsets bleed off the left viewport edge, offsets
// > 980 bleed off the right (body has overflow-x-hidden). Explicit z-index
// values reproduce the live DOM stacking order.
// Mobile (< lg): a centered single-column stack in visual order.
export default function CustomDesignStationary() {
  return (
    <main className="text-charcoal">
      <div
        className="mx-auto flex w-full max-w-[420px] flex-col items-center gap-8 px-6 pb-16 pt-10 lg:block lg:h-[var(--ch)] lg:w-[var(--cw)] lg:max-w-none lg:p-0 lg:relative"
        style={{ '--cw': `${COLLAGE.refWidth}px`, '--ch': `${COLLAGE.height}px` }}
      >
        {COLLAGE_IMAGES.map((img, i) => (
          <div
            key={img.id}
            className="w-full max-w-[var(--w)] lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:z-[var(--z)] lg:w-[var(--w)] lg:max-w-none"
            style={{
              '--w': `${img.w}px`,
              '--l': `${img.left}px`,
              '--t': `${img.top}px`,
              '--z': img.z,
            }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={img.w}
              height={img.h}
              sizes={`(min-width: 1024px) ${img.w}px, calc(100vw - 48px)`}
              priority={i === 0}
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
