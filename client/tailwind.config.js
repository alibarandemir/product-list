/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      fontFamily: {
        sans: ['Avenir', 'system-ui', 'sans-serif'], // default font
        montserrat: ['Montserrat', 'sans-serif'],
        avenir: ['Avenir', 'sans-serif']
      },
      extend: {
      },
    },
    plugins: [],
  }
  