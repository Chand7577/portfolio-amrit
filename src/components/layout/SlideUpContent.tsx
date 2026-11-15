'use client';

/**
 * SlideUpContent
 *
 * How the curtain effect works:
 * ─────────────────────────────
 * 1. HeroSection is `position: sticky; top: 0; height: 100vh; z-index: 10`
 *    It stays glued to the top of the viewport as user scrolls down.
 *
 * 2. This panel sits directly after the hero in DOM flow, so its top
 *    edge is naturally at y = 100vh (the very bottom of the viewport)
 *    on first load.
 *
 * 3. As the user scrolls, the panel rises from the bottom of the
 *    screen upward, overlaying the sticky hero — a "curtain lifting"
 *    or "panel sliding up" effect.
 *
 * 4. Once this panel's top reaches the viewport top, the hero is fully
 *    covered and normal scrolling resumes for the rest of the page.
 *
 * No GSAP needed. The sticky hero + natural scroll does it all.
 */
export default function SlideUpContent({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative z-20 bg-[#030303] rounded-t-[2rem] min-h-screen"
      style={{ boxShadow: '0 -32px 80px rgba(0,0,0,1)' }}
    >
      {/* Drag handle */}
      <div className="flex justify-center pt-5 pb-0">
        <div className="w-10 h-1 rounded-full bg-[#2a2a2a]" />
      </div>
      {children}
    </div>
  );
}
