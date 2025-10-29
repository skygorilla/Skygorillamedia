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

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const setMorphT = (t: number) => nav.style.setProperty('--morphT', t.toFixed(4));

    function onScrollOrResize() {
      if (!hero || !nav) return;

      const heroRect = hero.getBoundingClientRect();
      const shouldStick = heroRect.bottom <= headerH;

      if (shouldStick) {
        if (!nav.classList.contains('morph')) {
          nav.classList.add('morph');
          setMorphT(1);
        }
      } else {
        if (nav.classList.contains('morph')) {
          nav.classList.remove('morph');
        }
        const navH = nav.offsetHeight;
        const barTopY = heroRect.bottom - navH;
        const distToTouch = headerH - barTopY;
        const rawT = distToTouch / navH;
        const targetT = clamp01(rawT);
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
