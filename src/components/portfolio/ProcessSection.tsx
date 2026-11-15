import React from 'react';
import { PROCESS_STEPS } from '@/data/portfolioData';

export default function ProcessSection() {
  return (
    <section id="process" className="py-20 sm:py-28 border-b border-[#1a1a1a]">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-mono text-[#777777] uppercase tracking-wider block">
            06 &bull; Process
          </span>
          <h2 className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl text-[#ffffff] tracking-tight">
            How We&apos;ll Work <span className="italic">Together.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#9a9a9a] font-normal leading-relaxed">
            A straightforward, transparent workflow from initial idea to production launch.
          </p>
        </div>

        {/* 4 Numbered Typographic Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.number}
              className="p-6 rounded-xl bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#ffffff]/25 transition-colors space-y-3"
            >
              <span className="font-mono text-xs font-bold text-[#777777] tracking-wider block">
                {step.number}
              </span>

              <h3 className="font-heading font-semibold text-lg text-[#ffffff]">
                {step.title}
              </h3>

              <p className="text-xs text-[#9a9a9a] leading-relaxed font-normal">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
