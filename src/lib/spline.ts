import * as THREE from 'three';

/**
 * CatmullRomCurve3 spline — the path the camera (and packet) travels.
 * 6 chapters × ~2 control points each, plus lead-in / lead-out.
 * Stage 1: placeholder geometry. Populated with scene dressing in later stages.
 */
export const SPLINE_POINTS = [
  // ── Ch 0  Boot  ── deep void, terminal facing user ──────────────────────
  new THREE.Vector3(0,   0,   30),  // far back
  new THREE.Vector3(0,   0,   22),  // slow drift toward the terminal

  // ── Ch 1  Gate  ── neon security checkpoint ──────────────────────────────
  new THREE.Vector3(0,   0,   12),  // approaching gate
  new THREE.Vector3(0,   0,    4),  // through the gate

  // ── Ch 2  Stream ── swooping left into rivers of light ───────────────────
  new THREE.Vector3(-6,  2,   -4),  // banking left
  new THREE.Vector3(-8,  1,  -12),  // deep in the stream

  // ── Ch 3  Checkout ── warm market street, ground level ───────────────────
  new THREE.Vector3(-2, -3,  -20),  // descend + sweep right
  new THREE.Vector3( 4, -2,  -27),  // street level

  // ── Ch 4  Brain ── rising into the neural core ───────────────────────────
  new THREE.Vector3( 2,  6,  -34),  // ascending
  new THREE.Vector3( 0, 10,  -40),  // inside the core

  // ── Ch 5  Deploy/Response ── launch upward, then return ──────────────────
  new THREE.Vector3( 0, 20,  -34),  // rockets up
  new THREE.Vector3( 0, 24,  -24),  // orbital wide shot → 200 OK
];

export const spline = new THREE.CatmullRomCurve3(SPLINE_POINTS, false, 'catmullrom', 0.5);

/** Number of chapters (excluding the lead-in). */
export const CHAPTER_COUNT = 6;

/** Normalized t value at the START of each chapter along the spline. */
export const CHAPTER_T: number[] = Array.from(
  { length: CHAPTER_COUNT },
  (_, i) => i / (CHAPTER_COUNT - 1)
);

/**
 * Given a raw scroll progress (0→1), return camera position + look-ahead target.
 * @param t  Scroll progress 0–1
 */
export function getCameraState(t: number): {
  position: THREE.Vector3;
  target: THREE.Vector3;
} {
  const clamped   = THREE.MathUtils.clamp(t, 0, 0.9999);
  const ahead     = THREE.MathUtils.clamp(t + 0.015, 0, 0.9999);

  return {
    position: spline.getPointAt(clamped),
    target:   spline.getPointAt(ahead),
  };
}
