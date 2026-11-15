'use client';

import { useState } from 'react';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What types of applications do you build?',
      a: 'I specialize in full-stack web applications, business dashboards, customer portals, inventory synchronization systems, and AI workflows using React 19, Next.js, Node.js, and Supabase. I focus on production-grade systems rather than generic WordPress templates.',
    },
    {
      q: 'How does billing work for fixed builds vs care plans?',
      a: 'Fixed builds are quoted with clear milestone scopes, typically billed 50% upfront and 50% upon final delivery. Monthly care plans are billed on a flat monthly retainer ($1,500/mo) with zero surprise invoices and a 14-day cancellation policy.',
    },
    {
      q: 'How long does a typical build take from start to launch?',
      a: 'Most targeted applications and portals launch within 3 to 6 weeks. Because you collaborate directly with the engineer writing your code, decisions and iterations happen within hours rather than weeks.',
    },
    {
      q: 'How do you coordinate with clients in different time zones?',
      a: 'I am based in India and structure my daily schedule to provide overlapping working hours for live Slack communication and video syncs with teams across North America, Europe, and Asia-Pacific.',
    },
    {
      q: 'Do I own all the source code upon project completion?',
      a: 'Yes, 100%. Upon final invoice settlement, full intellectual property rights, repository ownership, documentation, and production environment credentials are completely transferred to you.',
    },
    {
      q: 'What is included in the 30-day post-launch warranty?',
      a: 'Every turnkey build includes 30 days of complimentary post-launch support. Any bugs or regressions within the agreed technical scope are resolved promptly free of charge.',
    },
    {
      q: 'Can you audit or rescue an existing codebase?',
      a: 'Yes. We begin with a Code & Performance Audit to review architecture quality, dependency vulnerabilities, and database query bottlenecks before recommending a pragmatic remediation plan.',
    },
    {
      q: 'Do you sign Non-Disclosure Agreements (NDAs)?',
      a: 'Yes, absolutely. I am happy to sign a standard mutual NDA before reviewing any proprietary business logic or codebases.',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 px-6 bg-charcoal border-b border-white/[0.06]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono text-brand mb-2 block">
            Direct FAQ
          </span>
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-3">
            Frequently asked questions
          </h2>
          <p className="text-sm text-neutral-400 font-normal leading-relaxed">
            Straightforward answers regarding contracts, code ownership, timelines, and technical scope.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="pro-card bg-charcoal-card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-heading font-medium text-sm sm:text-base text-neutral-200 hover:text-white transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className={`text-base font-mono transition-transform duration-150 text-neutral-400 ${isOpen ? 'rotate-45 text-brand' : ''}`}>
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal border-t border-white/[0.04]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
