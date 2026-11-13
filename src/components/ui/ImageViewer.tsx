"use client";

import { X } from "lucide-react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/client/utils";

//
// [SECTION] Defines
//

const ZOOM_MARGIN = 40;
const SWIPE_THRESHOLD = 10;
const EXIT_FALLBACK_MS = 250;
const ZOOM_TRANSITION_CLASS =
  "transition-[opacity,transform] duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-reduce:transition-none";

//
// [SECTION] Functions
//

function computeZoomStyle(origin: Rect, natural: Size | null) {
  const fitScale = Math.min(
    (window.innerWidth - ZOOM_MARGIN * 2) / origin.width,
    (window.innerHeight - ZOOM_MARGIN * 2) / origin.height,
  );
  // Never upscale past the image's natural resolution; large screens would otherwise
  // stretch low-resolution images to fit and lose quality.
  const scale = natural
    ? Math.min(
        fitScale,
        natural.width / origin.width,
        natural.height / origin.height,
      )
    : fitScale;
  const width = origin.width * scale;
  const height = origin.height * scale;
  return {
    height,
    scale,
    width,
    x: window.innerWidth / 2 - (origin.left + width / 2),
    y: window.innerHeight / 2 - (origin.top + height / 2),
  };
}

export default function ImageViewer({
  src,
  alt,
  children,
  className,
}: ImageViewerProps) {
  const thumbnailRef = useRef<HTMLButtonElement>(null);
  const [origin, setOrigin] = useState<Rect | null>(null);
  const [natural, setNatural] = useState<Size | null>(null);
  const [visible, setVisible] = useState(false);

  const handleZoom = useCallback(() => {
    const rect = thumbnailRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0 || rect.height <= 0) return;
    const probe = new Image();
    probe.src = src;
    if (probe.complete && probe.naturalWidth > 0 && probe.naturalHeight > 0) {
      setNatural({ width: probe.naturalWidth, height: probe.naturalHeight });
    } else {
      setNatural(null);
      probe.onload = () =>
        setNatural({ width: probe.naturalWidth, height: probe.naturalHeight });
    }
    setOrigin({
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    });
    setVisible(true);
  }, [src]);

  const handleUnzoom = useCallback(() => setVisible(false), []);

  const handleExited = useCallback(() => setOrigin(null), []);

  useEffect(() => {
    if (!origin) return;
    const onResize = () => {
      const rect = thumbnailRef.current?.getBoundingClientRect();
      if (rect && rect.width > 0 && rect.height > 0) {
        setOrigin({
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        });
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [origin]);

  return (
    <Fragment>
      <button
        ref={thumbnailRef}
        type="button"
        onClick={handleZoom}
        style={origin ? { visibility: "hidden" } : undefined}
        aria-label={alt ? `Zoom image: ${alt}` : "Zoom image"}
        className={cn(
          "inline-block cursor-zoom-in appearance-none border-0 bg-transparent p-0 focus-visible:ring-2 focus-visible:ring-white/60",
          className,
        )}
      >
        {children}
      </button>
      {origin && (
        <ImageViewerDialog
          src={src}
          alt={alt}
          origin={origin}
          natural={natural}
          visible={visible}
          onUnzoom={handleUnzoom}
          onExited={handleExited}
        />
      )}
    </Fragment>
  );
}

function ImageViewerDialog({
  src,
  alt,
  origin,
  natural,
  visible,
  onUnzoom,
  onExited,
}: ImageViewerDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchYRef = useRef<number | undefined>(undefined);
  const [entered, setEntered] = useState(false);
  const zoom = computeZoomStyle(origin, natural);
  const zoomed = entered && visible;

  useEffect(() => {
    const { style: bodyStyle } = document.body;
    const { overflow: prevOverflow, width: prevWidth } = bodyStyle;
    const clientWidth = document.body.clientWidth;
    const previousActive = document.activeElement as HTMLElement | null;
    bodyStyle.overflow = "hidden";
    bodyStyle.width = `${clientWidth}px`;
    const dialog = dialogRef.current;
    dialog?.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      bodyStyle.width = prevWidth;
      bodyStyle.overflow = prevOverflow;
      previousActive?.focus({ preventScroll: true });
      dialog?.close();
    };
  }, []);
  // CSS transitions only fire on a style change after a painted frame, so render the
  // unzoomed pose first and flip to the zoomed pose one frame later.
  useEffect(() => {
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setEntered(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  useEffect(() => {
    if (visible) return;
    const timeout = setTimeout(onExited, EXIT_FALLBACK_MS);
    return () => clearTimeout(timeout);
  }, [visible, onExited]);

  useEffect(() => {
    function handleTouchStart(e: TouchEvent) {
      touchYRef.current = e.touches[0]?.screenY;
    }
    function handleTouchMove(e: TouchEvent) {
      const startY = touchYRef.current;
      const y = e.touches[0]?.screenY;
      if (
        startY != null &&
        y != null &&
        Math.abs(y - startY) > SWIPE_THRESHOLD
      ) {
        touchYRef.current = undefined;
        onUnzoom();
      }
    }
    function handleTouchEnd() {
      touchYRef.current = undefined;
    }
    function handleWheel(e: WheelEvent) {
      if (!e.ctrlKey && (window.visualViewport?.scale ?? 1) <= 1) {
        onUnzoom();
      }
    }
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onUnzoom]);

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-label={alt || "Zoomed image"}
      aria-modal="true"
      onCancel={(e) => {
        e.preventDefault();
        onUnzoom();
      }}
      className="fixed inset-0 m-0 h-dvh w-dvw max-h-none max-w-none overflow-hidden overscroll-none border-0 bg-transparent p-0 [&::backdrop]:hidden"
    >
      <div
        aria-hidden="true"
        onClick={onUnzoom}
        className={cn("absolute inset-0 bg-background", ZOOM_TRANSITION_CLASS)}
        style={{ opacity: zoomed ? 1 : 0 }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element -- cloned for the zoom overlay; next/image adds nothing here */}
      <img
        src={src}
        alt={alt || ""}
        onClick={onUnzoom}
        onTransitionEnd={(e) => {
          if (
            !visible &&
            e.target === e.currentTarget &&
            e.propertyName === "transform"
          )
            onExited();
        }}
        style={{
          left: origin.left,
          top: origin.top,
          width: zoom.width,
          height: zoom.height,
          transformOrigin: "top left",
          transform: zoomed
            ? `translate3d(${zoom.x}px, ${zoom.y}px, 0)`
            : `scale(${1 / zoom.scale})`,
        }}
        className={cn(
          "absolute z-10 cursor-zoom-out rounded-md will-change-transform",
          ZOOM_TRANSITION_CLASS,
        )}
      />
      <button
        ref={closeRef}
        type="button"
        aria-label="Close image viewer"
        onClick={onUnzoom}
        className={cn(
          "absolute right-4 top-4 z-20 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white",
          "transition-[background-color,opacity] duration-[250ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] motion-reduce:transition-none",
          "hover:bg-white/20 focus-visible:ring-2 focus-visible:ring-white/60",
        )}
        style={{ opacity: zoomed ? 1 : 0 }}
      >
        <X className="size-5" />
      </button>
    </dialog>,
    document.body,
  );
}

//
// [SECTION] Types
//

type Rect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type Size = {
  width: number;
  height: number;
};

interface ImageViewerProps {
  src: string;
  alt?: string;
  children: React.ReactNode;
  className?: string;
}

interface ImageViewerDialogProps {
  src: string;
  alt?: string;
  origin: Rect;
  natural: Size | null;
  visible: boolean;
  onUnzoom: () => void;
  onExited: () => void;
}
