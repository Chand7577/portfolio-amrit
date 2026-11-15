'use client';

import { gsap, ScrollTrigger } from '@/lib/gsap-setup';

/**
 * Text reveal animation (alternative to SplitText for non-premium users)
 * Animates text by lines with clip-path reveal
 */
export function revealText(
  element: HTMLElement | string,
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
    ease?: string;
  } = {}
) {
  const {
    duration = 0.8,
    stagger = 0.05,
    delay = 0,
    ease = 'power3.out',
  } = options;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  // Wrap text in spans for line-by-line reveal
  const text = el.textContent || '';
  const words = text.split(' ');
  
  el.innerHTML = words
    .map(
      (word, i) =>
        `<span class="inline-block overflow-hidden"><span class="inline-block" style="transform: translateY(100%)">${word}${
          i < words.length - 1 ? '&nbsp;' : ''
        }</span></span>`
    )
    .join('');

  const spans = el.querySelectorAll('span span');

  return gsap.fromTo(
    spans,
    { yPercent: 100 },
    {
      yPercent: 0,
      duration,
      stagger,
      delay,
      ease,
    }
  );
}

/**
 * Headline reveal with character animation
 * Creates dramatic entrance for hero headlines
 */
export function revealHeadline(
  element: HTMLElement | string,
  options: {
    duration?: number;
    stagger?: number;
    delay?: number;
  } = {}
) {
  const { duration = 0.6, stagger = 0.02, delay = 0.2 } = options;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const text = el.textContent || '';
  const chars = text.split('');

  el.innerHTML = chars
    .map((char) =>
      char === ' '
        ? '<span class="inline-block">&nbsp;</span>'
        : `<span class="inline-block opacity-0" style="transform: translateY(40px) rotate(-5deg)">${char}</span>`
    )
    .join('');

  const spans = el.querySelectorAll('span');

  return gsap.to(spans, {
    opacity: 1,
    y: 0,
    rotation: 0,
    duration,
    stagger,
    delay,
    ease: 'back.out(1.4)',
  });
}

/**
 * Floating animation for project screens
 * Creates gentle hover effect with yoyo repeat
 */
export function floatingAnimation(
  elements: HTMLElement[] | NodeListOf<Element>,
  options: {
    duration?: number;
    y?: number;
    rotation?: number;
    ease?: string;
  } = {}
) {
  const {
    duration = 2.5,
    y = 20,
    rotation = 2,
    ease = 'sine.inOut',
  } = options;

  return gsap.to(elements, {
    y: `random(${-y}, ${y})`,
    rotation: `random(${-rotation}, ${rotation})`,
    duration,
    ease,
    yoyo: true,
    repeat: -1,
    stagger: {
      each: 0.3,
      from: 'random',
    },
  });
}

/**
 * Magnetic button effect
 * Buttons follow cursor within proximity
 */
export function magneticButton(button: HTMLElement, strength: number = 0.3) {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(button, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  button.addEventListener('mousemove', handleMouseMove);
  button.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    button.removeEventListener('mousemove', handleMouseMove);
    button.removeEventListener('mouseleave', handleMouseLeave);
  };
}

/**
 * Parallax effect using pointer position
 * Elements move at different depths based on mouse
 */
export function pointerParallax(
  elements: { el: HTMLElement; depth: number }[]
) {
  const handleMouseMove = (e: MouseEvent) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const percentX = (e.clientX - centerX) / centerX;
    const percentY = (e.clientY - centerY) / centerY;

    elements.forEach(({ el, depth }) => {
      gsap.to(el, {
        x: percentX * depth,
        y: percentY * depth,
        duration: 0.5,
        ease: 'power2.out',
      });
    });
  };

  window.addEventListener('mousemove', handleMouseMove);

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}

/**
 * Quick position transition using quickTo
 * Ultra-performant pointer following
 */
export function quickToAnimation(element: HTMLElement) {
  const xTo = gsap.quickTo(element, 'x', { duration: 0.3, ease: 'power3' });
  const yTo = gsap.quickTo(element, 'y', { duration: 0.3, ease: 'power3' });

  return { xTo, yTo };
}

/**
 * 3D card flip animation
 * Flips card from front to back with perspective
 */
