'use client';

const CHAPTERS_STORY = [
  {
    step: '00',
    title: 'THE BOOT',
    subtitle: 'The Genesis of a Full-Stack Engineer',
    time: 'GENESIS',
    tag: 'ORIGIN & ALGORITHMS',
    color: '#38bdf8',
    quote: 'To ship, or not to ship—that is the question.',
    details:
      'Grounded in problem-solving fundamentals with 420+ algorithmic challenges conquered. Cultivated an obsession with performance, clean systems, and expressive architectural clarity.',
  },
  {
    step: '01',
    title: 'THE GATE',
    subtitle: 'Society of Robotics and Technology (SRT)',
    time: 'DEC 2024',
    tag: 'SECURITY & RBAC',
    color: '#06b6d4',
    quote: 'Identity verified. Token signed. Route unlocked.',
    details:
      'Engineered an internal Document Management platform with OAuth 2.0 and JWT cryptographic signatures. Established zero-trust route guards and structured REST API standards for engineering data.',
  },
  {
    step: '02',
    title: 'THE STREAM',
    subtitle: 'Best Computers — Next.js Engineering Internship',
    time: 'JUN 2025',
    tag: 'REAL-TIME DATA PIPELINES',
    color: '#3b82f6',
    quote: 'Three distributed storefronts. One unified state.',
    details:
      'Built a synchronized inventory orchestration layer for BuildMyPC using Supabase real-time subscriptions and PostgreSQL triggers. Slashed manual catalog discrepancy errors by 40% across partner platforms.',
  },
  {
    step: '03',
    title: 'THE CHECKOUT',
    subtitle: 'Grandeur Net — Web Engineering, Dehradun',
    time: 'OCT 2025',
    tag: 'COMMERCE & EFFICIENCY',
    color: '#f59e0b',
    quote: 'Payment authorized. Zero friction.',
    details:
      'Shipped 5+ production web applications in React & Tailwind with Razorpay checkout gateways. Built a pharmaceutical administration dashboard and cut boilerplate authoring time by 30% via AI-assisted toolchains.',
  },
  {
    step: '04',
    title: 'THE BRAIN',
    subtitle: 'Dr. JP Nautiyal Clinical Homeopathy Platform',
    time: 'JUN–SEP 2026',
    tag: 'FLAGSHIP AI ARCHITECTURE',
    color: '#a855f7',
    quote: 'Natural language symptoms to ranked clinical rubrics in milliseconds.',
    details:
      'Flagship production platform deployed at drjpnauthomeopath.in. Integrated Google Gemini & Groq LLMs with in-browser Materia Medica PDF rendering, client-side Tesseract.js OCR, and bilingual Hindi/English search.',
  },
  {
    step: '05',
    title: 'DEPLOY & RESPONSE',
    subtitle: 'Production Ready & Beyond',
    time: 'PRESENT',
    tag: 'STATUS: 200 OK',
    color: '#22c55e',
    quote: 'Request served with status 200 OK.',
    details:
      'Architecture built for modern cloud platforms (Vercel, Render, Netlify, Docker). Ready to contribute to forward-thinking engineering teams requiring deep MERN, Next.js, and TypeScript mastery.',
  },
];

export default function StoryTimeline() {
  return (
    <section id="story" className="py-28 px-6 md:px-12 max-w-7xl mx-auto pointer-events-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
        <div>
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-2">
            02 / THE CAREER ODYSSEY &ldquo;200 OK&rdquo;
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
            REQUEST <span className="text-gradient">LIFECYCLE.</span>
          </h2>
        </div>

        <p className="text-sm font-mono text-slate-400 max-w-md">
          A continuous scroll journey tracing real engineering milestones, production deployments, and technical evolution.
        </p>
      </div>

      <div className="relative border-l border-white/10 ml-4 md:ml-8 pl-6 md:pl-12 space-y-16">
        {CHAPTERS_STORY.map((item, index) => (
          <div key={item.step} className="relative group">
            {/* Glowing Waypoint Node */}
            <div
              className="absolute -left-[31px] md:-left-[55px] top-1.5 w-4 h-4 rounded-full border-2 border-slate-950 transition-transform group-hover:scale-125"
              style={{ backgroundColor: item.color, boxShadow: `0 0 14px ${item.color}` }}
            />

            <div className="p-8 rounded-2xl border border-white/10 bg-slate-950/40 hover:border-white/20 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white">
                    CHAPTER {item.step}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-wider" style={{ color: item.color }}>
                    {item.tag}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400 font-bold">{item.time}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                {item.title}
              </h3>
              <p className="text-sm font-mono text-slate-400 mb-4">{item.subtitle}</p>

              <blockquote className="text-base font-light italic text-slate-200 border-l-2 pl-4 py-1 mb-4" style={{ borderColor: item.color }}>
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <p className="text-sm text-slate-300 leading-relaxed font-light">
                {item.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
