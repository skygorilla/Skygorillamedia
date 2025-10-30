
'use client';

import { useEffect, useRef } from 'react';
import Header from '@/components/layout/header';
import Calculator from '@/components/calculator';
import HeroSection from '@/components/hero-section';

export default function Home() {
  const dotRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const line = lineRef.current;
    const hero = document.getElementById('hero');
    const nav = document.getElementById('morphNav');

    if (!dot || !line || !hero || !nav) return;

    let navMorphed = false;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroBottom = hero.offsetTop + hero.offsetHeight;
      const navHeight = nav.offsetHeight;
      const triggerY = heroBottom - navHeight;

      // Animate the dot
      if (scrollY > 40 && scrollY < triggerY) {
        const dotHeight = scrollY - 40;
        dot.style.height = `${dotHeight}px`;
      } else if (scrollY <= 40) {
        dot.style.height = '0px';
      } else {
        dot.style.height = `${triggerY - 40}px`;
      }
      
      const isMorphedNow = nav.classList.contains('morph');

      if (isMorphedNow) {
        if (!navMorphed) {
           // When nav first morphs, smoothly transition dot height to max
           dot.style.transition = 'height 0.6s cubic-bezier(0.86, 0, 0.07, 1)';
           dot.style.height = `${hero.offsetHeight - navHeight}px`;
           navMorphed = true;

           // After transition, hide dot and show line
           setTimeout(() => {
                dot.style.opacity = '0';
                line.style.opacity = '0.6';
           }, 600);
        }
        
        const contentStart = hero.offsetTop + hero.offsetHeight;
        if (scrollY > contentStart) {
          const lineHeight = scrollY - contentStart;
          line.style.height = `${lineHeight}px`;
        } else {
          line.style.height = `0px`;
        }

      } else {
         if (navMorphed) {
            dot.style.transition = 'height 0.2s ease-out';
            dot.style.opacity = '1';
            line.style.opacity = '0';
            line.style.height = '0px';
            navMorphed = false;
         }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header />
      <div ref={dotRef} className="connecting-dot"></div>
      <div ref={lineRef} className="connecting-line"></div>
      <main>
        <HeroSection />
        <Calculator />
        <div className="content"></div>
      </main>
    </>
  );
}
