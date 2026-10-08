// Content for /love-notes ("KIND WORDS") — transcribed verbatim from
// https://www.arabellasweddings.com/love-notes (12 testimonials, live order).
//
// Review 1 is byte-identical to the homepage carousel copy, so it imports
// REVIEWS[0] from lib/content.js. Reviews 2-5 differ slightly from the
// homepage REVIEWS entries on the live love-notes page (sentence order in
// review 2, dash/apostrophe/nbsp characters in 3-5), so they are transcribed
// fresh here exactly as the live love-notes page renders them.
//   escapes and \n line breaks are verbatim from the live markup
// (render the text with `whitespace-pre-line`).
import { REVIEWS } from '@/lib/content';

// "THE AWE experience" script/serif title graphic at the top of the page.
export const LN_TITLE = {
  src: '/media/49b5c3_268dfbdcfc99438d9e7c82302b9cabe4-632db638.png',
  w: 234,
  h: 120,
};

// Social Booth LV photo-booth credit (logo links out in a new tab on live).
export const SOCIAL_BOOTH = {
  href: 'https://www.socialboothlv.com/',
  logo: {
    src: '/media/17AE1900-5A80-4E36-ADEA-46E78D48305D-_e-0f766eb2.png',
    w: 119,
    h: 92,
  },
};

// Interleaved wedding photos, keyed for use in app/love-notes/page.js.
// w/h are the live desktop display sizes (980px Wix canvas).
export const LN_PHOTOS = {
  chapel: {
    src: '/media/Screenshot-2026-08-08-2_44_30-PM-fb74a921.png',
    w: 421,
    h: 545,
    alt: 'Bride and groom standing in a historic chapel',
  },
  sedona: {
    src: '/media/tlaquepaque-sedona-arizona-vintage-bride-groom-portr-dac924be.jpg',
    w: 346,
    h: 514,
    alt: 'Vintage bride and groom portrait at Tlaquepaque, Sedona, Arizona',
  },
  jennaDerek: {
    src: '/media/JennaDerek-211-af327d09.jpg',
    w: 346,
    h: 363,
    alt: 'Bride and groom smiling beneath a sycamore tree',
  },
  willow: {
    src: '/media/IMG_5378-83c7e91e.png',
    w: 446,
    h: 502,
    alt: 'Couple embracing under a willow tree at the water’s edge',
  },
  archway: {
    src: '/media/6I6A3995-48987c94.jpg',
    w: 342,
    h: 448,
    alt: 'Bride and groom beneath a stone archway with a flowing veil',
  },
  ceremony: {
    src: '/media/49b5c3_abab9528b22f451691d1b89f7bc18ad1-e58b786c.png',
    w: 342,
    h: 448,
    alt: 'Bride and groom holding hands at a ceremony framed by orange florals',
  },
  brideGroomCloseup: {
    src: '/media/49b5c3_bad340abd43d4f8d83e4007345810f7d-6714e083.png',
    w: 282,
    h: 401,
    alt: 'Bride smiling up at the groom during the ceremony',
  },
  bouquet: {
    src: '/media/49b5c3_9e6de358e7e74ae1af50f95c18c49af4-0bfe682f.png',
    w: 287,
    h: 392,
    alt: 'Bride with a blush and white bouquet smiling at the groom',
  },
  embrace: {
    src: '/media/49b5c3_9874e4ab8f464864adf4adf4f591f72c-eb89b47f.png',
    w: 313,
    h: 457,
    alt: 'Bride and groom embracing at golden hour',
  },
  photoBooth: {
    src: '/media/49b5c3_00c31c7e2bf645e6a2f532ec5c695828-d3e60175.png',
    w: 407,
    h: 309,
    alt: 'Wood photo-booth backdrop with balloon garlands and a neon sign',
  },
};

