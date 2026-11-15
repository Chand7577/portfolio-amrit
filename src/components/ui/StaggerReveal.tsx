'use client';
import { ReactNode, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  childSelector?: string;
}

export default function StaggerReveal({
  children,
  className = '',
  stagger = 0.12,
  childSelector = ':scope > *',
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const items = container.querySelectorAll(childSelector);
    
    gsap.set(items, { y: 40, opacity: 0 });
    
    gsap.to(items, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        once: true,
      },
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === container) st.kill();
      });
    };
  }, [stagger, childSelector]);
  
  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
