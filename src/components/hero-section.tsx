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
    
    const hysteresis = 6;
    const lerpFactor = 0.18;
    let targetT = 0;
    let currentT = 0;
    let stuck = false;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const setMorphT = (t: number) => nav.style.setProperty('--morphT', t.toFixed(4));

    function computeTargetT() {
      if (stuck) return 1;
      const heroRect = hero!.getBoundingClientRect();
      const navH = nav!.offsetHeight;
      const barTopY = heroRect.bottom - navH;
      const distToTouch = headerH - barTopY;
      return clamp01(distToTouch / navH);
    }
    
    function applyStickiness() {
        const heroRect = hero!.getBoundingClientRect();
        // This is the key change: The condition should check when the *bottom* of the hero
        // is at or above the header height.
        const shouldStick = heroRect.bottom <= headerH;
  
        if (!stuck && shouldStick) {
          nav!.classList.add('morph');
          stuck = true;
        } else if (stuck && heroRect.bottom > headerH + hysteresis) {
          nav!.classList.remove('morph');
          stuck = false;
        }
    }
    
    let ticking = false;
    function onScrollOrResize() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        targetT = computeTargetT();
        applyStickiness();
        ticking = false;
      });
    }

    function animate() {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (isReduced) {
        setMorphT(targetT);
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
    window.addEventListener('load', onScrollOrResize);
    
    onScrollOrResize();
    animate();

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      window.removeEventListener('load', onScrollOrResize);
    };
  }, []);

  return (
    <section className="hero" id="goHero" aria-label="Hero" ref={heroRef}>
      <div className="hero-overlay" aria-hidden="true"></div>
      <nav className="go-nav" id="goNav" aria-label="Glas Otoka - traka" ref={navRef}></nav>
    </section>
  );
}
