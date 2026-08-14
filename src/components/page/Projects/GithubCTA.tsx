import Image from "next/image";
import Link from "next/link";

//
// [SECTION] Content
//

export default function GithubCTA() {
  return (
    <div className="relative isolate group flex flex-col items-center gap-5 overflow-hidden rounded-2xl border border-white/20 px-3 py-7 text-center sm:gap-6 sm:py-10 sm:px-7 blured-bg">
      <span className="text-2xl md:text-4xl font-semibold">Checkout my Github!</span>
      <p className="text-white/70 md:text-lg md:w-[70%]">You may find more of what I make in my Github repositories.</p>
      <Link
        href="https://github.com/axxo1337"
        className="flex items-center gap-2.5 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-sm hover:bg-blue-500 transition-colors"
      >
        <Image src="/images/socials/github.webp" alt="Github" width={20} height={20} />
        Go to Github
      </Link>
      <Image
        src="/images/jack.webp"
        alt="Mascot"
        width={160}
        height={204.33}
        className="absolute sm:block hidden -z-10 -bottom-10.5 group-hover:-bottom-8 left-3 md:-bottom-15.5 md:left-10 w-30 md:w-40 md:group-hover:-bottom-11.5 select-none pointer-events-none brightness-50 transition-all group-hover:brightness-85 ease-in-out"
      />
    </div>
  );
}
