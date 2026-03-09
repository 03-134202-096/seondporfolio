import {
  Header,
  Hero,
  CollapsibleSection,
  WhyChooseUs,
  ServiceCatalog,
  Pricing,
  Testimonials,
  Publications,
  Portfolio,
  Process,
  About,
  FAQ,
  Contact,
  Footer,
  FloatingCTA,
  PromoBanner,
  DiscountBalloon,
} from '@/components';

/**
 * Structured data for the homepage — FAQPage, HowTo, Reviews, and Service ItemList.
 * These schemas help Google show rich snippets (FAQ dropdowns, star ratings, how-to steps).
 */
function HomePageJsonLd() {
  const siteUrl = 'https://deepdivers.services';

  const schemas = {
    '@context': 'https://schema.org',
    '@graph': [
      // ─── FAQPage Schema — Enables FAQ rich snippets in Google ───
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I place an order?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Browse our Service Catalog to find what you need, then click "Order Now" or fill out the contact form with your project details. We\'ll respond within 24 hours with a detailed quote. Once approved, you pay securely and we begin work immediately.',
            },
          },
          {
            '@type': 'Question',
            name: 'How can I track my project progress?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Once you place an order, we assign a dedicated team member exclusively to your project. Your assigned expert focuses solely on your work and is available 24/7 to provide real-time progress updates, answer questions, and implement your feedback.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does payment work with Payoneer?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'After your quote is approved, we send you a Payoneer payment link. You can pay using credit card (Visa, Mastercard, Amex), debit card, bank transfer, or Payoneer balance. You do NOT need a Payoneer account to pay. Payoneer supports 190+ countries and 150+ currencies.',
            },
          },
          {
            '@type': 'Question',
            name: 'How long does a typical project take?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Project timelines vary based on complexity. Simple tasks (data entry, basic analysis, proofreading) take 1-3 days. Research papers, ML models, and complex analyses typically take 1-2 weeks. Web development projects take 1-4 weeks.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you offer revisions?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Absolutely! We offer unlimited revisions until you\'re 100% satisfied with the work. Our goal is your complete satisfaction, and we won\'t consider a project complete until you\'re happy with the results.',
            },
          },
          {
            '@type': 'Question',
            name: 'What are your pricing packages?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We offer three main packages: Starter (from $25) for single tasks and quick turnarounds, Professional (from $100) for complete research papers and medium projects, and Enterprise (from $300) for multi-deliverable projects and ongoing support.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is my data and project confidential?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, we maintain strict confidentiality. All client data, research materials, and project details are kept completely private. We never share or reuse any client work, and we can sign NDAs if required.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can you help with urgent/rush orders?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, we accommodate urgent requests whenever possible. Rush orders may have an additional fee depending on the timeline and complexity. Contact us with your deadline, and we\'ll do our best to help.',
            },
          },
          {
            '@type': 'Question',
            name: 'What if I\'m not satisfied with the work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Your satisfaction is our priority. We offer free revisions to address any concerns. If you\'re still not satisfied after revisions, we provide partial or full refunds on a case-by-case basis. We\'ve maintained a 100% satisfaction rate.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you provide plagiarism reports?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, for all written content and research papers, we provide plagiarism reports upon request at no extra cost. We guarantee 100% original work using premium plagiarism checking tools.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can you work on projects in different time zones?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Absolutely! We work with clients from 190+ countries and are flexible with communication times. We ensure timely responses regardless of your location.',
            },
          },
          {
            '@type': 'Question',
            name: 'What file formats do you deliver?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We deliver in any format you need: Word (.docx), PDF, Excel, LaTeX, PowerPoint, Python notebooks (.ipynb), code repositories, and more. Just specify your preferred format.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is my payment secure?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, all payments are processed through Payoneer\'s secure payment infrastructure, which uses bank-level encryption and is regulated by financial authorities worldwide.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do you guarantee journal publication?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We provide professional research support including manuscript writing, data analysis, formatting, and submission assistance. Publication decisions are made solely by independent journal editors and peer reviewers. We do not guarantee journal acceptance. Our deliverable is a high-quality, publication-ready manuscript that you own regardless of the journal decision.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does milestone-based payment work for large projects?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For multi-phase projects like end-to-end research papers, we use milestone-based payments. The project is divided into clear stages — each with a defined deliverable and payment. You pay upon completion of each milestone, and you receive tangible work at every stage. You can stop at any milestone and keep all delivered work.',
            },
          },
        ],
      },

      // ─── HowTo Schema — Enables step-by-step rich snippets ───
      {
        '@type': 'HowTo',
        name: 'How to Order Professional Research & Data Science Services from DeepDivers',
        description:
          'A step-by-step guide to ordering professional academic research, data analysis, AI/ML, and development services from DeepDivers.',
        totalTime: 'PT10M',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'USD',
          value: '25',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Browse & Select Service',
            text: 'Explore our catalog of 60+ services. Pick the one you need, or describe a custom project. Attach files and requirements via our order form.',
            url: `${siteUrl}/#service-catalog`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Get a Detailed Quote',
            text: 'We review your requirements and provide a transparent quote within 24 hours — no hidden fees. Includes scope, timeline, and deliverables.',
            url: `${siteUrl}/#contact`,
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Pay Securely via Payoneer',
            text: 'Once you approve the quote, we send a Payoneer payment link. Pay with credit/debit card, bank transfer, or Payoneer balance. Supports 190+ countries.',
            url: `${siteUrl}/#pricing`,
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Work Begins Immediately',
            text: 'Your dedicated expert starts right away. Track progress 24/7 via WhatsApp or email. Request changes or ask questions anytime.',
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Review & Free Revisions',
            text: 'Receive your completed work for review. We offer unlimited free revisions until you are 100% satisfied with the quality and accuracy.',
          },
          {
            '@type': 'HowToStep',
            position: 6,
            name: 'Final Delivery & Support',
            text: 'Get your polished, professional deliverables in any format. We provide ongoing support and are available for follow-up questions after delivery.',
          },
        ],
      },

      // ─── Review Schemas — Enables star rating rich snippets ───
      {
        '@type': 'Product',
        '@id': `${siteUrl}/#product`,
        name: 'DeepDivers Professional Services',
        description:
          'Professional freelance services for academic research, data analysis, machine learning, AI development, and content writing.',
        brand: {
          '@type': 'Brand',
          name: 'DeepDivers',
        },
        image: `${siteUrl}/og-image.png`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5.0',
          reviewCount: '50',
          bestRating: '5',
          worstRating: '1',
        },
        review: [
          {
            '@type': 'Review',
            author: { '@type': 'Person', name: 'Otuekong' },
            datePublished: '2025-06-01',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
            },
            reviewBody:
              'Perfect, I love your work. It was difficult to do away with all the lengthy texts in the paper. And you\'ve done a great job at decluttering. I think it is perfect like this.',
          },
          {
            '@type': 'Review',
            author: { '@type': 'Person', name: 'Dr. Samabia T.' },
            datePublished: '2025-05-01',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
            },
            reviewBody:
              'Asad has been an outstanding researcher and developer under my supervision. He contributed significantly to multiple research projects, leading to four peer-reviewed publications.',
          },
          {
            '@type': 'Review',
            author: { '@type': 'Person', name: 'Dominic' },
            datePublished: '2025-07-01',
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
            },
            reviewBody: 'It is just perfect. Good.',
          },
        ],
        offers: {
          '@type': 'AggregateOffer',
          lowPrice: '20',
          highPrice: '500',
          priceCurrency: 'USD',
          offerCount: '75',
          availability: 'https://schema.org/InStock',
        },
      },

      // ─── ItemList Schema — Helps Google understand all service offerings ───
      {
        '@type': 'ItemList',
        name: 'DeepDivers Service Catalog',
        description: 'Complete catalog of 75+ professional services offered by DeepDivers.',
        numberOfItems: 75,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'Service',
              name: 'Research Paper Writing',
              description: 'Publication-ready manuscripts, systematic reviews, and literature analysis for top-tier journals.',
              provider: { '@id': `${siteUrl}/#organization` },
              offers: { '@type': 'Offer', price: '100', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'Service',
              name: 'Data Analysis & Visualization',
              description: 'Statistical analysis using SPSS, R, and Python. Data visualization with charts, graphs, and infographics.',
              provider: { '@id': `${siteUrl}/#organization` },
              offers: { '@type': 'Offer', price: '40', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            },
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@type': 'Service',
              name: 'Machine Learning & AI Model Training',
              description: 'Deep learning models, neural networks, hyperparameter tuning, and AI experiment execution.',
              provider: { '@id': `${siteUrl}/#organization` },
              offers: { '@type': 'Offer', price: '150', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            },
          },
          {
            '@type': 'ListItem',
            position: 4,
            item: {
              '@type': 'Service',
              name: 'LaTeX Formatting & Typesetting',
              description: 'Professional LaTeX formatting for journals (IEEE, Springer, Elsevier, ACM) and academic documents.',
              provider: { '@id': `${siteUrl}/#organization` },
              offers: { '@type': 'Offer', price: '40', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            },
          },
          {
            '@type': 'ListItem',
            position: 5,
            item: {
              '@type': 'Service',
              name: 'End-to-End Q1 Paper Publication Support',
              description: 'Complete support from research to publication in Q1/Q2 ranked journals including writing, formatting, and submission.',
              provider: { '@id': `${siteUrl}/#organization` },
              offers: { '@type': 'Offer', price: '350', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            },
          },
          {
            '@type': 'ListItem',
            position: 6,
            item: {
              '@type': 'Service',
              name: 'Web Scraping & Data Extraction',
              description: 'Automated web scraping, data extraction from websites, APIs, and public sources using Python.',
              provider: { '@id': `${siteUrl}/#organization` },
              offers: { '@type': 'Offer', price: '50', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            },
          },
          {
            '@type': 'ListItem',
            position: 7,
            item: {
              '@type': 'Service',
              name: 'Next.js Full-Stack Development',
              description: 'Modern full-stack web application development with Next.js, React, and Node.js.',
              provider: { '@id': `${siteUrl}/#organization` },
              offers: { '@type': 'Offer', price: '200', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            },
          },
          {
            '@type': 'ListItem',
            position: 8,
            item: {
              '@type': 'Service',
              name: 'Systematic Review Support',
              description: 'PRISMA-guided systematic reviews, meta-analysis, and evidence synthesis for academic research.',
              provider: { '@id': `${siteUrl}/#organization` },
              offers: { '@type': 'Offer', price: '150', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            },
          },
          {
            '@type': 'ListItem',
            position: 9,
            item: {
              '@type': 'Service',
              name: 'Citation Formatting (APA/MLA/Chicago/Vancouver)',
              description: 'Professional citation and reference formatting in any academic style: APA, MLA, Chicago, Vancouver, IEEE.',
              provider: { '@id': `${siteUrl}/#organization` },
              offers: { '@type': 'Offer', price: '25', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            },
          },
          {
            '@type': 'ListItem',
            position: 10,
            item: {
              '@type': 'Service',
              name: 'AWS Cloud Deployment & Infrastructure',
              description: 'AWS setup, deployment, EC2, S3, Lambda, and cloud infrastructure management.',
              provider: { '@id': `${siteUrl}/#organization` },
              offers: { '@type': 'Offer', price: '100', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
            },
          },
        ],
      },

      // ─── WebPage Schema for the homepage ───
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/#webpage`,
        url: siteUrl,
        name: 'DeepDivers | Academic Research, Data Science & AI Services',
        description:
          'Professional freelance team offering research paper writing, data analysis, machine learning, AI solutions, and content services. Available worldwide.',
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#organization` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${siteUrl}/og-image.png`,
        },
        datePublished: '2025-06-01',
        dateModified: '2026-02-19',
        inLanguage: 'en-US',
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
      <PromoBanner />
      <Header />
      <main>
        <Hero />
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
          title="Our Publications"
          subtitle="Peer-reviewed research in AI, deep learning, and medical informatics"
          badge="5 Papers"
        >
          <Publications />
        </CollapsibleSection>

        <CollapsibleSection
          sectionId="faq"
          title="Frequently Asked Questions"
          subtitle="Quick answers to common queries"
          badge="16 FAQs"
        >
          <FAQ />
        </CollapsibleSection>

        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
      <DiscountBalloon />
    </>
  );
}
