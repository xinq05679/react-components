/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "strip-progressbar-gradient-45":
          "linear-gradient(45deg, rgba(255,255,255,.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%, transparent 75%, transparent)",
      },
      keyframes: {
        "strip-progressbar": {
          "0%": { "background-position-x": "1rem" },
        },
      },
      animation: {
        "strip-progressbar": "strip-progressbar 0.5s linear infinite",
      },
    },
  },
  plugins: [],
};
