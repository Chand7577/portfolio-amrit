export default function SoloFooter() {
  return (
    <footer className="py-14 px-6 bg-charcoal border-t border-white/[0.06] text-neutral-400 text-xs">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Col 1 & 2: Wordmark & Summary */}
          <div className="col-span-2 space-y-3">
            <span className="font-heading font-semibold text-lg text-white tracking-tight block">
              Amrit Chand
            </span>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Frontend &amp; full-stack developer based in India, designing and building web applications that remain maintainable after launch.
            </p>
            <div className="text-xs font-mono text-neutral-500 pt-1">
              Dehradun, India &bull; Serving clients globally
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-2.5">
            <div className="font-mono text-xs uppercase tracking-wider text-neutral-300">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#work" className="hover:text-white transition-colors">Work</a></li>
            </ul>
          </div>

          {/* Col 4: Services */}
          <div className="space-y-2.5">
            <div className="font-mono text-xs uppercase tracking-wider text-neutral-300">
              Services
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">Custom Builds</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Ongoing Care Plan</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Performance Audit</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Rescue &amp; Rebuild</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">White-Label Partner</a></li>
            </ul>
          </div>

          {/* Col 5: Connect */}
          <div className="space-y-2.5">
            <div className="font-mono text-xs uppercase tracking-wider text-neutral-300">
              Connect
            </div>
            <ul className="space-y-2 text-xs">
              <li><a href="https://github.com/chand7577" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub ↗</a></li>
              <li><a href="https://linkedin.com/in/amrit-chand-93005922b" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn ↗</a></li>
              <li><a href="mailto:amritchand0713@gmail.com" className="hover:text-white transition-colors">Direct Email ↗</a></li>
              <li><a href="tel:7972198640" className="hover:text-white transition-colors">+91 7972198640</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} Amrit Chand. All rights reserved.
          </div>
          <div>
            Built with React 19, Next.js 16 &bull; Production TypeScript
          </div>
        </div>
      </div>
    </footer>
  );
}
