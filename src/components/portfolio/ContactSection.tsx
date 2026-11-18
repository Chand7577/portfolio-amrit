'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { CONTACT_INFO } from '@/data/portfolioData';

const Hyperspeed = dynamic(() => import('@/components/ui/Hyperspeed'), {
  ssr: false,
});

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || 'efb7a980-f85e-4c61-be3e-33968a245c72';

interface FormDataState {
  name: string;
  email: string;
  enquiryType: string;
  message: string;
  botcheck: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface TouchedFields {
  name?: boolean;
  email?: boolean;
  message?: boolean;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormDataState>({
    name: '',
    email: '',
    enquiryType: 'Freelance Project',
    message: '',
    botcheck: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // ── Validation Logic ───────────────────────────────────────────────────────
  const validateField = (field: keyof FormErrors, value: string): string | undefined => {
    switch (field) {
      case 'name': {
        const trimmed = value.trim();
        if (!trimmed) return 'Please enter your name.';
        if (trimmed.length < 2) return 'Name must be at least 2 characters.';
        if (trimmed.length > 80) return 'Name must be less than 80 characters.';
        return undefined;
      }
      case 'email': {
        const trimmed = value.trim();
        if (!trimmed) return 'Please enter your email address.';
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(trimmed)) {
          return 'Please enter a valid email (e.g. name@example.com).';
        }
        return undefined;
      }
      case 'message': {
        const trimmed = value.trim();
        if (!trimmed) return 'Please enter your message.';
        if (trimmed.length < 20) {
          return `Message must be at least 20 characters (${trimmed.length}/20).`;
        }
        if (trimmed.length > 4000) return 'Message is too long (max 4,000 characters).';
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const validateAll = (data: FormDataState): FormErrors => {
    const errs: FormErrors = {};
    const nameErr = validateField('name', data.name);
    if (nameErr) errs.name = nameErr;

    const emailErr = validateField('email', data.email);
    if (emailErr) errs.email = emailErr;

    const msgErr = validateField('message', data.message);
    if (msgErr) errs.message = msgErr;

    return errs;
  };

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleInputChange = (
    field: keyof FormDataState,
    value: string
  ) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    // If the field has already been touched, validate immediately for live feedback
    if (touched[field as keyof TouchedFields]) {
      const err = validateField(field as keyof FormErrors, value);
      setErrors((prev) => ({
        ...prev,
        [field]: err,
      }));
    }
  };

  const handleBlur = (field: keyof TouchedFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field as keyof FormErrors, formData[field as keyof FormDataState]);
    setErrors((prev) => ({
      ...prev,
      [field]: err,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });

    // Run full validation
    const validationErrors = validateAll(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus('error');
      setErrorMessage('Please fix the highlighted errors before submitting.');
      return;
    }

    // Honeypot check: if bot filled hidden field, simulate success silently
    if (formData.botcheck) {
      setStatus('success');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // 1. Submit directly to Web3Forms with user's access key
      const web3Payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: `${formData.enquiryType}: New inquiry from ${formData.name.trim()}`,
        enquiry_type: formData.enquiryType,
        message: formData.message.trim(),
        from_name: `${formData.name.trim()} (Portfolio)`,
        botcheck: formData.botcheck,
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(web3Payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Web3Forms submission failed. Please try again or reach out directly.');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        enquiryType: 'Freelance Project',
        message: '',
        botcheck: '',
      });
      setTouched({});
      setErrors({});

      // 2. Background backup to internal DB (non-blocking)
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: `${formData.enquiryType}: Inquiry from ${formData.name.trim()}`,
          message: formData.message.trim(),
        }),
      }).catch(() => {});
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try emailing directly.'
      );
    }
  };

  const handleResetForm = () => {
    setStatus('idle');
    setErrorMessage('');
    setErrors({});
    setTouched({});
    setFormData({
      name: '',
      email: '',
      enquiryType: 'Freelance Project',
      message: '',
      botcheck: '',
    });
  };

  const messageLength = formData.message.trim().length;

  return (
    <section
      id="contact"
      data-theme="dark"
      className="dark-island relative py-20 sm:py-28 overflow-hidden rounded-3xl border border-[#1a1a1a] bg-[#030303] my-8 sm:my-12 px-6 sm:px-10 lg:px-14 shadow-2xl text-white"
    >
      {/* ── Interactive 3D Hyperspeed Highway Backdrop ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Hyperspeed
          curve="winding"
          curvature={0.9}
          speed={1.4}
          boost={3.5}
          fov={85}
          boostFov={125}
          lanes={3}
          roadWidth={9}
          medianWidth={1.8}
          density={32}
          trailLength={1.25}
          lightSize={1.5}
          poles={12}
          dust={45}
          glow={0.7}
          reflections={0.35}
          roadOpacity={0.35}
          steer={0.32}
          tailColors={['#f43f5e', '#c084fc', '#818cf8', '#ffffff']}
          headColors={['#06b6d4', '#38bdf8', '#818cf8', '#ffffff']}
          poleColors={['#06b6d4']}
          roadColor="#060609"
          lineColor="#20202a"
          background="#030303"
          theme="dark"
          interactive={true}
        />
      </div>

      {/* Edge vignettes for smooth integration */}
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#030303] to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none z-0" />

      <div className="relative z-10 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <span className="text-xs font-mono text-[#777777] uppercase tracking-wider block">
            09 &bull; Contact
          </span>
          <h2 className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl text-[#ffffff] tracking-tight">
            Let&apos;s Build Something <span className="italic">Together.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#aaadb0] font-normal leading-relaxed">
            Whether you&apos;re looking for a developer to join your team or someone to bring your project idea to life, I&apos;d love to hear from you.
          </p>
        </div>

        {/* Dual Audience Layout: Channels (Left) & Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Channels for Companies & Freelance */}
          <div className="lg:col-span-5 space-y-6">
            {/* For Companies & Recruiters */}
            <div className="p-6 rounded-2xl bg-[#060606]/80 backdrop-blur-xl border border-white/10 shadow-2xl space-y-3">
              <span className="text-xs font-mono text-[#ffffff] uppercase tracking-wider block font-semibold">
                For Companies &amp; Recruiters
              </span>
              <p className="text-xs text-[#9a9a9a] leading-relaxed">
                Evaluating for engineering roles, technical contracting, or permanent full-stack opportunities:
              </p>
              <div className="pt-2 space-y-2.5 text-xs font-mono">
                <div>
                  <span className="text-[#cbd5e1] font-semibold">Email: </span>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-[#ffffff] hover:underline transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
                <div>
                  <span className="text-[#cbd5e1] font-semibold">LinkedIn: </span>
                  <a
                    href={CONTACT_INFO.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#aaadb0] hover:text-[#ffffff] transition-colors"
                  >
                    linkedin.com/in/amrît-chand ↗
                  </a>
                </div>
                <div>
                  <span className="text-[#cbd5e1] font-semibold">Phone: </span>
                  <a
                    href={`tel:${CONTACT_INFO.phone?.replace(/\s/g, '')}`}
                    className="text-[#ffffff] hover:underline transition-colors"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
                <div>
                  <span className="text-[#cbd5e1] font-semibold">Resume: </span>
                  <a
                    href={CONTACT_INFO.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#aaadb0] hover:text-[#ffffff] transition-colors"
                  >
                    Download PDF (resume.pdf) ↓
                  </a>
                </div>
              </div>
            </div>

            {/* For Freelance & Client Inquiries */}
            <div className="p-6 rounded-2xl bg-[#060606]/80 backdrop-blur-xl border border-white/10 shadow-2xl space-y-3">
              <span className="text-xs font-mono text-[#ffffff] uppercase tracking-wider block font-semibold">
                For Freelance Projects
              </span>
              <p className="text-xs text-[#9a9a9a] leading-relaxed">
                Direct client discussions, new website inquiries, or e-commerce implementations:
              </p>
              <div className="pt-2 space-y-2.5 text-xs font-mono">
                <div>
                  <span className="text-[#cbd5e1] font-semibold">WhatsApp: </span>
                  <a
                    href={CONTACT_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ffffff] hover:underline transition-colors"
                  >
                    Chat on WhatsApp (+91 7972198640) ↗
                  </a>
                </div>
                <div>
                  <span className="text-[#cbd5e1] font-semibold">Direct Email: </span>
                  <a
                    href={`mailto:${CONTACT_INFO.email}?subject=Freelance%20Project%20Discussion`}
                    className="text-[#ffffff] hover:underline transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Web3Forms Contact Form with Validation */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#060606]/85 backdrop-blur-xl border border-white/10 shadow-2xl">
            {status === 'success' ? (
              <div className="py-8 px-4 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 text-2xl">
                  ✓
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#9a9a9a] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Your message has been delivered directly to my inbox. I will get back to you within 24 hours.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors border border-white/15"
                  >
                    Send Another Message &rarr;
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Honeypot field for bot protection (invisible to humans) */}
                <input
                  type="checkbox"
                  name="botcheck"
                  checked={Boolean(formData.botcheck)}
                  onChange={(e) =>
                    setFormData({ ...formData, botcheck: e.target.checked ? 'spam' : '' })
                  }
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="flex items-center justify-between text-xs font-mono text-[#aaadb0]">
                      <span>Your Name <span className="text-rose-400">*</span></span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder="e.g. Rahul Sharma"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-[#030303] text-xs sm:text-sm text-[#ffffff] placeholder-[#555555] transition-all focus:outline-none ${
                        touched.name && errors.name
                          ? 'border border-rose-500/70 focus:border-rose-500 bg-rose-500/[0.03]'
                          : touched.name && !errors.name
                          ? 'border border-emerald-500/40 focus:border-emerald-500/60'
                          : 'border border-[#1a1a1a] focus:border-[#ffffff]/50'
                      }`}
                      aria-invalid={Boolean(touched.name && errors.name)}
                      aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                    />
                    {touched.name && errors.name && (
                      <p id="name-error" className="text-[11px] font-mono text-rose-400 flex items-center gap-1.5 pt-0.5">
                        <span aria-hidden="true">⚠</span> {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="flex items-center justify-between text-xs font-mono text-[#aaadb0]">
                      <span>Your Email <span className="text-rose-400">*</span></span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="rahul@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-[#030303] text-xs sm:text-sm text-[#ffffff] placeholder-[#555555] transition-all focus:outline-none ${
                        touched.email && errors.email
                          ? 'border border-rose-500/70 focus:border-rose-500 bg-rose-500/[0.03]'
                          : touched.email && !errors.email
                          ? 'border border-emerald-500/40 focus:border-emerald-500/60'
                          : 'border border-[#1a1a1a] focus:border-[#ffffff]/50'
                      }`}
                      aria-invalid={Boolean(touched.email && errors.email)}
                      aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                    />
                    {touched.email && errors.email && (
                      <p id="email-error" className="text-[11px] font-mono text-rose-400 flex items-center gap-1.5 pt-0.5">
                        <span aria-hidden="true">⚠</span> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Enquiry Type Selector */}
                <div className="space-y-1.5">
                  <label htmlFor="enquiryType" className="block text-xs font-mono text-[#aaadb0]">
                    Enquiry Type <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="enquiryType"
                    value={formData.enquiryType}
                    onChange={(e) => handleInputChange('enquiryType', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#030303] border border-[#1a1a1a] text-xs sm:text-sm text-[#ffffff] focus:outline-none focus:border-[#ffffff]/50 transition-colors"
                  >
                    <option value="Freelance Project">Freelance Project (Website, App, E-commerce)</option>
                    <option value="Job Opportunity">Job Opportunity (Full-Time / Engineering Role)</option>
                    <option value="Code Audit & Consulting">Code &amp; Architecture Consulting</option>
                    <option value="General Inquiry">General Technical Inquiry</option>
                  </select>
                </div>

                {/* Message Input */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <label htmlFor="message" className="text-[#aaadb0]">
                      Message <span className="text-rose-400">*</span>
                    </label>
                    <span
                      className={`text-[11px] font-mono transition-colors ${
                        messageLength >= 20 ? 'text-emerald-400/80' : 'text-[#777777]'
                      }`}
                    >
                      {messageLength}/20 min chars
                    </span>
                  </div>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    placeholder="Tell me a bit about your project goals, timelines, or engineering role..."
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-[#030303] text-xs sm:text-sm text-[#ffffff] placeholder-[#555555] transition-all focus:outline-none resize-none ${
                      touched.message && errors.message
                        ? 'border border-rose-500/70 focus:border-rose-500 bg-rose-500/[0.03]'
                        : touched.message && !errors.message
                        ? 'border border-emerald-500/40 focus:border-emerald-500/60'
                        : 'border border-[#1a1a1a] focus:border-[#ffffff]/50'
                    }`}
                    aria-invalid={Boolean(touched.message && errors.message)}
                    aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
                  />
                  {touched.message && errors.message && (
                    <p id="message-error" className="text-[11px] font-mono text-rose-400 flex items-center gap-1.5 pt-0.5">
                      <span aria-hidden="true">⚠</span> {errors.message}
                    </p>
                  )}
                </div>

                {/* Global Error Banner */}
                {status === 'error' && errorMessage && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-center gap-2">
                    <span aria-hidden="true">⚠</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 rounded-lg bg-[#ffffff] text-[#030303] font-semibold text-xs sm:text-sm hover:bg-[#fdfdfd] hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-[#030303]" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Send Message &rarr;</span>
                  )}
                </button>

                <p className="text-[11px] text-center text-[#555555] font-mono pt-1">
                  Protected by Anti-Spam Verification • Typically replies within 24 hours
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
