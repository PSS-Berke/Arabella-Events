import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: "CONTACT | Arabella's Weddings & Events | AWE",
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact', siteName: "Arabella's Weddings & Events | AWE ", type: 'website' },
};

// Live page (https://www.arabellasweddings.com/contact) has no heading of its own:
// header + tagline chrome, then the 949px-wide form region, then the footer.
export default function Contact() {
  return (
    <main className="mx-auto w-full max-w-[981px] px-6 pb-[60px] pt-[25px] md:px-4">
      <ContactForm />
    </main>
  );
}
