import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import connectDB from '@/lib/mongodb';
import ContactModel from '@/models/Contact';
import { rateLimit } from '@/lib/rateLimit';
import { sendContactEmail } from '@/lib/email';

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(4).max(200),
  message: z.string().min(20).max(5000),
});

export async function POST(req: NextRequest) {
  // Rate limit: 5 submissions per minute per IP
  const { success, remaining } = rateLimit(req, 5, 60_000);
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a minute and try again.' },
      { status: 429, headers: { 'Retry-After': '60' } }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  try {
    await connectDB();
    await ContactModel.create({ name, email, subject, message });
  } catch (err) {
    console.error('DB error:', err);
    // Non-fatal: still try to send email
  }

  // Send email notification (non-blocking)
  sendContactEmail({ name, email, subject, message }).catch(console.error);

  // Forward to Web3Forms (non-blocking)
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY || 'efb7a980-f85e-4c61-be3e-33968a245c72';
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: web3Key,
      name,
      email,
      subject,
      message,
    }),
  }).catch((err) => console.error('Web3Forms forward error:', err));

  return NextResponse.json(
    { success: true, message: 'Message received! I will reply within 24 hours.' },
    { status: 201, headers: { 'X-RateLimit-Remaining': String(remaining) } }
  );
}
