import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://amritchand.dev"),
  title: {
    default: "Amrit Chand – Full-Stack Developer",
    template: "%s | Amrit Chand",
  },
  description:
    "Full-stack developer specialising in the MERN stack and TypeScript. Building high-performance, production-grade web applications.",
  keywords: [
    "Amrit Chand",
    "Full-Stack Developer",
    "MERN Stack",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "Portfolio",
  ],
  authors: [{ name: "Amrit Chand", url: "https://amritchand.dev" }],
  creator: "Amrit Chand",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://amritchand.dev",
    title: "Amrit Chand – Full-Stack Developer",
    description:
      "Full-stack developer specialising in the MERN stack and TypeScript.",
    siteName: "Amrit Chand",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Amrit Chand" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amrit Chand – Full-Stack Developer",
    description:
      "Full-stack developer specialising in the MERN stack and TypeScript.",
    images: ["/og-image.jpg"],
    creator: "@amritchand",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark" data-theme="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('portfolio-theme');
                  var theme = saved || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
                  document.documentElement.classList.remove('light', 'dark');
                  document.documentElement.classList.add(theme);
                  document.documentElement.setAttribute('data-theme', theme);
                  document.documentElement.style.colorScheme = theme;
                } catch(e) {}
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#030303] text-[#aaadb0] antialiased font-body transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
