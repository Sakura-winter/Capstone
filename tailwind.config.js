/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0B0F19',
        surface: 'rgba(17, 24, 39, 0.75)',
        surfaceHover: 'rgba(31, 41, 55, 0.85)',
        borderGlass: 'rgba(255, 255, 255, 0.08)',
        brand: {
          terracotta: '#C15F3C',
          linen: '#F4F3EE',
          stone: '#B1ADA1',
          pureWhite: '#FFFFFF',
        },
        accent: {
          cyan: '#06B6D4',
          indigo: '#6366F1',
          emerald: '#10B981',
          rose: '#F43F5E',
          amber: '#F59E0B'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(99, 102, 241, 0.3)' },
          '100%': { boxShadow: '0 0 25px rgba(6, 182, 212, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
