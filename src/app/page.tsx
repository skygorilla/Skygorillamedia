
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
        <section className="section go-calc" id="go-calculator" aria-labelledby="calc-title">
          <div className="container">
            <div className="go-calc__card">
              <div className="md:flex md:items-start md:justify-between mb-6">
                <div>
                  <h2 id="calc-title" className="go-calc__title">Kalkulator — Mini / Standard / Prošireni</h2>
                  <p className="go-calc__muted">Pomaknite klizač kako biste pronašli najisplativiji paket za vaše potrebe.</p>
                </div>
                 <div className="go-calc__stat go-calc__stat--input mt-4 md:mt-0">
                  <small>Ad-hoc (€/isporuka)</small>
                  <input id="go-adhoc" type="number" defaultValue="220" inputMode="numeric" className="go-calc__big-input" />
                </div>
              </div>
              
              <div className="mb-8">
                  <label htmlFor="go-events" className='font-semibold text-sm mb-2 block'>Broj isporuka godišnje: <span id="go-events-out" className="text-primary font-bold text-lg ml-2">12</span></label>
                  <input id="go-events" type="range" min="0" max="60" step="1" defaultValue="12" aria-describedby="go-events-help" className='w-full' />
              </div>

              <div id="go-reco" className="muted mb-6 text-center"></div>

              <div id="go-plan-container" className="go-calc__plan-cards">
                {/* Plan cards will be dynamically inserted here by calculator.tsx */}
              </div>

               <p className="note mt-6 text-center" id="go-savings"></p>
            </div>
          </div>
        </section>
        <div className="content"></div>
        <Calculator />
      </main>
    </>
  );
}
