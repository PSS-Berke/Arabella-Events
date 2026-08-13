import Image from 'next/image';
import Link from 'next/link';
import { Lettering } from '@/components/Lettering';
import { IMG, INSTAGRAM_URL } from '@/lib/content';
import { EMAIL, MARKETS } from '@/lib/seo';

// Live footer order (QA-verified against the Wix mesh): AWE monogram centered
// on top (201px, overlapping ~37px toward the email row), then the email with
// the Instagram icon just right of it.
//
// Two departures from live, both deliberate:
//   - The email was a baked PNG and not a link. It is now live text and a real
//     mailto, so it is crawlable, selectable, and tappable on mobile — and it
//     carries the NAP consistency that local search depends on.
//   - The market links below give the two location landing pages a site-wide
//     internal link. Orphaned landing pages rank poorly no matter how good the
//     copy is, and the footer is the least intrusive place to link them.
export default function Footer() {
  return (
    <footer className="flex flex-col items-center bg-white px-6 pb-[54px] pt-[76px]">
      <Image src={IMG.monogram} alt="AWE monogram" width={402} height={402} className="-mb-[37px] h-auto w-[201px]" />

      <div className="flex w-full max-w-[660px] items-center justify-center gap-[10px]">
        <Lettering className="w-full min-w-0 max-w-[600px]">
          <a
            href={`mailto:${EMAIL}`}
            className="awe-caps awe-email block text-center uppercase transition-colors hover:text-tan"
          >
            {EMAIL}
          </a>
        </Lettering>
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="shrink-0">
          <Image src={IMG.instagramIcon} alt="Instagram" width={78} height={78} className="h-auto w-[39px]" />
        </a>
      </div>

      <nav aria-label="Areas we serve" className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
        {MARKETS.map((m) => (
          <Link
            key={m.slug}
            href={m.slug}
            className="text-[11px] font-light uppercase tracking-[0.18em] text-brown transition-colors hover:text-tan"
          >
            {m.city} Wedding Planner
          </Link>
        ))}
      </nav>
    </footer>
  );
}
