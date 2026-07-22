import type { ContentType, MDXMetadata } from "@/lib/server/mdx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";

//
// [SECTION] Content
//

export default function ContentNavigation({ contentType, prev, next }: ContentNavigationProps) {
  const basePath = contentType === "video" ? "/video" : "/project";

  const prevContent = (
    <Fragment>
      <ChevronLeft className="size-5 shrink-0" />
      <div className="flex flex-col gap-0.5">
        <span className="font-medium">PREV</span>
        <span className="text-sm text-white/75">{prev ? prev.title : "Nothing older"}</span>
      </div>
    </Fragment>
  );

  const nextContent = (
    <Fragment>
      <div className="flex flex-col gap-0.5 text-right ml-auto">
        <span className="font-medium">NEXT</span>
        <span className="text-sm text-white/75">{next ? next.title : "Nothing newer"}</span>
      </div>
      <ChevronRight className="size-5 shrink-0" />
    </Fragment>
  );

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-stretch gap-3">
      {prev ? (
        <Link
          href={`${basePath}/${prev.slug}`}
          className="border rounded-md p-3 gap-2.5 w-full flex items-center border-white/20 hover:border-white transition-colors blured-bg"
        >
          {prevContent}
        </Link>
      ) : (
        <div className="border rounded-md p-3 gap-2.5 w-full flex items-center border-white/20 brightness-50 cursor-not-allowed select-none blured-bg">
          {prevContent}
        </div>
      )}
      {next ? (
        <Link
          href={`${basePath}/${next.slug}`}
          className="border rounded-md p-3 gap-2.5 w-full flex items-center border-white/20 hover:border-white transition-colors blured-bg"
        >
          {nextContent}
        </Link>
      ) : (
        <div className="border rounded-md p-3 gap-2.5 w-full flex items-center border-white/20 brightness-50 cursor-not-allowed select-none blured-bg">
          {nextContent}
        </div>
      )}
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
