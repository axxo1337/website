import fs from "fs";
import path from "path";

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
  return path.join(
    process.cwd(),
    "src/app",
    contentRelativePathsMap.get(contentType) ?? "",
    "[slug]",
  );
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

export async function getAllContentMetadata(
  contentType: ContentType,
): Promise<MDXMetadata[]> {
  const slugs = getContentSlugs(contentType);
  const metadataPromises = slugs.map(async (slug) => {
    const contentRelativePath = contentRelativePathsMap.get(contentType);
    const post = await import(
      `@/app/${contentRelativePath}/[slug]/${slug}.mdx`
    );
    return { ...post.metadata, slug } as MDXMetadata;
  });

  return Promise.all(metadataPromises);
}

export async function getAdjacentContent(
  contentType: ContentType,
  currentSlug: string,
): Promise<{ prev: MDXMetadata | null; next: MDXMetadata | null }> {
  const all = await getAllContentMetadata(contentType);
  const sorted = all.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
