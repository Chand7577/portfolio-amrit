'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function EditorialHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-stagger',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.2,
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    const lenis = (window as any).__lenis;
    if (lenis && el) {
      lenis.scrollTo(el, { offset: -60 });
    } else {
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-36 pb-16 px-6 md:px-12 max-w-7xl mx-auto pointer-events-auto"
    >
      {/* Top Meta Line */}
      <div className="hero-stagger opacity-0 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-accent tracking-widest uppercase">
            [ROLE / SPECIALTY]
          </span>
          <span className="text-xs font-mono text-slate-300">
            MERN &bull; TYPESCRIPT &bull; REACT 19 &bull; NEXT.js &bull; SUPABASE
          </span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-slate-300">
          <span className="text-accent">&ldquo;To ship, or not to ship&hellip;&rdquo;</span>
          <span className="text-slate-500 text-[10px]">&mdash; Hamlet Declamation Prize</span>
        </div>
      </div>

      {/* Hero Monumental Typographic Showcase */}
      <div className="my-auto py-12 md:py-16">
        <div className="hero-stagger opacity-0 mb-4 inline-flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>HTTP REQUEST DISPATCHED: GET /amrit-chand</span>
        </div>

        <h1 className="hero-stagger opacity-0 text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] text-white uppercase">
          AMRIT <br />
          <span className="text-gradient">CHAND.</span>
        </h1>

        <div className="hero-stagger opacity-0 mt-8 max-w-2xl">
          <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed">
            Full-stack software engineer crafting resilient web architectures, real-time distributed data pipelines, and AI-assisted clinical platforms. Grounded in TypeScript strictness and MERN mastery.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="hero-stagger opacity-0 mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollTo('#works')}
            className="btn-accent px-7 py-4 text-sm font-mono tracking-wider uppercase group"
          >
            <span>EXPLORE WORKS</span>
            <span className="group-hover:translate-x-1 transition-transform">↓</span>
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="btn-outline px-7 py-4 text-sm font-mono tracking-wider uppercase"
          >
            <span>INITIATE CONNECTION</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Bottom KPI Metrics Bar */}
      <div className="hero-stagger opacity-0 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <span className="block font-mono text-xs text-slate-400 mb-1">ALGORITHMS</span>
          <span className="text-3xl font-bold font-mono text-white">420+</span>
          <span className="block text-xs text-slate-400 mt-1">Problems Solved</span>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <span className="block font-mono text-xs text-slate-400 mb-1">PRODUCTION</span>
          <span className="text-3xl font-bold font-mono text-accent">20+</span>
          <span className="block text-xs text-slate-400 mt-1">Projects Shipped</span>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <span className="block font-mono text-xs text-slate-400 mb-1">INVENTORY SYNC</span>
          <span className="text-3xl font-bold font-mono text-emerald-400">-40%</span>
          <span className="block text-xs text-slate-400 mt-1">Manual Entry Errors</span>
        </div>

        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <span className="block font-mono text-xs text-slate-400 mb-1">STATUS</span>
          <span className="text-3xl font-bold font-mono text-white">200 OK</span>
          <span className="block text-xs text-slate-400 mt-1">Ready for Deploy</span>
        </div>
      </div>
    </section>
  );
}
