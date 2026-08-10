# Arabella's Weddings & Events

Next.js 14 (App Router) + Tailwind CSS. Replica of arabellasweddings.com, with the copy that was baked into images on the Wix site rebuilt as real, selectable text.

## Run locally

    npm install
    npm run dev

## Deploy to Vercel

Push to GitHub, then import the repo at vercel.com. No environment variables needed.

## Pages

- `app/page.js` — Welcome (home)
- `app/services/page.js` — Packages

Nav links to /custom-design-stationary-rentals, /arabella, /love-notes, /gallery and /contact exist but those routes are not built yet — add them as `app/<route>/page.js`.

## Fonts

Cormorant Garamond (display caps), Jost (body), Pinyon Script (calligraphic accents), loaded via `next/font/google`.

## Images — do this before launch

Images currently load from Wix's CDN (static.wixstatic.com), permitted in `next.config.mjs` via remotePatterns. Download the originals, put them in `public/images/`, and change the URLs in `lib/content.js` to local paths so the site no longer depends on the old host.

## Content

All copy lives in `lib/content.js` — nav items, image URLs, the about paragraphs and the reviews. Testimonials are verbatim from the Kind Words page.
