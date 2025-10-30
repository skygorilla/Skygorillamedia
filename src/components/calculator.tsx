
"use client";

import { useEffect, useState, useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const packages = {
  mini: { sub: 600, label: 'Mini', type: 'flat', rates: { flat: 150 }, description: "Osnovni paket za do 20 objava." },
  standard: { sub: 1200, label: 'Standard', type: 'marginal', rates: [{ upto: 20, price: 150 }, { upto: Infinity, price: 100 }], description: "Optimalan omjer za 20-30 objava." },
  prosireni: { sub: 2500, label: 'Prošireni', type: 'marginal', rates: [{ upto: 20, price: 150 }, { upto: 30, price: 100 }, { upto: Infinity, price: 70 }], description: "Najbolja vrijednost za 30+ objava." }
};

type PlanResult = {
  name: string;
  label: string;
  total: number;
  sub: number;
  variable: number;
  monthly: number;
  n: number;
};

const chartConfig = {
  total: {
    label: "Ukupni trošak",
  },
  mini: {
    label: "Mini",
    color: "hsl(var(--chart-2))",
  },
  standard: {
    label: "Standard",
    color: "hsl(var(--chart-2))",
  },
  prosireni: {
    label: "Prošireni",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;


export default function Calculator() {
  const [events, setEvents] = useState(12);
  const [adhocPrice, setAdhocPrice] = useState(220);
  const [results, setResults] = useState<PlanResult[]>([]);
  const [recommendation, setRecommendation] = useState('');

  const hr = new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });

  const marginalVariableCost = (plan: string, n: number): number => {
    const pkg = packages[plan as keyof typeof packages];
    if (pkg.type === 'flat' && pkg.rates.flat) {
      return n * pkg.rates.flat;
    }

    let left = n;
    let cost = 0;
    let prev = 0;
    if (pkg.type === 'marginal' && Array.isArray(pkg.rates)) {
      for (const r of pkg.rates) {
        if (left <= 0) break;
        const bandCount = Math.max(0, Math.min(left, r.upto === Infinity ? left : r.upto - prev));
        cost += bandCount * r.price;
        left -= bandCount;
        prev = r.upto === Infinity ? prev + bandCount : r.upto;
      }
    }
    return cost;
  }

  const calculateAllCosts = (n: number): PlanResult[] => {
    return Object.keys(packages).map(pKey => {
      const pkg = packages[pKey as keyof typeof packages];
      const variable = marginalVariableCost(pKey, n);
      const total = pkg.sub + variable;
      return {
        name: pKey,
        label: pkg.label,
        total: total,
        sub: pkg.sub,
        variable: variable,
        monthly: Math.round(total / 12),
        n: n,
      };
    });
  }

  useEffect(() => {
    const allPlans = calculateAllCosts(events);
    setResults(allPlans);

    if (events > 0) {
      const sortedPlans = [...allPlans].sort((a, b) => a.total - b.total);
      const bestPlan = sortedPlans[0];
      const secondBest = sortedPlans[1];

      if (bestPlan && secondBest) {
        const savingVsSecond = secondBest.total - bestPlan.total;
        if (savingVsSecond > 0) {
          setRecommendation(`Za <strong>${events}</strong> isporuka, <strong>${bestPlan.label}</strong> paket je najisplativiji.`);
        } else {
          setRecommendation(`Za <strong>${events}</strong> isporuka, paketi imaju sličnu isplativost.`);
        }
      }
    } else {
      setRecommendation("Pomaknite klizač za izračun.");
    }
  }, [events, adhocPrice]);
  
  const chartData = useMemo(() => {
    if (!results.length) return [];
    
    const bestPlanName = events > 0 ? results.sort((a,b) => a.total - b.total)[0].name : '';
    
    return results.map(plan => ({
      name: plan.label,
      total: plan.total,
      fill: plan.name === bestPlanName ? 'hsl(var(--primary))' : 'hsl(var(--chart-2))'
    }));
  }, [results, events]);

  return (
    <section className="section go-calc" id="go-calculator" aria-labelledby="calc-title">
      <div className="container go-calc__wrap">
        {/* Left Panel: Controls */}
        <div className="flex flex-col">
           <h2 id="calc-title" className="go-calc__title">Kalkulator troškova</h2>
           <p className="go-calc__muted mb-6">Pronađite najisplativiji paket za vaše potrebe.</p>
          
           <div className="mb-8 flex-grow">
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

          <div className="go-calc__stat go-calc__stat--input mt-4 md:mt-0">
              <small>Usporedna ad-hoc cijena (€/isporuka)</small>
              <input 
                id="go-adhoc" 
                type="number" 
                value={adhocPrice} 
                onChange={(e) => setAdhocPrice(parseInt(e.target.value, 10) || 0)}
                inputMode="numeric" 
                className="go-calc__big-input" 
              />
          </div>
          
          {recommendation && <div className="muted mt-6 text-center text-base" dangerouslySetInnerHTML={{ __html: recommendation }}></div>}
        </div>

        {/* Right Panel: Chart */}
        <div className="go-calc__card -mt-4 md:mt-0">
          <h3 className="text-lg font-semibold mb-1">Godišnji trošak po paketima</h3>
          <p className="text-sm text-muted-foreground mb-4">Usporedba ukupnih troškova za {events} isporuka.</p>
          <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height={250}>
                <BarChart accessibilityLayer data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                   <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${hr.format(value as number)}`}
                   />
                  <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent
                        formatter={(value, name) => (
                            <div className="flex flex-col">
                                <span className="font-bold">{name}</span>
                                <span className='text-primary font-semibold'>{hr.format(value as number)}</span>
                            </div>
                        )}
                        indicator='dot'
                    />}
                  />
                  <Bar dataKey="total" radius={4} />
                </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </section>
  );
}
