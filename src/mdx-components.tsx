import type { MDXComponents } from "mdx/types";
import { slugify, extractText, cn } from "./lib/client/utils";
import CodeBlock from "./components/ui/CodeBlock";
import ImageViewer from "./components/ui/ImageViewer";
import MicrosoftLearnQuote from "./components/ui/MicrosoftLearnQuote";
import UndocumentedStruct from "./components/ui/UndocumentedStruct";
import YouTubeVideo from "./components/page/Video/YouTubeVideo";
import GithubRepo from "./components/ui/GithubRepo";

function parseImageAlt(alt: string): { text: string; align: string; width: string; caption: string } {
  const parts = alt.split("|").map((s) => s.trim());
  const text = parts[0];
  let align = "center";
  let width = "";
  let caption = "";

  for (const part of parts.slice(1)) {
    if (["left", "center", "right"].includes(part)) {
      align = part;
    } else if (/^\d/.test(part)) {
      width = part;
    } else if (part) {
      caption = part;
    }
  }

  return { text, align, width, caption };
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h3: ({ children }) => (
      <h3 id={slugify(extractText(children))} className="text-2xl md:text-3xl first:mt-0! mt-5 py-0.5 scroll-mt-24">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 id={slugify(extractText(children))} className="text-xl md:text-2xl first:mt-0! mt-5 py-0.5 scroll-mt-24">
        {children}
      </h4>
    ),
    p: ({ children }) => <p className="mt-3">{children}</p>,
    a: (props) => <a {...props} className={cn("inline-anchor break-words", props.className)}></a>,
    ol: ({ children }) => <ol className="list-decimal pl-5 flex flex-col gap-2 mt-3">{children}</ol>,
    ul: ({ children }) => <ul className="list-disc pl-5 flex flex-col gap-2 mt-3">{children}</ul>,
    li: ({ children }) => <li className="wrap-break-words">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-white/30 pl-4 my-2 italic text-white/70">{children}</blockquote>
    ),
    span: ({ className, children, ...props }) => {
      if (className?.includes("katex-display")) {
        return (
          <span className="my-1 py-4 flex items-center justify-center">
            <span className={cn("block px-2 py-1 my-0!", className)} {...props}>
              {children}
            </span>
          </span>
        );
      }
      return (
        <span className={className} {...props}>
          {children}
        </span>
      );
    },
    pre: ({ children, ...props }) => (
      <pre className="bg-[#181818] p-4 pb-5 rounded-md my-2 border border-white/10 text-[0.9rem] relative group" {...props}>
        {children}
      </pre>
    ),
    code: CodeBlock,
    img: ({ src, alt, ...props }) => {
      const { text, align, width, caption } = parseImageAlt(alt || "");

      const wrapperAlignClass = align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center";

      const isAuto = width === "auto";
      const hasExplicitWidth = width && !isAuto;
      const sizeClass = width ? "" : "w-full";
      const imgClassName = `rounded-lg h-auto ${sizeClass}`;

      // eslint-disable-next-line @next/next/no-img-element
      const image = isAuto ? (
        <img src={src} alt={text} className="rounded-lg h-auto" {...props} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={text} className={imgClassName} style={hasExplicitWidth ? { width } : undefined} {...props} />
      );

      return (
        <span className={`flex my-4 ${wrapperAlignClass}`}>
          <span className="inline-flex flex-col items-center">
            <ImageViewer src={src || ""} alt={text}>
              {image}
            </ImageViewer>
            {caption && <span className="text-sm text-white/50 mt-1.5 italic">{caption}</span>}
          </span>
        </span>
      );
    },
    MicrosoftLearnQuote: (props) => <MicrosoftLearnQuote {...props} />,
    UndocumentedStruct: (props) => <UndocumentedStruct {...props} />,
    YouTubeVideo: (props) => <YouTubeVideo className="[&>div]:border [&>div]:border-white/10 mt-3" {...props} />,
    GithubRepo: (props) => <GithubRepo {...props} />,
    ...components,
  };
}
