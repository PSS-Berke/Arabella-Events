import Image from 'next/image';
import Link from 'next/link';
import Testimonials from '@/components/Testimonials';
import HomeHero from '@/components/HomeHero';
import { IMG, ABOUT_PARAS } from '@/lib/content';
import { POSTS, formatDate } from '@/lib/blog-content';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  // Brand-first by Arabella's request, so no " | AWE" suffix.
  title: 'AWE | Full Design & Planning',
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
 *   hero → press line → intro/bio → favorites → services → reviews →
 *   recent weddings → closing call to action.
 */

const H2 = 'm-0 font-display text-[24px] font-normal uppercase tracking-[0.16em] sm:text-[30px] md:text-[36px]';
const SCRIPT = 'font-script text-[40px] leading-none md:text-[56px]';
const BODY = 'text-[15.5px] font-light leading-[1.95] tracking-[0.02em] text-[#4a3a2c] text-pretty';
const LINK =
  'inline-block border-b border-[#443221] pb-1 text-[12px] font-light uppercase tracking-[0.2em] text-[#443221] no-underline transition-colors hover:border-tan hover:text-tan';
const EYEBROW = 'm-0 text-[11px] font-light uppercase tracking-[0.24em] text-brown';

const FAVORITES = [
  { src: IMG.trio1, alt: 'Bride in a lace mantilla veil and beaded champagne gown on the stairs at Tlaquepaque, Sedona' },
  { src: IMG.trio2, alt: 'Couple embracing before the red rocks of Sedona' },
  { src: IMG.trio3, alt: 'Bride in a lace gown holding an orange and white bouquet beside a canal bridge' },
];

const SERVICES = [
  {
    eyebrow: 'Signature',
    name: 'Full Planning + Design',
    note: 'A completely custom celebration, from the first idea to the last dance.',
    href: '/services',
    img: { src: '/media/hh-long-table-tapers-menus-111372ff.jpg', alt: 'Long white table with taper candles in tall glass hurricanes and gradient menus', w: 1067, h: 1600 },
  },
  {
    eyebrow: 'All-inclusive',
    name: 'Micro Weddings at Tlaquepaque',
    note: 'Intimate Sedona celebrations for 50 guests, starting at $15,000.',
    href: '/services#micro-weddings',
    img: { src: '/media/tlaquepaque-terracotta-tables-papel-picado-3a7c14f6.jpg', alt: 'Wooden tables with terracotta vessels beneath papel picado at Tlaquepaque', w: 1290, h: 1822 },
  },
  {
    eyebrow: 'Reserve online',
    name: 'Rentals',
    note: 'Candelabras, glassware, linens, and the details that finish a table.',
    href: '/rentals',
    img: { src: '/media/gold-candelabra-hurricanes-b0a78a95.jpg', alt: 'Gold candelabra with taper candles in glass hurricanes on a reception table', w: 1333, h: 2000 },
  },
];

// Raw markup keeps the `muted` attribute in SSR HTML (React drops the muted
// prop, and without it browsers block autoplay until hydration).
function FavoritesVideo() {
  return (
    <div
      className="aspect-video w-full bg-[#2b2420]"
      dangerouslySetInnerHTML={{
        __html:
          '<video src="/media/49b5c3_94afe07dea67468194477edb9160c29d-1080p-f179853e.mp4"' +
          ' poster="/media/49b5c3_94afe07dea67468194477edb9160c29df000-f015404f.jpg"' +
          ' autoplay muted loop playsinline controls preload="metadata"' +
          ' aria-label="Newlyweds walking hand in hand past a flower-covered courtyard storefront"' +
          ' style="display:block;width:100%;height:100%;object-fit:cover"></video>',
      }}
    />
  );
}

