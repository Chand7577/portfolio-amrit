'use client';

import React, { useState, useEffect, useRef } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [displayedLine1, setDisplayedLine1] = useState('');
  const [displayedLine2, setDisplayedLine2] = useState('');
  const [displayedLine3, setDisplayedLine3] = useState('');
  const [activeLine, setActiveLine] = useState<1 | 2 | 3 | 4>(1);
  const [isFinished, setIsFinished] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const line1 = 'Amrit is still developing this site.';
  const line2 = 'Feel free to share your feedback.';
  const line3 = '“UIs are not made in one iteration anyway.”';

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const dismiss = () => {
    if (isExiting || isHidden) return;
    setIsExiting(true);
    setTimeout(() => {
      setIsHidden(true);
      if (onComplete) onComplete();
    }, 850);
  };

  useEffect(() => {
    // Check if user already saw the preloader in this tab session
    const seen = typeof window !== 'undefined' ? sessionStorage.getItem('amrit_preloader_seen') : null;
    if (seen === 'true') {
      setIsHidden(true);
      if (onComplete) onComplete();
      return;
    }

    let charIdx = 0;

    // Type Line 1
    const typeLine1 = () => {
      if (charIdx <= line1.length) {
        setDisplayedLine1(line1.slice(0, charIdx));
        charIdx++;
        typingTimeoutRef.current = setTimeout(typeLine1, 32);
      } else {
        setActiveLine(2);
        charIdx = 0;
        typingTimeoutRef.current = setTimeout(typeLine2, 380);
      }
    };

    // Type Line 2
    const typeLine2 = () => {
      if (charIdx <= line2.length) {
        setDisplayedLine2(line2.slice(0, charIdx));
        charIdx++;
        typingTimeoutRef.current = setTimeout(typeLine2, 28);
      } else {
        setActiveLine(3);
        charIdx = 0;
        typingTimeoutRef.current = setTimeout(typeLine3, 380);
      }
    };

    // Type Line 3
    const typeLine3 = () => {
      if (charIdx <= line3.length) {
        setDisplayedLine3(line3.slice(0, charIdx));
        charIdx++;
        typingTimeoutRef.current = setTimeout(typeLine3, 34);
      } else {
        setActiveLine(4);
        setIsFinished(true);
        try {
          sessionStorage.setItem('amrit_preloader_seen', 'true');
        } catch {}
        // Auto-dismiss after reading pause
        typingTimeoutRef.current = setTimeout(() => {
          dismiss();
        }, 1600);
      }
    };

    typingTimeoutRef.current = setTimeout(typeLine1, 350);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
        dismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (isHidden) return null;

  return (
    <div
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Preloader Introduction"
      className={`fixed inset-0 z-[99999] bg-[#030303] text-white flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none cursor-pointer transition-transform duration-800 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isExiting ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{
        transitionDuration: '850ms',
      }}
    >
      {/* Subtle ambient lighting */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 45%, rgba(255, 255, 255, 0.035) 0%, transparent 70%)',
        }}
      />

      {/* ── Top Bar ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full flex items-center justify-between text-xs font-mono tracking-wider">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[#888888] uppercase tracking-[0.16em]">
            AMRIT CHAND &bull; DEV LOG
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dismiss();
          }}
          className="px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.04] text-[#aaaaaa] hover:text-white transition-all text-[11px] font-mono flex items-center gap-1.5 active:scale-95"
        >
          <span>{isFinished ? 'Enter Site ↵' : 'Skip ↵'}</span>
        </button>
      </div>

      {/* ── Center: Enlarged Typing Typography ──────────────────────────── */}
      <div className="relative z-10 max-w-4xl mx-auto w-full my-auto space-y-6 sm:space-y-8 py-8">
        {/* Line 1: Primary notice */}
        <div className="min-h-[2.5rem] sm:min-h-[4rem]">
          <h1 className="font-serif font-normal text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight">
            {displayedLine1}
            {activeLine === 1 && (
              <span className="inline-block w-1.5 sm:w-2 h-8 sm:h-12 ml-2 bg-emerald-400 animate-pulse align-middle" />
            )}
          </h1>
        </div>

        {/* Line 2: Invitation for feedback */}
        <div className="min-h-[2rem] sm:min-h-[3.2rem]">
          <p className="font-serif italic font-normal text-xl sm:text-3xl md:text-4xl text-[#9a9a9a] leading-relaxed">
            {displayedLine2}
            {activeLine === 2 && (
              <span className="inline-block w-1.5 sm:w-2 h-6 sm:h-9 ml-2 bg-emerald-400 animate-pulse align-middle" />
            )}
          </p>
        </div>

        {/* Line 3: Signature quote */}
        <div className="min-h-[3rem] sm:min-h-[4.5rem] pt-4 border-t border-white/[0.08]">
          <blockquote className="font-serif font-normal text-2xl sm:text-4xl md:text-5xl text-[#e5e5e5] tracking-tight leading-snug">
            {displayedLine3}
            {activeLine === 3 && (
              <span className="inline-block w-1.5 sm:w-2 h-7 sm:h-11 ml-2 bg-emerald-400 animate-pulse align-middle" />
            )}
          </blockquote>
          {activeLine >= 3 && displayedLine3.length > 20 && (
            <p className="mt-3 text-xs sm:text-sm font-mono tracking-widest text-emerald-400 uppercase font-semibold">
              &mdash; Amrit Chand
            </p>
          )}
        </div>
      </div>

      {/* ── Bottom Bar ───────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full flex items-center justify-between text-xs font-mono text-[#666666] pt-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="text-[11px] text-[#888888]">
            {isFinished ? 'Ready' : 'Rendering workspace...'}
          </span>
        </div>

        <div className="text-[11px] text-[#666666] hover:text-[#999999] transition-colors">
          Click anywhere to continue &rarr;
        </div>
      </div>
    </div>
  );
}
