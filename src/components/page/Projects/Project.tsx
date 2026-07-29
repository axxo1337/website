import ContentCard from "@/components/ui/ContentCard";
import { TPostStatus } from "@/lib/client/types/post";

//
// [SECTION] Content
//

export default function Project(props: ProjectProps) {
  return <ContentCard {...props} fallbackText="This project has no thumbnail yet." />;
}

//
// [SECTION] Types
//

export interface ProjectProps {
  title: string;
  description: string;
  createdAt: Date;
  thumbnailPath?: string | null;
  href: string;
  status: TPostStatus;
}
