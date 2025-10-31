
'use client';

import { forwardRef } from 'react';
import Link from 'next/link';

const navItems = [
  { href: '#', label: 'Uvod' },
  { href: '#', label: 'Pretplate' },
  { href: '#', label: 'Politika' },
  { href: '#glasotoka', label: 'Glas Otoka', special: true },
  { href: '#', label: 'Kultura' },
  { href: '#', label: 'Sport' },
  { href: '#', label: 'Kontakt' },
];

const Header = forwardRef<HTMLElement>((props, ref) => {
  return (
    <header className="network-header" id="topHeader" ref={ref}>
      <div className="container">
        <nav aria-label="Glavna navigacija">
          <ul className="menu">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={item.special ? 'page' : undefined}
                  className={item.special ? 'active' : ''}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;

    