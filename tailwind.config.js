/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#8A38F5',
        'navbar': '#373A3B',
        'hero-section': '#DDE5E8' // assumed corrected bluish tone (confirmable)
      },
      fontFamily: {
        'space-grotesk': ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto']
      }
    }
  },
  plugins: [],
}
