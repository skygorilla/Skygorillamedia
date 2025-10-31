'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routeLabels: Record<string, string> = {
  '/': 'Uvod',
  '/pitch': 'Glas Otoka',
  '/pretplate': 'Pretplate',
  '/politika': 'Politika',
  '/kultura': 'Kultura',
  '/sport': 'Sport',
  '/kontakt': 'Kontakt',
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  
  if (pathname === '/') return null;

  return (
    <nav aria-label="Breadcrumb" className="sg-breadcrumbs">
      <ol className="sg-breadcrumbs__list">
        <li className="sg-breadcrumbs__item">
          <Link href="/" className="sg-breadcrumbs__link">
            Uvod
          </Link>
        </li>
        {segments.map((segment, index) => {
          const path = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;
          
          return (
            <li key={path} className="sg-breadcrumbs__item">
              <span className="sg-breadcrumbs__separator" aria-hidden="true">/</span>
              {isLast ? (
                <span className="sg-breadcrumbs__current" aria-current="page">
                  {routeLabels[path] || segment}
                </span>
              ) : (
                <Link href={path} className="sg-breadcrumbs__link">
                  {routeLabels[path] || segment}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}