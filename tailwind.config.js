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
        sans: ['Inter', 'sans-serif'],
        display: ['Cal Sans', 'Inter', 'sans-serif'],
      },
      colors: {
        primary: '#4f46e5',
        secondary: '#8b5cf6',
        dark: '#0f172a',
        bmc: '#FFDD00', // Buy Me a Coffee Yellow
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
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    }
  },
  plugins: [],
}
