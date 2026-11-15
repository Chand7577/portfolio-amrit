import * as THREE from 'three';

export type ChapterId = 0 | 1 | 2 | 3 | 4 | 5;

export interface Chapter {
  id: ChapterId;
  key: string;
  title: string;
  /** Short dramatic label shown in progress dots */
  label: string;
  date?: string;
  company?: string;
  /** Primary accent hex */
  accent: string;
  /** THREE.Color-compatible fog colour */
  fogColor: string;
  fogNear: number;
  fogFar: number;
  /** Bloom intensity for this chapter */
  bloom: number;
  /** Cinematic one-liner(s) */
  lines: string[];
  /** Body copy shown in the HTML overlay */
  body?: string;
  /** t value on the spline where this chapter starts */
  tStart: number;
  /** t value on the spline where this chapter ends */
  tEnd: number;
}

export const CHAPTERS: Chapter[] = [
  {
    id: 0,
    key: 'boot',
    title: 'Amrit Chand.',
    label: 'Boot',
    accent: '#e2e8f0',
    fogColor: '#000000',
    fogNear: 5,
    fogFar: 40,
    bloom: 0.4,
    lines: [
      'GET /amrit-chand HTTP/1.1',
      'To ship, or not to ship…',
    ],
    body: 'Full-Stack Developer · MERN · TypeScript · React 19 · Next.js',
    tStart: 0,
    tEnd: 0.18,
  },
  {
    id: 1,
    key: 'gate',
    title: 'The Gate',
    label: 'Gate',
    date: 'Dec 2024',
    company: 'Society of Robotics & Technology',
    accent: '#06b6d4',
    fogColor: '#001a1f',
    fogNear: 4,
    fogFar: 35,
    bloom: 1.2,
    lines: [
      'Identity verified.',
      'JWT issued. Route unlocked.',
    ],
    body: 'Responsive Document Management dashboard · REST API integration · Protected routes · OAuth 2.0 + JWT auth',
    tStart: 0.18,
    tEnd: 0.38,
  },
  {
    id: 2,
    key: 'stream',
    title: 'The Stream',
    label: 'Stream',
    date: 'Jun 2025',
    company: 'Best Computers — Next.js Internship',
    accent: '#3b82f6',
    fogColor: '#00041a',
    fogNear: 6,
    fogFar: 45,
    bloom: 1.0,
    lines: [
      '40% fewer manual-entry errors.',
      'Three sites. One source of truth.',
    ],
    body: 'Unified inventory for BuildMyPC · Supabase real-time subscriptions · Live price + stock sync across 3+ partner sites · Catalogue performance optimised',
    tStart: 0.38,
    tEnd: 0.56,
  },
  {
    id: 3,
    key: 'checkout',
    title: 'The Checkout',
    label: 'Checkout',
    date: 'Oct 2025',
    company: 'Grandeur Net, Dehradun',
    accent: '#f59e0b',
    fogColor: '#1a0f00',
    fogNear: 5,
    fogFar: 40,
    bloom: 0.6,
    lines: [
      'Payment authorised.',
      '5 sites. 30% less boilerplate.',
    ],
    body: '5+ responsive business sites · React + Tailwind · Cart & Razorpay checkout · PHP admin dashboard for pharma app · AI tooling cut boilerplate 30%',
    tStart: 0.56,
    tEnd: 0.72,
  },
  {
    id: 4,
    key: 'brain',
    title: 'The Brain',
    label: 'Brain',
    date: 'Jun–Sep 2026',
    company: 'Independent Client Project',
    accent: '#a855f7',
    fogColor: '#0d001a',
    fogNear: 3,
    fogFar: 30,
    bloom: 1.8,
    lines: [
      'Patient narrative → rubric extraction.',
      'AI meets homeopathy.',
    ],
    body: 'AI Rubric Analyzer — Google Gemini + Groq · In-browser Materia Medica library · react-pdf + Tesseract.js OCR · Bilingual search · Socket.io · jsPDF reports',
    tStart: 0.72,
    tEnd: 0.90,
  },
  {
    id: 5,
    key: 'response',
    title: '200 OK',
    label: 'Deploy',
    accent: '#22c55e',
    fogColor: '#000a05',
    fogNear: 10,
    fogFar: 60,
    bloom: 2.0,
    lines: [
      'Request complete.',
      '200 OK.',
    ],
    body: 'Deployed. Let\'s build something.',
    tStart: 0.90,
    tEnd: 1.0,
  },
];

/** Lookup a chapter by id */
export const chapterById = (id: ChapterId) => CHAPTERS[id];

/**
 * Given scroll progress 0→1, return the active chapter
 * and local progress within that chapter (0→1).
 */
export function getChapterAt(t: number): { chapter: Chapter; local: number } {
  for (let i = CHAPTERS.length - 1; i >= 0; i--) {
    const ch = CHAPTERS[i];
    if (t >= ch.tStart) {
      const local = (t - ch.tStart) / (ch.tEnd - ch.tStart);
      return { chapter: ch, local: Math.min(local, 1) };
    }
  }
  return { chapter: CHAPTERS[0], local: 0 };
}

/** Per-chapter THREE.Color accent (cached) */
export const chapterAccentColor = CHAPTERS.map(
  (ch) => new THREE.Color(ch.accent)
);
