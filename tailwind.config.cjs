/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      "paw-green-0": "#d2ffd2",
      "paw-green-1": "#a6ffa6",
      "paw-green-2": "#36b336",
      "paw-green-3": "#267d26",
      "paw-orange-0": "#f27121",
      "paw-purple-0": "#8a2387",
      "br-grey": "#e8e6ea",
      "input-grey": "#5e5e5e",
      "input-grey-2": "#f3f3f3",
      "paw-blue-0": "#4c4cff",
      inactive: "#adafbb",
      white: "#fff",
      red: "#e02525",
      black: "#000",
    },
    fontFamily: {
      "montserrat-regular": ["Montserrat Regualr", "sans-serif"],
      "montserrat-bold": ["Montserrat Bold", "sans-serif"],
      "montserrat-extrabold": ["Montserrat ExtraBold", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
