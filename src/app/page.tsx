import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import Socials from "@/components/page/Home/Socials";
import Work, { WorkProps } from "@/components/page/Home/Work";
import { getContentMetadata, ContentType } from "@/lib/server/mdx";
import { MoveRight } from "lucide-react";
import Link from "next/link";

//
// [SECTION] Defines
//

const bestCreationsKeys: { contentType: ContentType; slug: string }[] = [
  { contentType: "video", slug: "windows-internals-explained" },
  { contentType: "project", slug: "antidebug" },
];

//
// [SECTION] Content
//

export default async function Home() {
  const bestCreations: WorkProps[] = bestCreationsKeys
    .map(({ contentType, slug }) => {
      const metadata = getContentMetadata(contentType, slug);
      if (!metadata) return null;

      return {
        title: metadata.title,
        status: metadata.status,
        description: metadata.description || "",
        type: metadata.type || (contentType === "video" ? "video" : "tool"),
        href: `/${contentType}/${slug}`,
        createdAt: new Date(metadata.createdAt),
        thumbnailPath: metadata.thumbnailPath || null,
      } as WorkProps;
    })
    .filter((work): work is WorkProps => work !== null);

  return (
    <Main title="About me" createdAt={new Date(2025, 11, 19)} updatedAt={new Date(2026, 7, 8)}>
      <Section subtitle="Who am I?" title="In my own words">
        <p>
          Hey! I&apos;m Charles.{" "}
          <i>
            Although you may know me as{" "}
            <Link href="https://www.youtube.com/@axxo1337" className="inline-anchor">
              aXXo
            </Link>
            .
          </i>{" "}
          As of writing this, I&apos;m a 20 year old living in the French province of{" "}
          <Link href="https://en.wikipedia.org/wiki/Quebec" className="inline-anchor">
            Quebec
          </Link>{" "}
          (Canada). I've been doing independent software engineering and cybersecurity for almost 7 years now, although,
          nowadays, I spend most of my time in this space working on video projects and studying for university.
        </p>
      </Section>
      <Section subtitle="What do I make?" title="Some of my work">
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
            <Link href="/videos" className="hover-underline hover:text-white/80 transition-colors">
              Videos
            </Link>
            <Link href="/projects" className="hover-underline hover:text-white/80 transition-colors">
              Projects
            </Link>
          </div>
        </div>
      </Section>
      <Socials />
    </Main>
  );
}
