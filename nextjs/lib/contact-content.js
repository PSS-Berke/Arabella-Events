// Contact page content — transcribed from the client's live page:
// https://www.arabellasweddings.com/contact

export const CONTACT_EMAIL = 'arabella@arabellasweddings.com';

// Exact mailto href from the live page (prefilled subject "I'm interested in ** Package").
export const CONTACT_MAILTO =
  "mailto:arabella@arabellasweddings.com?subject=I'm%20interested%20in%20**%20Package";

// HTML pattern used by the live Wix email input.
export const EMAIL_PATTERN = '^.+@.+\\.[a-zA-Z]{2,63}$';

// Inquiry form fields, in order. `name` and `label` must stay in step with
// FIELDS in app/api/contact/route.js (the email uses the labels). `wide`
// spans both columns on desktop; `optional` fields may be left blank.
export const PACKAGE_OPTIONS = [
  'Full Planning + Design',
  'Partial Planning',
  'Micro Wedding at Tlaquepaque',
  'Custom Design & Stationery',
  'Rentals',
  'Not sure yet',
];

export const CONTACT_FIELDS = [
  { name: 'names', label: 'Your names', kind: 'text', maxLength: 300, placeholder: 'You & your partner', autoComplete: 'name', wide: true },
  { name: 'email', label: 'Email', kind: 'email', maxLength: 250, pattern: EMAIL_PATTERN, autoComplete: 'email' },
  { name: 'phone', label: 'Phone', kind: 'tel', maxLength: 50, autoComplete: 'tel' },
  { name: 'venueDate', label: 'Venue & date', kind: 'text', maxLength: 300, placeholder: 'Or “still deciding”' },
  { name: 'guestCount', label: 'Guest count', kind: 'text', maxLength: 100, placeholder: 'An estimate is fine' },
  { name: 'budget', label: 'Overall wedding budget', kind: 'text', maxLength: 100 },
  { name: 'packages', label: 'What are you interested in?', kind: 'select', options: PACKAGE_OPTIONS },
  // Not on the live Wix form. Added so enquiries can be attributed to a source —
  // the only way to tell whether search work is actually producing bookings.
  { name: 'referral', label: 'How did you hear about us?', kind: 'text', maxLength: 150, optional: true, wide: true },
  { name: 'vision', label: 'Tell us about your vision', kind: 'textarea', maxLength: 5000, rows: 5, optional: true, wide: true, placeholder: 'Colors, feelings, inspiration, the details that matter most to you…' },
];

export const SUBMIT_LABEL = 'Send inquiry';

export const CONTACT_SUCCESS_MESSAGE =
  'Your inquiry is on its way. I can’t wait to hear more about your celebration and will be in touch soon.';

export const CONTACT_ERROR_MESSAGE =
  'Something went wrong and your message was not sent. Please try again, or email us at arabella@arabellasweddings.com.';

export const CONTACT_IMG = {
  // Live is a Wix image-button (comp-m5u4acg0, 103x78): ONE envelope doodle spot
  // whose artwork swaps default -> hover -> active. Files are the 2x (206x124) sources.
  envelopeDefault: '/media/a3c153_dde7f1753cf149eda2743a75c080176b-9279fdcb.png',
  envelopeHover: '/media/a3c153_2599e763b04144a392932f4986be5c39-541d238c.png',
  envelopeActive: '/media/a3c153_9831f92b41ff493a8944f84d16272c1e-7afdd4ec.png',
  // Beside the form (Oct 2026: replaced a screenshot of Arabella at a tablescape).
  portrait: '/media/tlaquepaque-veil-portrait-569b88f9.jpg',
};
