import Link from 'next/link';
import { MARKETS } from '@/lib/seo';

export const metadata = {
  title: 'Page Not Found | AWE',
  // A 404 should never be indexed, but it must stay crawlable so the links
  // below still pass a visitor (and a crawler) back into the site.
  robots: { index: false, follow: true },
};

const H = 'font-display font-light tracking-[0.13em] md:tracking-[0.19em]';
const LINK =
  'text-[11px] font-light uppercase tracking-[0.18em] text-brown transition-colors hover:text-tan';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[52vh] max-w-[760px] flex-col items-center justify-center px-6 py-24 text-center text-[#443221]">
      <p className="font-script text-[44px] leading-none md:text-[62px]">Oh dear</p>
      <h1 className={`${H} mb-6 mt-2 text-[20px] sm:text-[24px] md:text-[30px]`}>
        THIS PAGE HAS WANDERED OFF
      </h1>
      <p className="m-0 max-w-[520px] text-[14.5px] font-light leading-[2] tracking-[0.05em] text-pretty">
        The link may be out of date, or the page may have moved. Everything else is
        exactly where you left it.
      </p>

      <nav aria-label="Popular pages" className="mt-11 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <Link href="/" className={LINK}>Home</Link>
        <Link href="/services" className={LINK}>Packages</Link>
        <Link href="/gallery" className={LINK}>Gallery</Link>
        {MARKETS.map((m) => (
          <Link key={m.slug} href={m.slug} className={LINK}>
            {m.city} Wedding Planner
          </Link>
        ))}
        <Link href="/contact" className={LINK}>Contact</Link>
      </nav>
    </main>
  );
}
