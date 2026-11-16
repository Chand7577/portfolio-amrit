'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CONTACT_INFO, PROJECTS } from '@/data/portfolioData';
import ShinyText from '@/components/ui/ShinyText';
import StarBorder from '@/components/ui/StarBorder';
import Magnet from '@/components/ui/Magnet';
import ScrollVelocity from '@/components/ui/ScrollVelocity';

// ─── Animated counter ─────────────────────────────────────────────────────────
function useCounter(target: number, duration: number, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTs: number | null = null;
    const raf = requestAnimationFrame(function step(ts) {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    });
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);
  return count;
}

export default function HeroSection() {
  const [mounted, setMounted]                   = useState(false);
  const [countersStarted, setCountersStarted]   = useState(false);
  const [isMobile, setIsMobile]                 = useState(false);
  const portraitRef = useRef<HTMLDivElement>(null);

  const count2 = useCounter(2, 1200, countersStarted);
  const projectTarget = Math.max(PROJECTS.length, 8);
  const countProjects = useCounter(projectTarget, 1500, countersStarted);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(() => setCountersStarted(true), 500);
    return () => clearTimeout(t);
  }, [mounted]);

  // Scroll parallax on portrait
  useEffect(() => {
    const el = portraitRef.current;
    if (!el) return;
    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * 0.14}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fadeUp = (delay: number, extra = '') =>
    `${extra} transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${
      mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    }`;
  const delay = (ms: number): React.CSSProperties => ({
    transitionDelay: mounted ? `${ms}ms` : '0ms',
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800;900&display=swap');

        .orv-display { font-family: 'Archivo', system-ui, sans-serif; }

        /* Heading rise animation */
        @keyframes orv-rise {
          from { transform: translateY(110%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .orv-clip  { overflow: hidden; display: block; }
        .orv-word  { display: block; transform: translateY(110%); opacity: 0; }
        .orv-word.in { animation: orv-rise 0.9s cubic-bezier(.22,1,.36,1) forwards; }

        /* Seamless portrait mask: 100% solid over head & hood so letters hide cleanly behind it */
        .orv-portrait-wrap {
          mask-image: radial-gradient(ellipse 48% 54% at 50% 42%, #000 46%, rgba(0, 0, 0, 0.92) 58%, rgba(0, 0, 0, 0.4) 72%, transparent 86%);
          -webkit-mask-image: radial-gradient(ellipse 48% 54% at 50% 42%, #000 46%, rgba(0, 0, 0, 0.92) 58%, rgba(0, 0, 0, 0.4) 72%, transparent 86%);
        }

        /* Alpha fade to smoothly blend photo bottom into canvas with zero grey halo */
        .orv-portrait-fade {
          mask-image: linear-gradient(to bottom, #000 55%, rgba(0, 0, 0, 0.8) 72%, rgba(0, 0, 0, 0.2) 90%, transparent 98%);
          -webkit-mask-image: linear-gradient(to bottom, #000 55%, rgba(0, 0, 0, 0.8) 72%, rgba(0, 0, 0, 0.2) 90%, transparent 98%);
        }

        /* Solid dark backing behind head/hood so text from z-[5] never shines through the hood */
        .orv-portrait-backing {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 42% 48% at 50% 40%, #030303 55%, transparent 78%);
          z-index: 0;
          pointer-events: none;
        }

        /* Bottom vignette to blend into hero base */
        .orv-portrait-bottom {
          position: absolute; inset: 0;
          background: linear-gradient(to top, #030303 0%, transparent 50%);
          z-index: 3; pointer-events: none;
        }

        /* Progress bar draw */
        @keyframes orv-draw { from { width: 0% } to { width: 100% } }
        .orv-progress {
          animation: orv-draw 1.8s cubic-bezier(.4,0,.2,1) forwards;
          animation-delay: 1.1s;
          width: 0;
        }

        /* Button hover lift */
        .orv-btn { transition: transform .2s ease; }
        .orv-btn:hover { transform: translateY(-2px); }
        .orv-arrow { display: inline-block; transition: transform .25s ease; }
        .orv-btn:hover .orv-arrow { transform: rotate(-45deg); }

        /* Latest project image zoom */
        .orv-q-img { overflow: hidden; }
        .orv-q-img img { transition: transform .5s cubic-bezier(.22,1,.36,1); }
        .orv-q-img:hover img { transform: scale(1.06); }

        @media (prefers-reduced-motion: reduce) {
          .orv-word.in            { animation: none; transform: none; opacity: 1; }
          .orv-progress           { animation: none; width: 100%; }
          .orv-btn:hover          { transform: none; }
          .orv-btn:hover .orv-arrow { transform: none; }
          .orv-q-img:hover img    { transform: none; }
        }

        /* ── Mobile ────────────────────────────────────────────────────────── */
        @media (max-width: 768px) {
          #home {
            min-height: 100svh !important;
            height: 100svh !important;
          }
          .orv-panel-stats  { display: none !important; }
          .orv-panel-latest { display: none !important; }
          .orv-panel-avail  { display: none !important; }
          .orv-brandplate   { display: none !important; }

          /* Centered, elevated portrait on mobile with clean proportions */
          .orv-portrait-wrap {
            width: clamp(280px, 86vw, 380px) !important;
            height: clamp(340px, 50svh, 450px) !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            top: 56px !important;
            bottom: auto !important;
            mask-image: radial-gradient(ellipse 52% 58% at 50% 46%, #000 48%, rgba(0, 0, 0, 0.9) 62%, transparent 88%) !important;
            -webkit-mask-image: radial-gradient(ellipse 52% 58% at 50% 46%, #000 48%, rgba(0, 0, 0, 0.9) 62%, transparent 88%) !important;
          }

          .orv-portrait-bottom {
            background: linear-gradient(to top, #030303 0%, rgba(3, 3, 3, 0.7) 35%, transparent 65%) !important;
          }

          /* Velocity text passes right behind the hood on mobile */
          .orv-velocity-wrap {
            top: clamp(140px, 20svh, 175px) !important;
          }

          /* Compact, centered about/CTA block at screen bottom */
          .orv-about-block {
            left: 16px !important;
            right: 16px !important;
            bottom: clamp(16px, 2.5svh, 24px) !important;
            top: auto !important;
            max-width: none !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            z-index: 25 !important;
          }

          .orv-about-block p {
            font-size: 12px !important;
            max-width: 320px !important;
            margin-bottom: 10px !important;
            line-height: 1.35 !important;
          }

          .orv-about-block .cta-container {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 10px !important;
          }
        }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO ROOT — dark bg, sticky so SlideUpContent can rise over it
      ════════════════════════════════════════════════════════════════════ */}
      <section
        id="home"
        className="relative w-full overflow-hidden sticky top-0 z-10 bg-[#030303] h-[100svh] md:min-h-[938px]"
        aria-label="Hero"
      >

        {/* Subtle ambient top glow */}
        <div
          aria-hidden
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse 60% 42% at 50% 0%, rgba(255,255,255,0.025) 0%, transparent 100%)',
          }}
        />

        {/* ══════════════════════════════════════════════════════════════════
            AMRIT CHAND BRAND BADGE — top center, above portrait
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          className={`orv-brandplate absolute z-[25] flex items-center justify-between px-5 rounded-2xl ${fadeUp(300)}`}
          style={{
            top: '88px',
            left: '57px',
            width: 'clamp(200px, 22vw, 310px)',
            height: '56px',
            background: 'rgba(10,10,10,0.82)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.09)',
            ...delay(300),
          }}
        >
          <div className="flex items-center gap-2.5">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <polygon points="10,1 19,19 1,19" fill="none" stroke="white" strokeWidth="1.5" />
              <polygon points="10,7 15.5,17 4.5,17" fill="white" opacity="0.35" />
            </svg>
            <span className="orv-display text-white font-semibold tracking-[0.14em] uppercase" style={{ fontSize: '13px' }}>
              AMRIT CHAND
            </span>
          </div>
          <div className="flex flex-col gap-[5px] opacity-50" aria-hidden="true">
            <span className="block w-5 h-[1.5px] bg-white rounded" />
            <span className="block w-3.5 h-[1.5px] bg-white rounded" />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            SCROLL VELOCITY — "FULL STACK DEVELOPER" moving continuously
            from behind the central portrait from left to right
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          className={`orv-velocity-wrap absolute z-[5] left-0 right-0 w-full select-none pointer-events-none overflow-hidden ${fadeUp(200)}`}
          style={{ top: isMobile ? '180px' : 'clamp(210px, 30vh, 290px)', ...delay(200) }}
          aria-hidden="true"
        >
          <ScrollVelocity
            texts={['FULL STACK DEVELOPER']}
            velocity={70}
            numCopies={8}
            separator="—"
            gap={48}
            fadeEdges={true}
            fontSize={isMobile ? 'clamp(44px, 12vw, 72px)' : 'clamp(64px, 9.5vw, 136px)'}
            fontWeight={800}
            skewWithVelocity={8}
            className="orv-display uppercase tracking-[-0.04em] text-white/[0.24] drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            ABOUT / CTA BLOCK — bottom left, spaced well below heading
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          className={`orv-about-block absolute z-20 ${fadeUp(360)}`}
          style={isMobile ? {
            left: '16px',
            right: '16px',
            bottom: '20px',
            top: 'auto',
            maxWidth: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            ...delay(360),
          } : { left: '57px', bottom: '72px', maxWidth: '260px', ...delay(360) }}
        >
          {/* Availability */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
            <ShinyText
              text={CONTACT_INFO.availability}
              speed={4.5}
              className="text-[11px] font-mono font-medium tracking-wide text-[#aaadb0]"
            />
          </div>

          {/* Tagline */}
          <p className="text-[13px] text-[#9a9a9a] leading-snug font-normal mb-5">
            I build fast, scalable web applications with clean code and
            modern engineering practices.
          </p>

          {/* CTAs — clean row on mobile, stacked column on desktop */}
          <div className="cta-container flex flex-col gap-3">
            <div>
              <StarBorder href="#projects" speed="4.5s">
                <span className="text-xs">Explore My Work</span>
                <span className="text-xs font-mono ml-1">↗</span>
              </StarBorder>
            </div>
            <Magnet magnetStrength={0.25} padding={70}>
              <a
                href="#contact"
                className="inline-flex items-center justify-center min-h-[38px] px-5 py-2 rounded-lg bg-white text-[#0c0d0e] border border-black/15 font-semibold text-xs hover:bg-neutral-100 dark:bg-[#0a0a0a]/90 dark:text-white dark:border-[#1a1a1a] dark:hover:bg-[#1a1a1a]/60 dark:hover:border-white/40 backdrop-blur-sm transition-all shadow-sm dark:shadow-none"
              >
                Let&apos;s Work Together
              </a>
            </Magnet>
          </div>

          {/* Tech line */}
          <p className="text-[10px] font-mono text-[#444] mt-4 tracking-wide">
            React · Next.js · Node.js · MongoDB · PostgreSQL
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            CENTRAL PORTRAIT — my photo, centrally placed, parallax
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          className={`orv-portrait-wrap absolute z-10 overflow-hidden pointer-events-none select-none transition-all duration-1000 ease-[cubic-bezier(.22,1,.36,1)] ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
          style={isMobile ? {
            left: '50%',
            top: '56px',
            transform: 'translateX(-50%)',
            width: '100vw',
            height: '65svh',
            bottom: 'auto',
            transitionDelay: mounted ? '180ms' : '0ms',
            maskImage: 'radial-gradient(ellipse 55% 62% at 50% 44%, #000 50%, rgba(0,0,0,0.85) 65%, transparent 88%)',
            WebkitMaskImage: 'radial-gradient(ellipse 55% 62% at 50% 44%, #000 50%, rgba(0,0,0,0.85) 65%, transparent 88%)',
          } : {
            left: '50%',
            top: '-24px',
            transform: 'translateX(-50%)',
            width: 'clamp(320px, 52vw, 760px)',
            height: 'clamp(440px, 76vw, 1020px)',
            transitionDelay: mounted ? '180ms' : '0ms',
          }}
        >
          {/* Solid black backing behind hood so moving letters cleanly hide behind Amrit */}
          <div className="orv-portrait-backing" aria-hidden="true" />

          <div ref={portraitRef} className="orv-portrait-fade w-full h-full will-change-transform relative z-[1]">
            <picture>
              <source srcSet="/cinematic/hero-portrait.webp" type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cinematic/hero-portrait.png"
                alt="Amrit Chand — Full-Stack Developer"
                className="w-full h-full object-cover"
                style={{ objectPosition: 'center 35%' }}
                loading="eager"
              />
            </picture>
          </div>
          <div className="orv-portrait-bottom" aria-hidden="true" />
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            RIGHT COLUMN — Open to Work pill + Available + Stats + Latest
        ═══════════════════════════════════════════════════════════════════ */}

        {/* Open to Work pill */}
        <div
          className={`orv-panel-avail absolute z-20 ${fadeUp(420)}`}
          style={{ right: '48px', top: '100px', ...delay(420) }}
        >
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M2 5.2L4 7.2L8 3.2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[11px] font-semibold text-white">Open to Work</span>
          </div>
        </div>

        {/* ── Achievements / Stats card — BOTTOM RIGHT ──────────────────── */}
        <div
          className={`orv-panel-stats absolute z-20 ${fadeUp(560)}`}
          style={{ right: '48px', bottom: '200px', ...delay(560) }}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              width: 'clamp(190px, 15vw, 224px)',
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Counters */}
            <div className="p-4">
              <div className="flex items-end gap-5 mb-1">
                <div>
                  <span className="orv-display text-2xl font-black text-white">{count2}+</span>
                  <span className="block text-[9px] font-semibold text-[#666] uppercase tracking-widest mt-0.5">
                    Years exp
                  </span>
                </div>
                <div>
                  <span className="orv-display text-2xl font-black text-white">{countProjects}+</span>
                  <span className="block text-[9px] font-semibold text-[#666] uppercase tracking-widest mt-0.5">
                    Projects
                  </span>
                </div>
              </div>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-x-2 gap-y-1 mt-3 mb-3">
                {['React', 'Next.js', 'Node', 'MongoDB', 'TS', 'SQL'].map((t) => (
                  <span key={t} className="text-[9px] font-semibold text-[#555] uppercase tracking-wide">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href="#contact"
                className="orv-btn inline-flex items-center gap-1.5 bg-white text-[#111] text-[10px] font-bold px-3 py-1.5 rounded-full"
              >
                <span>Book a Call</span>
                <span className="orv-arrow text-[9px]">↗</span>
              </a>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-white/10" />

            {/* Availability row */}
            <div className="px-4 py-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              <span className="text-[11px] text-[#9a9a9a] font-medium">Available for opportunities</span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            SCROLL CUE — bottom center
        ═══════════════════════════════════════════════════════════════════ */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1.5 text-xs font-mono text-[#444] ${fadeUp(900)}`}
          style={delay(900)}
        >
          <span className="tracking-widest uppercase text-[10px]">Scroll</span>
          <span className="animate-bounce text-[#333]">↓</span>
        </div>

      </section>
    </>
  );
}
