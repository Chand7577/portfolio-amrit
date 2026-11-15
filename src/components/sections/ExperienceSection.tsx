'use client';

interface ExperienceItem {
  company: string;
  location: string;
  role: string;
  period: string;
  points: string[];
}

export default function ExperienceSection() {
  const experiences: ExperienceItem[] = [
    {
      company: 'Independent Client Project',
      location: 'Remote',
      role: 'Full-Stack Developer',
      period: 'June 2026 – Sept 2026',
      points: [
        'Built two websites for a homeopathic clinic (static marketing site + AI Rubric Analyzer).',
        'Engineered a responsive mobile-first frontend with React 19, Tailwind CSS, and Framer Motion.',
        'Architected and deployed production infrastructure on Netlify + Render with MongoDB, Supabase, and Cloudinary.',
      ],
    },
    {
      company: 'Grandeur Net',
      location: 'Dehradun, India',
      role: 'Front-End Developer',
      period: 'Oct 2025 – June 2026',
      points: [
        'Built 5+ responsive business websites utilizing React.js and Tailwind CSS.',
        'Integrated cart checkout flows and Razorpay payment gateway for an e-commerce platform with zero dropped transactions.',
        'Built frontend and admin dashboard modules for a pharmaceutical management web app in PHP.',
        'Leveraged AI tools (ChatGPT, Claude, Grok) in engineering workflows to cut boilerplate setup time by 30%.',
      ],
    },
    {
      company: 'Best Computers',
      location: 'Dehradun, India',
      role: 'Web Developer Intern (Next.js)',
      period: 'June 2025 – Oct 2025',
      points: [
        'Built the BuildMyPC inventory management frontend in Next.js with Supabase real-time subscriptions.',
        'Reduced manual data entry errors by 40% across 3+ partner websites with live synced catalogs.',
        'Optimized product catalogue page rendering and network payload latency.',
      ],
    },
    {
      company: 'Society of Robotics and Technology',
      location: 'Nagpur, Maharashtra, India',
      role: 'Front-End Developer Intern',
      period: 'Dec 2024 – June 2025',
      points: [
        'Contributed to a Document Management System dashboard with React.js and Tailwind CSS.',
        'Integrated authenticated REST APIs, protected routing, and OAuth 2.0 + JWT authentication mechanisms.',
      ],
    },
  ];

  return (
    <section
      id="experience"
      className="relative min-h-screen py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto z-10 pointer-events-auto flex flex-col justify-center"
    >
      <div className="mb-4 inline-flex items-center gap-2">
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-light">
          05. WORK HISTORY
        </span>
      </div>

      <div className="mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
          Professional <span className="gradient-text-neon">experience</span>.
        </h2>
        <p className="text-sm text-text-muted mt-2 font-light">
          Engineering roles across startup teams, independent client contracts, and enterprise software.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l border-white/10 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12">
        {experiences.map((exp, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Node Dot */}
            <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-4 h-4 rounded-full border-2 border-background bg-secondary shadow-glow-cyan transition-transform group-hover:scale-125" />

            <div className="glass-panel rounded-2xl p-6 sm:p-8 hover:border-secondary/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-secondary uppercase tracking-wider">
                  {exp.company} &bull; {exp.location}
                </span>
                <span className="text-xs font-mono text-text-dim">
                  {exp.period}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-4">
                {exp.role}
              </h3>

              <ul className="space-y-2.5">
                {exp.points.map((pt, pIdx) => (
                  <li key={pIdx} className="text-sm sm:text-base text-text-muted font-light leading-relaxed flex items-start gap-2.5">
                    <span className="text-primary mt-1">&bull;</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
