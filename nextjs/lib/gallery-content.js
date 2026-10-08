// Gallery page (/gallery) content — geometry recovered 1:1 from the live Wix page.
//
// The live gallery is NOT a uniform-column masonry: it is a freeform Wix mesh
// collage of 27 photos plus TWO autoplaying muted video players, laid out on a
// canvas centered on the 980px Wix column with items extending up to ~415px
// beyond it on either side (design width ~1815px). Every box below was computed
// from the live page's shipped mesh CSS (grid rows + margins + left offsets) and
// cross-checked against the site's tight 4-16px gutters at each row boundary.
//
// `d` = desktop box: { x, y, w, h } in px. `x` is measured from the LEFT EDGE of
// the centered 980px column (negative = extends left of it, same as live, where
// edges clip at narrower desktop viewports). `y` is measured from the top of the
// page content (below the site header); the first 40px is the empty spacer
// section live renders above the hero video.
//
// Array order = live DOM/paint order (later items paint on top where boxes
// overlap, e.g. photo 13 over the corner of the mid-collage video).
// All media is mirrored locally in /public/media (see manifest.json).

export const GALLERY_COLUMN = 980; // centered reference column width (Wix site width)
export const GALLERY_CANVAS_HEIGHT = 4030; // total collage height, px

// NOT from the live gallery — photos added Oct 2026. Ordered so no one shoot
// clusters, then woven one-for-one into the live items (see GALLERY_ITEMS at
// the bottom). The masonry fills each column top to bottom, so alternating in
// the array spreads them down every column. `d` only carries the aspect ratio.
const ADDED_ITEMS = [
  ['kn-red-rock-dip-kiss-fe51d92f.jpg', 1333, 2000, 'A groom dipping his bride into a kiss on the red rocks of Sedona'],
  ['kn-laughing-red-rocks-2a9294d5.jpg', 1333, 2000, 'A couple laughing together above the Sedona red rocks'],
  ['kn-red-rock-portrait-a1bd985a.jpg', 1333, 2000, 'A bride resting her head on her groom’s shoulder before a red rock butte'],
  ['tlaquepaque-chapel-first-kiss-b76f0e25.jpg', 1333, 2000, "Bride and groom's first kiss at the candlelit altar of the Tlaquepaque chapel in Sedona"],
  ['cabin-tablescape-forest-table-a0e8e91e.jpg', 1334, 2000, 'Candlelit farm table set in front of a forest cabin, chiffon runner knotted around its turned legs'],
  ['kiva-fireplace-couple-standing-b4c4059f.jpg', 1333, 2000, 'Couple in a leather jacket and gold beaded gown beneath string lights before a candlelit kiva fireplace'],
  ['red-anthurium-lion-fountain-593cfa54.jpg', 1333, 2000, 'Red anthurium, rose and hanging amaranth arrangement in a stone lion fountain'],
  ['tlaquepaque-veil-portrait-569b88f9.jpg', 1333, 2000, 'Bride and groom forehead to forehead beneath a stone arch as her cathedral veil sweeps across the frame'],
  ['cabin-tablescape-place-settings-13796f7a.jpg', 1334, 2000, 'Scalloped gold-rimmed plates, custom menus, champagne napkins and gold flatware in late-afternoon sun'],
  ['sweetheart-table-couple-433bc681.jpg', 1333, 2000, 'Bride in a lace mantilla and groom in an ivory suit at a red sweetheart table'],
  ['checkered-dance-floor-red-rocks-c3a80f8a.jpg', 1333, 2000, 'Checkered dance floor under string lights with the Sedona red rocks behind it at night'],
  ['cabin-tablescape-candles-closeup-262bd28b.jpg', 1334, 2000, 'Mauve pillar and ivory taper candles with white roses in bud vases on a chiffon table runner'],
  ['kiva-fireplace-couple-rugs-316749b1.jpg', 1333, 2000, 'Newlyweds lounging on layered vintage rugs in front of a kiva fireplace'],
  ['vintage-piped-wedding-cake-564d76e7.jpg', 1333, 2000, 'Three-tier vintage piped buttercream wedding cake with red monogram and engraved cake server'],
  ['cabin-shoot-lighting-tablescape-2ab0112a.jpg', 2000, 1334, 'Lighting the pillar candles on a long forest tablescape beneath autumn trees'],
  ['red-anthurium-floral-table-d523165a.jpg', 1333, 2000, 'Tall red anthurium, orchid and amaranth arrangement beside a crushed-velvet sweetheart table'],
  ['tlaquepaque-chapel-kiss-4e7e37b0.jpg', 1333, 2000, 'Bride in a long lace-trimmed veil kissing the groom before the painted altar of the Tlaquepaque chapel'],
  ['cabin-tablescape-autumn-trees-8558bb08.jpg', 1334, 2000, 'Ivory and mauve candlelit table under towering autumn trees'],
  ['sweetheart-table-toast-f7f72605.jpg', 2000, 1333, 'Bride kissing the groom on the cheek as a toast is read at their candlelit sweetheart table'],
  ['cabin-shoot-lighting-candle-ad98da3d.jpg', 1334, 2000, 'Lighting a ribbed pillar candle among white roses and gold-rimmed coupes'],
  ['string-lights-dusk-cce7149a.jpg', 1333, 2000, 'String lights over a checkered dance floor and candle-lined paths at dusk'],
  ['cabin-shoot-placing-menus-8202a2db.jpg', 1334, 2000, 'Tucking custom menus onto gold-rimmed place settings'],
  ['cabin-shoot-smiling-f3d0f913.jpg', 1334, 2000, 'Laughing behind a candlelit tablescape in an autumn garden'],
  ['cabin-shoot-laughing-14ed8beb.jpg', 1334, 2000, 'A candid laugh behind the candles and white roses of a forest tablescape'],
].map(([file, width, height, alt]) => ({
  type: 'image',
  src: `/media/${file}`,
  width,
  height,
  alt,
  d: { x: 0, y: 0, w: width, h: height },
}));

