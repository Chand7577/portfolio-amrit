'use client';

import { useState } from 'react';

export default function PricingSection() {
  const [selectedTier, setSelectedTier] = useState<'retainer' | 'project'>('retainer');

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const tiers = [
    {
      id: 'retainer',
      title: 'Ongoing Care Plan',
      tagline: 'Best for live products needing steady maintenance and feature iterations.',
      price: '$1,500',
      period: '/ month',
      popular: true,
      features: [
        'Dedicated monthly developer hours',
        'Direct Slack & phone communication',
        'Dependency updates & security patching',
        'Bug triage & rapid fixes (< 24hr turnaround)',
        'Database backups & uptime monitoring',
        'Cancel or pause anytime with 14 days notice',
      ],
      ctaText: 'Start monthly care',
    },
    {
      id: 'project',
      title: 'Turnkey Project Build',
      tagline: 'Best for building a new application or rebuilding an existing system.',
      price: '$3,500',
      period: 'starting price',
      popular: false,
      features: [
        'Full architecture design & technical spec',
        'Next.js 16 / React 19 + TypeScript stack',
        'Database modeling & secure API routes',
        'Responsive layout across mobile and desktop',
        'Recorded video handover & component docs',
        '30-day post-launch warranty included',
      ],
      ctaText: 'Discuss project scope',
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 px-6 bg-charcoal border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono text-brand mb-2 block">
            Pricing &amp; Engagement
          </span>
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-3">
            Predictable pricing, clear terms
          </h2>
          <p className="text-sm text-neutral-400 font-normal leading-relaxed">
            Choose between ongoing monthly maintenance or a fixed-scope milestone project. No surprise invoices, ever.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {tiers.map((t) => (
            <div
              key={t.id}
              className={`pro-card p-6 sm:p-8 flex flex-col justify-between space-y-6 ${
                t.popular ? 'border-brand/40 bg-charcoal-card' : 'bg-charcoal-card'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-semibold text-lg text-white">
                    {t.title}
                  </h3>
                  {t.popular && (
                    <span className="px-2.5 py-0.5 rounded-full bg-brand/10 border border-brand/20 text-brand font-mono text-[11px] font-medium">
                      Most popular
                    </span>
                  )}
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  {t.tagline}
                </p>

                <div className="pt-2 flex items-baseline gap-2">
                  <span className="font-heading font-semibold text-3xl sm:text-4xl text-white tabular-nums">
                    {t.price}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    {t.period}
                  </span>
                </div>

                {/* Features List */}
                <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
                  <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-2">
                    Included:
                  </span>
                  {t.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <svg className="w-4 h-4 text-brand shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <button
                  onClick={scrollToContact}
                  className={`w-full py-2.5 rounded-lg text-xs font-medium transition-all ${
                    t.popular
                      ? 'btn-brand'
                      : 'btn-secondary'
                  }`}
                >
                  {t.ctaText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quiet assurance note */}
        <div className="mt-8 text-center text-xs font-mono text-neutral-500">
          50% upfront &bull; 50% upon delivery &bull; 100% intellectual property transfer
        </div>
      </div>
    </section>
  );
}
