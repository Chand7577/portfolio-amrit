'use client';

import React, { useEffect, useRef } from 'react';

export interface HalftoneRevealProps {
  imageSrc: string;
  className?: string;
  paperColor?: string; // Base canvas color (default '#121324')
  inkColor?: string; // Halftone dot color (default '#D8DFE8')
  revealRadius?: number; // Radius in px where dots swell and photo is revealed (default 190)
  softness?: number; // Feathering/blend edge width (default 65)
  dotSize?: number; // Grid spacing in px (default 9)
  contrast?: number; // Contrast boost for dots (default 1.2)
  brightness?: number; // Brightness boost (default 1.05)
  wander?: boolean; // Autonomous gentle floating reveal when cursor is idle (default true)
  clickBurst?: boolean; // Ripple shockwave on click (default true)
  anchor?: 'center' | 'right'; // Image cover anchoring (default 'right')
}

// Helper to convert hex color to normalized RGB [0..1]
function hexToRGB(hex: string): [number, number, number] {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return [0.07, 0.07, 0.14];
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255,
  ];
}

const VERTEX_SHADER_SRC = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `
precision highp float;

uniform sampler2D u_image;
uniform vec2 u_resolution;
uniform vec2 u_imageResolution;
uniform vec2 u_mouse;
uniform float u_revealRadius;
uniform float u_softness;
uniform float u_dotSize;
uniform vec3 u_paperColor;
uniform vec3 u_inkColor;
uniform float u_contrast;
uniform float u_brightness;
uniform float u_hover;
uniform float u_time;
uniform float u_burstProgress;
uniform vec2 u_burstOrigin;
uniform int u_anchorRight;

varying vec2 v_uv;

// Compute UV to achieve object-cover with right or center anchoring
vec2 getCoverUV(vec2 screenUV) {
  float canvasAspect = u_resolution.x / u_resolution.y;
  float imageAspect = u_imageResolution.x / u_imageResolution.y;

  vec2 ratio = vec2(
    min(canvasAspect / imageAspect, 1.0),
    min(imageAspect / canvasAspect, 1.0)
  );

  vec2 uv;
  if (u_anchorRight == 1) {
    // Anchor to right edge: right edge of image aligns with right edge of canvas
    uv.x = 1.0 - (1.0 - screenUV.x) * ratio.x;
  } else {
    // Center horizontally
    uv.x = (screenUV.x - 0.5) * ratio.x + 0.5;
  }
  // Center vertically
  uv.y = (screenUV.y - 0.5) * ratio.y + 0.5;

  return uv;
}

void main() {
  vec2 fragCoord = gl_FragCoord.xy;
  vec2 screenUV = fragCoord / u_resolution;

  // Real sharp photo UV and color
  vec2 photoUV = getCoverUV(screenUV);
  vec4 photoColor = texture2D(u_image, clamp(photoUV, 0.0, 1.0));

  // Halftone Screen rotated at 45 degrees
  float angle = 0.78539816339; // 45 deg
  float s = sin(angle);
  float c = cos(angle);
  mat2 rot = mat2(c, -s, s, c);
  mat2 invRot = mat2(c, s, -s, c);

  vec2 rotatedCoord = rot * fragCoord;
  vec2 cellIndex = floor(rotatedCoord / u_dotSize);
  vec2 cellCenterRot = (cellIndex + 0.5) * u_dotSize;
  vec2 cellCenter = invRot * cellCenterRot;

  // Sample image at the center of each dot cell
  vec2 cellScreenUV = cellCenter / u_resolution;
  vec2 cellPhotoUV = getCoverUV(cellScreenUV);
  vec4 cellSample = texture2D(u_image, clamp(cellPhotoUV, 0.0, 1.0));

  // Luminance calculation
  float lum = dot(cellSample.rgb, vec3(0.299, 0.587, 0.114));
  lum = clamp((lum - 0.5) * u_contrast + 0.5 * u_brightness, 0.0, 1.0);

  // Distance from this fragment to dot center in rotated space
  float distToDot = length(rotatedCoord - cellCenterRot);

  // Distance to mouse pointer
  float distToMouse = length(fragCoord - u_mouse);

  // Reveal factor: 1.0 near mouse, smoothly tapering to 0.0 at revealRadius
  float revealFactor = 1.0 - smoothstep(u_revealRadius - u_softness, u_revealRadius, distToMouse);
  revealFactor *= u_hover;

  // Click burst ripple effect: expanding ring that temporarily swells and reveals
  float burstFactor = 0.0;
  if (u_burstProgress > 0.0 && u_burstProgress < 1.0) {
    float burstRadius = u_burstProgress * (u_revealRadius * 2.8);
    float distToBurst = length(fragCoord - u_burstOrigin);
    float ringWidth = 80.0 * (1.0 - u_burstProgress);
    float ringDist = abs(distToBurst - burstRadius);
    burstFactor = (1.0 - smoothstep(0.0, ringWidth, ringDist)) * (1.0 - u_burstProgress);
  }

  float totalInfluence = clamp(revealFactor + burstFactor, 0.0, 1.0);

  // Halftone Dot sizing:
  // Base dot radius proportional to luminance
  float maxBaseRadius = u_dotSize * 0.7071;
  float baseDotRadius = lum * maxBaseRadius;

  // SWELL EFFECT: Dots swell up to 2.4x their base size as cursor nears!
  float swellMultiplier = 1.0 + totalInfluence * 1.5;
  float currentDotRadius = baseDotRadius * swellMultiplier;

  // Antialiased circular dot mask
  float edgeWidth = 1.25;
  float dotMask = 1.0 - smoothstep(currentDotRadius - edgeWidth, currentDotRadius + edgeWidth, distToDot);

  // Dot color transition: from stylized monochrome ink to vivid sampled photo color
  vec3 baseInk = mix(u_paperColor, u_inkColor, 0.85);
  vec3 activeDotColor = mix(baseInk, cellSample.rgb * 1.15, totalInfluence * 0.85);

  // Composite halftone print: ink dots over paper background
  vec3 halftonePrint = mix(u_paperColor, activeDotColor, dotMask);

  // PHOTO REVEAL:
  // Under the cursor, smoothly dissolve from the swollen dots into the real photo!
  float innerCoreRadius = max(u_revealRadius - u_softness, 40.0);
  float photoBlend = 1.0 - smoothstep(innerCoreRadius * 0.35, u_revealRadius, distToMouse);
  photoBlend = clamp(photoBlend * u_hover + burstFactor * 0.7, 0.0, 1.0);

  // Final composite
  vec3 finalColor = mix(halftonePrint, photoColor.rgb, photoBlend);

  gl_FragColor = vec4(finalColor, 1.0);
}
`;

