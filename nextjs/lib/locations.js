/*
 * Content for the two location landing pages.
 *
 * These are the commercial entry points for the search strategy: Scottsdale is
 * the volume market and the realistic map-pack play, Sedona is a destination
 * market won on organic content rather than proximity.
 *
 * The two pages deliberately share no prose. Thin, near-duplicate location
 * pages are actively discounted by Google, so each one is written from the
 * planning realities of its own market — resort logistics and summer heat in
 * Scottsdale, permits and elevation in Sedona.
 *
 * Accuracy note: the venue sections describe venues factually as a guide to the
 * market. They do not claim Arabella has worked at every one. The only venue
 * named from her own portfolio is Tlaquepaque, which appears in the homepage
 * gallery. Anything stronger needs her confirmation before it goes live.
 */

export const SCOTTSDALE = {
  slug: '/scottsdale-wedding-planner',
  city: 'Scottsdale',
  region: 'AZ',
  script: 'Scottsdale',
  h1: 'WEDDING PLANNER',
  title: 'Scottsdale Wedding Planner | Luxury Planning & Design',
  description:
    'Luxury wedding planning, design, and coordination in Scottsdale and Paradise Valley. Resort weddings at El Chorro, Royal Palms, and The Boulders.',
  intro: [
    'Scottsdale weddings are resort weddings. The desert does the work — Camelback and the McDowells hold the horizon, the light goes gold an hour before sunset, and the architecture is built to sit inside it rather than compete. What that setting asks of a planner is precision: resort venues run on banquet event orders, load-in windows, and noise ordinances, and the difference between a celebration that feels effortless and one that feels managed is almost always decided weeks before anyone arrives.',
    'That is the part of this work I know best. Before planning independently I spent years inside hospitality — MGM Resorts International, InterContinental, Hilton, Legends — including a stretch as Wedding Manager for one of Las Vegas’s premier outdoor venues, running celebrations from first inquiry through the last song. I know how a resort operates from the other side of the table, which is why my couples never have to translate between their vision and the venue’s operations.',
  ],
  venuesHeading: 'THE VENUES THAT DEFINE SCOTTSDALE',
  venuesIntro:
    'A short guide to the rooms and lawns this market is known for, and what each one actually asks of a wedding day.',
  venues: [
    {
      name: 'El Chorro',
      where: 'Paradise Valley',
      note: 'A Valley institution with Camelback framed behind the lawn. Historic Casa Paloma, an open lawn, and a garden patio with a fireplace — a venue that reads as classic rather than trend-led, and photographs the same way in twenty years.',
    },
    {
      name: 'Royal Palms Resort & Spa',
      where: 'Camelback corridor',
      note: 'Spanish-revival architecture, candlelit walkways, and the Jardin D’Amore courtyard. The most Mediterranean setting in the Valley, and the one that most rewards a restrained design hand — the venue is already doing a great deal.',
    },
    {
      name: 'The Boulders Resort & Spa',
      where: 'North Scottsdale',
      note: 'Ceremonies at Promise Rock, set among twelve-million-year-old formations. Dramatic and genuinely intimate at once, though the north Scottsdale drive is worth building into the guest timeline.',
    },
    {
      name: 'Andaz Scottsdale Resort & Bungalows',
      where: 'Paradise Valley',
      note: 'Twenty-three acres against Camelback, with the cactus-lined Cholla Lawn, the smaller Studio Lawn, and the Foundry Ballroom with its shaded terrace. The most flexible footprint in the market for a celebration that moves between spaces.',
    },
  ],
  practicalHeading: 'PLANNING A SCOTTSDALE WEDDING',
  practical: [
    {
      h: 'The season runs October through May',
      p: 'Peak season is autumn through late spring, and the best venues release those dates twelve to eighteen months ahead. June through September is genuinely hot — triple digits are normal — which does not rule out a summer wedding but does mean an indoor ceremony, a late start, or both, and a frank conversation about guest comfort.',
    },
    {
      h: 'Resort venues run on paperwork',
      p: 'Banquet event orders, minimum spends, preferred-vendor lists, load-in windows, and amplified-sound cutoffs all sit behind the brochure. Reading those documents properly — and negotiating the handful of clauses that actually matter — is where a planner earns their fee before the wedding week begins.',
    },
    {
      h: 'Build the timeline around the light',
      p: 'Desert sunset light is short and spectacular. Ceremonies generally want to end thirty to forty-five minutes before sunset so portraits land in it, which means the whole day’s timeline is set by an astronomical fact rather than a preference.',
    },
    {
      h: 'Most guests are travelling',
      p: 'Scottsdale is a destination for a large share of any guest list, even when the couple lives here. Room blocks, welcome events, airport logistics, and a weekend rather than a single evening are the norm, and they are best designed together rather than bolted on.',
    },
  ],
  faqs: [
    {
      q: 'How much does a wedding planner cost in Scottsdale?',
      a: 'Planning fees in the Scottsdale market typically run from around $2,000 for day-of coordination to $6,500 and up for full-service planning. Our full-service planning and design is built for celebrations with a wedding investment beginning around $50,000 and a minimum of 50 guests. Partial planning and month-of coordination are available for couples who have already done more of the work themselves.',
    },
    {
      q: 'When should we book a Scottsdale wedding planner?',
      a: 'For a peak-season date between October and May, twelve to eighteen months ahead is realistic — planners and the best venues book on similar timelines. For month-of coordination, six to nine months out is usually sufficient, though earlier is always better if your date falls in high season.',
    },
    {
      q: 'What is the best month to get married in Scottsdale?',
      a: 'October through May offers the most reliable weather, with November, March, and April the most sought-after. Summer weddings are possible but need an indoor ceremony or a late start, since daytime temperatures regularly exceed 100°F between June and September.',
    },
    {
      q: 'Do you plan weddings outside Scottsdale?',
      a: 'Yes. We work throughout Arizona — Paradise Valley, Phoenix, Cave Creek, Sedona, and Flagstaff — and travel for destination celebrations.',
    },
  ],
};

