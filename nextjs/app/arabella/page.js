import Image from 'next/image';
import Reveal from '@/components/Reveal';
import CollageCarousel from '@/components/CollageCarousel';
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
  'inline-block border-b border-[#d9cfc3] pb-1 font-display text-[16px] tracking-[0.04em] text-[#443221] no-underline transition-colors hover:border-tan hover:text-tan';

// Meet the team. `summary` shows on the card; `more` opens with "Read more";
// `fun` fades in over the photo on hover (or tap on a phone)
// (simple HTML allowed, e.g. <a> and <strong>).
const TEAM = [
  {
    name: 'Arabella Mascari',
    role: 'Lead Planner & Owner',
    photo: { src: ABOUT_IMG.heartPhoto, alt: 'Arabella in a black dress standing at a candlelit forest tablescape' },
    summary: 'The creative mind behind AWE, leading every design and plan from the first conversation to the last dance.',
    more: [
      'Arabella draws on years inside some of hospitality’s most respected names, from MGM Resorts and Hilton to L’Auberge de Sedona and Legends Global.',
      'With more than 300 celebrations planned since 2017, across Sedona, Scottsdale, Chicago, and beyond, she brings a designer’s eye and a planner’s calm to every wedding, so each one feels completely its own. <a href="#trajectory" class="underline decoration-[#d9cfc3] underline-offset-4">Her experience ↓</a>',
    ],
    fun: 'A thoughtful, romantic soul who thrives on meaningful connections and spontaneous experiences. Proof you can chase dreams in heels or barefoot! A home full of butterflies, 42 plants, stained glass and eclectic portraits, and a vase that’s always full. Swing dancing, line dancing, roller skating, laughter, and music.',
    email: 'arabella@arabellasweddings.com',
  },
  {
    name: 'Andie Murray',
    role: 'Micro Weddings Specialist & Day-of Coordinator',
    photo: null,
    summary: 'Endlessly organized and full of ambition, Andie keeps every detail in its place, so you can simply be present.',
    more: [
      'The newest member of the AWE family, and already indispensable. Andie keeps Arabella on track and every detail in its place behind the scenes.',
      'As our micro weddings specialist and day-of coordinator, Andie oversees our <a href="/services#micro-weddings" class="underline decoration-[#d9cfc3] underline-offset-4">micro wedding packages</a> and month-of coordination.',
    ],
    fun: 'Swing dancing, line dancing, and taking care of her kiddos and her puppies!',
    email: 'hello@arabellasweddings.com',
  },
];
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

