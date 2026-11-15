'use client';

import React, { useEffect, useState } from 'react';

export interface BlurTextWord {
  text: string;
  italic?: boolean;
}

interface BlurTextProps {
  words: BlurTextWord[];
  delay?: number; // delay between words in ms
  initialDelay?: number; // start delay in ms
  className?: string;
}

export default function BlurText({
  words,
  delay = 70,
  initialDelay = 100,
  className = '',
}: BlurTextProps) {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(media.matches);

    // Stagger on mount
    const timer = setTimeout(() => {
      setMounted(true);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [initialDelay]);

  return (
    <span className={`inline-block ${className}`}>
      {words.map((item, index) => {
        const isVisible = mounted || reducedMotion;
        const transitionDelay = reducedMotion ? '0ms' : `${index * delay}ms`;

        return (
          <span
            key={index}
            className={`inline-block mr-[0.24em] last:mr-0 transition-all duration-700 ease-out ${
              item.italic ? 'italic' : ''
            }`}
            style={{
              transitionDelay,
              filter: isVisible ? 'blur(0px)' : 'blur(12px)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
              willChange: 'filter, opacity, transform',
            }}
          >
            {item.text}
          </span>
        );
      })}
    </span>
  );
}
