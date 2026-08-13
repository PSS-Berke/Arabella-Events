// Live nav is TWO stacked rows (row 1: 3 items at 17px, row 2: 4 items at 16px).
export const NAV_PRIMARY = [
  { label: 'WELCOME', href: '/' },
  { label: 'PACKAGES', href: '/services' },
  { label: 'CUSTOM DESIGN | STATIONARY', href: '/custom-design-stationary-rentals' },
];

export const NAV_SECONDARY = [
  { label: 'ABOUT AWE + TEAM', href: '/arabella' },
  { label: 'KIND WORDS', href: '/love-notes' },
  { label: 'GALLERY', href: '/gallery' },
  { label: 'CONTACT', href: '/contact' },
];

export const NAV = [...NAV_PRIMARY, ...NAV_SECONDARY];

export const INSTAGRAM_URL = 'https://www.instagram.com/arabellasweddingsandevents/reel/DJ1yKcDuiaI/';

// All assets are mirrored locally in public/media (see public/media/manifest.json
// for the original wixstatic source URL of every file).
export const IMG = {
  logo: '/media/Arabella-s-2--6f7587cd.png',            // wordmark, crop x_0,y_307,w_1391,h_552
  monogram: '/media/Arabella-s-2--033071cd.png',        // square AWE monogram crop
  tagline: '/media/49b5c3_2a88b2d97adc4fe7bb0062f3d413f668-31ca82ef.png',   // "ARIZONA – WORLDWIDE" strip
  emailStrip: '/media/49b5c3_ceee96ab5a7343a7b166e2df13da99ee-16d5ebeb.png', // "ARABELLA@ARABELLASWEDDINGS.COM" strip
  instagramIcon: '/media/e1aa082f7c0747168d9cf43e77046142-9141c435.png',
  hero: '/media/49b5c3_2594b8f5133a4b30826bb1707628f8b4-7f045c26.jpg',      // red tablescape (full res)
  about: '/media/Beige-Red-Simple-Elegant-Events-Planner-Service-Prom-35a48799.jpg', // "A Few Favorites" canvas (hi-res)
  trio1: '/media/tlaquepaque-sedona-arizona-vintage-bride-groom-portr-b78c6dd3.jpg',
  trio2: '/media/49b5c3_ad51ba93092b4571b2048241aa0a5980-bfd6a849.png',
  trio3: '/media/IMG_6623_edited_edited-76d37357.jpg',
  // Homepage baked text/graphic strips (all rendered as images on live).
  introLine: '/media/49b5c3_9da301652cd44ca4897be1a72c0bfe11-e7c50983.png',     // intro sentence strip, 665x45 display
  glowBanner: '/media/ChatGPT-Image-Aug-6-2026-01_57_24-PM-b90b6be9.png',       // glowing AWE banner, 367x150 display, overlaps hero bottom
  eyeHeading: '/media/49b5c3_20fa9ea5f5f54878bac3dcfde002d8d9-2243ff68.png',    // "AN EYE FOR WHAT COULD BE" strip, 447x33 display
  visionTagline: '/media/49b5c3_ce166e7c936340fe8935f8ecf6eca940-8c732380.png', // "SHARE THE VISION..." strip, 600x50 display
  aweExperience: '/media/49b5c3_8609e0f749fc44fabf1ae6769cfdc7bc-0d0e335f.png', // "THE AWE experience" graphic, 332x170 display
};

// Homepage bio ("An Eye for What Could Be") — matches the live baked-image copy verbatim.
export const ABOUT_PARAS = [
  "I spent years learning how to transform traditional hotel ballrooms into spaces that felt anything but ordinary. And while working among the resorts of Las Vegas, I began to realize that what drew me to this industry was never simply the event itself—it was the possibility of what a space, a detail, or an idea could become.",
  "I found inspiration everywhere. In the grandeur of stained glass inside historic cathedrals. In the artistry that transforms the Bellagio Conservatory with every season. In the idea that something extraordinary can begin with something as small as a single spark.",
  "That perspective has stayed with me throughout my career: there is always an opportunity to create something remarkable.",
  "It’s also why I believe the greatest luxury a planner can offer is trust. You shouldn’t spend your engagement managing endless follow-ups, questioning every logistical decision, or carrying hundreds of tiny details in the back of your mind.",
  "When you entrust those details to someone who understands your vision, you give yourself the freedom to experience it.",
];

