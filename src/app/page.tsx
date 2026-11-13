import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import Socials from "@/components/page/Home/Socials";
import Work from "@/components/page/Home/Work";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageViewer from "@/components/ui/ImageViewer";
import LottiePlayer from "@/components/ui/LottiePlayer";
import TexturedContainer from "@/components/ui/TexturedContainer";
import { getContentMetadata, ContentType } from "@/lib/server/mdx";
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

function BannerBackground() {
  return (
    <svg
      width="960"
      height="224"
      viewBox="0 0 960 224"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_10376_1608)">
        <rect width="960" height="224" fill="#101010" />
        <g opacity="0.2">
          <rect
            width="960"
            height="224"
            fill="url(#paint0_linear_10376_1608)"
          />
          <path
            d="M285.5 132.641C207.9 129.041 62.8333 141.475 0 148.141V224.641H960V188.935C366.536 127.662 382.391 137.136 285.5 132.641Z"
            fill="url(#paint1_linear_10376_1608)"
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_10376_1608"
          x1="388"
          y1="112"
          x2="1389.5"
          y2="-414"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4C81F1" />
          <stop offset="1" stopColor="#2C4A8B" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_10376_1608"
          x1="408"
          y1="162.141"
          x2="408"
          y2="378.141"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7FA326" />
          <stop offset="1" stopColor="#303D0E" />
        </linearGradient>
        <clipPath id="clip0_10376_1608">
          <rect width="960" height="224" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default async function Home() {
  return (
    <Main
      title="About me"
      createdAt={new Date("2025-12-19")}
      updatedAt={new Date("2026-11-13")}
    >
      <TexturedContainer className="mt-5 md:mt-6">
        <AspectRatio ratio={960 / 224} className="relative">
          <LottiePlayer
            src="/animations/banner/clouds.lottie"
            containerClassName="absolute inset-0 w-full h-full"
            previewAlt="Banner animation clouds"
            autoplay
            loop={true}
          />
          <LottiePlayer
            src="/animations/banner/data.lottie"
            containerClassName="absolute inset-0 w-full h-full"
            previewAlt="Banner animation"
            autoplay
            loop={true}
          />
          <BannerBackground />
        </AspectRatio>
      </TexturedContainer>

      <Section subtitle="Who am I?" title="In my own words">
        <p>
          Hey! I&apos;m Charles.{" "}
          <i>
            Although you may know me as{" "}
            <Link
              href="https://www.youtube.com/@axxo1337"
              className="inline-anchor"
            >
              aXXo
            </Link>
            .
          </i>{" "}
          As of writing this, I&apos;m a 20 year old living in the French
          province of{" "}
          <Link
            href="https://en.wikipedia.org/wiki/Quebec"
            className="inline-anchor"
          >
            Quebec
          </Link>{" "}
          (Canada). I&apos;ve been doing independent software engineering and
          cybersecurity for almost 7 years now, although, nowadays, I spend most
          of my time in this space working on video projects and studying for
          university.
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
                animationBackgroundColor={
                  metadata.animationBackgroundColor || null
                }
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
          At the moment, I&apos;m doing mandatory prerequisite courses to enroll
          into a mechanical engineering program in university.
        </p>
        <p className="mt-3">
          This may seem random, but I did have some previous exposure to
          robotics when I was younger. Our HS offered a parascholar program
          which allowed us to take part in{" "}
          <a className="inline-anchor" href="https://www.vexrobotics.com/">
            Vex
          </a>
          ,{" "}
          <a className="inline-anchor" href="https://firstroboticscanada.org/">
            FRC
          </a>{" "}
          and{" "}
          <a
            className="inline-anchor"
            href="https://www.firstinspires.org/programs/ftc/"
          >
            FTC
          </a>{" "}
          competitions.
        </p>
        <div className="mt-4 flex gap-6 md:gap-8 md:flex-row flex-col">
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
            <span className="text-sm text-white/50 mt-1.5 italic">
              Vex 2023 competition robot
            </span>
          </div>
          <div className="w-full h-full flex flex-col items-center">
            <TexturedContainer className="w-full h-[329.33px] bg-[#171717] flex items-center justify-center">
              <i className="text-white/70">Image coming soon...</i>
            </TexturedContainer>
            <span className="text-sm text-white/50 mt-1.5 italic">
              FRC shooter
            </span>
          </div>
        </div>
        <p className="mt-3">
          As you can see, my team wasn&apos;t necessarily the best, but we were
          decent. Also I won&apos;t lie, I was doing C++ programming most of the
          time, but it didn&apos;t stop me from growing an interest and learning
          about other things.
        </p>
        <p className="mt-3">
          Hopefully, as my career progresses I&apos;ll be able to add more
          interesting things to this section.
        </p>
      </Section>
      <Socials />
    </Main>
  );
}
