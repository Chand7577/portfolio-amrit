'use client';

import { useScrollContext } from '@/context/ScrollContext';
import { CHAPTERS } from '@/lib/chapters';

export default function NarrativeOverlay() {
  const { chapter, progress } = useScrollContext();
  const current = CHAPTERS[chapter] ?? CHAPTERS[0];

  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex flex-col justify-between p-6 md:p-12">
      {/* Top Header */}
      <header className="flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <div
            className="w-2.5 h-2.5 rounded-full animate-ping"
            style={{ backgroundColor: current.accent }}
          />
          <span className="font-mono text-xs uppercase tracking-widest text-slate-300">
            GET /amrit-chand &middot; {current.label}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span>PROGRESS: {Math.round(progress * 100)}%</span>
        </div>
      </header>

      {/* Main Chapter Narrative (Pointers enabled for buttons/links) */}
      <div className="max-w-2xl my-auto py-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-md">
            <span
              className="text-xs font-mono tracking-wider uppercase font-semibold"
              style={{ color: current.accent }}
            >
              Ch. 0{current.id} &mdash; {current.label}
            </span>
            {current.date && (
              <span className="text-xs font-mono text-slate-400">
                &bull; {current.date}
              </span>
            )}
          </div>

          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            {current.title}
          </h2>

          {current.company && (
            <p className="text-lg font-mono text-slate-300">
              {current.company}
            </p>
          )}

          <div className="space-y-2 pt-2 border-l-2 pl-4" style={{ borderColor: current.accent }}>
            {current.lines.map((line, i) => (
              <p
                key={i}
                className="text-xl md:text-2xl font-light text-slate-100 italic"
              >
                &ldquo;{line}&rdquo;
              </p>
            ))}
          </div>

          {current.body && (
            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl pt-2">
              {current.body}
            </p>
          )}
        </div>
      </div>

      {/* Bottom Footer / Scroll Cue */}
      <footer className="flex items-end justify-between">
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <div className="w-8 h-px bg-slate-700" />
          <span>Scroll to travel the spline</span>
        </div>

        <div className="text-right font-mono text-xs text-slate-500">
          MERN + TypeScript &bull; India
        </div>
      </footer>
    </div>
  );
}
