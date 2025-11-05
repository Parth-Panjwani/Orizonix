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
        neon: {
          blue: '#00D4FF',
          cyan: '#00FFFF',
          purple: '#7B61FF',
          pink: '#FF0096',
        },
        dark: {
          bg: '#0A0A0A',
          surface: '#141414',
          border: '#1F1F1F',
        },
      },
      backgroundImage: {
        'gradient-creative': 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(123, 97, 255, 0.1) 50%, rgba(255, 0, 150, 0.1) 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'Space Grotesk', 'Satoshi', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00D4FF, 0 0 10px #00D4FF, 0 0 15px #00D4FF' },
          '100%': { boxShadow: '0 0 10px #00D4FF, 0 0 20px #00D4FF, 0 0 30px #00D4FF, 0 0 40px #00D4FF' },
        },
      },
    },
  },
  plugins: [],
}

