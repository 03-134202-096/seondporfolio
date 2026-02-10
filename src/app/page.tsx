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
} from '@/components';

export default function Home() {
  return (
    <>
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
          badge="14 FAQs"
        >
          <FAQ />
        </CollapsibleSection>

        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
