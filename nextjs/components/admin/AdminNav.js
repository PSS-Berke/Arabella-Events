'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/admin', label: 'Inquiries', match: (p) => p === '/admin' },
  { href: '/admin/blog', label: 'Blog', match: (p) => p.startsWith('/admin/blog') },
];

const LINK = 'text-[11px] uppercase tracking-[0.18em] text-[#80695a] no-underline transition-colors hover:text-[#443221]';

export default function AdminNav() {
  const pathname = usePathname() || '';

  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' }).catch(() => {});
    window.location.href = '/admin';
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[#e6ddd2] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center gap-x-8 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/admin" className="flex items-center gap-3 no-underline" aria-label="Admin home">
          <Image src="/media/Arabella-s-2--6f7587cd.png" alt="" width={648} height={242} className="h-auto w-[64px]" />
          <span className="font-display text-[15px] italic tracking-[0.12em] text-[#9a8158]">Admin</span>
        </Link>
        <nav className="flex gap-6" aria-label="Admin sections">
          {TABS.map((t) => {
            const active = t.match(pathname);
            return (
              <Link
                key={t.href}
                href={t.href}
                aria-current={active ? 'page' : undefined}
                className={`border-b py-1 text-[12px] uppercase tracking-[0.2em] no-underline transition-colors ${
                  active ? 'border-[#443221] text-[#443221]' : 'border-transparent text-[#80695a] hover:text-[#443221]'
                }`}
              >
                {t.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-5">
          <a href="/" target="_blank" rel="noreferrer" className={LINK}>
            View site ↗
          </a>
          <button type="button" onClick={logout} className={`${LINK} cursor-pointer border-0 bg-transparent p-0`}>
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
