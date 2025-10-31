import Header from '@/components/layout/header';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      <main className="landing-page">
        <section className="landing-hero">
          <div className="container">
            <h1>Glas Otoka</h1>
            <p>Centralizirani lokalni kanal za Korčulu, Mljet, Lastovo i Pelješac</p>
            
            <div className="landing-options">
              <Link href="/pitch" className="landing-card">
                <h2>Pitch Deck</h2>
                <p>Strateški dokument za općine, TZ-ove, partnere i sponzore</p>
                <div className="card-features">
                  <span>Kalkulator pretplate</span>
                  <span>Model rada</span>
                  <span>Partnerstvo</span>
                </div>
              </Link>
              
              <Link href="/tv" className="landing-card">
                <h2>Glas Otoka TV</h2>
                <p>Medijska platforma za stanovnike, dijasporu i turiste</p>
                <div className="card-features">
                  <span>Live stream</span>
                  <span>Arhiva</span>
                  <span>Dokumentarci</span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}