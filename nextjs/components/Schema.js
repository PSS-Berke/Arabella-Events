/*
 * JSON-LD structured data.
 *
 * Google's LocalBusiness docs require `name` and an address. Arabella works at
 * her clients' venues rather than from a storefront, so this is modelled as a
 * service-area business: locality/region only, plus `areaServed`. If a public
 * street address and phone number are added later, put them here AND on the
 * Google Business Profile — the two must agree exactly, and drift between them
 * is worse than omitting the fields.
 *
 * NOTE: `telephone` is deliberately absent. Do not invent one; add it once
 * Arabella confirms the number she wants published.
 */
import { SITE_URL, BRAND, EMAIL, INSTAGRAM, AREA_SERVED, MARKETS } from '@/lib/seo';

function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const SERVICES = [
  {
    name: 'Full Wedding Planning & Design',
    description:
      'Signature full-service planning and design, from venue and vendor sourcing through wedding-day execution.',
  },
  {
    name: 'Partial Wedding Planning',
    description:
      'A set number of planning hours, vendor meeting attendance, budget support, and month-of coordination.',
  },
  {
    name: 'Month-of Coordination',
    description:
      'Often called day-of coordination: timeline building, vendor leadership, rehearsal, and wedding-day management.',
  },
  {
    name: 'Custom Stationery, Signage & Rentals',
    description:
      'Bespoke invitations, menus, signage, custom wedding websites, and event rentals designed in-house.',
  },
];

export function OrganizationSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#business`,
    name: BRAND,
    alternateName: 'AWE',
    url: SITE_URL,
    email: EMAIL,
    description:
      'Luxury wedding planning, design, and coordination for Scottsdale and Sedona, Arizona, and destination celebrations worldwide.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Scottsdale',
      addressRegion: 'AZ',
      addressCountry: 'US',
    },
    areaServed: AREA_SERVED.map((name) => ({
      '@type': 'City',
      name: `${name}, AZ`,
    })),
    knowsAbout: [
      'Wedding planning',
      'Wedding design',
      'Day-of coordination',
      'Destination weddings',
      'Wedding stationery',
    ],
    sameAs: [INSTAGRAM],
    priceRange: '$$$$',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Wedding planning services',
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.name,
          description: s.description,
          areaServed: MARKETS.map((m) => `${m.city}, ${m.region}`),
          provider: { '@id': `${SITE_URL}/#business` },
        },
      })),
    },
  };
  return <JsonLd data={data} />;
}

/**
 * Review markup for the testimonials on /love-notes.
 *
 * No `aggregateRating` and no `reviewRating`: the site publishes written
 * testimonials, not star ratings, so any numeric rating here would be invented.
 * Google treats fabricated ratings as a structured-data violation, and the
 * reviews earn their keep as text regardless.
 */
export function ReviewsSchema({ reviews }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Client reviews of ${BRAND}`,
    itemListElement: reviews.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Review',
        reviewBody: r.text,
        author: { '@type': 'Person', name: r.name },
        itemReviewed: { '@id': `${SITE_URL}/#business` },
      },
    })),
  };
  return <JsonLd data={data} />;
}

/**
 * Person markup for Arabella, for /arabella.
 *
 * This is the site's strongest experience signal and none of it was machine
 * readable: 300+ celebrations since 2017, and a hospitality background at MGM
 * Resorts International, InterContinental, Hilton and Legends, including a
 * stint as Wedding Manager for a Las Vegas outdoor venue. Every claim here is
 * drawn from the About copy — nothing is embellished.
 */
export function PersonSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/arabella#person`,
    name: 'Arabella',
    jobTitle: 'Wedding Planner & Designer',
    description:
      'Founder of Arabella’s Weddings & Events. More than 300 celebrations and large-scale events since 2017, planning luxury weddings across Scottsdale, Sedona and beyond.',
    worksFor: { '@id': `${SITE_URL}/#business` },
    knowsAbout: [
      'Wedding planning',
      'Wedding design',
      'Event production',
      'Destination weddings',
      'Wedding stationery and signage',
      'Venue operations',
    ],
    alumniOf: [
      'MGM Resorts International',
      'InterContinental Hotels',
      'Hilton',
      'Legends',
    ].map((name) => ({ '@type': 'Organization', name })),
    url: `${SITE_URL}/arabella`,
    sameAs: [INSTAGRAM],
  };
  return <JsonLd data={data} />;
}

/** Breadcrumb trail for the location landing pages. */
export function BreadcrumbSchema({ trail }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
  return <JsonLd data={data} />;
}

/** FAQ markup — the format AI assistants quote most readily. */
export function FaqSchema({ faqs }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return <JsonLd data={data} />;
}
