/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          light: "#60A5FA",
          dark: "#1E40AF"
        },
        secondary: {
          DEFAULT: "#10B981",
          light: "#34D399",
          dark: "#059669"
        },
        accent: {
          DEFAULT: "#FACC15",
          light: "#FDE047",
          dark: "#EAB308"
        },
        action: {
          DEFAULT: "#F97316",
          light: "#FB923C",
          dark: "#EA580C"
        },
        alert: {
          DEFAULT: "#EF4444",
          light: "#F87171",
          dark: "#DC2626"
        },
        gray: {
          light: "#F3F4F6",
          medium: "#9CA3AF",
          dark: "#1F2937"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
