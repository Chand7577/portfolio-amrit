'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';

const Folder = dynamic(() => import('@/components/ui/Folder'), {
  ssr: false,
});

interface FileDetail {
  id: string;
  tag: string;
  title: string;
  role: string;
  badge: string;
  shortSummary: string;
  fullBio: string[];
  bulletPoints: string[];
  techPills: string[];
}

const DOSSIER_FILES: FileDetail[] = [
  {
    id: 'FILE 01',
    tag: 'IDENTITY',
    title: 'Who I Am',
    role: 'Full-Stack Developer',
    badge: 'Based in India • Remote Worldwide',
    shortSummary:
      'Versatile Full Stack Developer with nearly 2 years of experience turning business requirements into scalable web applications and clean user experiences.',
    fullBio: [
      "I'm Amrit Chand, a Full Stack Developer with nearly two years of hands-on production experience building responsive user interfaces, dependable backend architectures, and production-ready web platforms.",
      'I specialize in turning product ideas into reality — from designing modular component architectures in React and Next.js to building high-throughput APIs in Node.js and designing clean database schemas in MongoDB and PostgreSQL.',
      'Whether collaborating with agile remote engineering teams or delivering end-to-end client applications, I bring engineering rigor, transparent async communication, and a focus on maintainable, scalable code.',
    ],
    bulletPoints: [
      'Nearly 2 years shipping web platforms across startups, clinics & businesses',
      'Strong foundation in full-stack JavaScript/TypeScript modern ecosystem',
      'Experience in remote asynchronous team collaboration and client deliveries',
    ],
    techPills: ['Full-Stack', 'Next.js 16', 'React 19', 'TypeScript', 'Node.js'],
  },
  {
    id: 'FILE 02',
    tag: 'EXPERTISE',
    title: 'Technical Focus & Stack',
    role: 'Frontend UI & Backend Architecture',
    badge: 'Modern Web Engineering',
    shortSummary:
      'End-to-end full stack architecture with TypeScript, React 19, Next.js, Node.js, Express, MongoDB, PostgreSQL, and real-time Socket.io.',
    fullBio: [
      'My technical core centers on the modern JavaScript/TypeScript full-stack ecosystem. On the client, I engineer performant, accessible UIs with React 19, Next.js (App Router), Tailwind CSS, Framer Motion, and GSAP.',
      'On the server side, I design RESTful APIs and real-time WebSocket services using Node.js, Express.js, and Django, coupled with MongoDB and PostgreSQL databases managed via robust ORMs and indexing strategies.',
      'I emphasize zero-compromise production fundamentals: secure JWT/OAuth 2.0 authentication, rate limiting, responsive viewport scaling, and optimized bundle sizes.',
    ],
    bulletPoints: [
      'Frontend: React 19, Next.js 16, TypeScript, Tailwind CSS, Framer Motion, GSAP',
      'Backend & APIs: Node.js, Express.js, Django, REST APIs, WebSockets (Socket.io)',
      'Databases & Cloud: MongoDB, PostgreSQL, Supabase, Cloudinary, Netlify, Render',
    ],
    techPills: ['TypeScript', 'React 19', 'Next.js 16', 'Node.js', 'PostgreSQL', 'MongoDB', 'Supabase'],
  },
  {
    id: 'FILE 03',
    tag: 'TRACK RECORD',
    title: 'Production Experience',
    role: 'Proven Track Record',
    badge: 'Nearly 2 Years Shipping Code',
    shortSummary:
      'Shipped 8+ responsive client websites, an AI-powered clinical rubric analyzer with LLMs, Materia Medica digital libraries, and e-commerce checkouts.',
    fullBio: [
      'In client engagements, I architected and shipped a full-stack AI-Powered Rubric Analyzer for medical practitioners (drjpnauthomeopath.in), utilizing Google Gemini and Groq LLMs to extract clinical symptoms and rank remedies with confidence scoring.',
      'Built an in-browser Materia Medica digital library with react-pdf and Tesseract OCR, enabling real-time bilingual search and page-jumping across medical texts.',
      'Previously engineered and launched 8+ client websites with mobile-responsive layouts, built admin dashboard modules, and implemented Razorpay checkout flows for full transaction lifecycles.',
    ],
    bulletPoints: [
      'Architected AI Rubric Analyzer with Gemini & Groq LLMs (drjpnauthomeopath.in)',
      'Engineered in-browser Materia Medica library with OCR & real-time search',
      'Integrated Razorpay payment gateways and end-to-end transaction checkout flows',
      'Built 8+ responsive business platforms reducing bounce rates',
    ],
    techPills: ['AI Rubric Analyzer', 'Gemini & Groq LLMs', 'OCR Engine', 'Razorpay Payments', '8+ Client Sites'],
  },
  {
    id: 'FILE 04',
    tag: 'PHILOSOPHY',
    title: 'Engineering Philosophy',
    role: 'Clean, Scalable, Human-Centric',
    badge: 'Code Quality & User Experience',
    shortSummary:
      'I believe code should be as maintainable as it is fast. Prioritizing modular architectures, fast loading times, and accessible interfaces that scale.',
    fullBio: [
      'Code quality is not just about writing algorithms that work — it is about writing software that other developers can understand, maintain, and build upon months from now.',
      'I prioritize semantic HTML, strict TypeScript typing, reusable component primitives, and modular folder structures. Every interface is built performance-first with minimal re-renders and optimized bundle footprints.',
      'User experience is paramount: silky 60fps animations, accessible contrast ratios, and thoughtful tactile micro-interactions turn everyday tools into memorable digital experiences.',
    ],
    bulletPoints: [
      'Clean Code: Readable, self-documenting TypeScript with modular structure',
      'Performance-First: Fast LCP/FCP, optimized bundle sizes, and lazy evaluation',
      'User-Centric UX: Accessible, responsive across all screen sizes from mobile to 4K',
    ],
    techPills: ['Clean Code', 'Performance First', 'Accessibility', 'Modular Design', 'TypeScript'],
  },
  {
    id: 'FILE 05',
    tag: 'COLLABORATION',
    title: 'Working Together',
    role: 'Full-Time & Freelance',
    badge: 'Immediate Availability',
    shortSummary:
      'Available for full-time engineering roles, technical contracting, and MVP freelance development. Fast turnarounds, transparent communication, and pragmatic execution.',
    fullBio: [
      'I am currently open to full-time engineering roles, high-impact freelance projects, and technical contracting engagements.',
      'When working with me, you get a proactive communicator who asks the right questions early, provides regular milestone demos, and delivers on agreed timelines without friction.',
      'Whether you are building a new MVP from scratch, modernizing an existing web application, or looking for a dependable engineer to join your team, I am ready to contribute from day one.',
    ],
    bulletPoints: [
      'Open for Full-Time Engineering Roles & Technical Contracting',
      'Available for End-to-End MVP Builds & SaaS Development',
      'Direct, proactive async communication with regular milestone demos',
    ],
    techPills: ['Full-Time Roles', 'Freelance Projects', 'MVP Development', 'Remote Worldwide'],
  },
];

