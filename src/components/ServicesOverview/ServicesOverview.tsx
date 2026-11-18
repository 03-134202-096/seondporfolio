import Link from 'next/link';
import { getCatalogItem } from '@/data/catalog';
import { servicePages } from '@/data/servicePages';
import styles from './ServicesOverview.module.css';

function startingPrice(names: string[]): number {
  const prices = names
    .map((name) => getCatalogItem(name)?.price.match(/\$(\d+)/)?.[1])
    .filter(Boolean)
    .map(Number);
  return Math.min(...prices);
}

/** Homepage overview of the core services, each linking to its own page */
export default function ServicesOverview() {
  return (
    <section id="services" className={`section ${styles.overview}`}>
      <div className="container">
        <div className="section-header">
          <h2>How we can help</h2>
          <p>
            Research support from published researchers, priced in US dollars for clients
            worldwide. You stay the author; we analyse, edit, format and run the experiments.
          </p>
        </div>
        <div className={styles.grid}>
          {servicePages.map((page) => (
            <Link key={page.slug} href={`/services/${page.slug}`} className={styles.card}>
              <span className={styles.icon} aria-hidden="true">{page.icon}</span>
              <h3 className={styles.name}>{page.shortName}</h3>
              <p className={styles.summary}>{page.summary}</p>
              <span className={styles.footer}>
                <span className={styles.price}>From ${startingPrice(page.catalogItems)}</span>
                <span className={styles.more}>Details →</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
