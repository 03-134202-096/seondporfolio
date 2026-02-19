import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Blog — Research, Data Science & AI Insights',
  description:
    'Expert guides on research paper writing, data analysis, machine learning, and academic publishing. Tips, tutorials, and insights from DeepDivers.',
  alternates: {
    canonical: 'https://deepdivers.services/blog',
  },
  openGraph: {
    title: 'Blog — Research, Data Science & AI Insights | DeepDivers',
    description:
      'Expert guides on research paper writing, data analysis, ML/AI, and academic publishing.',
    url: 'https://deepdivers.services/blog',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

function BlogListJsonLd() {
  const siteUrl = 'https://deepdivers.services';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'DeepDivers Blog — Research, Data Science & AI Insights',
    description:
      'Expert guides and tutorials on research paper writing, data analysis, machine learning, and academic publishing.',
    url: `${siteUrl}/blog`,
    isPartOf: { '@id': `${siteUrl}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function BlogPage() {
  return (
    <main className={styles.blogPage}>
      <BlogListJsonLd />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.badge}>Blog</span>
          <h1 className={styles.heroTitle}>
            Research, Data Science &{' '}
            <span className={styles.highlight}>AI Insights</span>
          </h1>
          <p className={styles.heroDescription}>
            Expert guides, tutorials, and industry insights from our team of published
            researchers and data scientists.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className={styles.blogSection}>
        <div className={styles.container}>
          {blogPosts.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className={styles.blogGrid}>
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className={styles.blogCard}
                >
                  <div className={styles.cardImageWrapper}>
                    <Image
                      src={post.coverImage}
                      alt={post.coverImageAlt}
                      width={600}
                      height={340}
                      className={styles.cardImage}
                    />
                    <span className={styles.cardCategory}>{post.category}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardMeta}>
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
                    <h2 className={styles.cardTitle}>{post.title}</h2>
                    <p className={styles.cardExcerpt}>{post.excerpt}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.authorName}>By {post.author}</span>
                      <span className={styles.readMore}>Read Article →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Need Help With Your Research?</h2>
          <p className={styles.ctaDescription}>
            Our team of published researchers can help you write, format, and publish
            your paper in top-tier journals.
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

      {/* Back to Home */}
      <div className={styles.backHome}>
        <Link href="/" className={styles.backHomeLink}>
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
