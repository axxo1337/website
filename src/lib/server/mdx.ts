import fs from "fs";
import path from "path";
import { TPostStatus } from "../client/types/post";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: Record<string, any> = {};

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
        result[key] = JSON.parse(valStr.replace(/'/g, '"'));
      } catch {
        result[key] = [];
      }
    } else {
      result[key] = valStr;
    }
  }

  return result;
}

export function readMetadataFromFile(mdxPath: string, slug: string): MDXMetadata | null {
  if (!fs.existsSync(mdxPath)) return null;

  const fd = fs.openSync(mdxPath, "r");
  const CHUNK_SIZE = 2048;
  const buffer = Buffer.alloc(CHUNK_SIZE);
  let accumulated = "";
  let metadata: Partial<MDXMetadata> = {};

  try {
    let bytesRead = 0;
    while ((bytesRead = fs.readSync(fd, buffer, 0, CHUNK_SIZE, null)) > 0) {
      accumulated += buffer.toString("utf8", 0, bytesRead);
      if (accumulated.includes("};")) {
        metadata = parseMetadata(accumulated);
        if (Object.keys(metadata).length > 0) break;
      }
      if (accumulated.length > 16384) break;
    }
  } catch (err) {
    console.error(`Error reading metadata from ${mdxPath}:`, err);
  } finally {
    fs.closeSync(fd);
  }

  if (Object.keys(metadata).length === 0) {
    return null;
  }

  return { ...metadata, slug } as MDXMetadata;
}

export function getContentMetadata(contentType: ContentType, slug: string): MDXMetadata | null {
  const contentDir = getContentDirectory(contentType);
  const mdxPath = path.join(contentDir, `${slug}.mdx`);
  return readMetadataFromFile(mdxPath, slug);
}

export async function getAllContentMetadata(contentType: ContentType): Promise<MDXMetadata[]> {
  const slugs = getContentSlugs(contentType);
  const contentDir = getContentDirectory(contentType);

  const all = slugs
    .map((slug) => {
      const mdxPath = path.join(contentDir, `${slug}.mdx`);
      return readMetadataFromFile(mdxPath, slug);
    })
    .filter((item): item is MDXMetadata => item !== null);

  return all.filter((item) => item.status !== "DRAFT");
}

export async function getAdjacentContent(
  contentType: ContentType,
  currentSlug: string,
): Promise<{ prev: MDXMetadata | null; next: MDXMetadata | null }> {
  const all = await getAllContentMetadata(contentType);
  const sorted = all.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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
  youtubeId?: string | null;
  description?: string;
  thumbnailPath?: string;
  tags?: string[];
  status: TPostStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
