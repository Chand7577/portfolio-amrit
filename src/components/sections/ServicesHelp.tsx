'use client';

export default function ServicesHelp() {
  const services = [
    {
      title: 'Code & Performance Audit',
      desc: 'A thorough technical review of your existing codebase: identifying performance bottlenecks, security oversights, and unnecessary complexity.',
      category: 'Audit & Diagnose',
      icon: (
        <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      deliverables: ['Lighthouse 90+ plan', 'Security & query check', 'Actionable remediation sheet'],
    },
    {
      title: 'Custom Full-Stack Build',
      desc: 'End-to-end development tailored to your requirements. Clean Next.js/React frontend, robust database modeling, and zero boilerplate bloat.',
      category: 'Zero to Launch',
      icon: (
        <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      deliverables: ['Responsive App Router setup', 'Database schema & APIs', 'Full source code ownership'],
    },
    {
      title: 'Ongoing Care Plan',
      desc: 'Dedicated monthly maintenance: dependency patching, bug resolution, uptime monitoring, and small feature additions so your app stays healthy.',
      category: 'Monthly Retainer',
      icon: (
        <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      deliverables: ['Direct Slack/phone access', 'Continuous security patches', 'Priority turnaround'],
    },
    {
      title: 'Integrations & Automation',
      desc: 'Connecting third-party APIs, payment gateways (Razorpay, Stripe), webhooks, and real-time database sockets to automate manual processes.',
      category: 'Workflows & APIs',
      icon: (
        <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      deliverables: ['Payment checkout flows', 'Supabase real-time sync', 'Webhook event handlers'],
    },
    {
      title: 'Rescue & Refactor',
      desc: 'Stepping into half-finished, abandoned, or unstable codebases to stabilize architecture, resolve persistent bugs, and deploy cleanly.',
      category: 'Stabilization',
      icon: (
        <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      deliverables: ['Legacy code refactoring', 'TypeScript migration', 'Zero-downtime deployment'],
    },
    {
      title: 'White-Label Development',
      desc: 'Engineering partner for design studios and agencies. You handle brand and Figma designs; I translate them into pixel-perfect, accessible code.',
      category: 'Design Partner',
      icon: (
        <svg className="w-5 h-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      deliverables: ['Pixel-accurate translation', 'Clean responsive states', 'Confidential white-labeling'],
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 px-6 bg-charcoal border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-mono text-brand mb-2 block">
            Capabilities &amp; Services
          </span>
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-3">
            How I can help your product
          </h2>
          <p className="text-sm text-neutral-400 font-normal leading-relaxed">
            From targeted audits to complete product builds and monthly engineering support. Clear deliverables, no agency markup.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="pro-card p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg bg-charcoal-surface border border-white/[0.08] flex items-center justify-center">
                    {s.icon}
                  </div>
                  <span className="text-[11px] font-mono text-neutral-500">
                    {s.category}
                  </span>
                </div>

                <h3 className="font-heading font-medium text-base text-white">
                  {s.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  {s.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06] space-y-1.5">
                {s.deliverables.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 text-[11px] text-neutral-400">
                    <span className="w-1 h-1 rounded-full bg-brand/60" />
                    <span>{d}</span>
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
