/*
 * Site-wide SEO constants and helpers.
 *
 * The live Wix site served `noindex` on every page, so nothing here has ever
 * been indexed: there are no rankings to protect and no redirects to preserve.
 * That makes launch a clean slate, and it is why titles lead with service and
 * location rather than the nav labels the live site used ("WELCOME",
 * "PACKAGES", "KIND WORDS"), which carry no search demand.
 *
 * Target markets are Scottsdale and Sedona. Scottsdale is the volume market
 * and the realistic map-pack play; Sedona is a destination market won on
 * organic content rather than proximity.
 */

export const SITE_URL = 'https://www.arabellasweddings.com';
export const BRAND = "Arabella's Weddings & Events";
export const BRAND_SHORT = 'AWE';
export const EMAIL = 'arabella@arabellasweddings.com';
export const INSTAGRAM = 'https://www.instagram.com/arabellasweddingsandevents/';

// Primary markets, in priority order.
export const MARKETS = [
  { city: 'Scottsdale', region: 'AZ', slug: '/scottsdale-wedding-planner' },
  { city: 'Sedona', region: 'AZ', slug: '/sedona-wedding-planner' },
];

// Wider service area — used for schema `areaServed`, not for landing pages.
// Keep this honest: these are places she will travel to, not places she ranks.
export const AREA_SERVED = [
  'Scottsdale',
  'Sedona',
  'Phoenix',
  'Paradise Valley',
  'Cave Creek',
  'Flagstaff',
  'Tucson',
];

/*
 * Share images.
 *
 * These are referenced explicitly rather than via Next's `opengraph-image` file
 * convention: pageMeta() sets an `openGraph` object on every route, and an
 * explicit openGraph replaces the inherited file-convention image, which
 * silently left most pages with no share image at all.
 */
export const OG = {
  default: {
    url: '/og/default.jpg',
    alt: `A candlelit reception tablescape of deep red roses, anthuriums and pillar candles, designed by ${BRAND}.`,
  },
  sedona: {
    url: '/og/sedona.jpg',
    alt: 'A bride and groom during their first look at Tlaquepaque in Sedona, Arizona, with the red rocks behind them.',
  },
};

/**
 * Build a page's metadata export.
 * `title` should already lead with service + location; the brand is appended
 * here so it stays consistent and is never the first thing in the tag.
 * `image` defaults to the brand share card; pass one from OG to override.
 */
export function pageMeta({ title, description, path, image = OG.default, brandSuffix = BRAND_SHORT }) {
  const url = path === '/' ? '/' : path;
  const full = brandSuffix ? `${title} | ${brandSuffix}` : title;
  const images = [{ url: image.url, width: 1200, height: 630, alt: image.alt }];
  return {
    title: full,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: full,
      description,
      url,
      siteName: BRAND,
      type: 'website',
      locale: 'en_US',
      images,
    },
    twitter: { card: 'summary_large_image', title: full, description, images },
  };
}
