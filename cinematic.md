# MASTER PROMPT: Build a Cinematic Scroll-Driven Developer Portfolio

Act as a world-class creative frontend developer, award-winning motion designer, GSAP specialist, and UI/UX engineer.

Transform my existing developer portfolio into an immersive, scroll-driven storytelling experience. It must NOT look or feel like a conventional developer portfolio. Visitors should feel like they are watching a beautifully directed sequence where I am the central character throughout.

---

# 1. CORE CREATIVE DIRECTION

Central concept: **"One Developer. One Workspace. One Continuous Story."**

The visitor feels like a camera moving through my workspace. Each of my five images is a full-screen cinematic shot. As the user scrolls, the camera zooms in and pans so the subject shifts toward one side of the screen, while that section's content flows in from the opposite side over a dark fade. In the next section the camera pans across and the sides swap. This alternates through the whole story.

I am the main character in every image. My workspace, laptop, monitors and lighting stay consistent throughout.

Scroll position is the primary storytelling mechanism. Everything is driven by scroll (scrub), not by timers.

---

# 2. IMAGE ASSETS (EXTREMELY IMPORTANT)

I have five cinematic images named `img-1.png` to `img-5.png` (if they are named `1.png` to `5.png` in the project, use those). First inspect the project structure and locate them. Do NOT replace them with stock photos, generated placeholders, or unrelated images. Do NOT edit, redraw or regenerate their content. Use these exact five images as the foundation of the experience.

All five are wide (about 16:9) scenes of me in a dark hoodie, glasses and beard, sitting at my desk, seen in profile and facing LEFT. I am on the RIGHT side of every image. Approximate positions below are percentages of the image width and height. They are estimates, so view each image to verify before using them in the config.

- **IMAGE 1, HERO SCENE:** Wide shot. Dual monitors (code on the left, dashboard in the middle) on the left half, laptop and my hands at the bottom center (about 42%, 85%), my face at about (60%, 25%), hoodie and chair on the right (65-100%). Establishes the atmosphere.
- **IMAGE 2, CAMERA PUSH-IN:** Almost the same scene, framed slightly lower. Face at about (60%, 28%), laptop at about (38%, 85%). Reads as a small camera move from Image 1.
- **IMAGE 3, SIDE-ANGLE WORKSPACE:** Close-up over the laptop. The laptop screen with code is at about 15-55% x, 25-70% y, my hands at about (45%, 75%), and my face is partly cut off at the top right edge (80-95%, 0-35%). The right 30% is mostly dark hoodie.
- **IMAGE 4, CLOSE-UP CODING SCENE:** Closer still. The laptop with the code editor is at about 8-52% x, 28-78% y, my hands at about (45%, 78%), my face at the top right (70-85%, 5-30%), and the right 40% is dark hoodie. A monitor at the top shows the text "Turning Ideas into Reality".
- **IMAGE 5, PROJECT SHOWCASE:** A large monitor on the left and center (about 10-68% x, 0-72% y) shows a "My Projects" interface with three sample project cards and a row of tech icons. I am on the right (65-100%) with my hand on my chin, and my face is cropped at the right edge.

IMPORTANT:

- Do not display the images as a gallery or stack them as five ordinary sections.
- Use them as full-screen cinematic shots connected through scroll-driven camera moves and crossfades.
- Text already exists inside some images (Image 4 monitor: "Turning Ideas into Reality"; Image 5 monitor: "My Projects", "Real-world solutions. Built with passion.", and three sample project cards). Never place HTML text that repeats or collides with this baked-in text. Keep the zoom away from it, or let the scrim cover it.
- The sample project cards inside Image 5 may not match my real projects. Real project data comes from my portfolio content only. Never treat the image's text as real project information.

**Image handling:**

- The images are fairly low resolution (about 1.7K pixels wide), and the camera zooms in. Upscale the five images to about 3000-3400px wide with a high-quality upscaler (for example Real-ESRGAN or Lanczos plus mild sharpening) and save the upscaled versions as new files. Keep the originals untouched. If upscaling is not possible, cap the zoom at about 1.3x and say so in the final summary.
- Convert the upscaled versions to optimized WebP (or AVIF with a fallback). Keep them sharp when zoomed. Provide a smaller set for mobile.
- Set explicit aspect-ratio/dimensions to prevent layout shift.
- Preload image 1. Load images 2-5 lazily or with low priority, but make sure they are decoded before they are needed, so no transition shows a blank frame.

