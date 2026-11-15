'use client';

export default function LogoStrip() {
  const teams = [
    { name: 'Dr. JP Nautiyal Clinic', note: 'AI Clinical Platform' },
    { name: 'BuildMyPC', note: 'Inventory Sync' },
    { name: 'Grandeur Net', note: 'E-Commerce & Pharma' },
    { name: 'Best Computers', note: 'Retail Sync' },
    { name: 'Society of Robotics & Tech', note: 'Secure DMS' },
  ];

  return (
    <section className="py-10 border-y border-white/[0.06] bg-charcoal-surface/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="text-xs font-mono text-neutral-500 shrink-0">
            Select client collaborations:
          </p>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-6 sm:gap-8">
            {teams.map((team, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand/60" />
                <span className="font-heading font-medium text-sm tracking-tight text-neutral-300">
                  {team.name}
                </span>
                <span className="text-[11px] font-mono text-neutral-500 hidden md:inline">
                  ({team.note})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
