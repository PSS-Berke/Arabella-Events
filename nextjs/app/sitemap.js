import { SITE_URL } from '@/lib/seo';

/*
 * `lastModified` is an explicit per-route date, not `new Date()`.
 *
 * Stamping "now" at build time tells Google every page changed on every deploy,
 * including deploys that touched nothing. That is noise, and a crawler that
 * learns the dates are meaningless stops using them. Update a route's date when
 * its content genuinely changes — a CSS tweak or a dependency bump is not a
 * content change.
 *
 * All nine are dated 2026-08-12: the SEO pass rewrote the metadata on every
 * route and substantially rebuilt several, so for once the claim is true.
 *
 * `priority` reflects commercial intent, not vanity — the two location pages are
 * the entry points the search strategy rests on, so they sit level with home.
 */
const ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'monthly', lastModified: '2026-08-12' },
  { path: '/scottsdale-wedding-planner', priority: 1.0, changeFrequency: 'monthly', lastModified: '2026-08-12' },
  { path: '/sedona-wedding-planner', priority: 1.0, changeFrequency: 'monthly', lastModified: '2026-08-12' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly', lastModified: '2026-08-12' },
  { path: '/arabella', priority: 0.8, changeFrequency: 'yearly', lastModified: '2026-08-12' },
  { path: '/gallery', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-08-12' },
  { path: '/love-notes', priority: 0.7, changeFrequency: 'monthly', lastModified: '2026-08-12' },
  { path: '/custom-design-stationery-rentals', priority: 0.6, changeFrequency: 'yearly', lastModified: '2026-08-12' },
  { path: '/contact', priority: 0.8, changeFrequency: 'yearly', lastModified: '2026-08-12' },
];

export default function sitemap() {
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: new Date(`${r.lastModified}T12:00:00Z`),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