export default function HalftoneReveal({
  imageSrc,
  className = '',
  paperColor = '#121324',
  inkColor = '#D8DFE8',
  revealRadius = 190,
  softness = 65,
  dotSize = 9,
  contrast = 1.2,
  brightness = 1.05,
  wander = true,
  clickBurst = true,
  anchor = 'right',
}: HalftoneRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // State refs for physics & animation
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const targetMouseRef = useRef({ x: -9999, y: -9999 });
  const hoverRef = useRef(0);
  const targetHoverRef = useRef(0);
  const burstRef = useRef({ progress: 1.0, x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext('webgl', {
        alpha: false,
        antialias: true,
        preserveDrawingBuffer: false,
        powerPreference: 'high-performance',
      }) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) {
      console.warn('WebGL not supported for HalftoneReveal');
      return;
    }

    // Helper to compile shader
    const compileShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Fullscreen quad [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]
    const quadVertices = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, 'u_resolution');
    const uImageResolution = gl.getUniformLocation(program, 'u_imageResolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');
    const uRevealRadius = gl.getUniformLocation(program, 'u_revealRadius');
    const uSoftness = gl.getUniformLocation(program, 'u_softness');
    const uDotSize = gl.getUniformLocation(program, 'u_dotSize');
    const uPaperColor = gl.getUniformLocation(program, 'u_paperColor');
    const uInkColor = gl.getUniformLocation(program, 'u_inkColor');
    const uContrast = gl.getUniformLocation(program, 'u_contrast');
    const uBrightness = gl.getUniformLocation(program, 'u_brightness');
    const uHover = gl.getUniformLocation(program, 'u_hover');
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uBurstProgress = gl.getUniformLocation(program, 'u_burstProgress');
    const uBurstOrigin = gl.getUniformLocation(program, 'u_burstOrigin');
    const uAnchorRight = gl.getUniformLocation(program, 'u_anchorRight');

    // Create and bind texture with Y-flip
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // 1x1 initial placeholder pixel matching paper color
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([18, 19, 36, 255])
    );

    let imgWidth = 1672;
    let imgHeight = 941;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;
    img.onload = () => {
      imgWidth = img.naturalWidth || 1672;
      imgHeight = img.naturalHeight || 941;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        img
      );
    };

    // Color uniforms
    const paperRGB = hexToRGB(paperColor);
    const inkRGB = hexToRGB(inkColor);

    let animationFrameId: number;
    const startTime = performance.now();

    // Sizing and resolution
    const resize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.floor(canvas.clientWidth * dpr);
      const displayHeight = Math.floor(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    // Render loop
    const render = (time: number) => {
      const elapsed = (time - startTime) * 0.001;

      // Smooth lerp hover factor
      hoverRef.current += (targetHoverRef.current - hoverRef.current) * 0.08;

      // Handle wander when not actively hovered
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let targetX = targetMouseRef.current.x * dpr;
      let targetY = (canvas.clientHeight - targetMouseRef.current.y) * dpr;

      if (wander && targetHoverRef.current < 0.2) {
        // Autonomous gentle floating wander across the right half
        const cx = canvas.width * (anchor === 'right' ? 0.72 : 0.5);
        const cy = canvas.height * 0.48;
        const rx = canvas.width * 0.16;
        const ry = canvas.height * 0.2;
        targetX = cx + Math.cos(elapsed * 0.75) * rx;
        targetY = cy + Math.sin(elapsed * 1.5) * 0.5 * ry;
        hoverRef.current = Math.max(hoverRef.current, 0.85);
      }

      // Smooth lerp mouse coordinates
      if (mouseRef.current.x < -9000) {
        mouseRef.current.x = targetX;
        mouseRef.current.y = targetY;
      } else {
        mouseRef.current.x += (targetX - mouseRef.current.x) * 0.12;
        mouseRef.current.y += (targetY - mouseRef.current.y) * 0.12;
      }

      // Burst ripple progression
      if (burstRef.current.progress < 1.0) {
        burstRef.current.progress += 0.022; // ~45 frames duration
        if (burstRef.current.progress > 1.0) {
          burstRef.current.progress = 1.0;
        }
      }

      gl.useProgram(program);

      // Set uniforms
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uImageResolution, imgWidth, imgHeight);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uRevealRadius, revealRadius * dpr);
      gl.uniform1f(uSoftness, softness * dpr);
      gl.uniform1f(uDotSize, dotSize * dpr);
      gl.uniform3f(uPaperColor, paperRGB[0], paperRGB[1], paperRGB[2]);
      gl.uniform3f(uInkColor, inkRGB[0], inkRGB[1], inkRGB[2]);
      gl.uniform1f(uContrast, contrast);
      gl.uniform1f(uBrightness, brightness);
      gl.uniform1f(uHover, hoverRef.current);
      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uBurstProgress, burstRef.current.progress);
      gl.uniform2f(
        uBurstOrigin,
        burstRef.current.x * dpr,
        (canvas.clientHeight - burstRef.current.y) * dpr
      );
      gl.uniform1i(uAnchorRight, anchor === 'right' ? 1 : 0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Track pointer across the entire hero section
    const interactionTarget = canvas.closest('section') || canvas.parentElement || canvas;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      targetMouseRef.current = { x, y };
      targetHoverRef.current = 1.0;
    };

    const handlePointerLeave = () => {
      targetHoverRef.current = 0.0;
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickBurst) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      burstRef.current = { progress: 0.0, x, y };
    };

    interactionTarget.addEventListener('mousemove', handlePointerMove as any);
    interactionTarget.addEventListener('mouseleave', handlePointerLeave);
    interactionTarget.addEventListener('touchmove', handlePointerMove as any, {
      passive: true,
    });
    interactionTarget.addEventListener('touchend', handlePointerLeave);
    interactionTarget.addEventListener('click', handleClick as any);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      interactionTarget.removeEventListener('mousemove', handlePointerMove as any);
      interactionTarget.removeEventListener('mouseleave', handlePointerLeave);
      interactionTarget.removeEventListener('touchmove', handlePointerMove as any);
      interactionTarget.removeEventListener('touchend', handlePointerLeave);
      interactionTarget.removeEventListener('click', handleClick as any);

      gl.deleteBuffer(vertexBuffer);
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
    };
  }, [
    imageSrc,
    paperColor,
    inkColor,
    revealRadius,
    softness,
    dotSize,
    contrast,
    brightness,
    wander,
    clickBurst,
    anchor,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
}
