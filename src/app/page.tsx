import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import Socials from "@/components/page/Home/Socials";
import Work from "@/components/page/Home/Work";
import { MoveRight } from "lucide-react";
import Link from "next/link";

//
// [SECTION] Defines
//

const bestCreations: TWork[] = [
  {
    title: "Virtual Memory Explained",
    description: "What are memory pages? What exactly is an address space? Well that's what you'll learn today!",
    thumbnailPath: "/images/thumbnails/virtual-memory-explained.png",
    createdAt: new Date(2025, 4, 19),
    type: "video",
    href: "/video/virtual-memory-explained",
  },
  {
    title: "AntiDebug",
    description: "A simple terminal interface tool to test Windows x86_64 anti-debugging techniques.",
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
    <Main title="About me" createdAt={new Date(2025, 11, 19)} updatedAt={new Date(2026, 2, 21)}>
      <Section subtitle="Who am I?" title="In my own words">
        <p>
          Hey! I&apos;m Charles.{" "}
          <i>
            Although you may know me as{" "}
            <Link href="https://www.youtube.com/@axxo1337" className="inline-anchor">
              aXXo
            </Link>
          </i>
          . As of writing this I&apos;m a 20 year old male living in the French province of{" "}
          <Link href="https://en.wikipedia.org/wiki/Quebec" className="inline-anchor">
            Quebec
          </Link>{" "}
          (Canada). I make videos in my free time purely out of the joy I get from teaching people. I don&apos;t have a specific
          goal with any of this. It&apos;s just a pass time I love working on.
        </p>
      </Section>
      <Section subtitle="What do I make?" title="My best work">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {bestCreations.map((bestCreation, bestCreationIndex) => (
            <Work key={`bestCreation-${bestCreationIndex}`} {...bestCreation} />
          ))}
        </div>
        <hr className="my-4 md:my-6 border-white/20" />
        <p className="text-xl sm:hidden">
          Or see all{" "}
          <Link href="/videos" className="inline-anchor">
            Videos
          </Link>{" "}
          and{" "}
          <Link href="/projects" className="inline-anchor">
            Projects
          </Link>
        </p>
        <div className="hidden sm:flex text-xl md:text-2xl items-center justify-between">
          <span className="flex items-center gap-3">
            Or see everything <MoveRight />
          </span>
          <div className="flex items-center gap-6">
            <Link href="/videos" className="hover-underline">
              Videos
            </Link>
            <Link href="/projects" className="hover-underline">
              Projects
            </Link>
          </div>
        </div>
      </Section>
      <Socials />
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
