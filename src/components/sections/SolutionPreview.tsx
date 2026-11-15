'use client';

import { useState } from 'react';

export default function SolutionPreview() {
  const [activeTab, setActiveTab] = useState(0);

  const projects = [
    {
      title: 'AI Rubric Analyzer',
      client: 'Dr. JP Nautiyal Clinic',
      domain: 'Clinical Workflow & AI',
      summary: 'Production AI platform that extracts clinical rubrics from patient narratives and ranks homeopathic remedies in sub-2 seconds.',
      specs: [
        { label: 'LLM Pipeline', value: 'Google Gemini 1.5 + Groq (Llama 3)' },
        { label: 'Document OCR', value: 'In-browser Tesseract.js for historical texts' },
        { label: 'Export Engine', value: 'Automated jsPDF clinical report generation' },
        { label: 'Uptime', value: '99.9% in continuous clinical use since Jun 2026' },
      ],
      metric: 'Sub-2s remedy ranking',
    },
    {
      title: 'BuildMyPC Unified Inventory',
      client: 'Best Computers, Dehradun',
      domain: 'Hardware & Multi-Store Sync',
      summary: 'Centralized inventory engine syncing warehouse stock and fluctuating component pricing across 3 partner web stores in real-time.',
      specs: [
        { label: 'Real-Time Sync', value: 'Supabase WebSocket subscriptions' },
        { label: 'Database', value: 'PostgreSQL with Row-Level Security' },
        { label: 'Frontend', value: 'Next.js App Router + TypeScript' },
        { label: 'Error Reduction', value: '40% fewer manual entry errors' },
      ],
      metric: '40% error reduction',
    },
    {
      title: 'E-Commerce & Pharma Administration',
      client: 'Grandeur Net, Dehradun',
      domain: 'Retail & Pharmaceutical Inventory',
      summary: 'Responsive storefronts with integrated Razorpay payment processing and custom administration module for inventory batch tracking.',
      specs: [
        { label: 'Checkout', value: 'Custom Razorpay webhook verification' },
        { label: 'Deployments', value: '5+ commercial websites delivered' },
        { label: 'Admin Tools', value: 'PHP/Node.js modular batch dashboard' },
        { label: 'Turnaround', value: '30% faster setup using structured scaffolds' },
      ],
      metric: '5+ sites shipped',
    },
  ];

  const current = projects[activeTab];

  return (
    <section className="py-20 md:py-28 px-6 bg-charcoal-surface/30 border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono text-brand mb-2 block">
            Architecture in practice
          </span>
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-3">
            Real systems, built for production
          </h2>
          <p className="text-sm text-neutral-400 font-normal leading-relaxed">
            Every project is engineered around clean data modeling, robust error boundaries, and straightforward documentation.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          {projects.map((p, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeTab === idx
                  ? 'bg-charcoal-card text-white border border-white/[0.15] shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 border border-transparent'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Active Project Detail Card */}
        <div className="pro-card p-6 sm:p-8 bg-charcoal-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-6">
            <div>
              <div className="text-xs font-mono text-neutral-400 mb-1">
                {current.client} &bull; {current.domain}
              </div>
              <h3 className="font-heading font-semibold text-xl text-white">
                {current.title}
              </h3>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-brand/10 border border-brand/20 text-brand font-mono text-xs font-medium self-start sm:self-auto">
              <span>{current.metric}</span>
            </div>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed mb-6 max-w-3xl">
            {current.summary}
          </p>

          {/* Technical Specs Grid */}
          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            {current.specs.map((s, i) => (
              <div
                key={i}
                className="p-3.5 rounded-lg bg-charcoal border border-white/[0.04] flex items-center justify-between text-xs"
              >
                <span className="text-neutral-400 font-normal">{s.label}</span>
                <span className="text-neutral-200 font-mono font-medium">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
