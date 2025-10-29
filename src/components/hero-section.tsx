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
    const lerpFactor = 0.1;
    let targetT = 0;
    let currentT = 0;
    let stuck = false;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const setMorphT = (t: number) => nav.style.setProperty('--morphT', t.toFixed(4));

    function computeTargetT() {
      const heroRect = hero!.getBoundingClientRect();
      const navH = nav!.offsetHeight;
      const barTopY = heroRect.bottom - navH;
      const distToTouch = headerH - barTopY;
      return clamp01(distToTouch / navH);
    }
    
    function applyStickiness() {
        const heroRect = hero!.getBoundingClientRect();
        const navH = nav!.offsetHeight;
        const shouldStick = heroRect.bottom <= (headerH + navH);
  
        if (!stuck && shouldStick) {
          nav!.classList.add('morph');
          stuck = true;
        } else if (stuck && heroRect.bottom > (headerH + navH + hysteresis)) {
          nav!.classList.remove('morph');
          stuck = false;
        }
    }
    
    let ticking = false;
    function onScrollOrResize() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!stuck) {
            targetT = computeTargetT();
        } else {
            targetT = 1;
        }
        applyStickiness();
        ticking = false;
      });
    }

    function animate() {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!isReduced) {
        const delta = targetT - currentT;
        if (Math.abs(delta) > 0.001) {
            currentT += delta * lerpFactor;
            setMorphT(currentT);
        } else if (currentT !== targetT) {
            currentT = targetT;
            setMorphT(currentT);
        }
        requestAnimationFrame(animate);
      } else {
        setMorphT(targetT);
      }
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
