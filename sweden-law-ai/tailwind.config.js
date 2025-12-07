/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'legal-blue': '#002B5C', // Swedish flag blue-ish / Corporate
        'legal-gold': '#FECC00', // Swedish flag yellow-ish
        'law-gray': '#F3F4F6',
      }
    },
  },
  plugins: [],
}
