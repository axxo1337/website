"use client";

import { useRef } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCopyToClipboard } from "@/lib/client/hooks/useCopyToClipboard";
import { Check, Copy } from "lucide-react";

export default function CodeBlock({ className, children, ...props }: React.ComponentPropsWithoutRef<"code">) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const ref = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    if (ref.current) {
      const text = ref.current.innerText || "";
      copyToClipboard(text);
    }
  };

  if (!className) {
    return <code {...props}>{children}</code>;
  }

  return (
    <div>
      <ScrollArea>
        <code className={`${className} bg-transparent! p-0!`} {...props} ref={ref}>
          {children}
        </code>
        <ScrollBar orientation="horizontal" className="**:data-[slot=scroll-area-thumb]:bg-white/20" />
      </ScrollArea>
      <div
        onClick={handleCopy}
        className="absolute opacity-0 group-hover:opacity-100 transition-opacity top-3 cursor-pointer p-1 right-3 bg-transparent hover:bg-white/15 rounded-sm"
      >
        {isCopied ? <Check size={12} /> : <Copy size={12} />}
      </div>
    </div>
  );
}
