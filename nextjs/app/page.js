import Image from 'next/image';
import Link from 'next/link';
import Testimonials from '@/components/Testimonials';
import { IMG, ABOUT_PARAS } from '@/lib/content';

export default function Home() {
  return (
    <main>
      <section className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-9 px-6 pb-8 pt-11 md:grid-cols-[1.15fr_0.85fr] md:gap-14 md:px-10 md:pb-10 md:pt-16">
        <div>
          <p className="m-0 font-display text-[21px] font-light leading-[1.62] tracking-[0.055em] text-pretty sm:text-2xl md:text-[30px]">
            Arabella&apos;s Weddings &amp; Events offers luxury wedding planning, design, and coordination throughout Arizona, Chicago, and beyond.
          </p>
          <Link href="/services" className="mt-9 inline-block border-b border-[#c8b5a4] pb-1.5 text-[11.5px] font-light tracking-[0.26em]">
            VIEW PACKAGES
          </Link>
        </div>
        <Image src={IMG.hero} alt="Bride and groom portrait, Tlaquepaque, Sedona" width={640} height={976} priority className="block h-auto max-h-[52vh] w-full object-cover object-center md:max-h-[62vh]" />
      </section>

      <section className="mx-auto grid max-w-[1180px] grid-cols-1 items-start gap-9 px-6 pb-16 pt-14 md:grid-cols-[0.92fr_1.08fr] md:gap-[70px] md:px-10 md:pb-[90px] md:pt-20">
        <Image src={IMG.about} alt="Arabella's Weddings &amp; Events" width={1066} height={895} className="block h-auto w-full" />
        <div>
          <h2 className="m-0 mb-[30px] font-display text-[30px] font-light leading-[1.2] tracking-[0.075em] md:text-[40px]">AN EYE FOR WHAT COULD BE</h2>
          <div className="flex flex-col gap-[18px] text-[14.5px] font-light leading-[1.95] tracking-[0.055em] text-cocoa text-pretty">
            {ABOUT_PARAS.map((p, n) => (
              <p key={n} className="m-0">{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 md:px-10 md:pb-24">
        <p className="mx-auto max-w-[940px] text-center font-display text-[20px] font-light leading-[1.5] tracking-[0.1em] sm:text-[23px] md:text-[32px] md:tracking-[0.13em]">
          SHARE THE VISION. TRUST THE PROCESS. AND ALLOW YOURSELF TO BE SURPRISED BY WHAT WE{' '}
          <em className="font-script text-[30px] not-italic tracking-[0.01em] text-script md:text-[40px]">create</em>
        </p>
      </section>

      <section className="mx-auto max-w-[1180px] px-6 pb-24 md:px-10 md:pb-[100px]">
        <div className="mb-[52px] text-center">
          <div className="font-display text-[19px] tracking-[0.34em] text-taupe">THE</div>
          <div className="mt-0.5 font-display text-[42px] font-light leading-[1.05] tracking-[0.1em] sm:text-[52px] md:text-[74px]">AWE</div>
          <div className="-mt-1.5 font-script text-[38px] text-script">experience</div>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-[26px]">
          {[IMG.trio1, IMG.trio2, IMG.trio3].map((src, n) => (
            <Image key={n} src={src} alt="Wedding detail" width={520} height={688} className="block aspect-[3/4] w-full object-cover md:aspect-auto md:h-[430px]" />
          ))}
        </div>
      </section>

      <Testimonials />
    </main>
  );
}
