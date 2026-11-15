export interface Project {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  imageUrl: string;
  images?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  category: "fullstack" | "frontend" | "backend" | "mobile" | "other";
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "database" | "devops" | "other";
  color?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface GithubRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
  topics: string[];
}
