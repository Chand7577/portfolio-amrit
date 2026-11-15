'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const { theme, toggleThemeWithRipple } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-9 h-9 sm:w-10 sm:h-10 text-sm',
    lg: 'w-11 h-11 text-base',
  }[size];

  if (!mounted) {
    return (
      <div
        className={`rounded-full border border-white/10 bg-white/5 ${sizeClasses} ${className} opacity-0`}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleThemeWithRipple}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative rounded-full flex items-center justify-center transition-all duration-300 group select-none active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
        isDark
          ? 'bg-[#0a0a0a]/90 text-amber-200 border border-white/10 hover:border-white/25 hover:bg-[#151515] hover:shadow-[0_0_16px_rgba(255,255,255,0.08)]'
          : 'bg-white/90 text-amber-500 border border-black/10 hover:border-black/25 hover:bg-neutral-50 hover:shadow-[0_0_16px_rgba(0,0,0,0.08)]'
      } ${sizeClasses} ${className}`}
    >
      {/* Background ambient ring */}
      <span
        className={`absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
          isDark ? 'bg-amber-400/5' : 'bg-amber-400/10'
        }`}
      />

      {/* Moon Icon (Dark Mode Active) */}
      <div
        className={`absolute transition-all duration-500 transform ${
          isDark
            ? 'opacity-100 scale-100 rotate-0'
            : 'opacity-0 scale-50 rotate-90 pointer-events-none'
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-200 group-hover:text-amber-100 transition-colors"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="currentColor" fillOpacity="0.2" />
          <path d="M19 3v4" />
          <path d="M21 5h-4" />
        </svg>
      </div>

      {/* Sun Icon (Light Mode Active) */}
      <div
        className={`absolute transition-all duration-500 transform ${
          !isDark
            ? 'opacity-100 scale-100 rotate-0'
            : 'opacity-0 scale-50 -rotate-90 pointer-events-none'
        }`}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-amber-500 group-hover:text-amber-600 transition-colors"
        >
          <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.25" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      </div>
    </button>
  );
}
