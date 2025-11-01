
'use client';

import { forwardRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, LogOut, User as UserIcon, LogIn, UserPlus } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { Button } from '@/components/ui/button';

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
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  
  const isActiveRoute = (href: string) => pathname === href;

  const handleSignOut = () => {
    auth.signOut();
  };
  
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
          <div className="absolute right-16 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {!isUserLoading && (
              user ? (
                <div className="flex items-center gap-2">
                  <span className="text-white text-sm hidden md:block">{user.email}</span>
                  <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign out">
                    <LogOut className="h-4 w-4 text-white" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/login">
                      <LogIn className="h-4 w-4 mr-1"/>
                      Prijava
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/signup">
                      <UserPlus className="h-4 w-4 mr-1"/>
                      Registracija
                    </Link>
                  </Button>
                </div>
              )
            )}
            <Link href="/site-map" className="settings-gear" aria-label="Site map">
              <Settings className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
});

Header.displayName = 'Header';

export default Header;
