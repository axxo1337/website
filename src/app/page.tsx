import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import Socials from "@/components/page/Home/Socials";
import Work from "@/components/page/Home/Work";
import { getContentMetadata, ContentType } from "@/lib/server/mdx";
import Image from "next/image";
import Link from "next/link";

//
// [SECTION] Defines
//

const bestCreationsKeys: { contentType: ContentType; slug: string }[] = [
  { contentType: "video", slug: "windows-internals-explained" },
  { contentType: "project", slug: "haxo-games" },
];

//
// [SECTION] Content
//

export default async function Home() {
  return (
    <Main title="About me" createdAt={new Date("2025-12-19")} updatedAt={new Date("2026-08-14")}>
      <Image
        alt="aXXo banner - Software engineering and cybersecurity"
        src="/images/banner.webp"
        width={960}
        height={224}
        priority
        className="mt-5 md:mt-8 rounded-md border-2"
      />
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
          (Canada). I&apos;ve been doing independent software engineering and cybersecurity for almost 7 years now, although,
          nowadays, I spend most of my time in this space working on video projects and studying for university.
        </p>
      </Section>
      <Section subtitle="What have I made?" title="Some of my work">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {bestCreationsKeys.map(({ contentType, slug }, index) => {
            const metadata = getContentMetadata(contentType, slug);
            if (!metadata) return null;

            return (
              <Work
                key={`bestCreation-${index}`}
                title={metadata.title}
                status={metadata.status}
                description={metadata.description || ""}
                type={contentType}
                href={`/${contentType}/${slug}`}
                createdAt={new Date(metadata.createdAt)}
                thumbnailPath={metadata.thumbnailPath || null}
                categories={metadata.categories}
              />
            );
          })}
        </div>
        <hr className="my-4 md:my-6 border-white/20" />
        <div className="text-xl md:text-2xl">
          <span>
            See more of my{" "}
            <Link href="/videos" className="inline-anchor">
              videos
            </Link>{" "}
            or{" "}
            <Link href="/projects" className="inline-anchor">
              projects
            </Link>
            .
          </span>
        </div>
      </Section>
      {/*
      <Section subtitle="What am I up to?" title="Beyond the character">
        <p>I don&apos;t know what to put there just yet, but I&apos;ll think of something soon trust.</p>
      </Section>
      */}
      <Socials />
    </Main>
  );
}
