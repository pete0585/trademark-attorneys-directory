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
        navy: {
          DEFAULT: '#1B2C4F',
          50: '#EEF1F7',
          100: '#D4DCEA',
          200: '#A3B4D0',
          300: '#728CB7',
          400: '#4163A0',
          500: '#2A4B87',
          600: '#1B2C4F',
          700: '#142240',
          800: '#0D1930',
          900: '#060F1F',
        },
        gold: {
          DEFAULT: '#C9A227',
          50: '#FBF5E0',
          100: '#F6E9B3',
          200: '#EDD77A',
          300: '#E4C441',
          400: '#D9B22A',
          500: '#C9A227',
          600: '#A08020',
          700: '#786018',
          800: '#504010',
          900: '#282008',
        },
        slate: {
          DEFAULT: '#4A5568',
          light: '#718096',
          50: '#F7F8FA',
          100: '#EDF0F5',
          200: '#CBD5E0',
          300: '#A0AEC0',
          400: '#718096',
          500: '#4A5568',
          600: '#2D3748',
          700: '#1A202C',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 16px rgba(27,44,79,0.06)',
        card: '0 4px 24px rgba(27,44,79,0.08)',
        'card-hover': '0 8px 32px rgba(27,44,79,0.14)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [],
}

export default config
