import ContentCard from "@/components/ui/ContentCard";
import { TPostStatus } from "@/lib/client/types/post";
import { Hammer, Puzzle, Video } from "lucide-react";

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

  return (
    <ContentCard
      title={title}
      description={description}
      href={href}
      createdAt={createdAt}
      thumbnailPath={thumbnailPath}
      status={status}
      typeBadge={workTypesEntry}
      fallbackText="This project has no thumbnail yet."
    />
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
