/**
 * Module-level mutable scroll state.
 * Read by Three.js useFrame without triggering React re-renders.
 */
export const scrollState = {
  /** Raw Lenis scroll progress 0 → 1 */
  progress: 0,
  /** Active chapter index 0–5 */
  chapter: 0,
  /** Progress within the current chapter 0 → 1 */
  local: 0,
};
