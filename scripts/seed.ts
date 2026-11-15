import connectDB from '../src/lib/mongodb';
import ProjectModel from '../src/models/Project';

const projects = [
  {
    title: 'NeuroCart – AI-Powered E-Commerce',
    slug: 'neurocart-ai-ecommerce',
    description:
      'Full-stack e-commerce platform with AI-driven product recommendations, real-time inventory, and Stripe payments.',
    longDescription:
      'NeuroCart is a production-grade e-commerce application built with the MERN stack. It features a recommendation engine powered by collaborative filtering, real-time inventory updates via WebSockets, and a seamless Stripe Checkout integration. The admin dashboard provides analytics, order management, and product CRUD with image uploads to S3.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Stripe', 'Redis', 'AWS S3'],
    imageUrl: '/images/projects/neurocart.jpg',
    liveUrl: 'https://neurocart.example.com',
    githubUrl: 'https://github.com/amritchand/neurocart',
    featured: true, order: 1, category: 'fullstack',
  },
  {
    title: 'Pulse – Real-Time Analytics Dashboard',
    slug: 'pulse-analytics-dashboard',
    description:
      'Real-time analytics dashboard with WebSocket feeds, custom chart components, and multi-tenant support.',
    longDescription:
      'Pulse is a SaaS analytics platform that ingests event streams via WebSockets and renders live charts using D3.js. It supports multi-tenant organizations with role-based access control, custom dashboards, and scheduled PDF report exports.',
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'WebSockets', 'D3.js', 'Docker'],
    imageUrl: '/images/projects/pulse.jpg',
    liveUrl: 'https://pulse.example.com',
    githubUrl: 'https://github.com/amritchand/pulse',
    featured: true, order: 2, category: 'fullstack',
  },
  {
    title: 'Threadline – Developer Social Network',
    slug: 'threadline-social',
    description:
      'A developer-focused social platform with code sharing, real-time messaging, and GitHub integration.',
    longDescription:
      'Threadline is a social network built for developers. Users can share code snippets with syntax highlighting, follow each other, and chat in real time. The platform integrates with GitHub to display pinned repositories and contribution graphs.',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis', 'TypeScript'],
    imageUrl: '/images/projects/threadline.jpg',
    githubUrl: 'https://github.com/amritchand/threadline',
    featured: true, order: 3, category: 'fullstack',
  },
  {
    title: 'Vaultify – Secure Password Manager',
    slug: 'vaultify-password-manager',
    description:
      'End-to-end encrypted password manager with browser extension, biometric auth, and emergency access.',
    longDescription:
      'Vaultify is a zero-knowledge password manager that encrypts all data client-side before syncing to the server. It includes a browser extension, TOTP-based 2FA, biometric unlock on mobile, and an emergency access feature.',
    techStack: ['React Native', 'Node.js', 'MongoDB', 'Web Crypto API', 'TypeScript'],
    imageUrl: '/images/projects/vaultify.jpg',
    githubUrl: 'https://github.com/amritchand/vaultify',
    featured: false, order: 4, category: 'fullstack',
  },
  {
    title: 'Archon – Headless CMS',
    slug: 'archon-headless-cms',
    description:
      'A flexible headless CMS with a visual schema builder, GraphQL API, and multi-region CDN delivery.',
    longDescription:
      'Archon is a headless CMS that lets teams define content schemas visually and consume content via a strongly-typed GraphQL API. It supports webhooks, draft/publish workflows, and image optimization with CDN delivery.',
    techStack: ['Next.js', 'GraphQL', 'MongoDB', 'TypeScript', 'Cloudflare', 'Docker'],
    imageUrl: '/images/projects/archon.jpg',
    liveUrl: 'https://archon.example.com',
    githubUrl: 'https://github.com/amritchand/archon',
    featured: false, order: 5, category: 'backend',
  },
];

async function seed() {
  console.log('🌱 Connecting to MongoDB…');
  await connectDB();
  await ProjectModel.deleteMany({});
  const docs = await ProjectModel.insertMany(projects);
  console.log(`✅ Seeded ${docs.length} projects`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
