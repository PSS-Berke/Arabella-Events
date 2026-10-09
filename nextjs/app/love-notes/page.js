import Image from 'next/image';
import Link from 'next/link';
import { LOVE_NOTES, MORE_LOVE_NOTES, LN_TITLE, LN_PHOTOS, SOCIAL_BOOTH } from '@/lib/love-notes-content';
import { ReviewsSchema } from '@/components/Schema';

import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Client Reviews | Scottsdale & Sedona Wedding Planner',
  description:
    "Read what couples say about working with Arabella's Weddings & Events on their Scottsdale and Sedona weddings — in their own words.",
  path: '/love-notes',
});

/*
 * Kind Words. Rebuilt Oct 2026 (was a 1:1 copy of the Wix mesh layout) as one
 * consistent layout in two parts:
 *   1. Couples, newest wedding first: the couple's name as the heading, the
 *      review beside a photo, the photo alternating sides.
 *   2. Vendor Reviews from fellow wedding professionals, in their own section.
 * Review text is verbatim; see lib/love-notes-content.js.
 */

const QUOTE = 'm-0 whitespace-pre-line font-light leading-[1.4] text-[17px]';

// Extra details for the original reviews, keyed by couple name: the photo
// that sat beside each on the old layout, plus wedding details and story
// links where we have them. Pairings are the ones on the original page;
// Salem & Dylan and Britney & Markus had no photo.
const ORIGINAL_EXTRAS = {
  'Hannah & Hunter': { photo: LN_PHOTOS.chapel, label: 'Tlaquepaque · July 10, 2026' },
  'Jordan & Austin': { photo: LN_PHOTOS.sedona, label: 'Tlaquepaque · October 4, 2025' },
  'Jenna & Derek': { photo: LN_PHOTOS.jennaDerek },
  'Alicia & Hawk': { photo: LN_PHOTOS.willow },
  'Jenna & Joseph': { photo: LN_PHOTOS.archway },
  'Britney & Markus': { label: 'Chicago' },
  'Isabella & Dylan': { photo: LN_PHOTOS.ceremony, label: 'Las Vegas · March 6, 2023' },
  'Stephanie & Trevor': { photo: LN_PHOTOS.brideGroomCloseup, label: 'Las Vegas' },
  'Vaden & Clark': { photo: LN_PHOTOS.bouquet },
  'Monica & Bryan': { photo: LN_PHOTOS.embrace, label: 'Hilton Lake Las Vegas' },
};

const byName = (list, name) => list.find((r) => r.name === name);
const original = (name) => ({ ...byName(LOVE_NOTES, name), ...ORIGINAL_EXTRAS[name] });
const newer = (name) => byName(MORE_LOVE_NOTES, name);

// Newest wedding first. Weddings without a known date sit after the dated
// ones, in the order they appeared on the original page.
const COUPLES = [
  newer('Jennifer & Hunter'),
  newer('Sarah & Grant'),
  newer('Hannah & Michael'),
  newer('Kassie & Nathan'),
  original('Hannah & Hunter'),
  newer('Patricia & Drew'),
  original('Jordan & Austin'),
  original('Jenna & Derek'),
  original('Alicia & Hawk'),
  original('Salem & Dylan'),
  original('Jenna & Joseph'),
  original('Britney & Markus'),
  original('Stephanie & Trevor'),
  original('Vaden & Clark'),
  original('Monica & Bryan'),
  original('Isabella & Dylan'),
].filter(Boolean);

// Fellow wedding professionals: the newer vendor reviews (they carry a label
// but no couple name) plus the unnamed industry review from the original page.
// Reviews from the same vendor (labels starting the same, e.g. the two from
// L'Auberge de Sedona) are merged into one card.
const VENDORS = [
  ...MORE_LOVE_NOTES.filter((r) => !r.name),
  { label: 'From Social Booth LV', ...LOVE_NOTES.find((r) => !r.name), url: SOCIAL_BOOTH.href, logo: SOCIAL_BOOTH.logo },
].reduce((cards, r) => {
  const same = cards.find((c) => r.label.startsWith(c.label));
  if (same) same.texts.push(r.text);
  else cards.push({ ...r, texts: [r.text] });
  return cards;
}, []);

