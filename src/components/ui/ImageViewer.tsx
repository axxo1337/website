"use client";

import { useCallback, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Dialog, DialogClose, DialogContent, DialogTitle } from "./dialog";

//
// [SECTION] Content
//

export default function ImageViewer({ src, alt, children }: ImageViewerProps) {
  const [open, setOpen] = useState(false);
  const thumbRef = useRef<HTMLSpanElement>(null);

  const getThumbImg = () =>
    thumbRef.current?.querySelector("img") as HTMLElement | null;

  const handleOpen = useCallback(() => {
    const thumb = getThumbImg();

    if (!document.startViewTransition || !thumb) {
      setOpen(true);
      return;
    }

    thumb.style.viewTransitionName = "image-viewer";

    document.startViewTransition(() => {
      flushSync(() => {
        thumb.style.viewTransitionName = "";
        setOpen(true);
      });
    });
  }, []);

  const handleClose = useCallback(() => {
    if (!document.startViewTransition) {
      setOpen(false);
      return;
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => setOpen(false));
      const thumb = getThumbImg();
      if (thumb) thumb.style.viewTransitionName = "image-viewer";
    });

    transition.finished.then(() => {
      const thumb = getThumbImg();
      if (thumb) thumb.style.viewTransitionName = "";
    });
  }, []);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <span ref={thumbRef} className="cursor-zoom-in" onClick={handleOpen}>
        {children}
      </span>
      <DialogContent
        className="!max-w-[90vw] max-h-[90vh] !w-fit !border-none !bg-transparent !p-0 !shadow-none !gap-0 !animate-none"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <DialogClose asChild>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            draggable={false}
            style={{ viewTransitionName: "image-viewer" }}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-md touch-pinch-zoom cursor-zoom-out"
          />
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

//
// [SECTION] Types
//

interface ImageViewerProps {
  src: string;
  alt: string;
  children: React.ReactNode;
}
