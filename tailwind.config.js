/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.vue", "./components/**/*.vue", "./nuxt.config.ts"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        scale: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.9)" },
        },
      },
      animation: {
        scale: "scale 0.3s ease-in",
      },
    },
  },
  plugins: [],
};
