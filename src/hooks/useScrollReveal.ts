'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealType = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'clipReveal';

export function useScrollReveal<T extends HTMLElement>(
  type: RevealType = 'fadeUp',
  options?: { delay?: number; duration?: number; start?: string; once?: boolean }
) {
  const ref = useRef<T>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const delay = options?.delay ?? 0;
    const duration = options?.duration ?? 0.8;
    const start = options?.start ?? 'top 85%';
    const once = options?.once ?? true;
    
    const animations: Record<RevealType, gsap.TweenVars> = {
      fadeUp: { y: 50, opacity: 0 },
      fadeIn: { opacity: 0 },
      slideLeft: { x: -80, opacity: 0 },
      slideRight: { x: 80, opacity: 0 },
      scaleUp: { scale: 0.85, opacity: 0 },
      clipReveal: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
    };
    
    const targets: Record<RevealType, gsap.TweenVars> = {
      fadeUp: { y: 0, opacity: 1 },
      fadeIn: { opacity: 1 },
      slideLeft: { x: 0, opacity: 1 },
      slideRight: { x: 0, opacity: 1 },
      scaleUp: { scale: 1, opacity: 1 },
      clipReveal: { clipPath: 'inset(0% 0 0 0)', opacity: 1 },
    };
    
    gsap.set(el, animations[type]);
    
    gsap.to(el, {
      ...targets[type],
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        once,
      },
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [type, options?.delay, options?.duration, options?.start, options?.once]);
  
  return ref;
}
