'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV, IMG } from '@/lib/content';

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="flex flex-col items-center px-6 pt-[34px]">
      <Link href="/">
        <Image src={IMG.logo} alt="Arabella's Weddings &amp; Events" width={648} height={242} priority className="w-[246px] h-auto" />
      </Link>
      <nav className="mt-[26px] flex flex-col items-center gap-[11px] text-[10.5px] font-light tracking-[0.1em] sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 min-[1061px]:gap-[34px] min-[1061px]:text-[12.5px] min-[1061px]:tracking-[0.19em]">
        {NAV.map((item) => {
          const active = pathname === item.href;
          const cls = ['pb-1 border-b', active ? 'text-espresso border-brass' : 'text-taupe border-transparent'].join(' ');
          return (
            <Link key={item.href} href={item.href} className={cls}>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-6 font-display text-[15px] tracking-[0.4em] text-taupe">ARIZONA &ndash; WORLDWIDE</div>
    </header>
  );
}
