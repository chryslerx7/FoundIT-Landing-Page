/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Space Mono"', "monospace"],
        sans: ["Inter", "sans-serif"],
        pixel: ['"Press Start 2P"', "monospace"],
      },
    },
  },
  plugins: [],
};
