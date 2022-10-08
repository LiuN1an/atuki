/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,jsx}"],
  mode: "jit",
  purge: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        bgEnter: "bg-enter 1s ease-in-out",
      },
      keyframes: {
        "bg-enter": {},
      },
    },
  },
  plugins: [],
};
