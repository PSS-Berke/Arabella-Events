import Script from 'next/script';

/*
 * Google Analytics 4 — inert until configured.
 *
 * Renders nothing at all unless NEXT_PUBLIC_GA_ID is set, so no third-party
 * script loads and no cookie is written until someone deliberately switches it
 * on. That keeps the decision (and its privacy implications) with the client
 * rather than smuggling a tracker in with an SEO change.
 *
 * GA4 is scaffolded here because it links to Search Console, which is where the
 * search data lives. If a cookieless alternative is preferred — Plausible,
 * Fathom — swap this component; nothing else depends on it.
 *
 * Note: a cookie-consent banner is a separate decision. GA4 sets cookies, and
 * whether that needs a banner depends on where the couples are, not where the
 * business is. Worth a view before this is enabled.
 */
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
