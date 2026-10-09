import Image from 'next/image';
import Link from 'next/link';
import Testimonials from '@/components/Testimonials';
import HomeHero from '@/components/HomeHero';
import PressBar from '@/components/PressBar';
import PostCover from '@/components/PostCover';
import { VENDORS } from '@/lib/vendors-content';
import { IMG } from '@/lib/content';
import { POSTS, formatDate } from '@/lib/blog-content';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  // Brand-first by Arabella's request, so no " | AWE" suffix.
  title: 'AWE | Wedding Planning and Design',
  brandSuffix: null,
  description:
    'Arizona luxury wedding planning, design, and coordination for Scottsdale and Sedona celebrations. 300+ events planned. Published in Style Me Pretty.',
  path: '/',
});

/*
 * Homepage, redesigned Oct 2026 as an editorial layout (it was a 1:1 copy of
 * the Wix page: a small boxed slideshow, a flat graphic with its text baked
 * in, and narrow, low-contrast paragraphs). Everything is now live text and
 * full-size photography:
 *   hero → divider → press banner → services → reviews →
 *   recent weddings → closing call to action.
 */

const H2 = 'm-0 font-display text-[24px] font-normal uppercase tracking-[0.16em] sm:text-[30px] md:text-[36px]';
const SCRIPT = 'font-script text-[40px] leading-none md:text-[56px]';
const LINK =
  'inline-block border-b border-[#443221] pb-1 text-[12px] font-light uppercase tracking-[0.2em] text-[#443221] no-underline transition-colors hover:border-tan hover:text-tan';
const EYEBROW = 'm-0 text-[11px] font-light uppercase tracking-[0.24em] text-brown';


const SERVICES = [
  {
    eyebrow: 'Signature',
    name: 'Full Planning + Design',
    href: '/services',
    img: { src: '/media/hh-long-table-tapers-menus-111372ff.jpg', alt: 'Long white table with taper candles in tall glass hurricanes and gradient menus', w: 1067, h: 1600 },
  },
  {
    eyebrow: 'All-inclusive',
    name: 'Micro Weddings at Tlaquepaque',
    href: '/services#micro-weddings',
    img: { src: '/media/tlaquepaque-long-tables-candelabras-b3ab62f7.jpg', alt: 'Long candlelit tables with gold candelabras and red roses in a Tlaquepaque courtyard at night', w: 1333, h: 2000 },
  },
  {
    eyebrow: 'Reserve online',
    name: 'Rentals',
    href: '/rentals',
    img: { src: '/media/gold-candelabra-hurricanes-b0a78a95.jpg', alt: 'Gold candelabra with taper candles in glass hurricanes on a reception table', w: 1333, h: 2000 },
  },
];

