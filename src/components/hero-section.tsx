"use client";

import { RefObject, useEffect, useState } from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  navRef: RefObject<HTMLElement>;
  heroRef: RefObject<HTMLElement>;
}

const korculaImages = [
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&h=1080&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=1920&h=1080&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop&crop=center'
];

export default function HeroSection({ navRef, heroRef }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      if (korculaImages.length === 0) return;
      
      const interval = setInterval(() => {
        try {
          setCurrentSlide(prev => (prev + 1) % korculaImages.length);
        } catch (error) {
          console.error('Slide transition error:', error);
        }
      }, 5000);
      
      return () => {
        try {
          clearInterval(interval);
        } catch (error) {
          console.error('Interval cleanup error:', error);
        }
      };
    } catch (error) {
      console.error('Hero slider initialization error:', error);
      return;
    }
  }, [korculaImages.length]);

  return (
    <section 
      className="hero" 
      id="hero" 
      aria-label="Hero" 
      ref={heroRef}
    >
      <div className="slider">
        {korculaImages.map((src, index) => (
          <div 
            key={src}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ 
              backgroundImage: imageErrors.has(index) ? 'none' : `url(${src})`,
              backgroundColor: imageErrors.has(index) ? '#1a1a1a' : 'transparent'
            }}
            onError={() => {
              try {
                setImageErrors(prev => new Set(prev).add(index));
              } catch (error) {
                console.error('Image error handler failed:', error);
              }
            }}
          />
        ))}
      </div>
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

    