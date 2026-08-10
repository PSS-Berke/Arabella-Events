import { Cormorant_Garamond, Jost, Pinyon_Script } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300','400','500'], style: ['normal','italic'], variable: '--font-cormorant', display: 'swap' });
const jost = Jost({ subsets: ['latin'], weight: ['200','300','400','500'], variable: '--font-jost', display: 'swap' });
const pinyon = Pinyon_Script({ subsets: ['latin'], weight: '400', variable: '--font-pinyon', display: 'swap' });

export const metadata = {
  title: "Arabella's Weddings & Events | AWE",
  description: "Arabella's Weddings & Events offers luxury wedding planning, design, and coordination throughout Arizona, Chicago, and beyond.",
};

export default function RootLayout({ children }) {
  const fontVars = [cormorant.variable, jost.variable, pinyon.variable].join(' ');
  return (
    <html lang="en" className={fontVars}>
      <body className="bg-cream text-espresso font-body antialiased overflow-x-hidden">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
