'use client';

import { useRef } from 'react';
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
  const headerRef = useRef<HTMLElement>(null);

  return (
    <>
      <header className="network-header" id="topHeader" ref={headerRef}>
        <div className="container">
          <nav aria-label="Glavna navigacija">
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
    </>
  );
}
