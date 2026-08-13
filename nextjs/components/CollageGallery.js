'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { COLLAGE, COLLAGE_IMAGES } from '@/lib/custom-design-content';

// The collage is wider than its 980px reference column — items at left: -388 and
// left: 1080 bleed past both viewport edges (body clips the overflow). On desktop
// the pointer pans the whole stage horizontally so the bled-off edges can be
// brought into view, with a slight vertical drift for depth. Hovering an image
// lifts it above the stack and scales it up while the rest recede.
const EDGES = COLLAGE_IMAGES.reduce(
  (acc, img) => ({
    min: Math.min(acc.min, img.left),
    max: Math.max(acc.max, img.left + img.w),
  }),
  { min: 0, max: COLLAGE.refWidth }
);

const DRIFT_Y = 9; // px of vertical travel at the top/bottom of the viewport
const HOVER_SCALE = 1.055;
const EASE = 0.06; // per-frame approach toward the pointer target

export default function CollageGallery() {
  const stage = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const frame = useRef(0);
  const [hovered, setHovered] = useState(null);
  const [panning, setPanning] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 1024px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    // How far the stage may travel each way: whatever is hidden past that
    // viewport edge, plus a margin so a fully revealed item isn't flush to it.
    let hidden = { left: 0, right: 0 };
    const peek = (px) => (px > 0 ? px + 28 : 0);

    const measure = () => {
      const vw = document.documentElement.clientWidth;
      const originX = (vw - COLLAGE.refWidth) / 2;
      hidden = {
        left: peek(-(originX + EDGES.min)),
        right: peek(originX + EDGES.max - vw),
      };
    };

    const render = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
        current.current = { ...target.current };
        frame.current = 0;
      } else {
        current.current.x += dx * EASE;
        current.current.y += dy * EASE;
        frame.current = requestAnimationFrame(render);
      }
      if (stage.current) {
        stage.current.style.transform = `translate3d(${current.current.x.toFixed(2)}px, ${current.current.y.toFixed(2)}px, 0)`;
      }
    };

    const start = () => {
      if (!frame.current) frame.current = requestAnimationFrame(render);
    };

    const enabled = () => wide.matches && !calm.matches;

    const onMove = (e) => {
      if (!enabled()) return;
      const vw = document.documentElement.clientWidth;
      const tx = Math.min(1, Math.max(0, e.clientX / vw));
      const ty = Math.min(1, Math.max(0, e.clientY / window.innerHeight));
      // Pointer left → pan right to reveal the left bleed, and vice versa.
      target.current.x = hidden.left + (-hidden.right - hidden.left) * tx;
      target.current.y = (0.5 - ty) * 2 * DRIFT_Y;
      start();
    };

    const onLeave = () => {
      target.current = { x: 0, y: 0 };
      start();
    };

    const onChange = () => {
      measure();
      setPanning(enabled());
      if (!enabled()) onLeave();
    };

    measure();
    setPanning(enabled());
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('resize', onChange);
    document.addEventListener('mouseleave', onLeave);
    wide.addEventListener('change', onChange);
    calm.addEventListener('change', onChange);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onChange);
      document.removeEventListener('mouseleave', onLeave);
      wide.removeEventListener('change', onChange);
      calm.removeEventListener('change', onChange);
    };
  }, []);

  return (
    <div
      ref={stage}
      className="mx-auto flex w-full max-w-[420px] flex-col items-center gap-8 px-6 pb-16 pt-10 lg:relative lg:block lg:h-[var(--ch)] lg:w-[var(--cw)] lg:max-w-none lg:p-0 lg:will-change-transform"
      style={{ '--cw': `${COLLAGE.refWidth}px`, '--ch': `${COLLAGE.height}px` }}
    >
      {COLLAGE_IMAGES.map((img, i) => {
        const isImage = !img.kind;
        const lifted = panning && isImage && hovered === img.id;
        return (
          <div
            key={img.id}
            onMouseEnter={isImage ? () => setHovered(img.id) : undefined}
            onMouseLeave={isImage ? () => setHovered(null) : undefined}
            className="w-full max-w-[var(--w)] transition-[transform,filter] duration-700 ease-out lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[var(--w)] lg:max-w-none"
            style={{
              '--w': `${img.w}px`,
              '--l': `${img.left}px`,
              '--t': `${img.top}px`,
              zIndex: lifted ? 999 : img.z,
              transform: lifted ? `scale(${HOVER_SCALE})` : 'scale(1)',
              filter: lifted ? 'drop-shadow(0 12px 26px rgba(82,66,50,.16))' : 'none',
            }}
          >
            {img.kind === 'title' ? (
              // Page title — was a baked PNG alt'd "image.png".
              <h1 className="awe-fit m-0">
                <span className="awe-caps awe-cd-caps">{img.caps}</span>
                <span className="awe-caps awe-script awe-cd-script text-right">{img.script}</span>
              </h1>
            ) : img.kind === 'offerings' ? (
              // Offerings list — static on live, so no link here either.
              <div className="awe-fit">
                <h2 className="awe-caps awe-script awe-inq-script m-0">{img.script}</h2>
                <ul className="awe-caps awe-inq-list m-0 mt-[6%] list-none p-0">
                  {img.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <Image
                src={img.src}
                alt={img.alt}
                width={img.w}
                height={img.h}
                sizes={`(min-width: 1024px) ${Math.round(img.w * HOVER_SCALE)}px, calc(100vw - 48px)`}
                priority={i === 0}
                className="h-auto w-full"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
