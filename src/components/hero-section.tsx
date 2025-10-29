"use client";

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const nav = navRef.current;
    const hero = heroRef.current;
    const header = document.querySelector('.network-header') as HTMLElement;

    if (!nav || !hero || !header) return;
    
    const HYSTERESIS = 8; // px

    let triggerY = 0;
    let isMorphed = false;
    let ticking = false;

    function computeTriggerY() {
      const heroTop = hero!.offsetTop;
      return heroTop + hero!.offsetHeight - nav!.offsetHeight - header!.offsetHeight;
    }

    function recalc() {
      triggerY = computeTriggerY();
      updateOnScroll();
    }

    function updateOnScroll() {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      
      if (!isMorphed && y >= triggerY) {
        nav!.classList.add('morph');
        isMorphed = true;
      } else if (isMorphed && y <= triggerY - HYSTERESIS) {
        nav!.classList.remove('morph');
        isMorphed = false;
      }
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    }
    
    // Initial calculation and setup
    recalc();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', recalc);
    
    // Use a timeout to ensure all elements have been rendered and have their final dimensions
    const timeoutId = setTimeout(recalc, 100);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', recalc);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section className="hero" id="goHero" aria-label="Hero" ref={heroRef}>
      <div className="hero-overlay" aria-hidden="true"></div>
      <nav className="go-nav" id="goNav" aria-label="Glas Otoka - traka" ref={navRef}></nav>
    </section>
  );
}
