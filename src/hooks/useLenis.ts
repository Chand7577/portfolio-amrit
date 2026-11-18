'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      // Slightly faster duration for snappier feel — 1.0 reduces the
      // "momentum overshoot" that makes section boundaries feel jerky
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      // Lower multiplier = less scroll distance per wheel tick = less overshoot
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    // Sync lenis scroll events → ScrollTrigger so pinned sections track correctly
    lenis.on('scroll', ScrollTrigger.update);

    // Drive lenis via GSAP ticker — both share one rAF loop, no double frames
    // GSAP ticker time is in SECONDS; lenis.raf() expects MILLISECONDS
    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);

    // Keep lag smoothing ON (default 500ms cap) so dropped frames don't cause
    // a sudden lurch — removing lagSmoothing(0) fixes the jerk on tab focus
    // and when the browser resumes after a background pause
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCb);
      delete (window as any).__lenis;
    };
  }, []);

  return lenisRef;
}
