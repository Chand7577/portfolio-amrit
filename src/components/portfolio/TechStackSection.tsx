'use client';

import React from 'react';
import DriftWall from '@/components/ui/DriftWall';

const TECH_ITEMS = [
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg', title: 'JavaScript' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', title: 'TypeScript' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg', title: 'React.js' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-plain.svg', title: 'Next.js' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', title: 'Node.js' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', title: 'Express.js' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', title: 'MongoDB' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', title: 'PostgreSQL' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg', title: 'Supabase' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg', title: 'Tailwind CSS' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', title: 'Python' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg', title: 'Django' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', title: 'Docker' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', title: 'Git' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', title: 'GitHub' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg', title: 'Redux' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg', title: 'Bootstrap' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', title: 'HTML5' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', title: 'CSS3' },
  { image: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg', title: 'Socket.io' },
];

export default function TechStackSection() {
  return (
    <section id="tech-stack" className="py-20 sm:py-28 border-b border-[#1a1a1a] overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-0">

        {/* Left — Content */}
        <div className="lg:w-2/5 lg:pr-16 flex-shrink-0 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-mono text-[#777777] uppercase tracking-wider block">
              02 &bull; Capabilities
            </span>
            <h2 className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl text-[#ffffff] tracking-tight leading-tight">
              Tools I Work <span className="italic">With.</span>
            </h2>
            <p className="text-sm text-[#9a9a9a] font-normal leading-relaxed max-w-sm">
              Core technologies and tools I utilize across full-stack production environments.
            </p>
          </div>

          {/* Tech category tags */}
          <div className="space-y-3">
            {[
              { label: 'Frontend', items: 'React · Next.js · TypeScript · Tailwind' },
              { label: 'Backend', items: 'Node.js · Express · Django · Python' },
              { label: 'Database', items: 'MongoDB · PostgreSQL · Supabase' },
              { label: 'DevOps', items: 'Docker · Git · GitHub' },
            ].map(({ label, items }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="mt-0.5 text-[10px] font-mono uppercase tracking-widest text-[#555555] w-20 flex-shrink-0 pt-0.5">
                  {label}
                </span>
                <span className="text-xs text-[#aaadb0] leading-relaxed">{items}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — DriftWall */}
        <div className="lg:w-3/5 flex-shrink-0" style={{ height: 540 }}>
          <DriftWall
            items={TECH_ITEMS}
            columns={4}
            tileWidth={150}
            tileHeight={150}
            gap={12}
            radius={16}
            tilt={8}
            turn={-8}
            perspective={1200}
            depth={80}
            speed={32}
            direction="up"
            variance={0.4}
            parallax={0.5}
            lift={56}
            fade={0.4}
            dim={0.88}
            overlayColor="#030303"
            grayscale={false}
          />
        </div>

      </div>
    </section>
  );
}
