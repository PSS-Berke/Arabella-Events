'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV, IMG } from '@/lib/content';

// Header (scrolls away with the page): a small centered AWE mark with the
// full nav in one row beneath it. Live's "ARIZONA – WORLDWIDE" strip was
// removed at Arabella's request.
// On the homepage the header floats over the hero photo with a white logo and
// white links (Oct 2026, after the Satin & Slate example); every other page
// keeps the white bar.
// Nav: Cormorant Garamond caps, widely spaced, deep espresso; hover and the
// current page in antique gold, the current page also underlined with a
// hairline. Mobile gets a hamburger panel.
const NAV_LINK = 'font-display uppercase tracking-[0.22em] transition-colors duration-[400ms] ease-in-out hover:text-tan';
const navState = (active, light) =>
  active ? 'text-tan underline decoration-[0.5px] underline-offset-[7px]' : light ? 'text-white' : 'text-[#2e2620]';
const LOGO_WHITE = '/media/awe-logo-white-bbd258a1.png';

function NavLinks({ items, size, pathname, light, className = '' }) {
  return (
    <ul className={`m-0 flex list-none flex-nowrap items-center gap-x-8 whitespace-nowrap p-0 ${size} ${className}`}>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={`${NAV_LINK} ${navState(pathname === item.href, light)}`}
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
  // Opening the phone menu brings back the white bar so the links stay readable.
  const light = pathname === '/' && !open;
  const bar = light ? 'bg-white' : 'bg-charcoal';
  // Once the big header has scrolled away, a slim white menu bar stays pinned
  // to the top of the window (Arabella, Oct 2026: the logo scrolls away, the
  // menu stays).
  const ref = useRef(null);
  const [pinned, setPinned] = useState(false);
  const [pinnedOpen, setPinnedOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const h = ref.current ? ref.current.offsetHeight : 0;
      setPinned(window.scrollY > h);
      if (window.scrollY <= h) setPinnedOpen(false);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);
  return (
    <>
    <div
      aria-hidden={!pinned}
      className={`fixed inset-x-0 top-0 z-[60] border-b border-[#e6ddd2] bg-white/95 backdrop-blur-sm transition-transform duration-500 ${pinned ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-2 xl:justify-center xl:py-4">
        <Link href="/" aria-label="Arabella's Weddings & Events, home" tabIndex={pinned ? 0 : -1} className="shrink-0 xl:hidden">
          <Image src={IMG.logo} alt="" width={648} height={242} className="h-auto w-[90px]" />
        </Link>
        <NavLinks items={NAV} size="text-[13px]" pathname={pathname} className="hidden xl:flex" />
        <button
          type="button"
          tabIndex={pinned ? 0 : -1}
          aria-label={pinnedOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={pinnedOpen}
          onClick={() => setPinnedOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] border-0 bg-transparent p-0 xl:hidden"
        >
          <span className={`block h-px w-6 bg-charcoal transition-transform ${pinnedOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`block h-px w-6 bg-charcoal ${pinnedOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-6 bg-charcoal transition-transform ${pinnedOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>
      {pinnedOpen && (
        <nav className="flex flex-col gap-[14px] px-6 pb-5 xl:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setPinnedOpen(false)}
              className={`${NAV_LINK} text-[15px] ${navState(pathname === item.href)}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
    <header ref={ref} className={light ? 'absolute inset-x-0 top-0 z-50 bg-transparent' : 'relative z-50 bg-white'}>
      <div className="mx-auto flex max-w-[1240px] flex-col items-center px-6 pb-2 pt-3 xl:pb-4 xl:pt-[30px]">
        <div className="flex w-full items-center justify-between xl:justify-center">
          {/* A small AWE mark that links home (Oct 2026: was a 259px logo in a sticky header) */}
          <Link href="/" aria-label="Arabella's Weddings & Events, home" className="shrink-0">
            <Image
              src={light ? LOGO_WHITE : IMG.logo}
              alt="Arabella's Weddings &amp; Events"
              width={648}
              height={242}
              priority
              className={`h-auto ${light ? 'w-[240px] md:w-[340px] xl:w-[440px]' : 'w-[120px] xl:w-[150px]'}`}
            />
          </Link>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] border-0 bg-transparent p-0 xl:hidden"
          >
            <span className={`block h-px w-6 ${bar} transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`block h-px w-6 ${bar} ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 ${bar} transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </button>
        </div>

        {/* Desktop: every link in one row beneath the logo */}
        <NavLinks items={NAV} size="text-[14px]" pathname={pathname} light={light} className="mt-4 hidden xl:flex" />

        {/* Mobile hamburger panel */}
        {open && (
          <nav className="mt-4 flex w-full flex-col gap-[14px] xl:hidden">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`${NAV_LINK} text-[15px] ${navState(pathname === item.href)}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
    </>
  );
}
