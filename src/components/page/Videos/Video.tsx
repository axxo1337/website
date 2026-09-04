import ContentCard from "@/components/ui/ContentCard";
import { TPostCategory, TPostStatus } from "@/lib/client/types/post";

//
// [SECTION] Content
//

export default function Video(props: VideoProps) {
  return <ContentCard {...props} fallbackText="This video has no thumbnail yet." />;
}

//
// [SECTION] Types
//

export interface VideoProps {
  title: string;
  description: string;
  createdAt: Date;
  thumbnailPath?: string | null;
  animationPath?: string | null;
  animationPreview?: string | null;
  animationBackground?: string | null;
  href: string;
  status: TPostStatus;
  categories?: TPostCategory[];
}
