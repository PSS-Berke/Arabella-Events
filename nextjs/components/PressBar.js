// "Featured in" banner (homepage and /arabella): publication names drift
// slowly across a soft grey band, each set in its own type so the row reads
// like a strip of logos (Oct 2026, after the Kionda-style example). To use a
// real logo, drop the file in /public/media and add `logo: { src, width,
// height }` to that entry. `href` (optional) links to the feature. Keep these
// in step with `press` on the posts in lib/blog-content.js.
import Image from 'next/image';

const PRESS = [
  { name: 'Style Me Pretty', type: 'font-display text-[28px] italic md:text-[32px]' },
  {
    name: 'Arizona Wed',
    href: 'https://www.instagram.com/p/DXho2XyD0_W/',
    type: 'font-display text-[20px] uppercase tracking-[0.32em] md:text-[23px]',
  },
  {
    name: 'Together Journal',
    href: 'https://togetherjournal.com/lindsey-hunter-by-dana-maruna/',
    type: 'font-body text-[15px] font-medium uppercase tracking-[0.42em] md:text-[17px]',
  },
  { name: 'Carats & Cake', type: 'font-body text-[16px] font-light uppercase tracking-[0.5em] md:text-[18px]' },
  {
    name: 'Lover.ly',
    href: 'https://loverly.com/real-weddings/whimsical-autumn-romance-in-the-woods',
    type: 'font-display text-[32px] font-semibold lowercase tracking-[0.02em] md:text-[38px]',
  },
];

// Repeated so one copy always fills the widest screen; the track holds two
// copies and slides by exactly one, so the loop is seamless.
const ROW = [...PRESS, ...PRESS, ...PRESS];

function Mark({ p, hidden }) {
  const body = p.logo ? (
    <Image src={p.logo.src} alt={p.name} width={p.logo.width} height={p.logo.height} className="h-10 w-auto" />
  ) : (
    <span className={`${p.type} whitespace-nowrap text-[#2e2620]`}>{p.name}</span>
  );
  return (
    <li className="flex shrink-0 items-center px-10 md:px-16" aria-hidden={hidden || undefined}>
      {p.href ? (
        <a
          href={p.href}
          target="_blank"
          rel="noreferrer"
          tabIndex={hidden ? -1 : undefined}
          className="no-underline opacity-80 transition-opacity hover:opacity-100"
        >
          {body}
        </a>
      ) : (
        <span className="opacity-80">{body}</span>
      )}
    </li>
  );
}

export default function PressBar({ className = '' }) {
  return (
    <section className={`overflow-hidden border-t border-[#e3d3bb] bg-[#f8f7f5] py-12 text-center ${className}`}>
      <p className="m-0 text-[11px] font-normal uppercase tracking-[0.24em] text-[#2e2620]">Featured in:</p>
      <div className="awe-marquee mt-8 flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="m-0 flex list-none items-center p-0">
            {ROW.map((p, i) => (
              <Mark key={`${copy}-${i}`} p={p} hidden={copy === 1 || i >= PRESS.length} />
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
