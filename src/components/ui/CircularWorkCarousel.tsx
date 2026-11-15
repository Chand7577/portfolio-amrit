'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

export interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  domain: string;
  url: string;
  displayUrl: string;
  image: string;
  desc: string;
  stack: string[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'drjpnaut',
    name: 'Dr. JP Nautiyal Clinic',
    tagline: 'AI Repertory & Patient Diagnostic Platform',
    domain: 'Healthcare & Clinical AI',
    url: 'https://drjpnauthomeopath.in',
    displayUrl: 'drjpnauthomeopath.in',
    image: '/projects/drjpnaut.png',
    desc: 'Full-stack clinical diagnosis platform that extracts symptoms from patient narratives and ranks remedies using Google Gemini 1.5 and Groq LLMs with in-browser Materia Medica library.',
    stack: ['React', 'Next.js', 'Gemini AI', 'Groq', 'MongoDB', 'Supabase'],
  },
  {
    id: 'flatout',
    name: 'FlatOut Motors & Gear',
    tagline: 'High-Octane Automotive & Biking Gear',
    domain: 'Automotive & E-Commerce',
    url: 'https://flatout13.netlify.app',
    displayUrl: 'flatout13.netlify.app',
    image: '/projects/flatout.png',
    desc: 'Performance tuning and premium riding gear showcase platform featuring interactive equipment specs, telemetry displays, and booking pipeline.',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Netlify'],
  },
  {
    id: 'ochno',
    name: 'Ochnology',
    tagline: 'Modern Architecture & Hardware Platform',
    domain: 'Design Studio & Tech',
    url: 'https://www.ochnology.com/',
    displayUrl: 'ochnology.com',
    image: '/projects/ochno.png',
    desc: 'Agency and product platform showcasing architectural technology, smart conference room automation systems, and luxury interior hardware designs.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
  },
  {
    id: 'ctst',
    name: 'CTST Consultants',
    tagline: 'Corporate Solutions & Cloud Infrastructure Portal',
    domain: 'Enterprise Cloud & SaaS',
    url: 'https://www.ctstconsultants.com/',
    displayUrl: 'ctstconsultants.com',
    image: '/projects/ctst.png',
    desc: 'Enterprise technology portal providing cloud migration case studies, service tier dashboards, technical consulting booking, and security whitepapers.',
    stack: ['React', 'Next.js', 'REST APIs', 'Tailwind CSS'],
  },
  {
    id: 'rekem',
    name: 'Rekem Healthcare',
    tagline: 'Healthcare & Medical Solutions Platform',
    domain: 'Healthcare & Medical Devices',
    url: 'https://www.rekemhealthcare.com/',
    displayUrl: 'rekemhealthcare.com',
    image: '/projects/test-wait.png',
    desc: 'Digital portal and corporate platform for healthcare technology, medical equipment distribution, diagnostic clinical solutions, and institutional supply chains.',
    stack: ['React', 'Next.js', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    id: 'jmmt',
    name: 'JMMT Foundation',
    tagline: 'Community Healthcare & Education Trust',
    domain: 'Non-Profit & Healthcare',
    url: 'https://jmmt.org.in',
    displayUrl: 'jmmt.org.in',
    image: '/projects/jmmt.png',
    desc: 'Official digital portal for healthcare trust initiatives, donor outreach programs, scholarship applications, and community outreach documentation.',
    stack: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Cloudflare'],
  },
  {
    id: 'ecomm',
    name: 'STRYDE Footwear',
    tagline: 'Premium Footwear & Retail Experience',
    domain: 'E-Commerce & Retail',
    url: 'https://ecomm1326.netlify.app',
    displayUrl: 'ecomm1326.netlify.app',
    image: '/projects/ecomm.png',
    desc: 'High-converting sneaker store web application with dynamic product filtering, cart persistence, responsive catalog layouts, and sleek micro-interactions.',
    stack: ['React', 'Tailwind CSS', 'Node.js', 'Vite'],
  },
  {
    id: 'kulfi',
    name: 'Porto Artisan Hub',
    tagline: 'Interactive Culinary & Brand Showcase',
    domain: 'Food & Culinary Brand',
    url: 'https://euphonious-kulfi-19377f.netlify.app',
    displayUrl: 'euphonious-kulfi.netlify.app',
    image: '/projects/kulfi.png',
    desc: 'Vibrant showcase landing page featuring animated culinary menus, visual brand storytelling, and interactive customer inquiry workflows.',
    stack: ['React', 'CSS3 Animations', 'Responsive UI', 'Netlify'],
  },
];

