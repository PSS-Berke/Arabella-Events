import Image from 'next/image';
import { ScriptBadge, ScriptTagline } from '@/components/Lettering';
import { PersonSchema } from '@/components/Schema';
import { ABOUT_IMG, HEART_PARAS, TRAJECTORY_PARAS, CORE_PARAS } from '@/lib/about-content';

import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'About Arabella | Scottsdale & Sedona Wedding Planner',
  description:
    'Meet Arabella: 300+ celebrations since 2017, with a background at MGM Resorts, InterContinental, and Hilton. Wedding planning in Scottsdale and Sedona.',
  path: '/arabella',
});

const PARA_STYLE = 'text-[13px] font-light leading-[20px] tracking-[0.18em] text-darkbrown';

export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      <PersonSchema />
      {/* Three-photo candid row */}
      <section className="mx-auto max-w-[980px] px-6 pt-4 md:flex md:items-start md:px-0 md:pt-[14px]">
        <Image
          src={ABOUT_IMG.candid1}
          alt="Arabella laughing with a bride at an outdoor reception under string lights"
          width={614}
          height={430}
          className="block h-auto w-full object-cover md:h-[215px] md:w-[307px]"
        />
        <Image
          src={ABOUT_IMG.candid2}
          alt="Arabella photographing three women posing in a garden"
          width={702}
          height={430}
          className="mt-2 block h-auto w-full object-cover md:ml-[7px] md:mt-0 md:h-[215px] md:w-[351px]"
        />
        <Image
          src={ABOUT_IMG.candid3}
          alt="Arabella hugging a veiled bride at a reception"
          width={632}
          height={430}
          className="mt-2 block h-auto w-full object-cover md:ml-[22px] md:mt-0 md:h-[215px] md:w-[316px]"
        />
      </section>

      {/* Script label row: the heart / the trajectory / the core.
          Decorative repeat of the three section headings below, so these are
          spans rather than headings — the real h2s sit on the sections. */}
      <section className="mx-auto mt-9 flex max-w-[980px] items-start justify-center gap-4 px-6 md:mt-[47px] md:justify-start md:gap-0 md:px-0" aria-hidden="true">
        <ScriptBadge as="div" word="heart" className="w-[28%] max-w-[235px] md:ml-[36px] md:w-[235px]" />
        <ScriptBadge as="div" word="trajectory" className="w-[28%] max-w-[235px] md:ml-[101px] md:w-[235px]" />
        <ScriptBadge as="div" word="core" className="w-[28%] max-w-[235px] md:ml-[120px] md:w-[235px]" />
      </section>

      {/* Tagline strip */}
      <section className="mx-auto mt-14 max-w-[980px] px-6 md:mt-[100px] md:px-0">
        {/* The page's one h1. It is the existing visible display copy, so the
            heading is real text rather than a hidden string bolted on. */}
        <ScriptTagline
          as="h1"
          variant="awe-tagline"
          caps="BEAUTIFULLY DESIGNED. METICULOUSLY PLANNED. LED BY A HEART THAT"
          word="listens"
          className="mx-auto w-full max-w-[600px] md:ml-[33px] md:w-[600px]"
        />
      </section>

      {/* Section 1 — the heart: text left, portrait photo right.
          Unlike sections 2 and 3 this one carries no badge of its own on live —
          the decorative label row above stands in for it — so the heading is
          present but not shown, keeping the visual 1:1 and the outline complete. */}
      <section className="mx-auto mt-10 flex max-w-[980px] flex-col px-6 md:mt-9 md:flex-row md:justify-between md:px-0">
        <h2 className="sr-only">The Heart</h2>
        <Image
          src={ABOUT_IMG.heartPhoto}
          alt="Arabella in a black dress standing at a candlelit forest tablescape"
          width={692}
          height={1028}
          className="block h-auto w-full object-cover md:order-2 md:h-[514px] md:w-[346px]"
        />
        <div className={`mt-8 md:order-1 md:ml-[33px] md:mt-[22px] md:w-[600px] ${PARA_STYLE}`}>
          {HEART_PARAS.map((p, n) => (
            <p key={n} className="m-0">{p}</p>
          ))}
        </div>
      </section>

      {/* Section 2 — the trajectory: centered badge, text left, portrait photo right */}
      <section className="mx-auto mt-14 max-w-[980px] px-6 md:mt-6 md:px-0">
        <ScriptBadge word="trajectory" className="mx-auto w-[46%] max-w-[235px] md:w-[235px]" />
        <div className="mt-5 flex flex-col md:mt-[12px] md:flex-row md:justify-between">
          <div className={`md:-ml-[5px] md:mt-[24px] md:w-[628px] ${PARA_STYLE}`}>
            {TRAJECTORY_PARAS.map((p, n) => (
              <p key={n} className="m-0">{p}</p>
            ))}
          </div>
          <Image
            src={ABOUT_IMG.trajectoryPhoto}
            alt="Arabella seated on brick pavement beside a leaning oval mirror with painting supplies"
            width={702}
            height={994}
            className="mt-8 block h-auto w-full object-cover md:mt-0 md:h-[497px] md:w-[351px]"
          />
        </div>
      </section>

      {/* Section 3 — the core: badge beside large photo, centered text below */}
      <section className="mx-auto mt-14 max-w-[980px] px-6 pb-10 md:mt-[41px] md:px-0 md:pb-[34px]">
        <div className="flex flex-col md:flex-row md:items-start">
          <ScriptBadge word="core" className="mx-auto w-[46%] max-w-[235px] md:-ml-[5px] md:mx-0 md:mt-[11px] md:w-[235px]" />
          <Image
            src={ABOUT_IMG.corePhoto}
            alt="Arabella smiling behind a fully set candlelit table in a forest backyard"
            width={1200}
            height={978}
            className="mt-5 block h-auto w-full object-cover md:ml-[14px] md:mt-0 md:h-[489px] md:w-[600px]"
          />
        </div>
        <div className={`mt-8 space-y-5 text-center md:ml-[183px] md:mt-[28px] md:w-[661px] md:leading-[21px] ${PARA_STYLE}`}>
          {CORE_PARAS.map((para, n) => (
            <p key={n} className="m-0">
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
      </section>
    </main>
  );
}
