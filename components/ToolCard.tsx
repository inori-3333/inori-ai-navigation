'use client';

import { useState } from 'react';
import { getDomainFromUrl } from '@/lib/tools';

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

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const domain = getDomainFromUrl(tool.url);

  const handleClick = async () => {
    // Increment views via API
    try {
      await fetch(`/api/tools/${tool.id}/view`, { method: 'POST' });
    } catch (error) {
      console.error('Failed to track view:', error);
    }
  };

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="card block p-4 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          {tool.logoUrl && !imgError ? (
            <img
              src={tool.logoUrl}
              alt={`${tool.name} logo`}
              className="w-14 h-14 rounded-xl object-cover bg-slate-100 border border-slate-200 group-hover:border-primary-200 transition-colors"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-600">
                {tool.name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-display font-semibold text-lg text-slate-900 group-hover:text-primary-600 transition-colors truncate">
              {tool.name}
            </h3>
            <span className="category-badge flex-shrink-0">
              {tool.category}
            </span>
          </div>
          <p className="text-sm text-slate-500 line-clamp-2 mb-3">
            {tool.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            <span>{tool.views.toLocaleString()} views</span>
            <span className="text-slate-300">•</span>
            <span className="truncate">{domain}</span>
          </div>
        </div>
      </div>

      {/* Screenshot Preview on Hover */}
      {tool.screenshotUrl && (
        <div
          className="absolute inset-x-4 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
          style={{ transform: isHovered ? 'translateY(0)' : 'translateY(10px)' }}
        >
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden">
            <img
              src={tool.screenshotUrl}
              alt={`${tool.name} preview`}
              className="w-full h-32 object-cover"
            />
          </div>
        </div>
      )}
    </a>
  );
}
