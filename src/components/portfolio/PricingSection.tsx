import React from 'react';
import { PRICING_PLANS } from '@/data/portfolioData';
import PixelCard from '@/components/ui/PixelCard';

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-28 border-b border-[#1a1a1a]">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-mono text-[#777777] uppercase tracking-wider block">
            07 &bull; Pricing
          </span>
          <h2 className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl text-[#ffffff] tracking-tight">
            Transparent Starting <span className="italic">Prices.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#9a9a9a] font-normal leading-relaxed">
            Indicative starting figures in INR for common freelance engagements. Hover over cards to interact with the pixel glow.
          </p>
        </div>

        {/* 4 Interactive Pixel Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {PRICING_PLANS.map((plan, idx) => {
            const isFeatured = idx === 1;
            return (
              <div key={plan.title} data-theme="dark" className="dark-island w-full h-full">
                <PixelCard
                  variant="default"
                  glowColor={isFeatured ? '#10b981' : '#94a3b8'}
                  colors={
                    isFeatured
                      ? ['#ffffff', '#10b981', '#34d399']
                      : ['#ffffff', '#cbd5e1', '#64748b']
                  }
                  radius={16}
                  gap={6}
                  pixelSize={2.2}
                  speed={isFeatured ? 40 : 25}
                  spotlight={0.55}
                  glow={isFeatured ? 0.6 : 0.35}
                  opacity={0.4}
                  trigger="hover"
                  intro={true}
                  introDelay={idx * 120}
                  className={`w-full h-full min-h-[440px] transition-all duration-300 ${
                    isFeatured
                      ? 'shadow-[0_0_30px_rgba(16,185,129,0.14)] border border-emerald-500/30'
                      : 'border border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="p-6 flex flex-col justify-between w-full h-full select-none text-white">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-heading font-semibold text-base sm:text-lg text-white">
                            {plan.title}
                          </h3>
                          <div className="mt-2 text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                            {plan.price}
                            <span className="text-xs font-mono font-normal text-[#8b929a] ml-1.5">
                              starting
                            </span>
                          </div>
                        </div>

                        {isFeatured && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                            Popular
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#aaadb0] leading-relaxed font-normal border-b border-white/10 pb-3">
                        {plan.description}
                      </p>

                      {/* Inclusions */}
                      <ul className="space-y-2 pt-1">
                        {plan.features.map((feat, fIdx) => (
                          <li
                            key={fIdx}
                            className="flex items-start gap-2 text-xs text-[#cbd5e1] leading-normal"
                          >
                            <span className="text-emerald-400 text-xs font-bold">
                              ✓
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Enquiry Button */}
                    <div className="pt-6">
                      <a
                        href="#contact"
                        className={`block w-full py-2.5 px-3 text-center rounded-lg text-xs font-semibold transition-all active:scale-[0.98] ${
                          isFeatured
                            ? 'bg-white text-[#030303] hover:bg-neutral-100 font-bold shadow-[0_0_20px_rgba(255,255,255,0.22)]'
                            : 'bg-white/10 text-white hover:bg-white hover:text-[#030303] border border-white/20 hover:border-white font-semibold'
                        }`}
                      >
                        Enquire Now &rarr;
                      </a>
                    </div>
                  </div>
                </PixelCard>
              </div>
            );
          })}
        </div>

        {/* Scope disclaimer note */}
        <div className="p-4 rounded-lg bg-white border border-black/10 dark:bg-[#0a0a0a] dark:border-[#1a1a1a] text-xs font-mono text-[#52525b] dark:text-[#777777] max-w-2xl shadow-sm dark:shadow-none">
          <span className="text-[#0c0d0e] dark:text-[#ffffff] font-semibold">* Note: </span>
          <span>
            Final pricing depends on your specific project requirements, page count, and technical complexity.
          </span>
        </div>
      </div>
    </section>
  );
}
