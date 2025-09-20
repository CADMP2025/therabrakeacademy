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
        // TheraBrake Academy Brand Colors
        'brand': {
          // Primary - Focus & Trust
          'blue': '#3B82F6',
          'blue-soft': '#60A5FA',
          
          // Secondary - Growth & Progress  
          'green': '#10B981',
          'green-soft': '#34D399',
          
          // Accent - Attention & Curiosity
          'yellow': '#FACC15',
          'gold': '#FBBF24',
          
          // Action - Motivation & CTA
          'orange': '#F97316',
          'coral': '#FB923C',
          
          // Neutrals
          'white': '#FFFFFF',
          'gray-light': '#F3F4F6',
          'gray-medium': '#9CA3AF',
          'gray-dark': '#1F2937',
          
          // Alert
          'red': '#EF4444',
        }
      },
    },
  },
  plugins: [],
}
