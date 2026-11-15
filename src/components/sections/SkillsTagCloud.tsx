'use client';

import { useState } from 'react';

export default function SkillsTagCloud() {
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'data' | 'ai'>('all');

  const categories = [
    {
      id: 'frontend',
      title: 'Frontend Engineering',
      desc: 'Responsive, accessible user interfaces built with modern React and TypeScript.',
      skills: [
        { name: 'React 19', level: 'Production' },
        { name: 'Next.js App Router', level: 'Production' },
        { name: 'TypeScript', level: 'Strict Mode' },
        { name: 'Tailwind CSS', level: 'Production' },
        { name: 'HTML5 & WAI-ARIA', level: 'Accessible' },
        { name: 'Performance & Web Vitals', level: 'Lighthouse 90+' },
      ],
    },
    {
      id: 'backend',
      title: 'Backend & APIs',
      desc: 'Robust server architecture, REST endpoints, and secure authentication flows.',
      skills: [
        { name: 'Node.js & Express', level: 'Production' },
        { name: 'RESTful API Design', level: 'Validated' },
        { name: 'OAuth 2.0 & JWT Auth', level: 'Security' },
        { name: 'Webhook Verification', level: 'Idempotent' },
        { name: 'Serverless Functions', level: 'Edge / Node' },
        { name: 'Zod Validation', level: 'Schema-first' },
      ],
    },
    {
      id: 'data',
      title: 'Data & Real-Time',
      desc: 'Scalable data models, real-time WebSocket subscriptions, and caching layers.',
      skills: [
        { name: 'Supabase Real-time', level: 'Production' },
        { name: 'PostgreSQL', level: 'Relational' },
        { name: 'MongoDB & Mongoose', level: 'Document' },
        { name: 'Redis / In-memory', level: 'Caching' },
        { name: 'Database Migrations', level: 'Automated' },
        { name: 'Backup Routines', level: 'Snapshots' },
      ],
    },
    {
      id: 'ai',
      title: 'AI & Payments',
      desc: 'Integrating language models, OCR processing, and commercial checkout flows.',
      skills: [
        { name: 'Google Gemini API', level: 'LLM Pipeline' },
        { name: 'Groq (Llama 3)', level: 'Fast Inference' },
        { name: 'Tesseract.js OCR', level: 'In-browser' },
        { name: 'Razorpay Integration', level: 'Checkout' },
        { name: 'jsPDF Document Engine', level: 'Client export' },
        { name: 'Prompt Engineering', level: 'Structured output' },
      ],
    },
  ];

  const filtered = activeTab === 'all'
    ? categories
    : categories.filter((c) => c.id === activeTab);

  return (
    <section id="skills" className="py-20 md:py-28 px-6 bg-charcoal-surface/30 border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-brand mb-2 block">
              Technical Stack
            </span>
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-2">
              Tools, languages &amp; frameworks
            </h2>
            <p className="text-sm text-neutral-400 font-normal leading-relaxed">
              The technologies I use daily to build dependable, maintainable software.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-charcoal-card text-white border border-white/[0.15]'
                  : 'text-neutral-400 hover:text-white border border-transparent'
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveTab(c.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === c.id
                    ? 'bg-charcoal-card text-white border border-white/[0.15]'
                    : 'text-neutral-400 hover:text-white border border-transparent'
                }`}
              >
                {c.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((cat) => (
            <div
              key={cat.id}
              className="pro-card p-6 flex flex-col justify-between space-y-4"
            >
              <div>
                <h3 className="font-heading font-medium text-base text-white mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {cat.desc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/[0.06]">
                {cat.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-md bg-charcoal border border-white/[0.04] flex items-center justify-between text-xs"
                  >
                    <span className="text-neutral-200 font-medium">{skill.name}</span>
                    <span className="text-[10px] font-mono text-neutral-500">{skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