function Review({ note, flip, heading, sub }) {
  return (
    <article
      className={`flex flex-col items-center gap-8 lg:items-start lg:gap-10 ${note.photo ? (flip ? 'lg:flex-row-reverse' : 'lg:flex-row') : ''}`}
    >
      {note.photo ? (
        <Image
          src={note.photo.src}
          alt={note.photo.alt}
          width={note.photo.w}
          height={note.photo.h}
          sizes="(min-width: 1024px) 346px, 90vw"
          className="h-auto w-full max-w-[346px] lg:mt-[60px] lg:shrink-0"
        />
      ) : null}
      <div className={`flex w-full min-w-0 flex-col items-center lg:items-start ${note.photo ? '' : 'lg:mx-auto lg:max-w-[760px] lg:items-center'}`}>
        <h2 className="awe-caps awe-name m-0 w-full text-center uppercase lg:text-left">
          {note.url ? (
            <a href={note.url} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline transition-colors hover:text-tan">
              {heading}
            </a>
          ) : (
            heading
          )}
        </h2>
        {note.logo ? (
          <a href={note.url} target="_blank" rel="noopener noreferrer" className="mt-3">
            <Image src={note.logo.src} alt="" width={note.logo.w} height={note.logo.h} className="h-auto max-h-[64px] w-auto max-w-[200px]" />
          </a>
        ) : null}
        {sub ? <p className="m-0 mt-1 font-body text-[11px] font-light uppercase tracking-[0.18em] text-brown">{sub}</p> : null}
        {note.post ? (
          <Link
            href={`/blog/${note.post}`}
            className="mt-2 font-body text-[11px] font-light tracking-[0.16em] text-brown underline decoration-[#d9cfc3] underline-offset-4 transition-colors hover:text-tan"
          >
            {note.postLabel || 'Read their wedding story'} &rarr;
          </Link>
        ) : null}
        <p className={`${QUOTE} mt-4 ${note.photo ? 'text-left' : 'text-center'}`}>{note.text}</p>
      </div>
    </article>
  );
}

// A vendor's logo stands in for their name when we have one (the name stays
// as the image's alt text). `texts` holds one or more reviews from the same
// vendor, shown together in one card.
function VendorCard({ note }) {
  const name = note.label.replace(/^From /, '');
  const mark = note.logo ? (
    <Image src={note.logo.src} alt={name} width={note.logo.w} height={note.logo.h} className="mx-auto block h-auto max-h-[56px] w-auto max-w-[200px]" />
  ) : (
    name
  );
  return (
    <article className="flex flex-col items-center border border-[#e6ddd2] px-6 py-8 text-center md:px-8">
      <h3 className="m-0 font-display text-[16px] font-normal uppercase tracking-[0.14em] text-[#443221] md:text-[18px]">
        {note.url ? (
          <a href={note.url} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline transition-colors hover:text-tan">
            {mark}
          </a>
        ) : (
          mark
        )}
      </h3>
      {note.texts.map((text, k) => (
        <p key={k} className="m-0 mt-4 whitespace-pre-line font-light leading-[1.6] text-[15px] text-charcoal">&ldquo;{text}&rdquo;</p>
      ))}
      {note.post ? (
        <Link
          href={`/blog/${note.post}`}
          className="mt-4 font-body text-[11px] font-light tracking-[0.16em] text-brown underline decoration-[#d9cfc3] underline-offset-4 transition-colors hover:text-tan"
        >
          {note.postLabel || 'Read the wedding story'} &rarr;
        </Link>
      ) : null}
    </article>
  );
}

export default function LoveNotes() {
  return (
    <main className="bg-white pb-16 text-charcoal lg:pb-20">
      <ReviewsSchema reviews={COUPLES} />
      <section className="mx-auto flex w-full max-w-[980px] justify-center px-6 pt-6 lg:px-0 lg:pt-8">
        <h1 className="m-0">
          <Image
            src={LN_TITLE.src}
            alt="The AWE Experience"
            width={LN_TITLE.w}
            height={LN_TITLE.h}
            priority
            className="h-auto w-[200px] lg:w-[234px]"
          />
        </h1>
      </section>

      <section className="mx-auto mt-12 flex w-full max-w-[980px] flex-col gap-16 px-6 lg:gap-20 lg:px-0">
        {COUPLES.map((note, i) => (
          <Review key={note.name} note={note} flip={i % 2 === 1} heading={note.name} sub={note.label} />
        ))}
      </section>

      {/* Vendor reviews: compact cards, two to a row (name, logo, review) */}
      <section className="mx-auto mt-24 w-full max-w-[1060px] border-t border-[#e6ddd2] px-6 pt-16 lg:px-0">
        <div className="text-center">
          <div className="font-script text-[40px] leading-none md:text-[54px]">vendor</div>
          <p className="m-0 mt-2 font-display text-[22px] uppercase tracking-[0.16em] md:text-[30px]">Reviews</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {VENDORS.map((note, i) => (
            <VendorCard key={note.label + i} note={note} />
          ))}
        </div>
      </section>
    </main>
  );
}
