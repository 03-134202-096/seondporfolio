import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog';

/**
 * Generates sitemap.xml for search engine crawlers.
 *
 * Guidelines applied:
 *  - Only real crawlable URLs are included (hash fragments are ignored by Google).
 *  - `lastModified` is dynamic so Googlebot sees fresh dates on each build.
 *  - `images` are attached per page so Google Image Search can index them.
 *  - Priority reflects the business value of each URL for ranking.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://deepdivers.services';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      images: [
        `${baseUrl}/og-image.png`,
        `${baseUrl}/landingIntro.webp`,
        `${baseUrl}/logo.png`,
      ],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [`${baseUrl}/ProfilePicture.webp`],
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2026-10-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    images: post.coverImage
      ? [post.coverImage.startsWith('http') ? post.coverImage : `${baseUrl}${post.coverImage}`]
      : undefined,
  }));

  return [...staticPages, ...blogPages];
}