---

# 3. CINEMATIC SCROLL STRUCTURE

## The camera effect

This is inspired by scroll-driven sites where a large subject starts centered, zooms in, then slides to one side of the screen while content cards appear on the other side. In the next section the subject slides to the opposite side.

My images are full photographs, not cut-outs, so the effect must NEVER reveal a rectangle:

- **The image always fills the full viewport.** Use `object-fit: cover` and never show the image as a card or box.
- **Never reveal an image edge.** When translating a layer, clamp the translation so the image always covers the viewport. With the scale origin at the center, the maximum shift is `(scale - 1) / 2 * viewportSize` on that axis. Use `transform-origin` and per-image focal points to get the framing you want, and clamp the result.
- **Content side fade:** each section has a dark gradient scrim on the content side (left or right), solid at the screen edge and fading to transparent at about 55-60% of the screen width, using my existing dark background color. The photo melts into the dark background on that side. Animate the scrim by opacity and swap sides between sections with crossfades. Do not animate gradient sizes.
- **Never mirror or flip an image** (it would reverse the code and text on the screens).

For each section, the choreography is driven by scroll (scrub):

1. **START:** the image fills the viewport at its natural framing.
2. **ZOOM + PAN:** the camera zooms in (about 1.15-1.7x depending on the image, within the resolution limit) around that image's focal point, while the image pans so the subject lands on the intended side.
3. **CONTENT FLOWS IN:** the section's content slides and fades in from the opposite side, over the scrim.

## Per-section plan (matched to the actual images)

The subject is the person for images 1-2, and the laptop/monitor for images 3-5 (my face is at the edge of those images and cannot be moved to the left).

- **Section 1 (Image 1):** Subject LEFT, content RIGHT. Zoom to about 1.5-1.7x and pan so my face lands at about 38-45% of the screen width, hands and laptop still partly visible. The content sits over the dark hoodie and chair area with the scrim.
- **Section 2 (Image 2):** Subject RIGHT, content LEFT. I am already on the right, so zoom gently (about 1.15-1.25x) and pan slightly right. Content sits on the left over a scrim. Keep as much of the monitors visible as the readable text allows by keeping the text column narrow (about 35-38vw).
- **Section 3 (Image 3):** Laptop and hands LEFT, content RIGHT. This is the natural composition. Content sits over the dark hoodie on the right (up to about 45vw wide), and the code on the laptop stays visible.
- **Section 4 (Image 4):** Subject RIGHT, content LEFT. Pan slightly so my face and hoodie sit more to the right, and place a narrow text column (about 35vw) on the left over the plant and file-tree area. The code editor must stay partly visible. Keep the zoom focused below the monitor text at the top so "Turning Ideas into Reality" is cropped off or covered, not competing with my heading.
- **Section 5 (Image 5):** Monitor LEFT, content RIGHT. The monitor stays on the left. Project cards (real data) flow in on the right over the scrim. Dim or cover the sample cards baked into the monitor with the scrim so they do not conflict with the real ones. Do not zoom into the monitor text.

If a requested side conflicts with the image composition, prefer a visible face, a readable text column, and a visible laptop or code over strict left/right alternation, and tell me what you changed.

## Continuity between shots

- Images 1 and 2 are nearly the same shot, so the transition between them should read as a small camera push-in, not an image swap. Keep the focal point and framing aligned during the crossfade.
- Image 2 to 3 is a bigger jump. Set the zoom focal point on the laptop while Image 2 fades out and Image 3 fades in, so the laptop appears to stay in place as the camera moves in.
- Images 3 to 4 to 5 are similar close-ups. Align the laptop (3 to 4) and the screen area (4 to 5) during the crossfades.
- Crossfades overlap in time while the camera keeps moving. No abrupt switching. Never show a blank or white frame.

