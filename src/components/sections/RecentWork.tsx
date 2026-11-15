'use client';

import CircularWorkCarousel from '@/components/ui/CircularWorkCarousel';

export default function RecentWork() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="work"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#121324] border-b border-white/[0.06] relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#191C2C] border border-white/10 text-xs font-mono text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>SELECTED CLIENT & PRODUCTION WORK (07)</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Crafted for the web.
          </h2>

          <p className="text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed">
            Drag horizontally to spin the 3D carousel. Each card auto-scrolls through the live website UI — hover any card to pause and inspect the details.
          </p>
        </div>

        {/* 3D Circular Carousel with Auto-Scrolling Cards */}
        <CircularWorkCarousel />

        {/* Bottom CTA Helper */}
        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="text-accent">★</span>
            <span>All 7 projects are live and deployed in production environments.</span>
          </div>

          <button
            onClick={scrollToContact}
            className="text-neutral-300 hover:text-accent transition-colors flex items-center gap-1 group"
          >
            <span>Have a project in mind? Let&apos;s build together</span>
            <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
          </button>
        </div>
      </div>
    </section>
  );
}
