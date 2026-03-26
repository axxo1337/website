"use client";

import { ScrollArea, ScrollBar } from "./scroll-area";
import { Check, Copy, ExternalLink } from "lucide-react";
import { useCopyToClipboard } from "@/lib/client/hooks/useCopyToClipboard";
import { useRef } from "react";
import hljs from "highlight.js/lib/core";
import cpp from "highlight.js/lib/languages/cpp";

hljs.registerLanguage("cpp", cpp);

export default function MicrosoftLearnQuote({ title, description, children, source }: MicrosoftLearnQuoteProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const ref = useRef<HTMLElement>(null);

  const raw = typeof children === "string" ? children : "";
  const highlighted = hljs.highlight(raw, { language: "cpp" }).value;

  const handleCopy = () => {
    if (ref.current) {
      const text = ref.current.innerText || "";
      copyToClipboard(text);
    }
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden p-3 md:p-5 border bg-[#0C0C0C]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg className="size-8" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H19.8767V19.8767H0V0Z" fill="#F35325" />
            <path d="M21.8644 0H41.7411V19.8767H21.8644V0Z" fill="#81BC06" />
            <path d="M0 21.8643H19.8767V41.741H0V21.8643Z" fill="#05A6F0" />
            <path d="M21.8644 21.8643H41.7411V41.741H21.8644V21.8643Z" fill="#FFBA08" />
          </svg>
          <span className="text-2xl font-bold">Learn</span>
        </div>
        {source && (
          <a href={source} className="inline-anchor" target="_blank">
            <ExternalLink />
          </a>
        )}
      </div>
      <div className="mt-3.5 md:mt-5 flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col gap-2 md:gap-3.5">
          <span className="text-2xl font-bold">{title}</span>
          {description && <p>{description}</p>}
        </div>
        <div className="flex flex-col gap-2 md:gap-3.5">
          <span className="text-2xl font-bold">Syntax</span>
          <div className="w-full rounded-sm overflow-hidden bg-[#2F2F2F] border group relative">
            <div className="flex items-center justify-between py-1 px-2 md:px-3">
              <span className="font-medium">C++</span>
              <div
                onClick={handleCopy}
                className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1 bg-transparent hover:bg-white/15 rounded-sm"
              >
                {isCopied ? <Check size={12} /> : <Copy size={12} />}
              </div>
            </div>
            <div className="p-2 md:p-3 bg-[#1F1F1F]">
              <ScrollArea>
                <pre className="m-0!">
                  <code
                    className="bg-transparent! p-0! language-cpp"
                    ref={ref}
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                  />
                </pre>
                <ScrollBar orientation="horizontal" className="**:data-[slot=scroll-area-thumb]:bg-white/20" />
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//
// [SECTION] Types
//

interface MicrosoftLearnQuoteProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  source?: string;
}
