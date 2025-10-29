'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const header = headerRef.current;
    const hero = heroRef.current;

    if (!nav || !header || !hero) return;

    const HYSTERESIS = 8;

    let triggerY = 0;
    let isMorphed = false;
    let ticking = false;

    function computeTriggerY() {
      const heroTop = hero!.offsetTop;
      return (
        heroTop + hero!.offsetHeight - nav!.offsetHeight - header!.offsetHeight
      );
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

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', recalc);
    
    // Initial calculation after a short delay to ensure layout is stable
    const initTimeout = setTimeout(recalc, 100);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', recalc);
      clearTimeout(initTimeout);
    };
  }, []);

  return (
    <>
      <header id="topHeader" ref={headerRef}></header>

      <div className="hero" id="hero" ref={heroRef}>
        <div className="overlay"></div>
        <nav className="red-nav" id="morphNav" ref={navRef}></nav>
      </div>

      <div className="content">
        Scroll test sadržaj – pomakni stranicu dolje.
      </div>
    </>
  );
}
