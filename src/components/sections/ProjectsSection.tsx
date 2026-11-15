'use client';

interface ProjectItem {
  id: string;
  title: string;
  client: string;
  timeline: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export default function ProjectsSection() {
  const featuredProjects: ProjectItem[] = [
    {
      id: 'rubric-analyzer',
      title: 'AI Rubric Analyzer',
      client: 'Independent Client Project (drjpnauthomeopath.in)',
      timeline: 'June 2026 – Sept 2026',
      description:
        'Full-stack AI-powered tool for a homeopathic clinic. Uses Google Gemini and Groq LLMs to extract clinical rubrics from patient narratives and rank remedies with confidence scoring. Includes an in-browser Materia Medica library using react-pdf and Tesseract.js OCR with real-time page-jump and bilingual search. Deployed on Netlify + Render with MongoDB, Supabase, Cloudinary, JWT auth, Socket.io, and jsPDF report generation.',
      tags: [
        'React 19',
        'Tailwind CSS',
        'Framer Motion',
        'Gemini',
        'Groq',
        'MongoDB',
        'Supabase',
        'Socket.io',
        'jsPDF',
        'Tesseract.js',
      ],
      liveUrl: 'https://drjpnauthomeopath.in',
      featured: true,
    },
    {
      id: 'clinic-marketing',
      title: 'Homeopathic Clinic Marketing Website',
      client: 'Independent Client Project',
      timeline: 'June 2026 – Sept 2026',
      description:
        'Static, fully responsive, mobile-first website engineered for high engagement and speed, built with React 19, Tailwind CSS, and Framer Motion.',
      tags: ['React 19', 'Tailwind CSS', 'Framer Motion', 'Responsive UI'],
      liveUrl: 'https://drjpnauthomeopath.in',
    },
    {
      id: 'buildmypc-inventory',
      title: 'BuildMyPC Inventory Management System',
      client: 'Best Computers, Dehradun',
      timeline: 'June 2025 – Oct 2025',
      description:
        'Unified inventory system with real-time stock and price updates across 3+ partner websites. Supabase real-time subscriptions synced data and reduced manual data entry errors by 40%. Optimized product catalogue page performance.',
      tags: ['Next.js', 'Supabase', 'Real-time', 'PostgreSQL', 'TypeScript'],
    },
    {
      id: 'dms-dashboard',
      title: 'Document Management System Dashboard',
      client: 'Society of Robotics and Technology',
      timeline: 'Dec 2024 – June 2025',
      description:
        'Responsive dashboard with REST API integration, protected routing, OAuth 2.0 and JWT authentication for secured project documentation workflows.',
      tags: ['React.js', 'Tailwind CSS', 'OAuth 2.0', 'JWT', 'REST API'],
    },
  ];

  const personalProjects: ProjectItem[] = [
    {
      id: 'socialbook',
      title: 'SocialBook',
      client: 'Personal Full-Stack Application',
      timeline: 'July 2024 – Aug 2024',
      description:
        'Full-stack social media app with authentication, posts, likes, follow/unfollow, and profile management.',
      tags: ['Django', 'Python', 'Tailwind CSS', 'EJS'],
      githubUrl: 'https://github.com/chand7577',
    },
    {
      id: 'react-job-website',
      title: 'ReactJobWebsite',
      client: 'Recruitment & Job Portal',
      timeline: 'Aug 2024 – Sept 2024',
      description:
        'Responsive job listing app with CRUD, React Router dynamic routing, and real-time toast notifications.',
      tags: ['React', 'Tailwind CSS', 'JSON Server', 'React Router'],
      githubUrl: 'https://github.com/chand7577',
    },
    {
      id: 'dynamic-blog',
      title: 'Dynamic Blog Website',
      client: 'Content Publishing Engine',
      timeline: 'March 2023',
      description:
        'Lightweight blog platform with full CRUD and RESTful routes for articles and comments.',
      tags: ['Express.js', 'EJS', 'Bootstrap', 'Node.js'],
      githubUrl: 'https://github.com/chand7577',
    },
  ];

  return (
    <section
      id="projects"
      className="relative min-h-screen py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto z-10 pointer-events-auto flex flex-col justify-center"
    >
      <div className="mb-4 inline-flex items-center gap-2">
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent">
          04. FEATURED WORKS
        </span>
      </div>

      <div className="mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
          Selected client &amp; <span className="gradient-text-neon">engineering projects</span>.
        </h2>
        <p className="text-sm text-text-muted mt-2 font-light">
          Real-world production platforms, clinical AI engines, and distributed inventory tools.
        </p>
      </div>

      {/* Featured Projects Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-16">
        {featuredProjects.map((p) => (
          <article
            key={p.id}
            className={`glass-panel rounded-2xl p-8 flex flex-col justify-between group transition-all duration-300 hover:border-secondary/40 hover:-translate-y-1.5 ${
              p.featured ? 'border-primary/40 lg:col-span-2' : ''
            }`}
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-mono text-secondary uppercase tracking-wider font-semibold">
                  {p.client}
                </span>
                <span className="text-xs font-mono text-text-dim">{p.timeline}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-4 group-hover:text-secondary transition-colors">
                {p.title}
              </h3>

              <p className="text-sm sm:text-base text-text-muted leading-relaxed font-light mb-6">
                {p.description}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1 rounded-md border border-white/10 bg-white/[0.02] text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-neon text-xs !py-2.5 !px-4"
                  >
                    <span>Visit Live Site</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-glass text-xs !py-2.5 !px-4"
                  >
                    <span>Source Code</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Personal Projects Grid */}
      <div>
        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-text-dim">
            ADDITIONAL PERSONAL BUILDS
          </span>
          <a
            href="https://github.com/chand7577"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-secondary hover:underline"
          >
            All GitHub Repos ↗
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {personalProjects.map((p) => (
            <div
              key={p.id}
              className="glass-panel rounded-xl p-6 flex flex-col justify-between hover:border-primary/40 transition-all duration-300"
            >
              <div>
                <span className="text-xs font-mono text-text-dim block mb-1">{p.timeline}</span>
                <h4 className="text-lg font-heading font-bold text-white mb-2">{p.title}</h4>
                <p className="text-xs text-text-muted leading-relaxed mb-4">{p.description}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded border border-white/5 bg-white/[0.02] text-text-dim">
                      {t}
                    </span>
                  ))}
                </div>
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-mono text-secondary hover:text-white flex items-center gap-1"
                  >
                    <span>View Repository</span>
                    <span>→</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
