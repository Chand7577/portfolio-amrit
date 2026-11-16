'use client';

import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '@/data/portfolioData';
import GooeyNav from '@/components/ui/GooeyNav';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Precision Scroll-Spy with Section Mapping ──────────────────────────────
  useEffect(() => {
    // Comprehensive map of page sections to the 7 main navigation links
    const SECTION_TO_NAV: Record<string, string> = {
      home: 'home',
      about: 'about',
      'tech-stack': 'about',
      experience: 'experience',
      projects: 'projects',
      freelancing: 'freelancing',
      process: 'freelancing',
      pricing: 'pricing',
      faq: 'pricing',
      contact: 'contact',
    };

    const sectionElements = Object.keys(SECTION_TO_NAV)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    let rafId: number | null = null;

    const computeActiveSection = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // 1. Top of page is strictly "Home"
      if (scrollY < windowHeight * 0.45) {
        setActiveSection('home');
        return;
      }

      // 2. Near bottom of page (Contact / Footer) is strictly "Contact"
      if (windowHeight + scrollY >= docHeight - 220) {
        setActiveSection('contact');
        return;
      }

      // 3. For all other sections: find the section closest to reading line (y ≈ 35% of viewport)
      const targetY = windowHeight * 0.35;
      let currentSectionId = 'home';
      let minDistance = Infinity;

      sectionElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Section must be on screen
        if (rect.bottom > 0 && rect.top < windowHeight) {
          // If the reading line is inside this section, it takes immediate priority
          if (rect.top <= targetY && rect.bottom >= targetY) {
            currentSectionId = el.id;
            minDistance = -1;
          } else if (minDistance !== -1) {
            const distance = Math.abs(rect.top - targetY);
            if (distance < minDistance) {
              minDistance = distance;
              currentSectionId = el.id;
            }
          }
        }
      });

      const mappedNavId = SECTION_TO_NAV[currentSectionId] || 'home';
      setActiveSection(mappedNavId);
    };

    const handleScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(computeActiveSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to guarantee correct active link on initial load
    computeActiveSection();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
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
            className={`font-heading font-black text-xl sm:text-2xl tracking-wider transition-colors ${
              isDark
                ? 'text-[#ffffff] hover:text-[#fdfdfd] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]'
                : 'text-[#0c0d0e] hover:text-black'
            }`}
          >
            AMRIT<span>.</span>
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
            theme={isDark ? 'dark' : 'light'}
            size="sm"
            color={isDark ? '#ffffff' : '#0c0d0e'}
            activeTextColor={isDark ? '#030303' : '#ffffff'}
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
            className={`nav-talk-btn hidden md:inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold rounded-full transition-all active:scale-[0.98] ${
              isDark
                ? 'bg-[#ffffff] text-[#030303] hover:bg-[#fdfdfd] hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]'
                : 'bg-[#0c0d0e] text-[#ffffff] hover:bg-neutral-800 shadow-sm border border-black/10'
            }`}
          >
            Let&apos;s Talk
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            className={`md:hidden p-2 rounded-lg transition-colors border ${
              isDark
                ? 'text-[#aaadb0] hover:text-[#ffffff] bg-[#030303]/60 backdrop-blur-md border-[#1a1a1a]'
                : 'text-[#374151] hover:text-[#0c0d0e] bg-white/85 backdrop-blur-md border-[#e5e7eb] shadow-sm'
            }`}
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
        <div
          className={`md:hidden backdrop-blur-xl border-b px-6 py-4 space-y-3 pointer-events-auto shadow-2xl transition-colors ${
            isDark
              ? 'bg-[#030303]/95 border-[#1a1a1a]'
              : 'bg-white/95 border-[#e5e7eb]'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-3 border-b ${
              isDark ? 'border-[#1a1a1a]' : 'border-[#e5e7eb]'
            }`}
          >
            <span
              className={`text-xs font-mono uppercase ${
                isDark ? 'text-[#888888]' : 'text-[#6b7280]'
              }`}
            >
              Theme
            </span>
            <ThemeToggle size="sm" />
          </div>
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  isDark
                    ? isActive
                      ? 'text-[#ffffff] bg-[#1a1a1a] font-semibold'
                      : 'text-[#aaadb0] hover:text-[#ffffff] hover:bg-[#1a1a1a]/40'
                    : isActive
                    ? 'text-[#0c0d0e] bg-neutral-100 font-semibold'
                    : 'text-[#4b5563] hover:text-[#0c0d0e] hover:bg-neutral-50'
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
