// Contact page content — transcribed from the client's live page:
// https://www.arabellasweddings.com/contact

export const CONTACT_EMAIL = 'arabella@arabellasweddings.com';

// Exact mailto href from the live page (prefilled subject "I'm interested in ** Package").
export const CONTACT_MAILTO =
  "mailto:arabella@arabellasweddings.com?subject=I'm%20interested%20in%20**%20Package";

// HTML pattern used by the live Wix email input.
export const EMAIL_PATTERN = '^.+@.+\\.[a-zA-Z]{2,63}$';

// The 7 form fields in live order. All are required on live.
// Live label "Phone Number " carries a trailing space — normalized here.
export const CONTACT_FIELDS = [
  { name: 'names', label: 'First & Last Names', kind: 'textarea' },
  {
    name: 'email',
    label: 'Email Address',
    kind: 'email',
    placeholder: 'Email Address',
    maxLength: 250,
    pattern: EMAIL_PATTERN,
  },
  { name: 'phone', label: 'Phone Number', kind: 'textarea' },
  { name: 'venueDate', label: 'Venue & Date', kind: 'textarea' },
  { name: 'guestCount', label: 'Guest Count?', kind: 'text', maxLength: 100 },
  { name: 'budget', label: 'Budget?', kind: 'text', maxLength: 100 },
  {
    name: 'packages',
    label: 'Which packages are you most interested in?',
    kind: 'text',
    maxLength: 100,
  },
];

export const SUBMIT_LABEL = 'Send';

// Wix Forms' default post-submit confirmation text.
export const CONTACT_SUCCESS_MESSAGE = 'Thanks for submitting!';

export const CONTACT_ERROR_MESSAGE =
  'Something went wrong and your message was not sent. Please try again, or email us at arabella@arabellasweddings.com.';

export const CONTACT_IMG = {
  // Live is a Wix image-button (comp-m5u4acg0, 103x78): ONE envelope doodle spot
  // whose artwork swaps default -> hover -> active. Files are the 2x (206x124) sources.
  envelopeDefault: '/media/a3c153_dde7f1753cf149eda2743a75c080176b-9279fdcb.png',
  envelopeHover: '/media/a3c153_2599e763b04144a392932f4986be5c39-541d238c.png',
  envelopeActive: '/media/a3c153_9831f92b41ff493a8944f84d16272c1e-7afdd4ec.png',
  // Portrait of Arabella behind a candle-lit tablescape (553x836 source, ~295x446 display).
  portrait: '/media/Screenshot-2026-01-26-6_54_32-PM-52c31217.png',
};