export function flipCard(
  card: HTMLElement,
  isFlipped: boolean,
  options: {
    duration?: number;
    ease?: string;
  } = {}
) {
  const { duration = 0.6, ease = 'back.out(1.2)' } = options;

  return gsap.to(card, {
    rotationY: isFlipped ? 180 : 0,
    duration,
    ease,
    transformStyle: 'preserve-3d',
  });
}

/**
 * Scroll-triggered section pin with scrubbed timeline
 * Pins section and animates based on scroll progress
 */
export function scrollPinAnimation(
  trigger: string | HTMLElement,
  timeline: gsap.core.Timeline,
  options: {
    start?: string;
    end?: string;
    markers?: boolean;
  } = {}
) {
  const { start = 'top top', end = '+=200%', markers = false } = options;

  return ScrollTrigger.create({
    trigger,
    start,
    end,
    pin: true,
    scrub: 1,
    animation: timeline,
    markers,
  });
}

/**
 * Count up animation for numbers
 * Animates from 0 to target value
 */
export function countUp(
  element: HTMLElement | string,
  targetValue: number,
  options: {
    duration?: number;
    decimals?: number;
    suffix?: string;
    prefix?: string;
  } = {}
) {
  const {
    duration = 1.5,
    decimals = 0,
    suffix = '',
    prefix = '',
  } = options;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const obj = { value: 0 };

  return gsap.to(obj, {
    value: targetValue,
    duration,
    ease: 'power2.out',
    snap: { value: 1 / Math.pow(10, decimals) },
    onUpdate: () => {
      el.textContent = prefix + obj.value.toFixed(decimals) + suffix;
    },
  });
}

/**
 * Staggered entrance animation
 * Cards or elements enter with 3D perspective
 */
export function staggeredEntrance(
  elements: HTMLElement[] | NodeListOf<Element>,
  options: {
    stagger?: number;
    duration?: number;
    y?: number;
    rotation?: number;
    scale?: number;
  } = {}
) {
  const {
    stagger = 0.1,
    duration = 0.8,
    y = 60,
    rotation = 5,
    scale = 0.9,
  } = options;

  gsap.set(elements, {
    opacity: 0,
    y,
    rotationX: rotation,
    scale,
  });

  return gsap.to(elements, {
    opacity: 1,
    y: 0,
    rotationX: 0,
    scale: 1,
    duration,
    stagger,
    ease: 'power3.out',
  });
}

/**
 * Image clip-path reveal
 * Reveals images with directional wipe
 */
export function clipPathReveal(
  element: HTMLElement | string,
  direction: 'left' | 'right' | 'top' | 'bottom' = 'right',
  options: {
    duration?: number;
    ease?: string;
  } = {}
) {
  const { duration = 1, ease = 'power2.inOut' } = options;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  const clipPaths = {
    left: { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },
    right: { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },
    top: { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },
    bottom: { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
  };

  gsap.set(el, { clipPath: clipPaths[direction].from });

  return gsap.to(el, {
    clipPath: clipPaths[direction].to,
    duration,
    ease,
  });
}

/**
 * SVG line drawing animation
 * Draws SVG strokes progressively
 */
export function drawSVGLine(
  pathElement: SVGPathElement | string,
  options: {
    duration?: number;
    ease?: string;
    delay?: number;
  } = {}
) {
  const { duration = 1.5, ease = 'power2.inOut', delay = 0 } = options;

  const el =
    typeof pathElement === 'string'
      ? document.querySelector<SVGPathElement>(pathElement)
      : pathElement;
  if (!el) return;

  const length = el.getTotalLength();

  gsap.set(el, {
    strokeDasharray: length,
    strokeDashoffset: length,
  });

  return gsap.to(el, {
    strokeDashoffset: 0,
    duration,
    ease,
    delay,
  });
}

/**
 * Horizontal scroll section
 * Pins vertically and scrolls horizontally
 */
export function horizontalScroll(
  container: HTMLElement | string,
  items: HTMLElement[] | NodeListOf<Element>,
  options: {
    start?: string;
    end?: string;
    scrub?: number | boolean;
  } = {}
) {
  const { start = 'top top', end = '+=300%', scrub = 1 } = options;

  const totalWidth = Array.from(items).reduce(
    (acc, item) => acc + (item as HTMLElement).offsetWidth,
    0
  );

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start,
      end,
      scrub,
      pin: true,
    },
  });

  tl.to(items, {
    x: () => -(totalWidth - window.innerWidth),
    ease: 'none',
  });

  return tl;
}
