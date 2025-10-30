
'use client';

import Header from '@/components/layout/header';
import Calculator from '@/components/calculator';
import HeroSection from '@/components/hero-section';

export default function Home() {

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <Calculator />
        <div className="content"></div>
      </main>
    </>
  );
}

    