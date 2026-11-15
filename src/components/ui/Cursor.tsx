'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      gsap.to(dot, { x: mx, y: my, duration: 0.08, ease: 'none' });
    };

    const loop = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      gsap.set(ring, { x: rx, y: ry });
      rafId = requestAnimationFrame(loop);
    };

    const onEnter = () => {
      gsap.to(ring, { scale: 2.5, opacity: 0.4, duration: 0.3, ease: 'power2.out' });
      gsap.to(dot, { scale: 0.4, duration: 0.3 });
    };
    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(dot, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMove);
    rafId = requestAnimationFrame(loop);

    // Attach to existing interactive elements
    const attachListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-grow]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    attachListeners();

    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99997] w-2 h-2 rounded-full bg-accent mix-blend-difference"
        style={{ transform: 'translate(-50%,-50%)' }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[99996] w-8 h-8 rounded-full border border-accent/60"
        style={{ transform: 'translate(-50%,-50%)' }}
      />
    </>
  );
}
