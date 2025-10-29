"use client";

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const nav = navRef.current;
    const hero = heroRef.current;
    const header = document.querySelector('.network-header') as HTMLElement;

    console.log('Elements found:', { nav: !!nav, hero: !!hero, header: !!header });
    if (!nav || !hero || !header) {
      console.error('Missing elements:', { nav, hero, header });
      return;
    }
    
    const HYSTERESIS = 24; // px

    let triggerY = 0;
    let isMorphed = false;
    let ticking = false;

    function computeTriggerY() {
      const heroTop = hero!.offsetTop;
      const triggerPoint = heroTop + hero!.offsetHeight - nav!.offsetHeight - header!.offsetHeight;
      console.log('Hero top:', heroTop, 'Hero height:', hero!.offsetHeight, 'Nav height:', nav!.offsetHeight, 'Header height:', header!.offsetHeight, 'Trigger Y:', triggerPoint);
      return triggerPoint;
    }

    function recalc() {
      triggerY = computeTriggerY();
      updateOnScroll();
    }

    function updateOnScroll() {
      const y = window.pageYOffset || document.documentElement.scrollTop;
      console.log('Scroll:', y, 'Trigger:', triggerY);
      
      if (!isMorphed && y >= triggerY) {
        console.log('MORPHING at scroll:', y);
        nav!.classList.add('morph');
        isMorphed = true;
      } else if (isMorphed && y <= triggerY - HYSTERESIS) {
        console.log('UNMORPHING at scroll:', y);
        nav!.classList.remove('morph');
        isMorphed = false;
      }
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    }
    
    // Initial calculation and setup
    recalc();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', recalc);
    
    // Use a timeout to ensure all elements have been rendered and have their final dimensions
    const timeoutId = setTimeout(recalc, 100);

    // Slider functionality
    setTimeout(() => {
      const slides = document.querySelectorAll('.slide');
      let currentSlide = 0;
      
      function nextSlide() {
        if (slides.length > 0) {
          slides[currentSlide].classList.remove('active');
          currentSlide = (currentSlide + 1) % slides.length;
          slides[currentSlide].classList.add('active');
        }
      }
      
      const slideInterval = setInterval(nextSlide, 4000);
      
      return () => clearInterval(slideInterval);
    }, 500);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', recalc);
      clearTimeout(timeoutId);
      clearInterval(slideInterval);
    };
  }, []);

  return (
    <section className="hero" id="hero" aria-label="Hero" ref={heroRef}>
      <div className="slider">
        <div className="slide active" style={{backgroundImage: "url('https://i.ibb.co/11qd2Kj/DJI-0681.jpg')"}}></div>
        <div className="slide" style={{backgroundImage: "url('https://i.ibb.co/TqxL10rS/DJI-0270.jpg')"}}></div>
        <div className="slide" style={{backgroundImage: "url('https://i.ibb.co/w8KLGz8/DJI-0669.jpg')"}}></div>
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
