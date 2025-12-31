/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./constants.tsx",
    "./types.ts",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        // New De-AI-fied Palette
        primary: '#0f766e', // Teal-700 (WCAG AA compliant with white text)
        secondary: '#f59e0b', // Amber-500
        dark: '#020617', // Slate-950 (Richer dark)
        bmc: '#FFDD00',
        // Auto eRPH colors
        navy: {
          700: '#1e3a5f',
          800: '#0d1f3c',
          900: '#060d1f',
        },
        'accent-purple': '#8b5cf6',
        'accent-pink': '#ec4899',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'bounce-slow': 'bounce 3s infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      }
    }
  },
  plugins: [],
}
