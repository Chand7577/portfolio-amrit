'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES, CONTACT_INFO, ExperienceItem } from '@/data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const AUTO_PLAY_INTERVAL = 6000;

// ── Download Resume glass-pill button ────────────────────────────────────────
function ResumeButton() {
  return (
    <a
      href={CONTACT_INFO.resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      download
      className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/[0.05] border border-white/[0.12] backdrop-blur-sm hover:bg-white/[0.1] hover:border-orange-400/40 transition-all duration-300 group"
      aria-label="Download Resume PDF"
    >
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:bg-orange-500/20 transition-colors">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 15V3M9 12l3 3 3-3M5 20h14" />
        </svg>
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-[9px] font-mono text-[#777777] uppercase tracking-widest">Updated CV • 2026</span>
        <span className="text-xs font-semibold text-white">Download Resume</span>
      </div>
      <span className="ml-1 text-[#555] group-hover:text-orange-400 transition-colors text-xs">↗</span>
    </a>
  );
}

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(false);

  isPausedRef.current = isPaused;

  const activeExp: ExperienceItem = EXPERIENCES[activeIndex] || EXPERIENCES[0];

  // ── Section entrance with ScrollTrigger ──────────────────────────────────
  useEffect(() => {
    if (!sectionRef.current || !leftColRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger-reveal the company tabs on scroll into view
      gsap.fromTo(
        leftColRef.current!.querySelectorAll('.company-tab'),
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── GSAP crossfade on activeIndex change ──────────────────────────────────
  useEffect(() => {
    if (!showcaseRef.current) return;
    const header = showcaseRef.current.querySelector('.showcase-header');
    const items = showcaseRef.current.querySelectorAll('.showcase-item');
    const tags = showcaseRef.current.querySelectorAll('.showcase-tag');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      if (header) tl.fromTo(header, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
      if (items.length > 0) tl.fromTo(items, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }, '-=0.2');
      if (tags.length > 0) tl.fromTo(tags, { opacity: 0, scale: 0.88 }, { opacity: 1, scale: 1, duration: 0.25, stagger: 0.025, ease: 'back.out(1.4)' }, '-=0.15');
    }, showcaseRef);

    return () => ctx.revert();
  }, [activeIndex]);

  // ── Auto-cycle progress bar ───────────────────────────────────────────────
  const startCycle = useCallback(() => {
    if (!progressRef.current) return;
    gsap.killTweensOf(progressRef.current);
    gsap.set(progressRef.current, { scaleX: 0 });

    const tween = gsap.to(progressRef.current, {
      scaleX: 1,
      duration: AUTO_PLAY_INTERVAL / 1000,
      ease: 'none',
      transformOrigin: 'left center',
      onComplete: () => {
        if (!isPausedRef.current) {
          setActiveIndex((cur) => (cur + 1) % EXPERIENCES.length);
        }
      },
    });
    return tween;
  }, []);

  useEffect(() => {
    const tween = startCycle();
    const progressEl = progressRef.current;
    return () => {
      if (tween) tween.kill();
      if (progressEl) gsap.killTweensOf(progressEl);
    };
  }, [activeIndex, startCycle]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (progressRef.current) gsap.getTweensOf(progressRef.current).forEach((t) => t.pause());
  };
  const handleMouseLeave = () => {
    setIsPaused(false);
    if (progressRef.current) gsap.getTweensOf(progressRef.current).forEach((t) => t.resume());
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-20 sm:py-28 border-b border-[#1a1a1a]"
    >
      {/* ── Section header ── */}
      <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div className="space-y-3">
          <span className="text-xs font-mono text-[#777777] uppercase tracking-wider block">
            03 • Career
          </span>
          <h2
            className="font-serif font-normal text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
          >
            Where I&apos;ve <em>Worked.</em>
          </h2>
          <p className="text-sm text-[#9a9a9a] leading-relaxed max-w-sm">
            Professional history building web platforms, clinical AI systems, and collaborating with cross-functional teams.
          </p>
        </div>
        <ResumeButton />
      </div>

      {/* ── Main two-column layout ── */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left — Company list with vertical progress line */}
        <div ref={leftColRef} className="lg:col-span-5 relative">
          {/* Vertical timeline line */}
          <div className="absolute left-3.5 top-4 bottom-4 w-[1px] bg-[#1a1a1a] hidden lg:block" aria-hidden="true" />

          <div className="space-y-1">
            {EXPERIENCES.map((exp, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`company-tab group w-full text-left relative pl-9 pr-4 py-4 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-white/[0.05] border border-white/[0.1]'
                      : 'hover:bg-white/[0.03] border border-transparent'
                  }`}
                  aria-pressed={isActive}
                >
                  {/* Dot on the vertical line */}
                  <span
                    className={`absolute left-2.5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 transition-all duration-300 hidden lg:block ${
                      isActive ? 'bg-orange-500 border-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'bg-[#1a1a1a] border-[#333]'
                    }`}
                  />

                  <div className="space-y-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-xs font-mono font-semibold uppercase tracking-wider transition-colors ${
                          isActive ? 'text-orange-400' : 'text-[#555] group-hover:text-[#777]'
                        }`}
                      >
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase tracking-wider transition-colors ${
                          isActive
                            ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                            : 'bg-[#111] text-[#555] border border-[#1a1a1a]'
                        }`}
                      >
                        {exp.type}
                      </span>
                    </div>
                    <p className={`font-semibold text-sm transition-colors ${isActive ? 'text-white' : 'text-[#777] group-hover:text-[#aaa]'}`}>
                      {exp.company}
                    </p>
                    <p className={`text-[11px] font-mono transition-colors ${isActive ? 'text-[#aaadb0]' : 'text-[#444]'}`}>
                      {exp.role}
                    </p>
                    <p className={`text-[10px] font-mono transition-colors ${isActive ? 'text-[#555]' : 'text-[#333]'}`}>
                      {exp.duration}
                    </p>
                  </div>

                  {/* Per-tab progress bar */}
                  {isActive && (
                    <div className="mt-3 h-[2px] bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div
                        ref={progressRef}
                        className="h-full bg-orange-500 rounded-full"
                        style={{ transformOrigin: 'left center' }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right — Active role showcase */}
        <div
          ref={showcaseRef}
          className="lg:col-span-7 bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 min-h-[480px] flex flex-col justify-between relative overflow-hidden"
        >
          {/* Ambient orange glow */}
          <div
            className="absolute top-0 right-0 w-72 h-72 pointer-events-none rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 space-y-6">
            {/* Header */}
            <div className="showcase-header border-b border-white/[0.08] pb-6 space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-[#aaadb0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span>{activeExp.type}</span>
                  <span>•</span>
                  <span>{activeExp.location}</span>
                </div>
                <span className="text-xs font-mono text-[#555]">{activeExp.duration}</span>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                  {activeExp.role}
                </h3>
                <p className="text-sm font-mono text-orange-400/80 mt-1">{activeExp.company}</p>
              </div>
            </div>

            {/* Key deliverables */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-[#555] uppercase tracking-wider block">
                Key Deliverables &amp; Impact
              </span>
              <div className="space-y-2.5">
                {activeExp.points.map((pt, pIdx) => (
                  <div
                    key={pIdx}
                    className="showcase-item flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/20 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-2.5 h-2.5 text-orange-400 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm text-[#c8cdd4] leading-relaxed">{pt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tech chips */}
          {activeExp.technologies && activeExp.technologies.length > 0 && (
            <div className="relative z-10 pt-6 mt-6 border-t border-white/[0.06] space-y-2.5">
              <span className="text-[10px] font-mono text-[#555] uppercase tracking-wider block">
                Technologies Applied
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeExp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="showcase-tag px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] border border-white/[0.08] text-[#aaadb0] hover:text-orange-300 hover:border-orange-500/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile timeline (shown below the grid on small screens, same data) ── */}
    </section>
  );
}
