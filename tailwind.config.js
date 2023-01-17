const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  // theme: {
  //   extend: {
  //     fontFamily: {
  //       sans: ['var(--font-outfit)', ...fontFamily.sans],
  //     },
  //   },
  // },
  plugins: [
    require("@tailwindcss/typography"),
    require('tailwind-scrollbar-hide'),
  ],
}
