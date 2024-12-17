import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Generic color palette
        primary: {
          50: "#fdf8fb",
          100: "#f8edf3",
          200: "#f1d8e5",
          300: "#e9b9cd",
          400: "#dc8fb1",
          500: "#d06697",
          600: "#b54c7e",
          700: "#923b64",
          800: "#73304f",
          900: "#5a2740",
        },
        secondary: {
          50: "#f2fbf5",
          100: "#dcf8e6",
          200: "#b9f0cf",
          300: "#82e2aa",
          400: "#4fd58a",
          500: "#2ebd6b",
          600: "#249d56",
          700: "#1f7d45",
          800: "#1b5f37",
          900: "#174b2c",
        },
        accent: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        neutral: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["Inter", "Helvetica", "Arial", "sans-serif"],
        heading: ["Playfair Display", "Georgia", "serif"],
      },
      spacing: {
        18: "4.5rem",
        28: "7rem",
        36: "9rem",
        72: "18rem",
        80: "20rem",
        96: "24rem",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      transitionTimingFunction: {
        "ease-bloom": "cubic-bezier(0.23, 1, 0.32, 1)", // Smooth bounce-like easing
      },
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
      },
      boxShadow: {
        bloom:
          "0 4px 6px -1px rgba(208, 102, 151, 0.1), 0 2px 4px -1px rgba(208, 102, 151, 0.06)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        circle: "50%",
      },
      screens: {
        xs: "475px", // Small extra breakpoint for smaller devices
      },
    },
  },
};

export default config;
