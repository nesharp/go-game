/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        turn1: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(180deg)" },
        },
        turn2: {
          "0%": { transform: "rotate(0deg)" },
          "50%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-180deg)" },
        },
        switchdot: {
          "0%": { backgroundColor: "#039" },
          "52%": { backgroundColor: "#039" },
          "53%": { backgroundColor: "transparent" },
          "100%": { backgroundColor: "transparent" },
        },
      },
      animation: {
        turn1: "turn1 1s ease-in-out infinite",
        turn2: "turn2 1s ease-in-out infinite",
        switchdot: "switchdot 1s linear infinite",
      },
      spacing: {
        "26px": "26px",
        "15px": "15px",
      },
    },
  },
  plugins: [],
};
