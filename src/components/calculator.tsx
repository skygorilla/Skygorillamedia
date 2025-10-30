
"use client";

import { useEffect } from 'react';

export default function Calculator() {
  useEffect(() => {
    const hr = new Intl.NumberFormat('hr-HR', { maximumFractionDigits: 0 });
    const events = document.getElementById('go-events') as HTMLInputElement;
    const eventsOut = document.getElementById('go-events-out');
    const adhoc = document.getElementById('go-adhoc') as HTMLInputElement;
    const savings = document.getElementById('go-savings');
    const reco = document.getElementById('go-reco');
    const planContainer = document.getElementById('go-plan-container');

    const packages = {
      mini: { sub: 600, label: 'Mini', type: 'flat', rates: { flat: 150 }, description: "Osnovni paket za do 20 objava." },
      standard: { sub: 1200, label: 'Standard', type: 'marginal', rates: [{ upto: 20, price: 150 }, { upto: Infinity, price: 100 }], description: "Optimalan omjer za 20-30 objava." },
      prosireni: { sub: 2500, label: 'Prošireni', type: 'marginal', rates: [{ upto: 20, price: 150 }, { upto: 30, price: 100 }, { upto: Infinity, price: 70 }], description: "Najbolja vrijednost za 30+ objava." }
    };

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
    
    function marginalVariableCost(plan: string, n: number) {
      const pkg = packages[plan as keyof typeof packages];
      if (pkg.type === 'flat') return n * pkg.rates.flat;

      let left = n;
      let cost = 0;
      let prev = 0;
      if (pkg.rates) {
        for (const r of pkg.rates) {
          const bandCount = Math.max(0, Math.min(left, r.upto === Infinity ? left : r.upto - prev));
          cost += bandCount * r.price;
          left -= bandCount;
          prev = r.upto === Infinity ? prev + bandCount : r.upto;
          if (left <= 0) break;
        }
      }
      return cost;
    }
    
    function costsFor(n: number) {
      const order = ['mini', 'standard', 'prosireni'];
      return order.map(p => {
        const pkg = packages[p as keyof typeof packages];
        const variable = marginalVariableCost(p, n);
        const total = pkg.sub + variable;
        return {
          plan: p,
          label: pkg.label,
          sub: pkg.sub,
          description: pkg.description,
          n,
          total,
          monthly: Math.round(total / 12)
        };
      }).sort((a, b) => a.total - b.total);
    }

    function createCardHTML(planData: any, isBest: boolean) {
        return `
            <div class="go-calc__plan-card ${isBest ? 'go-calc__plan-card--best' : ''}">
              ${isBest ? '<div class="go-calc__plan-badge">Preporučeno</div>' : ''}
              <div class="go-calc__plan-header">${planData.label}</div>
              <div class="go-calc__plan-price"><span data-plan-total="${planData.plan}">${hr.format(planData.total)}</span> EUR</div>
              <div class="go-calc__plan-monthly"><span data-plan-monthly="${planData.plan}">${hr.format(planData.monthly)}</span> EUR/mj</div>
              <div class="go-calc__plan-details">
                <div>Pretplata: ${hr.format(planData.sub)} EUR</div>
                <div>${planData.description}</div>
              </div>
            </div>
        `;
    }

    function compute() {
      if (!events || !planContainer) return;
      const ev = parseInt(events.value || '0', 10);
      
      if (eventsOut) eventsOut.textContent = String(ev);

      const rankedPlans = costsFor(ev);

      planContainer.innerHTML = rankedPlans.map((plan, index) => createCardHTML(plan, index === 0)).join('');
      
      const bestPlan = rankedPlans[0];
      const secondBest = rankedPlans[1];

      if (reco && bestPlan && secondBest) {
          const savingVsSecond = secondBest.total - bestPlan.total;
          reco.innerHTML = `Za <strong>${ev}</strong> isporuka, <strong>${bestPlan.label}</strong> paket je najisplativiji. Ušteda od ~<strong>${hr.format(savingVsSecond)}€</strong> godišnje u odnosu na sljedeću opciju.`;
      }


      const adhocTotal = ev * parseInt(adhoc.value || '220', 10);
      const saving = adhocTotal - bestPlan.total;
      const msg = saving > 0 
          ? `Ušteda od <strong>${hr.format(saving)} EUR</strong> godišnje u usporedbi s ad-hoc cijenom.`
          : `Ad-hoc je isplativiji za <strong>${hr.format(Math.abs(saving))} EUR</strong>.`;
      
      if (savings) {
        savings.innerHTML = msg;
        savings.className = 'note ' + (saving > 0 ? 'ok' : 'warn');
      }
    }

    // Initial render
    compute();

    // Event listeners
    if (events) {
      events.addEventListener('input', compute);
    }
    if (adhoc) {
      adhoc.addEventListener('input', compute);
    }

    return () => {
        if(events) events.removeEventListener('input', compute);
        if(adhoc) adhoc.removeEventListener('input', compute);
    }

  }, []);

  return null; // This component only adds functionality
}
