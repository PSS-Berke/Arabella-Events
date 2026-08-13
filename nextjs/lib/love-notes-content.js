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
export const LOVE_NOTES = [
  {
    name: 'Hannah & Hunter',
    nameImg: { src: '/media/49b5c3_cb60b9c06a1b4a2386bec09c59b61200-078b0301.png', w: 394, h: 39 },
    text: REVIEWS[0],
  },
  {
    name: 'Jordan & Austin',
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
