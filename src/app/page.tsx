'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const navItems = [
  { href: '#', label: 'Uvod' },
  { href: '#', label: 'Pretplate' },
  { href: '#', label: 'Politika' },
  { href: '#glasotoka', label: 'Glas Otoka', active: true },
  { href: '#', label: 'Kultura' },
  { href: '#', label: 'Sport' },
  { href: '#', label: 'Kontakt' },
];

export default function Home() {
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const nav = navRef.current;
    const hero = heroRef.current;
    const header = headerRef.current;
    const root = document.documentElement;

    if (!nav || !hero || !header) return;
    
    const headerH = parseFloat(getComputedStyle(root).getPropertyValue('--header-h')) || 40;
    let hysteresis = 6;
    let morphRange = 220;

    let targetT = 0;
    let currentT = 0;
    let stuck = false;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const setMorphT = (t: number) => nav.style.setProperty('--morphT', t.toFixed(4));

    function measure() {
      const heroRect = hero!.getBoundingClientRect();
      const threshold = headerH + nav!.offsetHeight;
      const dist = threshold - heroRect.bottom;
      targetT = clamp01(dist / morphRange);
    }

    function applyStickyness() {
      const heroRect = hero!.getBoundingClientRect();
      if (!stuck && heroRect.bottom <= (headerH + nav!.offsetHeight)) {
        nav!.classList.add('morph');
        stuck = true;
        currentT = 1;
        setMorphT(currentT);
      } else if (stuck && heroRect.bottom > (headerH + nav!.offsetHeight + hysteresis)) {
        nav!.classList.remove('morph');
        stuck = false;
      }
    }

    function animate() {
      if (!stuck) {
        currentT += (targetT - currentT) * 0.15;
        setMorphT(currentT);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    function onScrollOrResize() {
      measure();
      applyStickyness();
    }
    
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    
    // Initial kick
    onScrollOrResize();
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <header className="network-header" ref={headerRef}>
        <div className="container">
          <nav className="primary" aria-label="Glavna navigacija">
            <ul className="menu">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={item.active ? 'page' : undefined}
                    className={item.active ? 'active' : ''}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="goHero" aria-label="Hero" ref={heroRef}>
          <div className="hero-overlay" aria-hidden="true"></div>
          <nav className="go-nav" id="goNav" aria-label="Glas Otoka - traka" ref={navRef}></nav>
        </section>

        <section className="spacer" aria-hidden="true"></section>
      </main>
    </>
  );
}
