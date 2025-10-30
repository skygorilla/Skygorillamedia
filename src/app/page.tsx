
'use client';

import { useEffect, useRef, useState } from 'react';
import Header from '@/components/layout/header';
import Calculator from '@/components/calculator';
import HeroSection from '@/components/hero-section';

export default function Home() {
  const [isMorphed, setIsMorphed] = useState(false);
  const [lineHeight, setLineHeight] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null); // Ref for the actual header element
  
  // This ref will be passed to the Header component to get a reference to the DOM element
  const headerElementRef = (node: HTMLElement | null) => {
    if (node) {
      headerRef.current = node;
    }
  };


  useEffect(() => {
    const nav = navRef.current;
    const hero = heroRef.current;
    const header = headerRef.current;

    if (!nav || !hero || !header) {
      return;
    }

    const HYSTERESIS = 24;
    let triggerY = 0;
    let morphState = false;
    let ticking = false;

    function computeTriggerY() {
      return hero!.offsetTop + hero!.offsetHeight - nav!.offsetHeight - header!.offsetHeight;
    }

    function updateOnScroll() {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      
      const newMorphState = y >= triggerY;

      if (morphState !== newMorphState) {
        morphState = newMorphState;
        setIsMorphed(morphState);
        if (morphState) {
          nav!.classList.add('morph');
        } else {
          nav!.classList.remove('morph');
        }
      }
      
      if (morphState) {
          const scrolledPastMorph = y - triggerY;
          setLineHeight(Math.max(0, scrolledPastMorph));
      } else {
          setLineHeight(0);
      }

    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    }

    function init() {
      triggerY = computeTriggerY();
      updateOnScroll();
    }
    
    // Initial calculation
    const timeoutId = setTimeout(init, 100);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', init);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', init);
      clearTimeout(timeoutId);
    };
  }, []);

  const navTopPosition = 40 + 80; // header height + nav height

  return (
    <>
      <Header ref={headerElementRef} />
      <main>
        <HeroSection heroRef={heroRef} navRef={navRef} />
        <Calculator />
        <div className="content"></div>
      </main>
      <div 
        className="connecting-line"
        style={{ height: `${lineHeight}px`, top: `${navTopPosition}px` }}
      ></div>
    </>
  );
}
