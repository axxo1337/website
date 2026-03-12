import type { ContentType, MDXMetadata } from "@/lib/server/mdx";
import { cn } from "@/lib/client/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

//
// [SECTION] Content
//

export default function ContentNavigation({ contentType, prev, next }: ContentNavigationProps) {
  const basePath = contentType === "video" ? "/video" : "/project";

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-stretch gap-3">
      <Link
        href={prev ? `${basePath}/${prev.slug}` : "#"}
        aria-disabled={!prev}
        tabIndex={prev ? undefined : -1}
        className={cn(
          "border rounded-md p-3 gap-2.5 w-full flex items-center border-white/20",
          prev ? "hover:border-white transition-colors" : "brightness-50 cursor-not-allowed pointer-events-none",
        )}
      >
        <ChevronLeft className="size-5 shrink-0" />
        <div className="flex flex-col gap-0.5">
          <span className="font-medium">PREV</span>
          <span className="text-sm text-white/75">{prev ? prev.title : "Nothing older"}</span>
        </div>
      </Link>
      <Link
        href={next ? `${basePath}/${next.slug}` : "#"}
        aria-disabled={!next}
        tabIndex={next ? undefined : -1}
        className={cn(
          "border rounded-md p-3 gap-2.5 w-full flex items-center border-white/20",
          next ? "hover:border-white transition-colors" : "brightness-50 cursor-not-allowed pointer-events-none",
        )}
      >
        <div className="flex flex-col gap-0.5 text-right ml-auto">
          <span className="font-medium">NEXT</span>
          <span className="text-sm text-white/75">{next ? next.title : "Nothing newer"}</span>
        </div>
        <ChevronRight className="size-5 shrink-0" />
      </Link>
    </div>
  );
}

//
// [SECTION] Types
//

interface ContentNavigationProps {
  contentType: ContentType;
  prev: MDXMetadata | null;
  next: MDXMetadata | null;
}
