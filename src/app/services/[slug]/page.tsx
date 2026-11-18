import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Contact from '@/components/Contact/Contact';
import { SITE, whatsappLink } from '@/config/site';
import { getCatalogItem } from '@/data/catalog';
import { getBlogPostBySlug } from '@/data/blog';
import { AUTHORSHIP_NOTE, getServicePage, servicePages, type ServicePage } from '@/data/servicePages';
import styles from '../services.module.css';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

/** Lowest number in a catalog price such as "From $40" or "$100–$300" */
function priceValue(price: string): number {
  const match = price.match(/\$(\d+)/);
  return match ? parseInt(match[1], 10) : Infinity;
}

function catalogRows(page: ServicePage) {
  return page.catalogItems
    .map((name) => getCatalogItem(name))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

function startingPrice(page: ServicePage): number {
  return Math.min(...catalogRows(page).map((item) => priceValue(item.price)));
}

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return { title: 'Service not found' };

  const url = `${SITE.url}/services/${page.slug}`;
  const description = `${page.metaDescription} From $${startingPrice(page)}.`;

  return {
    title: page.metaTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${page.metaTitle} | DeepDivers`,
      description,
      url,
      type: 'website',
      images: [{ url: SITE.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.metaTitle} | DeepDivers`,
      description,
      images: [SITE.ogImage],
    },
  };
}

function ServiceJsonLd({ page }: { page: ServicePage }) {
  const url = `${SITE.url}/services/${page.slug}`;
  const rows = catalogRows(page);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: page.shortName,
        serviceType: page.serviceType,
        description: page.intro,
        url,
        provider: { '@id': `${SITE.url}/#organization` },
        areaServed: 'Worldwide',
        audience: { '@type': 'Audience', audienceType: 'Students, researchers and academics' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${page.shortName} prices`,
          itemListElement: rows.map((item) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: item.name },
            priceSpecification: {
              '@type': 'PriceSpecification',
              priceCurrency: 'USD',
              minPrice: priceValue(item.price),
            },
          })),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/services` },
          { '@type': 'ListItem', position: 3, name: page.shortName, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
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

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const rows = catalogRows(page);
  const guides = page.relatedGuides
    .map((guideSlug) => getBlogPostBySlug(guideSlug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));
  const otherServices = servicePages.filter((other) => other.slug !== page.slug);

  return (
    <>
      <Header />
      <main className={styles.page}>
        <ServiceJsonLd page={page} />

        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <div className={styles.container}>
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span>{page.shortName}</span>
          </div>
        </nav>

        <section className={styles.hero}>
          <div className={styles.container}>
            <span className={styles.badge}>{page.icon} {page.shortName}</span>
            <h1 className={styles.title}>{page.name}</h1>
            <p className={styles.lead}>{page.intro}</p>
            <div className={styles.actions}>
              <a href="#quote" className="btn btn-primary">Get a free quote →</a>
              <a
                href={whatsappLink(`Hi DeepDivers! I'd like a quote for ${page.shortName}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Ask on WhatsApp
              </a>
            </div>
            <ul className={styles.trust}>
              <li>From ${startingPrice(page)} (USD)</li>
              <li>Quote within 24 hours</li>
              <li>Confidential, NDA on request</li>
              <li>Published researchers</li>
            </ul>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.twoCol}>
              <div>
                <h2>Who it&apos;s for</h2>
                <ul className={styles.checkList}>
                  {page.audience.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <aside className={styles.note}>
                <h2 className={styles.noteTitle}>You stay the author</h2>
                <p>{AUTHORSHIP_NOTE}</p>
              </aside>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.container}>
            <h2>What&apos;s included</h2>
            <div className={styles.grid}>
              {page.included.map((item) => (
                <div key={item.title} className={styles.card}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
            <p className={styles.tools}>
              <strong>Tools:</strong> {page.tools.join(' · ')}
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2>Prices and turnaround</h2>
            <p className={styles.sectionLead}>
              Starting prices in US dollars. You get a fixed quote for your exact files before any work
              starts, and large projects can be paid in milestones.
            </p>
            <div className={styles.tableWrap}>
              <table className={styles.priceTable}>
                <thead>
                  <tr>
                    <th scope="col">Service</th>
                    <th scope="col">Price</th>
                    <th scope="col">Typical turnaround</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((item) => (
                    <tr key={item.name}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.delivery}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.container}>
            <h2>How it works</h2>
            <ol className={styles.steps}>
              {page.process.map((step, index) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.stepNumber}>{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2>Frequently asked questions</h2>
            <div className={styles.faqs}>
              {page.faqs.map((faq, index) => (
                <details key={faq.question} className={styles.faq} open={index === 0}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {guides.length > 0 && (
          <section className={`${styles.section} ${styles.sectionAlt}`}>
            <div className={styles.container}>
              <h2>Free guides</h2>
              <div className={styles.grid}>
                {guides.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.guideCard}>
                    <span className={styles.guideMeta}>{post.category} · {post.readingTime}</span>
                    <h3>{post.title}</h3>
                    <span className={styles.guideMore}>Read the guide →</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <div id="quote">
          <Contact defaultService={rows[0]?.name ?? page.shortName} />
        </div>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2>Other services</h2>
            <ul className={styles.otherServices}>
              {otherServices.map((other) => (
                <li key={other.slug}>
                  <Link href={`/services/${other.slug}`}>
                    {other.icon} {other.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
