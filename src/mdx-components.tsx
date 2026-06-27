import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { ReactNode } from "react";
import { slugify } from "./lib/client/utils";
import CodeBlock from "./components/ui/CodeBlock";
import ImageViewer from "./components/ui/ImageViewer";
import MicrosoftLearnQuote from "./components/ui/MicrosoftLearnQuote";
import UndocumentedStruct from "./components/ui/UndocumentedStruct";
import YouTubeVideo from "./components/page/Video/YouTubeVideo";
import FadeIn from "./components/ui/FadeIn";

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

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
      <FadeIn as="h3" id={slugify(extractText(children))} className="text-2xl md:text-3xl first:mt-0! mt-5 py-0.5 scroll-mt-24" y={8} duration={0.35}>
        {children}
      </FadeIn>
    ),
    h4: ({ children }) => (
      <FadeIn as="h4" id={slugify(extractText(children))} className="text-xl md:text-2xl first:mt-0! mt-5 py-0.5 scroll-mt-24" y={8} duration={0.35}>
        {children}
      </FadeIn>
    ),
    p: ({ children }) => (
      <FadeIn as="p" className="mt-3" y={6} duration={0.35}>
        {children}
      </FadeIn>
    ),
    a: (props) => <a {...props} className={`${props.className} inline-anchor break-words`}></a>,
    ol: ({ children }) => (
      <FadeIn as="ol" className="list-decimal pl-5 flex flex-col gap-2 mt-3" y={8} duration={0.35}>
        {children}
      </FadeIn>
    ),
    ul: ({ children }) => (
      <FadeIn as="ul" className="list-disc pl-5 flex flex-col gap-2 mt-3" y={8} duration={0.35}>
        {children}
      </FadeIn>
    ),
    li: ({ children }) => <li className="wrap-break-words">{children}</li>,
    blockquote: ({ children }) => (
      <FadeIn as="blockquote" className="border-l-2 border-white/30 pl-4 my-2 italic text-white/70" y={8} duration={0.35}>
        {children}
      </FadeIn>
    ),
    span: ({ className, children, ...props }) => {
      if (className?.includes("katex-display")) {
        return (
          <FadeIn as="span" y={8} duration={0.35} className="my-1 py-4 flex items-center justify-center">
            <span className={`${className} block px-2 py-1 my-0!`} {...props}>
              {children}
            </span>
          </FadeIn>
        );
      }
      return (
        <span className={className} {...props}>
          {children}
        </span>
      );
    },
    pre: ({ children, ...props }) => (
      <FadeIn as="pre" className="bg-[#181818] p-4 pb-5 rounded-md my-2 border border-white/10 text-[0.9rem] relative group" y={10} duration={0.4} {...props}>
        {children}
      </FadeIn>
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
      ) : src?.startsWith("http") ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={text} className={imgClassName} style={hasExplicitWidth ? { width } : undefined} {...props} />
      ) : (
        <Image
          src={src || ""}
          alt={text}
          width={0}
          height={0}
          sizes={hasExplicitWidth ? width : "100vw"}
          className={imgClassName}
          style={hasExplicitWidth ? { width } : undefined}
          {...props}
        />
      );

      return (
        <FadeIn as="span" className={`flex my-4 ${wrapperAlignClass}`} y={12} duration={0.4}>
          <span className="inline-flex flex-col items-center">
            <ImageViewer src={src || ""} alt={text}>
              {image}
            </ImageViewer>
            {caption && <span className="text-sm text-white/50 mt-1.5 italic">{caption}</span>}
          </span>
        </FadeIn>
      );
    },
    MicrosoftLearnQuote: (props) => (
      <FadeIn y={10}>
        <MicrosoftLearnQuote {...props} />
      </FadeIn>
    ),
    UndocumentedStruct: (props) => (
      <FadeIn y={10}>
        <UndocumentedStruct {...props} />
      </FadeIn>
    ),
    YouTubeVideo: (props) => (
      <FadeIn y={12}>
        <YouTubeVideo className="[&>div]:border [&>div]:border-white/10 mt-3" {...props} />
      </FadeIn>
    ),
    ...components,
  };
}

