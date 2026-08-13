import ContactForm from '@/components/ContactForm';

import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Contact | Scottsdale & Sedona Wedding Planner',
  description:
    'Enquire about luxury wedding planning, design, and coordination in Scottsdale, Sedona, and throughout Arizona. Tell us about your celebration.',
  path: '/contact',
});

// Live page (https://www.arabellasweddings.com/contact) has no heading of its own:
// header + tagline chrome, then the 949px-wide form region, then the footer.
export default function Contact() {
  return (
    <main className="mx-auto w-full max-w-[981px] px-6 pb-[60px] pt-[25px] md:px-4">
      {/* Present for crawlers and screen readers; the live page shows no heading here. */}
      <h1 className="sr-only">Contact Arabella&rsquo;s Weddings &amp; Events</h1>
      <ContactForm />
    </main>
  );
}
