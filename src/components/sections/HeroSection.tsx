'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  // Letter by letter animation + staggered elements
  useEffect(() => {
    const ctx = gsap.context(() => {
      const letters = nameRef.current?.querySelectorAll('.hero-letter');

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Staggered letters rise from mask
      if (letters && letters.length > 0) {
        tl.fromTo(
          letters,
          { opacity: 0, y: 40, filter: 'blur(8px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.025 }
        );
      }

      // Rest of the hero elements stagger in smoothly
      tl.fromTo(
        '.hero-fade',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 },
        '-=0.4'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    const lenis = (window as any).__lenis;
    if (lenis && el) {
      lenis.scrollTo(el, { offset: -40 });
    } else {
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nameString = 'Amrit Deependra Chand';

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-7xl mx-auto z-10 pointer-events-auto"
    >
      <div className="max-w-3xl">
        {/* Availability Badge */}
        <div className="hero-fade opacity-0 mb-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
          </span>
          <span className="text-xs font-mono tracking-wide text-text">
            1+ year experience &bull; Available for work
          </span>
        </div>

        {/* Letter by Letter Animated Name */}
        <h1
          ref={nameRef}
          aria-label={nameString}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight text-white mb-6 leading-[1.05]"
        >
          {nameString.split(' ').map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block whitespace-nowrap mr-3 sm:mr-4">
              {word.split('').map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="hero-letter inline-block"
                  style={{ opacity: 0 }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <div className="hero-fade opacity-0 mb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold gradient-text-neon">
            Frontend Developer &amp; MERN Stack Developer
          </h2>
        </div>

        {/* Tagline */}
        <div className="hero-fade opacity-0 mb-10 max-w-2xl">
          <p className="text-base sm:text-lg text-text-muted leading-relaxed font-normal">
            Building responsive web apps, dashboards, and AI-powered products with React.js and Next.js.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="hero-fade opacity-0 flex flex-wrap items-center gap-4 mb-12">
          <button
            onClick={() => scrollTo('projects')}
            className="btn-primary-neon font-heading"
          >
            <span>View Projects</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary-neon font-heading"
          >
            <span>Download Resume</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>

          <button
            onClick={() => scrollTo('contact')}
            className="btn-glass font-heading"
          >
            <span>Contact Me</span>
          </button>
        </div>

        {/* Social Icons */}
        <div className="hero-fade opacity-0 flex items-center gap-5 pt-6 border-t border-white/10">
          <span className="text-xs font-mono text-text-dim uppercase tracking-wider">
            Network Coordinates:
          </span>

          <a
            href="https://github.com/chand7577"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-secondary hover:shadow-glow-cyan transition-all flex items-center gap-1.5 text-xs font-mono"
            aria-label="GitHub Profile"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>

          <a
            href="https://linkedin.com/in/amrit-chand-93005922b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-primary-light hover:shadow-glow-violet transition-all flex items-center gap-1.5 text-xs font-mono"
            aria-label="LinkedIn Profile"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>

      {/* Floating Scroll Cue */}
      <div className="absolute bottom-10 left-6 md:left-16 flex items-center gap-3 text-xs font-mono text-text-dim">
        <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-secondary animate-bounce" />
        </div>
        <span>Scroll down to navigate</span>
      </div>
    </section>
  );
}
