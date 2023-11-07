/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '90vh': '90vh',
      },
      width: {
        '90vw': '90vw',
      },
      flex: {
        '3': '0.3',
        '7': '0.7',
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
      }

    },
  },
  plugins: [],
}