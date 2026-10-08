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
    </main>
  );
}
