/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Live-site palette (Wix theme colors)
        charcoal: '#414141',
        tan: '#dea27a',
        wixcream: '#f7efe9',
        brown: '#80695a',
        darkbrown: '#40352d',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Didot', 'Bodoni MT', 'Georgia', 'serif'],
        body: ['var(--font-barlow)', 'Helvetica', 'Arial', 'sans-serif'],
        nav: ['var(--font-aboreto)', 'Georgia', 'serif'],
        script: ['var(--font-pinyon)', 'cursive'],
      },
    },
  },
  plugins: [],
};
