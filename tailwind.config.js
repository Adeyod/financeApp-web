/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
        mg: '1276px',
        slg: '1212px',
        nlg: '1205px',
        mlg: '1000px',
        clg: '1025px',
        mmg: '900px',
        smm: '590px',
        mng: '641px',
        smn: '500px',
      },
      colors: {
        primary: '#9b59b6',
        secondary: '#5063BF',
      },
      animation: {
        blink: 'blink 2s steps(2, start) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};

{
  /* <div className="w-[33.3%] h-[120px] flex flex-col gap-2 items-start justify-center border-8 border-[#F9FAFB] rounded-[20px] p-4 bg-secondary"> */
}
