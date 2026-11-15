# Task: Design a Minimalist Single-Page Full Stack Developer Portfolio

I already have an existing Next.js project. Work within the existing structure. Do not recreate the project, change the framework, or introduce unnecessary architecture.

Design and develop a premium, minimalist, single-page portfolio for a Full Stack Developer with nearly 2 years of professional experience.

**Audiences**

1. Companies and recruiters evaluating my skills, experience and projects.
2. Freelance clients looking for websites, web applications, e-commerce platforms and custom software.

The site must communicate professional identity and freelance availability without looking like a digital agency.

## 1. Design Direction

Take inspiration from Manu Arora's portfolio: minimalist editorial design, typography-driven layout, bento-grid-inspired sections, Swiss-inspired principles, subtle borders, balanced whitespace, strong visual hierarchy, professional personal branding.

Avoid: generic portfolio templates, heavy gradients, overly rounded cards, too many colours, unnecessary animation or decoration, large blocks of text, skill progress bars, blog sections, testimonials, and anything that looks AI-generated. The result should feel designed by a professional UI/UX designer.

## 2. Layout and Spacing (critical)

- Centered container, max width about 1200–1280px, with generous whitespace on both sides.
- Consistent responsive horizontal gutters. No edge-to-edge content on desktop.
- Every section aligns to the same container and grid.
- Comfortable, consistent vertical rhythm between sections.
- Balanced on large monitors; calm and uncluttered.

## 3. Page Structure

Single page with smooth scrolling. No separate pages. Sections appear in this order, and no others:

1. Navigation
2. Hero
3. About
4. Tech Stack
5. Experience
6. Selected Projects
7. Freelancing / Services
8. Process
9. Pricing
10. FAQ
11. Contact + Footer

### 3.1 Navigation

- Left: AMRIT.
- Right: Home, About, Experience, Projects, Freelancing, Pricing, Contact, plus a subtle contact CTA.
- Tech Stack, Process and FAQ are not in the nav, to keep it uncrowded.
- Sticky, minimal, smooth scrolling, clear active-section indicator (use IntersectionObserver), clean responsive mobile menu.

### 3.2 Hero (most important)

- Heading: "Building Digital Experiences & Scalable Web Solutions."
- Intro: "I'm a Full Stack Developer with nearly 2 years of experience building modern websites, web applications and business solutions."
- Subtle tech line: React.js · Next.js · Node.js · Express.js · MongoDB · PostgreSQL
- CTAs: "Explore My Work" and "Let's Work Together"
- Small freelance availability indicator and a subtle "Based in India" location indicator.
- Typography-focused, not dependent on a large decorative image. No unnecessary paragraphs.

### 3.3 About

- Heading: "A Little About Me."
- Text: "I'm a versatile Full Stack Developer focused on building responsive user interfaces, reliable backend systems and practical digital solutions. I enjoy turning ideas and business requirements into functional, scalable applications."
- Three compact information blocks:
  - Experience: Nearly 2 Years
  - Focus: Full Stack Development
  - Approach: Clean, Scalable & User-Focused Solutions

### 3.4 Tech Stack

- Heading: "Tools I Work With."
- Compact grouped lists. No progress bars, percentages or logo walls.
  - Frontend: React.js, Next.js, JavaScript, HTML, CSS
  - Backend: Node.js, Express.js
  - Databases: MongoDB, PostgreSQL
  - Tools: Git, GitHub (adjust to what is accurate)
- Present as a clean bento row or typographic list. This replaces any technologies list inside About, so nothing is duplicated.

### 3.5 Experience

- Heading: "Where I've Worked."
- Minimal vertical timeline or list with 1–2 entries. Each shows role, company, duration and 2–3 short bullet points.
- Use clearly marked placeholders such as [Company Name], [Role], [Start – End]. Do not invent employers, dates or achievements.
- Include a "Download Resume" link. Use the existing resume file if one is in the project (see Section 7); otherwise use a placeholder path.

### 3.6 Selected Projects

- Heading: "Selected Work."
- Text: "A few projects that reflect my experience building real-world digital solutions."
- 3–4 projects in a clean editorial or bento-inspired grid:
  1. HomeoAI: AI-powered homeopathy application. MERN stack. Intelligent symptom analysis and repertory-based search.
  2. ERP Management System: React, Node.js, Express, PostgreSQL. Role-based authentication. Employee, attendance, leave, payroll and project management.
  3. School Website: Responsive business website with payment gateway integration. Frontend and backend development.
  4. E-commerce Application: Product management, shopping cart, payment integration.
- Each project shows: name, one-line description, technology tags, screenshot or visual preview, live link and GitHub link only where available.
- Use existing project screenshots from the project's assets if present. Use a neutral placeholder only where none exist.
- Previews are visually prominent but not overwhelming. No lengthy case studies.

### 3.7 Freelancing / Services

- Heading: "Have a Project in Mind?"
- Text: "I help businesses and individuals turn their ideas into functional, modern digital products."
- Exactly four services, each with a description of two lines maximum:
  1. Business & Corporate Websites
  2. E-commerce Development
  3. Custom Web Applications
  4. AI-Powered Solutions
- CTA: "Discuss Your Project"
- Tone: an independent developer taking on freelance projects, not an agency.

### 3.8 Process

- Heading: "How We'll Work Together."
- Four short steps, each with a title and one line: Discuss, Plan, Build, Deliver.
- Numbered, typographic, minimal. Must not read like agency copy. Do not invent timelines, guarantees or revision policies.

### 3.9 Pricing

- Heading: "Transparent Starting Prices."
- Currency: INR. Four compact cards:
  - Basic Websites: Starting at ₹8,000
  - Business Websites: Starting at ₹15,000
  - E-commerce Websites: Starting at ₹25,000
  - Custom Web Applications: Starting at ₹40,000
