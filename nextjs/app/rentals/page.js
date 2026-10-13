import Image from 'next/image';
import { pageMeta } from '@/lib/seo';
import { RENTALS } from '@/lib/rentals-content';
import RentalReservation from '@/components/RentalReservation';

export const metadata = pageMeta({
  title: 'Wedding Rentals | Scottsdale & Sedona, AZ',
  description:
    'Wedding and event rentals from Arabella’s Weddings & Events, available for Scottsdale and Sedona celebrations.',
  path: '/rentals',
});

// Script-word heading and light body, as on /services. Inventory lives in
// lib/rentals-content.js; the grid and the online reservation flow live in
// components/RentalReservation.js.
const BODY = 'text-[14.5px] font-light leading-[2] tracking-[0.05em] text-pretty';

// Custom signage & stationery, priced per piece.
const SIGNAGE = [
  { name: 'Custom Bar Signs', price: '$75 each' },
  { name: 'Name Cards', price: '$4 each' },
  { name: 'Menus', price: '$7 each' },
];
const SIGNAGE_EXAMPLES = [
  { src: '/media/signage-bar-sign-jennifer-hunter-8f5a6ff5.jpg', w: 1333, h: 2000, alt: 'Leather bar sign for Jennifer and Hunter on the Snake Oil Station mobile bar' },
  { src: '/media/signage-signature-drinks-florals-76fd591a.jpg', w: 1333, h: 2000, alt: 'Framed terracotta signature drinks sign beneath orchids and hanging amaranthus' },
  { src: '/media/signage-menu-place-setting-8529b77d.jpg', w: 1333, h: 2000, alt: 'Terracotta menu on a white place setting with gold flatware' },
  { src: '/media/signage-menu-burgundy-table-cedb38f5.jpg', w: 2000, h: 1333, alt: 'Burgundy gothic menu beside a velvet napkin on a satin-draped table' },
  { src: '/media/signage-menu-gold-flake-9cb2347c.jpg', w: 1334, h: 2000, alt: 'Ivory menu with gold-flake edges and a sprig of baby breath on a scalloped plate' },
  { src: '/media/signage-signature-drinks-closeup-ef28c4a1.jpg', w: 1067, h: 1600, alt: 'Close-up of a framed signature drinks sign with a monogram' },
  { src: '/media/signage-menus-flatlay-a00e0ef4.jpg', w: 2000, h: 1333, alt: 'Terracotta menus with rings, polaroids, matchboxes, and a fan' },
  { src: '/media/signage-reeders-welcome-1d626d80.jpg', w: 1333, h: 2000, alt: 'Red rose arrangement beside a burgundy satin welcome sign' },
  { src: '/media/signage-menus-long-table-c425be6e.jpg', w: 1333, h: 2000, alt: 'Terracotta menus at every place along a long candlelit table' },
  { src: '/media/signage-menu-gothic-burgundy-2eca7d2a.png', w: 335, h: 677, alt: 'Custom burgundy menu with gothic lettering and a monogram' },
  { src: '/media/signage-menu-terracotta-93e6a78e.png', w: 246, h: 507, alt: 'Custom terracotta menu with a monogram and elegant script' },
  { src: '/media/signage-place-card-table-one-84e95f54.png', w: 273, h: 350, alt: 'Custom name card with a burgundy monogram crest and ornate corners' },
  { src: '/media/signage-menu-gothic-burgundy-wide-890f8b18.png', w: 591, h: 258, alt: 'Custom burgundy menu with ornate gothic detailing' },
];

export default function RentalsPage() {
  return (
    <main className="mx-auto max-w-[1000px] px-6 pb-8 pt-12 text-[#443221] md:px-10 md:pb-10 md:pt-[70px]">
      <section className="pb-[62px] text-center">
        <h1 className="m-0 mb-[34px] font-script text-[38px] font-normal leading-none sm:text-[44px] md:text-[62px]">Rentals</h1>
        <p className={`mx-auto my-0 max-w-[680px] ${BODY}`}>
          Pieces available to rent for your wedding or event. Tap Reserve on anything you&rsquo;d like, choose your
          date, and we&rsquo;ll confirm availability and send your invoice &mdash; nothing is charged online.
        </p>
      </section>

      <RentalReservation items={RENTALS} />

      {/* Custom signage & stationery (Oct 2026). Hand-crafted by Arabella; the
          examples avoid any wedding that isn't public yet. */}
      <section id="custom-signage" className="scroll-mt-24 border-t border-[#e6ddd2] py-[62px] text-center">
        <div className="font-script text-[38px] leading-none sm:text-[44px] md:text-[56px]">custom</div>
        <h2 className="m-0 mt-2 font-display text-[22px] font-normal uppercase tracking-[0.18em] md:text-[30px]">Signage &amp; Stationery</h2>
        <p className={`mx-auto mb-0 mt-6 max-w-[620px] ${BODY}`}>
          Hand-crafted signage and paper goods, designed to match your wedding from the first welcome to the last table.
        </p>
        <ul className="m-0 mx-auto mt-10 grid max-w-[720px] list-none gap-6 p-0 sm:grid-cols-3">
          {SIGNAGE.map((s) => (
            <li key={s.name} className="border border-[#e6ddd2] px-5 py-6">
              <p className="m-0 font-display text-[17px] uppercase tracking-[0.14em]">{s.name}</p>
              <p className="m-0 mt-2 font-display text-[20px] italic text-[#9a8158]">{s.price}</p>
            </li>
          ))}
        </ul>
        {/* Even grid: photos fill each tile; flat designs (.png) sit whole on cream. */}
        <div className="mx-auto mt-12 grid max-w-[900px] grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {SIGNAGE_EXAMPLES.map((e) => {
            const flat = e.src.endsWith('.png');
            return (
              <div key={e.src} className={`relative aspect-[4/5] overflow-hidden ${flat ? 'bg-[#f3ece3]' : ''}`}>
                <Image
                  src={e.src}
                  alt={e.alt}
                  fill
                  sizes="(min-width: 768px) 300px, 48vw"
                  className={flat ? 'object-contain p-4' : 'object-cover'}
                />
              </div>
            );
          })}
        </div>
        <a
          href="/contact"
          className="mt-12 inline-block border-b border-[#443221] pb-1 text-[12px] font-light uppercase tracking-[0.2em] text-[#443221] no-underline transition-colors hover:border-tan hover:text-tan"
        >
          Inquire about custom signage
        </a>
      </section>
    </main>
  );
}
