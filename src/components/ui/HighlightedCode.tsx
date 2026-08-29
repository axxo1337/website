"use client";

import { ScrollArea, ScrollBar } from "./scroll-area";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/lib/client/hooks/useCopyToClipboard";

export default function HighlightedCode({
  language,
  rawCode,
  highlightedHtml,
  copyLabel = "Copy code",
  headerBg,
  bodyBg,
  className,
  codeClassName,
}: HighlightedCodeProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  return (
    <div
      className={`w-full rounded-sm overflow-hidden group relative ${className ?? ""}`}
      style={headerBg ? { backgroundColor: headerBg } : undefined}
    >
      <div className="flex items-center justify-between py-1 px-2 md:px-3">
        <span className="font-medium">{language}</span>
        <button
          type="button"
          onClick={() => copyToClipboard(rawCode)}
          aria-label={copyLabel}
          className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1 bg-transparent hover:bg-white/15 rounded-sm focus:opacity-100 focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
        >
          {isCopied ? <Check size={12} /> : <Copy size={12} />}
        </button>
      </div>
      <div className={`p-2 md:p-3 ${bodyBg ? "" : "bg-[#1F1F1F]"}`} style={bodyBg ? { backgroundColor: bodyBg } : undefined}>
        <ScrollArea>
          <pre className="m-0!">
            <code
              className={`bg-transparent! p-0! hljs ${codeClassName ?? ""}`}
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          </pre>
          <ScrollBar orientation="horizontal" className="**:data-[slot=scroll-area-thumb]:bg-white/20" />
        </ScrollArea>
      </div>
    </div>
  );
}

interface HighlightedCodeProps {
  language: string;
  rawCode: string;
  highlightedHtml: string;
  copyLabel?: string;
  headerBg?: string;
  bodyBg?: string;
  className?: string;
  codeClassName?: string;
}
