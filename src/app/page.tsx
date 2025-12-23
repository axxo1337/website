import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import Social from "@/components/page/Home/Social";
import Work from "@/components/page/Home/Work";
import { MoveRight } from "lucide-react";
import Link from "next/link";

//
// [SECTION] Defines
//

const socials = [
  {
    href: "https://www.youtube.com/@axxo1337",
    title: "YouTube",
    iconPath: "/images/socials/youtube.png",
  },
  {
    href: "https://www.instagram.com/axxo1337",
    title: "Instagram",
    iconPath: "/images/socials/instagram.png",
  },
  {
    href: "https://www.reddit.com/r/aXXo/",
    title: "Reddit",
    iconPath: "/images/socials/reddit.png",
  },
  {
    href: "https://discord.gg/tdEAJU2XwZ",
    title: "Discord (apply to join)",
    iconPath: "/images/socials/discord.png",
  },
  {
    href: "https://github.com/axxo1337",
    title: "Github",
    iconPath: "/images/socials/github.png",
  },
];

const bestCreations: TWork[] = [
  {
    title: "Virtual Memory Explained",
    description:
      "What are memory pages? What exactly is an address space? Well that's what you'll learn today!",
    thumbnailPath: "/images/thumbnails/virtual-memory-explained.png",
    createdAt: new Date(2025, 4, 19),
    type: "video",
    href: "/video/virtual-memory-explained",
  },
  {
    title: "AntiDebug",
    description:
      "A simple terminal interface tool to test Windows x86_64 anti-debugging techniques.",
    thumbnailPath: "/images/thumbnails/antidebug.png",
    createdAt: new Date(2025, 7, 10),
    type: "tool",
    href: "/project/antidebug",
  },
];

//
// [SECTION] Content
//

export default function Home() {
  return (
    <Main
      title="About me"
      createdAt={new Date(2025, 12, 19)}
      updatedAt={new Date(2025, 12, 22)}
    >
      <Section subtitle="Who am I?" title="In my own words">
        <p className="md:text-lg">
          Hey! I&apos;m Charles.{" "}
          <i>
            Although you may know me as{" "}
            <Link
              href="https://www.youtube.com/@axxo1337"
              className="inline-anchor"
            >
              aXXo
            </Link>
          </i>
          . As of writing this I&apos;m a 19 year old male living in the French
          province of{" "}
          <Link
            href="https://en.wikipedia.org/wiki/Quebec"
            className="inline-anchor"
          >
            Quebec
          </Link>{" "}
          (Canada). I make videos in my free time purely out of the joy I get
          from teaching people. This might be why my content is so chaotic lol.
          I don&apos;t really have a goal with any of this. My current vision is
          to earn a degree in mechanical engineering, and yet I find myself
          making videos about computer...
        </p>
      </Section>
      <Section subtitle="What do I make?" title="My best work">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {bestCreations.map((bestCreation, bestCreationIndex) => (
            <Work key={`bestCreation-${bestCreationIndex}`} {...bestCreation} />
          ))}
        </div>
        <hr className="my-4 md:my-6 border-white/20" />
        <div className="text-xl md:text-2xl flex items-center justify-between">
          <span className="flex items-center gap-3">
            Or see everything <MoveRight />
          </span>
          <div className="flex items-center gap-6">
            <Link href="/videos" className="hover:underline">
              Videos
            </Link>
            <Link href="/projects" className="hover:underline">
              Projects
            </Link>
          </div>
        </div>
      </Section>
      <Section subtitle="How to reach me?" title="My social media">
        <ul className="flex flex-wrap gap-6 gap-y-4">
          {socials.map((social, socialIndex) => (
            <Social key={`social-${socialIndex}`} {...social} />
          ))}
        </ul>
      </Section>
    </Main>
  );
}

//
// [SECTION] Types
//

type TWork = {
  title: string;
  description: string;
  type: "video" | "tool" | "library";
  href: string;
  createdAt: Date;
  thumbnailPath: string;
};
