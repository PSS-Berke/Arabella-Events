'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV, IMG } from '@/lib/content';

// Desktop header: the centered 259px logo with the full nav in one row
// beneath it. Live split the nav either side of the logo; that stopped
// fitting once Rentals made it eight links. Live's "ARIZONA – WORLDWIDE"
// strip was removed at Arabella's request.
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
        <div className="flex w-full items-center justify-between xl:justify-center">
          {/* Live-site logo is not a hyperlink */}
          <Image src={IMG.logo} alt="Arabella's Weddings &amp; Events" width={648} height={242} priority className="h-auto w-[259px] shrink-0" />
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

        {/* Desktop: every link in one row beneath the logo. Eight links and the
            259px logo don't fit side by side in the 1240px band, and the old
            split layout squeezed the logo to make room. */}
        <NavLinks items={NAV} size="text-[16px]" pathname={pathname} className="mt-3 hidden xl:flex" />

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
      </div>
    </header>
  );
}
