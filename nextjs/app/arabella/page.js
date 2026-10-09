import Image from 'next/image';
import Reveal from '@/components/Reveal';
import Link from 'next/link';
import { PersonSchema } from '@/components/Schema';
import { ABOUT_IMG, HEART_PARAS, TRAJECTORY_PARAS, CORE_PARAS } from '@/lib/about-content';

import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'About Arabella | Scottsdale & Sedona Wedding Planner',
  description:
    'Meet Arabella: 300+ celebrations since 2017, with a background at MGM Resorts, InterContinental, and Hilton. Wedding planning in Scottsdale and Sedona.',
  path: '/arabella',
});

/*
 * About page, redesigned Oct 2026 in the homepage's editorial style (it was a
 * 1:1 copy of the Wix page: small fixed-width photos, narrow letterspaced text
 * and baked script badges). All copy is unchanged from lib/about-content.js.
 *   name & title (page h1) → the trajectory → experience →
 *   the heart →
 *   candid strip → the core → CTA (the intro + numbers were removed and the
 *   trajectory moved up, Oct 2026, so visitors see Arabella's experience first)
 */

const H2 = 'm-0 font-display text-[24px] font-normal uppercase tracking-[0.16em] sm:text-[30px] md:text-[34px]';
const SCRIPT = 'font-script text-[40px] leading-none md:text-[54px]';
const BODY = 'text-[15.5px] font-light leading-[1.95] tracking-[0.02em] text-[#4a3a2c] text-pretty';
const EYEBROW = 'm-0 text-[11px] font-light uppercase tracking-[0.24em] text-brown';
const MAIL =
  'mt-6 inline-block border-b border-[#d9cfc3] pb-1 font-display text-[16px] tracking-[0.04em] text-[#443221] no-underline transition-colors hover:border-tan hover:text-tan';

// "Dive deeper into my experience": the hospitality brands behind AWE, told as
// a story rather than a résumé (no titles or dates on the page). Drawn from
// Arabella's résumé, Oct 2026. InterContinental's line is general until she
// shares specifics.
const EXPERIENCE = [
  {
    brand: 'MGM Resorts International',
    where: 'The Las Vegas Strip',
    line: 'Primary coordinator for The Cosmopolitan, Bellagio, The Mirage, Park MGM, and ARIA in a role newly created at MGM corporate, overseeing event marketing across every property on the Strip, from exclusive casino events to black-tie galas, concerts, fights, and sporting events.',
    venues: ['The Cosmopolitan', 'Bellagio', 'The Mirage', 'Park MGM', 'ARIA'],
  },
  {
    brand: 'Hilton',
    where: 'Lake Las Vegas & Sedona',
    line: 'Planning weddings at Hilton Lake Las Vegas, voted the best outdoor wedding venue in Las Vegas by Brides.com, surpassing sales goals by 150%, then leading corporate events at Hilton Sedona, from executive meetings to full-scale company gatherings.',
  },
  {
    brand: 'L’Auberge de Sedona',
    where: 'Sedona, Arizona',
    line: 'As Senior Sales Manager for weddings, guiding couples to their day along Oak Creek at one of Sedona’s most beloved resorts, and surpassing my sales goal along the way.',
  },
  {
    brand: 'InterContinental Hotels',
    where: 'Luxury hospitality',
    line: 'Learning the art of five-star service, where every guest is made to feel like the only one in the room.',
  },
  {
    brand: 'Legends',
    where: 'Legends Global · Illuminarium Las Vegas & Atlanta',
    line: 'Leading events and group sales for Illuminarium in Las Vegas and Atlanta, and doubling group sales in a single year, with Legends Global, the hospitality and venue company behind some of the world’s most iconic stages.',
    // Legends Global's flagship venues, per its press release (Oct 2026).
    venues: [
      'SoFi Stadium',
      'Caesars Superdome',
      'Soldier Field',
      'OVO Arena Wembley',
      'Coca-Cola Arena Dubai',
      'Avicii Arena',
      'AO Arena',
      'ICC Sydney',
      'Moscone Center',
      'Kai Tak Sports Park',
    ],
  },
];

