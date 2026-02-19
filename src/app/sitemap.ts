import { MetadataRoute } from 'next';

/**
 * Generates the sitemap.xml for search engine crawlers.
 * IMPORTANT: Only include real crawlable URLs — Google ignores hash fragments (#).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://deepdivers.services';

  return [
    {
      url: baseUrl,
      lastModified: new Date('2026-02-19'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date('2026-02-19'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2026-02-19'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
