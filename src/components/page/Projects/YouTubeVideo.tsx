import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

export default function YouTubeVideo({
  id,
  title = "YouTube video player",
  autoplay = false,
  mute = false,
  controls = true,
  startTime,
  thumbnailPath,
  className,
}: YouTubeVideoProps) {
  const params = new URLSearchParams();

  if (autoplay) params.set("autoplay", "1");
  if (mute) params.set("mute", "1");
  if (!controls) params.set("controls", "0");
  if (startTime) params.set("start", startTime.toString());

  params.set("rel", "0");
  params.set("modestbranding", "1");

  const embedUrl = `https://www.youtube.com/embed/${id}?${params.toString()}`;

  return (
    <div className={className}>
      <div className="relative w-full overflow-hidden rounded-md border-2 border-white/20 aspect-video">
        {id ? (
          <iframe
            src={embedUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <AspectRatio ratio={16 / 9} className="bg-black relative">
            <Image
              fill
              alt={title}
              src={thumbnailPath ?? ""}
              draggable="false"
              className="blur-sm brightness-50 select-none"
            />
            <span className="absolute left-1/2 top-1/2 -translate-1/2 font-medium text-2xl text-center">
              This video isn&apos;t released yet.
            </span>
          </AspectRatio>
        )}
      </div>
    </div>
  );
}

interface YouTubeVideoProps {
  id?: string | null;
  thumbnailPath?: string;
  title?: string;
  autoplay?: boolean;
  mute?: boolean;
  controls?: boolean;
  startTime?: number;
  className?: string;
}