// The headline numbers above the brands.
const HIGHLIGHTS = [
  { big: '9', small: 'Las Vegas Strip resorts' },
  { big: '150%', small: 'Of sales goal' },
  { big: '2×', small: 'Group sales in a year' },
  { big: '300+', small: 'Celebrations' },
];
const CANDIDS = [
  { src: ABOUT_IMG.candid1, w: 614, h: 430, alt: 'Laughing with a bride at an outdoor reception under string lights' },
  { src: '/media/cabin-shoot-laughing-14ed8beb.jpg', w: 1334, h: 2000, alt: 'A big laugh behind a candlelit forest tablescape' },
  { src: ABOUT_IMG.candid2, w: 702, h: 430, alt: 'Arabella taking photos of three wedding guests in a garden' },
  { src: '/media/cabin-shoot-smiling-f3d0f913.jpg', w: 1334, h: 2000, alt: 'Smiling behind the candles and white roses of a forest tablescape' },
  { src: ABOUT_IMG.candid3, w: 632, h: 430, alt: 'Hugging a veiled bride at a reception' },
];

// Indexes into CANDIDS: guest photo between the two portraits, then the pair.
const CANDID_ROWS = [
  [1, 2, 3],
  [0, 4],
];

function Photo({ src, w, h, alt, className = '', sizes }) {
  return <Image src={src} alt={alt} width={w} height={h} sizes={sizes} className={`h-auto w-full object-cover ${className}`} />;
}

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden text-[#443221]">
      <PersonSchema />

      {/* Opening: a quiet, centered name and title (Arabella didn't want a big
          dramatic opener). Lines rise softly and the gold rules draw outward. */}
      <header className="px-6 pb-4 pt-14 text-center md:pt-20">
        <h1 className="m-0">
          <span
            className="awe-rise block font-display text-[40px] font-normal uppercase leading-none tracking-[0.22em] md:text-[60px]"
            style={{ animationDelay: '0.1s' }}
          >
            Arabella
          </span>
          <span className="mx-auto mt-6 flex w-full max-w-[360px] items-center gap-4" aria-hidden="true">
            <span className="awe-draw h-px flex-1 origin-right bg-[#c9b48a]" style={{ animationDelay: '0.4s' }} />
            <span className="awe-rise h-[5px] w-[5px] rotate-45 bg-[#c9b48a]" style={{ animationDelay: '0.4s' }} />
            <span className="awe-draw h-px flex-1 origin-left bg-[#c9b48a]" style={{ animationDelay: '0.4s' }} />
          </span>
          <span
            className="awe-rise mt-6 block font-display text-[14px] font-normal uppercase tracking-[0.32em] text-[#9a8158] md:text-[17px]"
            style={{ animationDelay: '0.6s' }}
          >
            Lead Planner &amp; Owner
          </span>
        </h1>
      </header>
      {/* The trajectory */}
      <section className="mx-auto grid max-w-[1120px] items-center gap-12 px-6 pb-20 pt-10 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-16 md:px-10 md:pb-28 md:pt-14">
        <Reveal>
          <div className={SCRIPT}>the</div>
          <h2 className={`${H2} mt-2`}>Trajectory</h2>
          <div className="mt-8 flex flex-col gap-5">
            {TRAJECTORY_PARAS.map((p, n) => (
              <p key={n} className={`m-0 ${BODY}`}>{p}</p>
            ))}
          </div>
          <a
            href="#experience"
            className="mt-10 inline-block border-b border-[#443221] pb-1 text-[12px] font-light uppercase tracking-[0.2em] text-[#443221] no-underline transition-colors hover:border-tan hover:text-tan"
          >
            Dive deeper into my experience &darr;
          </a>
        </Reveal>
        <Reveal delay={150} className="relative mx-auto w-full max-w-[440px]">
          <span aria-hidden="true" className="absolute -bottom-4 -right-4 h-full w-full border border-[#c9b48a]/60" />
          <Photo
            src={ABOUT_IMG.trajectoryPhoto}
            w={702}
            h={994}
            alt="Arabella seated on brick pavement beside a leaning oval mirror with painting supplies"
            sizes="(min-width: 1120px) 440px, (min-width: 768px) 42vw, 92vw"
            className="relative"
          />
        </Reveal>
      </section>
      {/* Experience: the hospitality brands behind AWE, on a dark band */}
      <section id="experience" className="scroll-mt-24 bg-[#1d1915] px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-[1060px]">
          <div className="text-center">
            <div className="font-script text-[44px] leading-none text-[#e9dcc4] md:text-[62px]">dive deeper into my</div>
            <h2 className="m-0 mt-2 font-display text-[26px] font-normal uppercase tracking-[0.22em] md:text-[40px]">Experience</h2>
            <p className="m-0 mx-auto mt-7 max-w-[620px] text-[15.5px] font-light leading-[1.95] tracking-[0.02em] text-white/80 text-pretty">
              Before AWE, and alongside it, I spent years inside some of hospitality&rsquo;s most respected names, planning
              events at every scale. Every one of those rooms shaped the way I plan your wedding.
            </p>
          </div>

          <dl className="m-0 mx-auto mt-14 grid max-w-[880px] grid-cols-2 gap-y-10 border-y border-[#c9b48a]/30 py-10 md:grid-cols-4">
            {HIGHLIGHTS.map((h) => (
              <div key={h.small} className="text-center">
                <dd className="m-0 font-display text-[40px] leading-none text-[#e9dcc4] md:text-[52px]">{h.big}</dd>
                <dt className="m-0 mt-3 text-[10px] font-light uppercase tracking-[0.26em] text-white/65">{h.small}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-6">
            {EXPERIENCE.map((x, n) => (
              <Reveal
                key={x.brand}
                delay={80}
                className={`grid items-baseline gap-4 border-b border-[#c9b48a]/20 py-10 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-12 ${n === 0 ? '' : ''}`}
              >
                <div>
                  <p className="m-0 font-display text-[14px] italic tracking-[0.2em] text-[#c9b48a]">{['I', 'II', 'III', 'IV', 'V', 'VI'][n]}</p>
                  <h3 className="m-0 mt-2 font-display text-[28px] font-normal uppercase leading-[1.15] tracking-[0.12em] md:text-[34px]">{x.brand}</h3>
                  <p className="m-0 mt-2 text-[11px] font-light uppercase tracking-[0.24em] text-white/60">{x.where}</p>
                </div>
                <div>
                  <p className="m-0 font-display text-[19px] italic leading-[1.65] text-white/90 md:text-[22px]">{x.line}</p>
                  {x.venues ? (
                    <ul className="m-0 mt-5 flex list-none flex-wrap gap-x-3 gap-y-2 p-0 text-[10.5px] font-light uppercase tracking-[0.22em] text-[#c9b48a]">
                      {x.venues.map((v, k) => (
                        <li key={v} className="whitespace-nowrap">
                          {k > 0 ? <span aria-hidden="true" className="mr-3 text-white/30">&middot;</span> : null}
                          {v}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="m-0 font-script text-[40px] leading-none text-[#e9dcc4] md:text-[54px]">and now,</p>
            <p className="m-0 mt-3 font-display text-[20px] uppercase tracking-[0.2em] md:text-[26px]">Arabella&rsquo;s Weddings &amp; Events</p>
            <p className="m-0 mx-auto mt-5 max-w-[560px] font-display text-[18px] italic leading-[1.65] text-white/85 md:text-[20px]">
              Everything I learned, poured into one place, for couples who want their day to feel completely their own.
            </p>
          </div>
        </div>
      </section>
      {/* The heart */}
      <section className="bg-[#f7f1ec] px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1120px] items-center gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 md:px-4">
          <Reveal className="relative mx-auto w-full max-w-[440px]">
            <span aria-hidden="true" className="absolute -left-4 -top-4 h-full w-full border border-[#c9b48a]/60" />
            <Photo
              src="/media/Screenshot-2026-01-26-6_54_32-PM-52c31217.png"
              w={553}
              h={836}
              alt="Arabella laughing behind a candle-lit tablescape of white florals and autumn foliage"
              sizes="(min-width: 1120px) 440px, (min-width: 768px) 42vw, 92vw"
              className="relative"
            />
          </Reveal>
          <Reveal delay={150}>
            <div className={SCRIPT}>the</div>
            <h2 className={`${H2} mt-2`}>Heart</h2>
            <div className="mt-8 flex flex-col gap-5">
              {HEART_PARAS.map((p, n) => (
                <p key={n} className={`m-0 ${BODY}`}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      {/* Candid strip. Never cropped: each photo's width share in its row is
          its own aspect ratio, so every photo in a row lands at the same
          height with nothing cut off (the guest photo needs Arabella, behind
          the camera at its right edge, to stay in frame). */}
      <section className="flex flex-col gap-2 px-2 py-2 md:gap-3 md:px-3 md:py-3">
        {CANDID_ROWS.map((row, r) => (
          <div key={r} className="flex gap-2 md:gap-3">
            {row.map((i) => {
              const c = CANDIDS[i];
              return (
                <div key={c.src} style={{ flex: `${c.w / c.h} 1 0` }} className="min-w-0">
                  <Photo {...c} sizes="(min-width: 768px) 50vw, 60vw" />
                </div>
              );
            })}
          </div>
        ))}
      </section>

      {/* The core */}
      <section className="px-6 py-20 text-center md:py-28">
        <Reveal className="mx-auto max-w-[900px]">
          <div className={SCRIPT}>the</div>
          <h2 className={`${H2} mt-2`}>Core</h2>
          <Photo
            src={ABOUT_IMG.corePhoto}
            w={1200}
            h={978}
            alt="Arabella smiling behind a fully set candlelit table in a forest backyard"
            sizes="(min-width: 900px) 760px, 92vw"
            className="mx-auto mt-12 max-w-[760px]"
          />
          <div className="mx-auto mt-12 flex max-w-[680px] flex-col gap-6">
            {CORE_PARAS.map((para, n) => (
              <p key={n} className="m-0 font-display text-[19px] italic leading-[1.7] text-[#5a4634] md:text-[22px]">
                {para.map((seg, s) =>
                  seg.bold ? (
                    <strong key={s} className="font-semibold not-italic">{seg.text}</strong>
                  ) : (
                    <span key={s}>{seg.text}</span>
                  )
                )}
              </p>
            ))}
          </div>
        </Reveal>
      </section>
      {/* The team: Andie (day-of assistant; oversees micro weddings and
          month-of coordination) and Malu (Arabella's partner; his copy is
          Arabella's own words, Oct 2026). Matching cards on cream. */}
      <section className="bg-[#f7f1ec] px-6 py-20 md:py-28">
        <Reveal className="text-center">
          <div className={SCRIPT}>meet the</div>
          <h2 className={`${H2} mt-2`}>Team</h2>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-[1060px] items-start gap-8 md:grid-cols-2">
          <Reveal className="flex flex-col items-center bg-white px-8 py-12 text-center md:px-12">
            <div className="flex aspect-[3/4] w-full max-w-[280px] items-center justify-center bg-[#efe6db]">
              <span className="font-script text-[120px] leading-none text-[#9a8158]">a</span>
            </div>
            <p className="m-0 mt-8 font-display text-[26px] uppercase tracking-[0.2em] md:text-[30px]">Andie Murray</p>
            <p className="m-0 mt-2 text-[11px] font-light uppercase tracking-[0.26em] text-[#9a8158]">Day-of Assistant</p>
            <span aria-hidden="true" className="mt-5 h-px w-10 bg-[#c9b48a]" />
            <p className={`m-0 mt-5 ${BODY}`}>
              The newest member of the AWE family, and already indispensable. Endlessly organized and full of ambition,
              Andie keeps Arabella on track and every detail in its place behind the scenes, so that on your wedding day
              you can simply be present.
            </p>
            <p className="m-0 mt-5 font-display text-[18px] italic leading-[1.6] text-[#5a4634] md:text-[20px]">
              Andie oversees our{' '}
              <Link href="/services#micro-weddings" className="underline decoration-[#d9cfc3] underline-offset-4 transition-colors hover:text-tan">
                micro wedding packages
              </Link>{' '}
              and month-of coordination.
            </p>
            <a href="mailto:hello@arabellasweddings.com" className={MAIL}>hello@arabellasweddings.com</a>
          </Reveal>
          <Reveal delay={150} className="flex flex-col items-center bg-white px-8 py-12 text-center md:px-12">
            <Image
              src="/media/malu-tlaquepaque-chapel-60cad573.jpg"
              alt="Malu Russell standing before the painted altar of the Tlaquepaque chapel"
              width={1500}
              height={2000}
              sizes="(min-width: 768px) 280px, 80vw"
              className="aspect-[3/4] h-auto w-full max-w-[280px] object-cover"
            />
            <p className="m-0 mt-8 font-display text-[26px] uppercase tracking-[0.2em] md:text-[30px]">Malu Russell</p>
            <p className="m-0 mt-2 text-[11px] font-light uppercase tracking-[0.26em] text-[#9a8158]">Arabella&rsquo;s Partner &amp; Behind-the-Scenes Support</p>
            <span aria-hidden="true" className="mt-5 h-px w-10 bg-[#c9b48a]" />
            <div className="mt-5 flex flex-col gap-4">
              <p className={`m-0 ${BODY}`}>
                Every strong woman needs someone in her corner, and Malu is one of the helping hands behind AWE.
              </p>
              <p className={`m-0 ${BODY}`}>
                As Arabella&rsquo;s partner, Malu plays a special role in supporting the business behind the scenes. From
                transporting rentals and assisting with installations to helping with the physical demands of wedding setups
                and breakdowns, he lends an extra set of hands wherever they&rsquo;re needed.
              </p>
              <p className={`m-0 ${BODY}`}>
                While Arabella handles the creative vision, planning, and finer details, Malu helps bring those visions to life
                through the less glamorous (but equally important!) parts of wedding production.
              </p>
              <p className={`m-0 ${BODY}`}>
                He may not be the one designing your tablescapes, but there&rsquo;s a good chance he&rsquo;s helped carry,
                build, load, or install something that made them possible.
              </p>
              <p className="m-0 font-display text-[18px] italic leading-[1.6] text-[#5a4634] md:text-[20px]">
                <strong className="font-semibold not-italic">His unofficial title?</strong> Arabella&rsquo;s right-hand,
                professional heavy lifter, master of table drape, and the muscle behind the magic.{' '}
                <span className="text-[#9a8158]">&#9825;</span>
              </p>
            </div>
            <a href="mailto:malu@arabellasweddings.com" className={MAIL}>malu@arabellasweddings.com</a>
          </Reveal>
        </div>
      </section>
      {/* Close: candlelit banner */}
      <section className="relative isolate overflow-hidden bg-[#1d1915] px-6 py-24 text-center text-white md:py-32">
        <Image src="/media/film-candles-fireplace-b617fac6.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/60" />
        <Reveal>
          <div className="font-script text-[54px] leading-none text-[#e9dcc4] md:text-[80px]">let&rsquo;s begin</div>
          <p className="m-0 mx-auto mt-6 max-w-[520px] font-display text-[19px] italic leading-[1.6] text-white/90 md:text-[22px]">
            Tell me about the celebration you&rsquo;re imagining. I&rsquo;d love to hear your story.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block border border-[#c9b48a] bg-[#c9b48a] px-9 py-3 text-[12px] font-light uppercase tracking-[0.24em] text-[#1d1915] no-underline transition-colors duration-500 hover:bg-transparent hover:text-white"
            >
              Inquire
            </Link>
            <Link
              href="/blog"
              className="inline-block border border-[#c9b48a] px-9 py-3 text-[12px] font-light uppercase tracking-[0.24em] text-white no-underline transition-colors duration-500 hover:bg-[#c9b48a] hover:text-[#1d1915]"
            >
              Read the blog
            </Link>
          </div>
        </Reveal>
      </section>    </main>
  );
}
