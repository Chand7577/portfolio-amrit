'use client';

import React, { useRef, useEffect } from 'react';

// ── Tech items for the marquee rows ──────────────────────────────────────────
const ROW_1 = [
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', name: 'JavaScript' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', name: 'TypeScript' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', name: 'React.js' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-plain.svg', name: 'Next.js' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', name: 'Tailwind CSS' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', name: 'Node.js' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', name: 'Express.js' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', name: 'Python' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg', name: 'Django' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg', name: 'Redux' },
];

const ROW_2 = [
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', name: 'MongoDB' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', name: 'PostgreSQL' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg', name: 'Supabase' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', name: 'Docker' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', name: 'Git' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', name: 'GitHub' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg', name: 'Bootstrap' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', name: 'HTML5' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', name: 'CSS3' },
  { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg', name: 'Socket.io' },
];

const CATEGORIES = [
  { label: 'Frontend', items: 'React · Next.js · TypeScript · Tailwind · Redux' },
  { label: 'Backend', items: 'Node.js · Express · Django · Python · REST APIs' },
  { label: 'Database', items: 'MongoDB · PostgreSQL · Supabase · JWT · OAuth' },
  { label: 'DevOps', items: 'Docker · Git · GitHub · Cloudinary · Razorpay' },
];

// ── Single pill ───────────────────────────────────────────────────────────────
function Pill({ icon, name }: { icon: string; name: string }) {
  const needsInvert = ['Next.js', 'Express.js', 'GitHub'].includes(name);
  return (
    <div className="flex-shrink-0 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200 select-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt={name}
        width={18}
        height={18}
        className="w-[18px] h-[18px] object-contain"
        style={{ filter: needsInvert ? 'invert(1)' : 'none' }}
      />
      <span className="text-xs font-mono text-[#aaadb0] whitespace-nowrap">{name}</span>
    </div>
  );
}

// ── Marquee row ───────────────────────────────────────────────────────────────
function MarqueeRow({
  items,
  direction = 'left',
  speed = 35,
}: {
  items: typeof ROW_1;
  direction?: 'left' | 'right';
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const track = trackRef.current;
    if (!track) return;

    const getSetWidth = () => track.scrollWidth / 3;

    const animate = (ts: number) => {
      if (lastRef.current === 0) lastRef.current = ts;
      const dt = Math.min(ts - lastRef.current, 50);
      lastRef.current = ts;

      if (!pausedRef.current) {
        const delta = (speed * dt) / 1000;
        posRef.current += direction === 'left' ? delta : -delta;
        const setWidth = getSetWidth();
        if (direction === 'left' && posRef.current >= setWidth) posRef.current -= setWidth;
        if (direction === 'right' && posRef.current <= -setWidth) posRef.current += setWidth;
        track.style.transform = `translateX(${direction === 'left' ? -posRef.current : posRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed]);

  const tripled = [...items, ...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-1"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; lastRef.current = 0; }}
    >
      {/* Edge fade masks */}
      <div
        className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #030303 0%, transparent 100%)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #030303 0%, transparent 100%)' }}
      />
      <div ref={trackRef} className="flex gap-3 w-max will-change-transform">
        {tripled.map((item, i) => (
          <Pill key={`${item.name}-${i}`} icon={item.icon} name={item.name} />
        ))}
      </div>
    </div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export default function TechStackSection() {
  return (
    <section id="tech-stack" className="py-20 sm:py-28 border-b border-[#1a1a1a] overflow-hidden">
      {/* ── Header ── */}
      <div className="mb-12 sm:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <span className="text-xs font-mono text-[#777777] uppercase tracking-wider block">
            02 • Capabilities
          </span>
          <h2
            className="font-serif font-normal text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
          >
            Tools I Work <em>With.</em>
          </h2>
          <p className="text-sm text-[#9a9a9a] leading-relaxed max-w-sm">
            Core technologies I use daily across full-stack production environments.
          </p>
        </div>

        {/* Category two-column list */}
        <div className="grid grid-cols-2 gap-x-10 gap-y-4">
          {CATEGORIES.map(({ label, items }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-[#555555]">
                {label}
              </span>
              <span className="text-[11px] text-[#777777] leading-relaxed">{items}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Dual marquee rows ── */}
      <div className="space-y-3">
        <MarqueeRow items={ROW_1} direction="left" speed={38} />
        <MarqueeRow items={ROW_2} direction="right" speed={32} />
      </div>
    </section>
  );
}
