'use client';

import { useEffect, useRef, RefObject } from 'react';
import { gsap } from '@/lib/gsap-setup';

/**
 * Custom hook for GSAP context-safe animations
 * Automatically cleans up on unmount
 */
export function useGSAPContext(
  callback: (ctx: gsap.Context) => void | (() => void),
  dependencies: any[] = []
) {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    contextRef.current = gsap.context(() => {
      callback(contextRef.current!);
    });

    return () => {
      contextRef.current?.revert();
    };
  }, dependencies);

  return contextRef;
}

/**
 * Hook for reduced motion preference
 */
export function useReducedMotion() {
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mediaQuery.matches;

    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook for responsive GSAP animations
 * Returns different configs based on screen size
 */
export function useResponsiveGSAP<T>(
  mobileConfig: T,
  tabletConfig: T,
  desktopConfig: T
): RefObject<T> {
  const configRef = useRef<T>(desktopConfig);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(max-width: 640px)', () => {
      configRef.current = mobileConfig;
    });

    mm.add('(min-width: 641px) and (max-width: 1024px)', () => {
      configRef.current = tabletConfig;
    });

    mm.add('(min-width: 1025px)', () => {
      configRef.current = desktopConfig;
    });

    return () => mm.revert();
  }, [mobileConfig, tabletConfig, desktopConfig]);

  return configRef;
}
