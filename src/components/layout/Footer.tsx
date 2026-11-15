export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/50 py-8 section-padding">
      <div className="container-max flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-text-muted text-sm font-mono">
          © {new Date().getFullYear()} Amrit Chand — Built with Next.js &amp; ☕
        </p>
        <div className="flex items-center gap-6">
          {[
            { label: 'GitHub', href: 'https://github.com/amritchand' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/amritchand' },
            { label: 'Twitter', href: 'https://twitter.com/amritchand' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors text-sm"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
