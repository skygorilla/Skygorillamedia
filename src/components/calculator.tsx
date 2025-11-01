'use client';

import { useState, useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';
import { Calculator as CalcIcon, RotateCcw } from 'lucide-react';
import { Input } from './ui/input';

const packages = {
  mini: { sub: 600, rate: 250, label: 'Mini', volume: [1, 10] },
  standard: { sub: 1800, rate: 210, label: 'Standard', volume: [11, 40] },
  partner: { sub: 3600, rate: 180, label: 'Partner', volume: [41, 80] },
  otokplus: { sub: 6000, rate: 150, label: 'Otok+', volume: [81, 120] },
};

type Plan = keyof typeof packages;

const hr = new Intl.NumberFormat('hr-HR', { maximumFractionDigits: 0 });

const getPlanByVolume = (n: number): Plan => {
  if (n <= 10) return 'mini';
  if (n <= 40) return 'standard';
  if (n <= 80) return 'partner';
  return 'otokplus';
};

const calculateCosts = (planKey: Plan, n: number) => {
  const pkg = packages[planKey];
  const total = pkg.sub + n * pkg.rate;
  return {
    total,
    monthly: Math.round(total / 12),
    sub: pkg.sub,
    variable: n * pkg.rate,
  };
};

export default function Calculator() {
  const [events, setEvents] = useState(12);
  const [adhocPrice, setAdhocPrice] = useState(250);
  const [activePlan, setActivePlan] = useState<Plan>('mini');

  const recommendedPlan = useMemo(() => getPlanByVolume(events), [events]);
  const costs = useMemo(() => calculateCosts(recommendedPlan, events), [recommendedPlan, events]);

  const savings = useMemo(() => {
    const adhocTotal = events * adhocPrice;
    return adhocTotal - costs.total;
  }, [events, adhocPrice, costs.total]);

  const handlePlanChange = (plan: Plan) => {
    setActivePlan(plan);
    const targetVolume = packages[plan].volume[0];
    setEvents(targetVolume);
  };

  const handleReset = () => {
    setEvents(12);
    setAdhocPrice(250);
    setActivePlan('mini');
  };
  
  const allPlansCost = useMemo(() => {
    return (Object.keys(packages) as Plan[]).map(p => ({
        plan: p,
        label: packages[p].label,
        ...calculateCosts(p, events)
    }));
  }, [events]);

  return (
    <div className="go-calc__wrap">
      <Card className="go-calc__card go-calc__card--modern">
        <CardHeader className="p-4">
          <div className="flex items-center gap-3">
             <CalcIcon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle id="calc-title" className="go-calc__title">Kalkulator Pretplate</CardTitle>
              <p className="text-muted-foreground text-sm">Pronađite idealnu pretplatu za vaše potrebe</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="go-calc__step">
            <div className="go-calc__step-header mb-4">
              <span className="go-calc__step-number">1</span>
              <h3>Odaberite paket</h3>
            </div>
            <RadioGroup
              value={activePlan}
              onValueChange={(value) => handlePlanChange(value as Plan)}
              className="grid grid-cols-2 lg:grid-cols-4 gap-2"
            >
              {(Object.keys(packages) as Plan[]).map((plan) => (
                <div key={plan}>
                  <RadioGroupItem value={plan} id={plan} className="sr-only" />
                  <Label
                    htmlFor={plan}
                    className={`flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground ${activePlan === plan ? 'border-primary' : ''}`}
                  >
                    {packages[plan].label}
                    <span className="text-xs text-muted-foreground">{`${packages[plan].volume[0]}-${packages[plan].volume[1]} isporuka`}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="go-calc__step mt-6">
            <div className="go-calc__step-header mb-4">
              <span className="go-calc__step-number">2</span>
              <h3>Precizno podešavanje</h3>
            </div>
            <div className="go-calc__inputs space-y-4">
              <div className="go-calc__input-group">
                <Label htmlFor="go-events" className="go-calc__label flex justify-between">
                  <span>Broj isporuka godišnje</span>
                  <div className="go-calc__value">
                    <span className="go-calc__value-number font-bold">{events}</span>
                    <span className="go-calc__value-unit text-muted-foreground"> isporuka</span>
                  </div>
                </Label>
                <Slider
                  id="go-events"
                  min={1}
                  max={130}
                  step={1}
                  value={[events]}
                  onValueChange={(value) => setEvents(value[0])}
                  className="go-calc__slider"
                />
              </div>
              <div className="go-calc__input-group">
                <Label htmlFor="go-adhoc" className="go-calc__label">Ad-hoc cijena (€/isporuka)</Label>
                <Input
                  id="go-adhoc"
                  type="number"
                  value={adhocPrice}
                  onChange={(e) => setAdhocPrice(Number(e.target.value))}
                  className="go-calc__input"
                  min="1"
                  max="1000"
                />
              </div>
            </div>
          </div>
          
          <div className="go-calc__actions mt-6 flex gap-2">
            <Button onClick={handleReset} variant="outline" type="button">
              <RotateCcw className="h-4 w-4 mr-2" />
              Resetiraj
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="go-calc__card go-calc__card--results" aria-live="polite">
         <CardHeader>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <CardTitle className="go-calc__results-title">Vaš rezultat</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            <div className="go-calc__summary mb-4">
                <div className="go-calc__summary-main text-center">
                    <div className="text-4xl font-bold">{hr.format(costs.total)}€</div>
                    <div className="text-muted-foreground">godišnje</div>
                </div>
                <div className="text-center text-lg text-muted-foreground mt-1">{hr.format(costs.monthly)}€/mjesec</div>
            </div>
            
            <div className="go-calc__breakdown space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-muted-foreground">Fiksni dio</span><span>{hr.format(costs.sub)} €</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Varijabilni dio</span><span>{hr.format(costs.variable)} €</span></div>
            </div>

            {savings > 0 && <div className="text-green-600 text-sm font-semibold mb-4">Ušteda približno {hr.format(savings)} EUR godišnje u odnosu na ad-hoc.</div>}

            <div className="text-sm text-muted-foreground mb-4">Preporučeni paket za {events} isporuka je <strong>{packages[recommendedPlan].label}</strong>.</div>

            <div>
                <h3 className="text-base font-semibold mb-2">Svi paketi</h3>
                <div className="space-y-2">
                    {allPlansCost.map(p => (
                        <div key={p.plan} className={`p-2 rounded-lg border-2 ${p.plan === recommendedPlan ? 'border-primary' : 'border-border'}`}>
                           <div className="flex justify-between items-center font-semibold">
                                <span>{p.label}</span>
                                <span>{hr.format(p.total)}€</span>
                           </div>
                           <div className="flex justify-between items-center text-xs text-muted-foreground">
                               <span>{p.n} isporuka</span>
                               <span>{hr.format(p.monthly)}€/mj</span>
                           </div>
                        </div>
                    ))}
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
