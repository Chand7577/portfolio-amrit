'use client';

import { useScrollContext } from '@/context/ScrollContext';
import { CHAPTERS } from '@/lib/chapters';

interface Props {
  onJump?: (chapterId: number) => void;
}

export default function ProgressDots({ onJump }: Props) {
  const { chapter, scrollToChapter } = useScrollContext();

  const handleJump = (id: number) => {
    if (onJump) onJump(id);
    else scrollToChapter(id);
  };

  return (
    <nav
      aria-label="Chapter navigation"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
    >
      {CHAPTERS.map((ch) => {
        const active = chapter === ch.id;
        return (
          <button
            key={ch.id}
            onClick={() => handleJump(ch.id)}
            aria-label={`Jump to ${ch.label}`}
            aria-current={active ? 'true' : undefined}
            className="group relative flex items-center justify-end gap-2 p-1"
          >
            {/* Label tooltip */}
            <span
              className={`text-xs font-mono mr-2 transition-all duration-300 whitespace-nowrap ${
                active
                  ? 'opacity-100 text-white'
                  : 'opacity-0 group-hover:opacity-75 text-slate-400'
              }`}
            >
              {ch.label}
            </span>

            {/* Dot */}
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: active ? '10px' : '6px',
                height: active ? '10px' : '6px',
                background: active ? ch.accent : '#374151',
                boxShadow: active ? `0 0 12px ${ch.accent}` : 'none',
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
