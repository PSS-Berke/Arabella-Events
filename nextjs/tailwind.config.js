/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#fdfbf7',
        creamdeep: '#f6f1ea',
        espresso: '#3b2a21',
        cocoa: '#4a382e',
        taupe: '#6b5142',
        brass: '#a98c74',
        script: '#6b4b3a',
        rule: '#e6dcd1',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-jost)', 'Helvetica', 'sans-serif'],
        script: ['var(--font-pinyon)', 'cursive'],
      },
    },
  },
  plugins: [],
};
