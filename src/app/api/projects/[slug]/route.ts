import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import ProjectModel from '@/models/Project';

type Context = { params: Promise<{ slug: string }> };

export async function GET(_req: NextRequest, { params }: Context) {
  const { slug } = await params;
  try {
    await connectDB();
    const project = await ProjectModel.findOne({ slug }).lean();
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ project });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Context) {
  const { slug } = await params;
  const secret = req.headers.get('x-admin-secret');
  if (secret !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  try {
    await connectDB();
    const project = await ProjectModel.findOneAndUpdate(
      { slug },
      body as object,
      { new: true, runValidators: true }
    );
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ project });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Context) {
  const { slug } = await params;
  const secret = req.headers.get('x-admin-secret');
  if (secret !== process.env.NEXTAUTH_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    await ProjectModel.deleteOne({ slug });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
