"use client";

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const heroImages = PlaceHolderImages.filter(img => img.id.startsWith('hero-'));

export default function HeroSection() {
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const nav = navRef.current;
    const hero = heroRef.current;
    const header = document.getElementById('topHeader');

    if (!nav || !hero || !header) {
      return;
    }

    const HYSTERESIS = 24;
    let triggerY = 0;
    let isMorphed = false;
    let ticking = false;

    function computeTriggerY() {
      return hero!.offsetTop + hero!.offsetHeight - nav!.offsetHeight - header!.offsetHeight;
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
    
    init();
    
    const timeoutId = setTimeout(init, 100);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', init);
    
    const slideInterval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 4000);


    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', init);
      clearTimeout(timeoutId);
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <section className="hero" id="hero" aria-label="Hero" ref={heroRef}>
      <div className="slider">
        {heroImages.map((image, index) => (
            <div key={image.id} className={`slide ${index === currentSlide ? 'active' : ''}`}>
                <Image
                    src={image.imageUrl}
                    alt={image.description}
                    fill
                    priority={index === 0}
                    style={{ objectFit: 'cover' }}
                    data-ai-hint={image.imageHint}
                />
            </div>
        ))}
      </div>
      <div className="overlay" aria-hidden="true"></div>
      <div className="hero-content">
        <span className="pill">Glas Otoka — platforma</span>
        <h1 className="hero-title">Centralizirani lokalni kanal</h1>
        <p className="hero-subtitle">Strateški i operativni model za kontinuitet lokalnih priča, događaja i streamova Korčule, Mljeta, Lastova i Pelješca.</p>
        <div className="hero-buttons">
          <button className="btn primary">Izračunaj plan</button>
          <button className="btn outline">Pretplatnički modeli</button>
          <button className="btn outline">Spremi kao PDF</button>
          <button className="btn outline">Podijeli</button>
        </div>
      </div>
      <nav className="red-nav" id="morphNav" aria-label="Glas Otoka - traka" ref={navRef}>RED NAV</nav>
    </section>
  );
}
