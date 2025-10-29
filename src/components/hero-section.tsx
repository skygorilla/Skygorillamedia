"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [stuck, setStuck] = useState(false);
  const currentT = useRef(0);
  const targetT = useRef(0);
  
  useEffect(() => {
    const nav = navRef.current;
    const hero = heroRef.current;
    const root = document.documentElement;
    if (!nav || !hero) return;

    let animationFrameId: number;

    const headerH = parseFloat(getComputedStyle(root).getPropertyValue('--header-h')) || 40;
    const hysteresis = 6;
    const morphRange = 220;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const setMorphT = (t: number) => {
      if (nav) {
        nav.style.setProperty('--morphT', t.toFixed(4));
      }
    };

    function measure() {
      const heroRect = hero!.getBoundingClientRect();
      const threshold = headerH + nav!.offsetHeight;
      const dist = threshold - heroRect.bottom;
      targetT.current = clamp01(dist / morphRange);
    }
    
    function applyStickiness() {
      const heroRect = hero!.getBoundingClientRect();
      if (!stuck && heroRect.bottom <= (headerH + nav!.offsetHeight)) {
        setStuck(true);
        currentT.current = 1;
        setMorphT(currentT.current);
      } else if (stuck && heroRect.bottom > (headerH + nav!.offsetHeight + hysteresis)) {
        setStuck(false);
      }
    }

    function animate() {
      currentT.current += (targetT.current - currentT.current) * 0.15;
      setMorphT(currentT.current);
      animationFrameId = requestAnimationFrame(animate);
    }

    function onScrollOrResize() {
      measure();
      applyStickiness();
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    
    onScrollOrResize();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [stuck]);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[758px] overflow-hidden bg-[radial-gradient(1200px_600px_at_50%_60%,#1b1f2a_0%,#0b0c10_70%)]"
      aria-label="Hero"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-black/15 z-[2]" aria-hidden="true"></div>
      <nav
        ref={navRef}
        className={cn(
          "go-nav",
          "absolute left-1/2 bottom-0 -translate-x-1/2 flex justify-center items-center w-[min(85%,1280px)] h-20 bg-primary z-20 shadow-[0_4px_20px_rgba(0,0,0,.4)]",
          stuck && "morph"
        )}
        aria-label="Glas Otoka - traka"
      ></nav>
    </section>
  );
}
