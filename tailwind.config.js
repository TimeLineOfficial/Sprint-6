/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0d14',
          card: '#121824',
          cardHover: '#182030',
          border: '#1e293b',
          cyan: '#00f0ff',
          neon: '#7000ff',
          pink: '#ff007f',
          gold: '#ffb703',
          green: '#00ff88'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite alternate',
        'float': 'float 3s ease-in-out infinite'
      },
      keyframes: {
        pulseGlow: {
          '0%': { boxShadow: '0 0 15px rgba(0, 240, 255, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 240, 255, 0.6)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      }
    },
  },
  plugins: [],
}