## Config file

Create one config file with per-image values that I can tune easily: focal point (x, y percent), zoom amount, final pan position per section, `object-position` (desktop and mobile), scrim side and strength, and content side. Initial values come from viewing the images and from the per-section plan above.

## Architecture

1. **A fixed full-screen "stage"** (`position: fixed; inset: 0; height: 100svh`, dark background so there are no white flashes). It holds the five image layers stacked, each `object-fit: cover`, animated individually with transforms (`scale`, `x`, `y`) and opacity, plus the two side scrims.

2. **Five real, separate sections.** Each section is tall (about 250-300vh) with an inner `position: sticky; top: 0; height: 100vh` container for the content. The stage stays fixed behind while the content scrolls and animates over it. Do NOT pin the whole page.

3. **One scrubbed GSAP timeline per section** (ScrollTrigger, `scrub: 1`), roughly:
   - 0-30% of the section's scroll: the incoming image fades in (sections 2-5), the previous fades out, and the camera keeps gliding.
   - 20-65%: zoom and pan settle on the subject side, and the scrim swaps to the content side.
   - 45-85%: content slides in (opacity and `x`) with staggered line or word reveals for headings.
   - 85-100%: brief hold, then content begins fading out as the next section starts.

4. **Frame state must be deterministic.** Compute each image's transform and opacity from scroll progress (or the active section plus local progress), so it is correct when the user jumps via navigation, refreshes mid-scroll, resizes the window, or scrolls backward. Use `invalidateOnRefresh: true` and `ScrollTrigger.refresh()` after images load. Recompute the clamp limits when the viewport changes, including different aspect ratios (ultrawide, portrait).

5. **Atmosphere:** dark, using my existing dark colors. A very subtle vignette is fine. No particles or noisy effects.

6. **After Section 5:** fade the fixed stage out (or unfix it) so the remaining portfolio sections (Contact, footer, etc.) scroll in normally.

7. **Mobile (`gsap.matchMedia()`):** do not force the left/right split on small screens. Use a smaller zoom and horizontal shift, keep my face in the upper part of the screen using per-image mobile `object-position`, and flow the content up from the bottom over a dark gradient. Shorten the section heights slightly.

8. **Reduced motion:** no zooming, panning or parallax. Show each section with its image and content using simple fades only.

## Section content

The scroll lengths are a rough guide. Each scene is its own real section.

### Section 1: The Introduction (Image 1, subject LEFT, content RIGHT)

- Image 1 fills the screen with a dark atmospheric overlay and a gentle zoom.
- Large elegant headline. Suggested: "BUILDING DIGITAL EXPERIENCES."
- Supporting text. Suggested: "I'm a developer who turns ideas into meaningful digital products."
- Subtle scroll indicator on first load.
- As scrolling begins, the headline fades out, the camera zooms in, the subject moves left, and the content flows in on the right (a short intro, my name and role, and a call to action such as view projects or contact).
- If my existing site already has my real name, role or tagline, use those instead of the suggested copy.

### Section 2: Enter My Workspace (Image 2, subject RIGHT, content LEFT)

- Image 2 crossfades in with a push-in.
- Text on the left. Suggested: "EVERY GREAT IDEA STARTS SOMEWHERE."
- Use my real About/bio content here if it exists. Avoid excessive animation.

### Section 3: The Developer (Image 3, laptop LEFT, content RIGHT)

- Image 3 crossfades in with the laptop kept in place.
- Text on the right. Suggested: "THINK. DESIGN. DEVELOP. REPEAT."
- Reveal each word with carefully timed animation. Add a short line about my development philosophy. Keep the composition clean.

### Section 4: The Craft (Image 4, subject RIGHT, content LEFT)

- Image 4 crossfades in.
- Heading: "TURNING IDEAS INTO CODE."
- Show technologies in a sophisticated animated layout. Use technologies found in my existing portfolio. If none are listed, use: React, JavaScript, TypeScript, Node.js, Next.js, Tailwind CSS, MongoDB, GSAP.
- Elegant text reveals and subtle motion. No distracting floating elements.

