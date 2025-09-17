/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
        },
        secondary: {
          DEFAULT: '#10B981',
          light: '#34D399',
        },
        accent: '#FACC15',
        action: '#F97316',
        alert: '#EF4444',
      },
    },
  },
  plugins: [],
}
