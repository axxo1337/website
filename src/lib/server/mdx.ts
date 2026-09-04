import fs from "fs";
import path from "path";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import { compareDesc, max, parseISO } from "date-fns";
import { TPostCategory, TPostStatus } from "../client/types/post";

//
// [SECTION] Defines
//

const contentRelativePathsMap = new Map<ContentType, string>([
  ["video", "(videos)/video"],
  ["project", "(projects)/project"],
]);

//
// [SECTION] Functions
//

function getContentDirectory(contentType: ContentType): string {
  return path.join(process.cwd(), "src/app", contentRelativePathsMap.get(contentType) ?? "", "[slug]");
}

export function getContentSlugs(contentType: ContentType): string[] {
  const contentDir = getContentDirectory(contentType);

  if (!fs.existsSync(contentDir)) {
    return [];
  }

  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

export function contentExists(contentType: ContentType, slug: string): boolean {
  const contentDir = getContentDirectory(contentType);
  const mdxPath = path.join(contentDir, `${slug}.mdx`);

  return fs.existsSync(mdxPath);
}

export function parseMetadata(content: string): Partial<MDXMetadata> {
  const match = content.match(/export const metadata = \s*\{([\s\S]*?)\};/);
  if (!match) return {};

  const objStr = match[1];
  const result: Record<string, unknown> = {};

  const cleanObjStr = objStr.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");

  // Matches object keys and captures their values (supporting double, single, and backtick quoted strings with escaped chars, arrays, and primitive literals)
  const regex =
    /\b([a-zA-Z0-9_]+)\s*:\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\[[\s\S]*?\]|null|true|false|\d+)/g;

  let m;
  while ((m = regex.exec(cleanObjStr)) !== null) {
    const key = m[1];
    const valStr = m[2].trim();

    if (valStr === "null") {
      result[key] = null;
    } else if (valStr === "true") {
      result[key] = true;
    } else if (valStr === "false") {
      result[key] = false;
    } else if (
      (valStr.startsWith('"') && valStr.endsWith('"')) ||
      (valStr.startsWith("'") && valStr.endsWith("'")) ||
      (valStr.startsWith("`") && valStr.endsWith("`"))
    ) {
      result[key] = valStr.slice(1, -1);
    } else if (valStr.startsWith("[") && valStr.endsWith("]")) {
      try {
        const jsonArrStr = valStr.replace(/'((?:[^'\\]|\\.)*)'/g, '"$1"');
        result[key] = JSON.parse(jsonArrStr);
      } catch {
        result[key] = [];
      }
    } else {
      result[key] = valStr;
    }
  }

  return result;
}

export function calculateReadingTime(rawContent: string, wpm: number = 200): string {
  const text = rawContent
    .replace(/export const metadata = \s*\{[\s\S]*?\};/, "")
    .replace(/<[^>]*>/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/!\[.*?\]\(.*?\)/g, "")
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1")
    .replace(/[#*`_~]/g, "");

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wpm));
  return `${minutes} min read`;
}

export function readMetadataFromFile(mdxPath: string, slug: string): MDXMetadata | null {
  if (!fs.existsSync(mdxPath)) return null;

  try {
    const fileContent = fs.readFileSync(mdxPath, "utf-8");
    const metadata = parseMetadata(fileContent);
    if (Object.keys(metadata).length === 0) return null;

    const readingTime = calculateReadingTime(fileContent);

    return { ...metadata, slug, readingTime } as MDXMetadata;
  } catch (err) {
    console.error(`Error reading metadata from ${mdxPath}:`, err);
    return null;
  }
}

export const getContentMetadata = cache((contentType: ContentType, slug: string): MDXMetadata | null => {
  const contentDir = getContentDirectory(contentType);
  const mdxPath = path.join(contentDir, `${slug}.mdx`);
  return readMetadataFromFile(mdxPath, slug);
});

export const getAllContentMetadata = cache(async (contentType: ContentType): Promise<MDXMetadata[]> => {
  return unstable_cache(
    async () => {
      const slugs = getContentSlugs(contentType);
      const contentDir = getContentDirectory(contentType);

      const all = slugs
        .map((slug) => {
          const mdxPath = path.join(contentDir, `${slug}.mdx`);
          return readMetadataFromFile(mdxPath, slug);
        })
        .filter((item): item is MDXMetadata => item !== null);

      const filtered = process.env.NODE_ENV === "production"
        ? all.filter((item) => item.status !== "DRAFT")
        : all;

      return filtered.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)));
    },
    [`all-content-metadata-${contentType}`],
    {
      revalidate: 3600,
      tags: [`mdx-${contentType}`],
    }
  )();
});

export function getMostRecentUpdate(items: MDXMetadata[]): Date {
  if (items.length === 0) return new Date(0);
  return max(items.map((item) => parseISO(item.updatedAt)));
}

export async function getAdjacentContent(
  contentType: ContentType,
  currentSlug: string,
): Promise<{ prev: MDXMetadata | null; next: MDXMetadata | null }> {
  const sorted = await getAllContentMetadata(contentType);

  const currentIndex = sorted.findIndex((item) => item.slug === currentSlug);

  return {
    prev: currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null,
    next: currentIndex > 0 ? sorted[currentIndex - 1] : null,
  };
}

//
// [SECTION] Types
//

export type ContentType = "video" | "project";

export interface MDXMetadata {
  slug: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  readingTime?: string;
  youtubeId?: string | null;
  description?: string;
  thumbnailPath?: string;
  animationPath?: string | null;
  animationBackground?: string | null;
  animationBackgroundColor?: string | null;
  animationPreview?: string | null;
  preview?: string | null;
  tags?: string[];
  categories?: TPostCategory[];
  status: TPostStatus;
  [key: string]: unknown;
}
