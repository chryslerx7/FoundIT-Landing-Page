/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Space Mono"', "ui-monospace", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
        pixel: ['"Press Start 2P"', "monospace"],
      },
      colors: {
        brand: {
          DEFAULT: "#3157D5",
          dark: "#2444B8",
          light: "#EEF2FF",
          accent: "#6D8CFF",
        },
        ink: "#111827",
        muted: "#667085",
        line: "#E4E7EC",
        divider: "#EAECF0",
        canvas: "#F7F9FC",
        night: {
          DEFAULT: "#0B1020",
          surface: "#151C2E",
          elevated: "#1D263B",
          border: "#2C3852",
        },
        lost: {
          DEFAULT: "#DC2626",
          dark: "#F87171",
        },
        found: {
          DEFAULT: "#16A34A",
          dark: "#4ADE80",
        },
      },
      borderRadius: {
        card: "1.25rem",
        phone: "2rem",
      },
      boxShadow: {
        premium: "0 1px 2px rgba(16,24,40,.06), 0 8px 24px -8px rgba(16,24,40,.12)",
        "premium-lg":
          "0 2px 4px rgba(16,24,40,.06), 0 20px 48px -16px rgba(49,87,213,.22)",
        brutal: "4px 4px 0 0 #111827",
        "brutal-sm": "3px 3px 0 0 #111827",
        "brutal-blue": "4px 4px 0 0 #3157D5",
      },
    },
  },
  plugins: [],
};
