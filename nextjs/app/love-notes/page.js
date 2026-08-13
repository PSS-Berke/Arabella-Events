import Image from 'next/image';
import { LOVE_NOTES, LN_TITLE, LN_PHOTOS, SOCIAL_BOOTH } from '@/lib/love-notes-content';

export const metadata = {
  title: "KIND WORDS | Arabella's Weddings & Events | AWE",
  alternates: { canonical: '/love-notes' },
  openGraph: { url: '/love-notes', siteName: "Arabella's Weddings & Events | AWE ", type: 'website' },
};

/*
 * 1:1 rebuild of https://www.arabellasweddings.com/love-notes.
 *
 * Desktop (lg+) reproduces the live Wix mesh layout exactly: each section is a
 * 980px single-column CSS grid (grid-template-columns:100%) whose children are
 * pinned with grid-area spans, left offsets (ml-[..]) and the live top/bottom
 * margins, all lifted verbatim from the live page's generated CSS. Below lg the
 * same DOM stacks into a centered single column.
 */

// Shared type treatment: live renders every quote in Avenir Light 16-18px,
// #414141, letter-spacing 0, line-height 1.4em (font-body Barlow stands in).
const QUOTE = 'm-0 whitespace-pre-line font-light leading-[1.4]';

function NameImg({ review, className }) {
  return (
    <Image
      src={review.nameImg.src}
      alt={review.name}
      width={review.nameImg.w}
      height={review.nameImg.h}
      className={className}
    />
  );
}

function Photo({ img, className }) {
  return <Image src={img.src} alt={img.alt} width={img.w} height={img.h} className={className} />;
}

const SECTION =
  'mx-auto flex w-full max-w-[980px] flex-col items-center px-6 lg:grid lg:w-[980px] lg:max-w-none lg:grid-cols-[100%] lg:items-start lg:justify-items-start lg:px-0';

