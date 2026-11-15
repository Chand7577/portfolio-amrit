'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ParticleSelfProps {
  scrollProgress?: number; // 0 (start) to 1 (fully dispersed / zoomed)
  className?: string;
  onLoaded?: () => void;
}

export default function ParticleSelf({
  scrollProgress = 0,
  className = '',
  onLoaded,
}: ParticleSelfProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeMode, setActiveMode] = useState<'particles' | 'photo'>('particles');

  // Animation & Three.js refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const ambientPointsRef = useRef<THREE.Points | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Interaction tracking
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollProgressRef = useRef(scrollProgress);
  scrollProgressRef.current = scrollProgress;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let destroyed = false;

    // 1. Scene & Camera Setup
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 5.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // 100% transparent background
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Generate Soft Radial Glow Particle Texture
    const createGlowTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.25, 'rgba(255, 240, 220, 0.85)');
      gradient.addColorStop(0.55, 'rgba(180, 210, 255, 0.35)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      return texture;
    };

    const particleTexture = createGlowTexture();

    // 3. Load & Sample Amrit's Hooded Portrait
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/cinematic/hero-portrait.webp';

    img.onload = () => {
      if (destroyed) return;

      const sampleCanvas = document.createElement('canvas');
      // Sampling grid: 140 width gives ~18,000 - 24,000 crisp facial points
      const sampleW = 140;
      const aspect = img.height / img.width;
      const sampleH = Math.round(sampleW * aspect);
      sampleCanvas.width = sampleW;
      sampleCanvas.height = sampleH;

      const sCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });
      if (!sCtx) return;

      sCtx.drawImage(img, 0, 0, sampleW, sampleH);
      const imgData = sCtx.getImageData(0, 0, sampleW, sampleH).data;

      const positions: number[] = [];
      const originalPositions: number[] = [];
      const scatterPositions: number[] = [];
      const colors: number[] = [];
      const randomOffsets: number[] = [];

      const spreadX = 3.6;
      const spreadY = spreadX * aspect;

      for (let y = 0; y < sampleH; y++) {
        for (let x = 0; x < sampleW; x++) {
          const idx = (y * sampleW + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];

          const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

          // Only keep pixels with perceptible illumination
          if (brightness > 14 && a > 40) {
            // Normalized centered coordinates
            const nx = (x / sampleW - 0.5) * spreadX;
            const ny = -(y / sampleH - 0.5) * spreadY;

            // Head curvature / 3D depth from luminance & cylindrical volume
            const distFromCenterX = (x / sampleW - 0.5) * 2;
            const distFromCenterY = (y / sampleH - 0.5) * 2;
            const cylinderZ = Math.sqrt(Math.max(0, 1 - distFromCenterX * distFromCenterX * 0.7)) * 0.5;
            const lumaZ = (brightness / 255) * 0.55;
            const nz = cylinderZ + lumaZ - 0.35;

            // Store original coordinates
            positions.push(nx, ny, nz);
            originalPositions.push(nx, ny, nz);

            // Scatter destination for scroll dispersion (vortex swirl)
            const angle = Math.random() * Math.PI * 2;
            const radius = 2.0 + Math.random() * 4.5;
            const sx = nx + Math.cos(angle) * radius;
            const sy = ny + Math.sin(angle) * radius;
            const sz = nz + (Math.random() - 0.5) * 6.0;
            scatterPositions.push(sx, sy, sz);

            // Dynamic color grading: boost warm orange highlights and electric blue rim
            const isBlueRim = b > r && b > 80;
            const isOrangeKey = r > b && r > 100;
            let finalR = r / 255;
            let finalG = g / 255;
            let finalB = b / 255;

            if (isBlueRim) {
              finalB = Math.min(1.0, finalB * 1.35);
              finalG = Math.min(1.0, finalG * 1.15);
            } else if (isOrangeKey) {
              finalR = Math.min(1.0, finalR * 1.25);
              finalG = Math.min(1.0, finalG * 0.95);
            }

            colors.push(finalR, finalG, finalB);
            randomOffsets.push(Math.random() * Math.PI * 2);
          }
        }
      }

      // Build Three.js Geometry for Particle Self
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

      // Custom attributes for interpolation
      (geometry as unknown as { originalPositions: Float32Array }).originalPositions = new Float32Array(originalPositions);
      (geometry as unknown as { scatterPositions: Float32Array }).scatterPositions = new Float32Array(scatterPositions);
      (geometry as unknown as { randomOffsets: Float32Array }).randomOffsets = new Float32Array(randomOffsets);

      const material = new THREE.PointsMaterial({
        size: 0.048,
        vertexColors: true,
        transparent: true,
        opacity: 0.92,
        map: particleTexture ?? undefined,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const points = new THREE.Points(geometry, material);
      points.position.set(0, -0.05, 0);
      scene.add(points);
      pointsRef.current = points;

      // 4. Ambient Floating Dust/Ember Particles (adds cinematic depth)
      const ambientCount = 800;
      const ambientGeo = new THREE.BufferGeometry();
      const ambPos: number[] = [];
      const ambColors: number[] = [];

      for (let i = 0; i < ambientCount; i++) {
        ambPos.push(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 9,
          (Math.random() - 0.5) * 8
        );
        // Orange & Blue embers
        if (Math.random() > 0.5) {
          ambColors.push(1.0, 0.6, 0.25);
        } else {
          ambColors.push(0.3, 0.7, 1.0);
        }
      }

      ambientGeo.setAttribute('position', new THREE.Float32BufferAttribute(ambPos, 3));
      ambientGeo.setAttribute('color', new THREE.Float32BufferAttribute(ambColors, 3));

      const ambientMat = new THREE.PointsMaterial({
        size: 0.032,
        vertexColors: true,
        transparent: true,
        opacity: 0.45,
        map: particleTexture ?? undefined,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const ambientPoints = new THREE.Points(ambientGeo, ambientMat);
      scene.add(ambientPoints);
      ambientPointsRef.current = ambientPoints;

      setIsLoaded(true);
      if (onLoaded) onLoaded();
    };

    // Fallback if webp fails to load
    img.onerror = () => {
      img.src = '/cinematic/hero-portrait.png';
    };

    // 5. Mouse Interaction Handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x * 0.35; // Target Y-rotation in radians
      mouseRef.current.targetY = y * 0.2;  // Target X-rotation in radians
    };

    window.addEventListener('mousemove', handleMouseMove);

    // 6. Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 7. Render Loop (Synchronized with RAF)
    let clock = 0;
    const animate = () => {
      if (destroyed) return;
      clock += 0.015;

      // Smooth mouse damping (Lerp)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const p = scrollProgressRef.current; // 0.0 to 1.0

      if (pointsRef.current) {
        // Base 3D rotation with mouse tilt + subtle organic idle breathe
        pointsRef.current.rotation.y = mouseRef.current.x + Math.sin(clock * 0.5) * 0.03;
        pointsRef.current.rotation.x = -mouseRef.current.y + Math.cos(clock * 0.4) * 0.02;

        // Position shifts on scroll: camera push and particle dispersion
        const geo = pointsRef.current.geometry;
        const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
        const orig = (geo as unknown as { originalPositions: Float32Array }).originalPositions;
        const scat = (geo as unknown as { scatterPositions: Float32Array }).scatterPositions;
        const offsets = (geo as unknown as { randomOffsets: Float32Array }).randomOffsets;

        if (posAttr && orig && scat) {
          const count = posAttr.count;
          const posArr = posAttr.array as Float32Array;
          const easeProgress = Math.min(1.0, Math.max(0.0, p * 1.5));

          for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const breathe = Math.sin(clock * 1.2 + offsets[i]) * 0.015;

            // Interpolate position from face shape to scattered vortex
            posArr[i3] = THREE.MathUtils.lerp(orig[i3] + breathe, scat[i3], easeProgress);
            posArr[i3 + 1] = THREE.MathUtils.lerp(orig[i3 + 1] + breathe, scat[i3 + 1], easeProgress);
            posArr[i3 + 2] = THREE.MathUtils.lerp(orig[i3 + 2], scat[i3 + 2], easeProgress);
          }
          posAttr.needsUpdate = true;
        }

        // Opacity drops smoothly as user scrolls far down into other acts
        const mat = pointsRef.current.material as THREE.PointsMaterial;
        mat.opacity = Math.max(0, 0.92 * (1 - Math.max(0, (p - 0.3) / 0.7)));
      }

      // Rotate ambient embers
      if (ambientPointsRef.current) {
        ambientPointsRef.current.rotation.y = clock * 0.04;
        ambientPointsRef.current.rotation.x = Math.sin(clock * 0.03) * 0.05;
      }

      renderer.render(scene, camera);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      destroyed = true;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

      if (pointsRef.current) {
        pointsRef.current.geometry.dispose();
        (pointsRef.current.material as THREE.Material).dispose();
      }
      if (ambientPointsRef.current) {
        ambientPointsRef.current.geometry.dispose();
        (ambientPointsRef.current.material as THREE.Material).dispose();
      }
      if (particleTexture) particleTexture.dispose();
      if (rendererRef.current) {
        rendererRef.current.dispose();
        if (rendererRef.current.domElement.parentNode) {
          rendererRef.current.domElement.parentNode.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, [onLoaded]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* 3D WebGL Canvas Mount Container */}
      <div
        ref={mountRef}
        className={`w-full h-full transition-opacity duration-700 ${
          activeMode === 'particles' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* High-Definition Photographic Fallback / Crossfade Layer */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 pointer-events-none ${
          activeMode === 'photo' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <picture>
          <source srcSet="/cinematic/hero-portrait.webp" type="image/webp" />
          <img
            src="/cinematic/hero-portrait.png"
            alt="Amrit Chand Cinematic Hooded Portrait in Blue and Orange"
            className="w-full h-full object-cover object-center"
          />
        </picture>
      </div>

      {/* Mode Selector Pill Badge (Top Right of Hero) */}
      <div className="absolute top-24 sm:top-28 right-6 sm:right-10 z-40 flex items-center gap-1.5 p-1 rounded-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-lg pointer-events-auto">
        <button
          onClick={() => setActiveMode('particles')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
            activeMode === 'particles'
              ? 'bg-white text-black font-semibold shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>3D Particle Self</span>
        </button>
        <button
          onClick={() => setActiveMode('photo')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-all ${
            activeMode === 'photo'
              ? 'bg-white text-black font-semibold shadow-sm'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          <span>Cinematic Shot</span>
        </button>
      </div>

      {/* Loading Indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#030303] z-50 pointer-events-none">
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              Synthesizing 3D Particle Cloud...
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
