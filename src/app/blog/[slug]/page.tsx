import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPostBySlug, getAllBlogSlugs } from '@/data/blog';
import Header from '@/components/Header/Header';
import styles from './post.module.css';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all blog posts at build time.
 */
export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

/**
 * Generate metadata for each blog post dynamically.
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  const siteUrl = 'https://deepdivers.services';

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `${siteUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.coverImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [post.coverImage],
    },
  };
}

/**
 * Structured data for individual blog post — Article schema for Google rich results.
 */
function BlogPostJsonLd({ slug }: { slug: string }) {
  const post = getBlogPostBySlug(slug);
  if (!post) return null;

  const siteUrl = 'https://deepdivers.services';

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: post.title,
        description: post.metaDescription,
        image: `${siteUrl}${post.coverImage}`,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: {
          '@type': 'Person',
          name: post.author,
          url: siteUrl,
        },
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${siteUrl}/blog/${post.slug}`,
        },
        keywords: post.keywords.join(', '),
        articleSection: post.category,
        wordCount: post.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
        inLanguage: 'en-US',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Find related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <main className={styles.postPage}>
      <BlogPostJsonLd slug={slug} />
      <Header />

      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <div className={styles.container}>
          <Link href="/">Home</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href="/blog">Blog</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{post.category}</span>
        </div>
      </nav>

      {/* Article */}
      <article className={styles.article}>
        <div className={styles.container}>
          {/* Header */}
          <header className={styles.articleHeader}>
            <span className={styles.badge}>{post.category}</span>
            <h1 className={styles.articleTitle}>{post.title}</h1>
            <div className={styles.articleMeta}>
              <span className={styles.metaAuthor}>By {post.author}</span>
              <span className={styles.metaSep}>·</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className={styles.metaSep}>·</span>
              <span>{post.readingTime}</span>
            </div>
          </header>

          {/* Cover Image */}
          <div className={styles.coverWrapper}>
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt}
              width={1200}
              height={630}
              className={styles.coverImage}
              priority
            />
          </div>

          {/* Article Body */}
          <div
            className={styles.articleBody}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className={styles.tags}>
            {post.keywords.slice(0, 6).map((keyword) => (
              <span key={keyword} className={styles.tag}>
                {keyword}
              </span>
            ))}
          </div>

          {/* Author Box */}
          <div className={styles.authorBox}>
            <Image
              src="/ProfilePicture.webp"
              alt={`${post.author} — DeepDivers`}
              width={64}
              height={64}
              className={styles.authorAvatar}
            />
            <div>
              <h4 className={styles.authorBoxName}>{post.author}</h4>
              <p className={styles.authorBoxBio}>
                Founder & Team Lead at DeepDivers. Published researcher in AI, deep learning,
                and medical informatics with papers in IEEE Access, Frontiers, and Wiley.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.container}>
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className={styles.relatedCard}
                >
                  <h3>{related.title}</h3>
                  <span className={styles.relatedMeta}>
                    {new Date(related.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}{' '}
                    · {related.readingTime}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Need Professional Help With Your Research?</h2>
          <p className={styles.ctaDescription}>
            Our team of published researchers offers end-to-end research paper writing,
            data analysis, AI/ML experiments, and journal submission support.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/#service-catalog" className={styles.btnPrimary}>
              Browse Services →
            </Link>
            <Link href="/#contact" className={styles.btnSecondary}>
              Get a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Back */}
      <div className={styles.backHome}>
        <Link href="/blog" className={styles.backHomeLink}>
          ← Back to Blog
        </Link>
      </div>
    </main>
  );
}
