/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      kdisplay: ['Jua', 'sans-serif'],
      edisplay: ['Baloo Thambi', 'sans-serif'],
    },
    screens: {
      "2sm": "490px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1240px",
      "2xl": "1335px",
      'tall': { 'raw': '(min-height: 738.4px)' },
      'middle': { 'raw': '(min-height: 605px)' },
      'small': { 'raw': '(min-height: 500px)' },
    },
    extend: {},
  },
  plugins: [],
}