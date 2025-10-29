"use client";

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const hero = heroRef.current;
    if (!nav || !hero) return;

    const root = document.documentElement;
    const headerH = parseFloat(getComputedStyle(root).getPropertyValue('--header-h')) || 40;
    
    const lerpFactor = 0.18;
    let targetT = 0;
    let currentT = 0;
    let stuck = false;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const setMorphT = (t: number) => nav.style.setProperty('--morphT', t.toFixed(4));

    function computeAndApplyState() {
      const navH = nav!.offsetHeight;
      const heroRect = hero!.getBoundingClientRect();

      // Condition to check if the nav bar should be stuck
      const shouldBeStuck = heroRect.bottom <= navH + headerH;
      
      if (shouldBeStuck) {
        if (!stuck) {
          nav.classList.add('morph');
          stuck = true;
        }
        targetT = 1;
      } else {
        if (stuck) {
          nav.classList.remove('morph');
          stuck = false;
        }
        // Calculate morph progress when not stuck
        const distToTouch = headerH - (heroRect.bottom - navH);
        targetT = clamp01(distToTouch / navH);
      }
    }
    
    let ticking = false;
    function onScrollOrResize() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        computeAndApplyState();
        ticking = false;
      });
    }

    function animate() {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReduced) {
        setMorphT(targetT);
        requestAnimationFrame(animate);
        return;
      }
      
      const delta = targetT - currentT;
      if (Math.abs(delta) > 0.001) {
          currentT += delta * lerpFactor;
          setMorphT(currentT);
      } else if (currentT !== targetT) {
          currentT = targetT;
          setMorphT(currentT);
      }
      requestAnimationFrame(animate);
    }
    
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    
    // Initial call
    onScrollOrResize();
    animate();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return (
    <section className="hero" id="goHero" aria-label="Hero" ref={heroRef}>
      <div className="hero-overlay" aria-hidden="true"></div>
      <nav className="go-nav" id="goNav" aria-label="Glas Otoka - traka" ref={navRef}></nav>
    </section>
  );
}
