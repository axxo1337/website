"use client";

import Image from "next/image";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Check, Copy, ExternalLink } from "lucide-react";
import { useCopyToClipboard } from "@/lib/client/hooks/useCopyToClipboard";
import { useRef } from "react";
import hljs from "highlight.js/lib/core";
import c from "highlight.js/lib/languages/c";
import Logo from "./Logo";

hljs.registerLanguage("c", c);

//
// [SECTION] Defines
//

const themes = {
  vergilius: {
    logo: <Image alt="Vergilius Logo" src="/images/socials/vergilius.png" width={36} height={39} />,
    label: "Vergilius",
    labelColor: "text-[#F6F1A3]",
    bgCard: "#141422",
    bgCodeHeader: "#262633",
    bgCodeBody: "#282A36",
  },
  axxo: {
    logo: <Logo className="size-7" />,
    label: "aXXo",
    labelColor: "text-white",
    bgCard: "#1C1C1C",
    bgCodeHeader: "#2B2B2B",
    bgCodeBody: "#3C3C3C",
  },
};

//
// [SECTION] Content
//

export default function UndocumentedStruct({ title, children, source, theme = "vergilius" }: UndocumentedStructProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();
  const ref = useRef<HTMLElement>(null);

  const raw = typeof children === "string" ? children : "";
  const highlighted = hljs.highlight(raw, { language: "c" }).value;
  const t = themes[theme];

  const handleCopy = () => {
    if (ref.current) {
      const text = ref.current.innerText || "";
      copyToClipboard(text);
    }
  };

  return (
    <div className="my-4 rounded-lg overflow-hidden p-3 md:p-5 border" style={{ backgroundColor: t.bgCard }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          {t.logo}
          <span className={`text-2xl uppercase font-bold ${t.labelColor}`}>{t.label}</span>
        </div>
        {source && (
          <a href={source} className="inline-anchor" target="_blank">
            <ExternalLink />
          </a>
        )}
      </div>
      <div className="mt-3.5 md:mt-5.5 flex flex-col gap-3">
        <span className="text-2xl font-bold">{title}</span>
        <div className="w-full rounded-sm overflow-hidden group relative" style={{ backgroundColor: t.bgCodeHeader }}>
          <div className="flex items-center justify-between py-1 px-2 md:px-3">
            <span className="font-medium">C</span>
            <div
              onClick={handleCopy}
              className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1 bg-transparent hover:bg-white/15 rounded-sm"
            >
              {isCopied ? <Check size={12} /> : <Copy size={12} />}
            </div>
          </div>
          <div className="p-2 md:p-3" style={{ backgroundColor: t.bgCodeBody }}>
            <ScrollArea>
              <pre className="m-0!">
                <code className="bg-transparent! p-0! language-c" ref={ref} dangerouslySetInnerHTML={{ __html: highlighted }} />
              </pre>
              <ScrollBar orientation="horizontal" className="**:data-[slot=scroll-area-thumb]:bg-white/20" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}

//
// [SECTION] Types
//

interface UndocumentedStructProps {
  title: string;
  children: React.ReactNode;
  source?: string;
  theme?: "vergilius" | "axxo";
}
