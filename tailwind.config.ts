import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./ui/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        surface: "#111827",
        accent: {
          DEFAULT: "#38bdf8",
          soft: "#22d3ee"
        },
        success: "#22c55e",
        warning: "#fbbf24",
        danger: "#ef4444"
      }
    }
  },
  plugins: []
};

export default config;
