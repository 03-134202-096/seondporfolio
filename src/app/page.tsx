import {
  Header,
  Hero,
  Services,
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
} from '@/components';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <ServiceCatalog />
        <Pricing />
        <Process />
        <Testimonials />
        <Publications />
        <Portfolio />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
