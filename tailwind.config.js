/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1D4ED8',  // Example color for dark mode
      }
    },
  },
  darkMode: 'class',  // Enable dark mode based on class
  plugins: [],
};
