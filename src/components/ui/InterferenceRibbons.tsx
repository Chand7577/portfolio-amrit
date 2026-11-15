'use client';

import React, { useEffect, useRef } from 'react';

export interface InterferenceRibbonsProps {
  colors?: string[];
  backgroundColor?: string;
  mode?: 'glow' | 'ink' | 'auto';
  wires?: number;
  lineWidth?: number;
  ribbonWidth?: number;
  amplitude?: number;
  waveLength?: number;
  angle?: number;
  twist?: number;
  curl?: number;
  depth?: number;
  stripes?: number;
  colorFlow?: number;
  speed?: number;
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Convert hex color to RGB tuple
function hexToRgb(hex: string): [number, number, number] {
  let c = hex.replace('#', '').trim();
  if (c.length === 3) {
    c = c.split('').map((char) => char + char).join('');
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return [255, 255, 255];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

// Linear color interpolation
function lerpColor(
  c1: [number, number, number],
  c2: [number, number, number],
  t: number
): [number, number, number] {
  return [
    Math.round(c1[0] + (c2[0] - c1[0]) * t),
    Math.round(c1[1] + (c2[1] - c1[1]) * t),
    Math.round(c1[2] + (c2[2] - c1[2]) * t),
  ];
}

export default function InterferenceRibbons({
  colors = ['#818cf8', '#c084fc', '#38bdf8', '#ffffff'],
  backgroundColor = 'transparent',
  mode = 'glow',
  wires = 54,
  lineWidth = 1.3,
  ribbonWidth = 0.28,
  amplitude = 0.55,
  waveLength = 1.0,
  angle = 35,
  twist = 1.8,
  curl = 0.22,
  depth = 0.65,
  stripes = 2.0,
  colorFlow = 0.8,
  speed = 0.5,
  interactive = true,
  className = '',
  style,
}: InterferenceRibbonsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = false;

    // Mouse tracking for subtle attraction/distortion
    const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, active: false };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      mouse.targetX = (e.clientX - rect.left) / rect.width;
      mouse.targetY = (e.clientY - rect.top) / rect.height;
      mouse.active = true;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.targetX = 0.5;
      mouse.targetY = 0.5;
    };

    if (interactive) {
      container.addEventListener('pointermove', handlePointerMove);
      container.addEventListener('pointerleave', handlePointerLeave);
    }

    const rgbColors = colors.map(hexToRgb);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = Math.max(rect.width, 10);
      height = Math.max(rect.height, 10);
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    let startTime = performance.now();

    const sampleColor = (tVal: number): [number, number, number] => {
      const count = rgbColors.length;
      if (count === 0) return [255, 255, 255];
      if (count === 1) return rgbColors[0];

      const mod = ((tVal % 1) + 1) % 1;
      const scaled = mod * count;
      const idx = Math.floor(scaled);
      const frac = scaled - idx;
      const c1 = rgbColors[idx % count];
      const c2 = rgbColors[(idx + 1) % count];
      return lerpColor(c1, c2, frac);
    };

    const SAMPLES = 60; // optimized sample points along length
    const radAngle = (angle * Math.PI) / 180;
    const cosA = Math.cos(radAngle);
    const sinA = Math.sin(radAngle);

    const render = (now: number) => {
      if (!isVisible) return;

      const elapsed = (now - startTime) / 1000;
      const time = elapsed * speed;

      // Smooth mouse easing
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.save();
      ctx.scale(dpr, dpr);

      // Background clearing
      if (backgroundColor && backgroundColor !== 'transparent') {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      // Blend mode: 'glow' uses additive blending for luminous knots
      if (mode === 'glow') {
        ctx.globalCompositeOperation = 'lighter';
      } else {
        ctx.globalCompositeOperation = 'source-over';
      }

      const diag = Math.hypot(width, height);
      const actualRibbonWidth = diag * ribbonWidth;
      const actualAmp = Math.min(width, height) * amplitude * 0.45;

      // Mouse deflection center
      const mouseOffsetX = (mouse.x - 0.5) * width * 0.15;
      const mouseOffsetY = (mouse.y - 0.5) * height * 0.15;

      // Draw each wire (GPU-friendly: no CPU shadowBlur)
      for (let w = 0; w < wires; w++) {
        // u is the normalized lateral coordinate along the ribbon [-0.5, 0.5]
        const u = wires > 1 ? w / (wires - 1) - 0.5 : 0;

        // Color for this wire
        const colorT = u * stripes + time * colorFlow;
        const [r, g, b] = sampleColor(colorT);

        // Precompute path points
        ctx.beginPath();
        let first = true;
        let avgZ = 0;

        for (let i = 0; i <= SAMPLES; i++) {
          const s = i / SAMPLES; // Parameter along length [0, 1]
          // Spine position traveling across diagonal
          const spineDist = (s - 0.5) * diag * 1.35;
          const baseX = width / 2 + cosA * spineDist + mouseOffsetX * (1 - Math.abs(s - 0.5) * 1.8);
          const baseY = height / 2 + sinA * spineDist + mouseOffsetY * (1 - Math.abs(s - 0.5) * 1.8);

          // Undulation wave
          const wavePhase = s * waveLength * Math.PI * 2 - time * 2.2;
          const waveOffset = Math.sin(wavePhase) * actualAmp;
          const waveOffset2 = Math.cos(wavePhase * 0.5 + time) * (actualAmp * 0.35);

          // Normal direction perpendicular to main angle
          const normX = -sinA;
          const normY = cosA;

          // Twist angle around the spine
          const twistPhase = s * twist * Math.PI * 2 + time * 1.2;
          const cosTwist = Math.cos(twistPhase);
          const sinTwist = Math.sin(twistPhase);

          // Curl: non-linear lateral parabolic curl
          const curlOffset = (u * u - 0.25) * curl * actualRibbonWidth;

          // 3D coordinates relative to spine
          const lateral = u * actualRibbonWidth;
          const ribbonX = lateral * cosTwist - curlOffset * sinTwist;
          const ribbonZ = lateral * sinTwist + curlOffset * cosTwist;

          // Final 2D screen coordinate
          const px = baseX + normX * (waveOffset + ribbonX) + normY * waveOffset2;
          const py = baseY + normY * (waveOffset + ribbonX) - normX * waveOffset2;

          avgZ += ribbonZ;

          if (first) {
            ctx.moveTo(px, py);
            first = false;
          } else {
            ctx.lineTo(px, py);
          }
        }

        avgZ /= SAMPLES + 1;

        // Depth cueing: strands in back thin and dim
        const normZ = avgZ / (actualRibbonWidth * 0.5 || 1);
        const depthFactor = Math.max(0.35, 1 - normZ * depth * 0.45);

        const alpha = Math.min(1, Math.max(0.35, 0.9 * depthFactor));
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.lineWidth = Math.max(0.9, lineWidth * depthFactor);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    // Pause completely when off-screen to save CPU/GPU
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          startTime = performance.now();
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(render);
        } else if (!isVisible && wasVisible) {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { rootMargin: '80px' }
    );
    intersectionObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (interactive) {
        container.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('pointerleave', handlePointerLeave);
      }
    };
  }, [
    colors,
    backgroundColor,
    mode,
    wires,
    lineWidth,
    ribbonWidth,
    amplitude,
    waveLength,
    angle,
    twist,
    curl,
    depth,
    stripes,
    colorFlow,
    speed,
    interactive,
  ]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden pointer-events-auto select-none ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
