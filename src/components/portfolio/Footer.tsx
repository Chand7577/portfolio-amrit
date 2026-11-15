'use client';

import React from 'react';
import { CONTACT_INFO, NAV_LINKS } from '@/data/portfolioData';
import ShatterText from '@/components/ui/ShatterText';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#080808] border-t border-[#1a1a1a] overflow-hidden mt-24 sm:mt-32 pt-14 sm:pt-20 lg:pt-24">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-white/[0.025] blur-[140px] pointer-events-none rounded-full" />

      {/* ── Inner Content Container (Aligned with main content max-width) ── */}
      <div className="relative z-10 max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* ── Main Top Row: 3 Columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">

          {/* ── Left Column: Social Icons, Large Email, Location ── */}
          <div className="lg:col-span-4 space-y-6">
            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {/* GitHub */}
              <a
                href={CONTACT_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-full bg-[#121212] border border-[#1a1a1a] flex items-center justify-center text-[#aaadb0] hover:text-white hover:border-white/30 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={CONTACT_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-[#121212] border border-[#1a1a1a] flex items-center justify-center text-[#aaadb0] hover:text-white hover:border-white/30 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74V10.13H5.07v8.37h2.78z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://twitter.com/amritchand"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-full bg-[#121212] border border-[#1a1a1a] flex items-center justify-center text-[#aaadb0] hover:text-white hover:border-white/30 transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            {/* Direct Email */}
            <div>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="font-medium text-lg sm:text-xl md:text-2xl text-white hover:text-[#aaadb0] transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
            </div>

            {/* Location Block (Tallinn removed) */}
            <div className="text-xs sm:text-sm text-[#777777] font-normal leading-relaxed space-y-0.5">
              <p>Dehradun, Uttarakhand, India</p>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="block hover:text-white transition-colors"
              >
                {CONTACT_INFO.phone}
              </a>
              <p>Available worldwide for remote &amp; freelance</p>
            </div>
          </div>

          {/* ── Center Column: Schematic Dot Matrix + Center CTA Button ── */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center py-4 lg:py-0">
            <div className="flex items-center justify-center w-full max-w-md">
              {/* Left Schematic Dots */}
              <div className="hidden sm:flex items-center gap-2 flex-1 justify-end opacity-40">
                <div className="grid grid-cols-4 gap-1.5 py-1">
                  {[...Array(16)].map((_, i) => (
                    <span key={i} className="w-1 h-1 rounded-full bg-white/40" />
                  ))}
                </div>
                <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-white/40" />
              </div>

              {/* Center Pill CTA */}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
                className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#121212] border border-[#222222] hover:border-white/50 transition-all shadow-lg active:scale-95 shrink-0"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-white">
                  Get in Touch
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-[#aaadb0] uppercase tracking-wider group-hover:text-white transition-colors">
                  FREE
                </span>
              </a>

              {/* Right Schematic Dots */}
              <div className="hidden sm:flex items-center gap-2 flex-1 justify-start opacity-40">
                <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-white/40" />
                <div className="grid grid-cols-4 gap-1.5 py-1">
                  {[...Array(16)].map((_, i) => (
                    <span key={i} className="w-1 h-1 rounded-full bg-white/40" />
                  ))}
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-xs font-mono text-[#777777] mt-8">
              <span>&copy; {currentYear} Amrit Chand. All Rights Reserved.</span>
            </div>
          </div>

          {/* ── Right Column: Nav Links (matching Navbar exactly) ── */}
          <div className="lg:col-span-3 flex flex-col items-start lg:items-end space-y-2.5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href.replace('#', ''))}
                className="text-sm sm:text-base font-normal text-[#aaadb0] hover:text-white transition-colors text-left lg:text-right py-0.5 min-h-[44px] lg:min-h-0"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Sub-links Row ── */}
        <div className="pt-10 sm:pt-14 mt-6 sm:mt-10 border-t border-[#1a1a1a]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#777777]">
          <span className="hover:text-white transition-colors cursor-default">
            Terms and conditions
          </span>
          <span className="hidden sm:inline text-[#777777]/50">&bull;</span>
          <a
            href={CONTACT_INFO.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors underline-offset-4 hover:underline"
          >
            Privacy Policy
          </a>
        </div>
      </div>

      {/* ── Giant Shatter Text "AMRIT" – visible text with shatter-in animation ── */}
      <div
        className="relative mt-8 sm:mt-12 w-full flex justify-center items-end overflow-hidden select-none pb-0"
        aria-hidden="true"
      >
        <ShatterText
          text="AMRIT"
          delay={0.3}
          className="font-bold tracking-tighter text-white/[0.055] text-center justify-center"
          style={{
            fontSize: 'clamp(5.5rem, 20vw, 20rem)',
            fontFamily: 'Graphik, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: '0.78',
            transform: 'translateY(10%)',
          }}
        />
      </div>
    </footer>
  );
}
