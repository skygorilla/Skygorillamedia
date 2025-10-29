"use client";

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const nav = navRef.current;
    const hero = heroRef.current;
    // We need a reference to the main header to get its height
    const header = document.querySelector('.network-header') as HTMLElement;

    if (!nav || !hero || !header) return;
    
    // Hysteresis gap so tiny scroll jitters don't toggle the state.
    const HYSTERESIS = 8; // px

    let triggerY = 0;
    let isMorphed = false;
    let ticking = false;

    function computeTriggerY() {
      // getBoundingClientRect is more reliable for positions relative to the viewport.
      const heroRect = hero.getBoundingClientRect();
      // We add window.scrollY to get the absolute position on the page.
      const heroBottom = heroRect.bottom + window.scrollY;
      return heroBottom - nav.offsetHeight - header.offsetHeight;
    }

    function recalc() {
      triggerY = computeTriggerY();
      updateOnScroll();
    }

    function updateOnScroll() {
      const y = window.scrollY || document.documentElement.scrollTop;
      
      // Enter morph when we pass trigger; exit only when we go above trigger - HYSTERESIS
      if (!isMorphed && y >= triggerY) {
        nav.classList.add('morph');
        isMorphed = true;
      } else if (isMorphed && y < triggerY - HYSTERESIS) {
        nav.classList.remove('morph');
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

    // A small delay and re-calculation can help if initial render dimensions are off
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
