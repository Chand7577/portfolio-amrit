'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleThemeWithRipple: (event: React.MouseEvent<HTMLElement>) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 1. Check local storage or system preference
    const saved = localStorage.getItem('portfolio-theme') as Theme | null;
    const initialTheme: Theme =
      saved === 'light' || saved === 'dark'
        ? saved
        : window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark';

    setThemeState(initialTheme);
    applyThemeToDOM(initialTheme);
    setMounted(true);
  }, []);

  const applyThemeToDOM = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    }
    localStorage.setItem('portfolio-theme', newTheme);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyThemeToDOM(newTheme);
  };

  const toggleThemeWithRipple = (e: React.MouseEvent<HTMLElement>) => {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

    // Click coordinates
    const target = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || target.left + target.width / 2;
    const y = e.clientY || target.top + target.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // ── Create a glowing visual shockwave wave from the origin ────────────
    const shockwave = document.createElement('div');
    shockwave.className = 'theme-shockwave-pulse';
    shockwave.style.left = `${x}px`;
    shockwave.style.top = `${y}px`;
    shockwave.style.borderColor = nextTheme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(100, 150, 255, 0.7)';
    document.body.appendChild(shockwave);
    setTimeout(() => shockwave.remove(), 900);

    // ── Case A: Browser supports native CSS View Transitions API ──────────
    const doc = document as unknown as {
      startViewTransition?: (updateCallback: () => void) => { ready: Promise<void> };
    };

    if (typeof doc.startViewTransition === 'function') {
      const transition = doc.startViewTransition(() => {
        setTheme(nextTheme);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius * 1.05}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 720,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      });
      return;
    }

    // ── Case B: Universal Fallback (Circular expanding overlay ripple) ──────
    const overlay = document.createElement('div');
    overlay.className = 'theme-ripple-mask';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.zIndex = '999999';
    overlay.style.pointerEvents = 'none';
    overlay.style.backgroundColor = nextTheme === 'light' ? '#f7f8fa' : '#030303';
    overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    overlay.style.transition = 'clip-path 700ms cubic-bezier(0.22, 1, 0.36, 1)';
    document.body.appendChild(overlay);

    // Trigger expansion
    requestAnimationFrame(() => {
      overlay.style.clipPath = `circle(${endRadius * 1.05}px at ${x}px ${y}px)`;
    });

    // Flip theme once wave covers viewport, then smoothly dissolve overlay
    setTimeout(() => {
      setTheme(nextTheme);
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 250ms ease';
      setTimeout(() => overlay.remove(), 250);
    }, 550);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleThemeWithRipple }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
