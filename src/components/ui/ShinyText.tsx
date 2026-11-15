'use client';

import React from 'react';

interface ShinyTextProps {
  text?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  speed?: number; // duration in seconds
  className?: string;
}

export default function ShinyText({
  text,
  children,
  disabled = false,
  speed = 4,
  className = '',
}: ShinyTextProps) {
  const content = text || children;

  return (
    <span
      className={`inline-block ${
        disabled
          ? 'text-[#aaadb0]'
          : 'bg-gradient-to-r from-[#aaadb0] via-[#ffffff] to-[#aaadb0] bg-[length:200%_100%] bg-clip-text text-transparent animate-shine motion-reduce:animate-none motion-reduce:text-[#aaadb0]'
      } ${className}`}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {content}
    </span>
  );
}
