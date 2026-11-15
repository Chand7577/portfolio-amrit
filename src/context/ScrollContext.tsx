'use client';

import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { scrollState } from '@/lib/scrollState';
import { CHAPTERS, getChapterAt } from '@/lib/chapters';

gsap.registerPlugin(ScrollTrigger);

interface ScrollCtx {
  /** Normalized progress 0→1 across the whole page */
  progress: number;
  /** Active chapter index 0–5 */
  chapter: number;
  /** Progress within active chapter 0→1 */
  local: number;
  /** Lenis instance */
  lenis: Lenis | null;
  /** Jump directly to a chapter */
  scrollToChapter: (id: number) => void;
}

const Ctx = createContext<ScrollCtx>({
  progress: 0,
  chapter: 0,
  local: 0,
  lenis: null,
  scrollToChapter: () => {},
});

export function useScrollContext() {
  return useContext(Ctx);
}

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [state, setState] = useState<{
    progress: number;
    chapter: number;
    local: number;
    lenis: Lenis | null;
  }>({
    progress: 0,
    chapter: 0,
    local: 0,
    lenis: null,
  });

  const scrollToChapter = useCallback((id: number) => {
    const ch = CHAPTERS.find((c) => c.id === id);
    if (!ch || !lenisRef.current) return;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    lenisRef.current.scrollTo(ch.tStart * maxScroll, { duration: 1.5 });
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.8,
    });

    lenisRef.current = lenis;
    (window as any).__lenis = lenis;

    // Sync lenis with GSAP ticker
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    // Update scroll state on every lenis scroll
    lenis.on('scroll', ({ progress }: { progress: number }) => {
      const { chapter, local } = getChapterAt(progress);

      scrollState.progress = progress;
      scrollState.chapter = chapter.id;
      scrollState.local = local;

      setState((prev) =>
        prev.progress === progress
          ? prev
          : { progress, chapter: chapter.id, local, lenis }
      );
    });

    setState((s) => ({ ...s, lenis }));

    return () => {
      lenis.destroy();
      gsap.ticker.remove(ticker);
      delete (window as any).__lenis;
    };
  }, []);

  return (
    <Ctx.Provider value={{ ...state, scrollToChapter }}>
      {children}
    </Ctx.Provider>
  );
}
