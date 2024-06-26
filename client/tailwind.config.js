/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dark-blue': 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)',
      },
      fontFamily: {
        'font1': ['Jacquard 24', 'system-ui']
      }
    },
  },
  plugins: [],
}