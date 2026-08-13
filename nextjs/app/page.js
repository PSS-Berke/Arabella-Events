import Image from 'next/image';
import Testimonials from '@/components/Testimonials';
import HeroSlideshow from '@/components/HeroSlideshow';
import { IMG, ABOUT_PARAS } from '@/lib/content';

export const metadata = {
  title: "WELCOME | Arabella's Weddings & Events | AWE",
  alternates: { canonical: '/' },
  openGraph: { url: '/', siteName: "Arabella's Weddings & Events | AWE ", type: 'website' },
};

const CANVAS_ALT =
  'PUBLISHED IN STYLE ME PRETTY | #2 BEST FALL WEDDINGS IN ARIZONA, 2025 — A FEW FAVORITES — EVERY DETAIL tells your story';

// The three "A Few Favorites" portraits, overlaid on the canvas graphic exactly
// as on live (Wix mesh: canvas 1066x895 at x -71 of the 980 grid; photos at
// x 64/362/663, tops 833/827/827, all bottoms aligned at y 1177).
const FAVORITES = [
  {
    src: IMG.trio1,
    w: 260,
    h: 344,
    alt: 'Bride in a lace mantilla veil and beaded champagne gown on the stairs at Tlaquepaque, Sedona',
    desktop: 'absolute left-[64px] top-[833px] h-[344px] w-[260px] max-w-none',
    fluid: 'absolute left-[12.66%] top-[70.77%] h-auto w-[24.39%]',
  },
  {
    src: IMG.trio2,
    w: 252,
    h: 350,
    alt: 'Couple embracing before the red rocks of Sedona',
    desktop: 'absolute left-[362px] top-[827px] h-[350px] w-[252px] max-w-none',
    fluid: 'absolute left-[40.62%] top-[70.26%] h-auto w-[23.64%]',
  },
  {
    src: IMG.trio3,
    w: 252,
    h: 350,
    alt: 'Bride in a lace gown holding an orange and white bouquet beside a canal bridge',
    desktop: 'absolute left-[663px] top-[827px] h-[350px] w-[252px] max-w-none',
    fluid: 'absolute left-[68.86%] top-[70.26%] h-auto w-[23.64%]',
  },
];

export default function Home() {
  return (
    <main>
      {/* Intro line — baked PNG strip, centered */}
      <section className="px-5 pt-[34px]">
        <Image
          src={IMG.introLine}
          alt="Arabella's Weddings & Events offers luxury wedding planning, design, and coordination throughout Arizona, Chicago, and beyond."
          width={840}
          height={57}
          priority
          className="mx-auto block h-auto w-full max-w-[665px]"
        />
      </section>

      {/* Hero — 986x404 twelve-slide slideshow with the glowing AWE banner overlaid (live comp-mbcserd2) */}
      <HeroSlideshow />

      {/* "A Few Favorites" collage — canvas graphic with the photo trio overlapping its bottom band */}
      <section className="mt-[9px] overflow-x-clip">
        {/* >= lg: exact live geometry on the 980px content grid */}
        <div className="relative mx-auto hidden aspect-[980/1177] w-[980px] lg:block">
          <Image
            src={IMG.about}
            alt={CANVAS_ALT}
            width={2132}
            height={1790}
            sizes="1066px"
            className="absolute -left-[71px] top-0 h-[895px] w-[1066px] max-w-none"
          />
          {FAVORITES.map((p) => (
            <Image key={p.src} src={p.src} alt={p.alt} width={p.w * 2} height={p.h * 2} sizes={p.w + 'px'} className={p.desktop} />
          ))}
        </div>
        {/* < lg: same composition, scaled proportionally to the canvas */}
        <div className="relative mx-auto aspect-[1066/1177] w-full max-w-[1066px] lg:hidden">
          <Image
            src={IMG.about}
            alt={CANVAS_ALT}
            width={2132}
            height={1790}
            sizes="100vw"
            className="absolute left-0 top-0 h-auto w-full"
          />
          {FAVORITES.map((p) => (
            <Image key={p.src} src={p.src} alt={p.alt} width={p.w * 2} height={p.h * 2} sizes="25vw" className={p.fluid} />
          ))}
        </div>
      </section>

      {/* "AN EYE FOR WHAT COULD BE" — heading strip PNG + bio paragraphs as real text + vision tagline strip */}
      <section className="px-6">
        <Image
          src={IMG.eyeHeading}
          alt="AN EYE FOR WHAT COULD BE"
          width={626}
          height={46}
          className="mx-auto mt-[71px] block h-auto w-full max-w-[447px]"
        />
        <div className="mx-auto mt-[28px] w-full max-w-[668px] text-[14.5px] font-light leading-[21.5px] tracking-[0.09em] text-brown">
          {ABOUT_PARAS.map((p, n) => (
            <p key={n} className="m-0">
              {p}
            </p>
          ))}
        </div>
        <Image
          src={IMG.visionTagline}
          alt="SHARE THE VISION. TRUST THE PROCESS. AND ALLOW YOURSELF TO BE SURPRISED BY WHAT WE create"
          width={840}
          height={70}
          className="mx-auto mt-[23px] block h-auto w-full max-w-[600px]"
        />
      </section>

      {/* "THE AWE experience" graphic — heads the testimonial carousel; offset left of center on live */}
      <section className="mx-auto mt-[77px] w-full max-w-[980px] px-6 lg:px-0">
        <Image
          src={IMG.aweExperience}
          alt="THE AWE experience"
          width={465}
          height={238}
          className="mx-auto block h-auto w-[332px] max-w-full lg:mx-0 lg:ml-[80px]"
        />
      </section>

      <Testimonials />
    </main>
  );
}
