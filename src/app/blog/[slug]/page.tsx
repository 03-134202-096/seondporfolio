import type { Metadata } from 'next';
import { existsSync } from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPostBySlug, getAllBlogSlugs } from '@/data/blog';
import { SITE, founderPerson } from '@/config/site';
import { getServiceForGuide } from '@/data/servicePages';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
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
 * 1200 x 630 JPG share image for a post (made by scripts/generate_brand_assets.py).
 * Falls back to the cover image for posts that don't have one yet.
 */
function shareImageFor(slug: string, coverImage: string): string {
  const jpg = `/og/blog/${slug}.jpg`;
  return existsSync(path.join(process.cwd(), 'public', jpg)) ? jpg : encodeURI(coverImage);
}

/**
 * Generate metadata for each blog post dynamically.
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  const siteUrl = SITE.url;
  const shareImage = shareImageFor(post.slug, post.coverImage);

  return {
    title: post.title,
    description: post.metaDescription,
    authors: [{ name: post.author, url: SITE.founder.url }],
    alternates: {
      canonical: `${siteUrl}/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      url: `${siteUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      images: [{ url: shareImage, width: 1200, height: 630, alt: post.coverImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
      images: [shareImage],
    },
  };
}

/**
 * Structured data for an individual guide — BlogPosting (with the named author)
 * and BreadcrumbList.
 */
function BlogPostJsonLd({ slug }: { slug: string }) {
  const post = getBlogPostBySlug(slug);
  if (!post) return null;

  const siteUrl = SITE.url;
  const url = `${siteUrl}/blog/${post.slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: post.title,
        description: post.metaDescription,
        image: `${siteUrl}${shareImageFor(post.slug, post.coverImage)}`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        author: founderPerson,
        publisher: { '@id': `${siteUrl}/#organization` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': url },
        keywords: post.keywords.join(', '),
        articleSection: post.category,
        wordCount: post.content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length,
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
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

  const service = getServiceForGuide(post.slug);

  // Find related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className={styles.postPage}>
        <BlogPostJsonLd slug={slug} />

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
                <span className={styles.metaAuthor}>
                  By <Link href="/about">{post.author}</Link>
                </span>
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
                <p className={styles.authorBoxName}>
                  <Link href="/about">{post.author}</Link>
                </p>
                <p className={styles.authorBoxBio}>
                  Founder & Team Lead at DeepDivers. Published researcher in AI, deep learning,
                  and medical informatics with papers in IEEE Access, Frontiers, and Wiley.
                </p>
                <p className={styles.authorBoxLinks}>
                  <a href={SITE.founder.orcid} target="_blank" rel="noopener noreferrer">ORCID</a>
                  {' · '}
                  <a href={SITE.founder.scholar} target="_blank" rel="noopener noreferrer">Google Scholar</a>
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
            <h2 className={styles.ctaTitle}>
              {service ? `Need help with ${service.shortName.toLowerCase()}?` : 'Need help with your research?'}
            </h2>
            <p className={styles.ctaDescription}>
              {service
                ? service.summary
                : 'Statistics, editing, formatting, systematic reviews and ML research support from published researchers.'}{' '}
              You stay the author; we help you get it right.
            </p>
            <div className={styles.ctaButtons}>
              <Link href={service ? `/services/${service.slug}` : '/services'} className={styles.btnPrimary}>
                {service ? `See ${service.shortName} →` : 'Browse Services →'}
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
      <Footer />
    </>
  );
}
