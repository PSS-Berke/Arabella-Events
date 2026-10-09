// Featured vendors and key venues for /vendors.
//
// To add one, copy a line and edit it. `role` is optional (leave it out to
// show just the name); `url` is optional too — add the vendor's website or
// Instagram and their name becomes a link. `logo` (optional) shows beneath
// the name. homeOnly: true keeps a photographer on the homepage list but
// off the Our Partners page. Venues take the same optional `url` and `logo`, and `photo` can
// be null until there's one to show.

export const VENDORS = [
  { name: 'Dana Maruna Photo', role: 'Photography', url: 'https://danamarunaphoto.com/', logo: { src: '/media/dana-logo-clear-3c4cf140.png', w: 455, h: 35 } },
  { name: 'Maya Papaya Pictures', role: 'Photography', url: 'https://mayapapayapictures.com/', logo: { src: '/media/maya-papaya-logo-clear-62bbce07.png', w: 429, h: 99 } },
  { name: 'Bella Wang Photo', role: 'Photography', url: 'https://bellawangphoto.com/', homeOnly: true, logo: { src: '/media/bella-logo-clear-fe6f4210.png', w: 417, h: 38 } },
  { name: 'Chataccad Photography', role: 'Photography', url: 'https://chataccadphotography.com/', homeOnly: true, logo: { src: '/media/chataccad-logo-clear-977f4cf1.png', w: 225, h: 354 } },
  { name: 'Andrea Neff Photography', role: 'Photography', url: 'https://www.andrea-neff.com/', homeOnly: true, logo: { src: '/media/andrea-neff-logo-clear-13ce7f52.png', w: 214, h: 73 } },
  { name: 'Kylie Films', role: 'Videography', url: 'https://kyliefilms.com/', logo: { src: '/media/kylie-logo-clear-7307d745.png', w: 266, h: 53 } },
  { name: 'Lily Luxe Floral', role: 'Florals', url: 'https://lilyluxefloral.com/', logo: { src: '/media/lily-luxe-logo-clear-50198ef4.png', w: 182, h: 31 } },
  { name: 'Four Sisters Floral', role: 'Florals', note: 'Flagstaff', url: 'https://www.foursistersflagstaff.com/', logo: { src: '/media/four-sisters-logo-clear-6f0c73f1.png', w: 311, h: 133 } },
  { name: 'Film and Frame Booth', role: 'Vintage photo booth', url: 'https://www.instagram.com/filmandframebooth/', logo: { src: '/media/film-frame-logo-4799af7e.png', w: 105, h: 167 } },
  { name: 'Sedona Catering Co.', role: 'Catering', note: 'with Tori Talkington', url: 'https://www.sedonacateringco.com/', logo: { src: '/media/sedona-catering-logo-clear-7e155f36.png', w: 369, h: 55 } },
  { name: 'Premium Party Rentals', role: 'Rentals', url: 'https://www.instagram.com/premiumpartyrentalsaz/', logo: { src: '/media/premium-party-logo-clear-fa35729d.png', w: 151, h: 93 } },
  { name: 'Verve Rentals', role: 'Rentals', note: 'Northern Arizona', url: 'https://www.verveeventsandtents.com/', logo: { src: '/media/verve-logo-clear-07ab8fe3.png', w: 150, h: 109 } },
  { name: 'The Confetti Studio', role: 'Décor & Rentals', url: 'https://theconfettistudio.com/', logo: { src: '/media/confetti-studio-logo-fb3d66e5.png', w: 397, h: 397 } },
  { name: 'Snake Oil Station', role: 'Mobile Bar', note: 'with Aidan', url: 'https://www.snakeoilstation.com/', logo: { src: '/media/snake-oil-logo-6809be68.png', w: 178, h: 178 } },
  { name: 'Officiant of the Desert', role: 'Officiant', url: 'https://www.instagram.com/officiantofthedesert' },
  { name: 'Giovanny, Direct Sounds', role: 'DJ & Entertainment', url: 'https://www.directsoundsdj.com/giovanny', logo: { src: '/media/direct-sounds-logo-d25a03b1.png', w: 158, h: 47 } },
  { name: 'DTB Productions', role: 'DJ & Entertainment', url: 'https://dtbpro.com/', logo: { src: '/media/dtb-logo-e158683f.png', w: 89, h: 90 } },
  { name: 'DJ Flaeva Frae', role: 'DJ & Entertainment', url: 'https://dtbpro.com/', logo: { src: '/media/flaeva-logo-clear-4f69c5b1.png', w: 297, h: 62 } },
];

export const VENUES = [
  {
    name: 'Tlaquepaque Arts & Shopping Village',
    url: 'https://tlaq.com/weddings/',
    logo: { src: '/media/tlaquepaque-logo-clear-66d9b2f7.png', w: 286, h: 64 },
    where: 'Sedona, Arizona',
    note: 'Sycamore-shaded courtyards, stucco arches, and tiled fountains: the setting for several of our favorite celebrations.',
    photo: {
      src: '/media/hh-tables-balconies-string-lights-f4068ce2.jpg',
      alt: 'Reception tables under string lights between the courtyard balconies at Tlaquepaque',
      width: 1067,
      height: 1600,
    },
  },
  {
    name: "Don Hoel's Cabins",
    where: 'Oak Creek Canyon, Sedona',
    note: 'Rustic cabins tucked into the pines of Oak Creek Canyon, made for intimate, candlelit gatherings in the forest.',
    photo: {
      src: '/media/hm-gown-cabin-porch-21ef8821.jpg',
      alt: "A caped lace wedding gown hanging from the porch of a cabin at Don Hoel's",
      width: 1500,
      height: 1000,
    },
  },
  {
    name: 'Creekside Inn',
    where: 'Sedona, Arizona',
    note: 'An intimate inn set along the banks of Oak Creek.',
    url: 'https://creeksideinn.net/',
    photo: {
      src: '/media/pd-vows-forest-259b7480.jpg',
      alt: 'Patricia smiling at Drew as they hold hands for their vows in the sunlit trees at Creekside Inn',
      width: 1333,
      height: 2000,
    },
  },
];
