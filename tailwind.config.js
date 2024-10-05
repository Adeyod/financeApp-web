/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
        mg: '1276px',
      },
      colors: {
        primary: '#9b59b6',
        secondary: '#5063BF',
      },
    },
  },
  plugins: [],
};
