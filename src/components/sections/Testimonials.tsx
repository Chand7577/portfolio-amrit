'use client';

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        'Amrit took our rough clinic workflow and turned it into an AI tool we use with patients every single day. Quick replies, no confusing jargon, and reliable follow-up whenever adjustments are needed.',
      name: 'Dr. J. P. Nautiyal',
      role: 'Founder & Senior Homeopath',
      company: 'Dr. JP Nautiyal Clinic (drjpnauthomeopath.in)',
      location: 'Dehradun, India',
    },
    {
      quote:
        'The inventory sync Amrit built for BuildMyPC wiped out 40% of our manual entry errors across partner websites. He explained how the architecture worked simply, documented everything, and shipped ahead of deadline.',
      name: 'Retail Systems Lead',
      role: 'Operations & Inventory',
      company: 'Best Computers Partner Network',
      location: 'Dehradun, India',
    },
    {
      quote:
        'Working with Amrit meant having one engineer who owned the frontend, checkout flows, and database without handoff friction. Fast, honest, and direct communication throughout the engagement.',
      name: 'E-Commerce Director',
      role: 'Web Operations',
      company: 'Grandeur Net Client Engagements',
      location: 'Dehradun, India',
    },
  ];

  return (
    <section className="py-20 md:py-28 px-6 bg-charcoal border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono text-brand mb-2 block">
            Client feedback
          </span>
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-3">
            What founders and collaborators say
          </h2>
          <p className="text-sm text-neutral-400 font-normal leading-relaxed">
            Feedback from clinical directors, retail partners, and commercial agency leads.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="pro-card p-6 bg-charcoal-card flex flex-col justify-between space-y-6"
            >
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="pt-4 border-t border-white/[0.06] space-y-1">
                <div className="font-heading font-medium text-sm text-white">
                  {t.name}
                </div>
                <div className="text-xs text-neutral-400 font-normal">
                  {t.role}
                </div>
                <div className="text-[11px] font-mono text-neutral-500">
                  {t.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
