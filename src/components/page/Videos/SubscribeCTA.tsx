import Image from "next/image";
import Link from "next/link";

//
// [SECTION] Content
//

export default function SubscribeCTA() {
  return (
    <div className="relative isolate mt-10 sm:mt-12 group flex flex-col items-center gap-5 overflow-hidden rounded-2xl border border-white/20 px-3 py-7 text-center sm:gap-6 sm:py-10 sm:px-7 blured-bg">
      <span className="text-2xl md:text-4xl font-semibold">Enjoying my work?</span>
      <p className="text-white/70 md:text-lg md:w-[70%]">Subscribe to my YouTube for high-quality videos and to support me!</p>
      <Link
        href="https://www.youtube.com/@axxo1337?sub_confirmation=1"
        className="flex items-center gap-2.5 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-sm hover:bg-blue-500 transition-colors"
      >
        <Image src="/images/socials/youtube.webp" alt="" width={20} height={20} aria-hidden="true" />
        Subscribe
      </Link>
      <Image
        src="/images/axxo_blue.webp"
        alt=""
        aria-hidden="true"
        width={160}
        height={204.33}
        className="absolute -z-10 -bottom-11.5 -left-7.5 sm:-bottom-15.5 sm:-left-10.5 w-30 sm:w-40 sm:group-hover:-left-9 sm:group-hover:-bottom-13 rotate-45 select-none pointer-events-none brightness-50 transition-all group-hover:brightness-85 ease-in-out"
      />
    </div>
  );
}
