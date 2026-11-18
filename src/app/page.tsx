import {
  Header,
  Hero,
  CollapsibleSection,
  WhyChooseUs,
  ServiceCatalog,
  ServicesOverview,
  Pricing,
  Testimonials,
  Publications,
  Portfolio,
  Process,
  About,
  FAQ,
  Contact,
  Footer,
  PromoBanner,
  DiscountBalloon,
} from '@/components';

import type { Metadata } from 'next';
import { faqs } from '@/data/faqs';
import { SITE } from '@/config/site';
import { PROMO_CONFIG } from '@/config/promo';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/**
 * Structured data for the homepage — WebPage and FAQPage.
 * FAQPage is built from the same list the FAQ section renders, so it always
 * matches the visible questions. No Product, Review or AggregateRating markup:
 * Google does not allow self-serving review snippets for our own business.
 */
function HomePageJsonLd() {
  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE.url}/#webpage`,
        url: SITE.url,
        name: 'DeepDivers | Research Support, Statistics & Academic Editing',
        isPartOf: { '@id': `${SITE.url}/#website` },
        about: { '@id': `${SITE.url}/#organization` },
        primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE.url}${SITE.ogImage}` },
        inLanguage: 'en',
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE.url}/#faq`,
        mainEntity: faqs.map((faq) => ({
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
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <HomePageJsonLd />
      {PROMO_CONFIG.PROMO_ENABLED && <PromoBanner />}
      <Header />
      <main>
        <Hero />
        <ServicesOverview />
        <ServiceCatalog />
        <Pricing />
        <Process />

        <CollapsibleSection
          sectionId="why-us"
          title="Why Clients Choose Us"
          subtitle="Academic excellence meets professional service"
          badge="6 Reasons"
        >
          <WhyChooseUs />
        </CollapsibleSection>

        <CollapsibleSection
          sectionId="testimonials"
          title="What Our Clients Say"
          subtitle="Trusted by researchers, students, and businesses worldwide"
          badge="3 Reviews"
        >
          <Testimonials />
        </CollapsibleSection>

        <CollapsibleSection
          sectionId="portfolio"
          title="Sample Work"
          subtitle="Data visualizations, architecture diagrams, and research graphics"
          badge="16 Samples"
        >
          <Portfolio />
        </CollapsibleSection>

        <CollapsibleSection
          sectionId="publications"
          title="Sample Published Papers"
          subtitle="A selection of our peer-reviewed research published in indexed journals"
          badge="5 Papers"
        >
          <Publications />
        </CollapsibleSection>

        <CollapsibleSection
          sectionId="faq"
          title="Frequently Asked Questions"
          subtitle="Quick answers to common queries"
          badge={`${faqs.length} FAQs`}
        >
          <FAQ />
        </CollapsibleSection>

        <About />
        <Contact />
      </main>
      <Footer />
      {PROMO_CONFIG.PROMO_ENABLED && <DiscountBalloon />}
    </>
  );
}
