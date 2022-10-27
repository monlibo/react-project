/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'lg': "repeat(auto-fill, minmax(200px, 1fr))",
        'sm': "repeat(auto-fill, minmax(120px, 1fr))",
        'smm': "repeat(auto-fill, minmax(100px, 1fr))",
      },
    },
    screens: {
      'sm': "320px",
      'md': "640px",
      'lg': "1024px",
      'xl': "1280px",
    },
  },
  plugins: [],
};
