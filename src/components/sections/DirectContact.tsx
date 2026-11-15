'use client';

import { useState } from 'react';

interface FieldErrors {
  name?: string[];
  email?: string[];
  subject?: string[];
  message?: string[];
}

export default function DirectContact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setFieldErrors({});
    setSuccessMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 422 && data.details) {
          setFieldErrors(data.details as FieldErrors);
          setErrorMsg('Please review the highlighted fields below.');
        } else {
          setErrorMsg(data.error || 'Something went wrong. Please try again.');
        }
        return;
      }

      setForm({ name: '', email: '', subject: '', message: '' });
      setSuccessMsg(data.message || 'Message received! I will reply within 24 hours.');
      setTimeout(() => setSuccessMsg(''), 6000);
    } catch {
      setErrorMsg('Network error — please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls =
    'w-full px-4 py-2.5 rounded-lg border border-white/[0.1] bg-charcoal text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-brand transition-colors disabled:opacity-60 disabled:cursor-not-allowed';
  const errorInputCls =
    'w-full px-4 py-2.5 rounded-lg border border-red-500/80 bg-charcoal text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-red-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed';

  return (
    <section id="contact" className="py-20 md:py-28 px-6 bg-charcoal border-b border-white/[0.06]">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono text-brand mb-2 block">
            Direct communication
          </span>
          <h2 className="font-heading font-semibold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mb-3">
            Start a project discussion
          </h2>
          <p className="text-sm text-neutral-400 font-normal leading-relaxed">
            Tell me what you are looking to build, audit, or maintain. I reply personally within 24 hours with straight answers and realistic timelines.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8 items-start">
          {/* Direct Channels Column */}
          <div className="md:col-span-5 pro-card p-6 sm:p-7 space-y-6 bg-charcoal-card">
            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                Direct Email
              </span>
              <a
                href="mailto:amritchand0713@gmail.com"
                className="font-heading font-medium text-base text-white hover:text-brand transition-colors block"
              >
                amritchand0713@gmail.com
              </a>
              <span className="text-xs font-mono text-neutral-500 block mt-1">
                Typical reply: under 12 hours
              </span>
            </div>

            <div>
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                Phone / WhatsApp
              </span>
              <a
                href="tel:7972198640"
                className="font-mono text-sm text-neutral-200 hover:text-brand transition-colors block"
              >
                +91 7972198640
              </a>
            </div>

            <div className="pt-4 border-t border-white/[0.06] space-y-1">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                Location &amp; Hours:
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed">
                Dehradun, India &bull; Structuring daily overlap with US, UK, and European business hours.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] space-y-1">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block">
                Availability:
              </span>
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Open for Q4 2026 builds</span>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="md:col-span-7 pro-card p-6 sm:p-8 bg-charcoal-card">
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-800/80 text-red-200 text-xs font-mono">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs font-mono">
                  {successMsg}
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Your name *
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    disabled={isSubmitting}
                    placeholder="e.g. Maya Patel"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={fieldErrors.name ? errorInputCls : inputCls}
                  />
                  {fieldErrors.name && (
                    <span className="text-[11px] font-mono text-red-400 mt-1 block">
                      {fieldErrors.name[0]}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                    Your email *
                  </label>
                  <input
                    type="email"
                    required
                    disabled={isSubmitting}
                    placeholder="maya@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={fieldErrors.email ? errorInputCls : inputCls}
                  />
                  {fieldErrors.email && (
                    <span className="text-[11px] font-mono text-red-400 mt-1 block">
                      {fieldErrors.email[0]}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  minLength={4}
                  maxLength={200}
                  disabled={isSubmitting}
                  placeholder="e.g. Full-stack dashboard build, ongoing maintenance"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className={fieldErrors.subject ? errorInputCls : inputCls}
                />
                {fieldErrors.subject && (
                  <span className="text-[11px] font-mono text-red-400 mt-1 block">
                    {fieldErrors.subject[0]}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                  Project overview &bull; min 20 characters *
                </label>
                <textarea
                  required
                  rows={4}
                  minLength={20}
                  maxLength={5000}
                  disabled={isSubmitting}
                  placeholder="Describe your current application, target timeline, or what needs engineering attention..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${fieldErrors.message ? errorInputCls : inputCls} resize-none`}
                />
                {fieldErrors.message && (
                  <span className="text-[11px] font-mono text-red-400 mt-1 block">
                    {fieldErrors.message[0]}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-brand w-full py-2.5 text-xs font-medium"
              >
                {isSubmitting ? 'Sending message...' : 'Send message — I reply directly'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
