import {
  Header,
  Hero,
  Services,
  WhyChooseUs,
  Publications,
  Portfolio,
  Process,
  About,
  FAQ,
  Contact,
  Footer,
} from '@/components';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <Publications />
        <Portfolio />
        <Process />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
