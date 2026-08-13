// Content data for /custom-design-stationary-rentals — an image-only page on live.
// All positions were extracted from the live Wix mesh grid
// ([data-mesh-id=comp-mfn1v1xsinlineContent-gridContainer], grid-template-rows: repeat(13, min-content) 1fr):
// `left` is the offset in px from the left edge of the centered 980px reference column
// (negative = bleeds off the left edge, > 980 = bleeds off the right edge);
// `top` is the resolved vertical offset in px from the top of the collage container,
// derived from the live grid rows + per-component top/bottom margins;
// `z` is the live DOM stacking order (higher = painted on top);
// `w`/`h` are the live rendered dimensions in px at desktop.

// Reference column and total collage height (desktop), derived from the live mesh grid.
export const COLLAGE = { refWidth: 980, height: 1634 };

// Items are listed in visual top-to-bottom order (used for the mobile stack);
// desktop overlap fidelity comes from the explicit `z` values, which reproduce
// the live page's DOM stacking order.
export const COLLAGE_IMAGES = [
  {
    id: 'title-graphic',
    src: '/media/49b5c3_919b429d3bf944db83780c378383f37c-f32af990.png',
    alt: 'image.png', // "CUSTOM design" title graphic — live alt is the generic filename
    w: 572, h: 199, left: 190, top: 0, z: 12,
  },
  {
    id: 'alyssa-ryan-55',
    src: '/media/S-PHighlights_AlyssaRyanPhotography-55-9c219eac.jpg',
    alt: 'S+PHighlights_AlyssaRyanPhotography-55.jpg',
    w: 298, h: 211, left: 847, top: 169, z: 4,
  },
  {
    id: 'tlaquepaque-1',
    src: '/media/tlaquepaque-sedona-arizona-vintage-bride-groom-portr-8ee600bd.jpg',
    alt: 'tlaquepaque-sedona-arizona-vintage-bride-groom-portraits-editorial-35mm-film-dana-maruna-p',
    w: 390, h: 585, left: 157, top: 199, z: 3,
  },
  {
    id: 'stationery-6-54-28',
    src: '/media/Screenshot-2026-01-26-6_54_28-PM-919e12d4.png',
    alt: 'Screenshot 2026-01-26 6.54.28 PM.png',
    w: 300, h: 438, left: 547, top: 199, z: 9,
  },
  {
    id: 'stationery-6-54-56',
    src: '/media/Screenshot-2026-01-26-6_54_56-PM-ea978948.png',
    alt: 'Screenshot 2026-01-26 6.54.56 PM.png',
    w: 323, h: 431, left: -148, top: 211, z: 6,
  },
  {
    id: 'stationery-6-38-58',
    src: '/media/Screenshot-2026-01-26-6_38_58-PM-e896e0fc.png',
    alt: 'Screenshot 2026-01-26 6.38.58 PM.png',
    w: 298, h: 389, left: 1080, top: 297, z: 7,
  },
  {
    id: 'alyssa-ryan-117',
    src: '/media/S-PHighlights_AlyssaRyanPhotography-117-2eb4ea5e.jpg',
    alt: 'S+PHighlights_AlyssaRyanPhotography-117.jpg',
    w: 273, h: 409, left: -388, top: 315, z: 10,
  },
  {
    id: 'stationery-6-54-53',
    src: '/media/Screenshot-2026-01-26-6_54_53-PM-a90a0de0.png',
    alt: 'Screenshot 2026-01-26 6.54.53 PM.png',
    w: 298, h: 329, left: 817, top: 363, z: 15,
  },
  {
    id: 'tlaquepaque-2',
    src: '/media/tlaquepaque-sedona-arizona-vintage-bride-groom-portr-3af63295.jpg',
    alt: 'tlaquepaque-sedona-arizona-vintage-bride-groom-portraits-editorial-35mm-film-dana-maruna-p',
    w: 371, h: 558, left: 518, top: 523, z: 2,
  },
  {
    id: 'tlaquepaque-3',
    src: '/media/tlaquepaque-sedona-arizona-vintage-bride-groom-portr-5c3db175.jpg',
    alt: 'tlaquepaque-sedona-arizona-vintage-bride-groom-portraits-editorial-35mm-film-dana-maruna-p',
    w: 312, h: 468, left: 206, top: 622, z: 1,
  },
  {
    id: 'candlelit-reception',
    src: '/media/49b5c3_bb3ecfabd7d14872b4e13b5ccf9b7ee2-7553253e.png',
    alt: 'image.png', // candlelit reception-dinner photo — live alt is the generic filename
    w: 323, h: 346, left: -117, top: 637, z: 13,
  },
  {
    id: 'alyssa-ryan-125',
    src: '/media/S-PHighlights_AlyssaRyanPhotography-125-a02fcfde.jpg',
    alt: 'S+PHighlights_AlyssaRyanPhotography-125.jpg',
    w: 300, h: 409, left: 1059, top: 681, z: 8,
  },
  {
    id: 'alyssa-ryan-61',
    src: '/media/S-PHighlights_AlyssaRyanPhotography-61-7aab2cec.jpg',
    alt: 'S+PHighlights_AlyssaRyanPhotography-61.jpg',
    w: 344, h: 291, left: 810, top: 692, z: 5,
  },
  {
    id: 'inquire-now-graphic',
    src: '/media/49b5c3_650ab89e40af437282a3935fe685ebc8-0ee9261b.png',
    alt: 'image.png', // "inquire now" offerings-list graphic — static image on live, NOT a link
    w: 564, h: 297, left: 21, top: 1120, z: 14,
  },
  {
    id: 'tlaquepaque-4',
    src: '/media/tlaquepaque-sedona-arizona-vintage-bride-groom-portr-b59773f5.jpg',
    alt: 'tlaquepaque-sedona-arizona-vintage-bride-groom-portraits-editorial-35mm-film-dana-maruna-p',
    w: 330, h: 495, left: 636, top: 1081, z: 11,
  },
];

// Reference only — this copy is baked into the "inquire now" graphic on live and is
// NOT rendered as HTML text anywhere (the PNG is embedded verbatim for 1:1 fidelity).
export const INQUIRE_NOW_OFFERINGS = [
  'MENUS',
  'PLACE CARDS',
  'SEATING ASSIGNMENT CHART',
  'TABLE NUMBERS',
  'CUSTOM MIRRORS (3 SIZE OPTIONS)',
  'TABLESCAPE DESIGN ONLY',
];
