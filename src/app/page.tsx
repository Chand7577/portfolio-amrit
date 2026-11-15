import Navbar from '@/components/portfolio/Navbar';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import TechStackSection from '@/components/portfolio/TechStackSection';
import ExperienceSection from '@/components/portfolio/ExperienceSection';
import ProjectsSection from '@/components/portfolio/ProjectsSection';
import ServicesSection from '@/components/portfolio/ServicesSection';
import ProcessSection from '@/components/portfolio/ProcessSection';
import PricingSection from '@/components/portfolio/PricingSection';
import FAQSection from '@/components/portfolio/FAQSection';
import ContactSection from '@/components/portfolio/ContactSection';
import Footer from '@/components/portfolio/Footer';
import LenisProvider from '@/components/layout/LenisProvider';
import SlideUpContent from '@/components/layout/SlideUpContent';

export default function Home() {
  return (
    <LenisProvider>
      {/* 
        NO overflow-x-hidden here — it would break position:sticky on HeroSection.
        HeroSection is sticky top-0 z-10 (stays pinned).
        SlideUpContent is z-20, sits in natural DOM flow right after the hero
        (at the bottom of the viewport on load), and scrolls up over the pinned hero.
      */}
      <div className="bg-[#030303] text-[#aaadb0] font-body selection:bg-white selection:text-[#030303]">

        {/* Floating Transparent Navigation */}
        <Navbar />

        {/* Hero — cinematic portrait, stays sticky behind the rising panel */}
        <HeroSection />

        {/* Panel slides up over the hero on scroll, then normal scroll resumes */}
        <SlideUpContent>
          <main id="main-content" className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12">
            <AboutSection />
            <TechStackSection />
            <ExperienceSection />
            <ProjectsSection />
            <ServicesSection />
            <ProcessSection />
            <PricingSection />
            <FAQSection />
            <ContactSection />
          </main>
          <Footer />
        </SlideUpContent>

      </div>
    </LenisProvider>
  );
}
