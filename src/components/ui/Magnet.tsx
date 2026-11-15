'use client';

import React, { useRef, useState, useEffect } from 'react';

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  magnetStrength?: number;
  className?: string;
  disabled?: boolean;
}

export default function Magnet({
  children,
  padding = 80,
  magnetStrength = 0.28,
  className = '',
  disabled = false,
}: MagnetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    // Disable on touch devices and reduced-motion preferences
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (isTouch || reducedMotion || disabled) {
      setIsSupported(false);
    }
  }, [disabled]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isSupported || !containerRef.current) return;

    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < Math.max(width, height) + padding) {
      setPosition({
        x: distanceX * magnetStrength,
        y: distanceY * magnetStrength,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block ${className}`}
    >
      <div
        className="transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: isSupported
            ? `translate3d(${position.x}px, ${position.y}px, 0)`
            : 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
}
