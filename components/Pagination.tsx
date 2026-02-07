'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  currentCategory: string;
  currentSearch: string;
  currentSort: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  currentCategory,
  currentSearch,
  currentSort,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `/?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      router.push(createPageUrl(page));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border transition-colors ${
          currentPage === 1
            ? 'border-slate-200 text-slate-300 cursor-not-allowed'
            : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) =>
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`w-10 h-10 rounded-lg font-medium transition-colors ${
              page === currentPage
                ? 'bg-primary-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2 text-slate-400">
            {page}
          </span>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border transition-colors ${
          currentPage === totalPages
            ? 'border-slate-200 text-slate-300 cursor-not-allowed'
            : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </button>
    </nav>
  );
}
