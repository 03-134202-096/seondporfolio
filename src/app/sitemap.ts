import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blog';
import { SITE } from '@/config/site';

/**
 * Generates sitemap.xml for search engine crawlers.
 *
 * Guidelines applied:
 *  - Only real, indexable URLs (no hash fragments, no 404 or noindex pages).
 *  - `lastModified` is the date the page content really changed. Search engines
 *    ignore lastmod values that change on every build, so update these by hand
 *    when a page is edited.
 *  - `images` are attached per page so Google Image Search can index them.
 */

/** Dates the static pages last changed in a meaningful way (YYYY-MM-DD). */
const PAGE_UPDATED = {
  home: '2026-11-18',
  about: '2026-11-18',
  blog: '2026-11-18',
  terms: '2026-11-18',
  privacy: '2026-11-18',
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(PAGE_UPDATED.home),
      changeFrequency: 'weekly',
      priority: 1,
      images: [`${baseUrl}${SITE.ogImage}`, `${baseUrl}/landingIntro.webp`],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(PAGE_UPDATED.about),
      changeFrequency: 'monthly',
      priority: 0.8,
      images: [`${baseUrl}/ProfilePicture.webp`],
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(PAGE_UPDATED.blog),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(PAGE_UPDATED.terms),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(PAGE_UPDATED.privacy),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    images: post.coverImage
      ? [post.coverImage.startsWith('http') ? post.coverImage : encodeURI(`${baseUrl}${post.coverImage}`)]
      : undefined,
  }));

  return [...staticPages, ...blogPages];
}
