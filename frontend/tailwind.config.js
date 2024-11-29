/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1A1A1A', // Add a custom primary color
        secondary: '#1E3A8A',
      },
      fontFamily: {
        karla: ['Karla', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
