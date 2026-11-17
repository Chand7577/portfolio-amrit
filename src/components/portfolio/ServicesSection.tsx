'use client';

import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { SERVICES } from '@/data/portfolioData';

const MagicRings = dynamic(() => import('@/components/ui/MagicRings'), { ssr: false });

// ── Service icons ─────────────────────────────────────────────────────────────
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  '01': ( // Business & Corporate
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  ),
  '02': ( // E-commerce
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  ),
  '03': ( // Custom Web Apps
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /><line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
  '04': ( // AI-Powered
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 6v6l4 2" /><circle cx="18" cy="6" r="3" /><path d="M21 3l-3 3" />
    </svg>
  ),
};

// ── Spotlight card ────────────────────────────────────────────────────────────
function SpotlightCard({
  service,
  className = '',
}: {
  service: (typeof SERVICES)[number];
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    card.addEventListener('mousemove', onMove);
    return () => card.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.08] overflow-hidden transition-all duration-300 hover:border-orange-500/20 hover:bg-white/[0.05] ${className}`}
      style={{ '--mouse-x': '50%', '--mouse-y': '50%' } as React.CSSProperties}
    >
      {/* Spotlight glow that follows mouse */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background:
            'radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(249,115,22,0.08), transparent 70%)',
        }}
      />

      <div className="relative z-10 flex flex-col h-full gap-4">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/15 text-orange-400">
          {SERVICE_ICONS[service.number] ?? null}
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-base sm:text-lg text-white leading-snug">
              {service.title}
            </h3>
            <span className="text-[10px] font-mono text-[#555] mt-0.5 shrink-0">{service.number}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#9a9a9a] leading-relaxed">{service.description}</p>
        </div>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function ServicesSection() {
  return (
    <section id="freelancing" className="py-20 sm:py-28 border-b border-[#1a1a1a]">
      <div className="space-y-10 sm:space-y-12">

        {/* ── Bold CTA Band ── */}
        <div
          data-theme="dark"
          className="dark-island relative w-full rounded-2xl sm:rounded-3xl border border-[#1a1a1a] bg-[#070707] overflow-hidden p-8 sm:p-12 lg:p-16 shadow-2xl min-h-[340px] sm:min-h-[380px] flex flex-col justify-between"
        >
          {/* Background WebGL */}
          <div className="absolute inset-0 z-0">
            <MagicRings
              color="#ffffff"
              colorTwo="#888888"
              motion="pulse"
              ringCount={6}
              speed={0.9}
              lineThickness={1.8}
              glow={1.2}
              hoverScale={1.15}
              followMouse={true}
              mouseInfluence={0.15}
              clickBurst={true}
              opacity={0.6}
              theme="dark"
            />
          </div>

          {/* CSS animated gradient glow — low cost */}
          <div
            className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(249,115,22,0.07) 0%, transparent 70%)',
              animation: 'cta-pulse 6s ease-in-out infinite',
            }}
          />
          <style>{`
            @keyframes cta-pulse {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 1; }
            }
          `}</style>

          {/* Vignette */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/90 via-[#070707]/55 to-transparent pointer-events-none z-[2]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/75 via-transparent to-transparent pointer-events-none z-[2]" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl space-y-3 pointer-events-none">
            <span className="text-xs font-mono text-[#aaadb0] uppercase tracking-wider block">
              05 • Freelancing
            </span>
            <h2
              className="font-serif font-normal text-white"
              style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
            >
              Have a Project in <em>Mind?</em>
            </h2>
            <p className="text-sm sm:text-base text-[#aaadb0] leading-relaxed pt-1">
              I help businesses and individuals turn their ideas into functional, production-ready digital products with clean engineering and modern aesthetics.
            </p>
          </div>

          {/* Action row */}
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-4 pt-8 mt-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 text-white font-semibold text-sm hover:bg-orange-400 transition-all shadow-[0_0_28px_rgba(249,115,22,0.35)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)] active:scale-[0.98] self-start pointer-events-auto"
            >
              <span>Discuss Your Project</span>
              <span>→</span>
            </a>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#555] pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400/50 animate-ping" />
              <span>Click anywhere to burst rings • Hover to expand</span>
            </div>
          </div>
        </div>

        {/* ── Bento grid service cards ── */}
        {/* 4 cards: first wide (col-span-2 on lg), then 2 side-by-side, last one full */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES[0] && (
              <SpotlightCard service={SERVICES[0]} className="sm:col-span-2 lg:col-span-2" />
            )}
            {SERVICES[1] && (
              <SpotlightCard service={SERVICES[1]} className="sm:col-span-2 lg:col-span-1" />
            )}
            {SERVICES[2] && (
              <SpotlightCard service={SERVICES[2]} className="sm:col-span-1 lg:col-span-1" />
            )}
            {SERVICES[3] && (
              <SpotlightCard service={SERVICES[3]} className="sm:col-span-1 lg:col-span-2" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
