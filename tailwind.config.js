/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "light-blue": "#19A7CE",
        "deep-blue": "#146C94",
        "almost-white": "#f6f1f1",
      },
    },
  },
  plugins: [],
};
