'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import type { Project } from '@/types';

interface Props {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Entrance scroll animation
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Import dynamically to avoid SSR issues
    import('gsap/ScrollTrigger').then(({ default: ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        el,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.7, delay: index * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        }
      );
    });
  }, [index]);

  // Tilt effect on hover
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotationY: x * 8, rotationX: -y * 8,
      transformPerspective: 800,
      ease: 'power2.out', duration: 0.4,
    });
  };

  const onMouseLeave = () => {
    gsap.to(cardRef.current, { rotationY: 0, rotationX: 0, duration: 0.6, ease: 'elastic.out(1,0.6)' });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="opacity-0 glow-card rounded-xl overflow-hidden flex flex-col group cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Image placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-surface to-background overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br opacity-60"
          style={{
            backgroundImage: `linear-gradient(135deg, ${
              project.category === 'fullstack' ? '#06b6d4, #818cf8' :
              project.category === 'backend' ? '#34d399, #06b6d4' :
              '#fb923c, #f43f5e'
            })`,
          }}
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-background/60 backdrop-blur-sm text-text-secondary border border-border/40">
            {project.category}
          </span>
        </div>
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-accent/20 text-accent border border-accent/30">
              Featured
            </span>
          </div>
        )}
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.5) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        {/* Project initial */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-bold opacity-20 text-text-primary">
            {project.title[0]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2 py-0.5 rounded border border-border/50 text-text-muted"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-xs font-mono px-2 py-0.5 rounded border border-border/50 text-text-muted">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-text-primary transition-colors"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-light transition-colors"
              aria-label={`Live demo for ${project.title}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
              </svg>
              Live Demo
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="ml-auto text-xs text-text-muted hover:text-text-primary transition-colors"
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
}
