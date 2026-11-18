import { MetadataRoute } from 'next';
import { SITE } from '@/config/site';

/**
 * Programmatic robots.txt (App Router).
 *
 * Rules:
 *  - Every crawler may read the whole site except the API. /_next/ stays open:
 *    search engines need the CSS and JS there to render pages properly.
 *  - AI answer engines that cite and link back (ChatGPT search, Perplexity,
 *    Claude search) are allowed, so the guides can be found there too.
 *  - Crawlers that only collect AI training data are blocked.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/api/'],
      },
      // AI training-only crawlers — blocked (no traffic comes back from these).
      { userAgent: 'GPTBot', disallow: ['/'] },
      { userAgent: 'CCBot', disallow: ['/'] },
      { userAgent: 'Google-Extended', disallow: ['/'] },
      { userAgent: 'anthropic-ai', disallow: ['/'] },
      { userAgent: 'ClaudeBot', disallow: ['/'] },
      { userAgent: 'Bytespider', disallow: ['/'] },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
