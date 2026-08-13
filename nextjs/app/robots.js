import { SITE_URL } from '@/lib/seo';

/*
 * The live Wix site's robots.txt declared no sitemap at all, and every page
 * carried a `noindex` meta tag, so nothing was ever indexed. Both are fixed
 * here: full crawl access plus a declared sitemap.
 */
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
