import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Logo from "./Logo";
import { extractText } from "@/lib/client/utils";
import { highlightCode } from "@/lib/server/highlight";
import HighlightedCode from "./HighlightedCode";

//
// [SECTION] Defines
//

const themes = {
  vergilius: {
    logo: <Image alt="Vergilius Logo" src="/images/socials/vergilius.webp" width={36} height={39} />,
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
  const raw = extractText(children);
  const highlighted = highlightCode(raw, "c");
  const t = themes[theme];

  return (
    <div className="my-4 rounded-lg overflow-hidden p-3 md:p-5 border" style={{ backgroundColor: t.bgCard }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          {t.logo}
          <span className={`text-2xl uppercase font-bold ${t.labelColor}`}>{t.label}</span>
        </div>
        {source && (
          <a
            href={source}
            className="inline-anchor"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source for ${title} on ${t.label}`}
          >
            <ExternalLink />
          </a>
        )}
      </div>
      <div className="mt-3.5 md:mt-5.5 flex flex-col gap-3">
        <span className="text-2xl font-bold">{title}</span>
        <HighlightedCode
          language="C"
          rawCode={raw}
          highlightedHtml={highlighted}
          copyLabel="Copy struct code"
          headerBg={t.bgCodeHeader}
          bodyBg={t.bgCodeBody}
          codeClassName="language-c"
        />
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
