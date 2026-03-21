import Image from "next/image";
import Link from "next/link";

//
// [SECTION] Content
//

export default function SubscribeCTA() {
  return (
    <div className="relative isolate mt-12 flex flex-col items-center gap-5 overflow-hidden rounded-2xl border border-white/10 px-3 py-7 text-center sm:gap-6 sm:py-10 sm:px-7">
      <span className="text-2xl md:text-4xl font-semibold">Enjoying my work?</span>
      <p className="text-white/70 md:text-lg md:w-[70%]">
        Subscribe to my YouTube for high-quality videos and to support me!
      </p>
      <Link
        href="https://www.youtube.com/@axxo1337?sub_confirmation=1"
        className="flex items-center gap-2.5 rounded-lg bg-red-600 px-5 py-3 font-semibold text-sm hover:bg-red-500 transition-colors"
      >
        <Image src="/images/socials/youtube.png" alt="YouTube" width={20} height={20} />
        Subscribe
      </Link>
      <div className="absolute inset-0 -z-10 bg-white/3" />
    </div>
  );
}
