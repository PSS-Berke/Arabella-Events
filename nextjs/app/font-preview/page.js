// TEMPORARY: side-by-side font sets for Arabella to choose from. Not linked
// anywhere and not indexed. Delete this folder once a set is picked.
// Fonts load straight from Google Fonts here so nothing site-wide changes.

export const metadata = { title: 'Font preview | AWE', robots: { index: false, follow: false } };

const SETS = [
  {
    name: 'Modern & Airy',
    note: 'Clean, light and spacious. Thin wide-spaced capitals, no fancy serifs.',
    heading: "'Montserrat', sans-serif", headingWeight: 300,
    body: "'Lato', sans-serif",
    script: "'Allura', cursive",
  },
  {
    name: 'Soft Editorial',
    note: 'Delicate, fashion-magazine capitals with a simple modern body font.',
    heading: "'Italiana', serif", headingWeight: 400,
    body: "'Jost', sans-serif",
    script: "'Great Vibes', cursive",
  },
  {
    name: 'Warm Classic',
    note: 'Timeless, carved-stone style capitals. Elegant but not fussy.',
    heading: "'Marcellus', serif", headingWeight: 400,
    body: "'Mulish', sans-serif",
    script: "'Parisienne', cursive",
  },
  {
    name: 'Romantic Serif',
    note: 'A graceful high-contrast serif with a soft, flowing script.',
    heading: "'Gilda Display', serif", headingWeight: 400,
    body: "'Raleway', sans-serif",
    script: "'Mrs Saint Delafield', cursive",
  },
  {
    name: 'Minimal Geometric',
    note: 'Simple rounded shapes. Very current and easy to read.',
    heading: "'Josefin Sans', sans-serif", headingWeight: 300,
    body: "'Nunito Sans', sans-serif",
    script: "'Pinyon Script', cursive",
  },
];

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&family=Lato:wght@300;400&family=Allura&family=Italiana&family=Jost:wght@300;400&family=Great+Vibes&family=Marcellus&family=Mulish:wght@300;400&family=Parisienne&family=Gilda+Display&family=Raleway:wght@300;400&family=Mrs+Saint+Delafield&family=Josefin+Sans:wght@300;400&family=Nunito+Sans:wght@300;400&family=Pinyon+Script&display=swap';

const PARA =
  'I spent years learning how to transform traditional hotel ballrooms into spaces that felt anything but ordinary. What drew me to this industry was never simply the event itself—it was the possibility of what a space, a detail, or an idea could become.';

export default function FontPreview() {
  return (
    <main className="mx-auto max-w-[1000px] px-6 py-12 text-[#443221] md:px-10">
      <link rel="stylesheet" href={FONTS_URL} />
      <p className="m-0 mb-12 text-center text-[14px] font-light tracking-[0.05em]">
        Five complete font sets, each shown on your own words. Tell me the number you like best — or mix and match
        (e.g. &ldquo;headings from 2, script from 4&rdquo;).
      </p>
      <div className="flex flex-col gap-10">
        {SETS.map((s, i) => (
          <section key={s.name} className="border border-[#e6ddd2] px-6 py-10 text-center md:px-12">
            <p className="m-0 mb-6 text-[12px] uppercase tracking-[0.2em] text-[#80695a]" style={{ fontFamily: s.body }}>
              {i + 1}. {s.name} &mdash; {s.note}
            </p>
            <p className="m-0 mb-6 text-[13px] tracking-[0.12em]" style={{ fontFamily: s.heading, fontWeight: s.headingWeight }}>
              WELCOME &nbsp;&nbsp; PACKAGES &nbsp;&nbsp; RENTALS &nbsp;&nbsp; GALLERY &nbsp;&nbsp; CONTACT
            </p>
            <div className="text-[52px] leading-none md:text-[64px]" style={{ fontFamily: s.script }}>Rentals</div>
            <h2
              className="m-0 mb-6 mt-3 text-[24px] tracking-[0.18em] md:text-[34px]"
              style={{ fontFamily: s.heading, fontWeight: s.headingWeight }}
            >
              AN EYE FOR WHAT COULD BE
            </h2>
            <p className="mx-auto my-0 max-w-[640px] text-[15px] font-light leading-[1.9] tracking-[0.02em]" style={{ fontFamily: s.body }}>
              {PARA}
            </p>
            <p className="m-0 mt-6 text-[18px] tracking-[0.12em]" style={{ fontFamily: s.heading, fontWeight: s.headingWeight }}>
              GOLD CANDELABRA &nbsp;&middot;&nbsp; $50 EACH
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
