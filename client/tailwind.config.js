/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#951d4d",
        secondary: "#d4e2f7",
        text: "#081426",
        background: "#e1ebf9",
      },
    },
  },
  plugins: [],
};
