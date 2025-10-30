
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
          <div className="container go-calc__wrap">
            <div className="go-calc__card">
              <h2 id="calc-title" className="go-calc__title">Kalkulator — Mini / Standard / Prošireni</h2>
              <p className="go-calc__muted">Unesi očekivani broj isporuka godišnje i odaberi paket. Cijene su okvirne (partnerske).</p>

              <div className="go-calc__plan" role="group" aria-label="Odabir paketa">
                  <button className="go-calc__pill" data-plan="mini" aria-pressed="true">Mini</button>
                  <button className="go-calc__pill" data-plan="standard" aria-pressed="false">Standard</button>
                  <button className="go-calc__pill" data-plan="prosireni" aria-pressed="false">Prošireni</button>
              </div>

              <div className="go-calc__row mt-4">
                <div className="go-calc__stat go-calc__stat--input">
                  <small>Godišnja pretplata (€)</small>
                  <input id="go-sub-fee" type="number" defaultValue="900" inputMode="numeric" className="go-calc__big-input" />
                </div>
                <div className="go-calc__stat go-calc__stat--input">
                  <small>Ad-hoc (€/isporuka)</small>
                  <input id="go-adhoc" type="number" defaultValue="220" inputMode="numeric" className="go-calc__big-input" />
                </div>
              </div>
              

              <div className="mt-4">
                  <label htmlFor="go-events" className='font-semibold text-sm mb-2 block'>Broj isporuka godišnje</label>
                  <div className="go-calc__row items-center">
                    <input id="go-events" type="range" min="0" max="60" step="1" defaultValue="12" aria-describedby="go-events-help" className='w-full' />
                    <div className="go-calc__stat text-center">
                        <div id="go-events-out" className="text-5xl font-bold text-primary">12</div>
                    </div>
                  </div>
                  <div className="help text-xs text-muted-foreground mt-2">
                    <span id="go-sub-range">Mini 600–900</span> | Marginalne stope: <span id="go-per-range">1–20: 150 • 21–30: 100 • 31+: 70</span>
                  </div>
              </div>
              
              <div className="go-calc__cta">
                <button className="btn primary" id="go-suggest">Predloži isplativiji paket</button>
                <button className="btn outline" id="go-reset" type="button">Reset</button>
              </div>

              <p className="muted">Pretplata pokriva planiranje, arhivu i koordinaciju; svaka isporuka se fakturira po partnerskoj cijeni.</p>
            </div>

            <div className="go-calc__card" aria-live="polite">
              <h2 className="go-calc__title">Rezultati</h2>
              <div className="go-calc__grid">
                <div className="go-calc__stat">
                  <small>EUR/god</small>
                  <div className="go-calc__big"><span id="go-year">0</span></div>
                </div>
                <div className="go-calc__stat">
                  <small>EUR/mj</small>
                  <div className="go-calc__big"><span id="go-month">0</span></div>
                </div>
              </div>
              <div className="go-calc__grid">
                <div className="go-calc__stat">
                  <small>Fiksno (pretplata)</small>
                  <div className="go-calc__big"><span id="go-sub">0</span> EUR</div>
                </div>
                <div className="go-calc__stat">
                  <small>Varijabilno (isporuke)</small>
                  <div className="go-calc__big"><span id="go-var">0</span> EUR</div>
                </div>
              </div>
              <p className="note" id="go-savings"></p>
              <div id="go-reco" className="muted" style={{marginTop: '8px'}}></div>
              <div className="go-calc__plan-cards">
                <div className="go-calc__plan-card">
                  <div className="go-calc__plan-badge" style={{display: 'none'}}>Preporučeno</div>
                  <div className="go-calc__plan-header">Mini</div>
                  <div className="go-calc__plan-price"><span id="mini-total">0</span> EUR</div>
                  <div className="go-calc__plan-monthly"><span id="mini-monthly">0</span> EUR/mj</div>
                  <div className="go-calc__plan-details">
                    <div>Pretplata: 900 EUR</div>
                    <div>Do 20 isporuka</div>
                  </div>
                </div>
                <div className="go-calc__plan-card go-calc__plan-card--best">
                  <div className="go-calc__plan-badge">Preporučeno</div>
                  <div className="go-calc__plan-header">Standard</div>
                  <div className="go-calc__plan-price"><span id="standard-total">0</span> EUR</div>
                  <div className="go-calc__plan-monthly"><span id="standard-monthly">0</span> EUR/mj</div>
                  <div className="go-calc__plan-details">
                    <div>Pretplata: 1.200 EUR</div>
                    <div>20-30 isporuka</div>
                  </div>
                </div>
                <div className="go-calc__plan-card">
                  <div className="go-calc__plan-badge" style={{display: 'none'}}>Preporučeno</div>
                  <div className="go-calc__plan-header">Prošireni</div>
                  <div className="go-calc__plan-price"><span id="prosireni-total">0</span> EUR</div>
                  <div className="go-calc__plan-monthly"><span id="prosireni-monthly">0</span> EUR/mj</div>
                  <div className="go-calc__plan-details">
                    <div>Pretplata: 2.500 EUR</div>
                    <div>30+ isporuka</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="content"></div>
        <Calculator />
      </main>
    </>
  );
}
