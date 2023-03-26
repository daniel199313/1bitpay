/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.tsx"],
  mode: "jit",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    borderWidth: {
      1: "1px",
    },
    colors: {
      primary: "#CFFD85",
      error: "#E90000",
      secondary: "#959CA5",
      background: "#F3F3F8",
      white: "#FFFFFF",
      gary: "#E7E7F6",
      transparent: "transparent",
      green: colors.green,
      red: colors.red,
      blue: colors.blue,
      link: "#82AF37",
      tab: {
        active: "#5D5D9C",
        default: "#E2E2F0",
      },
    },

    extend: {
      spacing: {
        header: "114px",
        tab: "85px",
      },
    },
  },
  plugins: [],
};
