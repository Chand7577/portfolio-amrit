'use client';

export default function AboutSection() {
  const stats = [
    { value: '420+', label: 'Problems Solved', sub: 'LeetCode, HackerRank, GFG, CodeChef' },
    { value: '5+', label: 'Business Sites Built', sub: 'Production React & Tailwind' },
    { value: '4', label: 'Roles Since Dec 2024', sub: 'Client & Enterprise Engagements' },
    { value: '7.1', label: 'B.Tech CGPA', sub: 'Computer Science & Engineering' },
  ];

  const coursework = [
    'Object Oriented Programming',
    'Data Structures & Algorithms',
    'Databases (DBMS)',
    'Operating Systems',
    'Computer Networks',
    'Machine Learning',
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto z-10 pointer-events-auto flex flex-col justify-center"
    >
      {/* Section Header Tag */}
      <div className="mb-4 inline-flex items-center gap-2">
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary-light">
          02. ABOUT ME
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight mb-8">
        Crafting high-impact web apps with{' '}
        <span className="gradient-text-neon">precision &amp; speed</span>.
      </h2>

      {/* Summary Narrative Glass Panel */}
      <div className="glass-panel rounded-2xl p-8 md:p-10 mb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <p className="text-base sm:text-lg text-text leading-relaxed font-light mb-6">
          Results-driven Frontend Developer and MERN Stack Developer with 1+ year of professional experience (June 2025 – Present), specializing in React.js and Next.js for building responsive web applications, user interfaces, and dashboards.
        </p>
        <p className="text-base sm:text-lg text-text-muted leading-relaxed font-light">
          Expertise in JavaScript (ES6+), TypeScript, REST API integration, OAuth 2.0 authentication, real-time features with Supabase, and Razorpay payment gateway. Proficient in Tailwind CSS and AI-assisted development workflows.
        </p>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="glass-panel rounded-xl p-6 hover:border-secondary/30 transition-all duration-300"
          >
            <div className="text-3xl sm:text-4xl font-heading font-bold gradient-text-neon mb-1">
              {stat.value}
            </div>
            <div className="text-sm font-heading font-medium text-white mb-1">
              {stat.label}
            </div>
            <div className="text-xs font-mono text-text-dim">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Education Card */}
      <div className="glass-panel rounded-2xl p-8 md:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/5">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-secondary block mb-1">
              ACADEMIC BACKGROUND
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              B.Tech in Computer Science and Engineering
            </h3>
            <p className="text-sm text-text-muted mt-1">
              MGM&apos;s Jawaharlal Nehru Engineering College, Aurangabad, Maharashtra
            </p>
          </div>

          <div className="text-left md:text-right">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-secondary/10 border border-secondary/20 text-secondary">
              CGPA 7.1 / 10
            </span>
            <p className="text-xs font-mono text-text-dim mt-1.5">
              Sept 2021 &ndash; Oct 2025
            </p>
          </div>
        </div>

        <div>
          <span className="text-xs font-mono text-text-muted uppercase tracking-wider block mb-3">
            RELEVANT COURSEWORK:
          </span>
          <div className="flex flex-wrap gap-2">
            {coursework.map((course, idx) => (
              <span
                key={idx}
                className="text-xs font-mono px-3 py-1.5 rounded-lg border border-white/10 bg-white/[0.03] text-text hover:border-primary/40 transition-colors"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