- Each card contains: service name, starting price, 2–3 key inclusions, enquiry CTA.
- Include a note that final pricing depends on project requirements and scope.
- No unrealistic promises and no invented services.

### 3.10 FAQ

- Heading: "Common Questions."
- 4–5 questions in a minimal accordion with short answers based only on information in this brief:
  - Are you available for freelance work?
  - How is pricing decided?
  - What technologies do you work with?
  - Are you open to full-time roles?
  - How do I get started?
- Where an answer needs facts I have not provided (turnaround time, payment terms, support), use a clearly marked placeholder. Do not invent policies.
- Accessible: keyboard operable, correct aria attributes.

### 3.11 Contact and Footer

- Heading: "Let's Build Something Together."
- Text: "Whether you're looking for a developer to join your team or someone to bring your project idea to life, I'd love to hear from you."
- For Companies: Email, LinkedIn, Resume download.
- For Freelance Projects: WhatsApp, Email, Project enquiry CTA.
- Minimal form with: Name, Email, Enquiry type (Job Opportunity / Freelance Project), Message.
- No fake submission flow. Connect the form only to an API route, server action or form service that already exists in the project. Otherwise, build the frontend with validation and clearly state the integration required (for example a Next.js route handler or a Formspree/EmailJS-style service).
- Minimal footer: name, copyright year, GitHub, LinkedIn.

## 4. Visual Design System

- Neutral background, dark typography, one restrained accent colour, subtle dividers, minimal borders.
- Colours and fonts come from the existing project (see Section 7), not from new choices.
- Clear distinction between headings, descriptions and metadata.
- One consistent spacing scale throughout. No oversized text that takes over the screen.
- With eleven sections, vary the layout language (bento, list, timeline, accordion, numbered steps) instead of repeating the same card grid.

## 5. Animations and Interactions

- Smooth section scrolling, subtle fade-in transitions, gentle hover effects on project previews, small movement on interactive elements, minimal nav transitions.
- If Framer Motion is already installed, use it. Otherwise use lightweight CSS animations. Do not install new dependencies for this.
- Respect prefers-reduced-motion.

## 6. Responsive Design

The site must work perfectly on desktop, laptop, tablet and mobile.

- Maintain proper horizontal spacing at every breakpoint.
- Adapt grids to smaller screens (bento to two columns to single column).
- Keep typography readable.
- Prevent horizontal overflow.
- Touch-friendly buttons and accordion controls.
- Clean mobile navigation.

## 7. Existing Theme, Setup and Assets (use, do not replace)

**Colours and theme**

- Find the existing colour palette (Tailwind config, CSS variables, theme file, or globals.css) and use those exact values.
- Map them to the design system: background, foreground text, muted text, border/divider, and one accent colour. Pick the accent from the existing palette.
- Do not introduce new colours. If a needed shade does not exist, derive it from an existing colour, and list it at the end.
- If the project already supports dark mode or a theme toggle, keep it working. Do not add one if it does not exist.

**Typography**

- Use the fonts already configured in the project (next/font or existing CSS). Do not add a new font unless none exists, and say so if you do.

**Next.js setup**

- Detect whether the project uses the App Router (`app/`) or Pages Router (`pages/`) and follow that convention. Do not migrate between them.
- Build the portfolio on the existing home route, or the route currently used for the landing page. Do not add new routes for sections.
- Use the existing layout file, global styles and metadata setup. Update page metadata (title, description, Open Graph) using the existing approach.
- Use `next/image` for images and `next/link` where appropriate. Use `next/font` if the project already does.
- Mark only the interactive components (navigation, accordion, form, animated wrappers) as client components. Keep the rest as server components where the router allows.
- Do not change `next.config`, ESLint, Prettier, TypeScript or Tailwind configuration without a valid reason. If a change is needed, state why.
- Follow the project's language (JavaScript or TypeScript) and file naming conventions.

**Existing assets**

- Search `public/`, `assets/` and `src/` for existing images, logos, favicon, project screenshots, icons, resume PDF, and social or contact details already used in the project.
- Reuse them wherever they fit. Do not duplicate or re-export existing files.
- Reuse existing components (buttons, icons, containers, utilities) and existing icon library instead of adding a new one.
- If an asset the design needs does not exist (project screenshot, resume, profile image), use a clearly marked placeholder and list it at the end.
- Do not invent URLs, email addresses, phone numbers or social handles. Use values already in the project, or marked placeholders.

## 8. Development Instructions

Before making changes:

1. Inspect the existing Next.js project structure, router type and `package.json`.
2. Identify installed dependencies and the styling approach (Tailwind, CSS Modules, styled-components, etc.) and follow it.
3. Review the existing theme, components and assets as described in Section 7.
4. Understand the current routing, layout and app setup.

Requirements:

- One reusable component per section, with clean separation.
- Keep content (projects, services, pricing, FAQ, experience) in a data file or constants, separate from layout components.
- Readable, maintainable code.
- Avoid unnecessary dependencies.
- Do not break existing functionality or replace existing configuration without a valid reason.
- Do not invent personal information, project URLs, client names, testimonials, employers, dates or achievements. Use clearly marked placeholders.
- At the end, provide a short summary listing: files created or modified, existing assets and theme values reused, every placeholder, and every integration still required (form backend, resume file, social links, WhatsApp number, project screenshots and links).

## 9. Final Design Objective

The site should feel like the portfolio of a serious Full Stack Developer.

- A recruiter should understand my experience, technical capabilities and projects within 30–60 seconds.
- A freelance client should understand my services, approximate pricing and contact options just as quickly.

**Most important principle: Less content, better presentation. Every section must have a clear purpose. Do not add sections or features beyond the scope above.**
