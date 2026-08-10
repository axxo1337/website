import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import ChannelCTA from "@/components/page/Videos/ChannelCTA";
import Video from "@/components/page/Videos/Video";
import { getAllContentMetadata, getMostRecentUpdate } from "@/lib/server/mdx";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

//
// [SECTION] Defines
//

export const metadata: Metadata = {
  title: "Videos",
};

//
// [SECTION] Content
//

export default async function Videos() {
  const videos = await getAllContentMetadata("video");
  const mostRecentUpdate = getMostRecentUpdate(videos);

  return (
    <Main title="Videos" createdAt={new Date("2025-12-22")} updatedAt={mostRecentUpdate}>
      <Section title="Library">
        <p>
          This page doesn&apos;t list ALL of my videos, but you can find some of my most recent here. Clicking any of them will
          direct you to another page dedicated to directing you to the actual video, but also to providing an overview of its
          contents through some sort of blog post.
        </p>
        <hr className="my-4 md:my-6 border-white/20" />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {videos.map((video, videoIndex) => (
            <Video
              key={`video-${videoIndex}`}
              title={video.title}
              description={video.description as string}
              createdAt={new Date(video.createdAt)}
              thumbnailPath={video.thumbnailPath}
              href={`/video/${video.slug}`}
              status={video.status}
              categories={video.categories}
            />
          ))}
        </div>
        <hr className="my-4 md:my-6 border-white/20" />
        <ChannelCTA />
      </Section>
    </Main>
  );
}
