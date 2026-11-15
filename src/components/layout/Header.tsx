'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { sound } from '@/lib/sound';

export default function Header() {
  const [time, setTime] = useState<string>('');
  const [muted, setMuted] = useState<boolean>(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(now.toLocaleTimeString('en-US', options) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const isMuted = sound.toggleMute();
    setMuted(isMuted);
  };

  const navItems = [
    { label: '01/ WORKS', href: '#works' },
    { label: '02/ STORY', href: '#story' },
    { label: '03/ STACK', href: '#stack' },
    { label: '04/ ARCHITECTURE', href: '#architecture' },
    { label: '05/ CONTACT', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 bg-background/70 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Monogram Logo & Live Status */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-lg font-mono font-bold tracking-tighter text-white hover:text-accent transition-colors"
          >
            AMRIT CHAND<span className="text-accent">_</span>
          </Link>

          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AVAILABLE FOR WORK &bull; INDIA</span>
          </div>
        </div>

        {/* Live IST Clock & Sound Button */}
        <div className="hidden md:flex items-center gap-6">
          <div className="font-mono text-xs text-text-muted tabular-nums">
            {time || 'INDIA (UTC+5:30)'}
          </div>

          <button
            onClick={handleToggleSound}
            aria-label="Toggle ambient sound"
            className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 hover:border-white/30 text-xs font-mono text-text-secondary transition-all"
          >
            <span className="flex items-end gap-0.5 h-3">
              <span
                className={`w-0.5 bg-accent rounded-full transition-all duration-300 ${
                  !muted ? 'h-3 animate-pulse' : 'h-1 opacity-50'
                }`}
              />
              <span
                className={`w-0.5 bg-accent rounded-full transition-all duration-300 ${
                  !muted ? 'h-2 animate-pulse delay-75' : 'h-1 opacity-50'
                }`}
              />
              <span
                className={`w-0.5 bg-accent rounded-full transition-all duration-300 ${
                  !muted ? 'h-3.5 animate-pulse delay-150' : 'h-1 opacity-50'
                }`}
              />
            </span>
            <span>{muted ? 'SOUND: OFF' : 'SOUND: ON'}</span>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-mono text-text-secondary hover:text-white transition-colors relative group py-1"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="https://github.com/chand7577"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded border border-accent/40 text-accent font-mono text-xs hover:bg-accent/10 transition-colors"
          >
            GITHUB ↗
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden p-2 text-text-secondary hover:text-white"
          aria-label="Toggle navigation menu"
        >
          <div className="w-6 h-4 flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-white transition-all ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`w-full h-0.5 bg-white transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-white transition-all ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden mt-4 pt-4 border-t border-white/10 flex flex-col gap-4 font-mono text-sm">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-text-secondary hover:text-white py-1"
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <button
              onClick={handleToggleSound}
              className="text-xs text-text-muted hover:text-white flex items-center gap-2"
            >
              SOUND: {muted ? 'OFF' : 'ON'}
            </button>
            <a
              href="https://github.com/chand7577"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent"
            >
              GITHUB ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
