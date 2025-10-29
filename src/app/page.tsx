import Header from '@/components/layout/header';
import HeroSection from '@/components/hero-section';

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-[var(--header-h)]">
        <HeroSection />
        <div className="h-[1200px] bg-[#15161b]" aria-hidden="true" />
      </main>
    </>
  );
}
