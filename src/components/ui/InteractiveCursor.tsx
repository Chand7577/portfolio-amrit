'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap-setup';

export default function InteractiveCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor on fine-pointer devices (desktop mouse)
    if (typeof window === 'undefined') return;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer) return;

    setIsVisible(true);

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power2.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        setLabel(type ? type.charAt(0).toUpperCase() + type.slice(1) : '');
      } else {
        setLabel('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150"
      style={{ willChange: 'transform' }}
    >
      <div className={`rounded-full transition-all duration-150 flex items-center justify-center ${
        label
          ? 'px-2.5 py-1 bg-brand text-white text-[11px] font-mono font-medium shadow-md'
          : 'w-2.5 h-2.5 bg-brand/80'
      }`}>
        {label}
      </div>
    </div>
  );
}
