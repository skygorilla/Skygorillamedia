"use client";

import { RefObject } from 'react';
import Image from 'next/image';

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
    >
        <Image 
            src="https://picsum.photos/seed/hero1/1920/1080"
            alt="Hero background"
            fill
            style={{ objectFit: 'cover' }}
            priority
        />
      <div className="overlay"></div>
      <div className="hero-content">
        <span className="pill">Glas Otoka — platforma</span>
        <h1 className="hero-title">Centralizirani lokalni kanal</h1>
        <p className="hero-subtitle">Strateški i operativni model za kontinuitet lokalnih priča, događaja i streamova Korčule, Mljeta, Lastova i Pelješca.</p>
        
        <div className="hero-buttons">
          <button className="btn primary" onClick={() => document.getElementById('go-calc')?.scrollIntoView()} aria-label="Calculate subscription plan">Izračunaj plan</button>
          <button className="btn outline" onClick={() => window.open('/plans', '_blank')} aria-label="View subscription models">Pretplatnički modeli</button>
        </div>
      </div>
      <nav className="red-nav" id="morphNav" aria-label="Glas Otoka - traka" ref={navRef}>Glas Otoka</nav>
    </section>
  );
}

    