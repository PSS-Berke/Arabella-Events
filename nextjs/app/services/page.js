import Image from 'next/image';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Wedding Planning & Design Packages',
  description:
    'Full-service planning and design and partial planning for Scottsdale and Sedona weddings. Full service from a $60,000 investment; all-inclusive Sedona micro weddings from $15,000.',
  path: '/services',
});

// Design tiers within Full Planning + Design: starting overall wedding
// investment per guest. The planning fee itself is 15% of overall spend, $7,500 minimum.
const EXPERIENCES = [
  {
    name: 'AWE Essential',
    from: '$500+',
    about: 'Beautiful, intentional, simpler design: selective floral accents, strong photography, a beautiful cake, and standard rentals.',
  },
  {
    name: 'AWE Full Design',
    from: '$750+',
    about: 'A cohesive custom aesthetic: upgraded rentals and linens, substantial florals, stationery and signage, candlelight, and layered details.',
  },
  {
    name: 'AWE Editorial',
    from: '$1,000+',
    about: 'Transformative floral and design, specialty rentals, installations, custom production, and an elevated guest experience.',
  },
];

// Live pairs each video with a copy column: Full is text-left / video-right,
// Partial is video-left / text-right. Raw markup keeps the `muted` attribute in
// SSR HTML (React drops the muted prop, and without it browsers block autoplay
// until hydration).
function VideoBlock({ src, poster, autoplay, loop, className }) {
  const html = `<video src="${src}" poster="${poster}"${autoplay ? ' autoplay muted' : ''}${loop ? ' loop' : ''} playsinline controls preload="metadata" aria-label="Video Player" style="display:block;width:100%;height:100%;object-fit:cover"></video>`;
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function Packages() {
  return (
    <main className="mx-auto max-w-[1000px] px-6 pb-8 pt-12 text-[#443221] md:px-10 md:pb-10 md:pt-[70px]">
      {/* Full: copy left, video right (404x311 at a 72px top offset on live) */}
      <section className="flex flex-col items-center gap-10 pb-[78px] md:flex-row md:items-start md:gap-[29px]">
        <div className="w-full text-center md:w-[542px] md:shrink-0">
          <div className="font-script text-[38px] leading-none sm:text-[44px] md:pl-[36px] md:text-left md:text-[62px]">Full</div>
          <h1 className="mb-[34px] mt-1.5 font-display text-[22px] font-light tracking-[0.13em] sm:text-[27px] md:pl-[36px] md:text-left md:text-[38px] md:tracking-[0.19em]">PLANNING + DESIGN</h1>
          <p className="mx-auto max-w-[760px] text-[13px] font-light uppercase leading-[2.1] tracking-[0.08em] text-pretty md:max-w-[536px] md:tracking-[0.14em]">
            Every wedding is unique, which is why every proposal is thoughtfully tailored to the level of planning, design, and coordination your celebration requires. Full-service weddings with AWE typically begin at $60,000 in total wedding investment, with design-forward celebrations generally beginning around $750 per guest, allowing us to create a highly personalized celebration with thoughtful details, elevated design, and a seamless guest experience.
          </p>
          <p className="mx-auto mb-0 mt-5 max-w-[760px] text-[12px] font-semibold uppercase tracking-[0.18em] text-tan md:max-w-[536px] md:pl-[36px] md:text-left">
            Peak month &amp; weekend pricing &middot; off-peak from $6,000
          </p>
        </div>
        <VideoBlock
          src="/media/49b5c3_ff293a45593944c0a480183eccc60df8-480p-ba23b20b.mp4"
          poster="/media/49b5c3_ff293a45593944c0a480183eccc60df8f002-a7586541.jpg"
          autoplay
          loop={false}
          className="aspect-[404/311] w-full max-w-[404px] md:mt-[72px] md:w-[404px] md:shrink-0"
        />
      </section>

      {/* Design experiences — the per-guest tiers within full planning + design */}
      <section className="border-t border-[#e6ddd2] py-[78px] text-center">
        <div className="font-script text-[38px] leading-none sm:text-[44px] md:text-[62px]">The</div>
        <h2 className="mb-[18px] mt-1.5 font-display text-[22px] font-light tracking-[0.13em] sm:text-[27px] md:text-[38px] md:tracking-[0.19em]">AWE EXPERIENCES</h2>
        <p className="mx-auto mb-12 mt-0 max-w-[640px] text-[14.5px] font-light leading-[2] tracking-[0.05em] text-pretty">
          Starting overall wedding investment, per guest. Our full planning + design fee is 15% of your overall wedding spend, with a $7,500 minimum.
        </p>
        {/* Peak vs off-peak note (Arabella, Oct 2026): all prices above are peak. */}
        <div className="mx-auto mb-12 max-w-[640px] border border-[#e6ddd2] px-6 py-6">
          <p className="m-0 font-display text-[15px] font-normal uppercase tracking-[0.18em] md:text-[17px]">
            Peak month &amp; weekend pricing
          </p>
          <p className="m-0 mt-3 text-[14.5px] font-light leading-[1.9] tracking-[0.04em] text-pretty">
            The pricing on this page reflects peak-season months and weekend dates. Off-peak dates are flexible, with
            full planning + design starting at <strong className="font-semibold">$6,000</strong>.
          </p>
        </div>
        <div className="mx-auto mb-14 grid max-w-[660px] grid-cols-2 gap-3">
          <Image
            src="/media/tlaquepaque-long-tables-candelabras-b3ab62f7.jpg"
            alt="Long candlelit tables with gold candelabras and red roses in a Tlaquepaque courtyard at night"
            width={1333}
            height={2000}
            sizes="(min-width: 768px) 325px, 45vw"
            className="h-auto w-full"
          />
          <Image
            src="/media/crystal-chandelier-amaranth-1b294729.jpg"
            alt="Crystal chandelier draped with red amaranth beneath string lights at a candlelit night reception"
            width={1333}
            height={2000}
            sizes="(min-width: 768px) 325px, 45vw"
            className="h-auto w-full"
          />
        </div>
        <div className="grid gap-10 text-center md:grid-cols-3 md:gap-8">
          {EXPERIENCES.map((x) => (
            <div key={x.name} className="flex flex-col items-center gap-3">
              <h3 className="m-0 font-display text-[15px] font-light tracking-[0.16em] md:text-[17px]">{x.name.toUpperCase()}</h3>
              <p className="m-0 font-display text-[22px] tracking-[0.06em]">
                {x.from}
                <span className="ml-1 text-[11px] font-light uppercase tracking-[0.18em] text-brown">per guest</span>
              </p>
              <p className="m-0 max-w-[300px] text-[14.5px] font-light leading-[2] tracking-[0.05em] text-pretty">{x.about}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Planning + photography collaboration with Dana Maruna Photo */}
      <section id="dana-and-arabella" className="flex scroll-mt-48 flex-col items-center gap-10 border-t border-[#e6ddd2] py-[78px] md:flex-row-reverse md:gap-12">
        <Image
          src="/media/film-veil-stone-archway-0a2b8ea4.jpg"
          alt="A bride in a cathedral veil beneath a stone archway, photographed on 35mm film by Dana Maruna"
          width={1078}
          height={1600}
          sizes="(min-width: 768px) 360px, 80vw"
          className="h-auto w-full max-w-[360px] md:shrink-0"
        />
        <div className="text-center">
          <div className="font-script text-[38px] leading-none sm:text-[44px] md:text-[62px]">Dana + Arabella</div>
          <h2 className="mb-[18px] mt-1.5 font-display text-[22px] font-light tracking-[0.13em] sm:text-[27px] md:text-[34px] md:tracking-[0.17em]">PLANNING &amp; PHOTOGRAPHY</h2>
          <p className="mx-auto mb-8 mt-0 max-w-[560px] text-[14.5px] font-light leading-[2] tracking-[0.05em] text-pretty">
            A collaboration with{' '}
            <a href="https://danamarunaphoto.com/" target="_blank" rel="noreferrer" className="underline decoration-[#d9cfc3] underline-offset-4 transition-colors hover:text-tan">
              Dana Maruna Photo
            </a>
            : full planning and film photography, designed together from the very first idea.
          </p>
          <p className="m-0 font-display text-[22px] tracking-[0.06em] md:text-[26px]">Starting at $10,500</p>
          <ul className="mx-auto mb-8 mt-8 flex max-w-[480px] list-none flex-col gap-3 p-0 text-left text-[14.5px] font-light tracking-[0.05em]">
            {[
              'Full planning',
              '6 hours of photography coverage',
              'Digital and film photos',
              'Collaborative timeline planning',
              'High-resolution images',
              'Online gallery',
              'Two dedicated women who love to collaborate and bring your vision to life',
            ].map((item) => (
              <li key={item} className="flex gap-[14px]">
                <span>&bull;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/contact"
            className="inline-block border-b border-[#443221] pb-1 text-[12px] font-light uppercase tracking-[0.18em] transition-colors hover:border-tan"
          >
            Inquire about dates
          </Link>
        </div>
      </section>

      {/* Micro weddings — all-inclusive Tlaquepaque packages (Sedona, weekdays, off-peak) */}
      <section id="micro-weddings" className="flex scroll-mt-48 flex-col items-center gap-10 border-t border-[#e6ddd2] py-[78px] md:flex-row md:gap-12">
        <Image
          src="/media/tlaquepaque-terracotta-tables-papel-picado-3a7c14f6.jpg"
          alt="Wooden farm tables set with terracotta vessels and candles beneath papel picado along a Tlaquepaque wall at night"
          width={1290}
          height={1822}
          sizes="(min-width: 768px) 360px, 80vw"
          className="h-auto w-full max-w-[360px] md:shrink-0"
        />
        <div className="text-center">
          <div className="font-script text-[38px] leading-none sm:text-[44px] md:text-[62px]">Micro</div>
          <h2 className="mb-[18px] mt-1.5 font-display text-[22px] font-light tracking-[0.13em] sm:text-[27px] md:text-[38px] md:tracking-[0.19em]">WEDDINGS AT TLAQUEPAQUE</h2>
          <p className="mx-auto mb-8 mt-0 max-w-[640px] text-[14.5px] font-light leading-[2] tracking-[0.05em] text-pretty">
            All-inclusive packages at Tlaquepaque in Sedona, available on weekdays from mid-November through March and throughout the summer months.
          </p>
          <p className="m-0 font-display text-[22px] tracking-[0.06em] md:text-[26px]">
            Starting at $15,000
            <span className="ml-2 text-[11px] font-light uppercase tracking-[0.18em] text-brown">for 50 guests</span>
          </p>
          <ul className="mx-auto mb-10 mt-8 flex max-w-[640px] list-none flex-wrap justify-center gap-x-8 gap-y-3 p-0 text-[12px] font-light uppercase tracking-[0.18em]">
            <li>Venue fee</li>
            <li>Catering</li>
            <li>Rentals</li>
            <li>On-site coordinator</li>
          </ul>
          <Link
            href="/contact"
            className="inline-block border-b border-[#443221] pb-1 text-[12px] font-light uppercase tracking-[0.18em] transition-colors hover:border-tan"
          >
            Ask about dates
          </Link>
        </div>
      </section>

      {/* Partial: video left (390x355), copy right (578px column) */}
      <section className="flex flex-col items-center gap-10 py-[78px] md:flex-row md:items-start md:gap-[12px]">
        <VideoBlock
          src="/media/49b5c3_d326db7690b1430d9fe14de2a6bb4b92-1080p.mp4"
          poster="/media/49b5c3_d326db7690b1430d9fe14de2a6bb4b92f000-cb0df2e4.jpg"
          autoplay={false}
          loop={false}
          className="order-2 aspect-[390/355] w-full max-w-[390px] md:order-1 md:mt-[79px] md:w-[390px] md:shrink-0"
        />
        <div className="order-1 w-full text-center md:order-2 md:w-[578px] md:shrink-0">
          <div className="font-script text-[38px] leading-none sm:text-[44px] md:text-[62px]">Partial</div>
          <h2 className="mb-[34px] mt-1.5 font-display text-[22px] font-light tracking-[0.13em] sm:text-[27px] md:text-[38px] md:tracking-[0.19em]">PLANNING</h2>
          <ul className="mx-auto flex max-w-[620px] list-none flex-col gap-[14px] p-0 text-left text-[14.5px] font-light tracking-[0.05em] md:max-w-none">
            <li className="flex gap-[14px]"><span>&bull;</span><span>A set number of professional planning hours to use throughout the process</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Planner attendance at select vendor meetings</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Monthly or quarterly planning check-ins</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Budget planning and management support</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Wedding-day coordination</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Regular reminders and guidance to keep planning on track</span></li>
          </ul>
        </div>
      </section>
    </main>
  );
}
