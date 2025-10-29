import Header from '@/components/layout/header';
import HeroSection from '@/components/hero-section';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <section className="spacer" aria-hidden="true"></section>
      </main>
    </>
  );
}
