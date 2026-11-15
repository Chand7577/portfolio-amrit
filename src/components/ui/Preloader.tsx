'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap-setup';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Wipe out
          gsap.to(containerRef.current, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.8,
            ease: 'expo.inOut',
            onComplete,
          });
        },
      });

      // Counter animation
      tl.to({ val: 0 }, {
        val: 100,
        duration: 2,
        ease: 'power2.inOut',
        onUpdate: function () {
          setCount(Math.round(this.targets()[0].val));
        },
      });

      // Tagline reveal
      tl.fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        0.4
      );

      // Fade out tagline near end
      tl.to(taglineRef.current, { opacity: 0, y: -10, duration: 0.3 }, 1.8);
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-brand flex flex-col items-center justify-center gap-6"
      style={{ clipPath: 'inset(0 0 0 0)' }}
    >
      {/* Counter */}
      <div className="font-heading font-extrabold text-white text-7xl sm:text-9xl tracking-tighter tabular-nums">
        <span ref={counterRef}>{count}</span>
        <span className="text-white/40">%</span>
      </div>

      {/* Tagline */}
      <div ref={taglineRef} className="text-white/80 font-hand text-xl sm:text-2xl opacity-0">
        To ship, or not to ship...
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-white/50 font-mono text-xs">
        <span>AMRIT CHAND</span>
        <span>PORTFOLIO 2026</span>
      </div>
    </div>
  );
}
