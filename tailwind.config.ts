import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#111111",
        surface: "#1A1A1A",
        "surface-2": "#222222",
        border: "#2A2A2A",
        "text-primary": "#FFFFFF",
        "text-secondary": "#A0A0A0",
        "text-muted": "#606060",
        accent: "#FF5722",
        "accent-hover": "#E64A19",
        "accent-muted": "rgba(255,87,34,0.15)",
        peach: "#FFF0E8",
        // Channel colours
        gsc: "#4285F4",
        ga: "#F9AB00",
        gads: "#34A853",
        gbp: "#EA4335",
        meta: "#1877F2",
        clarity: "#742774",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      fontWeight: {
        black: "900",
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
