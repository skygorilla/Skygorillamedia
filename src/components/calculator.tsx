"use client";

import { useEffect } from 'react';

export default function Calculator() {
  useEffect(() => {
    const hr = new Intl.NumberFormat('hr-HR', { maximumFractionDigits: 0 });
    const events = document.getElementById('go-events') as HTMLInputElement;
    const eventsOut = document.getElementById('go-events-out');
    const subFee = document.getElementById('go-sub-fee') as HTMLInputElement;
    const perPrice = document.getElementById('go-per-price') as HTMLInputElement;
    const adhoc = document.getElementById('go-adhoc') as HTMLInputElement;
    const monthOut = document.getElementById('go-month');
    const yearOut = document.getElementById('go-year');
    const subOut = document.getElementById('go-sub');
    const varOut = document.getElementById('go-var');
    const savings = document.getElementById('go-savings');
    const subRange = document.getElementById('go-sub-range');
    const perRange = document.getElementById('go-per-range');
    const planPills = document.querySelectorAll('.go-calc__pill');
    const suggest = document.getElementById('go-suggest');
    const resetBtn = document.getElementById('go-reset');

    const packages = {
      mini: { sub: [600,900], label: 'Mini', type: 'flat', rates: { flat: 150 } },
      standard: { sub: [1200,2000], label: 'Standard', type: 'marginal', rates: [{ upto: 20, price: 150 }, { upto: Infinity, price: 100 }] },
      prosireni: { sub: [2500,4000], label: 'Prošireni', type: 'marginal', rates: [{ upto: 20, price: 150 }, { upto: 30, price: 100 }, { upto: Infinity, price: 70 }] }
    };

    let active = 'mini';

    function clamp(v: number, [min, max]: [number, number]) {
      return Math.min(max, Math.max(min, v));
    }

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

    function applyRanges() {
      const pkg = packages[active as keyof typeof packages];
      if (subRange) subRange.textContent = `${pkg.label} ${pkg.sub[0]}-${pkg.sub[1]}`;
      
      if (perRange) {
        if (pkg.type === 'flat') {
          perRange.textContent = `${pkg.rates.flat}`;
        } else if (pkg.rates) {
          const parts = pkg.rates.map((r: any, i: number, arr: any[]) => {
            const from = i === 0 ? 1 : arr[i-1].upto + 1;
            const to = r.upto === Infinity ? '∞' : r.upto;
            return `${from}${r.upto === Infinity ? '' : `–${to}`}: ${r.price}`;
          });
          perRange.textContent = parts.join(' • ');
        }
      }
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
    
    function marginalUnitAt(plan: string, n: number){
      if(n<=0) return 0;
      const pkg = packages[plan as keyof typeof packages];
      if (pkg.type === 'flat') return pkg.rates.flat;
      if(pkg.rates){
        for(const t of pkg.rates){
          if(n<=t.upto) return t.price;
        }
        return pkg.rates[pkg.rates.length-1].price;
      }
      return 0;
    }


    function costsFor(n: number) {
      const order = ['mini', 'standard', 'prosireni'];
      return order.map(p => {
        const sub = packages[p as keyof typeof packages].sub[0];
        const variable = marginalVariableCost(p, n);
        const total = sub + variable;
        return {
          plan: p,
          label: packages[p as keyof typeof packages].label,
          sub,
          per: marginalUnitAt(p, Math.max(1, n)),
          n,
          total,
          monthly: Math.round(total / 12)
        };
      }).sort((a, b) => a.total - b.total);
    }

    function updateRecommendation(n: number) {
      const list = costsFor(n);
      const best = list[0], runner = list[1];
      if (!best || !runner) return;
      const diff = runner.total - best.total;
      const el = document.getElementById('go-reco');
      if (el) {
        el.innerHTML = `Preporuka: <strong>${best.label}</strong> (ušteda ≈ <strong>${hr.format(diff)}</strong> EUR/god u odnosu na ${runner.label}).`;
      }
    }

    function renderComparison(n: number) {
      const tbody = document.getElementById('go-compare-body');
      if (!tbody) return;
      const list = costsFor(n);
      const bestTotal = list[0].total;
      const rows = list.map((r, i) => {
        const strongOpen = i === 0 ? '<strong>' : '';
        const strongClose = i === 0 ? '</strong>' : '';
        const delta = r.total - bestTotal;
        return `<tr style="border-bottom:1px dashed var(--color-border)">
          <td style="padding:6px 4px">${strongOpen}${r.label}${strongClose}</td>
          <td style="padding:6px 4px">${hr.format(r.sub)}</td>
          <td style="padding:6px 4px">${hr.format(r.per)}</td>
          <td style="padding:6px 4px">${hr.format(r.n)}</td>
          <td style="padding:6px 4px">${hr.format(r.total)}</td>
          <td style="padding:6px 4px">${hr.format(r.monthly)}</td>
          <td style="padding:6px 4px">${i === 0 ? '0' : hr.format(delta)}</td>
        </tr>`;
      }).join('');
      tbody.innerHTML = rows;
    }

    function calc(N: number, adhocPrice = 220) {
      N = Math.max(0, Math.floor(N));
      const adhocTotal = N * adhocPrice;
      const out: any = {};
      
      for (const [name, pkg] of Object.entries(packages)) {
        const v = marginalVariableCost(name, N);
        const total = pkg.sub[0] + v;
        out[name] = {
          sub_fee: pkg.sub[0],
          var_cost: v,
          total: total,
          monthly: Math.round(total / 12),
          effective_rate: marginalUnitAt(name, N),
          saving_vs_adhoc: adhocTotal - total
        };
      }
      
      const sorted = Object.entries(out).sort((a: any, b: any) => a[1].total - b[1].total);
      const best = sorted[0], second = sorted[1];
      const rec = {
        name: best[0],
        reason: 'najniži godišnji trošak',
        saving_vs_second_best: (second[1] as any).total - (best[1] as any).total
      };
      
      return { packages: out, adhoc_total: adhocTotal, recommended: rec };
    }

    function updateBottomCards(n: number) {
      const result = calc(n, 220);
      const bestPlan = result.recommended.name.toLowerCase();
      
      // Update card highlighting and badges
      const miniCard = document.querySelector('.go-calc__plan-card:nth-child(1)');
      const standardCard = document.querySelector('.go-calc__plan-card:nth-child(2)');
      const prosireniCard = document.querySelector('.go-calc__plan-card:nth-child(3)');
      const miniBadge = miniCard?.querySelector('.go-calc__plan-badge');
      const standardBadge = standardCard?.querySelector('.go-calc__plan-badge');
      const prosireniBadge = prosireniCard?.querySelector('.go-calc__plan-badge');
      
      [miniCard, standardCard, prosireniCard].forEach(card => {
        card?.classList.remove('go-calc__plan-card--best');
      });
      [miniBadge, standardBadge, prosireniBadge].forEach(badge => {
        if (badge) (badge as HTMLElement).style.display = 'none';
      });
      
      if (bestPlan === 'mini') {
        miniCard?.classList.add('go-calc__plan-card--best');
        if (miniBadge) (miniBadge as HTMLElement).style.display = 'block';
      }
      if (bestPlan === 'standard') {
        standardCard?.classList.add('go-calc__plan-card--best');
        if (standardBadge) (standardBadge as HTMLElement).style.display = 'block';
      }
      if (bestPlan === 'prosireni') {
        prosireniCard?.classList.add('go-calc__plan-card--best');
        if (prosireniBadge) (prosireniBadge as HTMLElement).style.display = 'block';
      }
      
      const miniTotal = document.getElementById('mini-total');
      const miniMonthly = document.getElementById('mini-monthly');
      const standardTotal = document.getElementById('standard-total');
      const standardMonthly = document.getElementById('standard-monthly');
      const prosireniTotal = document.getElementById('prosireni-total');
      const prosireniMonthly = document.getElementById('prosireni-monthly');
      
      if (miniTotal && miniMonthly) {
        tween(miniTotal, result.packages.mini.total);
        tween(miniMonthly, result.packages.mini.monthly);
      }
      if (standardTotal && standardMonthly) {
        tween(standardTotal, result.packages.standard.total);
        tween(standardMonthly, result.packages.standard.monthly);
      }
      if (prosireniTotal && prosireniMonthly) {
        tween(prosireniTotal, result.packages.prosireni.total);
        tween(prosireniMonthly, result.packages.prosireni.monthly);
      }
    }

    function autoSelectPlanByThreshold(n: number) {
      if (n <= 20) return 'mini';
      if (n <= 30) return 'standard';
      return 'prosireni';
    }

    function compute() {
      const ev = parseInt(events?.value || '0', 10);
      const result = calc(ev, 220);
      const selectedPkg = result.packages[active as keyof typeof result.packages];

      if (subFee) subFee.value = String(selectedPkg.sub_fee);
      if (perPrice) perPrice.value = String(selectedPkg.effective_rate);
      if (eventsOut) eventsOut.textContent = String(ev);
      
      if (yearOut) tween(yearOut, selectedPkg.total);
      if (monthOut) tween(monthOut, selectedPkg.monthly);
      if (subOut) tween(subOut, selectedPkg.sub_fee);
      if (varOut) tween(varOut, selectedPkg.var_cost);

      const msg = selectedPkg.saving_vs_adhoc > 0 ? `Ušteda približno ${hr.format(selectedPkg.saving_vs_adhoc)} EUR godišnje.` : `Ad-hoc povoljniji za ${hr.format(Math.abs(selectedPkg.saving_vs_adhoc))} EUR.`;
      if (savings) {
        savings.textContent = msg;
        savings.className = 'note ' + (selectedPkg.saving_vs_adhoc > 0 ? 'ok' : 'warn');
      }
      
      const recoEl = document.getElementById('go-reco');
      if (recoEl) {
        recoEl.innerHTML = `Preporuka: <strong>${result.recommended.name}</strong> (ušteda ≈ <strong>${hr.format(result.recommended.saving_vs_second_best)}</strong> EUR/god u odnosu na sljedeću opciju).`;
      }

      updateRecommendation(ev);
      renderComparison(ev);
      updateBottomCards(ev);
    }

    // Event listeners
    planPills.forEach(btn => btn.addEventListener('click', () => {
      planPills.forEach(b => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      active = (btn as HTMLElement).dataset.plan || 'mini';
      
      // Move slider to plan's optimal position
      const planPositions = { mini: 12, standard: 25, prosireni: 35 };
      const newPosition = planPositions[active as keyof typeof planPositions] || 12;
      if (events) {
        events.value = String(newPosition);
        if (eventsOut) eventsOut.textContent = String(newPosition);
      }
      
      applyRanges();
      compute();
    }));

    events?.addEventListener('input', compute);
    subFee?.addEventListener('input', compute);

    suggest?.addEventListener('click', (e) => {
      e.preventDefault();
      const ev = parseInt(events?.value || '0', 10);
      const best = costsFor(ev)[0];
      const targetPill = document.querySelector(`.go-calc__pill[data-plan="${best.plan}"]`) as HTMLElement;
      targetPill?.click();
    });

    resetBtn?.addEventListener('click', () => {
      active = 'mini';
      planPills.forEach(b => b.setAttribute('aria-pressed', (b as HTMLElement).dataset.plan === 'mini' ? 'true' : 'false'));
      if (events) events.value = '12';
      if (subFee) subFee.value = '900';
      if (perPrice) perPrice.value = String(marginalUnitAt('mini', 12));
      if (adhoc) adhoc.value = '220';
      if (eventsOut) eventsOut.textContent = '12';
      applyRanges();
      compute();
    });

    // Initialize
    applyRanges();
    compute();
  }, []);

  return null; // This component only adds functionality
}

    