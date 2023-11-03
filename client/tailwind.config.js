/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
      colors: {
        bluePallet: {
          light: '#97D9E8',
          DEFAULT: '#009ABC',
          dark: '#206DA5',
          darker: '#004f88',
          variant: '#2fb2d0',
        }
      },
      fontFamily: {
        'eagle-lake': ['"Eagle Lake"', 'sans'],
      },
    },
  },
  plugins: [],
}

