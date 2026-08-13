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

export const GALLERY_ITEMS = [
  {
    type: 'video',
    src: '/media/49b5c3_5152e84309dc4c99828f4a0596ee06ba-1080p-9941f299.mp4',
    poster: '/media/49b5c3_5152e84309dc4c99828f4a0596ee06baf001-6fbb2e48.jpg',
    loop: true,
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
    loop: false,
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
