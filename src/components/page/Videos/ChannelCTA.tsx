import Image from "next/image";
import Link from "next/link";

//
// [SECTION] Content
//

export default function ChannelCTA() {
  return (
    <div className="relative isolate group flex flex-col items-center gap-5 overflow-hidden rounded-2xl border border-white/20 px-3 py-7 text-center sm:gap-6 sm:py-10 sm:px-7 blured-bg">
      <span className="text-2xl md:text-4xl font-semibold">I have more!</span>
      <p className="text-white/70 md:text-lg md:w-[70%]">See my full channel page for yourself.</p>
      <Link
        href="https://www.youtube.com/@axxo1337/videos"
        className="flex items-center gap-2.5 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-sm hover:bg-blue-500 transition-colors"
      >
        <Image src="/images/socials/youtube.webp" alt="YouTube" width={20} height={20} />
        Go to YouTube
      </Link>
    </div>
  );
}