export default function Home() {
  const recent = POSTS.slice(0, 3);
  return (
    <main className="text-[#443221]">
      <HomeHero />

      {/* Press line (was baked into a graphic) */}
      <section className="border-b border-[#e6ddd2] px-6 py-10 text-center">
        <p className={EYEBROW}>As featured in</p>
        <p className="m-0 mt-3 font-display text-[26px] italic tracking-[0.04em] md:text-[32px]">Style Me Pretty</p>
        <p className="m-0 mt-2 text-[12px] font-light uppercase tracking-[0.2em]">#2 Best Fall Weddings in Arizona, 2025</p>
      </section>

      {/* Intro + bio */}
      <section className="mx-auto grid max-w-[1120px] items-start gap-12 px-6 py-20 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 md:px-10 md:py-28">
        <Image
          src="/media/tlaquepaque-veil-portrait-569b88f9.jpg"
          alt="Bride and groom forehead to forehead beneath a stone arch as her cathedral veil sweeps across the frame"
          width={1333}
          height={2000}
          sizes="(min-width: 1120px) 460px, (min-width: 768px) 42vw, 92vw"
          className="mx-auto h-auto w-full max-w-[460px] md:sticky md:top-[200px]"
        />
        <div>
          <div className={SCRIPT}>Welcome</div>
          <h2 className={`${H2} mt-2`}>An eye for what could be</h2>
          <p className="m-0 mt-6 font-display text-[19px] italic leading-[1.6] text-[#5a4634] md:text-[21px]">
            Arabella&rsquo;s Weddings &amp; Events offers full wedding planning, design, and coordination throughout
            Arizona, Chicago, and beyond.
          </p>
          <div className="mt-8 flex flex-col gap-5">
            {ABOUT_PARAS.map((p, n) => (
              <p key={n} className={`m-0 ${BODY}`}>{p}</p>
            ))}
          </div>
          <p className="m-0 mt-8 font-display text-[18px] uppercase leading-[1.7] tracking-[0.12em]">
            Share the vision. Trust the process. And allow yourself to be surprised by what we{' '}
            <span className="font-script text-[30px] normal-case tracking-normal">create</span>
          </p>
          <div className="mt-8">
            <Link href="/arabella" className={LINK}>Meet Arabella</Link>
          </div>
        </div>
      </section>

      {/* A few favorites */}
      <section className="bg-[#f7f1ec] px-6 py-20 md:py-28">
        <div className="mx-auto max-w-[1000px] text-center">
          <div className={SCRIPT}>A few</div>
          <h2 className={`${H2} mt-2`}>Favorites</h2>
          <p className={`mx-auto mb-12 mt-5 max-w-[560px] ${BODY}`}>Every detail tells your story.</p>
          <FavoritesVideo />
          <div className="mt-4 grid grid-cols-3 gap-2 md:mt-6 md:gap-6">
            {FAVORITES.map((p) => (
              <Image key={p.src} src={p.src} alt={p.alt} width={504} height={700} sizes="(min-width: 1000px) 316px, 32vw" className="aspect-[4/5] h-auto w-full object-cover" />
            ))}
          </div>
          <div className="mt-12">
            <Link href="/gallery" className={LINK}>View the gallery</Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-[1120px] px-6 py-20 text-center md:px-10 md:py-28">
        <div className={SCRIPT}>How we</div>
        <h2 className={`${H2} mt-2`}>Work together</h2>
        <div className="mt-14 grid gap-14 md:grid-cols-3 md:gap-8">
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
              <p className={`m-0 mt-3 max-w-[300px] ${BODY}`}>{s.note}</p>
              <span className={`${LINK} mt-5`}>Learn more</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="border-y border-[#e6ddd2] bg-white px-6 pt-20 md:pt-24">
        <h2 className="m-0">
          <Image src={IMG.aweExperience} alt="The AWE Experience" width={465} height={238} className="mx-auto block h-auto w-[260px] max-w-full md:w-[300px]" />
        </h2>
        <Testimonials />
      </section>

      {/* Recent weddings */}
      <section className="mx-auto max-w-[1120px] px-6 py-20 text-center md:px-10 md:py-28">
        <div className={SCRIPT}>Real</div>
        <h2 className={`${H2} mt-2`}>Weddings</h2>
        <div className="mt-14 grid gap-14 md:grid-cols-3 md:gap-8">
          {recent.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col no-underline text-inherit">
              <div className="w-full overflow-hidden">
                <Image
                  src={p.cover.src}
                  alt={p.cover.alt}
                  width={p.cover.width}
                  height={p.cover.height}
                  sizes="(min-width: 1120px) 340px, (min-width: 768px) 30vw, 92vw"
                  className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className={`${EYEBROW} mt-6`}>{p.couple} &middot; {formatDate(p.date)}</p>
              <h3 className="m-0 mt-2 font-display text-[18px] font-normal uppercase leading-[1.4] tracking-[0.1em]">{p.title}</h3>
            </Link>
          ))}
        </div>
        <div className="mt-14">
          <Link href="/blog" className={LINK}>Read the blog</Link>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="relative isolate flex min-h-[460px] items-center justify-center overflow-hidden px-6 py-24 text-center text-white">
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
          <p className="mx-auto mb-0 mt-5 max-w-[520px] text-[15px] font-light leading-[1.9] tracking-[0.04em] text-white/90">
            Tell us about the celebration you&rsquo;re imagining: the date, the place, and the feeling you want it to leave behind.
          </p>
          <Link
            href="/contact"
            className="mt-9 inline-block border border-white bg-white px-8 py-3 text-[12px] font-light uppercase tracking-[0.2em] text-[#443221] no-underline transition-colors hover:bg-transparent hover:text-white"
          >
            Inquire now
          </Link>
        </div>
      </section>
    </main>
  );
}
