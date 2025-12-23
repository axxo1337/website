import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import YouTubeVideo from "@/components/page/Video/YouTubeVideo";
import { contentExists, MDXMetadata } from "@/lib/server/mdx";
import { notFound } from "next/navigation";

export default async function VideoPage({ params }: Props) {
  const { slug } = await params;

  if (!contentExists("video", slug)) {
    notFound();
  }

  const post = await import(`@/app/(videos)/video/[slug]/${slug}.mdx`);
  const MDXContent = post.default;
  const metadata: MDXMetadata = post.metadata;

  return (
    <Main
      title={metadata.title}
      createdAt={new Date(metadata.createdAt)}
      updatedAt={new Date(metadata.updatedAt)}
    >
      <YouTubeVideo id="ultz9m0n0GE" />
      <Section subtitle="What's this video about?" title="Overview">
        <div>
          <MDXContent />
        </div>
      </Section>
    </Main>
  );
}

interface Props {
  params: Promise<{ slug: string }>;
}
