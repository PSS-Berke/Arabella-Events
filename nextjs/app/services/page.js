import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Wedding Planning & Design Packages',
  description:
    'Full-service planning and design and partial planning for Scottsdale and Sedona weddings. Full service from a $60,000 investment; all-inclusive Sedona micro weddings from $20,000.',
  path: '/services',
});

/*
 * Packages, redesigned Oct 2026 as an editorial page: a split hero, then
 * numbered chapters (I–V) that alternate photo and copy, a dark "investment"
 * band with the three design tiers, the planning process on cream, the à la
 * carte list, and a closing call to action. Sections fade up on scroll
 * (components/Reveal.js).
 */

// Design tiers: starting overall wedding investment per guest (peak pricing).
// `example` shows what that means for a 100-guest wedding.
const EXPERIENCES = [
  {
    name: 'AWE Essential',
    from: '$750',
    example: '100 guests from $75,000',
    about: 'Beautiful, intentional, simpler design: selective floral accents, strong photography, a beautiful cake, and standard rentals.',
  },
  {
    name: 'AWE Full Design',
    from: '$1,000',
    example: '100 guests from $100,000',
    about: 'A cohesive custom aesthetic: upgraded rentals and linens, substantial florals, stationery and signage, candlelight, and layered details.',
  },
  {
    name: 'AWE Editorial',
    from: '$1,500',
    example: '100 guests from $150,000',
    about: 'Transformative floral and design, specialty rentals, installations, custom production, and an elevated guest experience.',
  },
];

// Our planning process: the six things every AWE couple can count on.
const PROCESS = [
  {
    title: 'Personal from the First Hello',
    about: 'From the first call to the last dance, our team knows your wedding inside and out, so nothing is left to chance.',
  },
  {
    title: 'Design That Is Only Yours',
    about: 'Every wedding starts with a blank page. Your story shapes the venue, the palette, and the table, and we never repeat a design.',
  },
  {
    title: 'Calm on the Day',
    about: 'Careful planning means you arrive at your wedding rested, confident, and free to simply be present.',
  },
  {
    title: 'Sedona & Scottsdale, Known by Heart',
    about: "Years inside Arizona's most beautiful venues mean we know every courtyard, creekside lawn, and golden hour.",
  },
  {
    title: 'Always Within Reach',
    about: 'Every message answered within 24 hours, because your excitement should never have to wait.',
  },
  {
    title: 'Guests Who Feel Cared For',
    about: 'From the welcome note to the send-off, every detail is designed around how the people you love will feel.',
  },
];

// À la carte add-ons (prices confirmed by Arabella, Oct 2026). To add
// one, copy a line; `price` is shown as written.
const A_LA_CARTE = [
  { name: 'Budget Creation', price: '$500', about: 'A complete, realistic budget built around your priorities, with guidance on where to invest and where to save.' },
  { name: 'Venue Search', price: '$95/hour', about: 'Curated venue recommendations, availability checks, and tours alongside you.' },
  { name: 'Vendor Curation', price: '$750', about: 'A hand-picked list of trusted vendors for your style and budget, with introductions and booking support.' },
  { name: 'Design Consultation', price: '$650', about: 'A full design session and mood board to set the look and feel of your celebration.' },
  { name: 'Timeline Creation', price: '$350', about: 'A detailed wedding-day timeline shared with every vendor, so the day runs without a hitch.' },
  { name: 'Rehearsal Coordination', price: '$450', about: 'We run your ceremony rehearsal so everyone knows exactly where to be.' },
  { name: 'Additional Coordination', price: '$125/hour', about: 'Extra hours of on-site coordination for longer celebrations or added events.' },
  { name: 'Welcome Party or Farewell Brunch', price: 'from $1,500', about: 'Planning and coordination for the gatherings around your wedding weekend.' },
  { name: 'Rush Fee', price: 'from $500', about: 'For weddings booked less than four months out.' },
];

const JUMP = [
  { href: '#full-planning', label: 'Full Planning' },
  { href: '#investment', label: 'Investment' },
  { href: '#dana-and-arabella', label: 'Dana + Arabella' },
  { href: '#micro-weddings', label: 'Micro Weddings' },
  { href: '#partial-planning', label: 'Partial Planning' },
  { href: '#a-la-carte', label: 'À la carte' },
];

const BODY = 'text-[15px] font-light leading-[1.95] tracking-[0.03em] text-pretty';
const GOLD = 'text-[#9a8158]';
const CTA =
  'inline-block border border-[#443221] px-9 py-3 text-[12px] font-normal uppercase tracking-[0.22em] text-[#443221] no-underline transition-colors duration-500 hover:bg-[#443221] hover:text-white';

