import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { SITE } from '@/config/site';
import { getCatalogItem } from '@/data/catalog';
import { AUTHORSHIP_NOTE, servicePages } from '@/data/servicePages';
import styles from './services.module.css';

const description =
  'Statistics, academic editing, journal formatting, systematic reviews, proposal consultation, reviewer responses and ML research support. You stay the author.';

export const metadata: Metadata = {
  title: 'Research Support Services',
  description,
  alternates: { canonical: `${SITE.url}/services` },
  openGraph: {
    title: 'Research Support Services | DeepDivers',
    description,
    url: `${SITE.url}/services`,
    type: 'website',
    images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
  },
};

function startingPrice(names: string[]): number {
  const prices = names
    .map((name) => getCatalogItem(name)?.price.match(/\$(\d+)/)?.[1])
    .filter(Boolean)
    .map(Number);
  return Math.min(...prices);
}

function ServicesJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${SITE.url}/services#webpage`,
        url: `${SITE.url}/services`,
        name: 'Research Support Services',
        description,
        isPartOf: { '@id': `${SITE.url}/#website` },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: servicePages.map((page, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${SITE.url}/services/${page.slug}`,
            name: page.shortName,
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/services` },
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

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <ServicesJsonLd />

        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <div className={styles.container}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>Services</span>
          </div>
        </nav>

        <section className={styles.hero}>
          <div className={styles.container}>
            <span className={styles.badge}>Services</span>
            <h1 className={styles.title}>Research support for students, researchers and faculty</h1>
            <p className={styles.lead}>
              Published researchers helping you analyse data, edit and format manuscripts, run
              systematic reviews and machine learning experiments, and answer reviewers, for clients
              worldwide with prices in US dollars.
            </p>
            <div className={styles.actions}>
              <Link href="/#contact" className="btn btn-primary">Get a free quote →</Link>
              <Link href="/#service-catalog" className="btn btn-secondary">See all 90+ catalog items</Link>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.grid}>
              {servicePages.map((page) => (
                <Link key={page.slug} href={`/services/${page.slug}`} className={styles.serviceCard}>
                  <span className={styles.serviceIcon} aria-hidden="true">{page.icon}</span>
                  <h2>{page.shortName}</h2>
                  <p>{page.summary}</p>
                  <span className={styles.servicePrice}>From ${startingPrice(page.catalogItems)}</span>
                  <span className={styles.guideMore}>View service →</span>
                </Link>
              ))}
            </div>
            <aside className={`${styles.note} ${styles.noteWide}`}>
              <h2 className={styles.noteTitle}>You stay the author</h2>
              <p>{AUTHORSHIP_NOTE}</p>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
