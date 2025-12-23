import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl first:mt-0! mt-4 py-0.5 mb-2">
        {children}
      </h3>
    ),
    p: ({ children }) => <p className="py-0.5">{children}</p>,
    a: (props) => (
      <a {...props} className={`${props.className} inline-anchor`}></a>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-5 flex flex-col gap-2">{children}</ol>
    ),
    li: ({ children }) => <li>{children}</li>,
    ...components,
  };
}
