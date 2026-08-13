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
export default function CustomDesignStationary() {
  return (
    <main className="text-charcoal">
      <CollageGallery />
    </main>
  );
}
