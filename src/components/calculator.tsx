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
    const planPills = document.querySelectorAll('.go-calc__pill');
    const resetBtn = document.getElementById('go-reset');
    const otokPlusCard = document.querySelector('[data-plan-card="otokplus"]');

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
        
        document.querySelectorAll('.go-calc__plan-card').forEach(card => {
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
        <div className="go-calc__card">
          <div className="flex items-center gap-2 mb-2">
            <CalcIcon className="h-6 w-6 text-primary" />
            <h2 id="calc-title" className="go-calc__title">Kalkulator Pretplatničkih Modela</h2>
          </div>
          <p className="go-calc__muted">Unesite očekivani broj isporuka godišnje za automatsku preporuku paketa.</p>

          <div className="go-calc__plan" role="group" aria-label="Odabir paketa">
              <button className="go-calc__pill" data-plan="mini" aria-pressed="true" type="button">Mini (1-10)</button>
              <button className="go-calc__pill" data-plan="standard" aria-pressed="false" type="button">Standard (11-40)</button>
              <button className="go-calc__pill" data-plan="partner" aria-pressed="false" type="button">Partner (41-80)</button>
          </div>

          <div className="go-calc__row mt-4">
            <div className="go-calc__stat go-calc__stat--input">
                <label htmlFor="go-adhoc" className="text-sm font-semibold mb-2 block">Ad-hoc Cijena (€/isporuka)</label>
                <input id="go-adhoc" type="number" defaultValue="250" inputMode="numeric" className="go-calc__big-input" min="1" max="1000" />
            </div>
          </div>
          
          <div className="mt-4">
              <label htmlFor="go-events" className='font-semibold text-sm mb-2 block'>Broj isporuka godišnje</label>
              <div className="go-calc__row items-center gap-4">
                <input id="go-events" type="range" min="1" max="130" step="1" defaultValue="12" aria-describedby="go-events-help" className='flex-1' />
                <div className="go-calc__stat text-center min-w-[120px]">
                    <div id="go-events-out" className="text-4xl font-bold text-primary">12</div>
                    <small className="text-muted-foreground">isporuka</small>
                </div>
              </div>
          </div>
          
          <div className="go-calc__cta">
            <button className="btn outline flex items-center gap-2" id="go-reset" type="button">
              <RotateCcw className="h-4 w-4" />
              Resetiraj
            </button>
            <button className="btn primary flex items-center gap-2" type="button" onClick={() => document.getElementById('go-calculator')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>
              <TrendingUp className="h-4 w-4" />
              Prikaži rezultate
            </button>
          </div>

          <p className="muted">Pretplata pokriva planiranje, arhivu i koordinaciju; svaka isporuka se fakturira po definiranoj cijeni paketa.</p>
        </div>

        <div className="go-calc__card" aria-live="polite">
          <div className="flex items-center gap-2 mb-4">
            <Euro className="h-6 w-6 text-primary" />
            <h2 className="go-calc__title">Rezultati</h2>
          </div>
          <div className="go-calc__grid">
            <div className="go-calc__stat">
              <small>Ukupno EUR/god</small>
              <div className="go-calc__big"><span id="go-year">0</span></div>
            </div>
            <div className="go-calc__stat">
              <small>Prosječno EUR/mj</small>
              <div className="go-calc__big"><span id="go-month">0</span></div>
            </div>
          </div>
          <div className="go-calc__grid">
            <div className="go-calc__stat">
              <small>Fiksno (pretplata)</small>
              <div className="go-calc__big"><span id="go-sub">0</span> €</div>
            </div>
            <div className="go-calc__stat">
              <small>Varijabilno (isporuke)</small>
              <div className="go-calc__big"><span id="go-var">0</span> €</div>
            </div>
          </div>
          <p className="note" id="go-savings"></p>
          <div id="go-reco" className="muted" style={{marginTop: '8px'}}></div>
          <div className="go-calc__plan-cards">
            <div className="go-calc__plan-card" data-plan-card="mini">
              <div className="go-calc__plan-badge" style={{display: 'none'}}>Preporučeno</div>
              <div className="go-calc__plan-header flex items-center gap-2">
                <Package className="h-4 w-4" />
                Mini
              </div>
              <div className="go-calc__plan-price"><span data-total>0</span> €</div>
              <div className="go-calc__plan-monthly"><span data-monthly>0</span> €/mj</div>
              <div className="go-calc__plan-details">
                <div>1-10 isporuka</div>
                <div>600€ + 250€/isporuka</div>
              </div>
            </div>
            <div className="go-calc__plan-card" data-plan-card="standard">
              <div className="go-calc__plan-badge" style={{display: 'none'}}>Preporučeno</div>
              <div className="go-calc__plan-header flex items-center gap-2">
                <Package className="h-4 w-4" />
                Standard
              </div>
              <div className="go-calc__plan-price"><span data-total>0</span> €</div>
              <div className="go-calc__plan-monthly"><span data-monthly>0</span> €/mj</div>
              <div className="go-calc__plan-details">
                <div>11-40 isporuka</div>
                <div>1.800€ + 210€/isporuka</div>
              </div>
            </div>
            <div className="go-calc__plan-card" data-plan-card="partner">
              <div className="go-calc__plan-badge" style={{display: 'none'}}>Preporučeno</div>
              <div className="go-calc__plan-header flex items-center gap-2">
                <Package className="h-4 w-4" />
                Partner
              </div>
              <div className="go-calc__plan-price"><span data-total>0</span> €</div>
              <div className="go-calc__plan-monthly"><span data-monthly>0</span> €/mj</div>
              <div className="go-calc__plan-details">
                <div>41-80 isporuka</div>
                <div>3.600€ + 180€/isporuka</div>
              </div>
            </div>
             <div className="go-calc__plan-card" data-plan-card="otokplus" style={{display: 'none'}}>
              <div className="go-calc__plan-badge" style={{display: 'none'}}>Preporučeno</div>
              <div className="go-calc__plan-header flex items-center gap-2">
                <Package className="h-4 w-4" />
                Otok+
              </div>
              <div className="go-calc__plan-price"><span data-total>0</span> €</div>
              <div className="go-calc__plan-monthly"><span data-monthly>0</span> €/mj</div>
              <div className="go-calc__plan-details">
                <div>81-120 isporuka</div>
                <div>6.000€ + 150€/isporuka</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

    