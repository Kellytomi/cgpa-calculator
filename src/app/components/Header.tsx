'use client';

import { useEffect } from 'react';

interface HeaderProps {
  onShowGradeInfo: () => void;
}

export function Header({ onShowGradeInfo }: HeaderProps) {
  useEffect(() => {
    // Check for system preference and apply it automatically
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle('dark', e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                CGPA Calculator
              </h1>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                Nigerian University Grade System
              </p>
            </div>
          </div>

          {/* Grade System Button - Always Visible */}
          <button
            onClick={onShowGradeInfo}
            className="px-3 sm:px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-1 sm:space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Grade System</span>
          </button>
        </div>
      </div>
    </header>
  );
} 