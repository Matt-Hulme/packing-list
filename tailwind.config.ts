import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './node_modules/@chakra-ui/react/dist/umd/*',
  ],
  theme: {
    extend: {
      colors: {
        green: '#C4DB09',
        black: '#1F1F20',
        greyDark: '#6F727C',
        greyLight: '#C9C9C9',
        white: 'FFFFFF',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
    },
  },
  plugins: [],
} satisfies Config
