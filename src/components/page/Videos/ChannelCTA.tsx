import TexturedContainer from "@/components/ui/TexturedContainer";
import Image from "next/image";
import Link from "next/link";

//
// [SECTION] Content
//

export default function ChannelCTA() {
  return (
    <TexturedContainer className="relative isolate group flex flex-col items-center gap-5 px-3 py-7 text-center sm:gap-6 sm:py-10 sm:px-7 blured-bg">
      <span className="text-2xl md:text-4xl font-semibold">I have more!</span>
      <p className="text-white/70 md:text-lg md:w-[70%]">See my full channel page for yourself.</p>
      <Link
        href="https://www.youtube.com/@axxo1337/videos"
        className="flex items-center gap-2.5 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-sm hover:bg-blue-500 transition-colors"
      >
        <Image src="/images/socials/youtube.webp" alt="" width={20} height={20} aria-hidden="true" />
        Go to YouTube
      </Link>
      <Image
        src="/images/timmy.webp"
        alt=""
        aria-hidden="true"
        width={160}
        height={204.33}
        className="absolute sm:block hidden -z-10 -bottom-10.5 group-hover:-bottom-8 right-3 md:-bottom-15.5 md:right-10 w-30 md:w-40 md:group-hover:-bottom-11.5 select-none pointer-events-none brightness-50 transition-all group-hover:brightness-85 ease-in-out"
      />
    </TexturedContainer>
  );
}
