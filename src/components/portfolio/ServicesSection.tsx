'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { SERVICES } from '@/data/portfolioData';

// Dynamically import MagicRings (WebGL2 canvas) with SSR disabled
const MagicRings = dynamic(() => import('@/components/ui/MagicRings'), {
  ssr: false,
});

export default function ServicesSection() {
  return (
    <section id="freelancing" className="py-20 sm:py-28 border-b border-[#1a1a1a]">
      <div className="space-y-10 sm:space-y-12">
        {/* ── Interactive "Have a Project in Mind?" Banner with MagicRings (Dark Island) ── */}
        <div
          data-theme="dark"
          className="dark-island relative w-full rounded-2xl sm:rounded-3xl border border-[#1a1a1a] bg-[#070707] overflow-hidden p-8 sm:p-12 lg:p-16 shadow-2xl min-h-[360px] sm:min-h-[400px] flex flex-col justify-between"
        >
          {/* Background WebGL MagicRings */}
          <div className="absolute inset-0 z-0">
            <MagicRings
              color="#ffffff"
              colorTwo="#888888"
              motion="pulse"
              ringCount={6}
              speed={0.9}
              lineThickness={1.8}
              glow={1.2}
              hoverScale={1.15}
              followMouse={true}
              mouseInfluence={0.15}
              clickBurst={true}
              opacity={0.7}
              theme="dark"
            />
          </div>

          {/* Vignette gradients to preserve text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/90 via-[#070707]/60 to-transparent pointer-events-none z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/80 via-transparent to-transparent pointer-events-none z-[1]" />

          {/* Banner Content (Header + Subtitle) */}
          <div className="relative z-10 max-w-2xl space-y-3 pointer-events-none">
            <span className="text-xs font-mono text-[#aaadb0] uppercase tracking-wider block">
              05 &bull; Freelancing
            </span>
            <h2 className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Have a Project in <span className="italic">Mind?</span>
            </h2>
            <p className="text-sm sm:text-base text-[#aaadb0] font-normal leading-relaxed pt-1">
              I help businesses and individuals turn their ideas into functional, production-ready digital products with clean engineering and modern aesthetics.
            </p>
          </div>

          {/* Action Row */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 mt-4">
            <a
              href="#contact"
              className="px-6 py-3 rounded-full bg-white text-[#030303] font-semibold text-xs sm:text-sm hover:bg-[#fdfdfd] transition-all shadow-lg shadow-white/10 active:scale-[0.98] inline-flex items-center gap-2 self-start pointer-events-auto"
            >
              <span>Discuss Your Project</span>
              <span>&rarr;</span>
            </a>

            <div className="flex items-center gap-2 text-[11px] font-mono text-[#777777] pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-ping" />
              <span>Click anywhere to burst rings &bull; Hover to expand</span>
            </div>
          </div>
        </div>

        {/* ── Exactly 4 Services Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SERVICES.map((service) => (
            <div
              key={service.number}
              className="p-6 sm:p-7 rounded-xl bg-white border border-black/10 dark:bg-[#0a0a0a] dark:border-[#1a1a1a] hover:border-black/25 dark:hover:border-[#ffffff]/25 shadow-sm dark:shadow-none transition-colors space-y-3"
            >
              <div className="flex items-center justify-between border-b border-black/10 dark:border-[#1a1a1a] pb-2.5">
                <h3 className="font-heading font-semibold text-lg text-[#0c0d0e] dark:text-[#ffffff]">
                  {service.title}
                </h3>
                <span className="text-xs font-mono text-[#52525b] dark:text-[#777777] font-semibold">
                  {service.number}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#374151] dark:text-[#9a9a9a] leading-relaxed font-normal">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
