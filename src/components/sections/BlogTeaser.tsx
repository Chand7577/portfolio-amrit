'use client';

export default function BlogTeaser() {
  const articles = [
    {
      category: 'Architecture',
      title: 'Why I pick Supabase real-time over custom WebSocket clusters for solo builds',
      readTime: '4 min read',
      summary: 'How Postgres row-level security and real-time channels enable a single engineer to build multi-tenant synchronizations without maintaining custom socket daemons.',
    },
    {
      category: 'In-browser AI',
      title: 'Running Tesseract.js OCR in-browser: Zero server costs for clinical document parsing',
      readTime: '6 min read',
      summary: 'A step-by-step technical breakdown of handling bilingual Hindi and English clinical book scanning directly on client hardware without cloud vision API fees.',
    },
    {
      category: 'Freelance Engineering',
      title: 'Protecting early-stage startups from abandoned codebases and architectural debt',
      readTime: '5 min read',
      summary: 'Common warning signs founders miss when contracting software engineers, and the five essential handover artifacts to require before approving final releases.',
    },
  ];

  return (
    <section id="blog" className="py-20 md:py-28 px-6 bg-charcoal-surface/30 border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-brand mb-2 block">
              Engineering Notes
            </span>
            <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-2">
              Technical notes &amp; writings
            </h2>
            <p className="text-sm text-neutral-400 font-normal leading-relaxed">
              Pragmatic engineering insights from building and maintaining production web applications.
            </p>
          </div>
          <a
            href="https://github.com/chand7577"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-brand hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Read more on GitHub</span>
            <span>↗</span>
          </a>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {articles.map((art, idx) => (
            <article
              key={idx}
              className="pro-card p-6 bg-charcoal-card flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span className="text-brand font-medium">{art.category}</span>
                  <span className="text-[11px] text-neutral-500">{art.readTime}</span>
                </div>

                <h3 className="font-heading font-medium text-base text-white leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  {art.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.04] text-[11px] font-mono text-neutral-500">
                Amrit Chand &bull; Technical Writeup
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
