import { Cormorant_Garamond, Barlow, Monsieur_La_Doulaise } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { OrganizationSchema } from '@/components/Schema';
import Analytics from '@/components/Analytics';
import { SITE_URL, BRAND } from '@/lib/seo';

// Headings: Cormorant Garamond (softer, more classic than the Playfair Display
// live used). 300 is deliberately not loaded — it's too thin at these sizes,
// so font-light headings render at 400. Accent words: Monsieur La Doulaise, a vintage calligraphy
// (replaced Pinyon Script at Arabella's request, Oct 2026).
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400','500','600'], style: ['normal','italic'], variable: '--font-display', display: 'swap' });
const barlow = Barlow({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-body', display: 'swap' });
const monsieur = Monsieur_La_Doulaise({ subsets: ['latin'], weight: '400', variable: '--font-script', display: 'swap' });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  // Pages set their own full title via pageMeta(); this is the fallback.
  title: {
    default: 'AWE | Full Design & Planning',
    template: '%s',
  },
  openGraph: { siteName: BRAND, type: 'website', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  // Search Console / Bing ownership proof. Both are omitted entirely unless the
  // corresponding env var is set, so no empty verification tags ship.
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION && { google: process.env.GOOGLE_SITE_VERIFICATION }),
    ...(process.env.BING_SITE_VERIFICATION && { other: { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } }),
  },
};

export default function RootLayout({ children }) {
  const fontVars = [cormorant.variable, barlow.variable, monsieur.variable].join(' ');
  return (
    <html lang="en" className={fontVars}>
      <body className="bg-white text-charcoal font-body antialiased overflow-x-hidden">
        <OrganizationSchema />
        <Analytics />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
