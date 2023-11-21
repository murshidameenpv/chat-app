/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // This enables dark mode
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
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        blink: 'blink 1s infinite',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['dark'], // This enables dark mode variants for background color
      textColor: ['dark'], // This enables dark mode variants for text color
    },
  },
  plugins: [],
}
