'use client';

import { useEffect, useRef, useCallback } from 'react';
import Header from '@/components/layout/header';
import Calculator from '@/components/calculator';
import HeroSection from '@/components/hero-section';

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const headerElementRef = useCallback((node: HTMLElement | null) => {
    if (headerRef.current !== node) {
      (headerRef as React.MutableRefObject<HTMLElement | null>).current = node;
    }
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const hero = heroRef.current;
    const header = headerRef.current;

    if (!nav || !hero || !header) return;

    let triggerY = 0;
    let isMorphed = false;
    let ticking = false;
    const HYSTERESIS = 24;

    const computeTriggerY = () => {
      try {
        return hero.offsetTop + hero.offsetHeight - nav.offsetHeight - header.offsetHeight;
      } catch (e) {
        console.error("Error computing trigger Y:", e);
        return 0;
      }
    };

    const updateOnScroll = () => {
      try {
        const y = window.pageYOffset || document.documentElement.scrollTop;

        if (!isMorphed && y >= triggerY) {
          nav.classList.add('morph');
          isMorphed = true;
        } else if (isMorphed && y <= triggerY - HYSTERESIS) {
          nav.classList.remove('morph');
          isMorphed = false;
        }
      } catch (error) {
        console.error('Error in updateOnScroll:', error);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    const init = () => {
      triggerY = computeTriggerY();
      updateOnScroll();
    };

    init();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', init);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <>
      <Header ref={headerElementRef} />
      <main id="main">
        <HeroSection heroRef={heroRef} navRef={navRef} />
        <section className="section go-calc" id="go-calc">
          <div className="container">
            <Calculator />
          </div>
        </section>
        <div className="content"></div>
      </main>
    </>
  );
}
