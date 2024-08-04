/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        purple: "#673AB7",
        yellow: "#FDBF49",
        red: "#FF3A3A",
        blue: "#5498FF",
        green: "#00C520",
        lime: "#2CCE59", 
        gray: "#EDE7E7",
        gray: {
          100: "#EDE7E7",
          200: "#C8C8C8",
          300: "#8F8F8F",
          400: "#9A9A9A",
        },
        "hot-pink": "#ED266B",
        "utility-blue": "#236AF2",
        "base-white": "#F0F0F0"
      },
    },
  },
  plugins: [],
};