// Raw markup keeps the `muted` attribute in SSR HTML (React drops the muted
// prop, and without it browsers block autoplay until hydration).
function VideoBlock({ src, poster, autoplay, className }) {
  const html = `<video src="${src}" poster="${poster}"${autoplay ? ' autoplay muted loop' : ''} playsinline controls preload="metadata" aria-label="Video Player" style="display:block;width:100%;height:100%;object-fit:cover"></video>`;
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

// Chapter heading: a gold roman numeral, the script word, then the title.
function Chapter({ num, script, title, align = 'left', light = false }) {
  return (
    <div className={align === 'center' ? 'text-center' : 'text-center md:text-left'}>
      <p className={`m-0 font-display text-[15px] italic tracking-[0.2em] ${light ? 'text-[#c9b48a]' : GOLD}`}>{num}</p>
      <div className="mt-3 font-script text-[44px] leading-none md:text-[60px]">{script}</div>
      <h2 className="m-0 mt-2 font-display text-[24px] font-normal uppercase tracking-[0.18em] sm:text-[30px] md:text-[36px]">{title}</h2>
    </div>
  );
}

function Bullets({ items }) {
  return (
    <ul className="m-0 mt-8 flex list-none flex-col gap-4 p-0 text-left">
      {items.map((item) => (
        <li key={item} className={`flex gap-4 ${BODY}`}>
          <span aria-hidden="true" className="mt-[13px] h-px w-5 shrink-0 bg-[#c9b48a]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Packages() {
  return (
    <main className="text-[#443221]">
      {/* Hero: a full-width candlelit table under a dark wash, matching the
          investment band; lines rise in turn and the gold rules draw outward. */}
      <section className="relative isolate flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-[#1d1915] px-6 py-24 text-center text-white">
        <Image
          src="/media/hh-long-table-tapers-menus-111372ff.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="awe-settle -z-20 object-cover object-[50%_65%]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/50 to-black/75" />
        <p className="awe-rise m-0 text-[11px] font-light uppercase tracking-[0.3em] text-[#c9b48a]" style={{ animationDelay: '0.1s' }}>
          Sedona &middot; Scottsdale &middot; Destination
        </p>
        <div className="awe-rise mt-6 font-script text-[56px] leading-none text-[#e9dcc4] md:text-[84px]" style={{ animationDelay: '0.3s' }}>
          the
        </div>
        <h1
          className="awe-rise m-0 mt-2 font-display text-[36px] font-normal uppercase tracking-[0.24em] md:text-[60px]"
          style={{ animationDelay: '0.6s' }}
        >
          Packages
        </h1>
        <div className="mt-8 flex w-full max-w-[560px] items-center gap-5" aria-hidden="true">
          <span className="awe-draw h-px flex-1 origin-right bg-[#c9b48a]" style={{ animationDelay: '1s' }} />
          <Image
            src="/media/awe-logo-champagne-29e404bd.png"
            alt=""
            width={648}
            height={242}
            priority
            className="awe-rise h-auto w-[100px] md:w-[120px]"
            style={{ animationDelay: '1s' }}
          />
          <span className="awe-draw h-px flex-1 origin-left bg-[#c9b48a]" style={{ animationDelay: '1s' }} />
        </div>
        <p
          className="awe-rise m-0 mt-8 max-w-[560px] font-display text-[19px] italic leading-[1.6] text-white/90 md:text-[22px]"
          style={{ animationDelay: '1.3s' }}
        >
          Planning and design tailored to every couple, and never repeated.
        </p>
        <nav
          aria-label="On this page"
          className="awe-rise mt-12 flex max-w-[760px] flex-wrap justify-center gap-x-8 gap-y-3"
          style={{ animationDelay: '1.6s' }}
        >
          {JUMP.map((j) => (
            <a
              key={j.href}
              href={j.href}
              className="border-b border-transparent pb-1 text-[11px] font-light uppercase tracking-[0.24em] text-white/85 no-underline transition-colors hover:border-[#c9b48a] hover:text-white"
            >
              {j.label}
            </a>
          ))}
        </nav>
      </section>

      {/* I. Full planning + design */}
      <section id="full-planning" className="mx-auto grid max-w-[1120px] scroll-mt-24 items-center gap-12 px-6 py-20 md:grid-cols-[1.05fr_1fr] md:gap-16 md:px-10 md:py-28">
        <Reveal>
          <Chapter num="I" script="full" title="Planning + Design" />
          <p className={`m-0 mt-8 ${BODY}`}>
            Every proposal is tailored to the planning, design, and coordination your celebration calls for. Full-service
            weddings with AWE typically begin at $60,000 in total investment, with design-forward celebrations beginning
            around $750 per guest: a deeply personal day with thoughtful details, elevated design, and a seamless guest
            experience.
          </p>
          <p className="m-0 mt-8 border-l border-[#c9b48a] pl-5 font-display text-[19px] italic leading-[1.6] md:text-[21px]">
            Planning + design fee: 15% of your overall wedding spend, with an $8,500 minimum.
          </p>
          <p className={`m-0 mt-5 text-[11px] font-normal uppercase tracking-[0.22em] ${GOLD}`}>
            Peak month &amp; weekend pricing &middot; Off-peak from $7,000
          </p>
        </Reveal>
        <Reveal delay={150}>
          <VideoBlock
            src="/media/49b5c3_ff293a45593944c0a480183eccc60df8-480p-ba23b20b.mp4"
            poster="/media/49b5c3_ff293a45593944c0a480183eccc60df8f002-a7586541.jpg"
            autoplay
            className="aspect-[4/5] w-full bg-[#2b2420]"
          />
        </Reveal>
      </section>

      {/* Investment: the three design tiers, on a dark band */}
      <section id="investment" className="scroll-mt-24 bg-[#1d1915] px-6 py-20 text-white md:py-28">
        <Reveal className="mx-auto max-w-[760px] text-center">
          <p className="m-0 text-[11px] font-light uppercase tracking-[0.3em] text-[#c9b48a]">The AWE Experiences</p>
          <div className="mt-4 font-script text-[48px] leading-none text-[#e9dcc4] md:text-[66px]">your</div>
          <h2 className="m-0 mt-2 font-display text-[26px] font-normal uppercase tracking-[0.2em] md:text-[40px]">Investment</h2>
          <p className="m-0 mx-auto mt-7 max-w-[600px] text-[15px] font-light leading-[1.95] tracking-[0.03em] text-white/80">
            Choose the level of design that feels like you. Each experience shows the starting overall investment for your
            wedding, per guest. Our planning + design fee is separate: 15% of your total, with an $8,500 minimum.
          </p>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-[1120px] gap-6 md:grid-cols-3">
          {EXPERIENCES.map((x, n) => (
            <Reveal
              key={x.name}
              delay={n * 150}
              className="flex flex-col items-center border border-[#c9b48a]/40 px-8 py-12 text-center transition-colors duration-500 hover:border-[#c9b48a]"
            >
              <p className="m-0 font-display text-[14px] italic tracking-[0.2em] text-[#c9b48a]">{['I', 'II', 'III'][n]}</p>
              <h3 className="m-0 mt-3 font-display text-[19px] font-normal uppercase tracking-[0.2em] md:text-[21px]">{x.name}</h3>
              <span aria-hidden="true" className="mt-6 h-px w-10 bg-[#c9b48a]" />
              <p className="m-0 mt-6 text-[10px] font-light uppercase tracking-[0.3em] text-white/60">Starting at</p>
              <p className="m-0 mt-2 font-display text-[48px] font-normal leading-none md:text-[56px]">{x.from}</p>
              <p className="m-0 mt-2 text-[11px] font-light uppercase tracking-[0.26em] text-white/70">per guest</p>
              <p className="m-0 mt-3 font-display text-[16px] italic text-[#e9dcc4]">{x.example}</p>
              <p className="m-0 mt-7 text-[14.5px] font-light leading-[1.9] tracking-[0.03em] text-white/80 text-pretty">{x.about}</p>
            </Reveal>
          ))}
        </div>
        <p className="m-0 mx-auto mt-12 max-w-[640px] text-center text-[11px] font-light uppercase leading-[2] tracking-[0.22em] text-white/60">
          Pricing reflects peak months &amp; weekends &middot; Off-peak dates offer full planning + design from $7,000
        </p>
        <div className="mt-10 text-center">
          <Link
            href="/contact"
            className="inline-block border border-[#c9b48a] px-9 py-3 text-[12px] font-light uppercase tracking-[0.24em] text-white no-underline transition-colors duration-500 hover:bg-[#c9b48a] hover:text-[#1d1915]"
          >
            Begin your application
          </Link>
        </div>
      </section>

      {/* Our planning process, on cream */}
      <section id="process" className="scroll-mt-24 bg-[#f8f5f0] px-6 py-20 md:py-28">
        <Reveal className="text-center">
          <div className="font-script text-[44px] leading-none md:text-[60px]">our</div>
          <h2 className="m-0 mt-2 font-display text-[24px] font-normal uppercase tracking-[0.18em] sm:text-[30px] md:text-[36px]">Planning Process</h2>
        </Reveal>
        <div className="mx-auto mt-16 grid max-w-[1120px] gap-x-14 gap-y-14 sm:grid-cols-2 md:grid-cols-3">
          {PROCESS.map((p, n) => (
            <Reveal key={p.title} delay={(n % 3) * 120}>
              <p className={`m-0 font-display text-[15px] tracking-[0.2em] ${GOLD}`}>{String(n + 1).padStart(2, '0')}</p>
              <span aria-hidden="true" className="mt-3 block h-px w-8 bg-[#c9b48a]" />
              <h3 className="m-0 mt-5 font-display text-[24px] font-normal italic leading-[1.2] md:text-[26px]">{p.title}</h3>
              <p className={`m-0 mt-4 ${BODY}`}>{p.about}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* II. Dana + Arabella: planning + photography collaboration */}
      <section id="dana-and-arabella" className="mx-auto grid max-w-[1120px] scroll-mt-24 items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-10 md:py-28">
        <Reveal className="md:order-2">
          <Image
            src="/media/dana-x-awe-photobooth-46ae5db1.png"
            alt="Dana and Arabella laughing in a vintage photo-booth strip, captioned Dana Maruna Photo x AWE"
            width={580}
            height={657}
            sizes="(min-width: 768px) 460px, 90vw"
            className="mx-auto h-auto w-full max-w-[460px]"
          />
        </Reveal>
        <Reveal delay={150} className="md:order-1">
          <Chapter num="II" script="Dana + Arabella" title="Planning & Photography" />
          <p className={`m-0 mt-8 ${BODY}`}>
            A collaboration with{' '}
            <a href="https://danamarunaphoto.com/" target="_blank" rel="noreferrer" className="underline decoration-[#d9cfc3] underline-offset-4 transition-colors hover:text-tan">
              Dana Maruna Photo
            </a>
            : full planning and film photography, designed together from the very first idea.
          </p>
          <p className="m-0 mt-8 font-display text-[30px] tracking-[0.04em] md:text-[34px]">
            <span className="mr-3 align-middle text-[11px] font-light uppercase tracking-[0.26em] text-brown">Starting at</span>
            $10,500
          </p>
          <Bullets
            items={[
              'Full planning',
              '6 hours of photography coverage',
              'Digital and film photos',
              'Collaborative timeline planning',
              'High-resolution images and an online gallery',
              'Two passionate girls who love what we do and are here to bring your vision to life',
            ]}
          />
          <div className="mt-10 text-center md:text-left">
            <Link href="/contact" className={CTA}>Inquire about dates</Link>
          </div>
        </Reveal>
      </section>

      {/* III. Micro weddings at Tlaquepaque */}
      <section id="micro-weddings" className="scroll-mt-24 border-y border-[#e6ddd2] bg-[#f8f5f0]">
        <div className="mx-auto grid max-w-[1120px] items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-10 md:py-28">
          <Reveal>
            <Image
              src="/media/hh-sycamore-courtyard-overview-25a451fc.jpg"
              alt="A reception set beneath the sycamores in a Tlaquepaque courtyard"
              width={1067}
              height={1600}
              sizes="(min-width: 768px) 460px, 90vw"
              className="mx-auto h-auto w-full max-w-[460px]"
            />
          </Reveal>
          <Reveal delay={150}>
            <Chapter num="III" script="micro" title="Weddings at Tlaquepaque" />
            <p className={`m-0 mt-8 ${BODY}`}>
              All-inclusive packages at Tlaquepaque in Sedona, available on weekdays from mid-November through March and
              throughout the summer months.
            </p>
            <p className="m-0 mt-8 font-display text-[30px] tracking-[0.04em] md:text-[34px]">
              <span className="mr-3 align-middle text-[11px] font-light uppercase tracking-[0.26em] text-brown">Starting at</span>
              $20,000
              <span className="ml-3 align-middle text-[11px] font-light uppercase tracking-[0.26em] text-brown">for 50 guests</span>
            </p>
            <Bullets items={['Venue fee', 'Catering', 'Rentals', 'On-site coordinator']} />
            <div className="mt-10 text-center md:text-left">
              <Link href="/contact" className={CTA}>Ask about dates</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* IV. Partial planning */}
      <section id="partial-planning" className="mx-auto grid max-w-[1120px] scroll-mt-24 items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-10 md:py-28">
        <Reveal className="md:order-2">
          <VideoBlock
            src="/media/49b5c3_d326db7690b1430d9fe14de2a6bb4b92-1080p.mp4"
            poster="/media/49b5c3_d326db7690b1430d9fe14de2a6bb4b92f000-cb0df2e4.jpg"
            autoplay={false}
            className="aspect-[4/5] w-full bg-[#2b2420]"
          />
        </Reveal>
        <Reveal delay={150} className="md:order-1">
          <Chapter num="IV" script="partial" title="Planning" />
          <p className={`m-0 mt-8 ${BODY}`}>
            For couples who have begun planning and want an expert beside them for the decisions that matter most.
          </p>
          <p className="m-0 mt-8 font-display text-[30px] tracking-[0.04em] md:text-[34px]">
            <span className="mr-3 align-middle text-[11px] font-light uppercase tracking-[0.26em] text-brown">Starting at</span>
            $5,900
          </p>
          <Bullets
            items={[
              'A set number of professional planning hours to use throughout the process',
              'Planner attendance at select vendor meetings',
              'Monthly or quarterly planning check-ins',
              'Budget planning and management support',
              'Wedding-day coordination',
              'Regular reminders and guidance to keep planning on track',
            ]}
          />
        </Reveal>
        {/* Arabella's note on starting partial planning (her wording, Oct 2026) */}
        <Reveal className="border border-[#e6ddd2] bg-[#f8f5f0] px-7 py-9 md:order-3 md:col-span-2 md:px-12 md:py-11">
          <p className={`m-0 text-center font-display text-[20px] italic md:text-[23px]`}>
            A Note About Partial Planning <span className={GOLD}>&#9825;</span>
          </p>
          <div className={`mx-auto mt-6 flex max-w-[720px] flex-col gap-4 text-center ${BODY}`}>
            <p className="m-0">
              At Arabella&rsquo;s Weddings &amp; Events, we take great pride in the experience we create for our couples.
              Because partial planning means stepping into an already established planning process, we kindly ask that all
              previously booked vendors, contracts, and important details are organized and aligned before our services begin.
            </p>
            <p className="m-0">
              To ensure we can provide the level of care and attention every celebration deserves, AWE reserves the right to
              delay the start of services if existing arrangements require additional organization, communication, or
              logistical support beyond the scope of partial planning.
            </p>
            <p className="m-0">
              Our goal is never to create additional stress, but to ensure we are stepping into a planning process where we can
              confidently support you, your vendors, and the beautiful day you&rsquo;ve envisioned.
            </p>
          </div>
        </Reveal>
      </section>

      {/* V. À la carte: each row opens to a short description */}
      <section id="a-la-carte" className="scroll-mt-24 border-t border-[#e6ddd2] px-6 py-20 md:py-28">
        <Reveal>
          <Chapter num="V" script="à la carte" title="Services" align="center" />
          <p className={`m-0 mx-auto mt-6 max-w-[520px] text-center ${BODY}`}>Add any of these to your package, or book them on their own.</p>
        </Reveal>
        <Reveal delay={150} className="mx-auto mt-12 max-w-[720px] border-t border-[#e6ddd2]">
          {A_LA_CARTE.map((s) => (
            <details key={s.name} className="group border-b border-[#e6ddd2]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-2 py-6 transition-colors hover:text-tan [&::-webkit-details-marker]:hidden">
                <span className="font-display text-[18px] tracking-[0.06em] md:text-[21px]">{s.name}</span>
                <span className="flex shrink-0 items-center gap-5">
                  <span className={`font-display text-[17px] italic md:text-[19px] ${GOLD}`}>{s.price}</span>
                  <span aria-hidden="true" className="text-[18px] font-light text-brown transition-transform duration-500 group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className={`m-0 px-2 pb-7 ${BODY}`}>{s.about}</p>
            </details>
          ))}
        </Reveal>
      </section>

      {/* Closing call to action */}
      <section className="relative isolate overflow-hidden bg-[#1d1915] px-6 py-24 text-center text-white md:py-32">
        <Image
          src="/media/film-candles-fireplace-b617fac6.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/60" />
        <Reveal>
          <div className="font-script text-[54px] leading-none text-[#e9dcc4] md:text-[80px]">let&rsquo;s begin</div>
          <h2 className="m-0 mt-3 font-display text-[24px] font-normal uppercase tracking-[0.2em] md:text-[36px]">Your celebration, your way</h2>
          <Link
            href="/contact"
            className="mt-10 inline-block border border-[#c9b48a] px-9 py-3 text-[12px] font-light uppercase tracking-[0.24em] text-white no-underline transition-colors duration-500 hover:bg-[#c9b48a] hover:text-[#1d1915]"
          >
            Inquire
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
