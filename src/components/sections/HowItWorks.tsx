'use client';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Discovery & Specification',
      timeframe: 'Days 1–3',
      desc: 'We define the technical requirements, user flows, database models, and target deliverables. We agree on fixed milestone scopes before writing code.',
      points: ['Direct technical scoping call', 'Written architecture plan', 'Milestone & timeline breakdown'],
    },
    {
      num: '02',
      title: 'Development & Iteration',
      timeframe: 'Weeks 1–4',
      desc: 'I build your application in structured weekly sprints. You review working software on a live staging environment with continuous Loom progress updates.',
      points: ['Private GitHub repository access', 'Staging preview deployments', 'Asynchronous Loom video updates'],
    },
    {
      num: '03',
      title: 'Launch & Knowledge Handover',
      timeframe: 'Weeks 3–6',
      desc: 'Production deployment with zero downtime. I document code architecture, record component walkthroughs, and provide a 30-day post-launch warranty.',
      points: ['Domain & DNS cutover', 'Documented component system', '30-day bug warranty included'],
    },
  ];

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="how-it-works" className="py-20 md:py-28 px-6 bg-charcoal-surface/30 border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-mono text-brand mb-2 block">
            Engagement Process
          </span>
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-3">
            How we work together
          </h2>
          <p className="text-sm text-neutral-400 font-normal leading-relaxed">
            A clear, predictable three-stage process with direct developer communication and transparent weekly progress.
          </p>
        </div>

        {/* 3 Step Horizontal / Vertical Layout */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="pro-card p-6 bg-charcoal-card flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-heading font-semibold text-2xl text-white tabular-nums">
                    {s.num}
                  </span>
                  <span className="text-xs font-mono text-brand bg-brand/10 border border-brand/20 px-2.5 py-0.5 rounded">
                    {s.timeframe}
                  </span>
                </div>

                <h3 className="font-heading font-medium text-base text-white">
                  {s.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] space-y-2">
                {s.points.map((pt, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand/80" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="pro-card p-6 bg-charcoal flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-heading font-medium text-sm text-white">Have a specific launch date in mind?</div>
            <div className="text-xs text-neutral-400">Let’s discuss your scope sheet and see if we can align schedules.</div>
          </div>
          <button
            onClick={scrollToContact}
            className="btn-brand text-xs shrink-0"
          >
            Schedule a scope call
          </button>
        </div>
      </div>
    </section>
  );
}
