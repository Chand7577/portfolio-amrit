'use client';

/**
 * ShatterText – GSAP shatter-in + per-letter fluid spotlight clipped strictly to glyph shape.
 *
 * Technique:
 *   - Each letter has a base dim glyph and an overlaid pure-white glowing glyph.
 *   - The glowing glyph is clipped with CSS `clipPath: inset(top 0 0 0)`.
 *   - On hover, GSAP animates `clipPath: inset(0% 0 0 0)` so white light rises
 *     fluidly from the bottom of the letter to the top, inside the glyph itself.
 *   - On mouseleave, it recedes back to `inset(100% 0 0 0)`.
 *   - Shatter-in plays on initial mount and re-plays whenever scrolled into view.
 */

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';

// ─── Individual Letter with Fluid Glyph Spotlight ───────────────────────────
interface LetterProps {
  char: string;
  prefersReduced: boolean;
}

function Letter({ char, prefersReduced }: LetterProps) {
  const litRef = useRef<HTMLSpanElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const onEnter = useCallback(() => {
    if (prefersReduced || !litRef.current) return;
    tweenRef.current?.kill();

    // Liquid rises from bottom to top: top inset goes from 100% to 0%
    tweenRef.current = gsap.to(litRef.current, {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      duration: 0.65,
      ease: 'power2.out',
    });
  }, [prefersReduced]);

  const onLeave = useCallback(() => {
    if (prefersReduced || !litRef.current) return;
    tweenRef.current?.kill();

    // Drains back down to bottom: top inset goes back to 100%
    tweenRef.current = gsap.to(litRef.current, {
      clipPath: 'inset(100% 0% 0% 0%)',
      opacity: 0,
      duration: 0.45,
      ease: 'power2.in',
    });
  }, [prefersReduced]);

  if (char === ' ') {
    return <span className="inline-block" style={{ width: '0.25em' }} />;
  }

  return (
    <span
      data-letter
      aria-hidden="true"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative inline-block will-change-transform cursor-pointer select-none"
    >
      {/* 1. Base dim glyph (resting state) */}
      <span className="text-white/[0.08] block transition-colors duration-200">
        {char}
      </span>

      {/* 2. Fluid white spotlight glyph (clipped from bottom to top) */}
      <span
        ref={litRef}
        className="absolute inset-0 text-white block pointer-events-none drop-shadow-[0_0_24px_rgba(255,255,255,0.7)]"
        style={{
          clipPath: 'inset(100% 0% 0% 0%)',
          opacity: 0,
          willChange: 'clip-path, opacity',
        }}
      >
        {char}
      </span>
    </span>
  );
}

// ─── Main ShatterText Component ─────────────────────────────────────────────
interface ShatterTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export default function ShatterText({
  text,
  className = '',
  style = {},
  delay = 0.2,
}: ShatterTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [prefersReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const playShatter = useCallback(() => {
    if (prefersReduced) return;
    const letters = containerRef.current?.querySelectorAll<HTMLSpanElement>('[data-letter]');
    if (!letters || letters.length === 0) return;

    tlRef.current?.kill();

    // Reset letters to broken / scattered positions
    gsap.set(letters, {
      opacity: 0,
      y: () => gsap.utils.random(-120, -40),
      x: () => gsap.utils.random(-80, 80),
      rotation: () => gsap.utils.random(-45, 45),
      scale: () => gsap.utils.random(0.3, 0.7),
      filter: 'blur(8px)',
    });

    const tl = gsap.timeline({ delay });

    // Phase 1: Shattered fragments assemble into place
    tl.to(letters, {
      opacity: 1,
      y: 0,
      x: 0,
      rotation: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.1,
      stagger: { each: 0.08, from: 'random' },
      ease: 'back.out(1.5)',
    });

    // Phase 2: Micro settle bounce
    tl.to(
      letters,
      {
        y: () => gsap.utils.random(-3, 3),
        duration: 0.3,
        stagger: { each: 0.04, from: 'random' },
        ease: 'sine.inOut',
        yoyo: true,
        repeat: 1,
      },
      '-=0.2'
    );

    tlRef.current = tl;
  }, [delay, prefersReduced]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (prefersReduced) {
      const letters = el.querySelectorAll<HTMLSpanElement>('[data-letter]');
      gsap.set(letters, { opacity: 1, y: 0, x: 0, rotation: 0, scale: 1, filter: 'blur(0px)' });
      return;
    }

    // Play once on load
    playShatter();

    // Replay whenever user scrolls into the footer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            playShatter();
          }
        });
      },
      { threshold: 0.05 } // Triggers as soon as top 5% of the element enters
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [playShatter, prefersReduced]);

  return (
    <div
      ref={containerRef}
      className={`inline-flex items-center justify-center ${className}`}
      style={style}
      aria-label={text}
    >
      {text.split('').map((char, i) => (
        <Letter key={i} char={char} prefersReduced={prefersReduced} />
      ))}
    </div>
  );
}
