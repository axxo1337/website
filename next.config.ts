import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    viewTransition: true,
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    unoptimized: true,
    minimumCacheTTL: 604800,
    formats: ["image/avif", "image/webp"],
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ["remark-math"],
    rehypePlugins: ["rehype-katex", "rehype-highlight"],
  },
});

export default withMDX(nextConfig);
