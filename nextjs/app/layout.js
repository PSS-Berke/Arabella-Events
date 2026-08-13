import { Playfair_Display, Barlow, Pinyon_Script, Aboreto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400','500','600'], style: ['normal','italic'], variable: '--font-playfair', display: 'swap' });
const barlow = Barlow({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-barlow', display: 'swap' });
const pinyon = Pinyon_Script({ subsets: ['latin'], weight: '400', variable: '--font-pinyon', display: 'swap' });
const aboreto = Aboreto({ subsets: ['latin'], weight: '400', variable: '--font-aboreto', display: 'swap' });

export const metadata = {
  metadataBase: new URL('https://www.arabellasweddings.com'),
  title: "Arabella's Weddings & Events | AWE",
  openGraph: {
    // Trailing space matches live's og:site_name byte-for-byte.
    siteName: "Arabella's Weddings & Events | AWE ",
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }) {
  const fontVars = [playfair.variable, barlow.variable, pinyon.variable, aboreto.variable].join(' ');
  return (
    <html lang="en" className={fontVars}>
      <body className="bg-white text-charcoal font-body antialiased overflow-x-hidden">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
