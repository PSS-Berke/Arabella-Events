'use client';
import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PhotoCarousel from '@/components/PhotoCarousel';
import { RENTAL_CATEGORIES } from '@/lib/rentals-content';

// Rentals grid plus the "reserve now, pay later" flow: each card gets a Reserve
// button that turns into a quantity stepper; once anything is picked, a bar
// pins to the bottom of the screen with the running total, and opens a short
// form (name, email, phone, date). Submitting emails Arabella via
// /api/rentals, which re-checks every quantity and price. Nothing is charged.

const H = 'font-display font-light tracking-[0.13em] md:tracking-[0.19em]';
const BODY = 'text-[14.5px] font-light leading-[2] tracking-[0.05em] text-pretty';
const SMALL = 'text-[11px] font-light uppercase tracking-[0.18em]';
const BTN =
  'cursor-pointer border border-[#443221] bg-transparent px-5 py-2.5 text-[12px] font-light uppercase tracking-[0.18em] text-[#443221] transition-colors hover:bg-[#443221] hover:text-white disabled:cursor-default disabled:opacity-40';
const INPUT = 'w-full border border-[#d9cfc3] bg-white px-3 py-2.5 text-[14px] font-light text-[#443221] outline-none focus:border-[#443221]';

// Without a known stock count, cap a single line at something sane.
const MAX_UNKNOWN = 100;
const money = (n) => `$${n.toLocaleString('en-US')}`;

// Card photo first, then any extras from the item's `morePhotos`.
const photosOf = (item) => [
  { src: item.image, alt: item.alt ?? item.name },
  ...(item.morePhotos ?? []).map((src, n) => ({ src, alt: `${item.name}, photo ${n + 2}` })),
];

