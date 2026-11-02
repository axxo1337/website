import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  output: "export",
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.wasm": {
        loaders: ["./scripts/wasm-url-loader.cjs"],
        as: "*.js",
      },
    },
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