### Section 5: My Projects (Image 5, monitor LEFT, content RIGHT)

- Image 5 crossfades in.
- Heading: "THINGS I'VE BUILT." Do NOT repeat the line "Real-world solutions. Built with passion." in HTML, because it already appears on the monitor in the image.
- Display my ACTUAL projects in a polished showcase on the right. Each card contains: project name, image or preview, short description, tech stack, GitHub link, live demo link.
- Elegant staggered reveals using subtle vertical movement, opacity, scale and depth.
- **Never invent project names, URLs, images or descriptions.** Inspect the existing portfolio content and reuse the real data. If a project is missing a field (for example no live demo or no image), omit that element gracefully instead of making something up or leaving a broken link. If there are more projects than fit, let the cards scroll vertically within the section.
- After the last project, fade out the stage and let the page scroll naturally into the remaining portfolio sections (Contact, footer, etc.).

---

# 4. TECHNICAL IMPLEMENTATION

Before writing code:

1. Inspect the entire project structure.
2. Identify the framework, build tool and existing dependencies.
3. Understand existing components, routing and styling approach.
4. Locate and view the five images.
5. Identify existing portfolio content (projects, skills, bio, contact, social links).
6. Plan the animation architecture.

Preferred technologies:

- GSAP and GSAP ScrollTrigger (main storytelling).
- React (use the existing framework).
- Framer Motion only where genuinely useful.
- CSS transforms and transitions.

Rules:

- Avoid unnecessary React re-renders during animation. Drive animation with refs and GSAP, not React state.
- Use `gsap.context()` (or `useGSAP`) with proper cleanup. Revert and kill all ScrollTrigger instances on unmount.
- Register plugins correctly. Make sure it works with SSR if the framework uses it (for example guard browser-only code in Next.js).
- Animate only GPU-friendly properties (transform, opacity). Avoid animating layout properties like `left`, `top`, `width` or `height`.
- Use `will-change` sparingly, and only on the image layers.
- Keep section timelines coordinated so the camera never jumps or gets out of sync between sections.

---

# 5. IMAGE TRANSITION QUALITY (CRITICAL)

The five images must feel like consecutive shots from the same sequence, connected by one continuous camera move.

Recommended techniques:

- Crossfades with carefully timed opacity overlap while the camera keeps moving.
- Scale interpolation (zoom) with smooth easing.
- Horizontal pan with slight parallax between the image layer and the content layer.
- Subtle blur only during crossfades (light touch).

Requirements:

- No abrupt image switching.
- No white flashes. The base background must be dark.
- No visible image edges or rectangles at any scroll position, on any viewport size.
- No excessive motion blur.
- Keep my face visible and recognizable in sections 1 and 2, and keep my hands and the laptop or code visible in sections 3 and 4.
- Keep a consistent visual tone across all five images.

---

# 6. VISUAL DESIGN SYSTEM

PRESERVE my existing design system. Do NOT change my current colors, fonts, font sizes, or global styles.

- Before writing any code, find and read my existing color palette and typography (Tailwind config, CSS variables, global CSS, theme files, font imports).
- Reuse those exact colors and fonts for all new text, buttons, cards, overlays, scrims and navigation.
- Do not add new fonts or a new color palette. Do not override global styles, CSS variables, or Tailwind theme values.
- Scope all new styles to the new cinematic components (component-level classes or CSS modules) so the rest of the site is unaffected.
- If I have no clear existing palette or font for a needed element, derive it from the closest existing colors and fonts rather than inventing new ones.

The cinematic feel should come from the images, the camera motion, layout, spacing and typography scale (large, bold headlines using my existing font), not from changing my brand colors.

Keep the mood dark, minimal and premium. Text must always remain readable, so use the side scrims described in section 3. Use generous negative space.

---

# 7. NAVIGATION

Minimal floating navigation: Home, About, Skills, Projects, Contact.

- Unobtrusive during the cinematic sequence.
- Links must scroll to the correct section and land at the point where that section's camera position and content are fully in place.
- Highlight the active section based on scroll position.
- Do not break existing routing or anchor behavior elsewhere on the site.
- Keyboard accessible with visible focus states.
- If I already have a navigation component, adapt it rather than creating a second one.

