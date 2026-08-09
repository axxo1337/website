import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import Video from "@/components/page/Videos/Video";
import { getAllContentMetadata } from "@/lib/server/mdx";
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
  const videos = (await getAllContentMetadata("video")).sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const mostRecentUpdate = videos.reduce((latest, video) => {
    const videoUpdate = new Date(video.updatedAt);
    return videoUpdate > latest ? videoUpdate : latest;
  }, new Date(0));

  return (
    <Main title="Videos" createdAt={new Date(2025, 11, 22)} updatedAt={mostRecentUpdate}>
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
        <Link
          href="https://www.youtube.com/@axxo1337"
          className="rounded-lg border border-white/20 p-3 justify-between blured-bg flex items-center group"
        >
          <div className="flex items-center gap-3">
            <Image alt="YouTube Logo" src="/images/socials/youtube.webp" className="size-6 md:size-8" width={32} height={32} />
            <div className="flex flex-col">
              <p>To see more of my videos you should check my full YouTube page ;)</p>
            </div>
          </div>
          <span className="inline-anchor text-sm flex items-center gap-1">
            Click to open <ArrowRight size={20} />
          </span>
        </Link>
      </Section>
    </Main>
  );
}
