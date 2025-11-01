'use client';

import { useEffect, useRef } from 'react';
import Header from '@/components/layout/header';
import Calculator from '@/components/calculator';
import HeroSection from '@/components/hero-section';

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  
  const headerElementRef = (node: HTMLElement | null) => {
    if (headerRef.current !== node) {
      (headerRef as any).current = node;
    }
  };

  useEffect(() => {
    const nav = navRef.current;
    const hero = heroRef.current;
    const header = headerRef.current;

    if (!nav || !hero || !header) return;

    let triggerY = 0;
    let morphState = false;
    let ticking = false;

    const computeTriggerY = () => {
      return hero.offsetTop + hero.offsetHeight - nav.offsetHeight - header.offsetHeight;
    };

    const updateOnScroll = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      const newMorphState = y >= triggerY;

      if (morphState !== newMorphState) {
        morphState = newMorphState;
        nav.classList.toggle('morph', morphState);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          try {
            updateOnScroll();
          } catch (error) {
            console.error('Scroll handler error:', error);
          } finally {
            ticking = false;
          }
        });
        ticking = true;
      }
    };

    const init = () => {
      try {
        triggerY = computeTriggerY();
        updateOnScroll();
      } catch(e) {
        console.error("Initialization error in scroll effect", e);
      }
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
      <HeroSection heroRef={heroRef} navRef={navRef} />
      <section className="section go-calc" id="go-calc">
        <div className="container">
          <Calculator />
        </div>
      </section>
      <div className="content"></div>
    </>
  );
}