function Photo({ src, w, h, alt, className = '', sizes }) {
  return <Image src={src} alt={alt} width={w} height={h} sizes={sizes} className={`h-auto w-full object-cover ${className}`} />;
}

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden text-[#443221]">
      <PersonSchema />

      {/* Meet the team (top of the page, Oct 2026). Matching cards: the
          same photo frame, name, role, gold rule, a short summary, and a
          "Read more" that opens the full write-up,
          with the email pinned to the bottom so the cards line up. */}
      <section className="bg-[#f7f1ec] px-6 pb-20 pt-14 md:pb-28 md:pt-20">
        <Reveal className="text-center">
          <div className={SCRIPT}>meet the</div>
          <h1 className={`${H2} mt-2`}>Team</h1>
        </Reveal>
        <div className="mx-auto mt-14 grid max-w-[820px] items-stretch gap-8 md:grid-cols-2">
          {TEAM.map((m, n) => (
            <Reveal key={m.name} delay={n * 150} className="flex flex-col items-center bg-white px-7 py-10 text-center md:px-9">
              <div
                tabIndex={0}
                aria-label={`${m.name}: ${m.fun}`}
                className="group/photo relative aspect-[3/4] w-full max-w-[260px] cursor-default overflow-hidden bg-[#efe6db] outline-none"
              >
                {m.photo ? (
                  <Image src={m.photo.src} alt={m.photo.alt} fill sizes="(min-width: 768px) 260px, 80vw" className="object-cover" />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center font-script text-[110px] leading-none text-[#9a8158]">
                    {m.name[0].toLowerCase()}
                  </span>
                )}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 flex flex-col items-center justify-center bg-[#1d1915]/80 px-6 text-center text-white opacity-0 transition-opacity duration-500 group-hover/photo:opacity-100 group-focus/photo:opacity-100"
                >
                  <span className="font-script text-[34px] leading-none text-[#e9dcc4]">just for fun</span>
                  <span className="mt-4 font-display text-[16px] italic leading-[1.55] text-white/95">{m.fun}</span>
                </div>
              </div>
              <p className="m-0 mt-8 whitespace-nowrap font-display text-[19px] uppercase tracking-[0.14em] lg:text-[22px] lg:tracking-[0.18em]">{m.name}</p>
              <p className="m-0 mt-2 min-h-[2.6em] text-[10.5px] font-light uppercase leading-[1.6] tracking-[0.24em] text-[#9a8158]">{m.role}</p>
              <span aria-hidden="true" className="mt-4 h-px w-10 bg-[#c9b48a]" />
              <p className="m-0 mt-5 font-display text-[18px] italic leading-[1.6] text-[#5a4634] md:text-[19px]">{m.summary}</p>
              <details className="group mt-5 w-full">
                <summary className="cursor-pointer list-none text-[11px] font-light uppercase tracking-[0.22em] text-brown transition-colors hover:text-tan [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">Read more &darr;</span>
                  <span className="hidden group-open:inline">Read less &uarr;</span>
                </summary>
                <div className="mt-4 flex flex-col gap-4 text-left">
                  {m.more.map((para, k) => (
                    <p key={k} className={`m-0 ${BODY} text-[14.5px]`} dangerouslySetInnerHTML={{ __html: para }} />
                  ))}
                </div>
              </details>
              <a href={`mailto:${m.email}`} className={`${MAIL} mt-auto pt-8`}>{m.email}</a>
            </Reveal>
          ))}
        </div>
      </section>
      {/* The trajectory */}
      <section id="trajectory" className="scroll-mt-24 mx-auto grid max-w-[1120px] items-center gap-12 px-6 pb-20 pt-10 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-16 md:px-10 md:pb-28 md:pt-14">
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
      {/* The heart & the core (Oct 2026): one collage carousel (it also holds the
          candid photos that used to sit in their own strip), then the
          two pieces side by side in matching columns. */}
      <section className="bg-[#f7f1ec] px-6 py-20 md:py-24">
        <Reveal className="mx-auto w-full max-w-[860px]">
          <CollageCarousel
            slides={[
              [
                { src: ABOUT_IMG.corePhoto, alt: 'Arabella smiling behind a fully set candlelit table in a forest backyard' },
                { src: ABOUT_IMG.candid1, alt: 'Laughing with a bride at an outdoor reception under string lights' },
                { src: ABOUT_IMG.candid3, alt: 'Hugging a veiled bride at a reception' },
              ],
              [
                { src: '/media/arabella-arranging-wildflowers-4ef48f96.jpg', alt: 'Arabella smiling on the floor surrounded by wildflower arrangements in progress' },
                { src: ABOUT_IMG.candid2, alt: 'Arabella taking photos of three wedding guests in a garden', pos: '85% 40%' },
                { src: '/media/cabin-shoot-laughing-14ed8beb.jpg', alt: 'A big laugh behind a candlelit forest tablescape', pos: '50% 30%' },
              ],
              [
                { src: '/media/Screenshot-2026-01-26-6_54_32-PM-52c31217.png', alt: 'Arabella laughing behind a candle-lit tablescape of white florals and autumn foliage' },
                { src: '/media/cabin-shoot-smiling-f3d0f913.jpg', alt: 'Smiling behind the candles and white roses of a forest tablescape', pos: '50% 30%' },
                { src: '/media/arabella-arranging-wildflowers-team-45e3753a.jpg', alt: 'Arabella arranging wildflowers into rows of glass bud vases' },
              ],
              [
                { src: '/media/cabin-shoot-placing-menus-8202a2db.jpg', alt: 'Tucking custom menus onto gold-rimmed place settings' },
                { src: '/media/cabin-shoot-lighting-candle-ad98da3d.jpg', alt: 'Lighting a pillar candle among white roses and gold-rimmed coupes' },
                { src: '/media/cabin-tablescape-place-settings-13796f7a.jpg', alt: 'Scalloped gold-rimmed plates with custom menus and gold flatware' },
              ],
            ]}
          />
        </Reveal>
        <div className="mx-auto mt-16 grid max-w-[1040px] items-start gap-14 md:grid-cols-2 md:gap-16">
          <Reveal>
            <div className="text-center">
              <div className={SCRIPT}>the</div>
              <h2 className={`${H2} mt-2`}>Heart</h2>
              <span aria-hidden="true" className="mx-auto mt-5 block h-px w-10 bg-[#c9b48a]" />
            </div>
            <div className="mt-8 flex flex-col gap-5">
              {HEART_PARAS.map((p, n) => (
                <p key={n} className={`m-0 ${BODY}`}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="text-center">
              <div className={SCRIPT}>the</div>
              <h2 className={`${H2} mt-2`}>Core</h2>
              <span aria-hidden="true" className="mx-auto mt-5 block h-px w-10 bg-[#c9b48a]" />
            </div>
            <div className="mt-8 flex flex-col gap-5">
              {CORE_PARAS.map((para, n) => (
                <p key={n} className={`m-0 ${BODY}`}>
                  {para.map((seg, s) =>
                    seg.bold ? (
                      <strong key={s} className="font-semibold">{seg.text}</strong>
                    ) : (
                      <span key={s}>{seg.text}</span>
                    )
                  )}
                </p>
              ))}
            </div>
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