export default function Home() {
  const recent = POSTS.slice(0, 3);
  return (
    <main className="text-[#443221]">
      <HomeHero />

      {/* The gold AWE mark with a small script line beneath (Oct 2026; the rules
          and diamonds either side were removed at Arabella's request) */}
      <div className="mx-auto flex max-w-[900px] flex-col items-center px-6 py-12 md:py-14">
        <Image src="/media/awe-logo-gold-d9f2a20d.png" alt="" width={648} height={242} className="h-auto w-[130px] md:w-[160px]" />
        <p className="m-0 mt-3 font-script text-[30px] leading-none text-[#9a8158] md:text-[36px]">with love, from arizona</p>
      </div>

      {/* Press (Style Me Pretty was baked into a graphic on live) */}
      <PressBar />

      {/* Services: three photo cards (heading reworded Oct 2026, was "The Offerings") */}
      <section className="mx-auto max-w-[1120px] px-6 py-12 text-center md:px-10 md:py-16">
        <div className={SCRIPT}>ways to</div>
        <h2 className={`${H2} mt-2`}>Work With Us</h2>
        <div className="mt-10 grid gap-14 md:grid-cols-3 md:gap-8">
          {SERVICES.map((s) => (
            <Link key={s.name} href={s.href} className="group flex flex-col items-center no-underline text-inherit">
              <div className="w-full overflow-hidden">
                <Image
                  src={s.img.src}
                  alt={s.img.alt}
                  width={s.img.w}
                  height={s.img.h}
                  sizes="(min-width: 1120px) 340px, (min-width: 768px) 30vw, 92vw"
                  className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className={`${EYEBROW} mt-6`}>{s.eyebrow}</p>
              <h3 className="m-0 mt-2 font-display text-[19px] font-normal uppercase tracking-[0.12em] md:text-[21px]">{s.name}</h3>
              <span className={`${LINK} mt-5`}>Learn more</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="border-y border-[#e6ddd2] bg-white px-6 pt-12 md:pt-16">
        <h2 className="m-0">
          <Image src={IMG.aweExperience} alt="The AWE Experience" width={465} height={238} className="mx-auto block h-auto w-[260px] max-w-full md:w-[300px]" />
        </h2>
        <Testimonials />
      </section>

      {/* Recent wedding stories from the blog (was "Real Weddings") */}
      <section className="mx-auto max-w-[1120px] px-6 py-12 text-center md:px-10 md:py-16">
        <div className={SCRIPT}>read the</div>
        <h2 className={`${H2} mt-2`}>Blog</h2>
        <div className="mt-10 grid gap-14 md:grid-cols-3 md:gap-8">
          {recent.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col no-underline text-inherit">
              <div className="w-full overflow-hidden">
                <PostCover
                  post={p}
                  sizes="(min-width: 1120px) 340px, (min-width: 768px) 30vw, 92vw"
                  className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className={`${EYEBROW} mt-6`}>{p.couple} &middot; {formatDate(p.date)}</p>
              <h3 className="m-0 mt-2 font-display text-[18px] font-normal uppercase leading-[1.4] tracking-[0.1em]">{p.title}</h3>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <Link href="/blog" className={LINK}>See all stories</Link>
        </div>
      </section>

      {/* Dana + Arabella collaboration (full details on /services) */}
      <section className="border-t border-[#e6ddd2] px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-[1000px] items-center gap-12 md:grid-cols-2 md:gap-16">
          <Image
            src="/media/dana-x-awe-photobooth-46ae5db1.png"
            alt="Dana and Arabella laughing in a vintage photo-booth strip, captioned Dana Maruna Photo x AWE"
            width={580}
            height={657}
            sizes="(min-width: 768px) 440px, 90vw"
            className="mx-auto h-auto w-full max-w-[440px]"
          />
          <div className="text-center md:text-left">
            <div className={SCRIPT}>Dana + Arabella</div>
            <h2 className={`${H2} mt-2`}>Planning &amp; photography</h2>
            <p className="m-0 mt-6 font-display text-[19px] italic leading-[1.6] text-[#5a4634] md:text-[21px]">
              Full planning and film photography, together.
            </p>
            <p className="m-0 mt-4 font-display text-[18px] uppercase tracking-[0.12em]">Starting at $10,500</p>
            <div className="mt-8">
              <Link href="/services#dana-and-arabella" className={LINK}>See the package</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="relative isolate flex min-h-[380px] items-center justify-center overflow-hidden px-6 py-16 text-center text-white">
        <Image
          src="/media/hm-creekside-kiss-635bd27c.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
          style={{ objectPosition: 'center 40%' }}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-black/45" />
        <div>
          <div className="font-script text-[48px] leading-none md:text-[68px]">Let&rsquo;s begin</div>
          <Link
            href="/contact"
            className="mt-9 inline-block border border-white bg-white px-8 py-3 text-[12px] font-light uppercase tracking-[0.2em] text-[#443221] no-underline transition-colors hover:bg-transparent hover:text-white"
          >
            Inquire now
          </Link>
        </div>
      </section>

      {/* Featured photographers (role "Photography" in lib/vendors-content.js),
          logos linking out; the full list is on /vendors (Our Partners) */}
      <section className="px-6 py-10 text-center md:py-12">
        <p className={EYEBROW}>Featured photographers &amp; videographers</p>
        <ul className="mx-auto mb-0 mt-6 flex max-w-[960px] list-none flex-wrap items-center justify-center gap-x-12 gap-y-8 p-0">
          {VENDORS.filter((v) => v.role === 'Photography' || v.role === 'Videography').map((v) => {
            // A logo, when there is one, stands in for the name (and is the link).
            const mark = v.logo ? (
              <Image src={v.logo.src} alt={v.name} width={v.logo.w} height={v.logo.h} className="block h-auto max-h-[36px] w-auto max-w-[180px]" />
            ) : (
              <span className="font-display text-[15px] uppercase tracking-[0.16em] md:text-[17px]">{v.name}</span>
            );
            return (
              <li key={v.name}>
                {v.url ? (
                  <a href={v.url} target="_blank" rel="noreferrer" className="text-[#443221] no-underline transition-opacity hover:opacity-70">
                    {mark}
                  </a>
                ) : (
                  mark
                )}
              </li>
            );
          })}
        </ul>
        <div className="mt-8">
          <Link href="/vendors" className={LINK}>Our partners</Link>
        </div>
      </section>
    </main>
  );
}
