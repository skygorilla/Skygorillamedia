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

    const morphStartPadding = 0;
    const hysteresis = 6;
    const lerpFactor = 0.18;

    let targetT = 0;
    let currentT = 0;
    let stuck = false;
    let animationFrameId: number;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const setMorphT = (t: number) => nav.style.setProperty('--morphT', t.toFixed(4));

    function computeTargetT() {
      if(!hero) return 0;
      const heroRect = hero.getBoundingClientRect();
      const navH = nav.offsetHeight;
      const touchLine = headerH;
      const barTopY = heroRect.bottom - navH;
      const distToTouch = touchLine - barTopY;
      const raw = (distToTouch - morphStartPadding) / navH;
      return clamp01(raw);
    }

    function applyStickyness() {
        if(!hero) return;
      const heroRect = hero.getBoundingClientRect();
      const navH = nav.offsetHeight;
      const shouldStick = heroRect.bottom <= (headerH + navH);

      if (!stuck && shouldStick) {
        nav.classList.add('morph');
        stuck = true;
        currentT = 1;
        setMorphT(currentT);
      } else if (stuck && heroRect.bottom > (headerH + navH + hysteresis)) {
        nav.classList.remove('morph');
        stuck = false;
      }
    }

    let ticking = false;
    function onScrollOrResize() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        targetT = computeTargetT();
        applyStickyness();
        ticking = false;
      });
    }

    function animate() {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
        currentT += (targetT - currentT) * lerpFactor;
        setMorphT(currentT);
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setMorphT(targetT);
      }
    }
    
    onScrollOrResize();
    animate();

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    window.addEventListener('load', onScrollOrResize);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      window.removeEventListener('load', onScrollOrResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="hero" id="goHero" aria-label="Hero" ref={heroRef}>
      <div className="hero-overlay" aria-hidden="true"></div>
      <nav className="go-nav" id="goNav" aria-label="Glas Otoka - traka" ref={navRef}></nav>
    </section>
  );
}
