import Image from 'next/image';
import Link from 'next/link';
import { PersonSchema } from '@/components/Schema';
import PressBar from '@/components/PressBar';
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
 *   intro + numbers → the heart → candid strip → the trajectory → the core → CTA
 */

const H2 = 'm-0 font-display text-[24px] font-normal uppercase tracking-[0.16em] sm:text-[30px] md:text-[34px]';
const SCRIPT = 'font-script text-[40px] leading-none md:text-[54px]';
const BODY = 'text-[15.5px] font-light leading-[1.95] tracking-[0.02em] text-[#4a3a2c] text-pretty';
const EYEBROW = 'm-0 text-[11px] font-light uppercase tracking-[0.24em] text-brown';

const NUMBERS = [
  { big: '300+', small: 'Celebrations & events' },
  { big: '2017', small: 'Planning since' },
  { big: 'AZ · Chicago', small: 'And worldwide' },
];

const BRANDS = ['MGM Resorts International', 'InterContinental Hotels', 'Hilton', 'Legends'];

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

      {/* Intro */}
      <section className="mx-auto grid max-w-[1120px] items-center gap-12 px-6 pb-16 pt-12 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-16 md:px-10 md:pb-24 md:pt-20">
        <div>
          <div className={SCRIPT}>Meet Arabella</div>
          <h1 className="m-0 mt-4 font-display text-[22px] font-normal uppercase leading-[1.5] tracking-[0.14em] sm:text-[27px] md:text-[31px]">
            Beautifully designed. Meticulously planned. Led by a heart that{' '}
            <span className="font-script text-[38px] normal-case tracking-normal md:text-[46px]">listens</span>
          </h1>
          <p className={`m-0 mt-6 ${BODY}`}>{HEART_PARAS[0]}</p>
          <dl className="m-0 mt-10 grid grid-cols-3 gap-4 border-t border-[#e6ddd2] pt-8">
            {NUMBERS.map((n) => (
              <div key={n.small}>
                <dt className={EYEBROW}>{n.small}</dt>
                <dd className="m-0 mt-2 font-display text-[22px] tracking-[0.04em] md:text-[28px]">{n.big}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Photo
          src={ABOUT_IMG.heartPhoto}
          w={692}
          h={1028}
          alt="Arabella in a black dress standing at a candlelit forest tablescape"
          sizes="(min-width: 1120px) 470px, (min-width: 768px) 42vw, 92vw"
          className="mx-auto max-w-[440px]"
        />
      </section>

      <PressBar className="border-b-0" />

      {/* The heart */}
      <section className="bg-[#f7f1ec] px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-[1120px] items-start gap-12 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 md:px-4">
          <Photo
            src="/media/Screenshot-2026-01-26-6_54_32-PM-52c31217.png"
            w={553}
            h={836}
            alt="Arabella laughing behind a candle-lit tablescape of white florals and autumn foliage"
            sizes="(min-width: 1120px) 460px, (min-width: 768px) 42vw, 92vw"
            className="md:sticky md:top-[200px]"
          />
          <div>
            <div className={SCRIPT}>The</div>
            <h2 className={`${H2} mt-2`}>Heart</h2>
            <div className="mt-8 flex flex-col gap-5">
              {HEART_PARAS.slice(1).map((p, n) => (
                <p key={n} className={`m-0 ${BODY}`}>{p}</p>
              ))}
            </div>
          </div>
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

      {/* The trajectory */}
      <section className="mx-auto grid max-w-[1120px] items-start gap-12 px-6 py-20 md:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] md:gap-16 md:px-10 md:py-28">
        <div>
          <div className={SCRIPT}>The</div>
          <h2 className={`${H2} mt-2`}>Trajectory</h2>
          <div className="mt-8 flex flex-col gap-5">
            {TRAJECTORY_PARAS.map((p, n) => (
              <p key={n} className={`m-0 ${BODY}`}>{p}</p>
            ))}
          </div>
          <div className="mt-10 border-t border-[#e6ddd2] pt-8">
            <p className={EYEBROW}>Hospitality background</p>
            <ul className="m-0 mt-4 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 font-display text-[17px] tracking-[0.06em] md:text-[19px]">
              {BRANDS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
        <Photo
          src={ABOUT_IMG.trajectoryPhoto}
          w={702}
          h={994}
          alt="Arabella seated on brick pavement beside a leaning oval mirror with painting supplies"
          sizes="(min-width: 1120px) 460px, (min-width: 768px) 42vw, 92vw"
          className="mx-auto max-w-[440px] md:sticky md:top-[200px]"
        />
      </section>

      {/* The core */}
      <section className="bg-[#f7f1ec] px-6 py-20 text-center md:py-28">
        <div className="mx-auto max-w-[900px]">
          <div className={SCRIPT}>The</div>
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
              <p key={n} className={`m-0 font-display text-[19px] italic leading-[1.7] text-[#5a4634] md:text-[22px]`}>
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
        </div>
      </section>

      {/* Close */}
      <section className="px-6 py-20 text-center md:py-24">
        <div className={SCRIPT}>Let&rsquo;s begin</div>
        <p className={`mx-auto mb-9 mt-5 max-w-[520px] ${BODY}`}>
          Tell me about the celebration you&rsquo;re imagining. I&rsquo;d love to hear your story.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-block border border-[#443221] bg-[#443221] px-8 py-3 text-[12px] font-light uppercase tracking-[0.2em] text-white no-underline transition-colors hover:bg-transparent hover:text-[#443221]"
          >
            Inquire
          </Link>
          <Link
            href="/blog"
            className="inline-block border border-[#443221] px-8 py-3 text-[12px] font-light uppercase tracking-[0.2em] text-[#443221] no-underline transition-colors hover:bg-[#443221] hover:text-white"
          >
            See real weddings
          </Link>
        </div>
      </section>
    </main>
  );
}