export default function AboutSection() {
  const [selectedFileIndex, setSelectedFileIndex] = useState<number | null>(null);
  const [isModalMounted, setIsModalMounted] = useState<boolean>(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const modalCardRef = useRef<HTMLDivElement | null>(null);
  const contentBodyRef = useRef<HTMLDivElement | null>(null);

  // Open modal with seamless FLIP enlargement from the clicked document's exact rect
  const openFileModal = useCallback((index: number) => {
    setSelectedFileIndex(index);
    setIsModalMounted(true);
  }, []);

  // Close modal with smooth shrink back into the exact document slot in the folder
  const closeFileModal = useCallback(() => {
    document.body.style.overflow = '';
    const overlay = overlayRef.current;
    const card = modalCardRef.current;
    const sourceEl =
      selectedFileIndex !== null
        ? (document.querySelector(`[data-folder-item="${selectedFileIndex}"]`) as HTMLElement | null)
        : null;

    if (!overlay || !card) {
      if (sourceEl) sourceEl.style.visibility = '';
      setIsModalMounted(false);
      setSelectedFileIndex(null);
      return;
    }

    gsap.killTweensOf([overlay, card]);

    if (sourceEl) {
      const freshRect = sourceEl.getBoundingClientRect();
      const targetRect = card.getBoundingClientRect();

      const sourceCenterX = freshRect.left + freshRect.width / 2;
      const sourceCenterY = freshRect.top + freshRect.height / 2;
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;

      const deltaX = sourceCenterX - targetCenterX;
      const deltaY = sourceCenterY - targetCenterY;
      const scaleX = freshRect.width / (targetRect.width || 1);
      const scaleY = freshRect.height / (targetRect.height || 1);

      let initialRotateZ = 0;
      try {
        const computed = window.getComputedStyle(sourceEl);
        const transform = computed.transform;
        if (transform && transform !== 'none') {
          const parts = transform.split('(')[1].split(')')[0].split(',');
          const a = parseFloat(parts[0]);
          const b = parseFloat(parts[1]);
          if (!isNaN(a) && !isNaN(b)) {
            initialRotateZ = Math.round(Math.atan2(b, a) * (180 / Math.PI));
          }
        }
      } catch {
        initialRotateZ = 0;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          sourceEl.style.visibility = '';
          setIsModalMounted(false);
          setSelectedFileIndex(null);
        },
      });

      if (contentBodyRef.current) {
        tl.to(
          contentBodyRef.current,
          {
            opacity: 0,
            duration: 0.15,
            ease: 'power2.in',
          },
          0
        );
      }

      tl.to(
        card,
        {
          x: deltaX,
          y: deltaY,
          scaleX: scaleX,
          scaleY: scaleY,
          rotateZ: initialRotateZ,
          borderRadius: 8,
          duration: 0.38,
          ease: 'power3.inOut',
        },
        0
      );

      tl.to(
        overlay,
        {
          opacity: 0,
          duration: 0.28,
          ease: 'power2.in',
        },
        0.05
      );
    } else {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsModalMounted(false);
          setSelectedFileIndex(null);
        },
      });
      tl.to(card, { scale: 0.8, opacity: 0, duration: 0.25, ease: 'power2.in' }, 0);
      tl.to(overlay, { opacity: 0, duration: 0.25, ease: 'power2.in' }, 0);
    }
  }, [selectedFileIndex]);

  // Animate in whenever the modal mounts: start directly from the folder card's position & size
  useEffect(() => {
    if (!isModalMounted || selectedFileIndex === null) return;

    const overlay = overlayRef.current;
    const card = modalCardRef.current;
    if (!overlay || !card) return;

    document.body.style.overflow = 'hidden';

    // Locate the clicked item in the folder
    const sourceEl = document.querySelector(
      `[data-folder-item="${selectedFileIndex}"]`
    ) as HTMLElement | null;

    gsap.killTweensOf([overlay, card]);

    if (sourceEl) {
      const sourceRect = sourceEl.getBoundingClientRect();
      const targetRect = card.getBoundingClientRect();

      // Calculate translation and scale deltas so the card starts exactly where the folder item is
      const sourceCenterX = sourceRect.left + sourceRect.width / 2;
      const sourceCenterY = sourceRect.top + sourceRect.height / 2;
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;

      const deltaX = sourceCenterX - targetCenterX;
      const deltaY = sourceCenterY - targetCenterY;
      const scaleX = sourceRect.width / (targetRect.width || 1);
      const scaleY = sourceRect.height / (targetRect.height || 1);

      let initialRotateZ = 0;
      try {
        const computed = window.getComputedStyle(sourceEl);
        const transform = computed.transform;
        if (transform && transform !== 'none') {
          const parts = transform.split('(')[1].split(')')[0].split(',');
          const a = parseFloat(parts[0]);
          const b = parseFloat(parts[1]);
          if (!isNaN(a) && !isNaN(b)) {
            initialRotateZ = Math.round(Math.atan2(b, a) * (180 / Math.PI));
          }
        }
      } catch {
        initialRotateZ = 0;
      }

      // Hide the source card in the folder so it doesn't look like a duplicate/new card
      sourceEl.style.visibility = 'hidden';

      // Animate overlay backdrop fade-in
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'power2.out' }
      );

      // Animate card expanding smoothly from the source card's exact position & size
      gsap.fromTo(
        card,
        {
          x: deltaX,
          y: deltaY,
          scaleX: scaleX,
          scaleY: scaleY,
          rotateZ: initialRotateZ,
          borderRadius: 8,
          transformOrigin: '50% 50%',
        },
        {
          x: 0,
          y: 0,
          scaleX: 1,
          scaleY: 1,
          rotateZ: 0,
          borderRadius: 16,
          duration: 0.52,
          ease: 'power3.out',
        }
      );

      // Fade in the rich inner content smoothly during expansion
      if (contentBodyRef.current) {
        gsap.fromTo(
          contentBodyRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.35, delay: 0.15, ease: 'power2.out' }
        );
      }
    } else {
      // Fallback if source element not found
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: 'power2.out' }
      );
      gsap.fromTo(
        card,
        { scale: 0.75, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
      );
    }
  }, [isModalMounted, selectedFileIndex]);

  // Navigate files with subtle slide transition
  const navigateFile = useCallback((newIndex: number, direction: 'next' | 'prev') => {
    // Restore previous folder card visibility
    if (selectedFileIndex !== null) {
      const prevSource = document.querySelector(
        `[data-folder-item="${selectedFileIndex}"]`
      ) as HTMLElement | null;
      if (prevSource) prevSource.style.visibility = '';
    }

    // Hide target folder card so there's never a duplicate card visible underneath
    const nextSource = document.querySelector(
      `[data-folder-item="${newIndex}"]`
    ) as HTMLElement | null;
    if (nextSource) nextSource.style.visibility = 'hidden';

    if (contentBodyRef.current) {
      gsap.fromTo(
        contentBodyRef.current,
        {
          x: direction === 'next' ? 24 : -24,
          opacity: 0.3,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.28,
          ease: 'power2.out',
        }
      );
    }
    setSelectedFileIndex(newIndex);
  }, [selectedFileIndex]);

  // Close on Escape or switch with arrow keys
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isModalMounted) return;

      if (e.key === 'Escape') {
        closeFileModal();
      } else if (e.key === 'ArrowRight') {
        const next = ((selectedFileIndex ?? 0) + 1) % DOSSIER_FILES.length;
        navigateFile(next, 'next');
      } else if (e.key === 'ArrowLeft') {
        const prev =
          (selectedFileIndex ?? 0) === 0 ? DOSSIER_FILES.length - 1 : (selectedFileIndex ?? 0) - 1;
        navigateFile(prev, 'prev');
      }
    },
    [isModalMounted, selectedFileIndex, closeFileModal, navigateFile]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Safety cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.querySelectorAll('[data-folder-item]').forEach((el) => {
        (el as HTMLElement).style.visibility = '';
      });
    };
  }, []);

  const activeFile = selectedFileIndex !== null ? DOSSIER_FILES[selectedFileIndex] : null;

  // Items passed to Folder (compact document cards)
  const folderItems = DOSSIER_FILES.map((file) => ({
    content: (
      <div
        key={file.id}
        className="w-full h-full p-4 sm:p-4.5 flex flex-col justify-between select-none bg-gradient-to-b from-[#13141c] to-[#0c0d12] text-white border border-white/10 rounded-[6px] shadow-lg cursor-pointer hover:border-sky-400/50 transition-colors"
      >
        <div className="space-y-2">
          {/* Document Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-sky-400 font-bold">
                {file.id} &bull; {file.tag}
              </span>
            </div>
            <span className="font-mono text-[8px] text-[#555555] tracking-tight">
              AMRIT CHAND
            </span>
          </div>

          {/* Title & Role */}
          <div>
            <h4 className="font-heading font-semibold text-sm sm:text-base text-white tracking-tight leading-snug">
              {file.title}
            </h4>
            <p className="text-[10px] font-mono text-[#8b929a] mt-0.5">
              {file.role}
            </p>
          </div>

          {/* Descriptive Body */}
          <p className="text-[11px] text-[#b0b4ba] leading-relaxed line-clamp-4 font-normal">
            {file.shortSummary}
          </p>
        </div>

        {/* Footer Pill Tags */}
        <div className="pt-2 border-t border-white/5 space-y-1.5">
          <div className="flex flex-wrap gap-1">
            {file.techPills.slice(0, 3).map((h) => (
              <span
                key={h}
                className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#d0d3d8]"
              >
                {h}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-[8px] font-mono text-sky-400/90 pt-0.5 font-semibold">
            <span>CLICK TO ENLARGE ↗</span>
            <span className="text-[#555555]">&bull;&bull;&bull;</span>
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <section id="about" className="py-20 sm:py-28 border-b border-[#1a1a1a]">
      <div className="space-y-12">
        {/* Section Header */}
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono text-[#777777] uppercase tracking-wider block">
            01 &bull; About Me
          </span>
          <h2 className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl text-[#ffffff] tracking-tight">
            A Little About <span className="italic">Me.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#aaadb0] leading-relaxed font-normal">
            Open the dossier to explore my background. Click any document to view the full file.
          </p>
        </div>

        {/* Centerpiece: 3D "About Me" Folder */}
        <div
          data-theme="dark"
          className="dark-island flex flex-col items-center justify-center p-8 sm:p-14 lg:p-20 rounded-3xl bg-[#07070a] border border-[#1a1a1a] relative overflow-hidden min-h-[520px] shadow-2xl"
        >
          {/* Subtle ambient light glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-sky-500/[0.03] blur-[120px] pointer-events-none rounded-full" />

          <div className="relative z-10 flex flex-col items-center gap-8 w-full">
            <Folder
              label="About Me"
              tabPosition="left"
              mode="flap"
              variant="solid"
              color="#1c1e28"
              paperColor="#0d0e14"
              size={1.3}
              layout="spread"
              items={folderItems}
              onItemClick={(_, index) => openFileModal(index)}
              theme="dark"
              zoomOnClick={false}
              draggable={true}
              peek={true}
              tilt={0.65}
            />

            {/* Interactive hint footer */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-[#777777]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Click folder to open</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-sky-400">
                <span>Click any document to enlarge &amp; read</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5">
                <span>Drag files to inspect</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Enlarged Document Modal Overlay (~60% Screen Height) with GSAP Animation ── */}
      {isModalMounted && activeFile && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeFile.title}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Dark Dimmed Backdrop Overlay (Animated with GSAP) */}
          <div
            ref={overlayRef}
            onClick={closeFileModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Enlarged Document Sheet (~60vh height, Animated Enlargement with GSAP) */}
          <div
            ref={modalCardRef}
            data-theme="dark"
            className="dark-island relative z-10 w-full max-w-2xl h-[60vh] min-h-[460px] max-h-[62vh] rounded-2xl bg-[#0d0e15] border border-white/15 shadow-[0_20px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden text-white"
          >
            {/* Document Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#12131b]/90 shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider text-sky-400 font-bold">
                  {activeFile.id} &bull; {activeFile.tag}
                </span>
                <span className="hidden sm:inline text-xs font-mono text-[#555555]">
                  &bull; {activeFile.badge}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden sm:inline text-[11px] font-mono text-[#666666]">
                  Press [ESC] or click outside
                </span>
                <button
                  type="button"
                  onClick={closeFileModal}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center text-sm font-mono transition-colors focus:outline-none focus:ring-1 focus:ring-white"
                  aria-label="Close document"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable Document Content */}
            <div
              ref={contentBodyRef}
              className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6"
            >
              {/* Title & Role */}
              <div className="space-y-1.5 border-b border-white/10 pb-4">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#777777] block">
                  Official Dossier File
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                  {activeFile.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-sky-400">
                  {activeFile.role}
                </p>
              </div>

              {/* Detailed Narrative */}
              <div className="space-y-3 text-xs sm:text-sm text-[#aaadb0] leading-relaxed font-normal">
                {activeFile.fullBio.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {/* Key Deliverables & Highlights */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[11px] font-mono text-[#777777] uppercase tracking-wider block">
                  Key Highlights &amp; Scope
                </span>
                <div className="space-y-2">
                  {activeFile.bulletPoints.map((point, bIdx) => (
                    <div
                      key={bIdx}
                      className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-[#d0d3d8]"
                    >
                      <span className="text-sky-400 font-mono mt-0.5">&bull;</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Applied */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider block">
                  Associated Competencies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeFile.techPills.map((pill) => (
                    <span
                      key={pill}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#161722] border border-white/10 text-[#d0d3d8]"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Document Navigation Footer */}
            <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/10 bg-[#12131b]/95 shrink-0 text-xs font-mono">
              <button
                type="button"
                onClick={() => {
                  const prev =
                    (selectedFileIndex ?? 0) === 0
                      ? DOSSIER_FILES.length - 1
                      : (selectedFileIndex ?? 0) - 1;
                  navigateFile(prev, 'prev');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-[#aaadb0] hover:text-white transition-colors"
              >
                <span>&larr;</span>
                <span>Prev File</span>
              </button>

              <div className="text-[11px] text-[#777777]">
                <span>
                  {(selectedFileIndex ?? 0) + 1} of {DOSSIER_FILES.length}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  const next = ((selectedFileIndex ?? 0) + 1) % DOSSIER_FILES.length;
                  navigateFile(next, 'next');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-[#aaadb0] hover:text-white transition-colors"
              >
                <span>Next File</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
