'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV, NAV_PRIMARY, NAV_SECONDARY, IMG } from '@/lib/content';

// Live desktop header (QA-verified against the Wix mesh): ONE band — the
// 3-item nav left of the centered 259px logo, the 4-item nav right of it,
// both vertically centered against the logo; "ARIZONA – WORLDWIDE" strip
// centered beneath (desktop only — dropped on mobile for tighter spacing).
// Nav in Aboreto 17px/16px, #414141, hover+active #DEA27A (0.4s transition,
// no underline). Mobile gets a hamburger panel.
function NavLinks({ items, size, pathname, className = '' }) {
  return (
    <ul className={`m-0 flex list-none flex-nowrap items-center gap-x-6 whitespace-nowrap p-0 font-nav ${size} tracking-[0.02em] ${className}`}>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={`transition-colors duration-[400ms] ease-in-out hover:text-tan ${pathname === item.href ? 'text-tan' : 'text-charcoal'}`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center px-6 pb-2 pt-3 xl:pb-4 xl:pt-[30px]">
        <div className="flex w-full items-center justify-between xl:grid xl:grid-cols-[1fr_auto_1fr] xl:gap-x-8">
          <NavLinks items={NAV_PRIMARY} size="text-[17px]" pathname={pathname} className="hidden justify-self-end xl:flex" />
          {/* Live-site logo is not a hyperlink */}
          <Image src={IMG.logo} alt="Arabella's Weddings &amp; Events" width={648} height={242} priority className="h-auto w-[259px]" />
          <NavLinks items={NAV_SECONDARY} size="text-[16px]" pathname={pathname} className="hidden justify-self-start xl:flex" />
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] border-0 bg-transparent p-0 xl:hidden"
          >
            <span className={`block h-px w-6 bg-charcoal transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block h-px w-6 bg-charcoal ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-charcoal transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>

        {/* Mobile hamburger panel (live Wix serves a separate mobile layout) */}
        {open && (
          <nav className="mt-4 flex w-full flex-col gap-[14px] xl:hidden">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`font-nav text-[15px] transition-colors duration-[400ms] hover:text-tan ${pathname === item.href ? 'text-tan' : 'text-charcoal'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* "ARIZONA – WORLDWIDE" — live text (was a baked image strip), centered
            beneath the band. Desktop only, as on live. Naming the service area in
            real text on every page is worth more than the image ever was. */}
        <p className="awe-caps awe-strip mt-3 hidden w-[209px] text-center xl:block">
          ARIZONA &ndash; WORLDWIDE
        </p>
      </div>
    </header>
  );
}