// The 5 homepage-carousel testimonials (REVIEWS[0..4] match live slides 1-5).
// The dedicated /love-notes page has 12 — see lib/love-notes-content.js.
export const REVIEWS = [
  "YES YES YES! Arabella is THE person to work with! It’s a leap of faith to entrust someone you don’t know with one of the most special days of your life, but my goodness, is it worth the jump with Arabella. There aren’t enough words to express my gratitude. I first called Arabella the day before I got engaged, so she truly was with us from the very start. She handled everything so beautifully, from the design, to vendor relations, to answering my every whim and request with nothing but joy and ease. She never made me feel that anything I wanted was impossible or too much. She took a vision I couldn’t quite put into words and brought it to life in a way that was better than I could have ever imagined. Even the day of, she handled major issues and obstacles without my knowledge as I got to bask in wedded bliss. Arabella’s expertise, professionalism, and experience are evident in everything she does. Greater than that, she truly is one of the kindest and most genuine people I’ve ever met. We are honored to have spent this season with her and if we could start it all over we would book her again in an instant!",
  "Arabella was an absolute standout as our wedding planner, and we can’t say enough about how grateful we are for her. From the very beginning, she demonstrated incredible organization and thoughtful planning, anticipating needs and potential obstacles long before they ever crossed our minds. Her attention to detail gave us so much confidence leading up to the wedding day. On the day itself, Arabella was truly the key piece that made everything run seamlessly. She took charge as the main point of contact between all of our vendors, ensuring every single person was on the same page and that the timeline stayed perfectly on track. If anything came up behind the scenes, we never knew about it because she already had it handled. What meant the most to us was her presence during moments when we couldn’t be there to oversee setup. She made sure every element was exactly where it needed to be, bringing our vision to life down to the smallest detail. Thanks to her we were able to actually enjoy our wedding day without worrying about anything. Arabella made it possible for us to fully immerse ourselves in the celebration, stress-free, and that alone made her worth her weight in gold. We truly couldn’t imagine our wedding day without her, and we recommend her wholeheartedly to any couple looking for someone who will go above and beyond to make their day perfect.",
  "Arabella was my planner for my October wedding, and she was absolutely incredible! She took so much stress off my shoulders in the weeks leading up to the big day, helping organize every last detail and ensuring nothing was overlooked. She handled all the vendor communication seamlessly, which allowed me to truly relax and enjoy the process. I was even her first trial with a wedding mirror, and it turned out amazing - such a beautiful, personalized touch! Thanks to Arabella, my wedding day was completely stress-free and everything went perfectly. Above all, she is such a sweet and genuine person, I can tell she loves what she does. I can’t recommend her enough!",
  "Hiring Arabella as our coordinator was one of the best decisions we made! She was calm, organized, and truly went above and beyond to make sure everything ran perfectly. From managing vendors to keeping us on schedule, Arabella handled every detail with ease and professionalism. Thanks to her, our day was completely stress-free  everything flowed seamlessly, and we were able to just enjoy every moment. Our guests and family kept commenting on how smooth the day felt, and that was all because of Arabella’s hard work behind the scenes. If you’re looking for someone who will bring your vision to life and make your wedding day effortless, Arabella is the one!",
  "Arabella was an absolute dream to work with! She handled everything with such grace, after we switched venues a few months before our special day. She was able to bring my fairy garden dream wedding to life and I couldn't imagine our day being half as beautiful without her touch. She is such a kind and genuine soul and I would recommend her to anyone looking for guidance with their wedding.",
];
