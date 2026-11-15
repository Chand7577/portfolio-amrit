'use client';

export default function AchievementsSection() {
  const achievements = [
    {
      icon: (
        <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      tag: 'COMPETITIVE PROGRAMMING',
      title: '420+ Algorithmic Problems Solved',
      desc: 'Solved over 420 data structures & algorithmic programming problems across LeetCode, HackerRank, GeeksforGeeks, and CodeChef.',
      color: '#00E0FF',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      tag: 'DECLAMATION & RHETORIC',
      title: 'First Prize: Portrayal of Hamlet',
      desc: 'Awarded First Prize in a prestigious declamation competition for an expressive theatrical portrayal of Shakespeare\'s Hamlet.',
      color: '#7C5CFF',
    },
    {
      icon: (
        <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      tag: 'ATHLETICS & LEADERSHIP',
      title: 'State & Divisional Sports Representation',
      desc: 'Represented school at district, divisional, and state levels in multiple competitive sports tournaments.',
      color: '#FF4D8D',
    },
  ];

  return (
    <section
      id="achievements"
      className="relative min-h-screen py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto z-10 pointer-events-auto flex flex-col justify-center"
    >
      <div className="mb-4 inline-flex items-center gap-2">
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent">
          06. HONORS &amp; AWARDS
        </span>
      </div>

      <div className="mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
          Key <span className="gradient-text-neon">achievements</span>.
        </h2>
        <p className="text-sm text-text-muted mt-2 font-light">
          Milestones across engineering problem solving, elocution, and athletics.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {achievements.map((item, idx) => (
          <div
            key={idx}
            className="glass-panel rounded-2xl p-8 flex flex-col justify-between hover:border-white/20 hover:-translate-y-1.5 transition-all duration-300"
          >
            <div>
              <div className="mb-6 p-3.5 rounded-xl border border-white/10 bg-white/[0.02] inline-block">
                {item.icon}
              </div>
              <span className="text-xs font-mono uppercase tracking-wider block mb-2 font-semibold" style={{ color: item.color }}>
                {item.tag}
              </span>
              <h3 className="text-xl font-heading font-bold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-text-muted font-light leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-text-dim">
              <span>AWARD / RECOGNITION</span>
              <span>&bull;</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
