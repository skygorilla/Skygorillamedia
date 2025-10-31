'use client';

import { useEffect } from 'react';

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

    function tween(node: HTMLElement, to: number) {
      if (!node) return;
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
        if (n <= 120) return 'otokplus';
        return 'otokplus'; // Cap at Otok+
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
                
                if (totalEl) tween(totalEl as HTMLElement, costs.total);
                if (monthlyEl) tween(monthlyEl as HTMLElement, costs.monthly);

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
      if (!events) return;
      const ev = parseInt(events.value || '0', 10);
      const currentPlanKey = getPlanByVolume(ev);
      active = currentPlanKey;

      const costs = calculateCosts(currentPlanKey, ev);
      
      if (eventsOut) eventsOut.textContent = String(ev);
      if (yearOut) tween(yearOut, costs.total);
      if (monthOut) tween(monthOut, costs.monthly);
      if (subOut) tween(subOut, costs.sub);
      if (varOut) tween(varOut, costs.variable);
      
      planPills.forEach(b => b.setAttribute('aria-pressed', (b as HTMLElement).dataset.plan === active ? 'true' : 'false'));

      const adhocTotal = ev * parseInt(adhoc?.value || '250', 10);
      const saving = adhocTotal - costs.total;
      const msg = saving > 0 ? `Ušteda približno ${hr.format(saving)} EUR godišnje u odnosu na ad-hoc.` : `Ad-hoc je isplativiji za ovaj volumen.`;
      if (savings) {
        savings.textContent = msg;
        savings.className = 'note ' + (saving > 0 ? 'ok' : 'warn');
      }

      if(ev > 120) {
        (document.getElementById('go-reco') as HTMLElement).innerHTML = `Za više od 120 događaja, <a href="#kontakt" class="font-bold">kontaktirajte nas</a> za prilagođenu ponudu.`;
      } else {
         (document.getElementById('go-reco') as HTMLElement).innerHTML = `Preporučeni paket za ${ev} isporuka je <strong>${packages[active as keyof typeof packages].label}</strong>.`;
      }
      
      updateCards(ev);
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
          <h2 id="calc-title" className="go-calc__title">Kalkulator Pretplatničkih Modela</h2>
          <p className="go-calc__muted">Unesite očekivani broj isporuka godišnje za automatsku preporuku paketa.</p>

          <div className="go-calc__plan" role="group" aria-label="Odabir paketa">
              <button className="go-calc__pill" data-plan="mini" aria-pressed="true">Mini</button>
              <button className="go-calc__pill" data-plan="standard" aria-pressed="false">Standard</button>
              <button className="go-calc__pill" data-plan="partner" aria-pressed="false">Partner</button>
          </div>

          <div className="go-calc__row mt-4">
            <div className="go-calc__stat go-calc__stat--input">
                <small>Ad-hoc Cijena (€/isporuka)</small>
                <input id="go-adhoc" type="number" defaultValue="250" inputMode="numeric" className="go-calc__big-input" />
            </div>
          </div>
          
          <div className="mt-4">
              <label htmlFor="go-events" className='font-semibold text-sm mb-2 block'>Broj isporuka godišnje</label>
              <div className="go-calc__row items-center">
                <input id="go-events" type="range" min="1" max="130" step="1" defaultValue="12" aria-describedby="go-events-help" className='w-full' />
                <div className="go-calc__stat text-center">
                    <div id="go-events-out" className="text-5xl font-bold text-primary">12</div>
                </div>
              </div>
          </div>
          
          <div className="go-calc__cta">
            <button className="btn outline" id="go-reset" type="button">Reset</button>
          </div>

          <p className="muted">Pretplata pokriva planiranje, arhivu i koordinaciju; svaka isporuka se fakturira po definiranoj cijeni paketa.</p>
        </div>

        <div className="go-calc__card" aria-live="polite">
          <h2 className="go-calc__title">Rezultati</h2>
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
              <div className="go-calc__plan-header">Mini</div>
              <div className="go-calc__plan-price"><span data-total>0</span> €</div>
              <div className="go-calc__plan-monthly"><span data-monthly>0</span> €/mj</div>
              <div className="go-calc__plan-details">
                <div>1-10 isporuka</div>
                <div>600€ + 250€/isporuka</div>
              </div>
            </div>
            <div className="go-calc__plan-card" data-plan-card="standard">
              <div className="go-calc__plan-badge" style={{display: 'none'}}>Preporučeno</div>
              <div className="go-calc__plan-header">Standard</div>
              <div className="go-calc__plan-price"><span data-total>0</span> €</div>
              <div className="go-calc__plan-monthly"><span data-monthly>0</span> €/mj</div>
              <div className="go-calc__plan-details">
                <div>11-40 isporuka</div>
                <div>1.800€ + 210€/isporuka</div>
              </div>
            </div>
            <div className="go-calc__plan-card" data-plan-card="partner">
              <div className="go-calc__plan-badge" style={{display: 'none'}}>Preporučeno</div>
              <div className="go-calc__plan-header">Partner</div>
              <div className="go-calc__plan-price"><span data-total>0</span> €</div>
              <div className="go-calc__plan-monthly"><span data-monthly>0</span> €/mj</div>
              <div className="go-calc__plan-details">
                <div>41-80 isporuka</div>
                <div>3.600€ + 180€/isporuka</div>
              </div>
            </div>
             <div className="go-calc__plan-card" data-plan-card="otokplus" style={{display: 'none'}}>
              <div className="go-calc__plan-badge" style={{display: 'none'}}>Preporučeno</div>
              <div className="go-calc__plan-header">Otok+</div>
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
