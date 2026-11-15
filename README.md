# Amrit Chand — Portfolio

> High-performance, full-stack portfolio built with **Next.js 14 App Router**, **React Three Fiber**, **GSAP + Lenis** scroll, and **MongoDB**.

## ✨ Features

- **3D Network Scene** — instanced nodes + connecting lines react to mouse movement; camera drifts on scroll
- **Smooth Scrolling** — Lenis synced to GSAP ticker; ScrollTrigger uses Lenis as the scroller
- **GSAP Animations** — staggered hero reveal, scroll-triggered section entrances, 3D card tilt
- **Custom Cursor** — dot + lagging ring, grows on interactive elements
- **Animated Preloader** — progress bar + counter, slides out before content appears
- **Film-Grain Overlay** — subtle animated noise texture
- **Contact API** — Zod validated, rate-limited (5 req/min/IP), saves to MongoDB, sends email via Resend
- **Projects API** — full CRUD with protected admin secret header
- **Admin Dashboard** — `/admin` — create/edit/delete projects behind a password
- **GitHub API** — `/api/github` fetches pinned repos with 5-min in-memory cache
- **SEO** — metadata, Open Graph, Twitter Card, robots
- **Accessibility** — semantic HTML, focus-visible states, `prefers-reduced-motion`, ARIA roles

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env template
cp .env.example .env.local
# → fill in MONGODB_URI, RESEND_API_KEY, NEXTAUTH_SECRET, ADMIN_EMAIL/PASSWORD

# 3. Seed the database (optional)
npm run seed

# 4. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout + metadata
│   ├── page.tsx            # Home page (assembles all sections)
│   ├── not-found.tsx
│   ├── loading.tsx
│   ├── admin/
│   │   └── page.tsx        # Admin CRUD dashboard
│   ├── projects/
│   │   └── [slug]/
│   │       └── page.tsx    # Project detail page
│   └── api/
│       ├── contact/route.ts
│       ├── projects/
│       │   ├── route.ts
│       │   └── [slug]/route.ts
│       └── github/route.ts
├── components/
│   ├── 3d/
│   │   └── Scene.tsx       # R3F canvas — nodes, lines, camera rig
│   ├── layout/
│   │   ├── SmoothScroll.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ArchitectureSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── Cursor.tsx
│       ├── Preloader.tsx
│       └── ProjectCard.tsx
├── hooks/
│   ├── useLenis.ts
│   ├── useMousePosition.ts
│   └── useReducedMotion.ts
├── lib/
│   ├── mongodb.ts
│   ├── email.ts
│   ├── rateLimit.ts
│   └── utils.ts
├── models/
│   ├── Project.ts
│   └── Contact.ts
└── types/
    └── index.ts

scripts/
└── seed.ts                 # Database seed script
```

---

## 🌐 API Reference

### `POST /api/contact`
Submit a contact message. Rate-limited to 5 req/min/IP.

**Body (JSON):**
```json
{
  "name": "string (min 2)",
  "email": "valid email",
  "subject": "string (min 4)",
  "message": "string (min 20)"
}
```

### `GET /api/projects`
Returns all projects sorted by `order`. Supports `?featured=true` and `?category=fullstack`.

### `POST /api/projects`
Create a project. Requires `x-admin-secret: <NEXTAUTH_SECRET>` header.

### `PUT /api/projects/:slug` / `DELETE /api/projects/:slug`
Update or delete a project. Requires admin secret header.

### `GET /api/github`
Returns pinned GitHub repos. Cached in-memory for 5 minutes. Requires `GITHUB_TOKEN` and `GITHUB_USERNAME` env vars.

---

## 🔑 Environment Variables

| Variable | Required | Description |
|---|---|---|
| `MONGODB_URI` | ✅ | MongoDB Atlas connection string |
| `NEXTAUTH_SECRET` | ✅ | Used as admin API secret |
| `NEXTAUTH_URL` | ✅ | App base URL |
| `RESEND_API_KEY` | ✅ | Resend API key for email |
| `ADMIN_EMAIL` | ✅ | Email to receive contact notifications |
| `ADMIN_PASSWORD` | ✅ | Admin dashboard password |
| `GITHUB_TOKEN` | ⬜ | GitHub personal access token (for pinned repos) |
| `GITHUB_USERNAME` | ⬜ | Your GitHub username |

---

## 🔧 Customising

### Updating Projects
Go to `/admin`, enter your `ADMIN_PASSWORD`, and use the CRUD form.

Or run the seed script after editing `scripts/seed.ts`:
```bash
npm run seed
```

### Changing Accent Colour
Edit the `accent` colour in [`tailwind.config.ts`](./tailwind.config.ts) — one change propagates everywhere.

### Updating Socials / Bio
Edit [`src/components/sections/AboutSection.tsx`](./src/components/sections/AboutSection.tsx) and [`src/components/sections/ContactSection.tsx`](./src/components/sections/ContactSection.tsx).

---

## 🚢 Deploy to Vercel

1. Push to GitHub
2. Import repo in [vercel.com/new](https://vercel.com/new)
3. Add all env vars from `.env.example` in the Vercel dashboard
4. Deploy — done ✅

Vercel auto-detects Next.js. No extra config needed.

---

## 🏎 Performance Notes

- Canvas DPR clamped to `[1, 2]`
- `Scene` loaded with `next/dynamic` + `ssr: false`
- Simplified / disabled animations when `prefers-reduced-motion: reduce`
- API responses include `Cache-Control: s-maxage=60` headers
- GitHub route uses in-memory cache (no extra DB round-trip)

---

Built with ❤️ by **Amrit Chand**
