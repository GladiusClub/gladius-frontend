/** @type {import('tailwindcss').Config} */

const colors = require("./theme/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/styles/*.css"],
  theme: {
    extend: {
      colors,
    },
  },
  plugins: [],
};
