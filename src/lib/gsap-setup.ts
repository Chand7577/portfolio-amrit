'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { Flip } from 'gsap/Flip';
import { Observer } from 'gsap/Observer';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

// Register all plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(
    ScrollTrigger,
    ScrollSmoother,
    SplitText,
    Draggable,
    InertiaPlugin,
    Flip,
    Observer,
    DrawSVGPlugin
  );
}

export {
  gsap,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  Draggable,
  InertiaPlugin,
  Flip,
  Observer,
  DrawSVGPlugin,
};