function Stepper({ value, max, onChange, label }) {
  return (
    <div className="inline-flex items-center border border-[#443221]" role="group" aria-label={label}>
      <button type="button" aria-label={`Fewer ${label}`} onClick={() => onChange(value - 1)} className="h-10 w-10 cursor-pointer border-0 bg-transparent text-[18px] text-[#443221]">
        &minus;
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={max}
        value={value}
        aria-label={`${label} quantity`}
        onChange={(e) => onChange(Number.parseInt(e.target.value, 10) || 0)}
        className="h-10 w-12 border-0 bg-transparent text-center text-[15px] text-[#443221] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
      />
      <button
        type="button"
        aria-label={`More ${label}`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className="h-10 w-10 cursor-pointer border-0 bg-transparent text-[18px] text-[#443221] disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}

export default function RentalReservation({ items }) {
  // Items grouped by category, in RENTAL_CATEGORIES order (uncategorized last).
  const groups = [...RENTAL_CATEGORIES, { id: 'more', name: 'More Pieces' }]
    .map((c) => ({ ...c, items: items.filter((i) => (i.category || 'more') === c.id) }))
    .filter((g) => g.items.length);
  // { [name]: { qty, addOn } }
  const [picked, setPicked] = useState({});
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', venue: '' });
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [viewing, setViewing] = useState(null); // item whose photo carousel is open
  const closeViewer = useCallback(() => setViewing(null), []);

  const setQty = (item, qty) => {
    const max = item.available ?? MAX_UNKNOWN;
    const q = Math.max(0, Math.min(max, qty));
    setPicked((p) => {
      const next = { ...p };
      if (q === 0) delete next[item.name];
      else next[item.name] = { qty: q, addOn: Math.min(p[item.name]?.addOn ?? 0, q) };
      return next;
    });
  };
  const setAddOn = (item, n) =>
    setPicked((p) => ({ ...p, [item.name]: { ...p[item.name], addOn: Math.max(0, Math.min(p[item.name].qty, n)) } }));

  const lines = useMemo(
    () =>
      items
        .filter((it) => picked[it.name])
        .map((it) => {
          const { qty, addOn } = picked[it.name];
          return { item: it, qty, addOn, subtotal: qty * it.unitPrice + addOn * (it.addOn?.unitPrice ?? 0) };
        }),
    [items, picked]
  );
  const pieces = lines.reduce((n, l) => n + l.qty, 0);
  const total = lines.reduce((n, l) => n + l.subtotal, 0);

  // Earliest selectable date: tomorrow, in the visitor's local time.
  const minDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  async function submit(e) {
    e.preventDefault();
    setStatus({ state: 'sending', message: '' });
    try {
      const res = await fetch('/api/rentals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          items: lines.map((l) => ({ name: l.item.name, qty: l.qty, addOn: l.addOn })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      setStatus({ state: 'done', message: '' });
      setPicked({});
    } catch (err) {
      setStatus({ state: 'error', message: err.message });
    }
  }

  return (
    <>
      {viewing ? <PhotoCarousel photos={photosOf(viewing)} title={viewing.name} onClose={closeViewer} /> : null}
      {/* Jump links to each group */}
      <nav aria-label="Rental categories" className="flex flex-wrap justify-center gap-x-7 gap-y-3 border-t border-[#e6ddd2] pt-8">
        {groups.map((g) => (
          <a
            key={g.id}
            href={`#rentals-${g.id}`}
            className="border-b border-transparent pb-1 text-[11px] font-light uppercase tracking-[0.22em] text-[#443221] no-underline transition-colors hover:border-tan hover:text-tan"
          >
            {g.name}
          </a>
        ))}
      </nav>
      {groups.map((g) => (
      <section key={g.id} id={`rentals-${g.id}`} className="scroll-mt-24 pt-[62px]">
        {g.eyebrow ? <p className="m-0 mb-3 text-center font-script text-[32px] leading-none text-[#9a8158] md:text-[40px]">{g.eyebrow.toLowerCase()}</p> : null}
        <h2 className={`m-0 text-center font-display text-[20px] font-normal uppercase tracking-[0.2em] md:text-[24px] ${g.intro ? '' : 'mb-10'}`}>{g.name}</h2>
        {g.intro ? <p className="m-0 mx-auto mb-10 mt-4 max-w-[600px] text-center font-display text-[17px] italic leading-[1.6] text-[#5a4634] md:text-[19px]">{g.intro}</p> : null}
        <div className="flex flex-wrap justify-center gap-10">
        {g.items.map((item) => {
          const qty = picked[item.name]?.qty ?? 0;
          const max = item.available ?? MAX_UNKNOWN;
          const reservable = typeof item.unitPrice === 'number';
          return (
            <article key={item.name} className="flex w-full flex-col items-center text-center sm:w-[calc(50%-20px)] md:w-[calc((100%-80px)/3)]">
              {item.image ? (
                <button
                  type="button"
                  onClick={() => setViewing(item)}
                  aria-label={`View ${photosOf(item).length > 1 ? `${photosOf(item).length} photos` : 'photo'} of ${item.name}`}
                  className="group relative mb-6 block w-full cursor-zoom-in border-0 bg-transparent p-0"
                >
                  <Image
                    src={item.image}
                    alt={item.alt ?? item.name}
                    width={1334}
                    height={2000}
                    sizes="(min-width: 1000px) 300px, (min-width: 640px) 45vw, 90vw"
                    className={`block aspect-[4/5] h-auto w-full transition-opacity group-hover:opacity-90 ${item.fit === 'contain' ? 'bg-white object-contain p-4' : 'object-cover'}`}
                  />
                  {photosOf(item).length > 1 ? (
                    <span className="absolute bottom-2 right-2 bg-white/90 px-2 py-1 text-[10px] font-light uppercase tracking-[0.16em] text-[#443221]">
                      {photosOf(item).length} photos
                    </span>
                  ) : null}
                </button>
              ) : null}
              <h3 className={`${H} m-0 text-[15px] md:text-[17px]`}>{item.name.toUpperCase()}</h3>
              <p className="m-0 mt-3 font-display text-[18px] tracking-[0.08em]">
                {item.price ?? <span className={`${SMALL} text-[12px] text-brown`}>Inquire for pricing</span>}
              </p>
              {item.available ? <p className={`m-0 mt-2 text-brown ${SMALL}`}>{item.available} available</p> : null}
              <ul className={`m-0 mt-4 list-none p-0 ${BODY}`}>
                {item.details.map((d) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col items-center gap-3 pt-5">
                {!reservable ? (
                  <Link href="/contact" className={`${BTN} no-underline`}>
                    Inquire
                  </Link>
                ) : qty === 0 ? (
                  <button type="button" className={BTN} onClick={() => setQty(item, 1)}>
                    Reserve
                  </button>
                ) : (
                  <>
                    <Stepper value={qty} max={max} label={item.name} onChange={(n) => setQty(item, n)} />
                    {item.addOn ? (
                      <div className="flex flex-col items-center gap-2">
                        <span className={`text-brown ${SMALL}`}>
                          {item.addOn.name}s &middot; {money(item.addOn.unitPrice)} each
                        </span>
                        <Stepper
                          value={picked[item.name].addOn}
                          max={qty}
                          label={`${item.addOn.name}s`}
                          onChange={(n) => setAddOn(item, n)}
                        />
                      </div>
                    ) : null}
                  </>
                )}
              </div>
            </article>
          );
        })}
        </div>
      </section>
      ))}

      {status.state === 'done' ? (
        <div role="status" className="mx-auto mt-[62px] max-w-[620px] border border-[#e6ddd2] px-6 py-8 text-center">
          <div className="font-script text-[38px] leading-none md:text-[48px]">Thank you</div>
          <p className={`m-0 mt-4 ${BODY}`}>
            Your reservation request is in. We&rsquo;ll confirm availability and send your invoice by email.
          </p>
        </div>
      ) : null}

      {/* Sticky summary + checkout. Spacer keeps the last cards clear of the bar. */}
      {pieces > 0 ? <div className="h-28" aria-hidden="true" /> : null}
      {pieces > 0 ? (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e6ddd2] bg-white/95 shadow-[0_-8px_24px_rgba(68,50,33,0.08)] backdrop-blur">
          <div className="mx-auto max-h-[85vh] max-w-[1000px] overflow-y-auto px-6 py-4 md:px-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="m-0 text-[14px] font-light tracking-[0.05em]">
                {pieces} {pieces === 1 ? 'piece' : 'pieces'} &middot; <span className="font-display text-[18px]">{money(total)}</span>
              </p>
              <button type="button" className={BTN} onClick={() => setOpen((v) => !v)} aria-expanded={open}>
                {open ? 'Hide details' : 'Reserve these'}
              </button>
            </div>

            {open ? (
              <form onSubmit={submit} className="mt-5 grid gap-5 pb-2 md:grid-cols-2">
                <ul className={`m-0 list-none p-0 md:col-span-2 ${BODY}`}>
                  {lines.map((l) => (
                    <li key={l.item.name} className="flex justify-between gap-4 border-b border-[#efe8df]">
                      <span>
                        {l.qty} &times; {l.item.name}
                        {l.addOn ? ` + ${l.addOn} ${l.item.addOn.name.toLowerCase()}${l.addOn === 1 ? '' : 's'}` : ''}
                      </span>
                      <span>{money(l.subtotal)}</span>
                    </li>
                  ))}
                </ul>
                <label className="flex flex-col gap-1.5">
                  <span className={SMALL}>Your name</span>
                  <input required autoComplete="name" maxLength={200} className={INPUT} {...field('name')} />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className={SMALL}>Event date</span>
                  <input required type="date" min={minDate} className={INPUT} {...field('date')} />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className={SMALL}>Email</span>
                  <input required type="email" autoComplete="email" maxLength={250} className={INPUT} {...field('email')} />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className={SMALL}>Phone</span>
                  <input required type="tel" autoComplete="tel" maxLength={50} className={INPUT} {...field('phone')} />
                </label>
                <label className="flex flex-col gap-1.5 md:col-span-2">
                  <span className={SMALL}>Venue or delivery address (optional)</span>
                  <input maxLength={500} className={INPUT} {...field('venue')} />
                </label>
                <div className="flex flex-col items-center gap-3 md:col-span-2">
                  <button type="submit" className={BTN} disabled={status.state === 'sending'}>
                    {status.state === 'sending' ? 'Sending…' : `Reserve · ${money(total)}`}
                  </button>
                  <p className="m-0 text-center text-[12px] font-light tracking-[0.04em] text-brown">
                    Nothing is charged now. We&rsquo;ll confirm availability and email your invoice.
                  </p>
                  {status.state === 'error' ? (
                    <p role="alert" className="m-0 text-center text-[13px] text-[#9b2c2c]">
                      {status.message}
                    </p>
                  ) : null}
                </div>
              </form>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
