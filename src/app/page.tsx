import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import Social from "@/components/page/Home/Social";
import Work from "@/components/page/Home/Work";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <Main
      title="About me"
      createdAt={new Date(2025, 12, 19)}
      updatedAt={new Date(2025, 12, 22)}
    >
      <Section subtitle="Who am I?" title="In my own words">
        <p className="text-lg">
          Hey! I&apos;m Charles.{" "}
          <i>
            Although you may know me as{" "}
            <Link
              href="https://www.youtube.com/@axxo1337"
              className="underline text-[#317FFB]"
            >
              aXXo
            </Link>
          </i>
          . As of writing this I&apos;m a 19 year old male living in the French
          province of{" "}
          <Link
            href="https://en.wikipedia.org/wiki/Quebec"
            className="underline text-[#317FFB]"
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
        <div className="grid md:grid-cols-2 gap-8">
          <Work
            title="Virtual Memory Explained"
            description="What are memory pages? What exactly is an address space? Well that's what you'll learn today!"
            thumbnailPath="/images/thumbnails/virtual-memory-explained.png"
            createdAt={new Date(2025, 4, 19)}
            type="video"
            href="/video/virtual-memory-explained"
          />
          <Work
            title="AntiDebug"
            description="A simple terminal interface tool to test Windows x86_64 anti-debugging techniques."
            thumbnailPath="/images/thumbnails/antidebug.png"
            createdAt={new Date(2025, 7, 10)}
            type="tool"
            href="/project/antidebug"
          />
        </div>
        <hr className="my-6 border-white/20" />
        <div className="text-2xl flex items-center justify-between">
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
          <Social
            href="https://www.youtube.com/@axxo1337"
            title="YouTube"
            iconPath="/images/socials/youtube.png"
          />
          <Social
            href="https://www.instagram.com/axxo1337"
            title="Instagram"
            iconPath="/images/socials/instagram.png"
          />
          <Social
            href="https://www.reddit.com/r/aXXo/"
            title="Reddit"
            iconPath="/images/socials/reddit.png"
          />
          <Social
            href="https://discord.gg/tdEAJU2XwZ"
            title="Discord (apply to join)"
            iconPath="/images/socials/discord.png"
          />
          <Social
            href="https://github.com/axxo1337"
            title="Github"
            iconPath="/images/socials/github.png"
          />
        </ul>
      </Section>
    </Main>
  );
}