export default function CircularWorkCarousel() {
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const dragStartX = useRef(0);
  const currentRotation = useRef(0);
  const targetRotation = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const total = PROJECTS.length;
  const anglePerItem = 360 / total; // ~51.42 deg
  const cylinderRadius = 380; // Scaled comfortably so cards do not blow up

  // Smooth lerp loop for 60fps rotation
  useEffect(() => {
    const loop = () => {
      currentRotation.current +=
        (targetRotation.current - currentRotation.current) * 0.1;
      setRotation(currentRotation.current);

      // Determine active item based on normalized target angle
      const normalizedAngle =
        ((-targetRotation.current % 360) + 360) % 360;
      const index = Math.round(normalizedAngle / anglePerItem) % total;
      setActiveIndex((index + total) % total);

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [anglePerItem, total]);

  const rotateTo = useCallback(
    (index: number) => {
      const targetAngle = -index * anglePerItem;
      const current = targetRotation.current;
      const diff = ((targetAngle - current) % 360 + 540) % 360 - 180;
      targetRotation.current = current + diff;
    },
    [anglePerItem]
  );

  const handlePrev = useCallback(() => {
    targetRotation.current += anglePerItem;
  }, [anglePerItem]);

  const handleNext = useCallback(() => {
    targetRotation.current -= anglePerItem;
  }, [anglePerItem]);

  // Automated gentle rotation of the carousel every 5.5s
  useEffect(() => {
    if (isDragging || isHovered) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      targetRotation.current -= anglePerItem;
    }, 5500);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isDragging, isHovered, anglePerItem]);

  // Drag / swipe handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    dragStartX.current = e.clientX;
    targetRotation.current += deltaX * 0.35;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const snapped =
      Math.round(targetRotation.current / anglePerItem) * anglePerItem;
    targetRotation.current = snapped;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const currentProject = PROJECTS[activeIndex];

  return (
    <div
      className="w-full flex flex-col items-center select-none py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── 3D Circular Carousel Stage ── */}
      <div
        className="relative w-full h-[460px] sm:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible"
        style={{ perspective: '1600px' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* The rotating 3D Cylinder Container */}
        <div
          className="relative w-[300px] sm:w-[340px] h-[390px] sm:h-[430px]"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
          }}
        >
          {PROJECTS.map((project, idx) => {
            const itemAngle = idx * anglePerItem;
            // Angle relative to camera (0 deg = directly facing user)
            const angleDiff =
              ((itemAngle + rotation) % 360 + 540) % 360 - 180;
            const isFront = Math.abs(angleDiff) < 26;
            const isNear = Math.abs(angleDiff) < 85;

            return (
              <div
                key={project.id}
                onClick={() => rotateTo(idx)}
                className={`absolute inset-0 rounded-2xl overflow-hidden transition-all duration-300 ease-out border ${
                  isFront
                    ? 'border-accent/90 shadow-[0_20px_50px_rgba(255,94,20,0.25)] ring-1 ring-accent/40'
                    : 'border-white/[0.08] shadow-2xl hover:border-white/20'
                }`}
                style={{
                  transform: `rotateY(${itemAngle}deg) translateZ(${cylinderRadius}px) scale(${
                    isFront ? 1.0 : isNear ? 0.88 : 0.76
                  })`,
                  backgroundColor: '#191C2C',
                  opacity: isFront ? 1 : isNear ? 0.75 : 0.35,
                  backfaceVisibility: 'hidden',
                  zIndex: isFront ? 40 : Math.round(100 - Math.abs(angleDiff)),
                }}
              >
                {/* ── Browser Mockup Header Bar ── */}
                <div className="h-9 px-3.5 bg-[#121324] border-b border-white/[0.08] flex items-center justify-between shrink-0 z-20 relative">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5E14]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  </div>
                  {/* URL Pill */}
                  <div className="px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[10px] font-mono text-neutral-300 truncate max-w-[170px] sm:max-w-[190px] flex items-center gap-1">
                    <span className="text-emerald-400 text-[10px]">🔒</span>
                    <span>{project.displayUrl}</span>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    title="Open live website"
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>

                {/* ── Auto-Scrolling Viewport Window ── */}
                <div className="relative w-full h-[calc(100%-36px)] overflow-hidden bg-[#121324]">
                  {/* Full Page Website Screenshot that Auto-Scrolls Down */}
                  <div
                    className={`w-full will-change-transform ${
                      isFront ? 'animate-ui-scroll' : ''
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={`${project.name} website UI preview`}
                      width={1440}
                      height={2600}
                      unoptimized
                      priority
                      className="w-full h-auto block object-top"
                      style={{
                        imageRendering: 'auto',
                        WebkitBackfaceVisibility: 'hidden',
                      }}
                    />
                  </div>

                  {/* Top and Bottom soft vignette overlays */}
                  <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-[#121324]/50 to-transparent pointer-events-none" />
                  <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#121324]/80 to-transparent pointer-events-none" />

                  {/* Auto-scroll active indicator on front card */}
                  {isFront && (
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[9px] font-mono text-neutral-300 flex items-center gap-1.5 pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Auto-scrolling UI</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Carousel Controls: Arrows + Indicators ── */}
      <div className="flex items-center justify-center gap-4 mt-2">
        <button
          onClick={handlePrev}
          aria-label="Previous project"
          className="w-9 h-9 rounded-full bg-[#191C2C] border border-white/10 text-white hover:border-accent hover:text-accent transition-colors flex items-center justify-center shadow-lg active:scale-95"
        >
          ←
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#191C2C]/90 border border-white/10 backdrop-blur-sm">
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              onClick={() => rotateTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? 'w-6 bg-accent'
                  : 'w-1.5 bg-white/20 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next project"
          className="w-9 h-9 rounded-full bg-[#191C2C] border border-white/10 text-white hover:border-accent hover:text-accent transition-colors flex items-center justify-center shadow-lg active:scale-95"
        >
          →
        </button>
      </div>

      {/* ── Active Project Details Card ── */}
      <div className="w-full max-w-3xl mt-8 px-4">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#191C2C] border border-white/[0.08] shadow-2xl relative overflow-hidden">
          {/* Accent Glow Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-medium text-accent uppercase tracking-wider">
                  0{activeIndex + 1} &bull; {currentProject.domain}
                </span>
                <span className="text-neutral-500 text-xs">•</span>
                <span className="text-xs font-mono text-emerald-400">Live in production</span>
              </div>

              <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
                {currentProject.name}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                {currentProject.desc}
              </p>

              {/* Technologies */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {currentProject.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#121324] border border-white/[0.06] text-neutral-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Visit Live Button */}
            <div className="sm:self-center shrink-0 pt-2 sm:pt-0">
              <a
                href={currentProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full bg-white text-neutral-950 font-medium text-xs sm:text-sm hover:bg-neutral-100 transition-all duration-200 shadow-md active:scale-98"
              >
                <span>Visit live website</span>
                <span className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
