import { MetadataRoute } from 'next';

/**
 * Programmatic robots.txt — overrides public/robots.txt in Next.js App Router.
 * This gives better control and is the recommended approach.
 *
 * NOTE: Delete `public/robots.txt` to avoid conflicts.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = 'https://deepdivers.services';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
