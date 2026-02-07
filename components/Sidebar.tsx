'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CATEGORIES } from '@/lib/categories';

export default function Sidebar() {
  const pathname = usePathname();

  // Extract category from query params or pathname
  const getCurrentCategory = () => {
    const params = new URLSearchParams(pathname.split('?')[1]);
    return params.get('category') || 'all';
  };

  const currentCategory = getCurrentCategory();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 lg:w-64 xl:w-72 bg-white border-r border-slate-200 overflow-y-auto hidden lg:block z-40">
      <div className="p-4">
        <nav className="space-y-1">
          {CATEGORIES.map((category) => {
            const isActive = currentCategory === category.id || 
              (category.id === 'all' && !currentCategory);
            
            return (
              <Link
                key={category.id}
                href={category.id === 'all' ? '/' : `/?category=${category.id}`}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className={isActive ? 'font-semibold' : ''}>
                  {category.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
          <div className="text-xs text-slate-400 text-center">
            © 2024 InoriのAI Navigation
          </div>
        </div>
      </div>
    </aside>
  );
}
