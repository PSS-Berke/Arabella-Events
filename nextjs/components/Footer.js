import Image from 'next/image';
import { IMG, INSTAGRAM_URL } from '@/lib/content';

// Live footer order (QA-verified against the Wix mesh): AWE monogram centered
// on top (201px, overlapping ~37px toward the email row), then the email strip
// image with the Instagram icon just right of it. Email is a baked image on
// live, not a mailto link.
export default function Footer() {
  return (
    <footer className="flex flex-col items-center bg-white px-6 pb-[54px] pt-[76px]">
      <Image src={IMG.monogram} alt="AWE monogram" width={402} height={402} className="-mb-[37px] h-auto w-[201px]" />
      <div className="flex w-full max-w-[660px] items-center justify-center gap-[10px]">
        <Image src={IMG.emailStrip} alt="arabella@arabellasweddings.com" width={840} height={46} className="h-auto w-full max-w-[600px]" />
        <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" className="shrink-0">
          <Image src={IMG.instagramIcon} alt="Instagram" width={78} height={78} className="h-auto w-[39px]" />
        </a>
      </div>
    </footer>
  );
}
