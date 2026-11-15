'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { PROJECTS, ProjectItem } from '@/data/portfolioData';

// ─── Floating preview card that follows cursor ────────────────────────────────
function PreviewCard({
  project,
  visible,
  cardRef,
}: {
  project: ProjectItem | null;
  visible: boolean;
  cardRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      ref={cardRef}
      aria-hidden="true"
      className="pointer-events-none fixed z-50 w-[280px] sm:w-[320px] rounded-2xl bg-[#0d0d0d] border border-[#1a1a1a] overflow-hidden shadow-2xl"
      style={{
        opacity: 0,
        top: 0,
        left: 0,
        willChange: 'transform, opacity',
        transform: 'translate(-50%, -110%) scale(0.92)',
      }}
    >
      {/* Image preview */}
      <div className="relative w-full aspect-[16/10] bg-[#030303]">
        {project && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            unoptimized
            className="object-cover object-top"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/80 via-transparent to-transparent" />
      </div>

      {/* Meta */}
      {project && (
        <div className="p-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm font-semibold text-white leading-tight">{project.title}</span>
            <span className="text-[10px] font-mono text-[#777777] shrink-0 mt-0.5">
              {project.year} ■ {project.category}
            </span>
          </div>
          <p className="text-[11px] text-[#9a9a9a] leading-relaxed line-clamp-2">
            {project.description}
          </p>
          {/* Tag pills */}
          <div className="flex flex-wrap gap-1 pt-1">
            {project.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#1a1a1a] text-[#aaadb0]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Single project row ───────────────────────────────────────────────────────
function ProjectRow({
  project,
  index,
  isActive,
  onEnter,
  onLeave,
  onMove,
}: {
  project: ProjectItem;
  index: number;
  isActive: boolean;
  onEnter: (p: ProjectItem, e: React.MouseEvent) => void;
  onLeave: () => void;
  onMove: (e: React.MouseEvent) => void;
}) {
  const isFirst = index === 0;

  return (
    <a
      href={project.liveUrl ?? project.githubUrl ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative"
      onMouseEnter={(e) => onEnter(project, e)}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
    >
      {/* Top border (first row gets one too) */}
      {isFirst && <div className="absolute top-0 inset-x-0 h-[1px] bg-[#1a1a1a]" />}

      <div className="flex items-center justify-between py-5 sm:py-6 lg:py-7 gap-6">
        {/* Left: index dot + title */}
        <div className="flex items-center gap-4 min-w-0">
          {/* Animated accent dot */}
          <span
            className={`shrink-0 w-2 h-2 rounded-full transition-all duration-300 ${
              isActive ? 'bg-white scale-125' : 'bg-[#333333]'
            }`}
          />

          <h3
            className={`font-serif font-normal tracking-tight leading-none transition-colors duration-200 truncate ${
              isActive
                ? 'text-white'
                : 'text-[#555555] group-hover:text-white'
            }`}
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3.5rem)' }}
          >
            {/* Italic serif styling — same as hero */}
            <span className="not-italic">{project.title.split(' ')[0]} </span>
            <span className="italic">
              {project.title.split(' ').slice(1).join(' ')}
            </span>
          </h3>
        </div>

        {/* Right: year ■ category + arrow */}
        <div className="shrink-0 flex items-center gap-4">
          <span
            className={`hidden sm:block text-xs font-mono transition-colors duration-200 whitespace-nowrap ${
              isActive ? 'text-[#aaadb0]' : 'text-[#444444]'
            }`}
          >
            {project.year} ■ {project.category}
          </span>

          <span
            className={`text-lg transition-all duration-200 ${
              isActive
                ? 'text-white translate-x-1 -translate-y-1'
                : 'text-[#333333]'
            }`}
          >
            ↗
          </span>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-[#1a1a1a]" />
    </a>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const cardRef = useRef<HTMLDivElement>(null!);
  const xTo = useRef<((x: number) => void) | null>(null);
  const yTo = useRef<((y: number) => void) | null>(null);
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  // Initialise quickTo smoothers once
  useEffect(() => {
    if (!cardRef.current || prefersReduced) return;
    xTo.current = gsap.quickTo(cardRef.current, 'x', { duration: 0.4, ease: 'power3.out' });
    yTo.current = gsap.quickTo(cardRef.current, 'y', { duration: 0.4, ease: 'power3.out' });
  }, [prefersReduced]);

  const showCard = useCallback(
    (project: ProjectItem, e: React.MouseEvent) => {
      setActiveProject(project);
      if (!cardRef.current || prefersReduced) return;

      // Position card at cursor immediately (no lag on first enter)
      gsap.set(cardRef.current, { x: e.clientX, y: e.clientY });

      gsap.to(cardRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: 'back.out(1.4)',
        overwrite: true,
      });
    },
    [prefersReduced]
  );

  const hideCard = useCallback(() => {
    setActiveProject(null);
    if (!cardRef.current || prefersReduced) return;
    gsap.to(cardRef.current, {
      opacity: 0,
      scale: 0.92,
      duration: 0.2,
      ease: 'power2.in',
      overwrite: true,
    });
  }, [prefersReduced]);

  const moveCard = useCallback((e: React.MouseEvent) => {
    if (!xTo.current || !yTo.current) return;
    xTo.current(e.clientX);
    yTo.current(e.clientY);
  }, []);

  return (
    <section id="projects" className="py-20 sm:py-28 border-b border-[#1a1a1a]">
      {/* ── Section header ── */}
      <div className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div className="space-y-2">
          <span className="text-xs font-mono text-[#777777] uppercase tracking-wider">
            04 • Portfolio
          </span>
          <h2 className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            Selected <span className="italic">Work.</span>
          </h2>
        </div>

        {/* Bracket label — matching the reference UI */}
        <span className="text-xs font-mono text-[#555555] tracking-wider whitespace-nowrap">
          [ Selected work ■ 2023 – 2026 ]
        </span>
      </div>

      {/* ── Editorial list ── */}
      <div>
        {PROJECTS.map((project, i) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={i}
            isActive={activeProject?.id === project.id}
            onEnter={showCard}
            onLeave={hideCard}
            onMove={moveCard}
          />
        ))}
      </div>

      {/* ── Floating preview card (portal-like, fixed position) ── */}
      <PreviewCard project={activeProject} visible={!!activeProject} cardRef={cardRef} />
    </section>
  );
}
