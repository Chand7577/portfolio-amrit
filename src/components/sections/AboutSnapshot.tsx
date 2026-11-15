'use client';

export default function AboutSnapshot() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { num: '1+', label: 'Year professional experience', desc: 'June 2025 – Present' },
    { num: '5+', label: 'Client platforms delivered', desc: 'E-commerce, AI tools, DMS' },
    { num: '3+', label: 'Partner stores synced live', desc: 'Real-time WebSocket inventory' },
    { num: '420+', label: 'Coding problems solved', desc: 'Verified technical problem solving' },
  ];

  return (
    <section id="about" className="py-20 md:py-28 px-6 bg-charcoal-surface/30 border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="text-xs font-mono text-brand mb-2 block">
                Direct engagement &bull; Solo professional
              </span>
              <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
                About Amrit Chand
              </h2>
            </div>

            <p className="text-base text-neutral-200 leading-relaxed font-normal">
              I am a frontend and full-stack developer based in India, specializing in React 19, Next.js, Node.js, and Supabase. Rather than handing off tickets across an agency hierarchy, I manage the full implementation lifecycle myself: from initial architecture and database schema to responsive interfaces and post-launch maintenance.
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed font-normal">
              My focus is simple: software that works reliably, performs fast, and remains easy to extend. I work with founders and engineering leads across US, UK, and European time zones, structuring schedules to ensure daily synchronous communication overlap and rapid turnaround.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={scrollToContact}
                className="btn-brand"
              >
                <span>Book a free call</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <a
                href="https://linkedin.com/in/amrit-chand-93005922b"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <span>LinkedIn profile ↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Grounded Credential Block */}
          <div className="lg:col-span-5 space-y-3">
            <div className="pro-card p-6 bg-charcoal-card space-y-4">
              <div className="text-xs font-mono text-neutral-400 pb-2 border-b border-white/[0.06] flex items-center justify-between">
                <span>developer-profile.md</span>
                <span className="text-emerald-400">Available</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-neutral-500 font-mono block">ROLE:</span>
                  <span className="text-neutral-200 font-medium">Frontend &amp; MERN Full-Stack Developer</span>
                </div>
                <div>
                  <span className="text-neutral-500 font-mono block">LOCATION:</span>
                  <span className="text-neutral-200 font-medium">India (Serving global time zones)</span>
                </div>
                <div>
                  <span className="text-neutral-500 font-mono block">PRIMARY STACK:</span>
                  <span className="text-neutral-200 font-mono">React 19, Next.js 16, TypeScript, Supabase, Node</span>
                </div>
                <div>
                  <span className="text-neutral-500 font-mono block">COMMUNICATION:</span>
                  <span className="text-neutral-200 font-medium">Slack, Loom updates, direct video calls</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Verified Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="pro-card p-5 bg-charcoal-card"
            >
              <div className="font-heading font-semibold text-2xl sm:text-3xl text-white tabular-nums mb-1">
                {s.num}
              </div>
              <div className="text-xs font-medium text-neutral-200 mb-1">
                {s.label}
              </div>
              <div className="text-[11px] font-mono text-neutral-500">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
