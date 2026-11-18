import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import { SITE, whatsappLink } from '@/config/site';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you were looking for does not exist. Browse our services, guides or contact DeepDivers.',
  robots: { index: false, follow: true },
};

const links = [
  { href: '/', label: 'Home', description: 'Start from the homepage' },
  { href: '/#service-catalog', label: 'Services & prices', description: 'Browse the full service catalog' },
  { href: '/blog', label: 'Guides & blog', description: 'Research, statistics and publishing guides' },
  { href: '/#contact', label: 'Get a free quote', description: 'Tell us what you need' },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.inner}>
          <p className={styles.code}>404</p>
          <h1 className={styles.title}>We couldn&apos;t find that page</h1>
          <p className={styles.text}>
            The link may be old or mistyped. These pages should help you find what you need.
          </p>
          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.card}>
                  <span className={styles.cardLabel}>{link.label} →</span>
                  <span className={styles.cardText}>{link.description}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className={styles.help}>
            Still stuck? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or message us on{' '}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
