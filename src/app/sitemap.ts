import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { getContentMetadata } from '@/lib/server/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://axxowastaken.me';
  
  const projectsDirectory = path.join(process.cwd(), 'src/app/(projects)/project/[slug]');
  const projectFiles = fs.readdirSync(projectsDirectory);
  const projectRoutes = projectFiles
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const metadata = getContentMetadata('project', slug);
      if (!metadata) return null;
      return {
        url: `${baseUrl}/project/${slug}`,
        lastModified: metadata.updatedAt || new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      };
    })
    .filter((route): route is NonNullable<typeof route> => route !== null);

  const videosDirectory = path.join(process.cwd(), 'src/app/(videos)/video/[slug]');
  const videoFiles = fs.readdirSync(videosDirectory);
  const videoRoutes = videoFiles
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace('.mdx', '');
      const metadata = getContentMetadata('video', slug);
      if (!metadata) return null;
      return {
        url: `${baseUrl}/video/${slug}`,
        lastModified: metadata.updatedAt || new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      };
    })
    .filter((route): route is NonNullable<typeof route> => route !== null);

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