/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Poppins', 'system-ui', 'sans-serif'] },
      colors: {
        primary: '#4566EC',
        'primary-light': '#5677FF',
        navy: '#253C98',
        track: '#DADAFF',
        ink: '#090E23',
        muted: '#717171',
        faint: '#C0C0C0',
        line: '#D4D6DC',
        surface: '#FDFDFF',
        'done-bg': '#EFF2FF',
        'done-icon': '#99ADFF',
        'pending-bg': '#FFE6E7',
        'pending-icon': '#FFB1B5',
        danger: '#E04B54',
      },
    },
  },
  plugins: [],
};
