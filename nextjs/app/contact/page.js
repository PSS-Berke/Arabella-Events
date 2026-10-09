import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import { CONTACT_EMAIL, CONTACT_IMG } from '@/lib/contact-content';
import { INSTAGRAM_URL } from '@/lib/content';

import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Contact | Scottsdale & Sedona Wedding Planner',
  description:
    'Inquire about wedding planning and design in Scottsdale, Sedona, and throughout Arizona. Tell us about your celebration.',
  path: '/contact',
});

const BODY = 'text-[15.5px] font-light leading-[1.9] tracking-[0.02em] text-[#4a3a2c] text-pretty';
const EYEBROW = 'm-0 text-[11px] font-light uppercase tracking-[0.24em] text-brown';

const STEPS = [
  { n: '01', h: 'Share your story', p: 'Tell us about your date, your place, and the feeling you want the day to leave behind.' },
  { n: '02', h: 'Let’s talk', p: 'We’ll set up a call to get to know you and walk through your vision together.' },
  { n: '03', h: 'Your proposal', p: 'You’ll receive a proposal tailored to the planning and design your celebration needs.' },
];

// Contact page, redesigned Oct 2026: intro + photo + "what happens next" on
// the left, the inquiry form in a soft card on the right.
export default function Contact() {
  return (
    <main className="text-[#443221]">
      {/* Intro banner (Oct 2026): a candlelit photo that slowly settles in,
          with each line rising in turn and gold rules drawing outward. The
          animations are in globals.css (awe-rise, awe-draw, awe-settle). */}
      <section className="relative isolate overflow-hidden bg-[#1d1915] px-6 py-24 text-center text-white md:py-32">
        <Image
          src="/media/tlaquepaque-long-tables-candelabras-b3ab62f7.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="awe-settle -z-20 object-cover object-[50%_60%]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-black/65 via-black/55 to-black/75" />

        <div className="awe-rise font-script text-[54px] leading-none text-[#e9dcc4] md:text-[84px]" style={{ animationDelay: '0.2s' }}>
          Let&rsquo;s begin
        </div>
        <h1
          className="awe-rise m-0 mt-4 font-display text-[24px] font-normal uppercase tracking-[0.2em] sm:text-[32px] md:text-[42px] md:tracking-[0.24em]"
          style={{ animationDelay: '0.6s' }}
        >
          Tell us about your celebration
        </h1>
        <div className="mx-auto mt-8 flex max-w-[620px] items-center gap-5" aria-hidden="true">
          <span className="awe-draw h-px flex-1 origin-right bg-[#c9b48a]" style={{ animationDelay: '1s' }} />
          <Image
            src="/media/awe-logo-champagne-29e404bd.png"
            alt=""
            width={648}
            height={242}
            priority
            className="awe-rise h-auto w-[110px] md:w-[140px]"
            style={{ animationDelay: '1s' }}
          />
          <span className="awe-draw h-px flex-1 origin-left bg-[#c9b48a]" style={{ animationDelay: '1s' }} />
        </div>
        <p
          className="awe-rise mx-auto mb-0 mt-8 max-w-[600px] font-display text-[19px] italic leading-[1.6] text-white/95 md:text-[23px]"
          style={{ animationDelay: '1.3s' }}
        >
          Our couples typically invest $750&ndash;$1,500+ per guest. We take on a limited number of weddings
          each year; share your story below to be considered for 2026 or 2027.
        </p>
        <p
          className="awe-rise mx-auto mb-0 mt-6 max-w-[520px] text-[12px] font-light uppercase leading-[2] tracking-[0.22em] text-white/75"
          style={{ animationDelay: '1.6s' }}
        >
          Every wedding is completely custom &middot; We read every inquiry personally
        </p>
        <a
          href="#inquiry"
          className="awe-rise mt-10 inline-block border border-[#c9b48a] px-9 py-3 text-[12px] font-light uppercase tracking-[0.24em] text-white no-underline transition-colors duration-500 hover:bg-[#c9b48a] hover:text-[#1d1915]"
          style={{ animationDelay: '1.9s' }}
        >
          Begin your application
        </a>
      </section>

      <section id="inquiry" className="mx-auto grid max-w-[1180px] scroll-mt-24 items-start gap-12 px-6 pb-24 pt-16 md:px-10 md:pt-20 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
        <aside className="flex flex-col gap-10 lg:sticky lg:top-[200px]">
          <Image
            src={CONTACT_IMG.portrait}
            alt="Bride and groom forehead to forehead beneath a stone arch at Tlaquepaque as her cathedral veil sweeps across the frame"
            width={1333}
            height={2000}
            sizes="(min-width: 1024px) 380px, 90vw"
            className="mx-auto h-auto w-full max-w-[380px]"
          />
          <div>
            <p className={EYEBROW}>What happens next</p>
            <ol className="m-0 mt-5 flex list-none flex-col gap-6 p-0">
              {STEPS.map((s) => (
                <li key={s.n} className="flex gap-5">
                  <span className="font-display text-[22px] leading-none text-[#b3a597]">{s.n}</span>
                  <div>
                    <p className="m-0 font-display text-[17px] uppercase tracking-[0.1em]">{s.h}</p>
                    <p className={`m-0 mt-1 text-[14.5px] ${BODY}`}>{s.p}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="border-t border-[#e6ddd2] pt-8">
            <p className={EYEBROW}>Prefer email?</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-3 inline-block break-all font-display text-[18px] tracking-[0.04em] text-[#443221] underline decoration-[#d9cfc3] underline-offset-4 transition-colors hover:text-tan"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="m-0 mt-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-light uppercase tracking-[0.2em] text-brown no-underline transition-colors hover:text-tan"
              >
                Follow along on Instagram &rarr;
              </a>
            </p>
          </div>
        </aside>

        <div className="bg-[#f7f1ec] px-6 py-10 sm:px-10 md:py-12">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
