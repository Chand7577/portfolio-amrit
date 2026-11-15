'use client';

import { useState } from 'react';
import { sound } from '@/lib/sound';

export default function EditorialContact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const emailAddress = 'amritchand7577@gmail.com';

  const handleCopyEmail = () => {
    sound.playBeep(880, 0.05);
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message.');
      } else {
        setStatus('success');
        sound.playBeep(1200, 0.15);
        setForm({ name: '', email: '', subject: '', message: '' });
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. You can directly reach me via email.');
    }
  };

  return (
    <section id="contact" className="py-28 px-6 md:px-12 max-w-7xl mx-auto pointer-events-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
        <div>
          <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-2">
            05 / INITIATE CONNECTION
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase">
            LET&apos;S SHIP <span className="text-gradient">TOGETHER.</span>
          </h2>
        </div>

        <p className="text-sm font-mono text-slate-400 max-w-md">
          Open to full-time engineering roles, high-impact contract systems, and technical collaborations.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Direct Coordinates & Links */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-2">
              [DIRECT INBOX]
            </span>
            <div className="flex items-center gap-3">
              <span className="text-lg md:text-xl font-mono text-white font-medium">
                {emailAddress}
              </span>
              <button
                onClick={handleCopyEmail}
                className="px-3 py-1 rounded-md border border-white/20 text-xs font-mono text-slate-300 hover:text-white hover:border-white transition-all"
              >
                {copied ? '✓ COPIED' : 'COPY'}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-mono text-accent uppercase tracking-wider block mb-2">
              [NETWORK COORDINATES]
            </span>
            <div className="flex flex-col gap-2 font-mono text-sm">
              <a
                href="https://github.com/chand7577"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-white/10 bg-slate-950/40 hover:border-accent/50 flex items-center justify-between text-slate-300 hover:text-white transition-all"
              >
                <span>GITHUB / chand7577</span>
                <span>↗</span>
              </a>

              <a
                href="https://linkedin.com/in/amrit-chand-93005922b"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-white/10 bg-slate-950/40 hover:border-accent/50 flex items-center justify-between text-slate-300 hover:text-white transition-all"
              >
                <span>LINKEDIN / amrit-chand-93005922b</span>
                <span>↗</span>
              </a>

              <a
                href="https://drjpnauthomeopath.in"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-white/10 bg-slate-950/40 hover:border-accent/50 flex items-center justify-between text-slate-300 hover:text-white transition-all"
              >
                <span>FLAGSHIP DEMO / drjpnauthomeopath.in</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                STATUS: 200 OK &bull; AVAILABLE
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Based in India, available for global remote roles or hybrid engagements requiring strong ownership of MERN and TypeScript infrastructure.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-8 md:p-10 rounded-2xl border border-white/10 bg-slate-950/60 backdrop-blur-xl space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
                  YOUR NAME *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Alex Rivera"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-white font-mono text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
                  YOUR EMAIL *
                </label>
                <input
                  required
                  type="email"
                  placeholder="alex@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-white font-mono text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
                SUBJECT *
              </label>
              <input
                required
                type="text"
                placeholder="Full-Stack Engineering Opportunity / Project Inquery"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-white font-mono text-sm focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-2">
                MESSAGE *
              </label>
              <textarea
                required
                rows={5}
                placeholder="Tell me about what you're building..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/[0.02] text-white font-mono text-sm focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-accent w-full py-4 justify-center font-mono text-xs uppercase tracking-widest disabled:opacity-50"
            >
              {status === 'sending' ? 'TRANSMITTING PACKET...' : 'DISPATCH MESSAGE →'}
            </button>

            {status === 'success' && (
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs text-center">
                ✓ Message transmitted successfully! I will respond promptly.
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs text-center">
                ✕ {errorMessage || 'Failed to dispatch. Please email me directly.'}
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Editorial Footer */}
      <footer className="mt-28 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-500">
        <div>
          &copy; {new Date().getFullYear()} AMRIT DEEPENDRA CHAND &bull; ALL RIGHTS RESERVED
        </div>
        <div>
          STATUS: 200 OK &bull; NEXT.JS &bull; THREE.JS &bull; TAILWIND &bull; LENIS
        </div>
      </footer>
    </section>
  );
}
