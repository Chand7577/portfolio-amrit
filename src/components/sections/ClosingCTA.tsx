'use client';

export default function ClosingCTA() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="pt-20 pb-10 px-6 bg-charcoal">
      <div className="max-w-3xl mx-auto text-center space-y-5">
        <span className="text-xs font-mono text-brand block">
          Get in touch
        </span>

        <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
          Ready to build or stabilize your product?
        </h2>

        <p className="text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed font-normal">
          Direct engineering access, honest scope estimates, and clean code delivered on schedule. Tell me what you are looking to build below.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={scrollToContact}
            className="btn-brand"
          >
            <span>Send a message</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          <button
            onClick={scrollToWork}
            className="btn-secondary"
          >
            Review case studies
          </button>
        </div>
      </div>
    </section>
  );
}
