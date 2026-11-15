'use client';

import { useState } from 'react';

interface ProjectDetail {
  id: string;
  num: string;
  title: string;
  category: string;
  timeline: string;
  organization: string;
  description: string;
  techStack: string[];
  metrics: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const PROJECTS: ProjectDetail[] = [
  {
    id: 'dr-jp-nautiyal',
    num: '01',
    title: 'AI Rubric Analyzer & Materia Medica Library',
    category: 'CLINICAL AI & HOMEOPATHY PLATFORM',
    timeline: 'JUN–SEP 2026',
    organization: 'Flagship Independent Client Project',
    description:
      'Engineered an end-to-end AI clinical assistant that ingests complex patient narratives, extracts constitutional rubrics using Google Gemini & Groq LLMs, and ranks classical homeopathic remedies with confidence scores. Built an in-browser digital Materia Medica library featuring PDF rendering, Tesseract.js client-side OCR, and bilingual (English/Hindi) search.',
    techStack: [
      'React 19',
      'Next.js',
      'Gemini 1.5 Pro',
      'Groq (Llama 3)',
      'Tesseract.js OCR',
      'react-pdf',
      'Socket.io',
      'MongoDB Atlas',
      'Supabase',
      'Cloudinary',
      'jsPDF',
    ],
    metrics: '<2s Rubric Extraction · 100% In-Browser OCR · Bilingual Search',
    liveUrl: 'https://drjpnauthomeopath.in',
    featured: true,
  },
  {
    id: 'buildmypc-inventory',
    num: '02',
    title: 'BuildMyPC Unified Inventory Synchronization',
    category: 'REAL-TIME DISTRIBUTED INVENTORY',
    timeline: 'JUN 2025',
    organization: 'Best Computers (Next.js Engineering Intern)',
    description:
      'Architected a unified inventory and pricing orchestration engine for BuildMyPC. Leveraged Supabase real-time database subscriptions to broadcast live hardware stock, price fluctuations, and catalog updates simultaneously across 3+ partner retail web platforms.',
    techStack: [
      'Next.js 15',
      'Supabase Real-time',
      'TypeScript',
      'PostgreSQL',
      'Node.js',
      'Tailwind CSS',
    ],
    metrics: '40% Reduction in Manual-Entry Errors · 3+ Live Partner Sites Synced',
    githubUrl: 'https://github.com/chand7577',
  },
  {
    id: 'grandeur-net-checkout',
    num: '03',
    title: 'E-Commerce Suite & Pharma Management Dashboard',
    category: 'FULL-STACK COMMERCE & PHARMA PORTAL',
    timeline: 'OCT 2025',
    organization: 'Grandeur Net, Dehradun',
    description:
      'Delivered 5+ responsive production websites with streamlined cart and Razorpay checkout architectures. Engineered a robust administrative dashboard for a pharmaceutical application, automating supply chain visibility. Accelerated time-to-market by 30% by adopting AI-assisted code pipelines.',
    techStack: [
      'React',
      'Tailwind CSS',
      'Razorpay API',
      'Node.js',
      'Express',
      'PHP Core',
      'RESTful API',
    ],
    metrics: '5+ Production Sites · 30% Less Boilerplate Time · Zero Payment Dropoffs',
    githubUrl: 'https://github.com/chand7577',
  },
  {
    id: 'srt-document-vault',
    num: '04',
    title: 'Document Management & RBAC Security Vault',
    category: 'SECURE AUTHENTICATION & REST ARCHITECTURE',
    timeline: 'DEC 2024',
    organization: 'Society of Robotics and Technology (SRT)',
    description:
      'Designed and deployed a responsive Document Management dashboard for engineering project archives. Built a zero-leak authentication layer utilizing OAuth 2.0 and cryptographically signed JWT tokens for granular Role-Based Access Control (RBAC).',
    techStack: [
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'OAuth 2.0',
      'JWT Auth',
      'Tailwind CSS',
    ],
    metrics: 'Protected RBAC Routes · Encrypted Document Streams · 420+ Commits',
    githubUrl: 'https://github.com/chand7577',
  },
];

const SIDE_QUESTS = [
  {
    title: 'SocialBook',
    stack: 'Django · Python · Tailwind CSS',
    desc: 'Full-stack social networking web application featuring image uploading, post feeds, dynamic likes, and user profile management.',
    github: 'https://github.com/chand7577',
    badge: 'PYTHON/DJANGO',
  },
  {
    title: 'ReactJobWebsite',
    stack: 'React · JSON Server · Tailwind',
    desc: 'Developer recruitment portal with real-time job filtering, full CRUD listing controls, and asynchronous application tracking.',
    github: 'https://github.com/chand7577',
    badge: 'REACT CRUD',
  },
  {
    title: 'Dynamic Blog Engine',
    stack: 'Node.js · Express · EJS · MongoDB',
    desc: 'Content publishing engine with dynamic markdown compilation, SEO meta tags, and structured comment hierarchies.',
    github: 'https://github.com/chand7577',
    badge: 'SSR / EJS',
  },
];

export default function EditorialProjects() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'flagship' | 'realtime' | 'fullstack'>('all');

