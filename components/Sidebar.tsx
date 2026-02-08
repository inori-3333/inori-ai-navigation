'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CATEGORIES } from '@/lib/categories';
import { Suspense, useEffect } from 'react';
import { useMobileMenu } from '@/lib/contexts';
import { cn } from '@/lib/utils';

function SidebarContent() {
  const searchParams = useSearchParams();
  const { close } = useMobileMenu();
  const currentCategory = searchParams.get('category');
  const activeId = currentCategory || 'all';

  return (
    <nav className="space-y-1">
      {CATEGORIES.map((category) => {
        const isActive = activeId === category.id;
        
        return (
          <Link
            key={category.id}
            href={category.id === 'all' ? '/' : `/?category=${category.id}`}
            onClick={close}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-primary-50 text-primary-700 shadow-sm border-r-4 border-primary-600"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-r-4 border-transparent"
            )}
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
  const { isOpen, close } = useMobileMenu();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={close}
        />
      )}

      <aside className={cn(
        "fixed left-0 top-16 bottom-0 w-64 xl:w-72 bg-white border-r border-slate-200 overflow-y-auto z-40 shadow-sm transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
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
              © {new Date().getFullYear()} InoriのAI Navigation
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
