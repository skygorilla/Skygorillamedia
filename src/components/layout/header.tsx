
'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Uvod', description: 'Homepage' },
  { href: '/pretplate', label: 'Pretplate', description: 'Subscriptions' },
  { href: '/politika', label: 'Politika', description: 'Politics' },
  { href: '/pitch', label: 'Glas Otoka', description: 'Voice of the Island' },
  { href: '/kultura', label: 'Kultura', description: 'Culture' },
  { href: '/sport', label: 'Sport', description: 'Sports' },
  { href: '/kontakt', label: 'Kontakt', description: 'Contact' },
];

interface HeaderProps {}

const Header = forwardRef<HTMLElement, HeaderProps>((props, ref) => {
  const pathname = usePathname();
  
  const isActiveRoute = (href: string) => pathname === href;
  

  
  return (
    <>
      <header className="network-header" id="topHeader" ref={ref}>
        <div className="container">
          <nav aria-label="Main navigation">
            <ul className="menu" role="menubar">
              {navItems.map((item) => (
                <li key={item.label} role="none">
                  <Link
                    href={item.href}
                    role="menuitem"
                    aria-current={isActiveRoute(item.href) ? 'page' : undefined}
                    className={isActiveRoute(item.href) ? 'active' : ''}
                    tabIndex={0}
                  >
                    {item.label}
                    {isActiveRoute(item.href) && (
                      <span className="sr-only"> (current page)</span>
                    )}
                  </Link>
                </li>
              ))}
              <li role="none">
                <Link
                  href="/site-map"
                  role="menuitem"
                  className={isActiveRoute('/site-map') ? 'active' : ''}
                  tabIndex={0}
                >
                  <Settings className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
});

Header.displayName = 'Header';

export default Header;

    