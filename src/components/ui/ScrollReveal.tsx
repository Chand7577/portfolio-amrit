'use client';
import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

type RevealType = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleUp' | 'clipReveal';

interface ScrollRevealProps {
  children: ReactNode;
  type?: RevealType;
  delay?: number;
  duration?: number;
  start?: string;
  className?: string;
  as?: 'div' | 'section' | 'article';
}

export default function ScrollReveal({
  children,
  type = 'fadeUp',
  delay = 0,
  duration = 0.8,
  start = 'top 85%',
  className = '',
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useScrollReveal<HTMLDivElement>(type, { delay, duration, start });
  
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
