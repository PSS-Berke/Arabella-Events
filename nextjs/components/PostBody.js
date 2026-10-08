// Renders a blog post's simple Markdown (see lib/blog-content.js): "## " and
// "### " headings, "---" dividers, paragraphs split on blank lines, single
// line breaks kept, inline **bold** / *italic*, and photo blocks written as
// ![alt](/media/file.jpg WxH), and video blocks written as
// !video[label](/media/clip.mp4 /media/poster.jpg WxH). Deliberately tiny —
// no HTML passthrough, so post text can never inject markup.
import Image from 'next/image';

const IMG = /^!\[([^\]]*)\]\((\/media\/\S+) (\d+)x(\d+)\)$/;
const VIDEO = /^!video\[([^\]]*)\]\((\/media\/[\w.-]+\.mp4) (\/media\/[\w.-]+\.jpg) (\d+)x(\d+)\)$/;
const BODY = 'text-[15.5px] font-light leading-[2] tracking-[0.03em] text-pretty';

function inline(text, keyBase) {
  const out = [];
  const re = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(
      m[1] != null ? (
        <strong key={`${keyBase}-${m.index}`} className="font-semibold">{m[1]}</strong>
      ) : (
        <em key={`${keyBase}-${m.index}`}>{m[2]}</em>
      )
    );
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function PostBody({ markdown }) {
  const blocks = markdown.trim().split(/\n\s*\n/);
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, n) => {
        const b = block.trim();
        if (b === '---') return <hr key={n} className="my-4 w-full border-0 border-t border-[#e6ddd2]" />;
        if (b.startsWith('### '))
          return (
            <h3 key={n} className="m-0 mt-2 font-display text-[17px] font-light tracking-[0.16em] md:text-[19px]">
              {b.slice(4).toUpperCase()}
            </h3>
          );
        if (b.startsWith('## '))
          return (
            <h2 key={n} className="m-0 mt-6 font-display text-[20px] font-light tracking-[0.14em] md:text-[24px]">
              {b.slice(3).toUpperCase()}
            </h2>
          );
        const lines = b.split('\n');
        // Video block: !video[label](/media/clip.mp4 /media/poster.jpg WxH).
        // Muted, looping and inline, like the gallery clips. Raw markup keeps
        // the `muted` attribute in the server HTML (React drops the prop, and
        // browsers won't autoplay without it). Only /media paths can match.
        const vid = lines.length === 1 && b.match(VIDEO);
        if (vid) {
          const [, label, src, poster, w, h] = vid;
          const html =
            `<video src="${src}" poster="${poster}" autoplay muted loop playsinline controls preload="metadata"` +
            ` aria-label="${label.replace(/"/g, '&quot;')}" style="display:block;width:100%;height:100%;object-fit:cover"></video>`;
          return (
            <div key={n} className="my-4 w-full bg-[#1d1915]" style={{ aspectRatio: `${w} / ${h}` }} dangerouslySetInnerHTML={{ __html: html }} />
          );
        }
        // Photo block: every line is ![alt](/media/file.jpg WxH). One photo is
        // shown full width; two or more sit side by side, two to a row.
        const photos = lines.map((l) => l.trim().match(IMG));
        if (photos.every(Boolean)) {
          return (
            <div key={n} className={`my-4 grid gap-3 ${photos.length > 1 ? 'grid-cols-2' : ''}`}>
              {photos.map(([, alt, src, w, h]) => (
                <Image
                  key={src}
                  src={src}
                  alt={alt}
                  width={Number(w)}
                  height={Number(h)}
                  sizes={photos.length > 1 ? '(min-width: 760px) 340px, 48vw' : '(min-width: 760px) 680px, 100vw'}
                  className="h-auto w-full"
                />
              ))}
            </div>
          );
        }
        return (
          <p key={n} className={`m-0 ${BODY}`}>
            {lines.map((line, i) => (
              <span key={i}>
                {i > 0 ? <br /> : null}
                {inline(line, `${n}-${i}`)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
