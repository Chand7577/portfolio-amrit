'use client';

import React from 'react';

interface StarBorderProps {
  as?: 'a' | 'button';
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  speed?: string;
}

export default function StarBorder({
  as = 'a',
  href,
  onClick,
  children,
  className = '',
  speed = '4s',
}: StarBorderProps) {
  const Component = as;

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-center justify-center p-[1.5px] rounded-lg overflow-hidden min-h-[44px] min-w-[44px] text-xs sm:text-sm font-semibold transition-all active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${className}`}
    >
      {/* Moving star border sheen (React Bits) */}
      <span
        className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] motion-reduce:animate-none opacity-80 group-hover:opacity-100 transition-opacity"
        style={{
          background:
            'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 270deg, #ffffff 360deg)',
          animationDuration: speed,
        }}
      />

      {/* Button Body / Inner Core */}
      <span className="relative z-10 w-full h-full min-h-[42px] px-6 py-2.5 rounded-[6.5px] bg-[#ffffff] text-[#030303] font-semibold flex items-center justify-center gap-2 transition-colors group-hover:bg-[#fdfdfd] shadow-[0_0_20px_rgba(255,255,255,0.18)]">
        {children}
      </span>
    </Component>
  );
}
