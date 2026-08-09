import { MetadataRoute } from 'next';
import { getAllContentMetadata } from '@/lib/server/mdx';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://axxowastaken.me';

  const projects = await getAllContentMetadata('project');
  const projectRoutes = projects.map((metadata) => ({
    url: `${baseUrl}/project/${metadata.slug}`,
    lastModified: metadata.updatedAt || new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const videos = await getAllContentMetadata('video');
  const videoRoutes = videos.map((metadata) => ({
    url: `${baseUrl}/video/${metadata.slug}`,
    lastModified: metadata.updatedAt || new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

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