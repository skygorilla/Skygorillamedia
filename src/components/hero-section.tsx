"use client";

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [stuck, setStuck] = useState(false);
  
  useEffect(() => {
    const nav = navRef.current;
    const hero = heroRef.current;
    const root = document.documentElement;
    if (!nav || !hero) return;

    const headerH = parseFloat(getComputedStyle(root).getPropertyValue('--header-h')) || 40;
    const hysteresis = 6;

    function onScrollOrResize() {
      const heroRect = hero!.getBoundingClientRect();
      if (heroRect.bottom <= (headerH + nav!.offsetHeight)) {
        setStuck(true);
      } else if (heroRect.bottom > (headerH + nav!.offsetHeight + hysteresis)) {
        setStuck(false);
      }
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    
    onScrollOrResize();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

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
