import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import SubscribeCTA from "@/components/page/Videos/SubscribeCTA";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ContentNavigation from "@/components/ui/ContentNavigation";
import PostStatusIndicator from "@/components/ui/PostStatusIndicator";
import TableOfContents from "@/components/ui/TableOfContents";
import JsonLd from "@/components/ui/JsonLd";
import { getProjectJsonLd } from "@/lib/server/jsonld";
import { contentExists, getAdjacentContent, getContentMetadata, getContentSlugs, MDXMetadata } from "@/lib/server/mdx";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

//
// [SECTION] Content
//

export async function generateStaticParams() {
  const slugs = getContentSlugs("project");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (!contentExists("project", slug)) {
    return {};
  }

  const post = await import(`@/app/(projects)/project/[slug]/${slug}.mdx`);
  const metadata: MDXMetadata = post.metadata;

  if (metadata.status === "DRAFT") {
    return {};
  }

  const thumbnailUrl = metadata.thumbnailPath || "/images/seo/og-image.webp";

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.tags,
    authors: [{ name: "aXXo" }],
    alternates: {
      canonical: `/project/${slug}`,
    },
    openGraph: {
      type: "article",
      title: metadata.title,
      description: metadata.description,
      url: `/project/${slug}`,
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
  const contentMetadata = getContentMetadata("project", slug);

  if (metadata.status === "DRAFT" && process.env.NODE_ENV === "production") {
    notFound();
  }

  const { prev, next } = await getAdjacentContent("project", slug);

  return (
    <Main
      title={metadata.title}
      createdAt={new Date(metadata.createdAt)}
      updatedAt={new Date(metadata.updatedAt)}
      readingTime={contentMetadata?.readingTime}
    >
      <JsonLd schema={getProjectJsonLd({ ...metadata, slug })} />
      <PostStatusIndicator status={metadata.status} />
      <div className="mt-8 md:mt-14 overflow-hidden rounded-md border-2 border-white/20">
        {metadata.thumbnailPath ? (
          <AspectRatio ratio={16 / 9}>
            <Image alt="thumbnail" className="object-cover" src={metadata.thumbnailPath} fill />
          </AspectRatio>
        ) : (
          <AspectRatio ratio={16 / 9} className="bg-black relative">
            <span className="absolute left-1/2 top-1/2 -translate-1/2 font-medium text-xl sm:text-2xl text-center">
              This project has no thumbnail yet.
            </span>
          </AspectRatio>
        )}
      </div>
      <Section subtitle="What's this project about?" title="Overview">
        <div>
          <MDXContent />
        </div>
      </Section>
      <TableOfContents />
      <ContentNavigation contentType="project" prev={prev} next={next} />
      <hr className="mt-8 sm:mt-10 w-full border-white/20" />
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
