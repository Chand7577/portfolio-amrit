'use client';

import { useEffect, useRef } from 'react';

export function useMousePosition() {
  const screen = useRef({ x: 0, y: 0 });
  const normalized = useRef({ x: 0, y: 0 }); // -1 to +1

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      screen.current = { x: e.clientX, y: e.clientY };
      normalized.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      };
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return { screen, normalized };
}
