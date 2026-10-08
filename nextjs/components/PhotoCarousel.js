'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Full-screen photo carousel (lightbox). `photos` is [{ src, alt }]; opens at
// `start`. Arrows, swipe, ← / → / Esc keys, and thumbnails when there's more
// than one photo. Locks page scroll while open and returns focus on close.
export default function PhotoCarousel({ photos, start = 0, title, onClose }) {
  const [i, setI] = useState(start);
  const closeRef = useRef(null);
  const touchX = useRef(null);
  const many = photos.length > 1;
  const go = useCallback((d) => setI((n) => (n + d + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    const prevFocus = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight' && many) go(1);
      else if (e.key === 'ArrowLeft' && many) go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      prevFocus?.focus?.();
    };
  }, [go, many, onClose]);

  const photo = photos[i];
  const arrow =
    'absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center border-0 bg-black/30 text-[28px] leading-none text-white transition-colors hover:bg-black/50';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photos`}
      className="fixed inset-0 z-[60] flex flex-col bg-[#1d1915]/95 text-white"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <p className="m-0 text-[12px] font-light uppercase tracking-[0.18em]">
          {title}
          {many ? ` · ${i + 1} / ${photos.length}` : ''}
        </p>
        <button
          ref={closeRef}
          type="button"
          aria-label="Close photos"
          onClick={onClose}
          className="h-10 w-10 cursor-pointer border-0 bg-transparent text-[30px] leading-none text-white"
        >
          &times;
        </button>
      </div>

      <div
        className="relative mx-4 flex-1 md:mx-16"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (!many || touchX.current == null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        <Image key={photo.src} src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" />
        {many ? (
          <>
            <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className={`${arrow} left-0`}>
              &#8249;
            </button>
            <button type="button" aria-label="Next photo" onClick={() => go(1)} className={`${arrow} right-0`}>
              &#8250;
            </button>
          </>
        ) : null}
      </div>

      {many ? (
        <div className="flex justify-center gap-2 overflow-x-auto px-4 py-4">
          {photos.map((p, n) => (
            <button
              key={p.src}
              type="button"
              aria-label={`Show photo ${n + 1}`}
              aria-current={n === i}
              onClick={() => setI(n)}
              className={`relative h-14 w-14 shrink-0 cursor-pointer overflow-hidden border-2 bg-white p-0 transition-opacity ${n === i ? 'border-white opacity-100' : 'border-transparent opacity-50 hover:opacity-80'}`}
            >
              <Image src={p.src} alt="" fill sizes="56px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : (
        <div className="h-6" />
      )}
    </div>
  );
}
