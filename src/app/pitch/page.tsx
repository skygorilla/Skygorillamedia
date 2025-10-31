
'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Header from '@/components/layout/header';

const Calculator = dynamic(() => import('@/components/calculator'), { ssr: false });
const HeroSection = dynamic(() => import('@/components/hero-section'), { ssr: false });

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [showPopup, setShowPopup] = useState(false);

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
      <button 
        onClick={() => setShowPopup(true)}
        className="settings-gear"
        title="Settings"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/>
        </svg>
      </button>
      
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-fullscreen">
            <div className="popup-header">
              <h1>Glas Otoka</h1>
              <button onClick={() => setShowPopup(false)} className="close-btn">×</button>
            </div>
            <div className="popup-grid">
              <div className="page-card active">
                <div className="card-icon">📊</div>
                <h3>Pitch</h3>
                <p>Strategija, zajednice i rješenja</p>
                <span className="card-path">/pitch</span>
              </div>
            </div>
            <div className="popup-footer">
              <p>Trenutno aktivna: <strong>Pitch stranica</strong></p>
            </div>
          </div>
        </div>
      )}
      
      <main>
        <HeroSection heroRef={heroRef} navRef={navRef} />
        <Calculator />
        <div className="content"></div>
      </main>
    </>
  );
}

    