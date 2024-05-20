/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ff2f01',
        'primary-hover': '#ff2f01/90',
      },
      fontFamily: {
        custom: ['var(--font-noto_sans_kr)'],
        'noto-kr': 'var(--font-noto_sans_kr)',
      },
    },
  },
  plugins: [],
};