export const SEDONA = {
  slug: '/sedona-wedding-planner',
  city: 'Sedona',
  region: 'AZ',
  script: 'Sedona',
  h1: 'WEDDING PLANNER',
  title: 'Sedona Wedding Planner | Luxury Destination Weddings',
  description:
    'Destination wedding planning and design in Sedona, Arizona. Red rock ceremonies, Forest Service permits, and weddings at Tlaquepaque and Enchantment.',
  intro: [
    'Sedona is not a smaller Scottsdale. It sits at about 4,500 feet, which makes it materially cooler than the Valley, and most of the land that makes it beautiful is not private — it belongs to the Coconino National Forest or to Arizona State Parks. That single fact reshapes the whole planning process: the ceremony site you fell in love with on a hike is probably a permit application, not a booking.',
    'It is also one of the most rewarding places in the country to marry. The rocks turn deep red in the last forty minutes of daylight, the creek runs cold under the sycamores, and a celebration here tends to become a weekend rather than an evening. We have planned and designed in Sedona — including at Tlaquepaque — and the work rewards a planner who has already learned where the constraints actually are.',
  ],
  venuesHeading: 'WHERE SEDONA WEDDINGS HAPPEN',
  venuesIntro:
    'The settings this market is known for, and the practical shape of a celebration at each.',
  venues: [
    {
      name: 'Tlaquepaque Arts & Crafts Village',
      where: 'Central Sedona',
      note: 'Sycamore-shaded courtyards, stucco arches, and tiled fountains — closer to Guadalajara than to Arizona. Four distinct spaces suiting roughly 45 to 100 guests, and the most architecturally characterful setting in town.',
    },
    {
      name: 'L’Auberge de Sedona',
      where: 'Oak Creek',
      note: 'Creekside ceremonies directly beneath the sycamores, with the sound of Oak Creek underneath the vows. Intimate by nature, and the setting least dependent on the red rocks for its atmosphere.',
    },
    {
      name: 'Enchantment Resort',
      where: 'Boynton Canyon',
      note: 'Held inside a box canyon with red walls on three sides. Outdoor terraces and indoor ballrooms, and the most complete resort infrastructure in Sedona for a multi-day guest experience.',
    },
    {
      name: 'Public-land ceremony sites',
      where: 'Coconino National Forest',
      note: 'Cathedral Rock and the other well-known overlooks are Forest Service land. Spectacular, and entirely governed by permit — see below, because this is where most Sedona plans go wrong.',
    },
  ],
  practicalHeading: 'WHAT PLANNING IN SEDONA ACTUALLY INVOLVES',
  practical: [
    {
      h: 'Public land means permits',
      p: 'Most of the iconic ceremony locations sit on Coconino National Forest or state park land and require a special-use permit. Fees are usually modest; the timeline is not. Popular sites book out months in advance, and for a spring date the application should be moving at least six months ahead. A permit also carries conditions — group size caps, no amplified sound, parking limits — that quietly determine what kind of ceremony is even possible.',
    },
    {
      h: 'Elevation changes the weather',
      p: 'At 4,500 feet Sedona runs considerably cooler than Phoenix and Scottsdale. April, May, September, and October are the strongest months: warm days, genuinely cool evenings, and low monsoon risk. July and August bring afternoon thunderstorms, and winter can dust the red rocks with snow — beautiful, and worth planning for rather than around.',
    },
    {
      h: 'The light sets the timeline',
      p: 'Sedona’s sunsets are the reason people come. Ceremonies generally want to conclude thirty to forty-five minutes before sunset so portraits catch the rocks at full colour. Since sunset moves by more than two hours across the year, the ceremony time follows the date rather than the other way around.',
    },
    {
      h: 'Everyone is travelling, including the vendors',
      p: 'Sedona has a small vendor pool for a market of its profile, and a great many teams drive up from the Valley. Travel time, load-in windows on narrow roads, and limited nearby accommodation all need designing into the schedule. So does the guest experience — almost nobody attends a Sedona wedding as a day trip.',
    },
  ],
  faqs: [
    {
      q: 'Do you need a permit to get married in Sedona?',
      a: 'For ceremonies on public land — which includes Cathedral Rock and most of the well-known red rock overlooks — yes. These sites fall under the Coconino National Forest or Arizona State Parks and require a special-use permit, with conditions on group size, amplified sound, and parking. Private venues such as Tlaquepaque, L’Auberge de Sedona, and Enchantment Resort do not require one. Permits for popular sites book out months ahead, so a spring date should be in process at least six months in advance.',
    },
    {
      q: 'What is the best time of year for a Sedona wedding?',
      a: 'April, May, September, and October are the strongest months — warm days, cool evenings, and a low chance of monsoon storms. March and November work well at slightly cooler temperatures. July and August bring afternoon thunderstorms and heat, and winter offers more availability along with the possibility of snow on the red rocks.',
    },
    {
      q: 'Can you plan a Sedona wedding if we live out of state?',
      a: 'Yes — most Sedona weddings are destination weddings, and the majority of our couples plan from elsewhere. We handle venue and vendor sourcing, site visits, permit applications, and the full guest-weekend experience, so the planning does not depend on you being here.',
    },
    {
      q: 'How far is Sedona from Phoenix and Scottsdale?',
      a: 'Roughly two hours by car from Phoenix Sky Harbor. Flagstaff is about 45 minutes away and has a small regional airport. Most guests fly into Phoenix and drive up, which is worth building into the welcome-event timing on the first evening.',
    },
  ],
};

export const LOCATIONS = [SCOTTSDALE, SEDONA];