export default function LoveNotes() {
  const r = LOVE_NOTES;
  return (
    <main className="bg-white pb-16 text-charcoal lg:pb-20">
      {/* "THE AWE experience" title graphic */}
      <section className="mx-auto flex w-full max-w-[980px] justify-center px-6 pt-6 lg:block lg:px-0 lg:pt-0">
        <Image
          src={LN_TITLE.src}
          alt="The AWE Experience"
          width={LN_TITLE.w}
          height={LN_TITLE.h}
          priority
          className="h-auto w-[200px] lg:ml-[6px] lg:mt-[8px] lg:w-[234px]"
        />
      </section>

      {/* Review 1 (Hannah & Hunter) + chapel photo right */}
      <section className={`${SECTION} lg:grid-rows-[repeat(3,min-content)_1fr]`}>
        <NameImg review={r[0]} className="mt-10 h-auto w-[290px] max-w-[80%] lg:mb-[9px] lg:ml-[46px] lg:mt-[49px] lg:w-[394px] lg:max-w-none lg:[grid-area:1/1/2/2]" />
        <p className={`${QUOTE} mt-4 w-full max-w-[520px] text-[16px] lg:mb-[70px] lg:ml-[37px] lg:mt-0 lg:w-[474px] lg:max-w-none lg:[grid-area:2/1/3/2]`}>{r[0].text}</p>
        <Photo img={LN_PHOTOS.chapel} className="mt-10 h-auto w-[421px] max-w-full lg:mb-[32px] lg:ml-[559px] lg:mt-[38px] lg:max-w-none lg:[grid-area:1/1/4/2]" />
      </section>

      {/* Reviews 2-5 with Sedona / Jenna & Derek / willow photos */}
      <section className={`${SECTION} lg:grid-rows-[repeat(10,min-content)_1fr]`}>
        <Photo img={LN_PHOTOS.sedona} className="mt-10 h-auto w-[346px] max-w-full lg:mb-[59px] lg:ml-[14px] lg:mt-0 lg:max-w-none lg:[grid-area:2/1/3/2]" />
        <NameImg review={r[1]} className="mt-12 h-auto w-[290px] max-w-[80%] lg:mb-[-13px] lg:ml-[457px] lg:mt-[189px] lg:w-[389px] lg:max-w-none lg:[grid-area:1/1/2/2]" />
        <p className={`${QUOTE} mt-4 w-full max-w-[585px] text-[17px] lg:mb-[10px] lg:ml-[375px] lg:mt-[20px] lg:w-[585px] lg:max-w-none lg:[grid-area:2/1/3/2]`}>{r[1].text}</p>
        <NameImg review={r[2]} className="mt-12 h-auto w-[290px] max-w-[80%] lg:mb-[15px] lg:ml-[101px] lg:mt-0 lg:w-[389px] lg:max-w-none lg:[grid-area:3/1/4/2]" />
        <p className={`${QUOTE} mt-4 w-full max-w-[520px] text-[17px] lg:mb-[60px] lg:ml-[57px] lg:mt-0 lg:w-[497px] lg:max-w-none lg:[grid-area:4/1/5/2]`}>{r[2].text}</p>
        <Photo img={LN_PHOTOS.jennaDerek} className="mt-10 h-auto w-[346px] max-w-full lg:mb-[10px] lg:ml-[587px] lg:mt-[15px] lg:max-w-none lg:[grid-area:3/1/6/2]" />
        <Photo img={LN_PHOTOS.willow} className="mt-10 h-auto w-[446px] max-w-full lg:mb-[10px] lg:ml-[23px] lg:mt-0 lg:max-w-none lg:[grid-area:6/1/9/2]" />
        <NameImg review={r[3]} className="mt-12 h-auto w-[290px] max-w-[80%] lg:mb-[25px] lg:ml-[533px] lg:mt-[42px] lg:w-[389px] lg:max-w-none lg:[grid-area:6/1/7/2]" />
        <p className={`${QUOTE} mt-4 w-full max-w-[520px] text-[17px] lg:mb-[10px] lg:ml-[490px] lg:mt-0 lg:w-[475px] lg:max-w-none lg:[grid-area:7/1/8/2]`}>{r[3].text}</p>
        <NameImg review={r[4]} className="mt-12 h-auto w-[290px] max-w-[80%] lg:mb-0 lg:ml-[333px] lg:mt-0 lg:w-[389px] lg:max-w-none lg:[grid-area:9/1/10/2]" />
        <p className={`${QUOTE} mt-4 w-full max-w-[520px] text-[17px] lg:mb-[10px] lg:ml-[333px] lg:mt-0 lg:w-[433px] lg:max-w-none lg:[grid-area:10/1/11/2]`}>{r[4].text}</p>
      </section>

      {/* Reviews 6-12, remaining photos, Social Booth LV credit */}
      <section className={`${SECTION} lg:grid-rows-[repeat(20,min-content)_1fr]`}>
        <Photo img={LN_PHOTOS.archway} className="mt-10 h-auto w-[342px] max-w-full lg:mb-[10px] lg:ml-[46px] lg:mt-[61px] lg:max-w-none lg:[grid-area:1/1/4/2]" />
        <NameImg review={r[5]} className="mt-12 h-auto w-[290px] max-w-[80%] lg:mb-[37px] lg:ml-[474px] lg:mt-[61px] lg:w-[389px] lg:max-w-none lg:[grid-area:1/1/2/2]" />
        <p className={`${QUOTE} mt-4 w-full max-w-[520px] text-center text-[17px] lg:mb-[10px] lg:ml-[439px] lg:mt-0 lg:w-[478px] lg:max-w-none lg:[grid-area:2/1/3/2]`}>{r[5].text}</p>
        <NameImg review={r[6]} className="mt-12 h-auto w-[300px] max-w-[80%] lg:mb-[23px] lg:ml-[289px] lg:mt-0 lg:w-[415px] lg:max-w-none lg:[grid-area:5/1/6/2]" />
        <p className={`${QUOTE} mt-4 w-full max-w-[640px] text-center text-[17px] lg:mb-[39px] lg:ml-[88px] lg:mt-0 lg:w-[796px] lg:max-w-none lg:[grid-area:6/1/7/2]`}>{r[6].text}</p>
        <Photo img={LN_PHOTOS.ceremony} className="mt-10 h-auto w-[342px] max-w-full lg:mb-[58px] lg:ml-[34px] lg:mt-0 lg:max-w-none lg:[grid-area:7/1/10/2]" />
        <NameImg review={r[7]} className="mt-12 h-auto w-[300px] max-w-[80%] lg:mb-[29px] lg:ml-[469px] lg:mt-[21px] lg:w-[415px] lg:max-w-none lg:[grid-area:7/1/8/2]" />
        <p className={`${QUOTE} mt-4 w-full max-w-[520px] text-center text-[17px] lg:mb-[10px] lg:ml-[433px] lg:mt-0 lg:w-[478px] lg:max-w-none lg:[grid-area:8/1/9/2]`}>{r[7].text}</p>
        <NameImg review={r[8]} className="mt-12 h-auto w-[300px] max-w-[80%] lg:mb-[-30px] lg:ml-[115px] lg:mt-0 lg:w-[415px] lg:max-w-none lg:[grid-area:10/1/11/2]" />
        <p className={`${QUOTE} mt-4 w-full max-w-[600px] text-center text-[18px] lg:mb-[10px] lg:ml-[46px] lg:mt-[65px] lg:w-[572px] lg:max-w-none lg:[grid-area:11/1/12/2]`}>{r[8].text}</p>
        <Photo img={LN_PHOTOS.brideGroomCloseup} className="mt-10 h-auto w-[282px] max-w-full lg:mb-[58px] lg:ml-[652px] lg:mt-0 lg:max-w-none lg:[grid-area:11/1/12/2]" />
        <Photo img={LN_PHOTOS.bouquet} className="mt-10 h-auto w-[287px] max-w-full lg:mb-[10px] lg:ml-[89px] lg:mt-0 lg:max-w-none lg:[grid-area:12/1/15/2]" />
        <NameImg review={r[9]} className="mt-12 h-auto w-[300px] max-w-[80%] lg:mb-[17px] lg:ml-[475px] lg:mt-[45px] lg:w-[415px] lg:max-w-none lg:[grid-area:12/1/13/2]" />
        <p className={`${QUOTE} mt-4 w-full max-w-[520px] text-center text-[17px] lg:mb-[10px] lg:ml-[491px] lg:mt-0 lg:w-[413px] lg:max-w-none lg:[grid-area:13/1/14/2]`}>{r[9].text}</p>
        <NameImg review={r[10]} className="mt-12 h-auto w-[300px] max-w-[80%] lg:mb-[-27px] lg:ml-[89px] lg:mt-0 lg:w-[415px] lg:max-w-none lg:[grid-area:16/1/17/2]" />
        <p className={`${QUOTE} mt-4 w-full max-w-[560px] text-center text-[17px] lg:mb-[10px] lg:ml-[61px] lg:mt-[42px] lg:w-[487px] lg:max-w-none lg:[grid-area:17/1/18/2]`}>{r[10].text}</p>
        <Photo img={LN_PHOTOS.embrace} className="mt-10 h-auto w-[313px] max-w-full lg:mb-[10px] lg:ml-[610px] lg:mt-0 lg:max-w-none lg:[grid-area:17/1/18/2]" />
        <a
          href={SOCIAL_BOOTH.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 lg:mb-[5px] lg:ml-[656px] lg:mt-0 lg:[grid-area:19/1/20/2]"
        >
          <Image
            src={SOCIAL_BOOTH.logo.src}
            alt="Social Booth LV"
            width={SOCIAL_BOOTH.logo.w}
            height={SOCIAL_BOOTH.logo.h}
            className="h-auto w-[119px]"
          />
        </a>
        <Photo img={LN_PHOTOS.photoBooth} className="mt-10 h-auto w-[407px] max-w-full lg:mb-[63px] lg:ml-[81px] lg:mt-0 lg:max-w-none lg:[grid-area:20/1/21/2]" />
        <p className={`${QUOTE} mt-10 w-full max-w-[520px] text-center text-[17px] lg:mb-[10px] lg:ml-[515px] lg:mt-0 lg:w-[417px] lg:max-w-none lg:[grid-area:20/1/21/2]`}>{r[11].text}</p>
      </section>
    </main>
  );
}
