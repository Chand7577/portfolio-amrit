'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap, ScrollTrigger, ScrollSmoother } from '@/lib/gsap-setup';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);

  useEffect(() => {
    if (!wrapperRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      smootherRef.current = ScrollSmoother.create({
        wrapper: wrapperRef.current!,
        content: contentRef.current!,
        smooth: 1.5,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true,
      });
    });

    // Refresh after fonts & images load
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', handleLoad);
    // Also refresh after a short delay for lazy content
    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 1500);

    return () => {
      ctx.revert();
      window.removeEventListener('load', handleLoad);
      clearTimeout(refreshTimeout);
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
