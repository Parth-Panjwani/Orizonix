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
        surface: {
          DEFAULT: '#0a0a0a',
          alt: '#111111',
          elevated: '#1a1a1a',
          border: 'rgba(212, 168, 83, 0.08)',
        },
        gold: {
          50: '#fdf8ed',
          100: '#f9edc8',
          200: '#f2d98a',
          300: '#e8c25a',
          400: '#D4A853',
          500: '#C4963E',
          600: '#A67B2D',
          700: '#886420',
          800: '#6b4f18',
          900: '#4e3a12',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        body: ['Inter', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        brand: ['TAN Meringue', 'Georgia', 'serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '3rem',
          xl: '4rem',
        },
      },
      fontSize: {
        'hero': ['clamp(2.25rem, 6.5vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.035em', fontWeight: '700' }],
        'section': ['clamp(1.75rem, 4.5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }],
        'card-title': ['clamp(1rem, 1.8vw, 1.375rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'stat': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      borderRadius: {
        'card': '12px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
