
'use client';

import { forwardRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, X } from 'lucide-react';

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
  
  const [showDevTools, setShowDevTools] = useState(false);
  
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
            </ul>
          </nav>
          <button 
            className="settings-gear"
            onClick={() => setShowDevTools(!showDevTools)}
            aria-label="Toggle dev tools"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </header>
      
      {showDevTools && (
        <div className="dev-panel">
          <div className="dev-panel__header">
            <h3>Dev Tools & Sitemap</h3>
            <button onClick={() => setShowDevTools(false)} className="dev-panel__close">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="dev-panel__content">
            <div className="dev-panel__section">
              <h4>Pages</h4>
              <ul className="dev-panel__list">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="dev-panel__link">
                      {item.label} <span className="dev-panel__path">{item.href}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/devtools" className="dev-panel__link">
                    DevTools <span className="dev-panel__path">/devtools</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="dev-panel__section">
              <h4>Quick Actions</h4>
              <div className="dev-panel__actions">
                <Link href="/api/health" className="dev-panel__btn">Health Check</Link>
                <Link href="/sitemap.xml" className="dev-panel__btn">Sitemap XML</Link>
                <button onClick={() => window.location.reload()} className="dev-panel__btn">Reload</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

Header.displayName = 'Header';

export default Header;

    