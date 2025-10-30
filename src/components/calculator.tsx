
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Final pricing tiers from the spec
const packages = {
  mini: { sub: 600, rate: 250, label: 'Mini', volume: [1, 10], description: "Za male udruge i škole (1-10 događaja)." },
  standard: { sub: 1800, rate: 210, label: 'Standard', volume: [11, 40], description: "Za TZ, sport i kulturu (10-40 događaja)." },
  partner: { sub: 3600, rate: 180, label: 'Partner', volume: [41, 80], description: "Za gradove i institucije (40-80 događaja)." },
  otok_plus: { sub: 6000, rate: 150, label: 'Otok+', volume: [81, 120], description: "Full media service za multi-partnere (80-120 događaja)." }
};

type PlanKey = keyof typeof packages;

type PlanResult = {
  name: PlanKey;
  label: string;
  total: number;
  sub: number;
  variable: number;
  monthly: number;
  n: number;
  eventRate: number;
};

// Helper to select plan based on volume
const getPlanByVolume = (n: number): PlanKey => {
  if (n <= 10) return 'mini';
  if (n <= 40) return 'standard';
  if (n <= 80) return 'partner';
  return 'otok_plus';
};

const roundToNearest10 = (num: number) => Math.round(num / 10) * 10;

export default function Calculator() {
  const [events, setEvents] = useState(12);
  const [isIndexed, setIsIndexed] = useState(false);
  const [isAssociation, setIsAssociation] = useState(false);
  const [result, setResult] = useState<PlanResult | null>(null);

  const hr = useMemo(() => new Intl.NumberFormat('hr-HR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }), []);

  useEffect(() => {
    const cappedEvents = Math.min(events, 120);
    const planKey = getPlanByVolume(cappedEvents);
    const plan = packages[planKey];

    let eventRate = plan.rate;
    if (isIndexed) {
      eventRate = roundToNearest10(plan.rate * 1.075);
    }
    
    const variableCost = cappedEvents * eventRate;
    const totalCost = plan.sub + variableCost;
    
    setResult({
      name: planKey,
      label: plan.label,
      total: totalCost,
      sub: plan.sub,
      variable: variableCost,
      monthly: Math.round(totalCost / 12),
      n: cappedEvents,
      eventRate: eventRate
    });

  }, [events, isIndexed]);

  const displayedPlans = Object.keys(packages).filter(p => p !== 'otok_plus' || events >= 80) as PlanKey[];

  return (
    <section className="section go-calc" id="go-calculator" aria-labelledby="calc-title">
      <div className="container text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Kalkulator paketa</h2>
        <p className="text-lg text-muted-foreground mt-2">Radimo zajedno — jer zajednica bez zajedništva nema medij.</p>
      </div>
      <div className="container go-calc__wrap max-w-4xl mx-auto">
        {/* Controls */}
        <div className="go-calc__card flex flex-col justify-between">
          <div>
            <h3 id="calc-title" className="go-calc__title">Prilagodite vaš paket</h3>
            <p className="go-calc__muted mb-6">Pomaknite klizač kako biste odabrali broj godišnjih događaja.</p>
            
            <div className="mb-6">
                <label htmlFor="go-events" className='font-semibold text-sm mb-2 block text-left'>Broj događaja godišnje: <span className="text-primary font-bold text-lg ml-2">{Math.min(events, 120)}</span></label>
                <input 
                  id="go-events" 
                  type="range" 
                  min="1" max="130"
                  step="1" 
                  value={events} 
                  onChange={(e) => setEvents(parseInt(e.target.value, 10))}
                  className='w-full' 
                />
                {events > 120 && (
                     <p className="text-sm text-yellow-600 mt-2 text-center font-semibold">Za više od 120 događaja, molimo <a href="#kontakt" className="underline">kontaktirajte nas</a>.</p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                    <Switch id="indexing-switch" checked={isIndexed} onCheckedChange={setIsIndexed} />
                    <Label htmlFor="indexing-switch" className="text-sm">Indexacija (2025)</Label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Switch id="association-switch" checked={isAssociation} onCheckedChange={setIsAssociation} />
                    <Label htmlFor="association-switch" className="text-sm">Udruga / Škola</Label>
                </div>
            </div>

             {isIndexed && (
                <div className="mt-4 p-2 bg-blue-50 border border-blue-200 rounded-md text-xs text-blue-700">
                    <span className="font-bold">Indexirano prema DZS 2025 (+7.5%).</span>
                    <p className="text-xs">Cijene uključuju mogućnost godišnje usklađene prema indeksu usluga.</p>
                </div>
            )}
             {isAssociation && result?.name === 'mini' && (
                <div className="mt-4 p-2 bg-green-50 border border-green-200 rounded-md text-xs text-green-800">
                   <p><strong>Savjet:</strong> Udružite se s drugim udrugama kako biste prešli u veći paket i ostvarili nižu cijenu po događaju!</p>
                </div>
            )}

          </div>
        </div>

        {/* Results */}
        <div className="go-calc__card flex flex-col justify-center">
            {result && (
                 <>
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">Preporučeni paket</p>
                        <p className="text-3xl font-bold text-primary">{result.label}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 my-6 text-center">
                        <div className="go-calc__stat p-4">
                            <small>Ukupno/god</small>
                            <div className="go-calc__big">{hr.format(result.total)}</div>
                        </div>
                        <div className="go-calc__stat p-4">
                            <small>Mjesečno</small>
                            <div className="go-calc__big">{hr.format(result.monthly)}</div>
                        </div>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1 text-center">
                        <p>Pretplata: <strong>{hr.format(result.sub)}</strong></p>
                        <p>Događaji: {result.n} × <strong>{hr.format(result.eventRate)}</strong> = {hr.format(result.variable)}</p>
                    </div>
                 </>
            )}
        </div>
      </div>
       <div className="container max-w-4xl mx-auto mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
         {displayedPlans.map(pKey => {
           const plan = packages[pKey];
           const isActive = result?.name === pKey;
           return (
             <div key={pKey} className={`p-4 border rounded-lg text-center ${isActive ? 'border-primary bg-primary/5' : 'border-border'}`}>
               <h4 className="font-bold">{plan.label}</h4>
               <p className="text-xs text-muted-foreground">{plan.volume[0]}-{plan.volume[1]} događaja</p>
             </div>
           );
         })}
       </div>
    </section>
  );
}

    