  return (
    <section id="works" className="py-28 px-6 md:px-12 max-w-7xl mx-auto pointer-events-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
        <div>
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-2">
            01 / SELECTED WORKS & CASE STUDIES
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
            ENGINEERED <span className="text-gradient">SYSTEMS.</span>
          </h2>
        </div>

        <p className="text-sm font-mono text-slate-400 max-w-md">
          A showcase of real production platforms, clinical AI engines, real-time inventory systems, and distributed web architectures.
        </p>
      </div>

      {/* Projects Editorial Cards */}
      <div className="space-y-12">
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className="group relative rounded-2xl border border-white/10 bg-slate-950/60 p-8 md:p-12 hover:border-accent/50 transition-all duration-500 backdrop-blur-xl"
          >
            {/* Top row */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-2xl font-bold text-accent/60 group-hover:text-accent transition-colors">
                  {project.num}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 text-slate-300 bg-white/5">
                  {project.category}
                </span>
              </div>

              <div className="text-xs font-mono text-slate-400">
                <span>{project.organization}</span> &bull; <span>{project.timeline}</span>
              </div>
            </div>

            {/* Title & Description */}
            <div className="grid lg:grid-cols-12 gap-8 mb-8">
              <div className="lg:col-span-7">
                <h3 className="text-2xl md:text-4xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-4">
                  {project.title}
                </h3>
                <p className="text-slate-300 leading-relaxed text-base font-light">
                  {project.description}
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-xl border border-white/5 bg-white/[0.02]">
                <div>
                  <span className="text-xs font-mono text-accent block mb-2 uppercase tracking-wider">
                    [KEY OUTCOME & METRICS]
                  </span>
                  <p className="text-sm font-mono text-white font-medium">
                    {project.metrics}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2.5 py-1 rounded border border-white/10 text-slate-400 bg-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-accent px-5 py-2.5 text-xs font-mono tracking-wider"
                >
                  <span>VISIT LIVE PLATFORM</span>
                  <span>↗</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline px-5 py-2.5 text-xs font-mono tracking-wider"
                >
                  <span>SOURCE REPOSITORY</span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Side Quests Bento Section */}
      <div className="mt-20 pt-16 border-t border-white/10">
        <div className="mb-8">
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-1">
            [SIDE QUESTS & REPOSITORIES]
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white uppercase">
            EXPLORATORY & EXPERIMENTAL BUILDS
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SIDE_QUESTS.map((quest) => (
            <div
              key={quest.title}
              className="p-6 rounded-xl border border-white/10 bg-slate-950/40 hover:border-accent/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono text-accent tracking-wider uppercase px-2 py-0.5 rounded border border-accent/20 bg-accent/5">
                    {quest.badge}
                  </span>
                  <a
                    href={quest.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-slate-400 hover:text-white"
                  >
                    GITHUB ↗
                  </a>
                </div>

                <h4 className="text-lg font-bold text-white mb-2">{quest.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {quest.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 font-mono text-[11px] text-slate-500">
                {quest.stack}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
