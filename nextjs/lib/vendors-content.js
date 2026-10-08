// Featured vendors and key venues for /vendors.
//
// To add one, copy a line and edit it. `role` is optional (leave it out to
// show just the name); `url` is optional too — add the vendor's website or
// Instagram and their name becomes a link. Venues take the same optional
// `url`, and `photo` can be null until there's one to show.

export const VENDORS = [
  { name: 'Dana Maruna Photo', role: 'Photography', url: 'https://danamarunaphoto.com/' },
  { name: 'Maya Papaya Pictures', role: 'Photography', url: 'https://mayapapayapictures.com/' },
  { name: 'Bella Wang Photo', role: 'Photography', url: 'https://bellawangphoto.com/' },
  { name: 'Film and Frame Booth', role: 'Vintage photo booth', url: 'https://www.instagram.com/filmandframebooth/' },
  { name: 'Sedona Catering Co.', role: 'Catering', note: 'with Tori Talkington', url: 'https://www.sedonacateringco.com/' },
  { name: 'Premium Party Rentals', role: 'Rentals', url: 'https://www.instagram.com/premiumpartyrentalsaz/' },
  { name: 'Verve Rentals', role: 'Rentals', note: 'Northern Arizona', url: 'https://www.verveeventsandtents.com/' },
  { name: 'DTB Pro – Flavafrae', role: 'DJ & Entertainment', url: 'https://dtbpro.com/' },
];

export const VENUES = [
  {
    name: 'Tlaquepaque Arts & Shopping Village',
    where: 'Sedona, Arizona',
    note: 'Sycamore-shaded courtyards, stucco arches, and tiled fountains: the setting for several of our favorite celebrations.',
    photo: {
      src: '/media/tlaquepaque-terracotta-tables-papel-picado-3a7c14f6.jpg',
      alt: 'Wooden farm tables with terracotta vessels and candles beneath papel picado at Tlaquepaque',
      width: 1290,
      height: 1822,
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
    photo: null,
  },
];
