import { blogPosts } from '@/data/blog';

/**
 * RSS 2.0 feed for the DeepDivers blog.
 *
 * Why: Lets subscribers (readers, aggregators, Feedly, email newsletters,
 * and some SEO services) auto-discover new posts. Also pinged by some
 * search engines as a freshness signal.
 *
 * Served at: /blog/rss.xml
 *
 * The <link rel="alternate" type="application/rss+xml"> advertised in
 * app/layout.tsx points here, so modern readers detect it automatically.
 */
export const dynamic = 'force-static';
export const revalidate = 3600; // Regenerate once per hour at build time

const SITE_URL = 'https://deepdivers.services';
const SITE_TITLE = 'DeepDivers Blog — Research, Data Science & AI Insights';
const SITE_DESCRIPTION =
  'Expert guides and tutorials on research paper writing, data analysis, machine learning, AI, and academic publishing from DeepDivers.';

// XML-escape for text and attribute content.
function esc(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const lastBuildDate = new Date().toUTCString();

  const items = blogPosts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const pubDate = new Date(post.publishedAt).toUTCString();
      const categories = (post.keywords ?? [])
        .slice(0, 6)
        .map((kw) => `      <category>${esc(kw)}</category>`)
        .join('\n');

      return `    <item>
      <title>${esc(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>support@deepdivers.services (${esc(post.author)})</author>
      <description>${esc(post.excerpt || post.metaDescription)}</description>
${categories}
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_TITLE)}</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>${esc(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>Next.js — DeepDivers</generator>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
