import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: '#2C3E7A',
          'indigo-dark': '#1E2D5F',
          'indigo-light': '#3D52A0',
          amber: '#E8731A',
          'amber-dark': '#C45E10',
          'amber-light': '#F08B3A',
          sage: '#3E9B74',
          'sage-light': '#4DB88A',
        },
        surface: {
          DEFAULT: '#F8F9FC',
          card: '#FFFFFF',
          border: '#E2E8F2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
