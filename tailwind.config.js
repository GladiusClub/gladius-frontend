/** @type {import('tailwindcss').Config} */

const colors = require("./theme/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/styles/*.css"],
  important: "#root",
  theme: {
    extend: {
      colors,
      backgroundImage: {
        active: colors.active,
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
