'use client';

export default function ProblemSection() {
  const points = [
    {
      problem: 'Developer disappears after final invoice',
      solution: 'Direct ongoing contact via Slack and phone. Monthly health checks, updates, and fast bug turnarounds.',
    },
    {
      problem: 'Minor changes take weeks and cost a fortune',
      solution: 'Direct developer access. Minor updates happen in hours or days without agency bureaucracy.',
    },
    {
      problem: 'Works on the developer machine, breaks on mobile',
      solution: 'Tested on actual hardware across iOS, Android, and desktop viewports before deployment.',
    },
    {
      problem: 'Sluggish performance and slow database queries',
      solution: 'Optimized asset delivery, edge caching, clean database queries, and sub-second render targets.',
    },
    {
      problem: 'Messy undocumented code terrified to touch',
      solution: 'Modular, well-commented TypeScript code with clear documentation and recorded video handovers.',
    },
    {
      problem: 'Deployments cause panic and Friday night crashes',
      solution: 'Automated CI/CD pipelines, preview environments, database snapshots, and rollback routines.',
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 bg-charcoal border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-mono text-brand mb-2 block">
            Why solo development works better
          </span>
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-3">
            Common freelance pain points, solved
          </h2>
          <p className="text-sm text-neutral-400 font-normal leading-relaxed">
            Most software projects struggle with communication gaps and messy handoffs. Working directly with the engineer writing your code eliminates the middle layers.
          </p>
        </div>

        {/* 2-Column Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {points.map((p, idx) => (
            <div
              key={idx}
              className="pro-card p-6 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-2 text-xs font-mono text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                  <span>The standard frustration</span>
                </div>
                <h3 className="font-heading font-medium text-base text-neutral-200">
                  {p.problem}
                </h3>
              </div>

              <div className="pt-3 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 mb-1.5 text-xs font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>How I handle it</span>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {p.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
