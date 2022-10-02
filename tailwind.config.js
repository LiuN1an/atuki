/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  purge: ["./pages/**/*.{js,jsx}"],
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
