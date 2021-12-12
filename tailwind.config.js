module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Nunito', 'Arial', 'sans-serif'],
      display: ['Quincy', 'serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
