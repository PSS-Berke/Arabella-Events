import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Wedding Planning Packages | Full, Partial & Day-Of',
  description:
    'Full-service planning and design, partial planning, and month-of coordination for Scottsdale and Sedona weddings. Full service from a $50,000 investment.',
  path: '/services',
});

// Live pairs each video with a copy column: Full is text-left / video-right,
// Partial is video-left / text-right. Raw markup keeps the `muted` attribute in
// SSR HTML (React drops the muted prop, and without it browsers block autoplay
// until hydration).
function VideoBlock({ src, poster, autoplay, loop, className }) {
  const html = `<video src="${src}" poster="${poster}"${autoplay ? ' autoplay muted' : ''}${loop ? ' loop' : ''} playsinline controls preload="metadata" aria-label="Video Player" style="display:block;width:100%;height:100%;object-fit:cover"></video>`;
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function Packages() {
  return (
    <main className="mx-auto max-w-[1000px] px-6 pb-8 pt-12 text-[#443221] md:px-10 md:pb-10 md:pt-[70px]">
      {/* Full: copy left, video right (404x311 at a 72px top offset on live) */}
      <section className="flex flex-col items-center gap-10 pb-[78px] md:flex-row md:items-start md:gap-[29px]">
        <div className="w-full text-center md:w-[542px] md:shrink-0">
          <div className="font-script text-[38px] leading-none sm:text-[44px] md:pl-[36px] md:text-left md:text-[62px]">Full</div>
          <h1 className="mb-[34px] mt-1.5 font-display text-[22px] font-light tracking-[0.13em] sm:text-[27px] md:pl-[36px] md:text-left md:text-[38px] md:tracking-[0.19em]">PLANNING + DESIGN</h1>
          <p className="mx-auto max-w-[760px] text-[13px] font-light uppercase leading-[2.1] tracking-[0.08em] text-pretty md:max-w-[536px] md:tracking-[0.14em]">
            Every wedding is unique, which is why every proposal is thoughtfully tailored to the level of planning, design, and coordination your celebration requires. For couples seeking our signature full-service planning and design experience with a minimum of 50 guests, we recommend a wedding investment beginning around $50,000, allowing us to create a highly personalized celebration with thoughtful details, elevated design, and a seamless guest experience.
          </p>
        </div>
        <VideoBlock
          src="/media/49b5c3_ff293a45593944c0a480183eccc60df8-480p-ba23b20b.mp4"
          poster="/media/49b5c3_ff293a45593944c0a480183eccc60df8f002-a7586541.jpg"
          autoplay
          loop={false}
          className="aspect-[404/311] w-full max-w-[404px] md:mt-[72px] md:w-[404px] md:shrink-0"
        />
      </section>

      {/* Partial: video left (390x355), copy right (578px column) */}
      <section className="flex flex-col items-center gap-10 py-[78px] md:flex-row md:items-start md:gap-[12px]">
        <VideoBlock
          src="/media/49b5c3_d326db7690b1430d9fe14de2a6bb4b92-1080p.mp4"
          poster="/media/49b5c3_d326db7690b1430d9fe14de2a6bb4b92f000-cb0df2e4.jpg"
          autoplay={false}
          loop={false}
          className="order-2 aspect-[390/355] w-full max-w-[390px] md:order-1 md:mt-[79px] md:w-[390px] md:shrink-0"
        />
        <div className="order-1 w-full text-center md:order-2 md:w-[578px] md:shrink-0">
          <div className="font-script text-[38px] leading-none sm:text-[44px] md:text-[62px]">Partial</div>
          <h2 className="mb-[34px] mt-1.5 font-display text-[22px] font-light tracking-[0.13em] sm:text-[27px] md:text-[38px] md:tracking-[0.19em]">PLANNING</h2>
          <ul className="mx-auto flex max-w-[620px] list-none flex-col gap-[14px] p-0 text-left text-[14.5px] font-light tracking-[0.05em] md:max-w-none">
            <li className="flex gap-[14px]"><span>&bull;</span><span>A set number of professional planning hours to use throughout the process</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Planner attendance at select vendor meetings</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Monthly or quarterly planning check-ins</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Budget planning and management support</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Month-of coordination</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Regular reminders and guidance to keep planning on track</span></li>
          </ul>
        </div>
      </section>

      <section className="pb-5 pt-[78px] text-center">
        <div className="font-script text-[38px] leading-none sm:text-[44px] md:text-[62px]">Month-of</div>
        <h2 className="mb-[34px] mt-1.5 font-display text-[22px] font-light tracking-[0.13em] sm:text-[27px] md:text-[38px] md:tracking-[0.19em]">PLANNING</h2>
        <p className="mx-auto mb-10 max-w-[740px] text-left text-[14.5px] font-light leading-[2] tracking-[0.05em] text-pretty">
          Often referred to as <strong className="font-semibold">&ldquo;Day-of Coordination,&rdquo;</strong> our coordination services begin well before the wedding day. An experienced coordinator should never walk into your wedding without already knowing your plans, vendor team, venue, timeline, and the people most important to you. We take the time beforehand to understand every detail so that when your wedding day arrives, we can confidently step in, lead your vendor team, anticipate needs, and allow you to simply enjoy the celebration.
        </p>
        <div className="mx-auto max-w-[740px] text-left text-[14.5px] font-light tracking-[0.05em]">
          <ul className="m-0 flex list-none flex-col gap-[13px] p-0">
            <li className="flex gap-[14px]"><span>&bull;</span><span>For couples who have planned their wedding and are ready to hand over the details, we&apos;ll step in to bring everything together and ensure your celebration runs seamlessly.</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Review your plans, vendor details, and any remaining items</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Finalize outstanding details and logistics</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Create a comprehensive wedding-day timeline</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Coordinate directly with your vendor team</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Lead your wedding rehearsal</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Manage your wedding day from start to finish</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Investment</span></li>
          </ul>

          <p className="mb-[13px] mt-[26px] font-semibold">Month-of Coordination &mdash; $3,000</p>
          <ul className="m-0 flex list-none flex-col gap-[13px] p-0">
            <li className="flex gap-[14px]"><span>&bull;</span><span>We step in one month before your wedding to finalize details, coordinate vendors, create your timeline, and execute your wedding day.</span></li>
          </ul>

          <p className="mb-[13px] mt-[26px] font-semibold">Two-Month Coordination &mdash; $4,000</p>
          <ul className="m-0 flex list-none flex-col gap-[13px] p-0">
            <li className="flex gap-[14px]"><span>&bull;</span><span>We begin two months before your wedding, giving you additional support, guidance, and time to finalize outstanding details before transitioning into full wedding-day coordination.</span></li>
            <li className="flex gap-[14px]"><span>&bull;</span><span>Please inquire for a complete proposal and full list of inclusions.</span></li>
          </ul>
        </div>
      </section>
    </main>
  );
}
