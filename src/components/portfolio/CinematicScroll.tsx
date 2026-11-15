'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '@/data/portfolioData';
import { CINEMATIC_SHOTS } from '@/config/cinematicConfig';
import ParticleSelf from './ParticleSelf';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Curated projects for Section 5
const FEATURED_PROJECTS = PROJECTS.slice(0, 3);

// Core tech badges for Section 4
const CORE_TECH = [
  'React 19',
  'Next.js 16',
  'TypeScript',
  'Node.js',
  'GSAP',
  'Tailwind CSS',
  'MongoDB',
  'Supabase',
  'Google Gemini',
  'Groq LLMs',
  'Razorpay',
  'REST APIs',
];

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageViewportRef = useRef<HTMLDivElement>(null);

  // Directional Scrim refs
  const leftScrimRef = useRef<HTMLDivElement>(null);
  const rightScrimRef = useRef<HTMLDivElement>(null);

  // Giant Background Typography refs
  const bgText1Ref = useRef<HTMLDivElement>(null);
  const bgText2Ref = useRef<HTMLDivElement>(null);
  const bgText3Ref = useRef<HTMLDivElement>(null);
  const bgText4Ref = useRef<HTMLDivElement>(null);
  const bgText5Ref = useRef<HTMLDivElement>(null);

  // Hero Initial Overlays in Section 1 (Bottom-Left info + Bottom-Right scroll cue)
  const heroBottomLeftRef = useRef<HTMLDivElement>(null);
  const heroBottomRightRef = useRef<HTMLDivElement>(null);

  // 5 Narrative Content Card refs
  const content1Ref = useRef<HTMLDivElement>(null);
  const content2Ref = useRef<HTMLDivElement>(null);
  const content3Ref = useRef<HTMLDivElement>(null);
  const content4Ref = useRef<HTMLDivElement>(null);
  const content5Ref = useRef<HTMLDivElement>(null);

  // 5 Full-Bleed Image Layer refs
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const img3Ref = useRef<HTMLDivElement>(null);
  const img4Ref = useRef<HTMLDivElement>(null);
  const img5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const shots = CINEMATIC_SHOTS;

      // Initial Image Layer setup
      gsap.set(img1Ref.current, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        transformOrigin: `${shots[0].focalPoint.x} ${shots[0].focalPoint.y}`,
      });

      [img2Ref, img3Ref, img4Ref, img5Ref].forEach((ref, idx) => {
        const shot = shots[idx + 1];
        gsap.set(ref.current, {
          opacity: 0,
          scale: 1,
          x: 0,
          y: 0,
          transformOrigin: `${shot.focalPoint.x} ${shot.focalPoint.y}`,
        });
      });

      // Initial Scrim State: Completely transparent on load so the 3D particles & hero portrait shine
      gsap.set(leftScrimRef.current, { opacity: 0 });
      gsap.set(rightScrimRef.current, { opacity: 0 });

      // Initial Hero text & giant background text are VISIBLE on load
      gsap.set([heroBottomLeftRef.current, heroBottomRightRef.current, bgText1Ref.current], {
        opacity: 1,
        y: 0,
      });

      // Other background texts start hidden
      gsap.set([bgText2Ref.current, bgText3Ref.current, bgText4Ref.current, bgText5Ref.current], {
        opacity: 0,
      });

      // Narrative cards start hidden
      gsap.set(
        [
          content1Ref.current,
          content2Ref.current,
          content3Ref.current,
          content4Ref.current,
          content5Ref.current,
        ],
        { opacity: 0 }
      );

      // ─────────────────────────────────────────────────────────────
      // DESKTOP: ONE MASTER TIMELINE (>= 768px)
      // Completely eliminates DOM unpin/pin jumps for 100% fluid 60fps/120fps motion
      // ─────────────────────────────────────────────────────────────
      mm.add('(min-width: 768px)', () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const getClampedShift = (scale: number, desiredVw: number) => {
          if (prefersReducedMotion) return 0;
          const maxPx = ((scale - 1) / 2) * window.innerWidth;
          const desiredPx = (desiredVw / 100) * window.innerWidth;
          return Math.max(-maxPx * 0.92, Math.min(maxPx * 0.92, desiredPx));
        };

        const shiftX1 = getClampedShift(shots[0].zoom, shots[0].panX);
        const shiftX2 = getClampedShift(shots[1].zoom, shots[1].panX);
        const shiftX3 = getClampedShift(shots[2].zoom, shots[2].panX);
        const shiftX4 = getClampedShift(shots[3].zoom, shots[3].panX);
        const shiftX5 = getClampedShift(shots[4].zoom, shots[4].panX);

        // Pre-position content cards
        gsap.set(content1Ref.current, { x: 60, opacity: 0 });
        gsap.set(content2Ref.current, { x: -60, opacity: 0 });
        gsap.set(content3Ref.current, { x: 60, opacity: 0 });
        gsap.set(content4Ref.current, { x: -60, opacity: 0 });
        gsap.set(content5Ref.current, { x: 60, opacity: 0 });

        // Total scroll distance: 5.2x viewport height for deliberate pacing
        const scrollDistance = window.innerHeight * 5.2;

        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: stageViewportRef.current,
            start: 'top top',
            end: `+=${scrollDistance}`,
            scrub: prefersReducedMotion ? 0.3 : 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // ═══════════════════════════════════════════════════════════
        // ACT 01: Hero (0.00 -> 0.20)
        // ═══════════════════════════════════════════════════════════
        // 0.00 -> 0.06: Initial push on hero portrait, bottom info fades
        masterTl.to(
          img1Ref.current,
          {
            scale: prefersReducedMotion ? 1 : 1.06,
            duration: 0.06,
            ease: 'none',
          },
          0
        );
        masterTl.to(
          bgText1Ref.current,
          {
            scale: prefersReducedMotion ? 1 : 1.04,
            opacity: 0.04,
            duration: 0.06,
            ease: 'none',
          },
          0
        );
        masterTl.to(
          [heroBottomLeftRef.current, heroBottomRightRef.current],
          {
            opacity: 0,
            y: 15,
            duration: 0.04,
            ease: 'power2.in',
          },
          0.05
        );

        // 0.06 -> 0.14: Camera pushes smoothly and pans left, right scrim deepens
        masterTl.to(
          img1Ref.current,
          {
            scale: prefersReducedMotion ? 1 : shots[0].zoom,
            x: shiftX1,
            duration: 0.08,
            ease: 'power1.inOut',
          },
          0.06
        );
        masterTl.to(
          rightScrimRef.current,
          {
            opacity: 0.85,
            duration: 0.08,
          },
          0.06
        );

        // 0.08 -> 0.16: Content 1 flows in from RIGHT
        masterTl.to(
          content1Ref.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.07,
            ease: 'power2.out',
          },
          0.08
        );

        // 0.16 -> 0.20: Content 1 fades out as we prepare for Act 2
        masterTl.to(
          content1Ref.current,
          {
            opacity: 0,
            x: 25,
            duration: 0.04,
            ease: 'power1.in',
          },
          0.16
        );
        masterTl.to(bgText1Ref.current, { opacity: 0, duration: 0.04 }, 0.16);

        // ═══════════════════════════════════════════════════════════
        // ACT 02: Enter Workspace (0.20 -> 0.40)
        // ═══════════════════════════════════════════════════════════
        // 0.20 -> 0.26: Crossfade from portrait to workspace (img-2), swap scrims to LEFT
        masterTl.to(img1Ref.current, { opacity: 0, duration: 0.06, ease: 'power1.inOut' }, 0.2);
        masterTl.to(
          img2Ref.current,
          {
            opacity: 1,
            scale: prefersReducedMotion ? 1 : shots[1].zoom,
            x: shiftX2,
            duration: 0.07,
            ease: 'power1.inOut',
          },
          0.2
        );
        masterTl.to(rightScrimRef.current, { opacity: 0, duration: 0.05 }, 0.2);
        masterTl.to(leftScrimRef.current, { opacity: 0.95, duration: 0.06 }, 0.21);
        masterTl.to(bgText2Ref.current, { opacity: 0.08, duration: 0.06 }, 0.21);

        // 0.26 -> 0.35: Content 2 flows in from LEFT
        masterTl.to(
          content2Ref.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.07,
            ease: 'power2.out',
          },
          0.26
        );

        // 0.35 -> 0.40: Content 2 fades out
        masterTl.to(
          content2Ref.current,
          {
            opacity: 0,
            x: -25,
            duration: 0.04,
            ease: 'power1.in',
          },
          0.35
        );
        masterTl.to(bgText2Ref.current, { opacity: 0, duration: 0.04 }, 0.35);

        // ═══════════════════════════════════════════════════════════
        // ACT 03: The Developer (0.40 -> 0.60)
        // ═══════════════════════════════════════════════════════════
        // 0.40 -> 0.46: Crossfade to side-angle (img-3), swap scrim to RIGHT
        masterTl.to(img2Ref.current, { opacity: 0, duration: 0.06, ease: 'power1.inOut' }, 0.4);
        masterTl.to(
          img3Ref.current,
          {
            opacity: 1,
            scale: prefersReducedMotion ? 1 : shots[2].zoom,
            x: shiftX3,
            duration: 0.07,
            ease: 'power1.inOut',
          },
          0.4
        );
        masterTl.to(leftScrimRef.current, { opacity: 0, duration: 0.05 }, 0.4);
        masterTl.to(rightScrimRef.current, { opacity: 0.95, duration: 0.06 }, 0.41);
        masterTl.to(bgText3Ref.current, { opacity: 0.08, duration: 0.06 }, 0.41);

        // 0.46 -> 0.55: Content 3 flows in from RIGHT
        masterTl.to(
          content3Ref.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.07,
            ease: 'power2.out',
          },
          0.46
        );

        // 0.55 -> 0.60: Content 3 fades out
        masterTl.to(
          content3Ref.current,
          {
            opacity: 0,
            x: 25,
            duration: 0.04,
            ease: 'power1.in',
          },
          0.55
        );
        masterTl.to(bgText3Ref.current, { opacity: 0, duration: 0.04 }, 0.55);

        // ═══════════════════════════════════════════════════════════
        // ACT 04: The Craft & Tech Stack (0.60 -> 0.80)
        // ═══════════════════════════════════════════════════════════
        // 0.60 -> 0.66: Crossfade to coding close-up (img-4), swap scrim to LEFT
        masterTl.to(img3Ref.current, { opacity: 0, duration: 0.06, ease: 'power1.inOut' }, 0.6);
        masterTl.to(
          img4Ref.current,
          {
            opacity: 1,
            scale: prefersReducedMotion ? 1 : shots[3].zoom,
            x: shiftX4,
            y: (shots[3].panY / 100) * window.innerHeight,
            duration: 0.07,
            ease: 'power1.inOut',
          },
          0.6
        );
        masterTl.to(rightScrimRef.current, { opacity: 0, duration: 0.05 }, 0.6);
        masterTl.to(leftScrimRef.current, { opacity: 0.95, duration: 0.06 }, 0.61);
        masterTl.to(bgText4Ref.current, { opacity: 0.08, duration: 0.06 }, 0.61);

        // 0.66 -> 0.75: Content 4 flows in from LEFT
        masterTl.to(
          content4Ref.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.07,
            ease: 'power2.out',
          },
          0.66
        );

        // 0.75 -> 0.80: Content 4 fades out
        masterTl.to(
          content4Ref.current,
          {
            opacity: 0,
            x: -25,
            duration: 0.04,
            ease: 'power1.in',
          },
          0.75
        );
        masterTl.to(bgText4Ref.current, { opacity: 0, duration: 0.04 }, 0.75);

        // ═══════════════════════════════════════════════════════════
        // ACT 05: Things I've Built (0.80 -> 1.00)
        // ═══════════════════════════════════════════════════════════
        // 0.80 -> 0.86: Crossfade to workspace overview (img-5), swap scrim to RIGHT
        masterTl.to(img4Ref.current, { opacity: 0, duration: 0.06, ease: 'power1.inOut' }, 0.8);
        masterTl.to(
          img5Ref.current,
          {
            opacity: 1,
            scale: prefersReducedMotion ? 1 : shots[4].zoom,
            x: shiftX5,
            duration: 0.07,
            ease: 'power1.inOut',
          },
          0.8
        );
        masterTl.to(leftScrimRef.current, { opacity: 0, duration: 0.05 }, 0.8);
        masterTl.to(rightScrimRef.current, { opacity: 0.95, duration: 0.06 }, 0.81);
        masterTl.to(bgText5Ref.current, { opacity: 0.08, duration: 0.06 }, 0.81);

        // 0.86 -> 0.95: Real Project Cards flow in from RIGHT
        masterTl.to(
          content5Ref.current,
          {
            opacity: 1,
            x: 0,
            duration: 0.08,
            ease: 'power2.out',
          },
          0.86
        );

        // 0.96 -> 1.00: Stage & cards fade out smoothly as container unpins into natural scroll
        masterTl.to(
          [stageViewportRef.current, content5Ref.current, bgText5Ref.current],
          {
            opacity: 0,
            duration: 0.04,
            ease: 'power1.inOut',
          },
          0.96
        );
      });

      // ─────────────────────────────────────────────────────────────
      // MOBILE: ONE MASTER TIMELINE (< 768px)
      // ─────────────────────────────────────────────────────────────
      mm.add('(max-width: 767px)', () => {
        const mobileDistance = window.innerHeight * 3.8;

        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: stageViewportRef.current,
            start: 'top top',
            end: `+=${mobileDistance}`,
            scrub: 0.6,
            anticipatePin: 1,
          },
        });

        // Act 1
        mobileTl.to([heroBottomLeftRef.current, heroBottomRightRef.current], { opacity: 0, y: 15, duration: 0.04 }, 0.05);
        mobileTl.to(img1Ref.current, { scale: 1.15, duration: 0.08 }, 0.06);
        mobileTl.to(content1Ref.current, { opacity: 1, y: 0, duration: 0.08 }, 0.08);
        mobileTl.to(content1Ref.current, { opacity: 0, duration: 0.04 }, 0.17);

        // Act 2
        mobileTl.to(img1Ref.current, { opacity: 0, duration: 0.05 }, 0.2);
        mobileTl.to(img2Ref.current, { opacity: 1, scale: 1.15, duration: 0.06 }, 0.2);
        mobileTl.to(content2Ref.current, { opacity: 1, y: 0, duration: 0.08 }, 0.26);
        mobileTl.to(content2Ref.current, { opacity: 0, duration: 0.04 }, 0.36);

        // Act 3
        mobileTl.to(img2Ref.current, { opacity: 0, duration: 0.05 }, 0.4);
        mobileTl.to(img3Ref.current, { opacity: 1, scale: 1.15, duration: 0.06 }, 0.4);
        mobileTl.to(content3Ref.current, { opacity: 1, y: 0, duration: 0.08 }, 0.46);
        mobileTl.to(content3Ref.current, { opacity: 0, duration: 0.04 }, 0.56);

        // Act 4
        mobileTl.to(img3Ref.current, { opacity: 0, duration: 0.05 }, 0.6);
        mobileTl.to(img4Ref.current, { opacity: 1, scale: 1.15, duration: 0.06 }, 0.6);
        mobileTl.to(content4Ref.current, { opacity: 1, y: 0, duration: 0.08 }, 0.66);
        mobileTl.to(content4Ref.current, { opacity: 0, duration: 0.04 }, 0.76);

        // Act 5
        mobileTl.to(img4Ref.current, { opacity: 0, duration: 0.05 }, 0.8);
        mobileTl.to(img5Ref.current, { opacity: 1, scale: 1.15, duration: 0.06 }, 0.8);
        mobileTl.to(content5Ref.current, { opacity: 1, y: 0, duration: 0.08 }, 0.86);
        mobileTl.to([stageViewportRef.current, content5Ref.current], { opacity: 0, duration: 0.05 }, 0.95);
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="home"
      className="relative w-full bg-[#030303] text-[#ffffff] selection:bg-white selection:text-[#030303]"
    >
      {/* ───────────────────────────────────────────────────────────── */}
      {/* THE PINNED VIEWPORT CONTAINER (Pinned for ~520vh continuously) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div
        ref={stageViewportRef}
        className="relative w-full h-screen overflow-hidden bg-[#030303]"
        style={{ willChange: 'transform' }}
      >
        {/* ── 1. Full-Bleed Image & 3D Particle Layers (Stacked Absolutely) ── */}
        <div className="absolute inset-0 w-full h-full select-none z-0">
          {/* Layer 1: Hero 3D Particle Self & Cinematic Portrait */}
          <div
            ref={img1Ref}
            className="absolute inset-0 w-full h-full pointer-events-auto"
            style={{ willChange: 'opacity, transform' }}
          >
            <ParticleSelf className="w-full h-full" />
          </div>

          {/* Layer 2: Workspace Push-In */}
          <div
            ref={img2Ref}
            className="absolute inset-0 w-full h-full"
            style={{ willChange: 'opacity, transform' }}
          >
            <picture>
              <source srcSet="/cinematic/img-2.webp" type="image/webp" />
              <img
                src="/cinematic/img-2.png"
                alt="Amrit Chand Workspace - Act 2"
                className="w-full h-full object-cover"
                style={{ objectPosition: CINEMATIC_SHOTS[1].objectPositionDesktop }}
                loading="lazy"
              />
            </picture>
          </div>

          {/* Layer 3: Side-Angle Focus */}
          <div
            ref={img3Ref}
            className="absolute inset-0 w-full h-full"
            style={{ willChange: 'opacity, transform' }}
          >
            <picture>
              <source srcSet="/cinematic/img-3.webp" type="image/webp" />
              <img
                src="/cinematic/img-3.png"
                alt="Amrit Chand Workspace - Act 3"
                className="w-full h-full object-cover"
                style={{ objectPosition: CINEMATIC_SHOTS[2].objectPositionDesktop }}
                loading="lazy"
              />
            </picture>
          </div>

          {/* Layer 4: Code & Typing Close-Up */}
          <div
            ref={img4Ref}
            className="absolute inset-0 w-full h-full"
            style={{ willChange: 'opacity, transform' }}
          >
            <picture>
              <source srcSet="/cinematic/img-4.webp" type="image/webp" />
              <img
                src="/cinematic/img-4.png"
                alt="Amrit Chand Workspace - Act 4"
                className="w-full h-full object-cover"
                style={{ objectPosition: CINEMATIC_SHOTS[3].objectPositionDesktop }}
                loading="lazy"
              />
            </picture>
          </div>

          {/* Layer 5: Project Showcase Overview */}
          <div
            ref={img5Ref}
            className="absolute inset-0 w-full h-full"
            style={{ willChange: 'opacity, transform' }}
          >
            <picture>
              <source srcSet="/cinematic/img-5.webp" type="image/webp" />
              <img
                src="/cinematic/img-5.png"
                alt="Amrit Chand Workspace - Act 5"
                className="w-full h-full object-cover"
                style={{ objectPosition: CINEMATIC_SHOTS[4].objectPositionDesktop }}
                loading="lazy"
              />
            </picture>
          </div>

          {/* ── Directional Scrims (Dissolves photo into dark canvas) ── */}
          <div
            ref={leftScrimRef}
            className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/90 to-transparent w-full md:w-[60vw]"
            style={{ willChange: 'opacity' }}
          />
          <div
            ref={rightScrimRef}
            className="absolute inset-0 ml-auto bg-gradient-to-l from-[#030303] via-[#030303]/90 to-transparent w-full md:w-[60vw]"
            style={{ willChange: 'opacity' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* ── 2. Giant Background Typography (z-10) ── */}
        <div className="absolute inset-0 z-10 pointer-events-none select-none flex items-center justify-center overflow-hidden">
          <div ref={bgText1Ref} className="absolute inset-0 flex items-center justify-center text-center px-4">
            <span className="font-heading text-[16vw] leading-none uppercase tracking-tight text-white/10 whitespace-nowrap">
              AMRIT CHAND
            </span>
          </div>
          <div ref={bgText2Ref} className="absolute inset-0 flex items-center justify-center text-center px-4 opacity-0">
            <span className="font-heading text-[14vw] leading-none uppercase tracking-tight text-white/10 whitespace-nowrap">
              THE WORKSPACE
            </span>
          </div>
          <div ref={bgText3Ref} className="absolute inset-0 flex items-center justify-center text-center px-4 opacity-0">
            <span className="font-heading text-[14vw] leading-none uppercase tracking-tight text-white/10 whitespace-nowrap">
              THE DISCIPLINE
            </span>
          </div>
          <div ref={bgText4Ref} className="absolute inset-0 flex items-center justify-center text-center px-4 opacity-0">
            <span className="font-heading text-[13vw] leading-none uppercase tracking-tight text-white/10 whitespace-nowrap">
              THE ARCHITECTURE
            </span>
          </div>
          <div ref={bgText5Ref} className="absolute inset-0 flex items-center justify-center text-center px-4 opacity-0">
            <span className="font-heading text-[15vw] leading-none uppercase tracking-tight text-white/10 whitespace-nowrap">
              SELECTED WORK
            </span>
          </div>
        </div>

        {/* ── 3. Foreground Content Layers (z-20) ── */}
        <div className="relative w-full h-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 flex items-center pointer-events-none z-20">
          {/* Bottom-Left Hero Info (Visible on Initial Load) */}
          <div
            ref={heroBottomLeftRef}
            className="absolute bottom-10 sm:bottom-14 left-6 sm:left-12 lg:left-20 z-30 pointer-events-auto flex flex-col max-w-sm sm:max-w-md"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full border border-white/15 bg-[#0a0a0a]/90 backdrop-blur-md text-[11px] font-mono text-neutral-300 tracking-wider uppercase w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Available for Select Projects</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              Building Digital Experiences{' '}
              <span className="italic font-normal block sm:inline text-neutral-300">
                & Scalable Web Solutions.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-neutral-300 font-body leading-relaxed mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              I am <span className="text-white font-medium">Amrit Chand</span> — a creative
              full-stack developer turning ambitious concepts into production-grade digital products.
            </p>

            <div className="flex items-center gap-3 text-xs font-mono text-neutral-300">
              <span>Dehradun, India</span>
              <span>•</span>
              <span className="text-white">MERN & Next.js 16</span>
            </div>
          </div>

          {/* Bottom-Right Scroll Indicator */}
          <div
            ref={heroBottomRightRef}
            className="absolute bottom-10 sm:bottom-14 right-6 sm:right-12 lg:right-20 z-30 pointer-events-auto hidden sm:flex flex-col items-end text-right text-xs font-mono text-neutral-400"
          >
            <span className="tracking-widest uppercase mb-1">Scroll to Explore</span>
            <div className="flex items-center gap-2">
              <span className="w-8 h-[1px] bg-neutral-600" />
              <span className="animate-bounce text-white">↓</span>
            </div>
          </div>

          {/* ── Act 01 Content Card (Right Side) ── */}
          <div
            ref={content1Ref}
            className="pointer-events-auto ml-auto w-full md:w-[40%] max-w-md z-30 flex flex-col justify-center bg-[#0a0a0a]/75 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            <p className="text-xs font-mono text-[#aaadb0] tracking-widest uppercase mb-2">
              {'// ACT 01 · THE INTRODUCTION'}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] mb-3">
              One Developer. One Workspace.{' '}
              <span className="italic block font-normal text-neutral-300">
                One Continuous Story.
              </span>
            </h2>
            <p className="text-sm text-[#aaadb0] leading-relaxed mb-5 font-body">
              Every interface I craft begins right here at my desk. A space designed to engineer
              scalable full-stack architectures with modern web technologies.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-neutral-300">
              <span className="px-2.5 py-1 rounded bg-[#1a1a1a] border border-white/10">
                Full-Stack MERN
              </span>
              <span>Next.js 16 & React 19</span>
            </div>
          </div>

          {/* ── Act 02 Content Card (Left Side) ── */}
          <div
            ref={content2Ref}
            className="pointer-events-auto mr-auto w-full md:w-[38%] max-w-md z-30 flex flex-col justify-center bg-[#0a0a0a]/95 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl"
          >
            <p className="text-xs font-mono text-[#aaadb0] tracking-widest uppercase mb-2">
              {'// ACT 02 · THE ENVIRONMENT'}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] mb-3">
              Every great idea{' '}
              <span className="italic block font-normal text-neutral-300">
                starts somewhere.
              </span>
            </h2>
            <p className="text-sm text-[#aaadb0] leading-relaxed mb-5 font-body">
              Welcome inside my digital studio. A focused development workspace where curiosity
              meets engineering discipline. Here, ideas transform into responsive, high-performance
              architectures.
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-white/80">
              <span className="px-2.5 py-1 rounded bg-[#1a1a1a] border border-white/10">
                Dehradun, India
              </span>
              <span className="text-[#777777]">•</span>
              <span>Full-Stack Engineering</span>
            </div>
          </div>

          {/* ── Act 03 Content Card (Right Side) ── */}
          <div
            ref={content3Ref}
            className="pointer-events-auto ml-auto w-full md:w-[44%] max-w-lg z-30 flex flex-col justify-center bg-[#0a0a0a]/95 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl"
          >
            <p className="text-xs font-mono text-[#aaadb0] tracking-widest uppercase mb-2">
              {'// ACT 03 · THE DISCIPLINE'}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] mb-3">
              Think. Design.{' '}
              <span className="italic block font-normal text-neutral-300">
                Develop. Repeat.
              </span>
            </h2>
            <p className="text-sm text-[#aaadb0] leading-relaxed mb-5 font-body">
              True digital craftsmanship is not merely aesthetic—it is rooted in resilient data
              models, lightning-fast interfaces, accessible interactions, and clean, modular code.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#1a1a1a] text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-[#141414] border border-white/5">
                <p className="text-white font-medium">Clean Architecture</p>
                <p className="text-[#777777] text-[11px] mt-0.5">Scalable & modular</p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#141414] border border-white/5">
                <p className="text-white font-medium">Fluid Interactions</p>
                <p className="text-[#777777] text-[11px] mt-0.5">60fps animations</p>
              </div>
            </div>
          </div>

          {/* ── Act 04 Content Card (Left Side) ── */}
          <div
            ref={content4Ref}
            className="pointer-events-auto mr-auto w-full md:w-[38%] max-w-md z-30 flex flex-col justify-center bg-[#0a0a0a]/95 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl"
          >
            <p className="text-xs font-mono text-[#aaadb0] tracking-widest uppercase mb-2">
              {'// ACT 04 · CAPABILITIES'}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white leading-[1.1] mb-3">
              Turning Ideas{' '}
              <span className="italic block font-normal text-neutral-300">
                into Robust Code.
              </span>
            </h2>
            <p className="text-sm text-[#aaadb0] leading-relaxed mb-5 font-body">
              From responsive frontend micro-interactions to distributed database integrations and
              AI workflows, here are the core technologies I wield daily.
            </p>
            <div className="flex flex-wrap gap-2">
              {CORE_TECH.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-[#141414] border border-white/10 text-xs font-mono text-[#fdfdfd] hover:border-white/40 hover:bg-[#1a1a1a] transition-all"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* ── Act 05 Content Card (Right Side: Real Projects) ── */}
          <div
            ref={content5Ref}
            className="pointer-events-auto ml-auto w-full md:w-[48%] max-w-2xl z-30 flex flex-col justify-center max-h-[90vh] overflow-y-auto pr-2 bg-[#0a0a0a]/95 backdrop-blur-xl p-6 sm:p-8 rounded-2xl border border-white/10 shadow-2xl"
          >
            <div className="mb-4">
              <p className="text-xs font-mono text-[#aaadb0] tracking-widest uppercase mb-1">
                {'// ACT 05 · PORTFOLIO SHOWCASE'}
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
                Things I&apos;ve <span className="italic text-neutral-300">Built.</span>
              </h2>
              <p className="text-xs text-[#aaadb0] font-mono mt-1">
                Real-world solutions. Production verified.
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              {FEATURED_PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="group relative bg-[#141414]/90 rounded-xl border border-white/10 p-4 hover:border-white/30 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#777777] mb-1.5">
                    <span>{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-heading text-lg sm:text-xl text-white mb-1.5 group-hover:text-neutral-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#aaadb0] line-clamp-2 mb-3 font-body leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#1a1a1a] text-xs font-mono">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[10px] bg-[#1c1c1c] border border-white/5 text-[#aaadb0]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:underline flex items-center gap-1"
                        >
                          <span>Demo</span>
                          <span>↗</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#aaadb0] hover:text-white transition-colors"
                        >
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-xs font-mono text-[#777777] pt-1">
              Scroll down to explore experience, services & contact ↓
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
