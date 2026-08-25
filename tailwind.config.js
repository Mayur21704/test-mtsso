/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Centralized Brand Colors
        navy: {
          DEFAULT: "hsl(var(--navy) / <alpha-value>)",
          dark: "hsl(var(--navy-dark) / <alpha-value>)",
          light: "hsl(232 40% 45% / <alpha-value>)",
        },
        coral: {
          DEFAULT: "hsl(var(--coral) / <alpha-value>)",
          light: "hsl(var(--coral-light) / <alpha-value>)",
          pale: "hsl(var(--coral-pale) / <alpha-value>)",
        },
        "warm-gray": "hsl(var(--warm-gray) / <alpha-value>)",
        "text-mid": "#555555",
        "text-dim": "#888888",
        periwinkle: "#7f97cf",
        teal: "#2d9d9d",
        border: "hsl(var(--border) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
      },
      fontFamily: {
        nunito: ['"Nunito"', 'sans-serif'],
        inter: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        warm: "0 6px 20px rgba(224, 90, 43, 0.35)",
        "warm-hover": "0 10px 28px rgba(224, 90, 43, 0.45)",
        card: "0 2px 14px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 14px 34px rgba(224, 90, 43, 0.12)",
        soft: "0 4px 24px rgba(45, 53, 128, 0.08)",
      },
    },
  },
  plugins: [],
};
