import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/mongodb';
import ProjectModel from '@/models/Project';

/* ── GET /api/projects ──────────────────────────────────── */
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');

    const filter: Record<string, unknown> = {};
    if (featured === 'true') filter.featured = true;
    if (category) filter.category = category;

    const projects = await ProjectModel.find(filter).sort({ order: 1 }).lean();

    return NextResponse.json({ projects }, {
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=120' },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

/* ── POST /api/projects (admin) ─────────────────────────── */
const createSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().optional(),
  techStack: z.array(z.string()),
  imageUrl: z.string().url().or(z.string().startsWith('/')),
  images: z.array(z.string()).optional(),
  liveUrl: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  featured: z.boolean().default(false),
  order: z.number().default(0),
  category: z.enum(['fullstack', 'frontend', 'backend', 'mobile', 'other']),
});

export async function POST(req: NextRequest) {
  // Simple secret-header auth for admin calls
  const secret = req.headers.get('x-admin-secret');
  if (secret !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed', details: parsed.error.flatten() }, { status: 422 });
  }

  try {
    await connectDB();
    const project = await ProjectModel.create(parsed.data);
    return NextResponse.json({ project }, { status: 201 });
  } catch (err: any) {
    if (err?.code === 11000) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
