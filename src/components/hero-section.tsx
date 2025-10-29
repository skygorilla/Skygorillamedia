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
    
    let ticking = false;
    let stuck = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const heroRect = hero.getBoundingClientRect();
          const navH = nav.offsetHeight;
          
          const shouldBeStuck = heroRect.bottom <= navH + headerH;

          if (shouldBeStuck) {
            if (!stuck) {
              nav.classList.add('morph');
              stuck = true;
            }
          } else {
            if (stuck) {
              nav.classList.remove('morph');
              stuck = false;
            }
          }
          
          // Always calculate morph progress
          const distToTouch = headerH - (heroRect.bottom - navH);
          const targetT = Math.max(0, Math.min(1, distToTouch / navH));
          nav.style.setProperty('--morphT', targetT.toFixed(4));

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Initial call
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="hero" id="goHero" aria-label="Hero" ref={heroRef}>
      <div className="hero-overlay" aria-hidden="true"></div>
      <nav className="go-nav" id="goNav" aria-label="Glas Otoka - traka" ref={navRef}></nav>
    </section>
  );
}
