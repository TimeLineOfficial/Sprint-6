/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1e40af',
          blueHover: '#1d4ed8',
          lightBlue: '#eff6ff',
          orange: '#f97316',
          orangeHover: '#ea580c',
          amber: '#d97706',
          green: '#059669',
          bg: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
          dark: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
