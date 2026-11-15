'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LAYERS = [
  {
    id: 'client',
    label: 'Client Layer',
    color: '#06b6d4',
    items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP / Three.js'],
    desc: 'The UI layer — responsive, accessible, and blazing fast. Rendered at the edge with Next.js App Router.',
  },
  {
    id: 'api',
    label: 'API Layer',
    color: '#818cf8',
    items: ['Next.js Route Handlers', 'Zod Validation', 'Rate Limiting', 'JWT / NextAuth'],
    desc: 'Stateless REST & GraphQL endpoints, validated with Zod, protected with NextAuth, and rate-limited by IP.',
  },
  {
    id: 'db',
    label: 'Data Layer',
    color: '#34d399',
    items: ['MongoDB Atlas', 'Mongoose ODM', 'Redis Cache', 'Full-Text Search'],
    desc: 'Persistent data in MongoDB Atlas, hot data in Redis, and indexed full-text search via Atlas Search.',
  },
  {
    id: 'infra',
    label: 'Infra Layer',
    color: '#fb923c',
    items: ['Vercel Edge Network', 'Docker Containers', 'GitHub Actions CI/CD', 'Sentry Monitoring'],
    desc: 'Deployed to Vercel for zero-config edge delivery; containerised with Docker for portability.',
  },
];

export default function ArchitectureSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.arch-card',
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.arch-card', start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="architecture"
      className="relative z-10 py-32 section-padding"
      aria-label="Architecture"
    >
      <div className="container-max">
        <p className="font-mono text-accent text-sm tracking-widest uppercase mb-4">
          03 — Architecture
        </p>

        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          How I design{' '}
          <span className="text-gradient">full-stack</span> systems
        </h2>
        <p className="text-text-secondary max-w-2xl mb-16 leading-relaxed">
          I think in layers. Each concern is isolated, independently scalable,
          and connected through well-defined contracts. Here&apos;s the blueprint I
          apply to every project.
        </p>

        {/* Layers stack */}
        <div className="relative">
          {/* Vertical connector */}
          <div
            className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-[#06b6d4] via-[#818cf8] via-[#34d399] to-[#fb923c] opacity-30"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-4 pl-16">
            {LAYERS.map(({ id, label, color, items, desc }) => (
              <div
                key={id}
                className="arch-card opacity-0 glow-card rounded-xl p-6 transition-all duration-300 hover:scale-[1.01]"
              >
                <div className="flex items-start gap-4">
                  {/* Dot connector */}
                  <div
                    className="absolute -left-[2.85rem] mt-1 w-3 h-3 rounded-full border-2 border-background shrink-0"
                    style={{ background: color }}
                    aria-hidden="true"
                  />

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-bold text-lg" style={{ color }}>
                        {label}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <span
                            key={item}
                            className="text-xs font-mono px-2.5 py-0.5 rounded-full border"
                            style={{ borderColor: `${color}40`, color }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
