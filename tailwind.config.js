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
        // TheraBrake Academy Exact Color Palette
        
        // Primary - Focus & Trust
        primary: {
          DEFAULT: '#3B82F6', // Vibrant but calm blue
          soft: '#60A5FA',    // Soft blue for hover states
        },
        
        // Secondary - Growth & Progress  
        secondary: {
          DEFAULT: '#10B981', // Green for progress/success
          soft: '#34D399',    // Soft green for highlights
        },
        
        // Accent - Attention & Curiosity
        accent: {
          DEFAULT: '#FACC15', // Yellow for emphasis
          warm: '#FBBF24',    // Amber/Gold for CTAs
        },
        
        // Action - Motivation & CTA
        action: {
          DEFAULT: '#F97316', // Orange for buttons
          soft: '#FB923C',    // Coral orange for hovers
        },
        
        // Alert - Urgency
        alert: '#EF4444',     // Red for errors/warnings
        
        // Neutrals - Clarity & Balance
        gray: {
          light: '#F3F4F6',   // Section backgrounds
          medium: '#9CA3AF',  // Secondary text
          dark: '#1F2937',    // Primary text (softer than black)
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
