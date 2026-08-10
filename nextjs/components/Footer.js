import Image from 'next/image';
import { IMG } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-[22px] px-6 pt-[76px] pb-[54px]">
      <a href="mailto:arabella@arabellasweddings.com" className="break-words text-center font-display text-[14px] tracking-[0.16em] md:text-[19px] md:tracking-[0.28em]">
        ARABELLA@ARABELLASWEDDINGS.COM
      </a>
      <Image src={IMG.monogram} alt="AWE monogram" width={402} height={402} className="h-auto w-[150px]" />
      <a href="https://www.instagram.com/arabellasweddingsandevents/" target="_blank" rel="noreferrer" className="text-[11px] font-light tracking-[0.26em] text-taupe">
        INSTAGRAM
      </a>
    </footer>
  );
}