---

# 8. PERFORMANCE AND RESPONSIVENESS

Performance is critical:

- Optimize all five images (see section 2) while keeping them sharp when zoomed.
- Avoid large DOM structures and excessive simultaneous animations.
- Prevent layout shifts.
- Keep scrolling responsive and avoid heavy JS in scroll handlers.
- Use GPU-friendly transforms, and animate at most two image layers at the same time (outgoing and incoming).

Mobile:

- Follow the mobile rule in section 3.
- Use per-image `object-position` and focal values for mobile so my face and the key workspace elements stay in frame.
- Reduce zoom and pan amounts while preserving the storytelling sequence.
- Stack project cards in a mobile-friendly layout.
- Touch scrolling must stay natural. Handle mobile address-bar resizing (use `100svh` or `dvh`, avoid jumpy refreshes).

Accessibility:

- Respect `prefers-reduced-motion` with a simplified version that still shows all content.
- Provide meaningful alt text for the images and ensure sufficient text contrast.

---

# 9. CREATIVE RESTRICTIONS

DO NOT:

- Build a conventional portfolio template.
- Display the images as a gallery or as five stacked sections.
- Show an image as a small card, framed box, or anything with visible edges.
- Mirror, flip, crop away my face, or edit the content of the images.
- Place HTML text over the text baked into the images, or repeat it.
- Use stock developer photographs or placeholders.
- Add excessive floating particles.
- Use random animations without purpose.
- Add unnecessary gradients everywhere (only the content-side scrims).
- Make text difficult to read.
- Sacrifice performance for visual effects.
- Invent my personal information, project details or links.
- Break existing project functionality.
- Change my existing colors, fonts, or global styling.

My face and identity remain the central visual focus. The five provided images are the primary visual assets.

---

# 10. IMPLEMENTATION AND DELIVERY

Do not stop at a design concept. Implement the complete working experience in my existing codebase.

Work systematically:

1. Inspect the existing project.
2. View all five images, upscale them, and set their focal points in the config file.
3. Create the component architecture (fixed stage with five image layers and side scrims, five sections with sticky content containers, scroll controller, config file).
4. Implement the zoom, pan and content-flow choreography with GSAP ScrollTrigger, including the edge-clamp logic.
5. Implement all five image crossfades as one continuous camera move.
6. Add typography and content using my existing fonts and colors.
7. Integrate the actual portfolio projects.
8. Add responsive behavior and reduced-motion handling.
9. Test the complete scroll experience.
10. Fix animation glitches, layout issues and console errors.

Verification (required before finishing):

- Run the project's build and lint commands and fix any errors.
- Check the browser console for errors and warnings.
- Test at roughly 1440px, 768px and 390px widths, plus one ultrawide and one tall portrait viewport, to confirm no image edge is ever visible.
- Scroll the full sequence forward and backward, and test navigation links, window resize, and page refresh mid-scroll.
- Confirm no layout shift, no white flashes, no blurry zoomed images, my face stays visible where specified, text is readable in every section, and no HTML text collides with text inside the images.

Code quality:

- Keep code clean, reusable and maintainable.
- Do not rewrite the whole project if existing components can be reused.
- Install only the dependencies that are truly necessary (for example `gsap`, plus `@gsap/react` if helpful).
- If an implementation decision is unclear, make a sensible professional choice and continue.

At the end, give me a short summary of: files created or changed, dependencies added, how to tune the effect (zoom amount, focal points, pan distance, scrim strength, section heights, easing), any section where you deviated from the left/right plan, and any assumptions you made.

---

# FINAL EXPECTATION

Visitors should open my portfolio and immediately feel: "This is not another ordinary developer portfolio." As they scroll, the camera pushes in on me and my workspace, the subject slides to one side while content flows in from the other over a soft dark fade, then it swings across in the next section, moving through my workspace, my process, my skills and my projects. The motion should feel smooth and intentional, and I remain the central character throughout.

**Build an immersive, scroll-driven developer portfolio that feels like a premium interactive film.**