// The 12 testimonials in live order. `nameImg` is the baked serif couple-name
// graphic shown above each quote (null for review 12, which has none).
// `post` (optional) is the slug of the couple's blog post; a "Read their
// wedding story" link to it appears under their name.
export const LOVE_NOTES = [
  {
    name: 'Hannah & Hunter',
    post: 'seven-week-timeless-wedding-tlaquepaque-sedona',
    nameImg: { src: '/media/49b5c3_cb60b9c06a1b4a2386bec09c59b61200-078b0301.png', w: 394, h: 39 },
    text: REVIEWS[0],
  },
  {
    name: 'Jordan & Austin',
    post: 'vintage-romance-wedding-tlaquepaque-sedona',
    nameImg: { src: '/media/49b5c3_77eb19ac32aa4f9785e3448535d19fdf-55359627.png', w: 389, h: 49 },
    text: "Arabella was an absolute standout as our wedding  planner, and we can’t say enough about how grateful we are for her. From the very beginning, she demonstrated incredible organization and thoughtful planning, anticipating needs and potential obstacles long before they ever crossed our minds. Her attention to detail gave us so much confidence leading up to the wedding day. On the day itself, Arabella was truly the key piece that made everything run seamlessly. She took charge as the main point of contact between all of our vendors, ensuring every single person was on the same page and that the timeline stayed perfectly on track. If anything came up behind the scenes, we never knew about it because she already had it handled. What meant the most to us was her presence during moments when we couldn’t be there to oversee setup. She made sure every element was exactly where it needed to be, bringing our vision to life down to the smallest detail. Thanks to her we were able to actually enjoy our wedding day without worrying about anything. Arabella made it possible for us to fully immerse ourselves in the celebration, stress-free, and that alone made her worth her weight in gold. We truly couldn’t imagine our wedding day without her, and we recommend her wholeheartedly to any couple looking for someone who will go above and beyond to make their day perfect.",
  },
  {
    name: 'Jenna & Derek',
    nameImg: { src: '/media/49b5c3_a07101b1d63c4671b850ae034c190989-54615836.png', w: 389, h: 49 },
    text: "Arabella was my planner for my October wedding, and she was absolutely incredible! She took so much stress off my shoulders in the weeks leading up to the big day, helping organize every last detail and ensuring nothing was overlooked. She handled all the vendor communication seamlessly, which allowed me to truly relax and enjoy the process. I was even her first trial with a wedding mirror, and it turned out amazing - such a beautiful, personalized touch! Thanks to Arabella, my wedding day was completely stress-free and everything went perfectly. Above all, she is such a sweet and genuine person, I can tell she loves what she does. I can’t recommend her enough!",
  },
  {
    name: 'Alicia & Hawk',
    nameImg: { src: '/media/49b5c3_f2575188d2ea4725853164cb590b6936-3e43a84a.png', w: 389, h: 49 },
    text: "Hiring Arabella as our coordinator was one of the best decisions we made! She was calm, organized, and truly went above and beyond to make sure everything ran perfectly. From managing vendors to keeping us on schedule, Arabella handled every detail with ease and professionalism. Thanks to her, our day was completely stress-free  everything flowed seamlessly, and we were able to just enjoy every moment. Our guests and family kept commenting on how smooth the day felt, and that was all because of Arabella’s hard work behind the scenes. If you’re looking for someone who will bring your vision to life and make your wedding day effortless, Arabella is the one!",
  },
  {
    name: 'Salem & Dylan',
    nameImg: { src: '/media/49b5c3_5e3e3cc91b604084a2536df55c8fcd31-e901a337.png', w: 389, h: 49 },
    text: "Arabella was an absolute dream to work with! She handled everything with such grace, after we switched venues a few months before our special day. She was able to bring my fairy garden dream wedding to life and I couldn't imagine our day being half as beautiful without her touch. She is such a kind and genuine soul and I would recommend her to anyone looking for guidance with their wedding.",
  },
  {
    name: 'Jenna & Joseph',
    nameImg: { src: '/media/49b5c3_2cefc43e865a47db89f04b8457f12b47-3e675cfe.png', w: 389, h: 49 },
    text: "Best wedding coordinator we could’ve asked for! Arabella made our wedding day go by so seamlessly. She was friendly, professional, and comforting. She handled all communication with our vendors while answering all of our questions! She made us feel taken care of and reassured us that we had nothing to worry about on our big day. Without going into specifics, we had a few problems with one of our vendors and Arabella went above and beyond to resolve these issues. We are truly grateful because without her help our wedding day would’ve been chaotic! Words cannot describe how much she impacted our wedding. If you’re looking for a coordinator she is THE ONE!",
  },
  {
    name: 'Britney & Markus',
    nameImg: { src: '/media/49b5c3_15f14e62cf4d428987ae5dc0d67ae706-cf531b06.png', w: 415, h: 45 },
    text: "I am beyond grateful to have had Arabella as my wedding planner. I flew her out from Arizona to Chicago, and from the moment she arrived, she made everything feel seamless and stress-free. Arabella went above and beyond in every possible way - she even ran last-minute errands for me that I had completely forgotten about. Her dedication, attention to detail, and calm presence made all the difference on such an important day. She coordinated effortlessly with all the vendors and ensured that everything ran smoothly, allowing me to truly be present and enjoy my wedding without a single worry. I feel so blessed to have had her by my side, and I can’t thank her enough for making my day as beautiful and stress-free as it was. Arabella is a true professional and a calming force - any bride would be lucky to have her!",
  },
  {
    name: 'Isabella & Dylan',
    post: 'vintage-vow-renewal-las-vegas',
    nameImg: { src: '/media/49b5c3_52c4eedcf79e4c4b8842bd37fda9b463-5c965a9d.png', w: 415, h: 45 },
    text: "Arabella was absolutely phenomenal. I had my wedding in March of 2023. I had to write a review on how absolutely amazing she was to my husband, family, and me! Not only did she help us achieve everything we wanted for the wedding but was our biggest supporter and advocate when dealing with any of our vendors that were being difficult. She is a force to be reckoned with and does it with such grace. Arabella had an amazing eye for detail and made every step of the way in this experience so effortless. She was made for this industry and anyone that would over look her services would be a fool!",
  },
  {
    name: 'Stephanie & Trevor',
    nameImg: { src: '/media/49b5c3_63e179edbd324472b55c1e795a84d195-0bfe2177.png', w: 415, h: 91 },
    text: "Arabella went above and beyond to make our wedding day 100% stress free, and we literally couldn’t have done it without her! She is professional, prompt, flexible, and guided us every step of the way throughout our engagement. I cannot thank her enough for the effort she put into making our wedding go as smooth as it did.\n\nShe handled all of our vendors, set up the decorations, guided our guests, and most importantly made sure my husband and I were happy. It was so nice to not have to do a single thing except enjoy our day!! I had even told her how nervous I was the morning of, so she came early with coffee and treats, and stayed and talked to me while I was getting my makeup and hair done.\n\nShe is more than just a wedding planner, she is a friend. I will recommend her to anyone I know getting married in Vegas.\n\nWe had the most perfect day and I am forever grateful for Arabella!",
  },
  {
    name: 'Vaden & Clark',
    nameImg: { src: '/media/49b5c3_b99f474d22094217aefb799420af7c1d-0effc320.png', w: 415, h: 56 },
    text: "Arabella was absolutely incredible to work with! She made our wedding go so perfectly, & worked harder than any of our other vendors to do so. She has a ton of energy, & truly cared about us & our wedding! Very thankful to have had her be apart of our special day, & even more proud to have been able to call her a friend throughout the entire process!",
  },
  {
    name: 'Monica & Bryan',
    nameImg: { src: '/media/49b5c3_13823252531942c6918bcaab29476635-4cd78abd.png', w: 415, h: 56 },
    text: "My wife and I had our wedding here at Hilton at Lake Las Vegas and we couldn’t of had a better experience.\n\nOur initial impression was that the Hilton grounds are absolutely stunning, intimate, and have a unique beauty of Las Vegas that many aren’t used to experiencing. We had countless compliments from our guests on the beauty this venue offered. It did not disappoint. Arabella Mascari was our Wedding Manager and I cannot even begin to express our overwhelming gratitude for her.\n\nShe was kind, genuine, honest, and worked endlessly for us to obtain the wedding vision of our dreams.\n\nShe is our MVP and without a doubt helped on countless occasions to overcome obstacles and find solutions.\n\nShe alleviated our stress and we couldn't have had the amazing wedding we had without her.",
  },
  {
    name: null,
    nameImg: null,
    text: "We highly recommend Arabella as a planner! I have been in the industry for over ten years and it is easy to point out planners who are organized, knowledgeable and great with vendors and their clients! The entire process working with Arabella before the wedding, during and after has exceeded our expectations and we can’t wait for future events with Arabella!",
  },
];

