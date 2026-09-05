import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import Socials from "@/components/page/Home/Socials";
import Work from "@/components/page/Home/Work";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageViewer from "@/components/ui/ImageViewer";
import LottiePlayer from "@/components/ui/LottiePlayer";
import TexturedContainer from "@/components/ui/TexturedContainer";
import { getContentMetadata, ContentType } from "@/lib/server/mdx";
import Image from "next/image";
import Link from "next/link";

//
// [SECTION] Defines
//

const bestCreationsKeys: { contentType: ContentType; slug: string }[] = [
  { contentType: "video", slug: "windows-internals-explained" },
  { contentType: "project", slug: "antidebug" },
  { contentType: "project", slug: "haxo-games" },
  { contentType: "video", slug: "virtual-memory-explained" },
];

//
// [SECTION] Content
//

export default async function Home() {
  return (
    <Main title="About me" createdAt={new Date("2025-12-19")} updatedAt={new Date("2026-09-04")}>
      <TexturedContainer className="mt-5 md:mt-6">
        <AspectRatio ratio={960 / 224} className="relative">
          <LottiePlayer
            src="/animations/banner/data.lottie"
            containerClassName="absolute inset-0 w-full h-full"
            previewAlt="Banner animation preview"
            autoplay
            loop={false}
          />
          <Image alt="Banner background" width={960} height={240} src="/animations/banner/background.webp" />
        </AspectRatio>
      </TexturedContainer>

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
                animationPath={metadata.animationPath || null}
                animationPreview={metadata.animationPreview || null}
                animationBackground={metadata.animationBackground || null}
                animationBackgroundColor={metadata.animationBackgroundColor || null}
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
      <Section subtitle="What am I up to?" title="Beyond the character">
        <p>
          At the moment, I'm doing mandatory prerequisite courses to enroll into a mechanical engineering program in university.
        </p>
        <p className="mt-3">
          This may seem random, but I did have some previous exposure to robotics when I was younger. Our HS offered a
          parascholar program which allowed us to take part in Vex, FRC and FTC competitions.
        </p>
        <div className="mt-4 flex gap-6 md:flex-row flex-col">
          <div className="flex flex-col items-center shrink-0">
            <ImageViewer src="/images/vex.png" alt="Vex 2023 competition robot">
              <TexturedContainer className="relative">
                <img
                  src="/images/vex.png"
                  alt="Vex 2023 competition robot"
                  loading="lazy"
                  decoding="async"
                  className="rounded-lg h-auto w-76"
                />
              </TexturedContainer>
            </ImageViewer>
            <span className="text-sm text-white/50 mt-1.5 italic">Vex 2023 competition robot</span>
          </div>
          <div className="w-full h-full flex flex-col items-center">
            <TexturedContainer className="w-full h-[329.33px] bg-[#171717] flex items-center justify-center">
              <i className="text-white/70">Image coming soon...</i>
            </TexturedContainer>
            <span className="text-sm text-white/50 mt-1.5 italic">FRC shooter</span>
          </div>
        </div>
        <p className="mt-3">
          As you can see, my team wasn&apos;t necessarily great xD Also I won&apos;t lie, I was doing C++ programming most of
          the time, but it didn&apos;t stop me from growing an interest and learning about other things.
        </p>
        <p className="mt-3">Hopefully, as my career progresses I'll be able to add more interesting things to this section.</p>
      </Section>
      <Socials />
    </Main>
  );
}
