// Rental inventory for /rentals.
//
// To add an item, copy one block and edit it. `price` is the text shown on the
// card, exactly as written (e.g. '$25', '$2 each', '$75 / $125 / $175'); leave
// it null to show "Inquire for pricing". `available` is how many we own (leave
// it out to hide the line). `image` is a path in /public/media, or null for a
// text-only card, with `alt` describing the photo. Photos are cropped to fill
// the card; set `fit: 'contain'` to show a product cut-out whole instead.
// Clicking the photo opens a full-screen carousel; add extra shots with
// `morePhotos: ['/media/…', '/media/…']` and they appear after the card photo.
//
// Online reservations: `unitPrice` is the per-piece price as a plain number,
// used for the running total and checked again by app/api/rentals/route.js.
// Leave it out and the item can't be reserved online (its card links to the
// contact page instead). `addOn` is an optional extra priced per piece, like
// hurricanes for the taper holders; it can't exceed the item's quantity.

export const RENTALS = [
  {
    name: 'Gold Candelabra',
    price: '$50 each',
    unitPrice: 50,
    available: 11,
    details: ['25" tall', 'Five arms, gold finish', 'Glass hurricane vases included to fit over the tapers'],
    image: '/media/gold-candelabra-cutout-1cafa448.png',
    alt: 'Gold five-arm candelabra with tapers in glass hurricanes, draped with red amaranth',
    fit: 'contain',
    morePhotos: ['/media/gold-candelabra-hurricanes-b0a78a95.jpg'],  },
  {
    name: 'Glass Taper Holder',
    price: '$3 each',
    unitPrice: 3,
    addOn: { name: 'Glass hurricane', unitPrice: 5 },
    available: 50,
    details: ['Clear pressed glass, holds a standard taper', 'Add a glass hurricane for $5 each, labor included'],
    // Narrow product cut-out, so it's shown whole rather than cropped.
    image: '/media/glass-taper-holder-cutout-db07ba31.png',
    alt: 'Clear pressed-glass candle holder with a lit ivory taper',
    fit: 'contain',
  },
  {
    name: 'Cylinder Bud Vase',
    price: '$5 each',
    unitPrice: 5,
    available: 12,
    details: ['7.5" tall', 'Clear glass cylinder'],
    image: '/media/cylinder-bud-vase-1b85d6b0.png',
    alt: 'Tall clear glass cylinder bud vase',
    fit: 'contain',
  },
  {
    name: 'Cake Platter',
    price: '$20',
    unitPrice: 20,
    details: ['Cut glass with a pedestal base'],
    image: '/media/cake-platter-reception-b7b1ae7f.png',
    alt: 'White cake on the cut-glass pedestal platter atop a satin-draped round table at an evening reception',
    morePhotos: ['/media/cut-glass-cake-platter-a3a1f373.png'],
  },
  {
    name: 'Lace Overlay',
    price: '$7 each',
    unitPrice: 7,
    details: ['108" round', 'Ivory lace, layered over a base tablecloth'],
    image: '/media/lace-overlay-round-108-5db9d1ce.png',
    alt: 'Ivory lace overlay draped over a round table',
    fit: 'contain',
  },
  {
    name: 'Gold Table Lamp',
    price: '$10 each',
    unitPrice: 10,
    details: ['Gold finish', 'Warm glow from beneath the shade'],
    image: '/media/gold-table-lamp-65192110.png',
    alt: 'Pair of slim gold table lamps with flat round shades',
    fit: 'contain',
  },
  {
    name: 'Terracotta Saucer / Plate',
    price: '$5 each',
    unitPrice: 5,
    available: 15,
    details: ['9" round', 'Matte terracotta'],
    image: '/media/terracotta-plate-9in-37f83bb4.png',
    alt: 'Stack of matte terracotta saucers with one standing on edge',
    fit: 'contain',
  },
  {
    name: 'Gold Card Holder',
    price: '$1 each',
    unitPrice: 1,
    details: ['Gold wire, spiral base', 'For table numbers, place cards or menus'],
    image: '/media/gold-card-holder-366743bf.png',
    alt: 'Gold wire card holder with a looped top and spiral base',
    fit: 'contain',
  },
  {
    name: 'LED Candle',
    price: '$2 each',
    unitPrice: 2,
    available: 50,
    details: ['Flameless votive with a warm flicker', 'Safe for venues that don’t allow open flame'],
    image: '/media/led-tealight-candles-eaf632ba.png',
    alt: 'Four flameless LED votive candles with warm glowing flames',
    fit: 'contain',
  },
  {
    name: 'Amber Votive Holder',
    price: '$3 each',
    unitPrice: 3,
    available: 30,
    details: ['Ribbed amber glass', 'Holds a tealight'],
    image: '/media/amber-ribbed-votive-63b1c1de.png',
    alt: 'Ribbed amber glass votive holders glowing with lit tealights',
    fit: 'contain',
  },
  {
    name: 'Gold Easel',
    price: '$25',
    unitPrice: 25,
    details: ['58" tall', 'Gold metal finish', 'Adjustable holders for signs and frames of different sizes'],
    // Product cut-out on white, so it's shown whole rather than cropped.
    image: '/media/gold-easel-58-ced00a88.png',
    alt: 'Tall gold metal tripod easel with adjustable holders',
    fit: 'contain',
  },
];
