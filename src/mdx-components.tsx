import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { ReactNode } from "react";
import { slugify } from "./lib/client/utils";
import CodeBlock from "./components/ui/CodeBlock";

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
    a: (props) => <a {...props} className={`${props.className} inline-anchor`}></a>,
    ol: ({ children }) => <ol className="list-decimal pl-5 flex flex-col gap-2 mt-3">{children}</ol>,
    ul: ({ children }) => <ul className="list-disc pl-5 flex flex-col gap-2 mt-3">{children}</ul>,
    li: ({ children }) => <li className="wrap-break-words">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-white/30 pl-4 my-2 italic text-white/70">{children}</blockquote>
    ),
    span: ({ className, children, ...props }) => {
      if (className?.includes("katex-display")) {
        return (
          <div className="my-1 py-4 flex items-center justify-center">
            <span className={`${className} block px-2 py-1 my-0!`} {...props}>
              {children}
            </span>
          </div>
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
      if (src?.startsWith("http")) {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt || ""} className="rounded-lg my-4 w-full h-auto" {...props} />
        );
      }

      return (
        <Image
          src={src || ""}
          alt={alt || ""}
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-lg my-4 w-full h-auto"
          {...props}
        />
      );
    },
    ...components,
  };
}
