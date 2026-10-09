import Image from 'next/image';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo';
import { VENDORS, VENUES } from '@/lib/vendors-content';

export const metadata = pageMeta({
  title: 'Our Partners & Venues | Sedona Weddings',
  description:
    'The photographers, caterers, and creative partners Arabella’s Weddings & Events loves working with, and our key Sedona venues: Tlaquepaque and Don Hoel’s Cabins.',
  path: '/vendors',
});

const H = 'font-display font-light tracking-[0.13em] md:tracking-[0.19em]';
const BODY = 'text-[14.5px] font-light leading-[2] tracking-[0.05em] text-pretty';

// Our Partners + key venues. Content lives in lib/vendors-content.js;
// photographers marked homeOnly appear only on the homepage list.
export default function VendorsPage() {
  return (
    <main className="mx-auto max-w-[1000px] px-6 pb-16 pt-12 text-[#443221] md:px-10 md:pt-[70px]">
      <section className="pb-[62px] text-center">
        <h1 className="m-0 font-script text-[38px] font-normal leading-none sm:text-[44px] md:text-[62px]">Our Partners</h1>
        <p className={`mx-auto mb-0 mt-6 max-w-[620px] ${BODY}`}>
          The creative partners we love working with, and who care about the details as much as we do.
        </p>
      </section>

      <section className="border-t border-[#e6ddd2] py-[62px]">
        <ul className="mx-auto grid max-w-[760px] list-none gap-x-10 gap-y-8 p-0 text-center sm:grid-cols-2">
          {VENDORS.filter((v) => !v.homeOnly).map((v) => (
            <li key={v.name} className="flex flex-col gap-1.5">
              {v.role ? <span className="text-[11px] font-light uppercase tracking-[0.18em] text-brown">{v.role}</span> : null}
              {/* A logo, when there is one, stands in for the name (and is the link). */}
              <span className={`${H} text-[16px] md:text-[18px]`}>
                {(() => {
                  const mark = v.logo ? (
                    <Image src={v.logo.src} alt={v.name} width={v.logo.w} height={v.logo.h} className="mx-auto mt-2 block h-[60px] w-auto max-w-[230px] object-contain" />
                  ) : (
                    v.name.toUpperCase()
                  );
                  return v.url ? (
                    <a href={v.url} target="_blank" rel="noreferrer" className="text-inherit transition-opacity hover:text-tan hover:opacity-75">
                      {mark}
                    </a>
                  ) : (
                    mark
                  );
                })()}
              </span>
              {v.note ? <span className="text-[13px] font-light italic tracking-[0.03em]">{v.note}</span> : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[#e6ddd2] pt-[62px] text-center">
        <div className="font-script text-[38px] leading-none sm:text-[44px] md:text-[62px]">Key</div>
        <h2 className={`${H} mb-12 mt-1.5 text-[22px] sm:text-[27px] md:text-[38px]`}>VENUES</h2>
        <div className="flex flex-wrap justify-center gap-12 md:gap-10">
          {VENUES.map((v) => (
            <article key={v.name} className="flex w-full flex-col items-center md:w-[calc(50%-20px)]">
              {v.photo ? (
                <Image
                  src={v.photo.src}
                  alt={v.photo.alt}
                  width={v.photo.width}
                  height={v.photo.height}
                  sizes="(min-width: 1000px) 440px, (min-width: 768px) 45vw, 90vw"
                  className="mb-6 aspect-[4/5] h-auto w-full object-cover"
                />
              ) : null}
              <span className="text-[11px] font-light uppercase tracking-[0.18em] text-brown">{v.where}</span>
              <h3 className={`${H} m-0 mt-2 text-[17px] md:text-[20px]`}>
                {(() => {
                  const mark = v.logo ? (
                    <Image src={v.logo.src} alt={v.name} width={v.logo.w} height={v.logo.h} className="mx-auto mt-1 block h-auto max-h-[48px] w-auto max-w-[220px]" />
                  ) : (
                    v.name.toUpperCase()
                  );
                  return v.url ? (
                    <a href={v.url} target="_blank" rel="noreferrer" className="text-inherit transition-opacity hover:text-tan hover:opacity-75">
                      {mark}
                    </a>
                  ) : (
                    mark
                  );
                })()}
              </h3>
              <p className={`m-0 mt-3 max-w-[400px] ${BODY}`}>{v.note}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-16 border-t border-[#e6ddd2] pt-12 text-center">
        <Link
          href="/blog"
          className="inline-block border-b border-[#443221] pb-1 text-[12px] font-light uppercase tracking-[0.18em] transition-colors hover:border-tan"
        >
          See real weddings at these venues
        </Link>
      </div>
    </main>
  );
}
