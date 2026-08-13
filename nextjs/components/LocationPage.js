import Link from 'next/link';
import { BreadcrumbSchema, FaqSchema } from '@/components/Schema';
import { LOCATIONS } from '@/lib/locations';

/*
 * Shared layout for the two location landing pages.
 *
 * Type treatment follows /services — script word, letterspaced Didone heading,
 * light uppercase body — so these read as part of the site rather than as SEO
 * pages bolted onto it. All content comes from lib/locations.js; nothing here
 * is city-specific.
 */

const H = 'font-display font-light tracking-[0.13em] md:tracking-[0.19em]';
const BODY = 'text-[14.5px] font-light leading-[2] tracking-[0.05em] text-pretty';

function SectionHeading({ script, children }) {
  return (
    <>
      {script ? (
        <div className="font-script text-[38px] leading-none sm:text-[44px] md:text-[62px]">{script}</div>
      ) : null}
      <h2 className={`${H} mb-[34px] mt-1.5 text-[19px] sm:text-[22px] md:text-[28px]`}>{children}</h2>
    </>
  );
}

export default function LocationPage({ data }) {
  const { city, region, slug, script, h1, intro, venuesHeading, venuesIntro, venues, practicalHeading, practical, faqs } = data;
  // The other market, for a cross-link between the two landing pages.
  const sibling = LOCATIONS.find((l) => l.slug !== slug);

  return (
    <main className="mx-auto max-w-[1000px] px-6 pb-8 pt-12 text-[#443221] md:px-10 md:pb-10 md:pt-[70px]">
      <BreadcrumbSchema
        trail={[
          { name: 'Home', path: '/' },
          { name: `${city} Wedding Planner`, path: slug },
        ]}
      />
      <FaqSchema faqs={faqs} />

      {/* Hero.
          The city name sits INSIDE the h1 rather than in a sibling element —
          visually identical to the /services treatment, but it keeps the page's
          primary keyword in its primary heading instead of stranding it in a div. */}
      <section className="pb-[62px] text-center">
        <h1 className="m-0 mb-[34px]">
          <span className="block font-script text-[38px] font-normal leading-none sm:text-[44px] md:text-[62px]">
            {script}
          </span>
          <span className={`${H} mt-1.5 block text-[22px] sm:text-[27px] md:text-[38px]`}>{h1}</span>
        </h1>
        <div className={`mx-auto flex max-w-[760px] flex-col gap-6 ${BODY}`}>
          {intro.map((p, n) => (
            <p key={n} className="m-0">{p}</p>
          ))}
        </div>
      </section>

      {/* Services — points at the canonical packages page rather than restating it */}
      <section className="border-t border-[#e6ddd2] py-[62px] text-center">
        <SectionHeading script="Our">HOW WE WORK TOGETHER</SectionHeading>
        <div className="mx-auto grid max-w-[860px] gap-8 text-left md:grid-cols-3">
          {[
            ['Full Planning + Design', 'Our signature service, from venue and vendor sourcing through wedding-day execution.'],
            ['Partial Planning', 'A set number of planning hours, vendor meetings, budget support, and month-of coordination.'],
            ['Month-of Coordination', 'You have planned it. We learn it inside out, then lead the day so you do not have to.'],
          ].map(([name, note]) => (
            <div key={name} className="flex flex-col gap-2">
              <h3 className={`${H} m-0 text-[13px] md:text-[15px]`}>{name.toUpperCase()}</h3>
              <p className={`m-0 ${BODY}`}>{note}</p>
            </div>
          ))}
        </div>
        <Link
          href="/services"
          className="mt-10 inline-block border-b border-[#443221] pb-1 text-[12px] font-light uppercase tracking-[0.18em] transition-colors hover:border-tan"
        >
          See full packages &amp; pricing
        </Link>
      </section>

      {/* Venue guide */}
      <section className="border-t border-[#e6ddd2] py-[62px] text-center">
        <SectionHeading script="The">{venuesHeading}</SectionHeading>
        <p className={`mx-auto mb-10 max-w-[700px] ${BODY}`}>{venuesIntro}</p>
        <div className="mx-auto grid max-w-[880px] gap-9 text-left md:grid-cols-2">
          {venues.map((v) => (
            <div key={v.name} className="flex flex-col gap-2">
              <h3 className={`${H} m-0 text-[14px] md:text-[16px]`}>{v.name.toUpperCase()}</h3>
              <span className="text-[11px] font-light uppercase tracking-[0.16em] text-brown">{v.where}</span>
              <p className={`m-0 ${BODY}`}>{v.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Market-specific planning guidance — the part that earns the ranking */}
      <section className="border-t border-[#e6ddd2] py-[62px] text-center">
        <SectionHeading script="Planning">{practicalHeading}</SectionHeading>
        <div className="mx-auto flex max-w-[760px] flex-col gap-9 text-left">
          {practical.map((item) => (
            <div key={item.h} className="flex flex-col gap-2">
              <h3 className={`${H} m-0 text-[14px] md:text-[16px]`}>{item.h.toUpperCase()}</h3>
              <p className={`m-0 ${BODY}`}>{item.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ — mirrors the FAQPage schema above */}
      <section className="border-t border-[#e6ddd2] py-[62px] text-center">
        <SectionHeading script="Common">QUESTIONS</SectionHeading>
        <div className="mx-auto flex max-w-[760px] flex-col gap-9 text-left">
          {faqs.map((f) => (
            <div key={f.q} className="flex flex-col gap-2">
              <h3 className={`${H} m-0 text-[14px] md:text-[16px]`}>{f.q}</h3>
              <p className={`m-0 ${BODY}`}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Close */}
      <section className="border-t border-[#e6ddd2] pb-4 pt-[62px] text-center">
        <div className="font-script text-[38px] leading-none sm:text-[44px] md:text-[56px]">Let&rsquo;s begin</div>
        <p className={`mx-auto mb-9 mt-4 max-w-[620px] ${BODY}`}>
          Tell us about your celebration in {city}, {region} &mdash; the date you have in mind, the
          people who matter most, and the feeling you want the day to leave behind.
        </p>
        <Link
          href="/contact"
          className="inline-block border-b border-[#443221] pb-1 text-[12px] font-light uppercase tracking-[0.18em] transition-colors hover:border-tan"
        >
          Inquire now
        </Link>

        {/* Contextual internal links. Without these the location pages are
            reachable only from the footer, which is a weak signal for the two
            pages the whole search strategy rests on. */}
        <nav aria-label="Explore more" className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {[
            ['/gallery', `See ${city} weddings`],
            ['/love-notes', 'Read client reviews'],
            ['/arabella', 'Meet Arabella'],
            sibling && [sibling.slug, `${sibling.city} wedding planner`],
          ]
            .filter(Boolean)
            .map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="text-[11px] font-light uppercase tracking-[0.18em] text-brown transition-colors hover:text-tan"
              >
                {label}
              </Link>
            ))}
        </nav>
      </section>
    </main>
  );
}
