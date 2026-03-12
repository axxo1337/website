import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import YouTubeVideo from "@/components/page/Projects/YouTubeVideo";
import SubscribeCTA from "@/components/page/Videos/SubscribeCTA";
import ContentNavigation from "@/components/ui/ContentNavigation";
import TableOfContents from "@/components/ui/TableOfContents";
import { contentExists, getAdjacentContent, MDXMetadata } from "@/lib/server/mdx";
import { Metadata } from "next";
import { notFound } from "next/navigation";

//
// [SECTION] Content
//

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (!contentExists("video", slug)) {
    return {};
  }

  const post = await import(`@/app/(videos)/video/[slug]/${slug}.mdx`);
  const metadata: MDXMetadata = post.metadata;
  const thumbnailUrl = metadata.thumbnailPath || "/images/seo/og-image.png";

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.tags,
    openGraph: {
      type: "video.other",
      title: metadata.title,
      description: metadata.description,
      url: `https://axxowastaken.me/video/${slug}`,
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: `${metadata.title} thumbnail`,
        },
      ],
      videos: metadata.youtubeId
        ? [
            {
              url: `https://www.youtube.com/watch?v=${metadata.youtubeId}`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "player",
      title: metadata.title,
      description: metadata.description,
      images: [thumbnailUrl],
      players: metadata.youtubeId
        ? {
            playerUrl: `https://www.youtube.com/embed/${metadata.youtubeId}`,
            streamUrl: `https://www.youtube.com/watch?v=${metadata.youtubeId}`,
            width: 1280,
            height: 720,
          }
        : undefined,
    },
  };
}

export default async function VideoPage({ params }: Props) {
  const { slug } = await params;

  if (!contentExists("video", slug)) {
    notFound();
  }

  const post = await import(`@/app/(videos)/video/[slug]/${slug}.mdx`);
  const MDXContent = post.default;
  const metadata: MDXMetadata = post.metadata;
  const { prev, next } = await getAdjacentContent("video", slug);

  return (
    <Main title={metadata.title} createdAt={new Date(metadata.createdAt)} updatedAt={new Date(metadata.updatedAt)}>
      <div>
        <YouTubeVideo className="mt-8 md:mt-14" id={metadata.youtubeId} thumbnailPath={metadata.thumbnailPath} />
      </div>
      <Section subtitle="What's this video about?" title="Overview">
        <div>
          <MDXContent />
        </div>
      </Section>
      <TableOfContents />
      <ContentNavigation contentType="video" prev={prev} next={next} />
      <hr className="mb-4 mt-10 w-full border-white/20" />
      <SubscribeCTA />
    </Main>
  );
}

//
// [SECTION] Types
//

interface Props {
  params: Promise<{ slug: string }>;
}
