/** @type {import('next').NextConfig} */
const nextConfig = {
  // NEXT_DIST_DIR lets a dev server build into its own directory so a
  // concurrent `next build`/`next start` can't corrupt its output.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'static.wixstatic.com' }],
  },
  async redirects() {
    return [
      {
        // The live Wix URL misspelled "stationery" (which means paper goods) as
        // "stationary" (which means not moving). The corrected slug is canonical;
        // this keeps the old URL alive for anything already pointing at it —
        // Wix links, a directory listing, a saved bookmark.
        source: '/custom-design-stationary-rentals',
        destination: '/gallery#custom-design',
        permanent: true,
      },
      {
        // Custom Design was merged into the gallery page (Oct 2026).
        source: '/custom-design-stationery-rentals',
        destination: '/gallery#custom-design',
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
