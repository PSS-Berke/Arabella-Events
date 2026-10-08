// "As featured in" press bar (homepage and /arabella). Publication names are
// set as type for now; to show a real logo, drop the file in /public/media and
// add `logo: { src, width, height }` to that entry. `note` is an optional
// line under the name; `href` (optional) links it to the feature; `story`
// (optional) is the slug of the matching blog post, linked underneath. Keep
// these in step with `press` on the posts in lib/blog-content.js.
import Image from 'next/image';
import Link from 'next/link';

const PRESS = [
  { name: 'Style Me Pretty' },
  {
    name: 'Arizona Wed',
    note: '#2 Best Fall Wedding · Jordan & Austin',
    href: 'https://www.instagram.com/p/DXho2XyD0_W/',
    story: 'vintage-romance-wedding-tlaquepaque-sedona',
  },
  {
    name: 'Together Journal',
    note: 'Hannah & Hunter',
    href: 'https://togetherjournal.com/lindsey-hunter-by-dana-maruna/',
    story: 'seven-week-timeless-wedding-tlaquepaque-sedona',
  },
  {
    name: 'Lover.ly',
    note: 'Whimsical Autumn Romance in the Woods',
    href: 'https://loverly.com/real-weddings/whimsical-autumn-romance-in-the-woods',
  },
];

export default function PressBar({ className = '' }) {
  return (
    <section className={`border-y border-[#e6ddd2] px-6 py-8 text-center text-[#443221] ${className}`}>
      <p className="m-0 text-[11px] font-light uppercase tracking-[0.24em] text-brown">As featured in</p>
      <ul className="m-0 mt-5 flex list-none flex-wrap items-start justify-center gap-x-16 gap-y-6 p-0">
        {PRESS.map((p) => {
          const body = (
            <>
              {p.logo ? (
                <Image src={p.logo.src} alt={p.name} width={p.logo.width} height={p.logo.height} className="h-10 w-auto" />
              ) : (
                <span className="font-display text-[26px] italic tracking-[0.04em] md:text-[32px]">{p.name}</span>
              )}
              {p.note ? (
                <span className="mt-2 max-w-[240px] text-[11px] font-light uppercase tracking-[0.2em]">{p.note}</span>
              ) : null}
            </>
          );
          return (
            <li key={p.name} className="flex flex-col items-center">
              {p.href ? (
                <a href={p.href} target="_blank" rel="noreferrer" className="flex flex-col items-center text-inherit no-underline transition-colors hover:text-tan">
                  {body}
                </a>
              ) : (
                body
              )}
              {p.story ? (
                <Link
                  href={`/blog/${p.story}`}
                  className="mt-2 text-[10px] font-light uppercase tracking-[0.2em] text-brown underline decoration-[#d9cfc3] underline-offset-4 transition-colors hover:text-tan"
                >
                  Read the story &rarr;
                </Link>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
