import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
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
      <Section subtitle="What do I make?" title="My best work"></Section>
      <Section subtitle="How to reach me?" title="My social media"></Section>
    </Main>
  );
}
