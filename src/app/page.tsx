import { Suspense } from 'react';
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
import SuccessToast from '@/components/SuccessToast/SuccessToast';

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
      <Suspense fallback={null}>
        <SuccessToast />
      </Suspense>
    </>
  );
}
