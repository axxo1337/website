import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TPostStatus } from "@/lib/client/types/post";
import { formatUTC } from "@/lib/client/utils";
import { Hammer, Puzzle, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

//
// [SECTION] Defines
//

const workTypesMap = new Map([
  [
    "video",
    {
      title: "Video",
      icon: Video,
    },
  ],
  [
    "tool",
    {
      title: "Tool",
      icon: Hammer,
    },
  ],
  [
    "library",
    {
      title: "Library",
      icon: Puzzle,
    },
  ],
]);

//
// [SECTION] Content
//

export default function Work({ title, type, description, href, createdAt, thumbnailPath, status }: WorkProps) {
  const workTypesEntry = workTypesMap.get(type);

  if (!workTypesEntry) return <span>Something is wrong...</span>;

  return (
    <Link href={href} className="group">
      <AspectRatio ratio={16 / 9} className="relative overflow-hidden rounded-sm border-2 border-white/20 bg-black">
        {thumbnailPath ? (
          <Image
            src={thumbnailPath}
            fill={true}
            alt="thumnail"
            className="group-hover:scale-[98%] transition-all duration-250 ease-in-out absolute group-hover:blur-sm blur-none"
          />
        ) : (
          <span className="absolute left-1/2 top-1/2 -translate-1/2 duration-250 font-medium text-lg md:text-xl text-center px-4 w-full select-none text-white/50 group-hover:scale-[98%] transition-[transform,opacity] ease-in-out group-hover:opacity-0 opacity-100">
            This project has no thumbnail yet.
          </span>
        )}

        {status === "WIP" && (
          <div className="absolute top-0 left-0 backdrop-brightness-35 bg-yellow-500/20 px-2 py-1 rounded-br-md ease-in-out flex justify-between items-center border-r border-b border-yellow-500 group-hover:opacity-0 opacity-100 transition-opacity duration-250">
            <span className="text-xs text-yellow-500">Work in progress</span>
          </div>
        )}

        <span className="absolute left-1/2 top-1/2 -translate-1/2 opacity-0 transition-opacity duration-250 ease-in-out group-hover:opacity-100 text-center text-xl font-bold underline">
          Click to open
        </span>
      </AspectRatio>
      <div className="my-2">
        <span className="text-2xl font-medium group-hover-underline">{title}</span>
        <div className="flex flex-wrap gap-4 items-center text-sm font-medium text-white/75 mt-1">
          <span className="flex items-center gap-1.5">
            <workTypesEntry.icon className="size-5" />
            {workTypesEntry.title}
          </span>
          <span>Created • {formatUTC(createdAt)}</span>
        </div>
      </div>
      <p className="text-white/75 line-clamp-2">{description}</p>
    </Link>
  );
}

//
// [SECTION] Types
//

export interface WorkProps {
  title: string;
  description: string;
  type: "video" | "tool" | "library";
  href: string;
  createdAt: Date;
  thumbnailPath?: string | null;
  status: TPostStatus;
}
