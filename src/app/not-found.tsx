export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-text-primary flex flex-col items-center justify-center gap-6 section-padding">
      <p className="font-mono text-accent text-sm tracking-widest uppercase">404</p>
      <h1 className="text-5xl font-bold">Page not found</h1>
      <p className="text-text-secondary">The page you&apos;re looking for doesn&apos;t exist.</p>
      <a href="/" className="btn-outline">← Back home</a>
    </div>
  );
}
