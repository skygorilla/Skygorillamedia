"use client";

import { RefObject } from 'react';

interface HeroSectionProps {
  navRef: RefObject<HTMLElement>;
  heroRef: RefObject<HTMLElement>;
}

export default function HeroSection({ navRef, heroRef }: HeroSectionProps) {
  return (
    <section 
      className="hero" 
      id="hero" 
      aria-label="Hero" 
      ref={heroRef}
      style={{
        backgroundImage: 'url(https://i.ibb.co/11qd2Kj/DJI-0681.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="overlay"></div>
      <div className="hero-content">
        <span className="pill">Glas Otoka — platforma</span>
        <h1 className="hero-title">Centralizirani lokalni kanal</h1>
        <p className="hero-subtitle">Strateški i operativni model za kontinuitet lokalnih priča, događaja i streamova Korčule, Mljeta, Lastova i Pelješca.</p>
        
        <div className="hero-buttons a1-style">
          <button className="btn-a1 primary calc-trigger" onClick={() => {
            const calc = document.querySelector('.go-calc');
            calc?.scrollIntoView({ behavior: 'smooth' });
            calc?.classList.add('highlight-calc');
            setTimeout(() => calc?.classList.remove('highlight-calc'), 2000);
          }}>
            📊 Izračunaj plan
          </button>
          <button className="btn-a1 secondary">Pretplatnički modeli</button>
          <button className="btn-a1 secondary">Spremi kao PDF</button>
          <button className="btn-a1 secondary">Podijeli</button>
        </div>
      </div>
      <nav className="red-nav" id="morphNav" aria-label="Glas Otoka - traka" ref={navRef}>Glas Otoka</nav>
    </section>
  );
}