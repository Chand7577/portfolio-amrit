export interface NavItem {
  label: string;
  href: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Freelancing', href: '#freelancing' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

export interface TechCategory {
  category: string;
  items: string[];
}

export const TECH_STACK: TechCategory[] = [
  {
    category: 'Languages',
    items: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'PHP', 'HTML5', 'CSS3', 'SQL'],
  },
  {
    category: 'Frameworks & Libraries',
    items: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'Django', 'Tailwind CSS', 'Bootstrap', 'Redux'],
  },
  {
    category: 'Databases & Backend',
    items: ['MongoDB', 'Supabase', 'PostgreSQL', 'REST APIs', 'OAuth 2.0', 'JWT'],
  },
  {
    category: 'Tools & Integrations',
    items: ['Git', 'GitHub', 'Docker', 'Razorpay', 'Socket.io', 'Cloudinary', 'Framer Motion', 'GSAP'],
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  location: string;
  type: string;
  points: string[];
  technologies?: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    role: 'Full-Stack Developer',
    company: 'Independent Client Project',
    duration: 'June 2026 – September 2026',
    location: 'Remote',
    type: 'Freelance',
    points: [
      'Built two websites for a homeopathic clinic: a static marketing site and a full-stack AI-powered Rubric Analyzer (drjpnauthomeopath.in).',
      'Architected an AI Rubric Analyzer with Google Gemini & Groq LLMs to extract clinical rubrics from patient narratives and rank remedies with confidence scoring.',
      'Built an in-browser Materia Medica library using react-pdf and Tesseract.js OCR with real-time page-jump and bilingual search.',
      'Deployed production-grade architecture (Netlify + Render) with MongoDB, Supabase, Cloudinary, JWT auth, Socket.io, and jsPDF report generation.',
    ],
    technologies: ['React 19', 'Tailwind CSS', 'Framer Motion', 'Google Gemini', 'Groq LLMs', 'MongoDB', 'Supabase', 'Cloudinary', 'Socket.io', 'JWT'],
  },
  {
    role: 'Front-End Developer',
    company: 'Grandeur Net',
    duration: 'October 2025 – June 2026',
    location: 'Dehradun, India',
    type: 'Full-time',
    points: [
      'Built 8+ responsive business websites using React.js and Tailwind CSS, improving cross-device user engagement and reducing bounce rate for clients.',
      'Strengthened e-commerce platform by integrating add-to-cart functionality, checkout flows, and Razorpay payment gateway, enabling end-to-end transaction processing.',
      'Engineered frontend and admin dashboard modules for a pharmaceutical management web application using PHP, streamlining internal operations.',
      'Leveraged AI tools (ChatGPT, Claude, Grok) to accelerate development cycles and automate repetitive tasks, reducing boilerplate setup time by 30%.',
    ],
    technologies: ['React.js', 'Tailwind CSS', 'Razorpay', 'PHP', 'AI Development (Claude/Grok)', 'REST APIs'],
  },
  {
    role: 'Full-Stack Developer (Client Project)',
    company: 'John Martyn Memorial School (jmmt.org.in)',
    duration: 'October 2025 – Present',
    location: 'Dehradun, India',
    type: 'Freelance',
    points: [
      'Architected and built a full multi-page React 19 + TypeScript institutional website for a 40-year-old school in Salangaon serving 194+ students, deployed live at jmmt.org.in.',
      'Implemented a full PHP-backed REST API with JWT authentication for an Admin Dashboard — managing school events (CRUD with image uploads), tracking donation records, and admin user authentication with password reset flows.',
      'Integrated Razorpay payment gateway for a live Donate page supporting multiple sponsorship purposes (midday meals, library, infrastructure), with real-time payment status tracking and receipt generation.',
      'Built 7+ lazy-loaded pages: Home, About, Gallery, School Events (with detail pages by slug), Success Stories, Donate, and Admin Portal — all with GSAP scroll-triggered reveal animations.',
      'Engineered animated GSAP Preloader (stair-reveal variant), animated count-up Stats section (194 students, 40+ years, 2,500+ library volumes), and a GSAP-driven StaggeredMenu navigation.',
    ],
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Razorpay', 'PHP REST API', 'JWT', 'React Router'],
  },
  {
    role: 'Web Developer Intern (Next.js)',
    company: 'Best Computers',
    duration: 'June 2025 – October 2025',
    location: 'Dehradun, India',
    type: 'Internship',
    points: [
      'Designed and developed responsive frontend interfaces for a unified inventory management system using Next.js, enabling real-time stock and price updates across 3+ partner websites.',
      'Implemented Supabase real-time subscriptions on the frontend to automatically sync stock and pricing data, reducing manual data entry errors by 40%.',
      'Optimized Next.js frontend performance for product catalogue pages, resulting in faster load times and consistent real-time data display across devices.',
    ],
    technologies: ['Next.js', 'Supabase Realtime', 'TypeScript', 'Tailwind CSS', 'Performance Optimization'],
  },
  {
    role: 'Front-End Developer Intern',
    company: 'Society of Robotics and Technology',
    duration: 'December 2024 – June 2025',
    location: 'Nagpur, Maharashtra',
    type: 'Internship',
    points: [
      'Contributed to a responsive dashboard for a Document Management System using React.js and Tailwind CSS, improving usability across desktop and mobile devices.',
      'Integrated REST APIs for dynamic data retrieval and implemented protected routing, enabling seamless team collaboration and faster data access.',
      'Established authentication workflows using OAuth 2.0 and JWT tokens, strengthening application security and reducing unauthorized access risks.',
    ],
    technologies: ['React.js', 'Tailwind CSS', 'OAuth 2.0', 'JWT Authentication', 'REST APIs', 'Protected Routing'],
  },
];

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  year: string;
  category: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'homeoai',
    title: 'HomeoAI – Rubric Analyzer',
    description:
      'AI-powered clinical platform using Google Gemini & Groq LLMs to extract rubrics from patient narratives, rank remedies with confidence scoring, and an in-browser Materia Medica library with OCR search.',
    tags: ['React 19', 'Node.js', 'MongoDB', 'Supabase', 'Google Gemini', 'Groq', 'Socket.io', 'Cloudinary'],
    image: '/projects/drjpnaut.png',
    year: '2026',
    category: 'Healthcare & Clinical AI',
    liveUrl: 'https://drjpnauthomeopath.in',
    githubUrl: 'https://github.com/chand7577/homeoai',
  },
  {
    id: 'ochnology',
    title: 'Ochnology – Architecture & Automation',
    description:
      'Modern agency and product platform showcasing architectural technology, smart conference room automation systems, and luxury interior hardware designs.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
    image: '/projects/ochno.png',
    year: '2026',
    category: 'Design Studio & Tech',
    liveUrl: 'https://www.ochnology.com/',
  },
  {
    id: 'ctst-consultants',
    title: 'CTST Consultants – Enterprise Cloud',
    description:
      'Enterprise technology portal providing cloud migration case studies, service tier dashboards, technical consulting booking, and security whitepapers with OAuth 2.0 and JWT.',
    tags: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'OAuth 2.0', 'JWT', 'Tailwind CSS'],
    image: '/projects/ctst.png',
    year: '2026',
    category: 'Enterprise Cloud & SaaS',
    liveUrl: 'https://www.ctstconsultants.com/',
    githubUrl: 'https://github.com/chand7577/erp-system',
  },
  {
    id: 'rekem-healthcare',
    title: 'Rekem Healthcare – Medical Solutions',
    description:
      'Comprehensive digital healthcare platform for medical equipment distribution, diagnostic clinical solutions, institutional supply chains, and hospital partner portals.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'REST APIs', 'Responsive UI'],
    image: '/projects/test-wait.png',
    year: '2025–26',
    category: 'Healthcare & Medical Devices',
    liveUrl: 'https://www.rekemhealthcare.com/',
  },
  {
    id: 'flatout-motors',
    title: 'FlatOut Motors & Riding Gear',
    description:
      'Performance tuning and premium riding gear showcase platform featuring interactive equipment specs, telemetry displays, and booking pipeline.',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Netlify'],
    image: '/projects/flatout.png',
    year: '2025',
    category: 'Automotive & E-Commerce',
    liveUrl: 'https://flatout13.netlify.app/',
  },
  {
    id: 'school-portal',
    title: 'John Martyn Memorial School',
    description:
      'Full-stack multi-page institutional website for a school founded in 1985, serving 194+ students. Features event management, gallery, success stories, donation system with Razorpay integration, newsletter, and a PHP-backed admin dashboard for content and payment tracking.',
    tags: ['React 19', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Razorpay', 'PHP', 'REST APIs', 'React Router'],
    image: '/projects/jmmt.png',
    year: '2025–26',
    category: 'Client Sites',
    liveUrl: 'https://jmmt.org.in',
    githubUrl: 'https://github.com/chand7577/school-jmmt',
  },
  {
    id: 'ecommerce-app',
    title: 'STRYDE – E-commerce Storefront',
    description:
      'Modern digital storefront with real-time product filtering, responsive cart management, Razorpay checkout, and a full admin dashboard for inventory and order management.',
    tags: ['React.js', 'Node.js', 'Tailwind CSS', 'Razorpay', 'MongoDB'],
    image: '/projects/ecomm.png',
    year: '2025',
    category: 'Retail & E-Commerce',
    liveUrl: 'https://ecomm1326.netlify.app/',
    githubUrl: 'https://github.com/chand7577/ecommerce-app',
  },
  {
    id: 'porto-artisan',
    title: 'Porto Artisan Hub – Culinary Showcase',
    description:
      'Vibrant culinary showcase landing page featuring animated culinary menus, visual brand storytelling, and interactive customer inquiry workflows.',
    tags: ['React', 'CSS3 Animations', 'Responsive UI', 'Netlify'],
    image: '/projects/kulfi.png',
    year: '2025',
    category: 'Food & Culinary Brand',
    liveUrl: 'https://euphonious-kulfi-19377f.netlify.app/',
  },
  {
    id: 'builmypc-inventory',
    title: 'BuildMyPC Inventory System',
    description:
      'Unified inventory management system using Next.js with Supabase real-time subscriptions to sync stock and pricing data across 3+ partner websites, reducing manual entry errors by 40%.',
    tags: ['Next.js', 'Supabase', 'Real-time', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/ecomm.png',
    year: '2025',
    category: 'Real-time Sync',
    githubUrl: 'https://github.com/chand7577/builmypc-inventory',
  },
];

export interface ServiceItem {
  title: string;
  description: string;
  number: string;
}

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Business & Corporate Websites',
    description:
      'Fast, modern, and SEO-optimized web presences built to establish credibility and convert visitors into clients.',
  },
  {
    number: '02',
    title: 'E-commerce Development',
    description:
      'High-converting online storefronts with seamless product management, shopping carts, and secure payment checkout.',
  },
  {
    number: '03',
    title: 'Custom Web Applications',
    description:
      'Tailored full-stack business tools with role-based access, automated workflows, and database integration.',
  },
  {
    number: '04',
    title: 'AI-Powered Solutions',
    description:
      'Intelligent digital features leveraging modern LLM and AI APIs to automate repetitive business tasks and data retrieval.',
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discuss',
    description: 'Understanding your goals, target audience, and specific functional requirements.',
  },
  {
    number: '02',
    title: 'Plan',
    description: 'Designing the information architecture, user journeys, and technical stack.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Developing clean, responsive, and thoroughly tested frontend and backend solutions.',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'Production deployment, final testing, handover, and ongoing launch support.',
  },
];

export interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    title: 'Basic Websites',
    price: '₹8,000',
    description: 'Ideal for individuals and small services needing a clean, professional web presence.',
    features: [
      'Responsive 1–3 page layout',
      'Contact form & WhatsApp link',
      'Performance & mobile optimization',
    ],
  },
  {
    title: 'Business Websites',
    price: '₹15,000',
    description: 'Complete multi-page web solution for established companies and professional services.',
    features: [
      'Custom multi-page architecture',
      'SEO setup & search indexing',
      'Content management / CMS integration',
    ],
  },
  {
    title: 'E-commerce Websites',
    price: '₹25,000',
    description: 'Direct-to-consumer store built for high conversions and frictionless purchasing.',
    features: [
      'Product catalog & inventory display',
      'Shopping cart & payment gateway checkout',
      'Order management & customer notifications',
    ],
  },
  {
    title: 'Custom Web Applications',
    price: '₹40,000',
    description: 'Custom full-stack software tailored to your specific operational business workflows.',
    features: [
      'Full-stack architecture & database setup',
      'Role-based authentication & route security',
      'Custom business logic & API integrations',
    ],
  },
];

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export const FAQS: FAQItem[] = [
  {
    category: 'General & Roles',
    question: 'Are you available for freelance work?',
    answer:
      'Yes, I am actively available for select freelance projects including business websites, e-commerce stores, and custom full-stack web applications.',
  },
  {
    category: 'Pricing & Scope',
    question: 'How is pricing decided?',
    answer:
      'Pricing begins at the starting tiers listed above and is finalized based on specific project scope, page count, and technical complexity after our initial discussion.',
  },
  {
    category: 'Tech & Architecture',
    question: 'What technologies do you work with?',
    answer:
      'I work primarily with React.js, Next.js, Node.js, Express.js, MongoDB, and PostgreSQL, along with TypeScript and modern Tailwind CSS.',
  },
  {
    category: 'General & Roles',
    question: 'Are you open to full-time roles?',
    answer:
      'Yes, I am open to discussing full-time software engineering roles with technology companies, startups, and remote teams.',
  },
  {
    category: 'Process & Collaboration',
    question: 'How do I get started?',
    answer:
      'You can reach out via the contact form below or email me directly at amritchand0713@gmail.com with a brief overview of your project requirements.',
  },
  {
    category: 'Pricing & Scope',
    question: 'Do you work with milestone-based payments or fixed quotes?',
    answer:
      'Yes, projects are structured around transparent milestone-based deliverables (e.g. 50% upfront, 50% upon final sign-off and deployment handover), ensuring complete clarity and peace of mind.',
  },
  {
    category: 'Tech & Architecture',
    question: 'Do I own all source code and assets after completion?',
    answer:
      '100% yes. Upon final milestone settlement, complete ownership of the GitHub repository, intellectual property, environment configs, and deployment credentials are fully transferred to you.',
  },
  {
    category: 'Process & Collaboration',
    question: 'What is your typical turnaround time for a project?',
    answer:
      'Most custom websites and web applications are built and shipped within 2 to 4 weeks, with continuous staging links and transparent weekly progress updates.',
  },
];

export const CONTACT_INFO = {
  email: 'amritchand0713@gmail.com',
  phone: '+91 7972198640',
  location: 'Based in India',
  availability: 'Available for freelance & full-time',
  resumeUrl: '/resume.pdf',
  whatsappUrl: 'https://wa.me/917972198640',
  linkedinUrl: 'https://www.linkedin.com/in/amr%C3%AEt-chand-93005922b/',
  githubUrl: 'https://github.com/chand7577',
};
