import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#030303",
          glass: "#030303e6",
        },
        surface: {
          card: "#0a0a0a",
          border: "#1a1a1a",
        },
        editorial: {
          white: "#ffffff",
          display: "#fdfdfd",
          secondary: "#aaadb0",
          body: "#9a9a9a",
          muted: "#777777",
          dark: "#030303",
          black: "#000000",
          border: "#1a1a1a",
        },
      },
      fontFamily: {
        serif: ["'Instrument Serif'", "Georgia", "Cambria", "serif"],
        heading: ["'Instrument Serif'", "Georgia", "Cambria", "serif"],
        body: [
          "Graphik",
          "-apple-system",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Oxygen-Sans",
          "Ubuntu",
          "Cantarell",
          "Helvetica Neue",
          "Plus Jakarta Sans",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
