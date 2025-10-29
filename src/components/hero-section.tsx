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
    let stuck = false;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const setMorphT = (t: number) => nav.style.setProperty('--morphT', t.toFixed(4));

    function onScrollOrResize() {
      if (!hero || !nav) return;

      const heroRect = hero.getBoundingClientRect();
      const navH = nav.offsetHeight;
      const touchLine = headerH;
      const barTopY = heroRect.bottom - navH;
      const distToTouch = touchLine - barTopY;
      const rawT = (distToTouch - morphStartPadding) / navH;
      const targetT = clamp01(rawT);
      
      const shouldStick = heroRect.bottom <= (headerH + navH);

      if (stuck && heroRect.bottom > (headerH + navH + hysteresis)) {
        nav.classList.remove('morph');
        stuck = false;
      } else if (!stuck && shouldStick) {
        nav.classList.add('morph');
        stuck = true;
      }

      if (stuck) {
        setMorphT(1);
      } else {
        setMorphT(targetT);
      }
    }
    
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    window.addEventListener('load', onScrollOrResize);
    
    onScrollOrResize();

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
