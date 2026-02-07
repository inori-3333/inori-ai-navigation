'use client';

import { useState } from 'react';
import Link from 'next/link';
import SubmissionModal from './SubmissionModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300">
                <span className="text-white font-display font-bold text-lg">In</span>
              </div>
              <span className="font-display font-semibold text-xl text-slate-900">
                Inori<span className="text-primary-600">の</span>AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                Home
              </Link>
              <Link href="/?sort=newest" className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                Newest
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Submit Tool
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <nav className="flex flex-col gap-2">
                <Link href="/" className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">
                  Home
                </Link>
                <Link href="/?sort=newest" className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">
                  Newest
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="btn-primary w-full mt-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Submit Tool
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <SubmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
