'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '@/data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Respect prefers-reduced-motion
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setActiveStep(0);
      return;
    }

    const ctx = gsap.context(() => {
      // Stagger-reveal each step card on scroll
      stepsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 32, filter: 'blur(4px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
              onEnter: () => setActiveStep(i),
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-20 sm:py-28 border-b border-[#1a1a1a]"
    >
      <div className="space-y-12 sm:space-y-16">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 max-w-full">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono text-[#777777] uppercase tracking-wider block">
              06 • Process
            </span>
            <h2
              className="font-serif font-normal text-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              How We&apos;ll Work <em>Together.</em>
            </h2>
            <p className="text-sm text-[#9a9a9a] leading-relaxed">
              A straightforward, transparent workflow from initial idea to production launch.
            </p>
          </div>

          {/* Step progress pill */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08]">
            {PROCESS_STEPS.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-500 ${
                  i <= activeStep ? 'bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.6)]' : 'bg-[#1a1a1a]'
                }`}
              />
            ))}
            <span className="text-[10px] font-mono text-[#555] ml-1">
              {activeStep + 1}/{PROCESS_STEPS.length}
            </span>
          </div>
        </div>

        {/* ── Steps grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((step, i) => {
            const isActive = i === activeStep;
            return (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[i] = el; }}
                className={`group relative p-6 sm:p-7 rounded-2xl border transition-all duration-500 cursor-default ${
                  isActive
                    ? 'bg-white/[0.05] border-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.07)]'
                    : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]'
                }`}
                onMouseEnter={() => setActiveStep(i)}
              >
                {/* Connecting line between steps (desktop only) */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 left-full w-5 h-[1px] bg-[#1a1a1a] z-10"
                    style={{ width: 'calc(100% + 1.25rem)', left: '100%' }}
                    aria-hidden="true"
                  />
                )}

                {/* Large step number */}
                <div
                  className={`font-serif font-normal mb-6 transition-colors duration-300 select-none ${
                    isActive ? 'text-orange-500/60' : 'text-[#1a1a1a]'
                  }`}
                  style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
                  aria-hidden="true"
                >
                  {step.number}
                </div>

                <div className="space-y-2.5">
                  <h3
                    className={`font-serif text-xl sm:text-2xl transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-[#777]'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9a9a9a] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Active indicator dot */}
                <div
                  className={`absolute top-5 right-5 w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.7)]'
                      : 'bg-[#1a1a1a]'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
