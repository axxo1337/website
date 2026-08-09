import ContentCard from "@/components/ui/ContentCard";
import { TPostCategory, TPostStatus } from "@/lib/client/types/post";
import { Compass, Video } from "lucide-react";

//
// [SECTION] Defines
//

const workTypesMap = new Map<"video" | "project", { title: string; icon: typeof Video }>([
  [
    "video",
    {
      title: "Video",
      icon: Video,
    },
  ],
  [
    "project",
    {
      title: "Project",
      icon: Compass,
    },
  ],
]);

//
// [SECTION] Content
//

export default function Work({ title, type, description, href, createdAt, thumbnailPath, status, categories }: WorkProps) {
  const workTypesEntry = workTypesMap.get(type);

  return (
    <ContentCard
      title={title}
      description={description}
      href={href}
      createdAt={createdAt}
      thumbnailPath={thumbnailPath}
      status={status}
      categories={categories}
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
  type: "video" | "project";
  href: string;
  createdAt: Date;
  thumbnailPath?: string | null;
  status: TPostStatus;
  categories?: TPostCategory[];
}
