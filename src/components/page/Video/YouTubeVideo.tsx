"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import YouTube, { YouTubeProps } from "react-youtube";

export default function YouTubeVideo({ id }: YouTubeVideo) {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <AspectRatio
      ratio={16 / 9}
      className="mt-12 md:mt-14 overflow-hidden rounded-md border-2 border-white/20"
    >
      <YouTube
        videoId={id}
        opts={opts}
        onReady={onPlayerReady}
        className="absolute top-0 left-0 w-full h-full"
        iframeClassName="w-full h-full"
      />
    </AspectRatio>
  );
}

interface YouTubeVideo {
  id: string;
}
