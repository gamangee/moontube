/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        red: '#ff0000',
        black: '#0f0f0f',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
