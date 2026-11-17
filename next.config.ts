import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "opengraph.githubassets.com" },
    ],
  },
  // Three.js / R3F is loaded client-only (ssr: false), so no canvas extern needed.
  // Turbopack is the default in Next.js 16 — no extra config required.
};

export default nextConfig;
