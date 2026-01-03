import {
  Header,
  Hero,
  Services,
  Publications,
  Portfolio,
  About,
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
        <Publications />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
