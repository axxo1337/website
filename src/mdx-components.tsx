import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl first:mt-0! mt-5 py-0.5 mb-2">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl first:mt-0! mt-5 py-0.5 mb-2">
        {children}
      </h4>
    ),
    p: ({ children }) => <p className="py-0.5">{children}</p>,
    a: (props) => (
      <a {...props} className={`${props.className} inline-anchor`}></a>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-5 flex flex-col gap-2">{children}</ol>
    ),
    ul: ({ children }) => (
      <ol className="list-disc pl-5 flex flex-col gap-2">{children}</ol>
    ),
    li: ({ children }) => <li>{children}</li>,
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
    code: ({ className, children, ...props }) => {
      if (!className) {
        return <code {...props}>{children}</code>;
      }

      return (
        <div className="bg-[#181818] p-4 rounded-md my-1">
          <ScrollArea>
            <code className={className} {...props}>
              {children}
            </code>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
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
