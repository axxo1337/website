import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TPostCategory, TPostStatus } from "@/lib/client/types/post";
import { cn, formatUTC, postCategoryMap, postStatusObjectMap } from "@/lib/client/utils";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import TexturedContainer from "./TexturedContainer";
import ContentCardThumbnail from "./ContentCardThumbnail";

//
// [SECTION] Content
//

export default function ContentCard({
  title,
  description,
  createdAt,
  thumbnailPath,
  animationPath,
  animationBackground,
  animationPreview,
  href,
  status,
  categories,
  fallbackText = "This item has no thumbnail yet.",
  typeBadge,
}: ContentCardProps) {
  const statusObject = postStatusObjectMap.get(status);

  return (
    <Link href={href} className="group">
      <article>
        <div className="relative rounded-md overflow-hidden">
          <TexturedContainer className="bg-black border-0 rounded-none">
            <AspectRatio ratio={16 / 9}>
              <ContentCardThumbnail
                thumbnailPath={thumbnailPath}
                animationPath={animationPath}
                animationBackground={animationBackground}
                animationPreview={animationPreview}
                title={title}
                fallbackText={fallbackText}
              />
              <span className="absolute left-1/2 top-1/2 z-15 -translate-1/2 opacity-0 transition-opacity group-hover:opacity-100 duration-250 text-center text-xl font-bold underline">
                Click to open
              </span>
            </AspectRatio>
          </TexturedContainer>
          {statusObject && (
            <div
              className={cn(
                "absolute top-0 left-0 backdrop-blur-sm backdrop-brightness-35 px-2 py-1 rounded-br-md flex justify-between items-center border-r border-b group-hover:opacity-0 opacity-100 duration-250 transition-opacity",
                statusObject.containerClassName,
              )}
            >
              <span className={cn("text-xs", statusObject.spanClassName)}>{statusObject.text}</span>
            </div>
          )}
        </div>
        <div className="my-2">
          <span className="text-2xl font-medium group-hover-underline">{title}</span>
          <div className="flex flex-wrap gap-4 items-center text-sm font-medium text-white/75 mt-0.5">
            {typeBadge && (
              <span className="flex items-center gap-1.5">
                <typeBadge.icon className="size-5" />
                {typeBadge.title}
              </span>
            )}
            <span>Created • {formatUTC(createdAt)}</span>
          </div>
        </div>
        <p className="text-white/75 line-clamp-2">{description}</p>
        {categories && categories.length > 0 && (
          <ul className="flex flex-wrap gap-2 gap-y-1 mt-3">
            {categories.map((cat) => {
              const categoryObj = postCategoryMap.get(cat);
              if (!categoryObj) return null;
              const Icon = categoryObj.icon;
              return (
                <li
                  key={cat}
                  className={cn(
                    "text-xs border rounded-lg px-2 py-0.5 inline-flex items-center gap-1",
                    categoryObj.containerClassName,
                    categoryObj.spanClassName,
                  )}
                >
                  <Icon className="size-3.5" />
                  <span>{categoryObj.text}</span>
                </li>
              );
            })}
          </ul>
        )}
      </article>
    </Link>
  );
}

//
// [SECTION] Types
//

export interface ContentCardProps {
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
  fallbackText?: string;
  typeBadge?: {
    title: string;
    icon: LucideIcon;
  };
}
