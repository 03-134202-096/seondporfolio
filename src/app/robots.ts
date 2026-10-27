import { MetadataRoute } from 'next';

/**
 * Programmatic robots.txt — overrides public/robots.txt in Next.js App Router.
 *
 * Rules:
 *  - All reputable bots: full site allowed, API/private assets blocked.
 *  - Googlebot & Bingbot: explicit allow + large preview permissions.
 *  - Known scraper/AI-training bots: explicitly blocked to protect content.
 *
 * NOTE: Delete `public/robots.txt` to avoid conflicts with this programmatic one.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = 'https://deepdivers.services';

  return {
    rules: [
      // Default: allow all respectful bots, deny private endpoints
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/api/', '/_next/', '/private/', '/*.json$'],
      },
      // Googlebot — explicit for clarity on image, mobile & news surfaces
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: ['/api/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/'],
        disallow: ['/api/'],
      },
      // Bing
      {
        userAgent: 'Bingbot',
        allow: ['/'],
        disallow: ['/api/'],
      },
      // AI/training crawlers — block to protect proprietary catalog content.
      // Comment any out if the user wants to allow it.
      { userAgent: 'GPTBot', disallow: ['/'] },
      { userAgent: 'ChatGPT-User', disallow: ['/'] },
      { userAgent: 'CCBot', disallow: ['/'] },
      { userAgent: 'anthropic-ai', disallow: ['/'] },
      { userAgent: 'ClaudeBot', disallow: ['/'] },
      { userAgent: 'PerplexityBot', disallow: ['/'] },
      { userAgent: 'Google-Extended', disallow: ['/'] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
