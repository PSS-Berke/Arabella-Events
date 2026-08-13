// Content for the About AWE + Team page (/arabella).
// Copy transcribed verbatim from the live page's baked text images at
// https://www.arabellasweddings.com/arabella (verified against the source PNGs).

export const ABOUT_IMG = {
  // Three-photo candid row (live display: 307x215 / 351x215 / 316x215)
  candid1: '/media/IMG_5385-ece2aa7c.jpg',
  candid2: '/media/IMG_5386-60b91db7.jpg',
  candid3: '/media/image-abf635a7.png',
  // Script label badges "THE heart / THE trajectory / THE core" (live display: 235x108)
  badgeHeart: '/media/49b5c3_3670f4a00a5c42e4bf4e8042337bea02-1ff9abac.png',
  badgeTrajectory: '/media/49b5c3_eb33285ef8d04af593aa92168d43c781-a7ef45a8.png',
  badgeCore: '/media/49b5c3_b2558d6d38464939853d2d31bad97c26-ebb7a100.png',
  // Tagline strip "BEAUTIFULLY DESIGNED. METICULOUSLY PLANNED. LED BY A HEART THAT listens" (600x54)
  tagline: '/media/49b5c3_ccc346b9bfbb4dbdaa4e7e8955e43109-0fa29751.png',
  // Section photos
  heartPhoto: '/media/49b5c3_83e26eb70f364ef6a565dc092ecc7c13-b6c8bade.jpg', // 346x514
  trajectoryPhoto: '/media/IMG_8656-f809ccbe.jpg', // 351x497
  corePhoto: '/media/IMG_8971_PNG-cc07bc23.png', // 600x489
};

export const HEART_PARAS = [
  'When you genuinely love people—and believe deeply in the beauty of bringing them together—this work comes naturally.',
  'For me, wedding planning has always been about more than creating something beautiful. It’s about understanding the people at the center of it. I pay attention to the details others may overlook: the stories you tell in passing, the people who matter most to you, the traditions you hold close, and the moments you want to remember forever.',
  'That understanding becomes the foundation for everything we create.',
  'Born and raised in the suburbs of Chicago, I grew up surrounded by large Italian family weddings, where celebration meant a room filled with generations of people, incredible food, endless laughter, and an unmistakable sense of togetherness. Those experiences shaped the way I see weddings today—not simply as an event between two people, but as a gathering of everyone and everything they love.',
  'It’s why connection is at the heart of my approach. I want to know your story, understand who you are, and build the kind of relationship that allows you to truly trust me with one of the most meaningful days of your life.',
  'From the quietest details to the grandest moments, I approach every celebration with intention, intuition, and an unwavering level of care.',
];

export const TRAJECTORY_PARAS = [
  'My career in events began in 2017 in the suburbs of Chicago and has since taken me through more than 300 celebrations and large-scale events alongside some of the world’s most recognized hospitality brands, including MGM Resorts International, InterContinental Hotels, Legends, and Hilton.',
  'My experience spans nearly every side of the industry—from wedding and event management to sales, catering, production, and on-site execution. While planning weddings in Las Vegas, I also served as Wedding Manager for one of the city’s premier outdoor venues, overseeing celebrations from the first inquiry through the final moments of the wedding day.',
  'That depth of experience shapes the way I plan today. I understand how venues operate, how vendors work together behind the scenes, and how to anticipate the details that make an event feel effortless to everyone experiencing it.',
  'Beyond planning, my background extends into event design, stationery, signage, invitations, menus, custom wedding websites, and personalized details—allowing me to consider your celebration as a complete experience rather than a collection of individual pieces.',
  'The result is a wedding that feels beautifully cohesive, thoughtfully considered, and seamlessly executed—from the first impression to the final farewell.',
];

// Each paragraph is an array of segments so the two live bold spans can be
// rendered with <strong> ("always" and "every moment has the potential to be special.").
export const CORE_PARAS = [
  [{ text: 'A thoughtful, romantic soul who thrives on meaningful connections and spontaneous experiences.' }],
  [
    { text: 'My family would say that I am proof that you can chase dreams in heels or barefoot! My house is full of butterflies, 42 plants, stained glass & eclectic portraits. My vase is ' },
    { text: 'always', bold: true },
    { text: ' full.' },
  ],
  [
    { text: 'Passionate about swing dancing, line dancing, laughter, roller skating, and music, I find beauty in the little details & strongly believe ' },
    { text: 'every moment has the potential to be special.', bold: true },
  ],
];
