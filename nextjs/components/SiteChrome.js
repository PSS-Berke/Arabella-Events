'use client';
import { usePathname } from 'next/navigation';

// The site's header, footer and analytics; left off the private /admin pages,
// which have their own bar.
export default function SiteChrome({ children }) {
  const pathname = usePathname() || '';
  if (pathname === '/admin' || pathname.startsWith('/admin/')) return null;
  return children;
}
