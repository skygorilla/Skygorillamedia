'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DevNav() {
  const pathname = usePathname();
  
  try {
    const isDevTools = pathname?.startsWith('/devtools') ?? false;
    
    if (!isDevTools) return null;
  } catch (error) {
    console.error('DevNav error:', error);
    return null;
  }
  
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-2 flex gap-2">
        <Link 
          href="/" 
          className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 transition-colors"
        >
          🏠 Home
        </Link>
        <Link 
          href="/devtools" 
          className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors"
        >
          🛠️ Tools
        </Link>
        <Link 
          href="/pitch" 
          className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors"
        >
          🎯 Pitch
        </Link>
      </div>
    </div>
  );
}