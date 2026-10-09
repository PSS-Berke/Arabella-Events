import Image from 'next/image';

// A blog post's cover photo, or, when a couple's photos aren't public yet
// (`cover: null` in lib/blog-content.js), a soft "photos coming soon" panel
// in the same 4:5 frame.
export default function PostCover({ post, sizes, className = '', priority = false }) {
  if (!post.cover) {
    return (
      <div className={`flex aspect-[4/5] w-full flex-col items-center justify-center bg-[#f3ece3] px-6 text-center text-[#443221] ${className}`}>
        <span className="font-script text-[40px] leading-none text-[#9a8158] md:text-[48px]">photos</span>
        <span className="mt-2 font-display text-[14px] uppercase tracking-[0.26em] md:text-[16px]">Coming soon</span>
      </div>
    );
  }
  return (
    <Image
      src={post.cover.src}
      alt={post.cover.alt}
      width={post.cover.width}
      height={post.cover.height}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
