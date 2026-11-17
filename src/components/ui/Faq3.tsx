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
      <style>{`
        .faq-tabs-scroll::-webkit-scrollbar { display: none; }
      `}</style>
      <div
        className="faq-tabs-scroll relative mb-8 pb-1 overflow-x-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-neutral-100 border border-neutral-200 dark:bg-[#0a0a0a] dark:border-[#1a1a1a] w-max max-w-full">
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
                    ? 'text-[#0c0d0e] dark:text-white'
                    : 'text-[#6b7280] hover:text-[#0c0d0e] hover:bg-black/5 dark:text-[#888888] dark:hover:text-[#cccccc] dark:hover:bg-white/[0.03]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="faq-active-tab"
                    className="absolute inset-0 rounded-xl bg-white border border-black/10 shadow-sm dark:bg-[#1c1c1e] dark:border-white/[0.14] dark:shadow-black/40"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 font-medium">{category}</span>
                <span
                  className={`relative z-10 text-[10px] font-mono px-1.5 py-0.5 rounded-md transition-colors ${
                    isActive
                      ? 'bg-black/5 text-[#0c0d0e] dark:bg-white/20 dark:text-white font-semibold'
                      : 'bg-black/[0.04] text-[#6b7280] dark:bg-white/[0.05] dark:text-[#666666]'
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
                  ? 'bg-white border-black/15 shadow-md shadow-black/5 dark:bg-[#0c0c0d] dark:border-white/[0.16] dark:shadow-lg dark:shadow-black/50'
                  : 'bg-white/70 border-black/10 hover:border-black/20 hover:bg-white dark:bg-[#0a0a0a] dark:border-[#1a1a1a] dark:hover:border-white/[0.1]'
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
                  <span className="text-sm sm:text-base font-medium text-[#0c0d0e] dark:text-white group-hover:text-black dark:group-hover:text-white/90 transition-colors">
                    {faq.question}
                  </span>
                </div>

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isOpen
                      ? 'bg-neutral-100 border-black/15 text-[#0c0d0e] dark:bg-white/10 dark:border-white/20 dark:text-white rotate-45'
                      : 'bg-neutral-50 border-black/10 text-neutral-500 group-hover:text-[#0c0d0e] group-hover:border-black/20 dark:bg-white/[0.04] dark:border-white/[0.08] dark:text-[#777777] dark:group-hover:text-white dark:group-hover:border-white/20'
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
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#52525b] dark:text-[#9a9a9a] leading-relaxed font-normal border-t border-black/5 dark:border-white/[0.06]">
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
        <div className="mt-10 p-6 rounded-2xl bg-neutral-100 border border-neutral-200 dark:bg-gradient-to-r dark:from-[#0d0d0e] dark:to-[#0a0a0a] dark:border-[#1a1a1a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm dark:shadow-none">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-[#0c0d0e] dark:text-white">
              Have a question that isn&apos;t covered here?
            </h4>
            <p className="text-xs text-[#52525b] dark:text-[#888888]">
              Feel free to reach out directly. I respond to inquiries within 24 hours.
            </p>
          </div>
          <a
            href="#contact"
            className="faq-contact-btn px-5 py-2.5 rounded-xl bg-[#0c0d0e] text-white hover:bg-neutral-800 dark:bg-white dark:text-[#030303] dark:hover:bg-neutral-200 text-xs font-semibold transition-colors shrink-0 shadow-sm"
          >
            Get in Touch &rarr;
          </a>
        </div>
      )}
    </div>
  );
}
