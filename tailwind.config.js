/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bina-yellow': '#FFD600',
        'bina-black': '#000000',
        'bina-white': '#FFFFFF',
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