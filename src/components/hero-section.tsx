"use client";

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const nav = navRef.current;
    const hero = heroRef.current;
    const root = document.documentElement;

    if (!nav || !hero) return;
    
    // Hysteresis gap so tiny scroll jitters don't toggle the state.
    const HYSTERESIS = 8; // px

    let triggerY = 0;
    let isMorphed = false;
    let ticking = false;

    function computeTriggerY() {
      const headerH = parseFloat(getComputedStyle(root).getPropertyValue('--header-h')) || 40;
      // getBoundingClientRect is more reliable in React than offsetTop
      const heroRect = hero.getBoundingClientRect();
      // Add the current scroll position to get the absolute top of the hero
      const heroTop = heroRect.top + window.scrollY;
      return heroTop + hero.offsetHeight - nav.offsetHeight - headerH;
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
    
    // Using 'load' event on window is not reliable in Next.js
    // We can run recalc once after mount and then on resize.
    recalc();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', recalc);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', recalc);
    };
  }, []);

  return (
    <section className="hero" id="goHero" aria-label="Hero" ref={heroRef}>
      <div className="hero-overlay" aria-hidden="true"></div>
      <nav className="go-nav" id="goNav" aria-label="Glas Otoka - traka" ref={navRef}></nav>
    </section>
  );
}
