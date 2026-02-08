'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/lib/categories';
import { Suspense } from 'react';

function SidebarContent() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  return (
    <nav className="space-y-1">
      {CATEGORIES.map((category) => {
        const isActive = currentCategory === category.id;
        
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
  );
}

export default function Sidebar() {
  return (
    <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 lg:w-64 xl:w-72 bg-white border-r border-slate-200 overflow-y-auto hidden lg:block shrink-0 z-30">
      <div className="p-4 relative min-h-full pb-20">
        <Suspense fallback={<div className="animate-pulse space-y-2">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-10 bg-slate-100 rounded-lg"></div>
          ))}
        </div>}>
          <SidebarContent />
        </Suspense>

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
