/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Live-site palette (Wix theme colors)
        charcoal: '#414141',
        // Accent for hovers and the active menu item. Was live's peach #dea27a;
        // now a muted antique gold at Arabella's request (Oct 2026).
        tan: '#9a8158',
        wixcream: '#f7efe9',
        brown: '#80695a',
        darkbrown: '#40352d',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Didot', 'Bodoni MT', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Helvetica', 'Arial', 'sans-serif'],
        // Accent words: Monsieur La Doulaise calligraphy.
        script: ['var(--font-script)', 'cursive'],
      },
    },
  },
  plugins: [],
};
