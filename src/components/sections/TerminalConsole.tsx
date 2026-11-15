'use client';

import { useState } from 'react';
import { sound } from '@/lib/sound';

export default function TerminalConsole() {
  const [activeEndpoint, setActiveEndpoint] = useState<'profile' | 'projects' | 'status'>('profile');

  const responses = {
    profile: {
      status: '200 OK',
      time: '9ms',
      body: JSON.stringify(
        {
          developer: 'Amrit Deependra Chand',
          role: 'Full-Stack Software Engineer',
          stack: ['MongoDB', 'Express', 'React 19', 'Node.js', 'Next.js 15', 'TypeScript', 'Supabase'],
          location: 'India',
          github: 'https://github.com/chand7577',
          linkedin: 'https://linkedin.com/in/amrit-chand-93005922b',
          flagship_project: 'drjpnauthomeopath.in (AI Homeopathy Analyzer)',
          availability: 'OPEN_TO_OPPORTUNITIES',
        },
        null,
        2
      ),
    },
    projects: {
      status: '200 OK',
      time: '14ms',
      body: JSON.stringify(
        [
          { name: 'Dr. JP Nautiyal AI Homeopath', status: 'PRODUCTION', domain: 'drjpnauthomeopath.in' },
          { name: 'BuildMyPC Sync', status: 'DEPLOYED', sync_reduction: '-40% errors' },
          { name: 'Grandeur Net Commerce & Pharma', status: 'SHIPPED', sites: '5+ deployed' },
          { name: 'SRT Secure Document Vault', status: 'SECURED', auth: 'OAuth 2.0 / JWT' },
        ],
        null,
        2
      ),
    },
    status: {
      status: '200 OK',
      time: '4ms',
      body: JSON.stringify(
        {
          http_status: 200,
          status_message: 'OK',
          server: 'Next.js App Router (Edge)',
          cache: 'HIT (s-maxage=60)',
          rate_limit_remaining: 5,
          memory_footprint: 'OPTIMIZED',
          uptime: '99.98%',
        },
        null,
        2
      ),
    },
  };

  const handleSelect = (key: 'profile' | 'projects' | 'status') => {
    sound.playHover();
    setActiveEndpoint(key);
  };

  const current = responses[activeEndpoint];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto pointer-events-auto">
      <div className="rounded-2xl border border-white/10 bg-slate-950/80 backdrop-blur-2xl overflow-hidden shadow-2xl">
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/[0.03] border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            <span className="ml-3 font-mono text-xs text-slate-400">
              packet-inspect &mdash; live http sandbox
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400">{current.status}</span>
            <span className="text-slate-500">({current.time})</span>
          </div>
        </div>

        {/* Endpoint Selector Tabs */}
        <div className="flex border-b border-white/5 bg-black/40 px-6 py-2 gap-2 overflow-x-auto">
          {[
            { key: 'profile', label: 'GET /amrit-chand' },
            { key: 'projects', label: 'GET /api/projects' },
            { key: 'status', label: 'GET /api/health' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleSelect(tab.key as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                activeEndpoint === tab.key
                  ? 'bg-accent/15 text-accent border border-accent/30'
                  : 'text-slate-400 hover:text-white border border-transparent'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Output */}
        <div className="p-6 md:p-8 font-mono text-xs md:text-sm text-slate-300 overflow-x-auto">
          <pre className="text-cyan-300/90 leading-relaxed font-mono">
            {current.body}
          </pre>
        </div>
      </div>
    </section>
  );
}
