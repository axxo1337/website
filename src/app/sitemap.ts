import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://axxowastaken.me";

  const projectsDirectory = path.join(process.cwd(), "app/(projects)/project/[slug]");
  const projectFolders = fs.readdirSync(projectsDirectory, { withFileTypes: true });
  const projectRoutes = (
    await Promise.all(
      projectFolders
        .filter((dirent) => dirent.isDirectory())
        .map(async (dirent) => {
          const slug = dirent.name;
          try {
            const post = await import(`@/${projectsDirectory}/${slug}/${slug}.mdx`);
            return {
              url: `${baseUrl}/project/${slug}`,
              lastModified: post.metadata?.updatedAt || new Date().toISOString(),
              changeFrequency: "monthly" as const,
              priority: 0.7,
            };
          } catch {
            return null;
          }
        })
    )
  ).filter((route): route is NonNullable<typeof route> => route !== null);

  const videosDirectory = path.join(process.cwd(), "app/(videos)/video/[slug]");
  const videoFolders = fs.readdirSync(videosDirectory, { withFileTypes: true });
  const videoRoutes = (
    await Promise.all(
      videoFolders
        .filter((dirent) => dirent.isDirectory())
        .map(async (dirent) => {
          const slug = dirent.name;
          try {
            const post = await import(`@/${videosDirectory}/${slug}/${slug}.mdx`);
            return {
              url: `${baseUrl}/video/${slug}`,
              lastModified: post.metadata?.updatedAt || new Date().toISOString(),
              changeFrequency: "monthly" as const,
              priority: 0.7,
            };
          } catch {
            return null;
          }
        })
    )
  ).filter((route): route is NonNullable<typeof route> => route !== null);

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/references`,
      lastModified: new Date().toISOString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  return [...staticRoutes, ...projectRoutes, ...videoRoutes];
}
