'use client';

import HalftoneReveal from '@/components/ui/HalftoneReveal';

export default function SoloHero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative h-screen max-h-screen w-full max-w-[100vw] bg-[#121324] text-white overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-12 select-none"
    >
      {/* ── Top-Left Electric Accent Corner Slice ── */}
      <div className="absolute top-0 left-0 w-20 h-20 sm:w-28 sm:h-28 rounded-br-full bg-accent pointer-events-none z-20" />

      {/* ── Interactive Halftone Reveal Workspace Background (ReactBits) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <HalftoneReveal
          imageSrc="/images/Cosy Developer Dashboard Workspace.png"
          paperColor="#121324"
          inkColor="#D8DFE8"
          revealRadius={190}
          softness={65}
          dotSize={9}
          contrast={1.2}
          brightness={1.05}
          wander={true}
          clickBurst={true}
          anchor="right"
          className="opacity-90"
        />
        {/* Directional gradient masks to keep typography on the left 100% legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#121324] via-[#121324]/80 via-40% to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121324]/80 via-transparent to-[#121324]/40 pointer-events-none" />
      </div>

      {/* ── Top Row: Greeting + Vertical Navigation on the Right ── */}
      <div className="relative z-10 flex items-start justify-between gap-6 pt-4 sm:pt-2">
        {/* Greeting Headline */}
        <div className="pl-8 sm:pl-12">
          <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
            Hi, I&apos;m Amrit Chand!
          </h1>
        </div>

        {/* Vertical Options Navigation (moved up to top-right) */}
        <nav className="flex flex-col items-end gap-2.5 sm:gap-3 text-right shrink-0 pr-2 sm:pr-4">
          <button
            onClick={() => scrollTo('about')}
            className="text-xs sm:text-sm font-normal text-neutral-300 hover:text-white transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollTo('work')}
            className="text-xs sm:text-sm font-normal text-neutral-300 hover:text-white transition-colors"
          >
            Case studies
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="text-xs sm:text-sm font-normal text-neutral-300 hover:text-white transition-colors"
          >
            Contact
          </button>
          <a
            href="mailto:amritchand0713@gmail.com"
            className="text-xs sm:text-sm font-normal text-neutral-300 hover:text-white transition-colors"
          >
            Resume
          </a>
        </nav>
      </div>

      {/* ── Middle Row: Bio Text + Rotating Circular Stamp ── */}
      <div className="relative z-10 my-auto pl-8 sm:pl-12 max-w-3xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8">
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md font-normal">
            I believe that code should be more than syntax: it should effectively communicate, engage the user, and deliver lasting impact. My goal is to engineer full-stack web applications that solve real problems and keep working long after launch.
          </p>

          {/* Rotating Circular Stamp Badge */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0">
            <div className="w-full h-full rounded-full bg-accent shadow-lg flex items-center justify-center relative overflow-hidden">
              {/* Rotating Text Ring */}
              <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  <defs>
                    <path
                      id="stampCirclePath"
                      d="M 60, 60 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                    />
                  </defs>
                  <text
                    className="fill-neutral-950 font-heading font-extrabold uppercase"
                    style={{ fontSize: '10.5px', letterSpacing: '2.8px' }}
                  >
                    <textPath href="#stampCirclePath">
                      ★ RESEARCH ★ DESIGN ★ ITERATE ★
                    </textPath>
                  </text>
                </svg>
              </div>

              {/* Inner White Circle with Script Monogram */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center shadow-inner z-10">
                <span className="font-hand font-bold text-neutral-950 text-lg italic select-none">
                  ac
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Row: Outlined Title + Action Button ── */}
      <div className="relative z-10 pl-8 sm:pl-12 pb-2 space-y-4 sm:space-y-5">
        {/* Outlined Display Title */}
        <div>
          <h2
            className="font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.25rem] tracking-wider uppercase text-transparent inline-flex items-baseline"
            style={{
              WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.45)',
            }}
          >
            <span>FULL-STACK DEVELOPER</span>
            <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-accent ml-2 sm:ml-3 align-baseline" />
          </h2>
        </div>

        {/* Action Button: White Pill + Accent Arrow */}
        <div>
          <button
            onClick={() => scrollTo('work')}
            className="group inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full bg-white text-neutral-950 font-medium text-xs sm:text-sm hover:bg-neutral-100 transition-all duration-200 shadow-md active:scale-[0.98]"
          >
            <span>View my work</span>
            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xs transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
