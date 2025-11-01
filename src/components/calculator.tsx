'use client';

import { useEffect } from 'react';
import { Calculator as CalcIcon, RotateCcw, TrendingUp, Euro, Package } from 'lucide-react';

export default function Calculator() {
  useEffect(() => {
    const hr = new Intl.NumberFormat('hr-HR', { maximumFractionDigits: 0 });
    const events = document.getElementById('go-events') as HTMLInputElement;
    const eventsOut = document.getElementById('go-events-out');
    const adhoc = document.getElementById('go-adhoc') as HTMLInputElement;
    const monthOut = document.getElementById('go-month');
    const yearOut = document.getElementById('go-year');
    const subOut = document.getElementById('go-sub');
    const varOut = document.getElementById('go-var');
    const savings = document.getElementById('go-savings');
    const planPills = document.querySelectorAll('.go-calc__pill--modern');
    const resetBtn = document.getElementById('go-reset');
    const otokPlusCard = document.querySelector('[data-plan-card="otokplus"]');

    if (!events || !eventsOut || !adhoc || !monthOut || !yearOut || !subOut || !varOut || !savings || !planPills || !resetBtn) return;


    const packages = {
      mini: { sub: 600, rate: 250, label: 'Mini', volume: [1, 10] },
      standard: { sub: 1800, rate: 210, label: 'Standard', volume: [11, 40] },
      partner: { sub: 3600, rate: 180, label: 'Partner', volume: [41, 80] },
      otokplus: { sub: 6000, rate: 150, label: 'Otok+', volume: [81, 120] }
    };

    let active = 'mini';

    function tween(node: HTMLElement | null, to: number) {
      if (!node || typeof to !== 'number' || !isFinite(to)) return;
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce) {
        node.textContent = hr.format(to);
        node.dataset.val = String(to);
        return;
      }
      const from = parseInt(node.dataset.val || '0', 10);
      const start = performance.now();
      const dur = 420;
      const ease = (t: number) => 1 - Math.pow(1 - t, 4);
      const raf = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const val = Math.round(from + (to - from) * ease(p));
        node.textContent = hr.format(val);
        if (p < 1) requestAnimationFrame(raf);
        else node.dataset.val = String(to);
      };
      requestAnimationFrame(raf);
    }
    
    function getPlanByVolume(n: number) {
        if (n <= 10) return 'mini';
        if (n <= 40) return 'standard';
        if (n <= 80) return 'partner';
        return 'otokplus';
    }

    function calculateCosts(planKey: string, n: number) {
        const pkg = packages[planKey as keyof typeof packages];
        const total = pkg.sub + (n * pkg.rate);
        return {
            total,
            monthly: Math.round(total / 12),
            sub: pkg.sub,
            variable: n * pkg.rate
        };
    }

    function updateCards(n: number) {
        const recommendedPlan = getPlanByVolume(n);
        
        document.querySelectorAll('.go-calc__plan-card--modern').forEach(card => {
            const cardEl = card as HTMLElement;
            const planKey = cardEl.dataset.planCard;

            if (planKey) {
                const costs = calculateCosts(planKey, n);
                const totalEl = cardEl.querySelector('[data-total]');
                const monthlyEl = cardEl.querySelector('[data-monthly]');
                
                tween(totalEl as HTMLElement, costs.total);
                tween(monthlyEl as HTMLElement, costs.monthly);

                if (planKey === recommendedPlan) {
                    cardEl.classList.add('go-calc__plan-card--best');
                    (cardEl.querySelector('.go-calc__plan-badge') as HTMLElement).style.display = 'block';
                } else {
                    cardEl.classList.remove('go-calc__plan-card--best');
                    (cardEl.querySelector('.go-calc__plan-badge') as HTMLElement).style.display = 'none';
                }
            }
        });

        if (otokPlusCard) {
            (otokPlusCard as HTMLElement).style.display = n >= 80 ? 'block' : 'none';
        }
    }


    function compute() {
      try {
        if (!events || !eventsOut || !yearOut || !monthOut || !subOut || !varOut || !savings) {
          console.error('Calculator: Required DOM elements not found');
          return;
        }

      const ev = parseInt(events.value || '0', 10);
      const currentPlanKey = getPlanByVolume(ev);
      active = currentPlanKey;

      const costs = calculateCosts(currentPlanKey, ev);
      
      eventsOut.textContent = String(ev);
      tween(yearOut, costs.total);
      tween(monthOut, costs.monthly);
      tween(subOut, costs.sub);
      tween(varOut, costs.variable);
      
      planPills.forEach(b => b.setAttribute('aria-pressed', (b as HTMLElement).dataset.plan === active ? 'true' : 'false'));

      const adhocTotal = ev * parseInt(adhoc?.value || '250', 10);
      const saving = adhocTotal - costs.total;
      const msg = saving > 0 ? `Ušteda približno ${hr.format(saving)} EUR godišnje u odnosu na ad-hoc.` : `Ad-hoc je isplativiji za ovaj volumen.`;
      
      savings.textContent = msg;
      savings.className = 'note ' + (saving > 0 ? 'ok' : 'warn');

      const recoEl = document.getElementById('go-reco');
      if (recoEl) {
          if(ev > 120) {
            recoEl.textContent = 'Za više od 120 događaja, kontaktirajte nas za prilagođenu ponudu.';
          } else {
            recoEl.textContent = `Preporučeni paket za ${ev} isporuka je ${packages[active as keyof typeof packages].label}.`;
          }
      }
      
      updateCards(ev);
      } catch (error) {
        console.error('Calculator computation failed:', { error: error instanceof Error ? error.message : 'Unknown error' });
      }
    }
    
    planPills.forEach(btn => btn.addEventListener('click', () => {
      const planKey = (btn as HTMLElement).dataset.plan || 'mini';
      const targetVolume = packages[planKey as keyof typeof packages].volume[0];
      if (events) {
        events.value = String(targetVolume);
        if (eventsOut) eventsOut.textContent = String(targetVolume);
      }
      compute();
    }));

    if (events) {
      events.addEventListener('input', () => {
        if(eventsOut) {
          eventsOut.textContent = events.value;
        }
        compute();
      });
    }
    
    if (adhoc) adhoc.addEventListener('input', compute);

    resetBtn?.addEventListener('click', () => {
      if (events) events.value = '12';
      if (adhoc) adhoc.value = '250';
      if (eventsOut) eventsOut.textContent = '12';
      compute();
    });

    compute();
  }, []);

  return (
    <section className="section go-calc" id="go-calculator" aria-labelledby="calc-title">
      <div className="container go-calc__wrap">
        <div className="go-calc__card go-calc__card--modern">
          <div className="go-calc__header">
            <div className="go-calc__icon">
              <CalcIcon className="h-8 w-8" />
            </div>
            <div>
              <h2 id="calc-title" className="go-calc__title">Kalkulator Pretplate</h2>
              <p className="go-calc__subtitle">Pronađite idealnu pretplatu za vaše potrebe</p>
            </div>
          </div>

          <div className="go-calc__step">
            <div className="go-calc__step-header">
              <span className="go-calc__step-number">1</span>
              <h3>Odaberite približan volumen</h3>
            </div>
            <div className="go-calc__plan go-calc__plan--modern" role="group" aria-label="Odabir paketa">
              <button className="go-calc__pill go-calc__pill--modern" data-plan="mini" aria-pressed="true" type="button">
                <span className="go-calc__pill-label">Mini</span>
                <span className="go-calc__pill-range">1-10</span>
              </button>
              <button className="go-calc__pill go-calc__pill--modern" data-plan="standard" aria-pressed="false" type="button">
                <span className="go-calc__pill-label">Standard</span>
                <span className="go-calc__pill-range">11-40</span>
              </button>
              <button className="go-calc__pill go-calc__pill--modern" data-plan="partner" aria-pressed="false" type="button">
                <span className="go-calc__pill-label">Partner</span>
                <span className="go-calc__pill-range">41-80</span>
              </button>
            </div>
          </div>

          <div className="go-calc__step">
            <div className="go-calc__step-header">
              <span className="go-calc__step-number">2</span>
              <h3>Precizno podešavanje</h3>
            </div>
            <div className="go-calc__inputs">
              <div className="go-calc__input-group">
                <label htmlFor="go-events" className="go-calc__label">
                  <span>Broj isporuka godišnje</span>
                  <div className="go-calc__value">
                    <span id="go-events-out" className="go-calc__value-number">12</span>
                    <span className="go-calc__value-unit">isporuka</span>
                  </div>
                </label>
                <input id="go-events" type="range" min="1" max="130" step="1" defaultValue="12" className="go-calc__slider" />
              </div>
              
              <div className="go-calc__input-group go-calc__input-group--secondary">
                <label htmlFor="go-adhoc" className="go-calc__label go-calc__label--small">
                  Ad-hoc cijena (€/isporuka)
                </label>
                <input id="go-adhoc" type="number" defaultValue="250" inputMode="numeric" className="go-calc__input" min="1" max="1000" />
              </div>
            </div>
          </div>
          
          <div className="go-calc__actions">
            <button className="go-calc__btn go-calc__btn--secondary" id="go-reset" type="button">
              <RotateCcw className="h-4 w-4" />
              Resetiraj
            </button>
            <button className="go-calc__btn go-calc__btn--primary" type="button" onClick={() => document.getElementById('go-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
              <TrendingUp className="h-4 w-4" />
              Izračunaj
            </button>
          </div>
        </div>

        <div className="go-calc__card go-calc__card--results" aria-live="polite">
          <div className="go-calc__results-header">
            <div className="go-calc__results-icon">
              <Euro className="h-6 w-6" />
            </div>
            <h2 className="go-calc__results-title">Vaš rezultat</h2>
          </div>
          
          <div className="go-calc__summary">
            <div className="go-calc__summary-main">
              <div className="go-calc__summary-amount">
                <span id="go-year" className="go-calc__amount">0</span>
                <span className="go-calc__currency">€</span>
              </div>
              <div className="go-calc__summary-period">godišnje</div>
            </div>
            <div className="go-calc__summary-monthly">
              <span id="go-month" className="go-calc__monthly-amount">0</span>
              <span className="go-calc__monthly-label">€/mjesec</span>
            </div>
          </div>

          <div className="go-calc__breakdown">
            <div className="go-calc__breakdown-item">
              <span className="go-calc__breakdown-label">Fiksni dio</span>
              <span className="go-calc__breakdown-value"><span id="go-sub">0</span> €</span>
            </div>
            <div className="go-calc__breakdown-item">
              <span className="go-calc__breakdown-label">Varijabilni dio</span>
              <span className="go-calc__breakdown-value"><span id="go-var">0</span> €</span>
            </div>
          </div>
          
          <div className="go-calc__savings" id="go-savings"></div>
          <div className="go-calc__recommendation" id="go-reco"></div>
          <div className="go-calc__plans">
            <h3 className="go-calc__plans-title">Svi paketi</h3>
            <div className="go-calc__plan-cards">
              <div className="go-calc__plan-card go-calc__plan-card--modern" data-plan-card="mini">
                <div className="go-calc__plan-badge">Preporučeno</div>
                <div className="go-calc__plan-header">
                  <Package className="go-calc__plan-icon" />
                  <span className="go-calc__plan-name">Mini</span>
                </div>
                <div className="go-calc__plan-price">
                  <span data-total className="go-calc__plan-amount">0</span>
                  <span className="go-calc__plan-currency">€</span>
                </div>
                <div className="go-calc__plan-period">
                  <span data-monthly>0</span> €/mjesec
                </div>
                <div className="go-calc__plan-details">
                  <div className="go-calc__plan-range">1-10 isporuka</div>
                  <div className="go-calc__plan-formula">600€ + 250€/isporuka</div>
                </div>
              </div>
              
              <div className="go-calc__plan-card go-calc__plan-card--modern" data-plan-card="standard">
                <div className="go-calc__plan-badge">Preporučeno</div>
                <div className="go-calc__plan-header">
                  <Package className="go-calc__plan-icon" />
                  <span className="go-calc__plan-name">Standard</span>
                </div>
                <div className="go-calc__plan-price">
                  <span data-total className="go-calc__plan-amount">0</span>
                  <span className="go-calc__plan-currency">€</span>
                </div>
                <div className="go-calc__plan-period">
                  <span data-monthly>0</span> €/mjesec
                </div>
                <div className="go-calc__plan-details">
                  <div className="go-calc__plan-range">11-40 isporuka</div>
                  <div className="go-calc__plan-formula">1.800€ + 210€/isporuka</div>
                </div>
              </div>
              
              <div className="go-calc__plan-card go-calc__plan-card--modern" data-plan-card="partner">
                <div className="go-calc__plan-badge">Preporučeno</div>
                <div className="go-calc__plan-header">
                  <Package className="go-calc__plan-icon" />
                  <span className="go-calc__plan-name">Partner</span>
                </div>
                <div className="go-calc__plan-price">
                  <span data-total className="go-calc__plan-amount">0</span>
                  <span className="go-calc__plan-currency">€</span>
                </div>
                <div className="go-calc__plan-period">
                  <span data-monthly>0</span> €/mjesec
                </div>
                <div className="go-calc__plan-details">
                  <div className="go-calc__plan-range">41-80 isporuka</div>
                  <div className="go-calc__plan-formula">3.600€ + 180€/isporuka</div>
                </div>
              </div>
              
              <div className="go-calc__plan-card go-calc__plan-card--modern" data-plan-card="otokplus" style={{display: 'none'}}>
                <div className="go-calc__plan-badge">Preporučeno</div>
                <div className="go-calc__plan-header">
                  <Package className="go-calc__plan-icon" />
                  <span className="go-calc__plan-name">Otok+</span>
                </div>
                <div className="go-calc__plan-price">
                  <span data-total className="go-calc__plan-amount">0</span>
                  <span className="go-calc__plan-currency">€</span>
                </div>
                <div className="go-calc__plan-period">
                  <span data-monthly>0</span> €/mjesec
                </div>
                <div className="go-calc__plan-details">
                  <div className="go-calc__plan-range">81-120 isporuka</div>
                  <div className="go-calc__plan-formula">6.000€ + 150€/isporuka</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

    
    