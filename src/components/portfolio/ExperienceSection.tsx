'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { EXPERIENCES, CONTACT_INFO, ExperienceItem } from '@/data/portfolioData';
import InterferenceRibbons from '@/components/ui/InterferenceRibbons';

const AUTO_PLAY_INTERVAL = 6000; // 6 seconds per role

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);

  // Sync ref with state
  isPausedRef.current = isPaused;

  const activeExp: ExperienceItem = EXPERIENCES[activeIndex] || EXPERIENCES[0];

  // ── GSAP transition for the right showcase card on activeIndex change ──
  useEffect(() => {
    if (!showcaseRef.current) return;

    const header = showcaseRef.current.querySelector('.showcase-header');
    const items = showcaseRef.current.querySelectorAll('.showcase-item');
    const tags = showcaseRef.current.querySelectorAll('.showcase-tag');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      if (header) {
        tl.fromTo(
          header,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        );
      }

      if (items.length > 0) {
        tl.fromTo(
          items,
          { opacity: 0, x: -18 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
          '-=0.2'
        );
      }

      if (tags.length > 0) {
        tl.fromTo(
          tags,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.25, stagger: 0.025, ease: 'back.out(1.4)' },
          '-=0.15'
        );
      }
    }, showcaseRef);

    return () => ctx.revert();
  }, [activeIndex]);

  // ── Auto-cycle progress bar animation with GSAP ──
  const startCycle = useCallback(() => {
    if (!progressRef.current) return;

    // Reset progress line
    gsap.killTweensOf(progressRef.current);
    gsap.set(progressRef.current, { width: '0%' });

    if (timerRef.current) clearTimeout(timerRef.current);

    const tween = gsap.to(progressRef.current, {
      width: '100%',
      duration: AUTO_PLAY_INTERVAL / 1000,
      ease: 'none',
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

  // Pause / Resume on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (progressRef.current) gsap.getTweensOf(progressRef.current).forEach((t) => t.pause());
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (progressRef.current) gsap.getTweensOf(progressRef.current).forEach((t) => t.resume());
  };

  const selectTab = (idx: number) => {
    setActiveIndex(idx);
  };

  return (
    <section id="experience" className="relative py-20 sm:py-28 border-b border-[#1a1a1a] overflow-hidden">
      {/* ── Ambient Interference Ribbons Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-90">
        <InterferenceRibbons
          colors={['#ffffff', '#818cf8', '#c084fc', '#38bdf8']}
          mode="glow"
          wires={38}
          lineWidth={1.6}
          ribbonWidth={0.34}
          amplitude={0.6}
          waveLength={1.0}
          angle={30}
          twist={1.8}
          curl={0.25}
          depth={0.6}
          speed={0.45}
          interactive={false}
        />
      </div>

      {/* Gentle top and bottom section edge fade */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#030303] to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none z-0" />

      <div className="relative z-10 space-y-10 sm:space-y-12">
        {/* ── Section Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 max-w-4xl">
          <div className="space-y-3">
            <span className="text-xs font-mono text-[#777777] uppercase tracking-wider block">
              03 &bull; Career
            </span>
            <h2 className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl text-[#ffffff] tracking-tight">
              Where I&apos;ve <span className="italic">Worked.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#9a9a9a] font-normal leading-relaxed max-w-xl">
              Professional history building web platforms, clinical AI systems, and collaborating with cross-functional teams.
            </p>
          </div>

          <a
            href={CONTACT_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0a0a0a] border border-[#1a1a1a] text-xs font-medium text-[#ffffff] hover:border-[#ffffff]/40 transition-colors self-start sm:self-auto active:scale-[0.98]"
          >
            <span>Download Resume</span>
            <span className="text-[#aaadb0] text-sm">↓</span>
          </a>
        </div>

        {/* ── Interactive Split Showcase (Features 4 Style) ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* ── Left Column: Interactive Role Tabs ── */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {EXPERIENCES.map((exp, idx) => {
              const isActive = activeIndex === idx;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectTab(idx)}
                  className={`group relative text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border overflow-hidden cursor-pointer backdrop-blur-md ${
                    isActive
                      ? 'bg-[#141414]/90 border-white/30 shadow-xl shadow-black/60 ring-1 ring-white/10'
                      : 'bg-[#0a0a0a]/70 border-[#1a1a1a] hover:bg-[#0f0f0f]/85 hover:border-[#2a2a2a]'
                  }`}
                >
                  {/* Progress Line on Active Tab */}
                  {isActive && (
                    <div
                      ref={progressRef}
                      className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-white/40 via-white to-white/70 pointer-events-none"
                      style={{ width: '0%' }}
                    />
                  )}

                  <div className="flex items-start gap-3.5">
                    {/* Index / Company Marker */}
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-colors text-xs font-mono font-bold ${
                        isActive
                          ? 'bg-white text-[#030303] border-white'
                          : 'bg-[#141414] border-[#222222] text-[#777777] group-hover:text-white group-hover:border-[#333333]'
                      }`}
                    >
                      0{idx + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3
                          className={`font-heading font-semibold text-sm sm:text-base truncate transition-colors ${
                            isActive ? 'text-white' : 'text-[#aaadb0] group-hover:text-white'
                          }`}
                        >
                          {exp.company}
                        </h3>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 uppercase tracking-wider ${
                            isActive
                              ? 'bg-white/10 text-white border border-white/20'
                              : 'bg-[#141414] text-[#777777] border border-[#1a1a1a]'
                          }`}
                        >
                          {exp.type}
                        </span>
                      </div>

                      <p
                        className={`text-xs truncate transition-colors ${
                          isActive ? 'text-[#fdfdfd]' : 'text-[#777777] group-hover:text-[#9a9a9a]'
                        }`}
                      >
                        {exp.role}
                      </p>

                      <div className="flex items-center gap-2 mt-1.5 text-[11px] font-mono text-[#555555]">
                        <span>{exp.duration}</span>
                        <span>&bull;</span>
                        <span className="truncate">{exp.location}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}

            <div className="flex items-center justify-between px-2 pt-1 text-[11px] font-mono text-[#555555]">
              <span>Hover to pause auto-cycle</span>
              <span>{activeIndex + 1} / {EXPERIENCES.length}</span>
            </div>
          </div>

          {/* ── Right Column: Active Role Detail Showcase (Animated with GSAP) ── */}
          <div
            ref={showcaseRef}
            className="lg:col-span-7 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 min-h-[480px] flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            {/* Ambient subtle glow inside card */}
            <div className="absolute top-0 right-0 w-[350px] h-[200px] bg-white/[0.02] blur-[100px] pointer-events-none rounded-full" />

            <div className="relative z-10 space-y-6">
              {/* Header: Role + Company Metadata */}
              <div className="showcase-header border-b border-[#1a1a1a] pb-6 space-y-3">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#141414] border border-[#222222] text-xs font-mono text-[#aaadb0]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{activeExp.type}</span>
                    <span>&bull;</span>
                    <span>{activeExp.location}</span>
                  </div>

                  <span className="text-xs font-mono text-[#777777]">
                    {activeExp.duration}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                    {activeExp.role}
                  </h3>
                  <p className="text-sm sm:text-base font-mono text-[#aaadb0] mt-1">
                    {activeExp.company}
                  </p>
                </div>
              </div>

              {/* Key Deliverables & Impact (Checklist pills with staggered entrance) */}
              <div className="space-y-3">
                <span className="text-[11px] font-mono text-[#777777] uppercase tracking-wider block">
                  Key Deliverables &amp; Impact
                </span>

                <div className="space-y-2.5">
                  {activeExp.points.map((pt, pIdx) => (
                    <div
                      key={pIdx}
                      className="showcase-item flex items-start gap-3 p-3.5 rounded-xl bg-[#121212]/70 border border-[#1a1a1a] hover:border-white/20 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-white text-[#030303] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        <svg
                          className="w-3 h-3 stroke-[3]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>

                      <p className="text-xs sm:text-sm text-[#fdfdfd] leading-relaxed font-normal">
                        {pt}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Technologies Used in this Role */}
            {activeExp.technologies && activeExp.technologies.length > 0 && (
              <div className="relative z-10 pt-6 mt-6 border-t border-[#1a1a1a] space-y-2.5">
                <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider block">
                  Technologies Applied
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeExp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="showcase-tag px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#141414] border border-[#222222] text-[#aaadb0] hover:text-white hover:border-white/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
