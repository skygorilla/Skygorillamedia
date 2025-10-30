"use client";

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);

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
      // This logic is based on simple-morph.html
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
    
    // Initial calculation and setup
    init();
    
    const timeoutId = setTimeout(init, 100);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', init);
    
    // Slider functionality
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    let slideInterval: NodeJS.Timeout;

    if (slides.length > 0) {
        slides[0].classList.add('active');
        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        slideInterval = setInterval(nextSlide, 4000);
    }


    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', init);
      clearTimeout(timeoutId);
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    };
  }, []);

  return (
    <section className="hero" id="hero" aria-label="Hero" ref={heroRef}>
      <div className="slider">
        <div className="slide active" style={{backgroundImage: "url('https://i.ibb.co/YdhgMmM/1067-1.jpg')"}}></div>
        <div className="slide" style={{backgroundImage: "url('https://i.ibb.co/wz2yQvV/1067-2.jpg')"}}></div>
        <div className="slide" style={{backgroundImage: "url('https://i.ibb.co/ckYc82Y/1067-3.jpg')"}}></div>
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
