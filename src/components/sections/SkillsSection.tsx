'use client';

import { useState } from 'react';

interface SkillItem {
  name: string;
  category: 'languages' | 'frameworks' | 'tools';
  highlight?: boolean;
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'languages' | 'frameworks' | 'tools'>('all');

  const skills: SkillItem[] = [
    // Languages
    { name: 'JavaScript (ES6+)', category: 'languages', highlight: true },
    { name: 'TypeScript', category: 'languages', highlight: true },
    { name: 'Python', category: 'languages' },
    { name: 'PHP', category: 'languages' },
    { name: 'HTML5', category: 'languages' },
    { name: 'CSS3', category: 'languages' },
    { name: 'SQL', category: 'languages' },

    // Frameworks & Libraries
    { name: 'React.js', category: 'frameworks', highlight: true },
    { name: 'Next.js', category: 'frameworks', highlight: true },
    { name: 'Node.js', category: 'frameworks', highlight: true },
    { name: 'Express.js', category: 'frameworks', highlight: true },
    { name: 'Django', category: 'frameworks' },
    { name: 'Tailwind CSS', category: 'frameworks', highlight: true },
    { name: 'Bootstrap', category: 'frameworks' },
    { name: 'Redux (basics)', category: 'frameworks' },

    // Tools & Technologies
    { name: 'Git', category: 'tools' },
    { name: 'GitHub', category: 'tools' },
    { name: 'Docker', category: 'tools' },
    { name: 'REST APIs', category: 'tools', highlight: true },
    { name: 'MongoDB', category: 'tools', highlight: true },
    { name: 'Supabase', category: 'tools', highlight: true },
    { name: 'Razorpay', category: 'tools' },
    { name: 'OAuth 2.0', category: 'tools' },
    { name: 'JWT', category: 'tools' },
    { name: 'Responsive Web Design', category: 'tools', highlight: true },
  ];

  const filtered = activeTab === 'all' ? skills : skills.filter((s) => s.category === activeTab);

  return (
    <section
      id="skills"
      className="relative min-h-screen py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto z-10 pointer-events-auto flex flex-col justify-center"
    >
      <div className="mb-4 inline-flex items-center gap-2">
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary">
          03. SKILL ARSENAL
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
            Technologies &amp; <span className="gradient-text-neon">frameworks</span>.
          </h2>
          <p className="text-sm text-text-muted mt-2 font-light">
            Curated stack across modern frontend, server architecture, and distributed databases.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 rounded-xl glass-panel">
          {[
            { id: 'all', label: 'All Stack' },
            { id: 'languages', label: 'Languages' },
            { id: 'frameworks', label: 'Frameworks' },
            { id: 'tools', label: 'Tools & DB' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-glow-violet'
                  : 'text-text-muted hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.map((skill, idx) => (
          <div
            key={idx}
            className={`glass-panel rounded-xl p-5 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1 ${
              skill.highlight ? 'border-primary/30 hover:border-secondary' : 'hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-text-dim">
                {skill.category.slice(0, 4)}
              </span>
              <span
                className={`w-2 h-2 rounded-full ${
                  skill.highlight ? 'bg-secondary shadow-glow-cyan' : 'bg-white/20'
                }`}
              />
            </div>

            <div>
              <h3 className="text-base font-heading font-bold text-white group-hover:text-secondary transition-colors">
                {skill.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
