/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cloudDarkBg: "#00304D",
        brandCyan: {
          100: "#EDF8FB",
          200: "#C4E7F1",
          400: "#48B5D5",
          600: "#327F95",
          600: "#2B6D80",
        },
        brandBlue: {
          100: "#E8F5FC",
          200: "#B3DEF6",
          400: "#1699E2",
          600: "#0F6B9E",
          700: "#0D5C88",
        },
      },
      fontFamily: {
        sans: [
          "IBM Plex Sans",
          "-apple-system",
          "ui-sans-serif",
          "system-ui",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
      },
      listStyleType: {
        square: "square",
      },
    },
    screens: {
      md: "450px",
      lg: "1024px",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
