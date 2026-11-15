'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'work', label: 'Work' },
  { id: 'how-it-works', label: 'Process' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export default function SectionNavigator() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-end gap-3">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="group flex items-center gap-2.5"
          aria-label={`Navigate to ${label}`}
        >
          <span
            className={`text-[11px] font-mono font-medium transition-all duration-200 ${
              active === id
                ? 'opacity-100 text-brand translate-x-0'
                : 'opacity-0 text-neutral-500 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
            }`}
          >
            {label}
          </span>
          <span
            className={`rounded-full transition-all duration-150 ${
              active === id
                ? 'w-2 h-2 bg-brand'
                : 'w-1.5 h-1.5 bg-neutral-700 group-hover:bg-neutral-400'
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