// Newer reviews (Oct 2026), not on the live Wix page — shown after the live
// layout in a simple stacked section. `name` is the heading (null = none);
// `label` is an optional small line above it. Text is verbatim.
export const MORE_LOVE_NOTES = [
  {
    name: 'Jennifer & Hunter',
    label: "Don Hoel's Cabins · September 26, 2026",
    photo: { src: '/media/jh-twirl-cabins-165892d8.jpg', w: 1000, h: 1500, alt: "Hunter twirling Jennifer beneath tall pines beside the cabins at Don Hoel's" },
    post: 'whimsical-wild-west-wedding-don-hoels-cabins-sedona',
    postLabel: 'Read their wedding story',
    text: "I genuinely don’t even know where to begin with Arabella because she went SO far above and beyond anything I could have ever expected from a wedding planner.\n\nFrom the very beginning, Arabella was there for absolutely everything. She helped bring our vision to life, handled decor and all of the tiny details that made our wedding feel so incredibly personal, kept track of every vendor, chased people down when communication was difficult, held everyone accountable, advocated for us, and even picked things up for us and personally brought them to the venue. She truly did EVERYTHING.\n\nBut the design aspect was honestly one of the most incredible parts of working with her. I am absolutely terrible at explaining the ideas that exist in my head, and somehow Arabella could take the most vague, half-formed description and turn it into exactly what I was imagining — sometimes even better than what I had pictured. It genuinely felt like she was inside my head, copy-pasting my thoughts into the design. Every time we had a planning call, I was excited because I knew she was going to show me something that completely blew me away. She put so much thought, creativity, detail, and intention into our wedding, and it showed in every single corner.\n\nAnd then there was the wedding day itself. I truly cannot think of a single hiccup. Everything flowed so seamlessly, and I know that there was SO much happening behind the scenes that I probably never even knew about because Arabella was handling it. She made sure vendors were where they needed to be, the timeline stayed on track, the decor was exactly right, and that we could actually enjoy our wedding instead of worrying about everything happening around us.\n\nBut honestly, what makes Arabella so special is that she isn’t just a wedding coordinator. Somewhere along the way, she became a friend. She was my hype girl, my emotional support, the person I could go to when I was overthinking a tiny detail, and one of the biggest supporters of us and our wedding. You can tell that she genuinely CARES about her couples and about making them happy. You never feel like you’re just another wedding she’s planning.\n\nWhen I booked a wedding planner, I expected someone to help coordinate a wedding. What I got was someone who helped create the most incredible wedding we could have imagined AND became a lifelong friend in the process.\n\nI genuinely cannot stop raving about Arabella. If you’re considering booking her, DO IT. You are not just hiring someone to coordinate your wedding — you are gaining someone who will advocate for you, believe in your vision, hype you up, take care of the details you don’t even know need taking care of, and care about your wedding as much as you do.\n\nArabella, thank you for giving us the wedding of our dreams. We love you endlessly and are so incredibly grateful that you were part of our story.",
  },
  {
    name: 'Patricia & Drew',
    label: 'Creekside Inn',
    text: "Arabella is amazing!! My husband and I did majority of the coordination and finding vendors but Arabella made sure that the week prior and day of went smoothly. I was stressing out over the floral arrangements because we didn’t use a florist. We provided Arabella with all the flowers and she made the tables look beautiful and our sweetheart table was stunning too! She did amazing putting things together and making sure everything fell into place. We had winds on our wedding day but Arabella made sure that we didn’t worry about it because she was doing all the work behind the scenes so I couldn’t tell there was even wind. I’m extremely anxious and want to take care of everything myself and Arabella made sure I took a breath and sad multiple times “don’t worry, trust me, I got this”. She is so sweet and kind and really knows her stuff so I would 1000% recommend her. ❤️✨🫶🏽",
  },
  {
    name: 'Sarah & Grant',
    label: 'Tlaquepaque · September 19, 2026',
    photo: { src: '/media/sg-draping-chandelier-tables-5a49363d.jpg', w: 2000, h: 1333, alt: 'Long banquet tables with burgundy runners and gold candelabras before ivory draping and a crystal chandelier' },
    post: 'old-world-italian-inspired-wedding-tlaquepaque-sedona',
    postLabel: 'Read their wedding story',
    text: "Arabella over delivered in every single category of our wedding and made the planning process so easy for us. We hired her full time because our venue didn’t provide anything other than the space and needed help with out sourcing every little thing. I told her she was the professional at this so I am going to give her the freedom to create our vision however she saw fit. I shared our colors, inspo photos for our ceremony, cocktail and reception spaces along with some fonts we liked and a few details we wanted to have but we let her pick everything out and let her creativity flourish. And not to mention all while staying within our budget. Having her to lean on, and allowing her the freedom to do her job without someone looking over her shoulder was the best decisions for not only my husband and I but it was helpful for her. We had zero stress on our wedding day and were blown away with her execution!! She brings the best energy to every call and has the kindest heart. I highly recommend using her if youre looking for a planner in the area!",
  },
  {
    name: 'Hannah & Michael',
    label: "Don Hoel's Cabins · September 5, 2026",
    photo: { src: '/media/hm-creekside-kiss-635bd27c.jpg', w: 1500, h: 1000, alt: 'Hannah and Michael sharing a kiss on the rocks along Oak Creek' },
    post: 'enchanted-forest-wedding-don-hoels-cabins-sedona',
    postLabel: 'Read their wedding story',
    text: "I am SO happy that me and my now husband found Arabella when starting our wedding planning!! As a natural planner, I doubted if I really needed a wedding planner, but wow I was wrong. Arabella thought of details that would have never crossed my mind and was able to execute seamlessly on so many things that would have really overwhelmed me as a bride. I always felt like I was in good hands and things were being taken care of without me needing to be overly involved in the details, allowing us to be totally present on our wedding day. Arabella coordinated with all of our many vendors, including a very challenging venue and shielded us from a lot of headache going into the wedding. My favorite part of working with Arabella was her eye for design and how absolutely stunning she made our wedding look. She was able to weave our vision with her own design experience and made the entire day look and feel like a dream. I cannot recommend Arabella enough to any bride and couple who wants to have their wedding day feel like a fairytale. Arabella goes above and beyond and is also such a lovely person which made working with her all the more amazing! Thank you for everything, Arabella <33333",
  },
  {
    name: 'Kassie & Nathan',
    label: 'Agave of Sedona · September 4, 2026',
    text: "I truly cannot say enough amazing things about Arabella! She was absolutely incredible throughout our entire wedding planning process, and I honestly don’t know how I would have done it without her.\n\nFrom the very beginning, Arabella had a way of putting my mind at ease. Anytime I started to worry about something, she would reassure me not to stress and that she would take care of it — and she always did. She went above and beyond in ways I never expected.\n\nOne of the biggest examples was our photographer. We were having issues getting adequate information and communication from our original photographer, and just ONE WEEK before our wedding, Arabella stepped in and found us an absolutely amazing new photographer. She handled the situation so quickly and made what could have been a huge disaster feel completely manageable.\n\nAnd she didn’t stop there. Even on the actual wedding day, while I was sitting in the chair getting my hair and makeup done, I received a text from our previous photographer. Before I could even begin to stress about it, Arabella took care of everything. That moment alone showed me just how much I could trust her to handle anything that came our way.\n\nArabella truly exceeded our expectations in every way. She was organized, responsive, reassuring, and genuinely cared about making our wedding day everything we dreamed it would be. She allowed us to actually enjoy our wedding instead of worrying about all the little details behind the scenes.\n\nIf you are planning a wedding, I cannot recommend Arabella enough. Having her by our side was one of the best decisions we made, and we are so incredibly grateful for everything she did to make our day perfect! 🤍",
  },
  // Reviews from fellow wedding professionals.
  {
    name: null,
    label: 'From Dana Maruna Photo',
    photo: { src: '/media/film-veil-stone-archway-0a2b8ea4.jpg', w: 1078, h: 1600, alt: 'A bride in a cathedral veil beneath a stone archway, photographed on 35mm film by Dana Maruna' },
    post: 'vintage-romance-wedding-tlaquepaque-sedona',
    postLabel: 'Jordan & Austin’s wedding',
    text: "Arabella is hands down one of my favorite planners to work with! Coming from another wedding vendor- a photographer, I cannot emphasize enough how important it is to have a good planner working alongside you on a wedding day, and Arabella is truly one of the best.\n\nShe is so communicative, efficient, organized, and genuinely just such a kind person. She cares deeply about every single one of her couples, and you can truly see the amount of love and effort she puts into everything she does.\n\nGetting to see all of the behind-the-scenes work that goes into a wedding day, I can confidently say Arabella is basically superhuman. She is constantly making sure everything is taken care of, everyone is where they need to be, and the day runs as smoothly as possible so her couples can actually be present and enjoy their day.\n\nI would not hesitate for a second to recommend booking with her. She is incredible at what she does, cares SO much about her couples, and is just an absolute dream to work alongside!",
  },
  {
    name: null,
    label: 'From Bella Wang Photo',
    photo: { src: '/media/sz-fountain-portrait-film-79db550e.jpg', w: 2000, h: 1975, alt: 'Sophia and Zachary before the courtyard fountain at Hozho Alameda Ranch, photographed by Bella Wang Photo' },
    post: 'intimate-estate-wedding-hozho-alameda-ranch-scottsdale',
    postLabel: 'Sophia & Zachary’s wedding',
    text: "I absolutely loved working with Arabella for a recent wedding I photographed. From the very beginning, Arabella was incredibly detail oriented and organized. When I first reached out about the wedding, she already had a beautiful draft of their timeline and vision board, along with a clear list of vendors and responsibilities. It was immediately clear that she cared about every detail of their day.\n\nThroughout the planning process, she was communicative, warm, and always made me feel supported. She kept me included in timeline conversations and updates, coordinated with the other vendors, and was always just a quick text away. She also consistently asked what I needed from her as the photographer and actually followed through, which made my job so much easier.\n\nOn the wedding day, I genuinely felt like she had my back. She made me feel essential to the day and if I needed something or something wasn’t going quite right, I knew she would find a way to help fix it. Most importantly, our couple completely trusted her to execute their vision, and she did exactly that. The entire wedding looked and felt like their original renderings and mockups, which was so impressive to see come together in real life.\n\nWhat I appreciated most is that Arabella is incredibly professional without ever losing her warmth. She knows how to put on a beautiful party and somehow make the whole thing feel effortless. You can tell that behind the scenes, she is thinking through every little detail so her couples don’t have to. They get to actually enjoy their wedding, and she makes the magic happen!!!!",
  },
  {
    name: null,
    label: "From L'Auberge de Sedona",
    photo: { src: '/media/bm-night-tables-chandeliers-c482e0c7.jpg', w: 1290, h: 1527, alt: "Calla-lily tables beneath string lights and crystal chandeliers along Oak Creek at L'Auberge de Sedona" },
    post: 'garden-estate-wedding-lauberge-de-sedona',
    postLabel: 'Brynn & Megan’s wedding at L’Auberge',
    text: "Arabella holds a wonderful and positive energy that carries into her events and interactions. I have had the pleasure of working with her several times from the part of the host property (L'auberge de Sedona) where her role as wedding planner has helped make several couples, their families, and friends all very happy. She understands the importance and beauty of two people joining lives, and gives her work and heart to seeing that magic sparkle.",
  },
];