const LIVE_ITEMS = [
  {
    type: 'video',
    src: '/media/49b5c3_5152e84309dc4c99828f4a0596ee06ba-1080p-9941f299.mp4',
    poster: '/media/49b5c3_5152e84309dc4c99828f4a0596ee06baf001-6fbb2e48.jpg',
    label: 'Groom twirling the bride on a villa staircase, her gown fanning out',
    d: { x: -415, y: 40, w: 1815, h: 387 },
  },
  {
    type: 'image',
    src: '/media/tlaquepaque-sedona-arizona-vintage-bride-groom-portr-5b1186a1.jpg',
    width: 588,
    height: 880,
    alt: 'Red rose and anthurium centerpiece with pillar candles on a candlelit reception table',
    d: { x: -310, y: 436, w: 294, h: 440 },
  },
  {
    type: 'image',
    src: '/media/49b5c3_2b82374151bc4053ae2a38ad44948015-908e9d2d.png',
    width: 595,
    height: 509,
    alt: "Overhead view of a wooden reception table with a baby's breath runner, green silk napkins and beaded charger plates",
    d: { x: 364, y: 436, w: 387, h: 331 },
  },
  {
    type: 'image',
    src: '/media/IMG_5372-e6eeacf7.jpg',
    width: 792,
    height: 860,
    alt: 'Wedding ceremony at sunset inside the Chapel of the Holy Cross in Sedona',
    d: { x: 359, y: 773, w: 396, h: 430 },
  },
  {
    type: 'image',
    src: '/media/Screenshot-2026-08-06-1_21_59-PM-6021bd3d.png',
    width: 512,
    height: 552,
    alt: 'Bride and groom sharing a slow dance in a historic courtyard under string lights, black and white',
    d: { x: -10, y: 436, w: 366, h: 394 },
  },
  {
    type: 'image',
    src: '/media/Screenshot-2026-08-06-1_22_03-PM-97139385.png',
    width: 495,
    height: 552,
    alt: 'Guests dining at a long candlelit table outdoors at night',
    d: { x: 28, y: 845, w: 321, h: 358 },
  },
  {
    type: 'image',
    src: '/media/Screenshot-2026-08-06-1_21_53-PM-38bfc18e.png',
    width: 512,
    height: 342,
    alt: 'Cutting a white buttercream wedding cake beside a tray of cupcakes',
    d: { x: -346, y: 1189, w: 366, h: 244 },
  },
  {
    type: 'video',
    src: '/media/49b5c3_ff293a45593944c0a480183eccc60df8-480p-ba23b20b.mp4',
    poster: '/media/49b5c3_ff293a45593944c0a480183eccc60df8f002-a7586541.jpg',
    label: 'Couple exchanging vows between two tall citrus-and-greenery floral columns',
    d: { x: 28, y: 1443, w: 714, h: 402 },
  },
  {
    type: 'image',
    src: '/media/IMG_4576-1-_JPG-6f24d2f5.jpg',
    width: 854,
    height: 606,
    alt: 'Disco balls and pink streamers hanging from a reception ceiling',
    d: { x: -405, y: 881, w: 427, h: 303 },
  },
  {
    type: 'image',
    src: '/media/IMG_5378-c460d2d2.png',
    width: 642,
    height: 788,
    alt: "Bride and groom embracing under a willow tree at the water's edge",
    d: { x: 760, y: 436, w: 321, h: 394 },
  },
  {
    type: 'image',
    src: '/media/Screenshot-2026-08-06-1_21_45-PM-9b9ade48.png',
    width: 405,
    height: 584,
    alt: 'Bride and groom walking hand in hand up a wooded path, black and white',
    d: { x: 1089, y: 436, w: 273, h: 394 },
  },
  {
    type: 'image',
    src: '/media/Screenshot-2026-08-06-1_21_35-PM-017e630f.png',
    width: 476,
    height: 643,
    alt: 'Bride in a long veil standing beneath a lantern beside a tiled staircase, black and white',
    d: { x: 760, y: 838, w: 340, h: 459 },
  },
  {
    type: 'image',
    src: '/media/IMG_5374-894bd2e0.png',
    width: 548,
    height: 1392,
    alt: "Bride and groom beneath the Chapel of the Holy Cross in Sedona's red rocks",
    d: { x: 1109, y: 838, w: 274, h: 696 },
  },
  {
    type: 'image',
    src: '/media/Screenshot-2026-01-26-6_43_11-PM-0a464cb7.png',
    width: 696,
    height: 480,
    alt: 'Strings of cafe lights over an evening courtyard party',
    d: { x: 752, y: 1524, w: 348, h: 240 },
  },
  {
    type: 'image',
    src: '/media/IMG_5372-b258dfc7.jpg',
    width: 730,
    height: 960,
    alt: 'Sunset glowing through the chapel windows during a wedding ceremony',
    d: { x: -280, y: 1669, w: 365, h: 480 },
  },
  {
    type: 'image',
    src: '/media/49b5c3_b816434b48664691af30bd8ea307b5ac-1065b683.png',
    width: 580,
    height: 418,
    alt: 'Bride and groom toasting with raised glasses at their sweetheart table',
    d: { x: 96, y: 1853, w: 411, h: 296 },
  },
  {
    type: 'image',
    src: '/media/3_6_23-Isabella-Dylan-dances-cake-Kristen-Kay-Photog-98a8fb15.jpg',
    width: 764,
    height: 592,
    alt: 'Couple dancing while a classic film plays on a projection screen behind them, black and white',
    d: { x: 528, y: 1853, w: 382, h: 296 },
  },
  {
    type: 'image',
    src: '/media/IMG_5376-f492c1a7.jpg',
    width: 854,
    height: 566,
    alt: 'Bride and groom at the altar joined by a wedding lasso rosary',
    d: { x: 928, y: 1779, w: 427, h: 283 },
  },
  {
    type: 'image',
    src: '/media/49b5c3_bbfa632c8477434e973d4934f998083c-f9c1ecf8.png',
    width: 425,
    height: 720,
    alt: "Close-up of the couple's hands and rings during an embrace",
    d: { x: -306, y: 2163, w: 416, h: 704 },
  },
  {
    type: 'image',
    src: '/media/49b5c3_f2f847eccbe148dbb4f7320e54ccc04c-6a8b8799.png',
    width: 610,
    height: 472,
    alt: 'Save-the-date card with a gold wax seal and lace detail',
    d: { x: 130, y: 2163, w: 382, h: 296 },
  },
  {
    type: 'image',
    src: '/media/0K3A4092-da34664b.jpg',
    width: 776,
    height: 732,
    alt: 'Bride and groom holding hands beneath the Patio Azul gate',
    d: { x: 522, y: 2163, w: 388, h: 366 },
  },
  {
    type: 'image',
    src: '/media/IMG_3120_edited-26d6e647.jpg',
    width: 764,
    height: 732,
    alt: 'Newlyweds posing with champagne beside casino slot machines, black and white',
    d: { x: 130, y: 2475, w: 382, h: 366 },
  },
  {
    type: 'image',
    src: '/media/0A2F70E9-D7BE-4159-AB1D-FB3CB73AD78B_JPG-0acd3646.jpg',
    width: 761,
    height: 951,
    alt: "Groom lifting the bride's flowing floral-appliqued veil in a colonnade, black and white",
    d: { x: 918, y: 2376, w: 409, h: 511 },
  },
  {
    type: 'image',
    src: '/media/B639DB81-9387-4407-990F-5C60EF04A378_edited-5be00215.jpg',
    width: 776,
    height: 776,
    alt: 'Bride and groom exchanging vows in a candlelit historic chapel',
    d: { x: 522, y: 2849, w: 388, h: 388 },
  },
  {
    type: 'image',
    src: '/media/4B27FF08-1DC7-4562-926D-EA128012AAA9--e9962c1f.png',
    width: 527,
    height: 662,
    alt: 'Rows of white folding ceremony chairs on a paved terrace',
    d: { x: 130, y: 3164, w: 354, h: 445 },
  },
  {
    type: 'image',
    src: '/media/0K3A3957-c6f7d16b.jpg',
    width: 1298,
    height: 736,
    alt: "Groom holding a 'His Vows' book across from the bride's bouquet, black and white",
    d: { x: 503, y: 3241, w: 649, h: 368 },
  },
  {
    type: 'image',
    src: '/media/0K3A4901-33fb0fb1.jpg',
    width: 1200,
    height: 756,
    alt: 'Bride laughing on the dance floor with her bouquet raised',
    d: { x: 130, y: 3623, w: 600, h: 378 },
  },
  {
    type: 'image',
    src: '/media/D609A444-4075-4652-B221-4411AF985573-1-_JPG-e5561297.jpg',
    width: 764,
    height: 1096,
    alt: "Reception tent with cross-back chairs, green silk napkins, disco balls and baby's breath",
    d: { x: -271, y: 3202, w: 382, h: 548 },
  },
  {
    type: 'image',
    src: '/media/49b5c3_d51a156bded7463ebe9cc08643708126-6daba43a.png',
    width: 630,
    height: 518,
    alt: "Vintage rotary phone audio guestbook with a 'Hello!' welcome sign",
    d: { x: 928, y: 2068, w: 366, h: 301 },
  },
];

