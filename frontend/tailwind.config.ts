import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: { glow: "0 24px 64px -26px rgb(14 116 144 / 0.4)" },
      colors: { ink: "#11273a" },
    },
  },
  plugins: [],
} satisfies Config;
