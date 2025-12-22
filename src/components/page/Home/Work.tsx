import { AspectRatio } from "@/components/ui/aspect-ratio";
import { format } from "date-fns";
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

export default function Work({
  title,
  type,
  description,
  href,
  createdAt,
  thumbnailPath,
}: Work) {
  const workTypesEntry = workTypesMap.get(type);

  if (!workTypesEntry) return <span>Something is wrong...</span>;

  return (
    <Link href={href} className="group">
      <AspectRatio ratio={16 / 9}>
        <Image
          src={thumbnailPath}
          fill={true}
          alt="thumnail"
          className="rounded-sm border-2 border-white/20"
        />
      </AspectRatio>
      <div className="my-2">
        <span className="text-2xl font-medium group-hover:underline">
          {title}
        </span>
        <div className="flex flex-wrap gap-4 items-center text-sm font-medium text-white/75 mt-0.5">
          <span className="flex items-center gap-1.5">
            <workTypesEntry.icon className="size-5" />
            {workTypesEntry.title}
          </span>
          <span>Created • {format(createdAt, "MM/dd/yyyy")}</span>
        </div>
      </div>
      <p className="text-white/75">{description}</p>
    </Link>
  );
}

//
// [SECTION] Types
//

interface Work {
  title: string;
  description: string;
  type: "video" | "tool" | "library";
  href: string;
  createdAt: Date;
  thumbnailPath: string;
}
