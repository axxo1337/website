import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://axxowastaken.me';
  
  const projectsDirectory = path.join(process.cwd(), 'src/app/(projects)/project/[slug]');
  const projectFiles = fs.readdirSync(projectsDirectory);
  const projectRoutes = (await Promise.all(
    projectFiles
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace('.mdx', '');
        try {
          const post = await import(`@/app/(projects)/project/[slug]/${slug}.mdx`);
          return {
            url: `${baseUrl}/project/${slug}`,
            lastModified: post.metadata?.updatedAt || new Date().toISOString(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
          };
        } catch {
          return null;
        }
      })
  )).filter((route): route is NonNullable<typeof route> => route !== null);

  const videosDirectory = path.join(process.cwd(), 'src/app/(videos)/video/[slug]');
  const videoFiles = fs.readdirSync(videosDirectory);
  const videoRoutes = (await Promise.all(
    videoFiles
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace('.mdx', '');
        try {
          const post = await import(`@/app/(videos)/video/[slug]/${slug}.mdx`);
          return {
            url: `${baseUrl}/video/${slug}`,
            lastModified: post.metadata?.updatedAt || new Date().toISOString(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
          };
        } catch {
          return null;
        }
      })
  )).filter((route): route is NonNullable<typeof route> => route !== null);

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/references`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  return [...staticRoutes, ...projectRoutes, ...videoRoutes];
}