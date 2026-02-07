'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ToolCard from './ToolCard';
import Pagination from './Pagination';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  logoUrl: string | null;
  screenshotUrl: string | null;
  views: number;
  createdAt: Date;
}

interface ToolGridProps {
  tools: Tool[];
  categories: Category[];
  total: number;
  totalPages: number;
  currentPage: number;
  currentCategory: string;
  currentSearch: string;
  currentSort: string;
}

export default function ToolGrid({
  tools,
  categories,
  total,
  totalPages,
  currentPage,
  currentCategory,
  currentSearch,
  currentSort,
}: ToolGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(currentSearch);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput.trim()) {
      params.set('search', searchInput.trim());
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    
    router.push(`/?${params.toString()}`);
    setTimeout(() => setIsSearching(false), 500);
  };

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    router.push(`/?${params.toString()}`);
  };

  const currentCategoryName = categories.find(c => c.id === currentCategory)?.name || 'All Tools';

  return (
    <div>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display font-bold text-3xl text-slate-900 mb-2">
              {currentCategory === 'all' ? 'All AI Tools' : currentCategoryName}
            </h1>
            <p className="text-slate-500">
              Discover {total} amazing AI tools for your workflow
            </p>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative w-full md:w-96">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search AI tools..."
              className="input-field pl-12"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {isSearching && (
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-500 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
          </form>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Sort by:</span>
            <select
              value={currentSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="text-sm border border-slate-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      {tools.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                currentCategory={currentCategory}
                currentSearch={currentSearch}
                currentSort={currentSort}
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="font-display font-semibold text-xl text-slate-900 mb-2">
            No tools found
          </h3>
          <p className="text-slate-500 mb-6">
            {currentSearch
              ? `No results for "${currentSearch}". Try a different search term.`
              : 'No tools in this category yet.'}
          </p>
          <button
            onClick={() => router.push('/')}
            className="btn-secondary"
          >
            View All Tools
          </button>
        </div>
      )}
    </div>
  );
}
