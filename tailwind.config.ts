import type { Config } from "tailwindcss";

export default {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './node_modules/@chakra-ui/react/dist/umd/*',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
    },
  },
  plugins: [],
} satisfies Config;
