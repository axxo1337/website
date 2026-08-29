import { ExternalLink } from "lucide-react";
import { extractText } from "@/lib/client/utils";
import { highlightCode } from "@/lib/server/highlight";
import HighlightedCode from "./HighlightedCode";

export default function MicrosoftLearnQuote({ title, description, children, source }: MicrosoftLearnQuoteProps) {
  const raw = extractText(children);
  const highlighted = highlightCode(raw, "cpp");

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
          <a
            href={source}
            className="inline-anchor"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source for ${title} on Microsoft Learn`}
          >
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
          <HighlightedCode
            language="C++"
            rawCode={raw}
            highlightedHtml={highlighted}
            copyLabel="Copy syntax"
            className="bg-[#2F2F2F] border"
            codeClassName="language-cpp"
          />
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
