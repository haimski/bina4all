/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bina-light-blue': '#3B82F6', // Clean blue accent
        'bina-deep-blue': '#334155', // Deep blue (rgb(51 65 85))
        'bina-white': '#FFFFFF', // Pure white
        'bina-light-gray': '#E2E8F0', // Light gray for borders
        'bina-gray': '#64748B', // Medium gray for text
        'bina-dark-gray': '#334155', // Dark gray for headings
      },
      fontFamily: {
        'hebrew': ['Heebo', 'Arial', 'sans-serif'],
        'english': ['Inter', 'Arial', 'sans-serif'],
      },
      direction: {
        'rtl': 'rtl',
        'ltr': 'ltr',
      }
    },
  },
  plugins: [],
} 