
'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/header';

const Calculator = dynamic(() => import('@/components/calculator'), { ssr: false });
const HeroSection = dynamic(() => import('@/components/hero-section'), { ssr: false });

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const nav = navRef.current;
      const hero = heroRef.current;
      const header = headerRef.current;
      
      if (!nav || !hero || !header) return;

      const triggerY = hero.offsetTop + hero.offsetHeight - nav.offsetHeight - header.offsetHeight;
      const isMorphed = nav.classList.contains('morph');

      if (!isMorphed && scrollY >= triggerY) {
        nav.classList.add('morph');
      } else if (isMorphed && scrollY < triggerY) {
        nav.classList.remove('morph');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const headerElementRef = (node: HTMLElement | null) => {
    if (node) {
      headerRef.current = node;
    }
  };


  return (
    <>
      <Header ref={headerElementRef} />
      <main>
        <HeroSection heroRef={heroRef} navRef={navRef} />
        <Calculator />
        <div className="content"></div>
      </main>
    </>
  );
}

    