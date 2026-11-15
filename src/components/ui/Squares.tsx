'use client';

import React, { useRef, useEffect, useState } from 'react';

interface SquaresProps {
  direction?: 'right' | 'left' | 'up' | 'down' | 'diagonal';
  speed?: number;
  squareSize?: number;
  borderColor?: string;
  hoverFillColor?: string;
  className?: string;
}

export default function Squares({
  direction = 'diagonal',
  speed = 0.5,
  squareSize = 44,
  borderColor = 'rgba(255, 255, 255, 0.05)',
  hoverFillColor = 'rgba(255, 255, 255, 0.03)',
  className = '',
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredSquare, setHoveredSquare] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    // Check if mobile or reduced-motion
    if (window.innerWidth < 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let gridOffset = { x: 0, y: 0 };

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const startX = Math.floor(gridOffset.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.y / squareSize) * squareSize;

      for (let x = startX; x < canvas.width + squareSize; x += squareSize) {
        for (let y = startY; y < canvas.height + squareSize; y += squareSize) {
          const squareX = x - (gridOffset.x % squareSize);
          const squareY = y - (gridOffset.y % squareSize);

          if (
            hoveredSquare &&
            Math.floor((x - startX) / squareSize) === hoveredSquare.x &&
            Math.floor((y - startY) / squareSize) === hoveredSquare.y
          ) {
            ctx.fillStyle = hoverFillColor;
            ctx.fillRect(squareX, squareY, squareSize, squareSize);
          }

          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.strokeRect(squareX, squareY, squareSize, squareSize);
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.hypot(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(3, 3, 3, 0)');
      gradient.addColorStop(1, '#030303');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const updateAnimation = () => {
      const effectiveSpeed = Math.max(speed, 0.1);
      switch (direction) {
        case 'right':
          gridOffset.x = (gridOffset.x - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'left':
          gridOffset.x = (gridOffset.x + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'up':
          gridOffset.y = (gridOffset.y + effectiveSpeed + squareSize) % squareSize;
          break;
        case 'down':
          gridOffset.y = (gridOffset.y - effectiveSpeed + squareSize) % squareSize;
          break;
        case 'diagonal':
          gridOffset.x = (gridOffset.x - effectiveSpeed + squareSize) % squareSize;
          gridOffset.y = (gridOffset.y - effectiveSpeed + squareSize) % squareSize;
          break;
      }

      draw();
      animationFrameId = requestAnimationFrame(updateAnimation);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const startX = Math.floor(gridOffset.x / squareSize) * squareSize;
      const startY = Math.floor(gridOffset.y / squareSize) * squareSize;

      const hoveredSquareX = Math.floor(
        (mouseX + (gridOffset.x % squareSize) - startX) / squareSize
      );
      const hoveredSquareY = Math.floor(
        (mouseY + (gridOffset.y % squareSize) - startY) / squareSize
      );

      setHoveredSquare({ x: hoveredSquareX, y: hoveredSquareY });
    };

    const handleMouseLeave = () => {
      setHoveredSquare(null);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    updateAnimation();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize, hoveredSquare]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full border-none block ${className}`}
    />
  );
}
