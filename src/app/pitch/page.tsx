
'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/header';

const Calculator = dynamic(() => import('@/components/calculator'), { 
  ssr: false,
  loading: () => (
    <div className="skeleton-calc">
      <div className="skeleton-calc-grid">
        <div className="skeleton-calc-card">
          <div className="skeleton-box skeleton-title"></div>
          <div className="skeleton-box skeleton-text"></div>
          <div className="skeleton-box skeleton-input"></div>
          <div className="skeleton-box skeleton-input"></div>
          <div className="skeleton-box skeleton-button"></div>
        </div>
        <div className="skeleton-calc-card">
          <div className="skeleton-box skeleton-title"></div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px'}}>
            <div className="skeleton-box skeleton-stat"></div>
            <div className="skeleton-box skeleton-stat"></div>
          </div>
        </div>
      </div>
    </div>
  )
});
const HeroSection = dynamic(() => import('@/components/hero-section'), { 
  ssr: false,
  loading: () => (
    <div className="skeleton-hero">
      <div style={{textAlign: 'center', maxWidth: '920px', padding: '0 24px'}}>
        <div className="skeleton-box" style={{height: '20px', width: '200px', margin: '0 auto 12px', borderRadius: '999px'}}></div>
        <div className="skeleton-box" style={{height: '42px', width: '100%', margin: '12px auto', borderRadius: '8px'}}></div>
        <div className="skeleton-box" style={{height: '16px', width: '80%', margin: '0 auto 24px', borderRadius: '8px'}}></div>
      </div>
    </div>
  )
});

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null); 
  const headerElementRef = (node: HTMLElement | null) => {
    if (node) {
      headerRef.current = node;
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const nav = navRef.current;
      const hero = heroRef.current;
      const header = headerRef.current;
      
      if (!nav || !hero || !header) return;

      // Ensure the morph happens smoothly
      const triggerY = hero.offsetTop + hero.offsetHeight - nav.offsetHeight - header.offsetHeight;
      const HYSTERESIS = 24;
      
      const isMorphed = nav.classList.contains('morph');

      if (!isMorphed && scrollY >= triggerY) {
        nav.classList.add('morph');
      } else if (isMorphed && scrollY < triggerY - HYSTERESIS) {
        nav.classList.remove('morph');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  return (
    <>
      <Header ref={headerElementRef} />
      <main>
        <HeroSection heroRef={heroRef} navRef={navRef} />
        
        <div className="connecting-line"></div>

        <Calculator />
        
        {/* Partnerstvo i koristi */}
        <section className="section" style={{background: '#f8f9fa', padding: '48px 0', zIndex: 2, position: 'relative'}}>
          <div className="container">
            <div className="partnership-card">
              <h2 style={{textAlign: 'center', marginBottom: '32px', color: '#333', fontFamily: 'Montserrat, sans-serif'}}>Partnerstvo i koristi</h2>
              <div className="partnership-table">
                <div className="partnership-row partnership-header">
                  <div>Tko se udruži</div>
                  <div>Što dobije</div>
                </div>
                <div className="partnership-row">
                  <div>Udruga + TZ</div>
                  <div>pristup za male</div>
                </div>
                <div className="partnership-row">
                  <div>TZ + Grad</div>
                  <div>stabilna arhiva i kontinuitet</div>
                </div>
                <div className="partnership-row">
                  <div>TZ + Grad + kulturne ustanove</div>
                  <div>platforma kao javno dobro</div>
                </div>
                <div className="partnership-row">
                  <div>TZ + Grad + škole + sport</div>
                  <div><strong>Otok dobiva svoj kanal</strong></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <div className="content" style={{zIndex: 2, position: 'relative', background: 'white' }}></div>
      </main>

    </>
  );
}

    