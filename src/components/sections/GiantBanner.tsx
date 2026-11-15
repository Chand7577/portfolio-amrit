'use client';

export default function GiantBanner() {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const phrase = "Let’s talk. Book a free call • Let’s talk. Book a free call • ";

  return (
    <div className="py-10 bg-neutral-950 text-white overflow-hidden border-y border-neutral-900 cursor-pointer" onClick={scrollToContact}>
      {/* Repeating scrolling marquee */}
      <div className="flex select-none whitespace-nowrap overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-8 text-2xl sm:text-3xl md:text-4xl font-heading font-black tracking-tight text-white/90 hover:text-brand transition-colors">
          <span>{phrase}</span>
          <span>{phrase}</span>
          <span>{phrase}</span>
          <span>{phrase}</span>
        </div>
      </div>

      <div className="max-w-xl mx-auto text-center mt-6 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand text-white font-bold text-xs flex items-center justify-center">
            AC
          </div>
          <span className="text-xs sm:text-sm text-neutral-300 font-medium">
            or send me a message below. I reply to everything myself.
          </span>
        </div>
      </div>
    </div>
  );
}
