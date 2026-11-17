'use client';

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRICING_PLANS } from '@/data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target: number, duration: number, start: boolean) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [start, target, duration]);

  return value;
}

// Extract numeric value from price string like "₹8,000"
function parsePrice(price: string): number {
  return parseInt(price.replace(/[^0-9]/g, ''), 10) || 0;
}
function formatPrice(num: number, original: string): string {
  const prefix = original.match(/^[^\d]*/)?.[0] ?? '';
  return `${prefix}${num.toLocaleString('en-IN')}`;
}

// ── Single pricing card ───────────────────────────────────────────────────────
function PricingCard({
  plan,
  isFeatured,
  index,
  inView,
}: {
  plan: (typeof PRICING_PLANS)[number];
  isFeatured: boolean;
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const target = parsePrice(plan.price);
  const count = useCountUp(target, 1.6, inView);

  // Mouse spotlight
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    card.addEventListener('mousemove', onMove);
    return () => card.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={cardRef}
      data-theme="dark"
      className={`dark-island group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-500 ${
        isFeatured
          ? 'scale-[1.03] shadow-[0_0_60px_rgba(249,115,22,0.15)] z-10'
          : 'hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.07)]'
      }`}
      style={{ '--mx': '50%', '--my': '50%' } as React.CSSProperties}
    >
      {/* Rotating gradient border for featured card */}
      {isFeatured && (
        <div
          className="absolute -inset-[1px] rounded-2xl z-0"
          style={{
            background:
              'conic-gradient(from var(--angle), #f97316, #fb923c, #fed7aa, #f97316)',
            animation: 'rotate-border 4s linear infinite',
          }}
        />
      )}
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes rotate-border {
          to { --angle: 360deg; }
        }
      `}</style>

      {/* Card body */}
      <div
        className={`relative z-10 flex flex-col h-full p-6 sm:p-7 ${
          isFeatured ? 'bg-[#0a0806] rounded-2xl' : 'bg-[#070707] border border-white/[0.08] rounded-2xl'
        }`}
      >
        {/* Mouse spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
          style={{
            background: 'radial-gradient(200px circle at var(--mx) var(--my), rgba(249,115,22,0.07), transparent 70%)',
          }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="font-serif text-lg sm:text-xl text-white mb-1">{plan.title}</h3>
            <div className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
              {formatPrice(count, plan.price)}
              <span className="text-xs font-mono font-normal text-[#555] ml-1.5">starting</span>
            </div>
          </div>
          {isFeatured && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20 mt-1">
              Popular
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-[#777] leading-relaxed border-b border-white/[0.06] pb-4 mb-4">
          {plan.description}
        </p>

        {/* Features */}
        <ul className="space-y-2.5 flex-1 mb-6">
          {plan.features.map((feat, fi) => (
            <li key={fi} className="flex items-start gap-2.5 text-xs text-[#c8cdd4] leading-normal">
              <span className={`shrink-0 mt-0.5 font-bold text-sm ${isFeatured ? 'text-orange-400' : 'text-orange-500/70'}`}>✓</span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className={`block w-full py-2.5 px-4 text-center rounded-xl text-xs font-semibold transition-all active:scale-[0.98] ${
            isFeatured
              ? 'bg-orange-500 text-white hover:bg-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]'
              : 'bg-white/[0.06] text-white hover:bg-orange-500 hover:text-white border border-white/[0.1] hover:border-orange-500/50 hover:shadow-[0_0_16px_rgba(249,115,22,0.2)]'
          }`}
        >
          Enquire Now →
        </a>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        once: true,
        onEnter: () => setInView(true),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="py-20 sm:py-28 border-b border-[#1a1a1a]"
    >
      <div className="space-y-10 sm:space-y-14">
        {/* Header */}
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-mono text-[#777777] uppercase tracking-wider block">
            07 • Pricing
          </span>
          <h2
            className="font-serif font-normal text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
          >
            Transparent Starting <em>Prices.</em>
          </h2>
          <p className="text-sm text-[#9a9a9a] leading-relaxed">
            Indicative starting figures in INR for common freelance engagements. Final scope is always discussed first.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch py-2">
          {PRICING_PLANS.map((plan, idx) => (
            <PricingCard
              key={plan.title}
              plan={plan}
              isFeatured={idx === 1}
              index={idx}
              inView={inView}
            />
          ))}
        </div>

        {/* Note */}
        <p className="text-xs font-mono text-[#555] max-w-xl">
          <span className="text-white font-semibold">* Note: </span>
          Final pricing depends on your specific project requirements, page count, and technical complexity. All projects are scoped after an initial free consultation.
        </p>
      </div>
    </section>
  );
}
