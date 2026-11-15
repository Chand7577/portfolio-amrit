import React from 'react';

export interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  texts?: React.ReactNode[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: { input: number[]; output: number[] };
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  separator?: React.ReactNode;
  pauseOnHover?: boolean;
  fadeEdges?: boolean;
  skewWithVelocity?: number;
  scaleWithVelocity?: number;
  outlineAlternate?: boolean;
  gap?: number;
  fontSize?: number | string;
  fontWeight?: number | string;
  color?: string;
  draggable?: boolean;
}

export declare const ScrollVelocity: React.FC<ScrollVelocityProps>;
export default ScrollVelocity;
