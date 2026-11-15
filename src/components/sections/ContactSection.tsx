'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const email = 'amritchand0713@gmail.com';
  const phone = '7972198640';

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Wire form submit action to backend / Resend / Formspree handler
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto z-10 pointer-events-auto flex flex-col justify-center"
    >
      <div className="mb-4 inline-flex items-center gap-2">
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary">
          07. INITIATE CONTACT
        </span>
      </div>

      <div className="mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
          Let&apos;s build something <span className="gradient-text-neon">extraordinary</span>.
        </h2>
        <p className="text-sm text-text-muted mt-2 font-light">
          Available for Frontend &amp; MERN Stack engineering roles, freelance builds, and technical collaborations.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Contact Info Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-secondary block mb-1">
                PRIMARY EMAIL
              </span>
              <div className="flex items-center justify-between gap-2">
                <a href={`mailto:${email}`} className="text-base sm:text-lg font-mono text-white hover:text-secondary transition-colors">
                  {email}
                </a>
                <button
                  onClick={() => handleCopy(email)}
                  className="px-2.5 py-1 rounded border border-white/10 text-xs font-mono text-text-muted hover:text-white transition-colors"
                >
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-secondary block mb-1">
                CONTACT PHONE
              </span>
              <a href={`tel:${phone}`} className="text-base font-mono text-white hover:text-secondary transition-colors">
                +91 {phone}
              </a>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2.5 font-mono text-xs">
              <span className="text-text-dim uppercase tracking-wider block mb-2">
                ONLINE PROFILES:
              </span>
              <a
                href="https://github.com/chand7577"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:border-secondary/40 text-text-muted hover:text-white transition-all"
              >
                <span>GitHub &bull; chand7577</span>
                <span>↗</span>
              </a>
              <a
                href="https://linkedin.com/in/amrit-chand-93005922b"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/[0.02] hover:border-primary/40 text-text-muted hover:text-white transition-all"
              >
                <span>LinkedIn &bull; amrit-chand-93005922b</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form UI */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="glass-panel rounded-2xl p-6 sm:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-2">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Patel"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-background/50 text-white font-mono text-sm focus:outline-none focus:border-secondary transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-text-muted uppercase mb-2">
                  YOUR EMAIL *
                </label>
                <input
                  type="email"
                  required
                  placeholder="maya@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-background/50 text-white font-mono text-sm focus:outline-none focus:border-secondary transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-text-muted uppercase mb-2">
                SUBJECT *
              </label>
              <input
                type="text"
                required
                placeholder="Frontend / MERN Opportunity"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-background/50 text-white font-mono text-sm focus:outline-none focus:border-secondary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-text-muted uppercase mb-2">
                MESSAGE *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Let's build something together..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-background/50 text-white font-mono text-sm focus:outline-none focus:border-secondary transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="btn-primary-neon w-full justify-center !py-4 font-heading font-medium tracking-wide"
            >
              Send Message
            </button>

            {submitted && (
              <div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary text-xs font-mono text-center">
                ✓ Message simulated! (Handler marked as TODO)
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-28 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-dim">
        <p>&copy; {new Date().getFullYear()} Amrit Deependra Chand. All rights reserved.</p>
        <p>Built with Next.js &bull; React Three Fiber &bull; Tailwind CSS</p>
      </footer>
    </section>
  );
}
