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
      <section className="px-6 pb-10 pt-12 text-center md:pt-16">
        <div className="font-script text-[44px] leading-none md:text-[64px]">Let&rsquo;s begin</div>
        <h1 className="m-0 mt-3 font-display text-[22px] font-normal uppercase tracking-[0.16em] sm:text-[28px] md:text-[34px]">
          Tell us about your celebration
        </h1>
        <p className={`mx-auto mb-0 mt-5 max-w-[560px] ${BODY}`}>
          Every wedding we take on is completely custom, so the more you share, the better. We read every inquiry personally.
        </p>
      </section>

      <section className="mx-auto grid max-w-[1180px] items-start gap-12 px-6 pb-24 md:px-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
        <aside className="flex flex-col gap-10 lg:sticky lg:top-[200px]">
          <Image
            src={CONTACT_IMG.portrait}
            alt="Arabella laughing behind a candle-lit tablescape of white florals and autumn foliage"
            width={553}
            height={836}
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
