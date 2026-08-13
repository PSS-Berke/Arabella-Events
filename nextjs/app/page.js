import Image from 'next/image';
import Testimonials from '@/components/Testimonials';
import HeroSlideshow from '@/components/HeroSlideshow';
import { Lettering, ScriptTagline } from '@/components/Lettering';
import { IMG, ABOUT_PARAS } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Luxury Wedding Planner | Scottsdale & Sedona, AZ',
  description:
    'Arizona luxury wedding planning, design, and coordination for Scottsdale and Sedona celebrations. 300+ events planned. Published in Style Me Pretty.',
  path: '/',
});

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

// The home page carries two Wix video players. Both autoplay muted on loop and
// letterbox onto black (object-fit: contain), matching live. Wix mounts them
// client-side AND unmounts them once they scroll out of view, so neither shows
// up in the page's server HTML — the reason both were missed on the first pass.
// Live draws its own control skin over each; native controls stand in for it,
// as on /gallery and /services.
//
// Raw markup keeps the `muted` attribute in SSR HTML (React drops the muted
// prop, and without it browsers block autoplay until hydration).
function wixVideo(src, poster, label) {
  return (
    `<video src="${src}" poster="${poster}"` +
    ' autoplay muted loop playsinline controls preload="metadata"' +
    ` aria-label="${label}"` +
    ' style="display:block;width:100%;height:100%;object-fit:contain"></video>'
  );
}

// Live comp-mshxfmxb: a 669x376 clip playing inside the collage graphic, directly
// under its "A FEW FAVORITES" label — 33s of 1920x1080, inset 155px from the left
// of the 980 grid and 248px down from the canvas top.
function CollageVideo({ className }) {
  return (
    <div
      className={'bg-black ' + className}
      dangerouslySetInnerHTML={{
        __html: wixVideo(
          '/media/49b5c3_94afe07dea67468194477edb9160c29d-1080p-f179853e.mp4',
          '/media/49b5c3_94afe07dea67468194477edb9160c29df000-f015404f.jpg',
          'Newlyweds walking hand in hand past a flower-covered courtyard storefront'
        ),
      }}
    />
  );
}

// Live comp-mbcywrbb: a 1177x650 panel closing the page below the testimonial
// carousel — centered on the 980 grid and overhanging it ~98px each side, 28px
// below the carousel. A 7s 960x540 clip.
function HomeVideo() {
  return (
    <section className="mt-[28px] overflow-x-clip">
      <div
        className="mx-auto aspect-[1177/650] w-full max-w-[1177px] bg-black"
        dangerouslySetInnerHTML={{
          __html: wixVideo(
            '/media/49b5c3_27a7a44aa2bf4bb9a0559243e72be06d-480p-06038076.mp4',
            '/media/49b5c3_27a7a44aa2bf4bb9a0559243e72be06df000-dc5ae3c8.jpg',
            'Newlyweds walking out through a shower of petals as their guests cheer'
          ),
        }}
      />
    </section>
  );
}

export default function Home() {
  return (
    <main>
      {/* Intro line — live text (was a baked PNG strip), centered.
          Doubles as the page h1: it is the existing live copy, and it already
          names the service and the market, which is exactly what an h1 owes. */}
      <section className="px-5 pt-[34px]">
        <Lettering className="mx-auto w-full max-w-[665px]">
          <h1 className="awe-intro m-0 text-center">
            Arabella&rsquo;s Weddings &amp; Events offers luxury wedding planning, design, and
            coordination throughout Arizona, Chicago, and beyond.
          </h1>
        </Lettering>
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
          <CollageVideo className="absolute left-[155px] top-[248px] h-[376px] w-[669px]" />
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
          {/* 155px in on the 980 grid = 226px from the canvas edge (226/1066); 248/1177 down */}
          <CollageVideo className="absolute left-[21.2%] top-[21.07%] aspect-[669/376] w-[62.76%]" />
          {FAVORITES.map((p) => (
            <Image key={p.src} src={p.src} alt={p.alt} width={p.w * 2} height={p.h * 2} sizes="25vw" className={p.fluid} />
          ))}
        </div>
      </section>

      {/* "AN EYE FOR WHAT COULD BE" — live-text heading + bio paragraphs + vision tagline */}
      <section className="px-6">
        <Lettering className="mx-auto mt-[71px] w-full max-w-[447px]">
          <h2 className="awe-caps awe-eyebrow-h m-0 text-center">AN EYE FOR WHAT COULD BE</h2>
        </Lettering>
        <div className="mx-auto mt-[28px] w-full max-w-[668px] text-[14.5px] font-light leading-[21.5px] tracking-[0.09em] text-brown">
          {ABOUT_PARAS.map((p, n) => (
            <p key={n} className="m-0">
              {p}
            </p>
          ))}
        </div>
        <ScriptTagline
          variant="awe-vision"
          caps="SHARE THE VISION. TRUST THE PROCESS. AND ALLOW YOURSELF TO BE SURPRISED BY WHAT WE"
          word="create"
          className="mx-auto mt-[23px] w-full max-w-[600px]"
        />
      </section>

      {/* "THE AWE experience" — heads the testimonial carousel; offset left of center on live.
          Kept as an image because it is a logotype: the AWE is custom lettering with a
          hand-drawn swash struck through it, not type that can be set. Wrapped in a
          heading so it still registers as one — the alt text carries the heading copy.
          Redrawing the swash as inline SVG would let this become live text too. */}
      <section className="mx-auto mt-[77px] w-full max-w-[980px] px-6 lg:px-0">
        <h2 className="m-0">
          <Image
            src={IMG.aweExperience}
            alt="The AWE Experience"
            width={465}
            height={238}
            className="mx-auto block h-auto w-[332px] max-w-full lg:mx-0 lg:ml-[80px]"
          />
        </h2>
      </section>

      <Testimonials />

      <HomeVideo />
    </main>
  );
}
