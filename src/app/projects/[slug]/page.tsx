import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProject(slug: string) {
  try {
    const base = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/projects/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.project ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-background text-text-primary section-padding pt-32 pb-24">
      <div className="container-max max-w-4xl">
        {/* Back */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors mb-10 font-mono text-sm"
        >
          ← Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-10">
          <span className="font-mono text-accent text-xs tracking-widest uppercase">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mt-3 mb-4 leading-tight">
            {project.title}
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-4 mb-12">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline !text-xs !px-4 !py-2"
            >
              GitHub ↗
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-accent !text-xs !px-4 !py-2"
            >
              Live Demo ↗
            </a>
          )}
        </div>

        {/* Hero image placeholder */}
        <div className="w-full h-64 md:h-96 rounded-xl bg-gradient-to-br from-surface to-background border border-border/40 mb-12 flex items-center justify-center overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `linear-gradient(135deg, ${
                project.category === 'fullstack'
                  ? '#06b6d4, #818cf8'
                  : project.category === 'backend'
                  ? '#34d399, #06b6d4'
                  : '#fb923c, #f43f5e'
              })`,
            }}
          />
          <span className="relative text-9xl font-bold opacity-10">
            {project.title[0]}
          </span>
        </div>

        {/* Long description */}
        {project.longDescription && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-text-secondary leading-relaxed">
              {project.longDescription}
            </p>
          </div>
        )}

        {/* Tech stack */}
        <div>
          <h2 className="text-xl font-bold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((tech: string) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg border border-border/60 font-mono text-sm text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
