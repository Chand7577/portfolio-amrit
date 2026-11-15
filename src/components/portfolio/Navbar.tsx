'use client';

import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '@/data/portfolioData';
import GooeyNav from '@/components/ui/GooeyNav';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((link) => link.href.replace('#', ''));
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number | HTMLElement | string, options?: { offset?: number; duration?: number }) => void } }).__lenis;

    if (id === 'home') {
      if (lenis) lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      if (lenis) {
        lenis.scrollTo(element, { offset: -navOffset, duration: 1.2 });
      } else {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: elementPosition - navOffset, behavior: 'smooth' });
      }
    }
  };

  const activeIndex = NAV_LINKS.findIndex((link) => link.href.replace('#', '') === activeSection);
  const currentIndex = activeIndex >= 0 ? activeIndex : 0;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent border-none pointer-events-none">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <div className="flex-1 flex items-center justify-start pointer-events-auto">
          <button
            onClick={() => scrollTo('#home')}
            className="font-heading font-black text-xl sm:text-2xl text-[#ffffff] tracking-wider hover:text-[#fdfdfd] transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            AMRIT<span className="text-[#ffffff]">.</span>
          </button>
        </div>

        {/* Center: GooeyNav */}
        <div className="hidden md:flex items-center justify-center flex-none pointer-events-auto">
          <GooeyNav
            items={NAV_LINKS}
            activeIndex={currentIndex}
            onChange={(index: number, item: { href?: string }) => {
              if (item?.href) scrollTo(item.href);
            }}
            theme="dark"
            size="sm"
            color="#ffffff"
            activeTextColor="#030303"
            frame={true}
            particleCount={12}
            spread={42}
            animationTime={450}
            timeVariance={180}
            gooeyness={0.5}
            wobble={0.35}
            hoverEffect={true}
          />
        </div>

        {/* Right: Theme Toggle, CTA & Mobile Menu */}
        <div className="flex-1 flex items-center justify-end gap-2.5 sm:gap-3 pointer-events-auto">
          {/* Light / Dark Mode Ripple Toggle */}
          <ThemeToggle size="md" />

          <button
            onClick={() => scrollTo('#contact')}
            className="hidden md:inline-flex px-4 py-1.5 text-xs font-semibold rounded-full bg-[#ffffff] text-[#030303] hover:bg-[#fdfdfd] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all active:scale-[0.98] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            Let&apos;s Talk
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className="md:hidden p-2 rounded-lg text-[#aaadb0] hover:text-[#ffffff] bg-[#030303]/60 backdrop-blur-md transition-colors border border-[#1a1a1a]"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#030303]/95 backdrop-blur-xl border-b border-[#1a1a1a] px-6 py-4 space-y-3 pointer-events-auto">
          <div className="flex items-center justify-between pb-3 border-b border-[#1a1a1a]">
            <span className="text-xs font-mono text-[#888888] uppercase">Theme</span>
            <ThemeToggle size="sm" />
          </div>
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  isActive
                    ? 'text-[#ffffff] bg-[#1a1a1a] font-semibold'
                    : 'text-[#aaadb0] hover:text-[#ffffff] hover:bg-[#1a1a1a]/40'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
