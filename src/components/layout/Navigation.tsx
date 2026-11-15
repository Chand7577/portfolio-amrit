'use client';

import { useState } from 'react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121324]/80 backdrop-blur-md border-b border-white/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Brand Identity + Available for work */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-heading font-semibold text-sm sm:text-base text-white tracking-tight hover:text-accent transition-colors"
          >
            Amrit Chand
          </a>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for work
          </span>
        </div>

        {/* Center: Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-normal text-neutral-300">
          <button
            onClick={() => scrollTo('about')}
            className="hover:text-white transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollTo('services')}
            className="hover:text-white transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => scrollTo('pricing')}
            className="hover:text-white transition-colors"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollTo('work')}
            className="hover:text-white transition-colors"
          >
            Case studies
          </button>
          <button
            onClick={() => scrollTo('faq')}
            className="hover:text-white transition-colors"
          >
            FAQ
          </button>
        </nav>

        {/* Right: Get in touch CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('contact')}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.12] text-white font-medium text-xs transition-all active:scale-[0.98]"
          >
            <span>Get in touch</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-neutral-300 hover:text-white"
            aria-label="Toggle menu"
          >
            <div className="w-4 h-3.5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-neutral-200 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-full h-0.5 bg-neutral-200 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-neutral-200 transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#161828] border-b border-white/[0.08] px-6 py-4 space-y-3">
          <div className="flex flex-col gap-2 text-xs font-normal text-neutral-300">
            <button onClick={() => scrollTo('about')} className="text-left py-1 hover:text-white">About</button>
            <button onClick={() => scrollTo('services')} className="text-left py-1 hover:text-white">Services</button>
            <button onClick={() => scrollTo('pricing')} className="text-left py-1 hover:text-white">Pricing</button>
            <button onClick={() => scrollTo('work')} className="text-left py-1 hover:text-white">Case studies</button>
            <button onClick={() => scrollTo('faq')} className="text-left py-1 hover:text-white">FAQ</button>
            <button onClick={() => scrollTo('contact')} className="text-left py-1 hover:text-white">Contact</button>
          </div>
        </div>
      )}
    </header>
  );
}
