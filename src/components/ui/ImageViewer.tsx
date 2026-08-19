"use client";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { X } from "lucide-react";
import { cn } from "@/lib/client/utils";

//
// [SECTION] Content
//

function UnzoomIcon() {
  return <X className="size-5" />;
}

export default function ImageViewer({
  children,
  className,
}: ImageViewerProps) {
  return (
    <span className={cn("inline-block", className)}>
      <Zoom
        wrapElement="span"
        zoomMargin={40}
        canSwipeToUnzoom
        IconUnzoom={UnzoomIcon}
      >
        {children}
      </Zoom>
    </span>
  );
}

//
// [SECTION] Types
//

interface ImageViewerProps {
  src: string;
  alt?: string;
  caption?: string;
  children: React.ReactNode;
  className?: string;
}
