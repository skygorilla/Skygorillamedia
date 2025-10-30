
"use client";

import { useEffect, useState } from 'react';

const packages = {
  mini: { sub: 600, label: 'Mini', type: 'flat', rates: { flat: 150 }, description: "Osnovni paket za do 20 objava." },
  standard: { sub: 1200, label: 'Standard', type: 'marginal', rates: [{ upto: 20, price: 150 }, { upto: Infinity, price: 100 }], description: "Optimalan omjer za 20-30 objava." },
  prosireni: { sub: 2500, label: 'Prošireni', type: 'marginal', rates: [{ upto: 20, price: 150 }, { upto: 30, price: 100 }, { upto: Infinity, price: 70 }], description: "Najbolja vrijednost za 30+ objava." }
};

type PlanResult = {
  plan: string;
  label: string;
  sub: number;
  description: string;
  n: number;
  total: number;
  monthly: number;
  variable: number;
};

export default function Calculator() {
  const [events, setEvents] = useState(12);
  const [adhocPrice, setAdhocPrice] = useState(220);
  const [rankedPlans, setRankedPlans] = useState<PlanResult[]>([]);
  const [recommendation, setRecommendation] = useState('');
  const [savings, setSavings] = useState('');

  const hr = new Intl.NumberFormat('hr-HR', { maximumFractionDigits: 0 });

  const marginalVariableCost = (plan: string, n: number): number => {
    const pkg = packages[plan as keyof typeof packages];
    if (pkg.type === 'flat' && pkg.rates.flat) {
      return n * pkg.rates.flat;
    }

    let left = n;
    let cost = 0;
    let prev = 0;
    if (pkg.type === 'marginal' && pkg.rates) {
      for (const r of pkg.rates) {
        if(left <= 0) break;
        const bandCount = Math.max(0, Math.min(left, r.upto === Infinity ? left : r.upto - prev));
        cost += bandCount * r.price;
        left -= bandCount;
        prev = r.upto === Infinity ? prev + bandCount : r.upto;
      }
    }
    return cost;
  }

  const calculateCosts = (n: number): PlanResult[] => {
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
        monthly: Math.round(total / 12),
        variable: variable,
      };
    });
  }

  useEffect(() => {
    const allPlans = calculateCosts(events);
    const sortedPlans = [...allPlans].sort((a, b) => a.total - b.total);
    setRankedPlans(allPlans); // Keep original order for rendering

    const bestPlan = sortedPlans[0];
    const secondBest = sortedPlans[1];

    if (bestPlan && secondBest) {
      const savingVsSecond = secondBest.total - bestPlan.total;
      if (savingVsSecond > 0) {
        setRecommendation(`Za <strong>${events}</strong> isporuka, <strong>${bestPlan.label}</strong> paket je najisplativiji. Ušteda od ~<strong>${hr.format(savingVsSecond)}€</strong> godišnje u odnosu na sljedeću opciju.`);
      } else {
        setRecommendation(`Za <strong>${events}</strong> isporuka, paketi imaju sličnu isplativost.`);
      }
    }

    const adhocTotal = events * adhocPrice;
    const savingVsAdhoc = adhocTotal - (bestPlan?.total || 0);

    if (savingVsAdhoc > 0) {
      setSavings(`Ušteda od <strong>${hr.format(savingVsAdhoc)} EUR</strong> godišnje u usporedbi s ad-hoc cijenom.`);
    } else {
      setSavings(`Ad-hoc je isplativiji za <strong>${hr.format(Math.abs(savingVsAdhoc))} EUR</strong>.`);
    }

  }, [events, adhocPrice]);


  const bestPlanName = rankedPlans.length > 0 ? [...rankedPlans].sort((a,b) => a.total - b.total)[0].plan : '';

  return (
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
              <input 
                id="go-adhoc" 
                type="number" 
                value={adhocPrice} 
                onChange={(e) => setAdhocPrice(parseInt(e.target.value, 10) || 0)}
                inputMode="numeric" 
                className="go-calc__big-input" />
            </div>
          </div>
          
          <div className="mb-8">
              <label htmlFor="go-events" className='font-semibold text-sm mb-2 block'>Broj isporuka godišnje: <span className="text-primary font-bold text-lg ml-2">{events}</span></label>
              <input 
                id="go-events" 
                type="range" 
                min="0" max="60" 
                step="1" 
                value={events} 
                onChange={(e) => setEvents(parseInt(e.target.value, 10))}
                className='w-full' 
              />
          </div>

          {recommendation && <div className="muted mb-6 text-center" dangerouslySetInnerHTML={{ __html: recommendation }}></div>}


          <div id="go-plan-container" className="go-calc__plan-cards">
            {rankedPlans.map((plan) => (
                <div key={plan.plan} className={`go-calc__plan-card ${plan.plan === bestPlanName ? 'go-calc__plan-card--best' : ''}`}>
                  {plan.plan === bestPlanName && <div className="go-calc__plan-badge">Preporučeno</div>}
                  <div className="go-calc__plan-header">{plan.label}</div>
                  <div className="go-calc__plan-price">{hr.format(plan.total)} EUR</div>
                  <div className="go-calc__plan-monthly">{hr.format(plan.monthly)} EUR/mj</div>
                  <div className="go-calc__plan-details">
                    <div>Pretplata: {hr.format(plan.sub)} EUR</div>
                    <div>{plan.description}</div>
                  </div>
                </div>
            ))}
          </div>

          {savings && <p className="note mt-6 text-center" dangerouslySetInnerHTML={{ __html: savings }}></p>}
        </div>
      </div>
    </section>
  );
}
