import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./dialog";

//
// [SECTION] Content
//

export default function ImageViewer({ src, alt, children }: ImageViewerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="cursor-zoom-in">{children}</span>
      </DialogTrigger>
      <DialogContent
        className="!max-w-[90vw] max-h-[90vh] !w-fit !border-none !bg-transparent !p-0 !shadow-none !gap-0"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="max-h-[90vh] max-w-[90vw] object-contain rounded-md touch-pinch-zoom"
        />
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