// Hero stays first; the additions alternate with the live photos after it.
export const GALLERY_ITEMS = [
  LIVE_ITEMS[0],
  ...Array.from({ length: Math.max(ADDED_ITEMS.length, LIVE_ITEMS.length - 1) }, (_, i) => [
    ADDED_ITEMS[i],
    LIVE_ITEMS[i + 1],
  ]).flat().filter(Boolean),
];

// NOT from the live gallery — these three clips live on the home and services
// pages, pulled in here so motion is spread through the collage instead of
// sitting in two places. All are 16:9 natives (1920x1080 or 960x540), so the
// masonry shows them uncropped. `slot` is the index in the post-hero flow to
// insert before, chosen to land roughly one video per column at the 4-column
// breakpoint; they are short loops, ~6-33s.
export const GALLERY_EXTRA_VIDEOS = [
  {
    type: 'video',
    src: '/media/49b5c3_d326db7690b1430d9fe14de2a6bb4b92-1080p.mp4',
    poster: '/media/49b5c3_d326db7690b1430d9fe14de2a6bb4b92f000-cb0df2e4.jpg',
    label: "Escort-card table of miniature suitcase favors beneath a 'Baggage Claim' sign",
    ar: '16 / 9',
    slot: 10,
  },
  {
    type: 'video',
    src: '/media/49b5c3_27a7a44aa2bf4bb9a0559243e72be06d-480p-06038076.mp4',
    poster: '/media/49b5c3_27a7a44aa2bf4bb9a0559243e72be06df000-dc5ae3c8.jpg',
    label: 'Newlyweds walking out through a shower of petals as their guests cheer',
    ar: '16 / 9',
    slot: 26,
  },
  {
    type: 'video',
    src: '/media/49b5c3_94afe07dea67468194477edb9160c29d-1080p-f179853e.mp4',
    poster: '/media/49b5c3_94afe07dea67468194477edb9160c29df000-f015404f.jpg',
    label: 'Newlyweds walking hand in hand past a flower-covered courtyard storefront',
    ar: '16 / 9',
    slot: 42,
  },
];
