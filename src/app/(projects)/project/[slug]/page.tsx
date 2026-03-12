import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import SubscribeCTA from "@/components/page/Videos/SubscribeCTA";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ContentNavigation from "@/components/ui/ContentNavigation";
import TableOfContents from "@/components/ui/TableOfContents";
import { contentExists, getAdjacentContent, MDXMetadata } from "@/lib/server/mdx";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

//
// [SECTION] Content
//

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (!contentExists("project", slug)) {
    return {};
  }

  const post = await import(`@/app/(projects)/project/[slug]/${slug}.mdx`);
  const metadata: MDXMetadata = post.metadata;
  const thumbnailUrl = metadata.thumbnailPath || "/images/seo/og-image.png";

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.tags,
    authors: [{ name: "aXXo" }],
    openGraph: {
      type: "article",
      title: metadata.title,
      description: metadata.description,
      url: `https://axxowastaken.me/project/${slug}`,
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: `${metadata.title} thumbnail`,
        },
      ],
      publishedTime: metadata.createdAt,
      modifiedTime: metadata.updatedAt,
      authors: ["aXXo"],
      tags: metadata.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [thumbnailUrl],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  if (!contentExists("project", slug)) {
    notFound();
  }

  const post = await import(`@/app/(projects)/project/[slug]/${slug}.mdx`);
  const MDXContent = post.default;
  const metadata: MDXMetadata = post.metadata;
  const { prev, next } = await getAdjacentContent("project", slug);

  return (
    <Main title={metadata.title} createdAt={new Date(metadata.createdAt)} updatedAt={new Date(metadata.updatedAt)}>
      <div className="mt-8 md:mt-14 overflow-hidden rounded-md border-2 border-white/20">
        <AspectRatio ratio={16 / 9}>
          <Image alt="thumbnail" className="object-cover" src={metadata.thumbnailPath as string} fill />
        </AspectRatio>
      </div>
      <Section subtitle="What's this project about?" title="Overview">
        <div>
          <MDXContent />
        </div>
      </Section>
      <TableOfContents />
      <ContentNavigation contentType="project" prev={prev} next={next} />
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
