import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { ReactNode } from "react";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { slugify } from "./lib/client/utils";

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
      <h3
        id={slugify(extractText(children))}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        id={slugify(extractText(children))}
        className="text-xl md:text-2xl first:mt-0! mt-5 py-0.5 mb-2 scroll-mt-24"
      >
        {children}
      </h4>
    ),
    p: ({ children }) => <p className="py-0.5">{children}</p>,
    a: (props) => (
      <a {...props} className={`${props.className} inline-anchor`}></a>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-5 flex flex-col gap-2 my-1">{children}</ol>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-5 flex flex-col gap-2 my-1">{children}</ul>
    ),
    li: ({ children }) => <li className="break-words">{children}</li>,
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
      <pre
        className="bg-[#181818] p-4 rounded-md my-2 border border-white/10"
        {...props}
      >
        {children}
      </pre>
    ),
    code: ({ className, children, ...props }) => {
      if (!className) {
        return <code {...props}>{children}</code>;
      }

      return (
        <ScrollArea>
          <code className={`${className} bg-transparent! p-0!`} {...props}>
            {children}
          </code>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      );
    },
    img: ({ src, alt, ...props }) => {
      if (src?.startsWith("http")) {
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt || ""}
            className="rounded-lg my-4 w-full h-auto"
            {...props}
          />
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
