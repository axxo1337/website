import { cn } from "@/lib/client/utils";

export default function YouTubeVideo({
  id,
  title = "YouTube video player",
  autoplay = false,
  mute = false,
  controls = true,
  startTime,
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
        <iframe
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}

interface YouTubeVideoProps {
  id: string;
  title?: string;
  autoplay?: boolean;
  mute?: boolean;
  controls?: boolean;
  startTime?: number;
  className?: string;
}
