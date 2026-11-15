'use client';

const TECH_CATEGORIES = [
  {
    category: 'FRONTEND MASTERY',
    description: 'Ultra-fast interfaces with strict type-safety and fluid micro-interactions.',
    skills: [
      { name: 'React 19', level: 'ADVANCED' },
      { name: 'Next.js 15 (App Router)', level: 'PRODUCTION' },
      { name: 'TypeScript', level: 'STRICT MODE' },
      { name: 'Tailwind CSS', level: 'EXPERT' },
      { name: 'Three.js / R3F', level: 'INTERACTIVE' },
      { name: 'GSAP & ScrollTrigger', level: 'CINEMATIC' },
      { name: 'Lenis Smooth Scroll', level: 'PRODUCTION' },
    ],
  },
  {
    category: 'BACKEND & SERVICES',
    description: 'High-concurrency servers, event streams, and cryptographic authentication.',
    skills: [
      { name: 'Node.js', level: 'CORE RUNTIME' },
      { name: 'Express.js', level: 'ENTERPRISE' },
      { name: 'Supabase Real-Time', level: 'DISTRIBUTED' },
      { name: 'Socket.io', level: 'WEBSOCKETS' },
      { name: 'RESTful API Architecture', level: 'CLEAN CONTRACT' },
      { name: 'OAuth 2.0 & JWT', level: 'ZERO-TRUST' },
      { name: 'Next.js Route Handlers', level: 'EDGE ENGINE' },
    ],
  },
  {
    category: 'DATA & STORAGE',
    description: 'ACID-compliant transactions, flexible document models, and caching layers.',
    skills: [
      { name: 'MongoDB & Mongoose', level: 'PRODUCTION MERN' },
      { name: 'PostgreSQL', level: 'RELATIONAL' },
      { name: 'Redis', level: 'IN-MEMORY CACHE' },
      { name: 'Cloudinary', level: 'ASSET PIPELINES' },
      { name: 'AWS S3', level: 'CLOUD STORAGE' },
    ],
  },
  {
    category: 'AI & SPECIALIZED RUNTIMES',
    description: 'Client-side computer vision, LLM inference pipelines, and automated reporting.',
    skills: [
      { name: 'Google Gemini 1.5 Pro', level: 'PROMPT & API' },
      { name: 'Groq (Llama 3 / Mixtral)', level: 'SUB-SECOND TOKENS' },
      { name: 'Tesseract.js OCR', level: 'IN-BROWSER VISION' },
      { name: 'react-pdf & jsPDF', level: 'CLIENT REPORTING' },
      { name: 'Zod Validation', level: 'RUNTIME TYPE-GUARDS' },
      { name: 'Docker', level: 'CONTAINERIZATION' },
    ],
  },
];

const ARCHITECTURE_FLOW = [
  {
    step: '01',
    layer: 'CLIENT EDGE LAYER',
    tech: 'Next.js 15 · React 19 · Lenis · Three.js',
    desc: 'Rendered at the edge with SSR/SSG hydration. Viewport clamped DPR [1, 2], instanced 3D geometries, and semantic ARIA accessibility.',
  },
  {
    step: '02',
    layer: 'API GATEWAY & GUARDS',
    tech: 'Zod Schema · JWT Tokens · IP Rate Limiting',
    desc: 'Stateless endpoints validate payload schemas before hitting business logic. In-memory rate limiting shields against abuse.',
  },
  {
    step: '03',
    layer: 'DATA & REAL-TIME FABRIC',
    tech: 'MongoDB Atlas · Supabase Subscriptions · Redis',
    desc: 'Dual-tier storage: MongoDB for rich polymorphic patient/inventory records, Supabase channels for sub-50ms client synchronization.',
  },
  {
    step: '04',
    layer: 'AI INFERENCE & WORKERS',
    tech: 'Gemini 1.5 · Groq Ultra-Fast API · Tesseract OCR',
    desc: 'Clinical narratives processed through high-throughput Groq and Gemini models; document pages converted via in-browser OCR workers.',
  },
];

export default function TechMatrix() {
  return (
    <section id="stack" className="py-28 px-6 md:px-12 max-w-7xl mx-auto pointer-events-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
        <div>
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-2">
            03 / TECHNICAL SPECIFICATIONS
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
            THE TECH <span className="text-gradient">MATRIX.</span>
          </h2>
        </div>

        <p className="text-sm font-mono text-slate-400 max-w-md">
          A full-stack toolkit engineered for production reliability, typed strictness, and millisecond execution.
        </p>
      </div>

      {/* Tech Categories Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-24">
        {TECH_CATEGORIES.map((cat) => (
          <div
            key={cat.category}
            className="p-8 rounded-2xl border border-white/10 bg-slate-950/40 hover:border-accent/30 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white tracking-wide">{cat.category}</h3>
                <span className="w-2 h-2 rounded-full bg-accent" />
              </div>
              <p className="text-xs font-mono text-slate-400 mb-6">{cat.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="px-3.5 py-2 rounded-lg border border-white/10 bg-white/[0.03] hover:border-white/20 transition-colors flex items-center gap-2.5"
                >
                  <span className="text-xs font-mono text-white font-medium">{skill.name}</span>
                  <span className="text-[10px] font-mono text-accent/70 uppercase tracking-wider">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Architecture Section */}
      <div id="architecture" className="pt-16 border-t border-white/10">
        <div className="mb-12">
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-2">
            04 / SYSTEM DESIGN BLUEPRINT
          </span>
          <h3 className="text-3xl md:text-5xl font-black text-white uppercase">
            HOW I ARCHITECT <span className="text-gradient">PRODUCTION SYSTEMS</span>
          </h3>
          <p className="text-sm font-mono text-slate-400 mt-2 max-w-xl">
            Clean separation of concerns, defensive validation boundaries, and decoupled micro-services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARCHITECTURE_FLOW.map((flow) => (
            <div
              key={flow.step}
              className="p-6 rounded-xl border border-white/10 bg-slate-950/50 flex flex-col justify-between hover:border-accent/40 transition-all relative group"
            >
              <div>
                <span className="font-mono text-3xl font-black text-accent/50 group-hover:text-accent transition-colors block mb-3">
                  {flow.step}
                </span>
                <h4 className="text-sm font-mono font-bold text-white mb-1 uppercase tracking-wide">
                  {flow.layer}
                </h4>
                <p className="text-[11px] font-mono text-accent mb-4">{flow.tech}</p>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {flow.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 uppercase">LAYER {flow.step}</span>
                <span className="text-xs text-accent">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
