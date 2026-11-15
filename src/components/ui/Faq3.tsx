'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface Faq3Props {
  items: FaqItem[];
  categories?: string[];
  defaultCategory?: string;
  badge?: string;
  title?: React.ReactNode;
  subtitle?: string;
  className?: string;
  showContactCard?: boolean;
}

export default function Faq3({
  items,
  categories,
  defaultCategory = 'All',
  badge = '08 • FAQ',
  title = (
    <>
      Common <span className="italic">Questions.</span>
    </>
  ),
  subtitle = 'Quick answers regarding availability, pricing, technology stack, and engagements.',
  className = '',
  showContactCard = true,
}: Faq3Props) {
  // Extract categories dynamically if not explicitly passed
  const availableCategories = React.useMemo(() => {
    if (categories && categories.length > 0) return categories;
    const catSet = new Set<string>();
    items.forEach((item) => {
      if (item.category) catSet.add(item.category);
    });
    return ['All', ...Array.from(catSet)];
  }, [categories, items]);

  const [activeCategory, setActiveCategory] = useState<string>(defaultCategory);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Filter items by active category
  const filteredItems = React.useMemo(() => {
    if (activeCategory === 'All') return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setOpenIndex(0); // auto-open first item in category for immediate readability
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="space-y-3 mb-10">
        {badge && (
          <span className="text-xs font-mono text-[#777777] uppercase tracking-wider block">
            {badge}
          </span>
        )}
        <h2 className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl text-[#ffffff] tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-[#9a9a9a] font-normal leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Category Tabs (React Bits Pro FAQ 3 style) ────────────────── */}
      <div className="relative mb-8 pb-1 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] w-max max-w-full">
          {availableCategories.map((category) => {
            const isActive = activeCategory === category;
            const count =
              category === 'All'
                ? items.length
                : items.filter((item) => item.category === category).length;

            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 shrink-0 select-none ${
                  isActive
                    ? 'text-white'
                    : 'text-[#888888] hover:text-[#cccccc] hover:bg-white/[0.03]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="faq-active-tab"
                    className="absolute inset-0 rounded-xl bg-[#1c1c1e] border border-white/[0.14] shadow-sm shadow-black/40"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
                <span
                  className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-md transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white font-semibold'
                      : 'bg-white/[0.05] text-[#666666]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Accordion List ──────────────────────────────────────────────── */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="space-y-3"
      >
        {filteredItems.map((faq, idx) => {
          const isOpen = openIndex === idx;
          const contentId = `faq-tabbed-content-${idx}`;
          const headerId = `faq-tabbed-header-${idx}`;

          return (
            <div
              key={`${activeCategory}-${idx}`}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-[#0c0c0d] border-white/[0.16] shadow-lg shadow-black/50'
                  : 'bg-[#0a0a0a] border-[#1a1a1a] hover:border-white/[0.1]'
              }`}
            >
              <button
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 select-none group"
              >
                <div className="flex items-center gap-3.5 pr-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 shrink-0" />
                  <span className="text-sm sm:text-base font-medium text-white group-hover:text-white/90 transition-colors">
                    {faq.question}
                  </span>
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isOpen
                      ? 'bg-white/10 border-white/20 text-white rotate-45'
                      : 'bg-white/[0.04] border-white/[0.08] text-[#777777] group-hover:text-white group-hover:border-white/20'
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#9a9a9a] leading-relaxed font-normal border-t border-white/[0.06]">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>

      {/* ── Direct Contact / Support Callout ───────────────────────────── */}
      {showContactCard && (
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#0d0d0e] to-[#0a0a0a] border border-[#1a1a1a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-white">
              Have a question that isn&apos;t covered here?
            </h4>
            <p className="text-xs text-[#888888]">
              Feel free to reach out directly. I respond to inquiries within 24 hours.
            </p>
          </div>
          <a
            href="#contact"
            className="px-5 py-2.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors shrink-0 shadow-sm"
          >
            Get in Touch &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
