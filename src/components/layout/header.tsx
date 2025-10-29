import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Home, CreditCard, Landmark, Palette, Trophy, Mail } from 'lucide-react';

const navItems = [
  { href: '#', label: 'Uvod', hoverClass: 'hover:bg-[hsl(var(--uvod))]', icon: Home },
  { href: '#', label: 'Pretplate', hoverClass: 'hover:bg-[hsl(var(--pretplate))]', icon: CreditCard },
  { href: '#', label: 'Politika', hoverClass: 'hover:bg-[hsl(var(--politika))]', icon: Landmark },
  { href: '#glasotoka', label: 'Glas Otoka', active: true, icon: null },
  { href: '#', label: 'Kultura', hoverClass: 'hover:bg-[hsl(var(--kultura))]', icon: Palette },
  { href: '#', label: 'Sport', hoverClass: 'hover:bg-[hsl(var(--sport))]', icon: Trophy },
  { href: '#', label: 'Kontakt', hoverClass: 'hover:bg-[hsl(var(--kontakt))]', icon: Mail },
];

export default function Header() {
  return (
    <header className="bg-secondary shadow-[0_0_1px_1px_rgba(0,0,0,.5),0_1px_5px_0_rgba(0,0,0,.35),inset_0_-1px_0_0_rgba(0,0,0,.15),inset_0_1px_0_0_hsla(0,0%,100%,.1)] fixed top-0 left-1/2 -translate-x-1/2 w-full text-center z-[100] h-[var(--header-h)]">
      <div className="max-w-[1200px] h-full mx-auto flex items-center justify-center px-4">
        <nav aria-label="Glavna navigacija">
          <ul className="list-none flex justify-center items-center gap-2.5 m-0 h-full font-menu">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={item.active ? 'page' : undefined}
                  className={cn(
                    'flex items-center justify-center text-foreground text-[11px] font-bold tracking-[.5px] no-underline uppercase [text-shadow:0_1px_1px_rgba(0,0,0,.75)] transition-all duration-200 ease-in-out px-3 rounded',
                    item.active
                      ? 'bg-primary text-primary-foreground font-bold h-[var(--header-h)] leading-[var(--header-h)] m-0 rounded-none'
                      : 'h-[calc(var(--header-h)-10px)] leading-[calc(var(--header-h)-10px)] my-[5px] bg-secondary',
                    item.hoverClass,
                    item.hoverClass && "hover:text-primary-foreground"
                  )}
                >
                  {item.icon && <item.icon className="w-3.5 h-3.5 mr-1.5 shrink-0" />}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
