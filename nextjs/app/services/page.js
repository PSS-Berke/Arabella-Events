export const metadata = { title: "PACKAGES | Arabella's Weddings & Events | AWE" };

export default function Packages() {
  return (
    <main className="mx-auto max-w-[1000px] px-6 pb-8 pt-12 md:px-10 md:pb-10 md:pt-[70px]">
      <section className="border-b border-rule pb-[78px] text-center">
        <div className="font-script text-[38px] leading-none text-script sm:text-[44px] md:text-[62px]">Full</div>
        <h2 className="mb-[34px] mt-1.5 font-display text-[22px] font-light tracking-[0.13em] sm:text-[27px] md:text-[38px] md:tracking-[0.19em]">PLANNING + DESIGN</h2>
        <p className="mx-auto max-w-[760px] text-[13px] font-light uppercase leading-[2.1] tracking-[0.08em] text-cocoa text-pretty md:tracking-[0.14em]">
          Every wedding is unique, which is why every proposal is thoughtfully tailored to the level of planning, design, and coordination your celebration requires. For couples seeking our signature full-service planning and design experience with a minimum of 50 guests, we recommend a wedding investment beginning around $50,000, allowing us to create a highly personalized celebration with thoughtful details, elevated design, and a seamless guest experience.
        </p>
      </section>

      <section className="border-b border-rule py-[78px] text-center">
        <div className="font-script text-[38px] leading-none text-script sm:text-[44px] md:text-[62px]">Partial</div>
        <h2 className="mb-[34px] mt-1.5 font-display text-[22px] font-light tracking-[0.13em] sm:text-[27px] md:text-[38px] md:tracking-[0.19em]">PLANNING</h2>
        <ul className="mx-auto flex max-w-[620px] list-none flex-col gap-[14px] p-0 text-left text-[14.5px] font-light tracking-[0.05em] text-cocoa">
          <li className="flex gap-[14px]"><span className="text-brass">&bull;</span><span>A set number of professional planning hours to use throughout the process</span></li>
          <li className="flex gap-[14px]"><span className="text-brass">&bull;</span><span>Planner attendance at select vendor meetings</span></li>
          <li className="flex gap-[14px]"><span className="text-brass">&bull;</span><span>Monthly or quarterly planning check-ins</span></li>
          <li className="flex gap-[14px]"><span className="text-brass">&bull;</span><span>Budget planning and management support</span></li>
          <li className="flex gap-[14px]"><span className="text-brass">&bull;</span><span>Month-of coordination</span></li>
          <li className="flex gap-[14px]"><span className="text-brass">&bull;</span><span>Regular reminders and guidance to keep planning on track</span></li>
        </ul>
      </section>

      <section className="pb-5 pt-[78px] text-center">
        <div className="font-script text-[38px] leading-none text-script sm:text-[44px] md:text-[62px]">Month-of</div>
        <h2 className="mb-[34px] mt-1.5 font-display text-[22px] font-light tracking-[0.13em] sm:text-[27px] md:text-[38px] md:tracking-[0.19em]">PLANNING</h2>
        <p className="mx-auto mb-10 max-w-[740px] text-left text-[14.5px] font-light leading-[2] tracking-[0.05em] text-cocoa text-pretty">
          Often referred to as <strong className="font-medium">&ldquo;Day-of Coordination,&rdquo;</strong> our coordination services begin well before the wedding day. An experienced coordinator should never walk into your wedding without already knowing your plans, vendor team, venue, timeline, and the people most important to you. We take the time beforehand to understand every detail so that when your wedding day arrives, we can confidently step in, lead your vendor team, anticipate needs, and allow you to simply enjoy the celebration.
        </p>
        <ul className="mx-auto flex max-w-[740px] list-none flex-col gap-[13px] p-0 text-left text-[14.5px] font-light tracking-[0.05em] text-cocoa">
          <li className="flex gap-[14px]"><span className="text-brass">&bull;</span><span>For couples who have planned their wedding and are ready to hand over the details, we&apos;ll step in to bring everything together and ensure your celebration runs seamlessly.</span></li>
          <li className="flex gap-[14px]"><span className="text-brass">&bull;</span><span>Review your plans, vendor details, and any remaining items</span></li>
          <li className="flex gap-[14px]"><span className="text-brass">&bull;</span><span>Finalize outstanding details and logistics</span></li>
          <li className="flex gap-[14px]"><span className="text-brass">&bull;</span><span>Create a comprehensive wedding-day timeline</span></li>
          <li className="flex gap-[14px]"><span className="text-brass">&bull;</span><span>Coordinate directly with your vendor team</span></li>
          <li className="flex gap-[14px]"><span className="text-brass">&bull;</span><span>Lead your wedding rehearsal</span></li>
          <li className="flex gap-[14px]"><span className="text-brass">&bull;</span><span>Manage your wedding day from start to finish</span></li>
        </ul>

        <div className="mx-auto mt-[52px] flex max-w-[740px] flex-col gap-[34px] text-left">
          <div>
            <div className="mb-3 font-display text-[24px] tracking-[0.12em]">MONTH-OF COORDINATION &mdash; $3,000</div>
            <p className="m-0 text-[14.5px] font-light leading-[1.95] tracking-[0.05em] text-cocoa">We step in one month before your wedding to finalize details, coordinate vendors, create your timeline, and execute your wedding day.</p>
          </div>
          <div>
            <div className="mb-3 font-display text-[24px] tracking-[0.12em]">TWO-MONTH COORDINATION &mdash; $4,000</div>
            <p className="m-0 text-[14.5px] font-light leading-[1.95] tracking-[0.05em] text-cocoa">We begin two months before your wedding, giving you additional support, guidance, and time to finalize outstanding details before transitioning into full wedding-day coordination.</p>
          </div>
          <p className="m-0 text-center font-display text-[15px] tracking-[0.14em] text-taupe md:text-[18px]">PLEASE INQUIRE FOR A COMPLETE PROPOSAL AND FULL LIST OF INCLUSIONS.</p>
        </div>
      </section>
    </main>
  );
}
