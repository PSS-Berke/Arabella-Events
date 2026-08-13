import Image from 'next/image';
import {
  GALLERY_ITEMS,
  GALLERY_COLUMN,
  GALLERY_CANVAS_HEIGHT,
} from '@/lib/gallery-content';

export const metadata = {
  title: "GALLERY | Arabella's Weddings & Events | AWE",
  alternates: { canonical: '/gallery' },
  openGraph: { url: '/gallery', siteName: "Arabella's Weddings & Events | AWE ", type: 'website' },
};

// Live renders both players as muted, autoplaying Wix video players with
// controls. Raw markup (dangerouslySetInnerHTML) is used so the `muted`
// attribute is present in the server-rendered HTML — React does not serialize
// the muted prop, and without it browsers block autoplay until hydration.
function GalleryVideo({ src, poster, loop, style }) {
  const html = `<video src="${src}" poster="${poster}"${loop ? ' loop' : ''} autoplay muted playsinline controls preload="metadata" aria-label="Video Player" style="display:block;width:100%;height:100%;object-fit:cover"></video>`;
  return <div style={style} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function GalleryPage() {
  return (
    <main className="bg-white">
      {/* Desktop: exact live collage — freeform boxes positioned around the
          centered 980px column; edges extend beyond it and clip at narrower
          viewports, exactly as on live. No heading, no captions, no links. */}
      <div
        className="relative hidden overflow-hidden lg:block"
        style={{ height: GALLERY_CANVAS_HEIGHT }}
      >
        <div
          className="absolute inset-y-0 left-1/2"
          style={{ width: GALLERY_COLUMN, marginLeft: -GALLERY_COLUMN / 2 }}
        >
          {GALLERY_ITEMS.map((item, i) =>
            item.type === 'video' ? (
              <GalleryVideo
                key={i}
                src={item.src}
                poster={item.poster}
                loop={item.loop}
                style={{
                  position: 'absolute',
                  left: item.d.x,
                  top: item.d.y,
                  width: item.d.w,
                  height: item.d.h,
                }}
              />
            ) : (
              <Image
                key={i}
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                priority={i < 5}
                sizes={`${item.d.w}px`}
                className="absolute object-cover"
                style={{
                  left: item.d.x,
                  top: item.d.y,
                  width: item.d.w,
                  height: item.d.h,
                }}
              />
            )
          )}
        </div>
      </div>

      {/* Mobile / tablet: stacked layout — hero video full-width, then the
          photos (and the second video) in a 2-column masonry in live DOM order. */}
      <div className="px-2 pb-6 pt-2 lg:hidden">
        <GalleryVideo
          src={GALLERY_ITEMS[0].src}
          poster={GALLERY_ITEMS[0].poster}
          loop={GALLERY_ITEMS[0].loop}
          style={{ marginBottom: 8, aspectRatio: '16 / 9' }}
        />
        <div className="columns-2 gap-2">
          {GALLERY_ITEMS.slice(1).map((item, i) =>
            item.type === 'video' ? (
              <GalleryVideo
                key={i}
                src={item.src}
                poster={item.poster}
                loop={item.loop}
                style={{ marginBottom: 8, breakInside: 'avoid', aspectRatio: '16 / 9' }}
              />
            ) : (
              <Image
                key={i}
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                sizes="50vw"
                className="mb-2 h-auto w-full break-inside-avoid"
              />
            )
          )}
        </div>
      </div>
    </main>
  );
}
