/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Colores principales de GuiaTrend
        primary: {
          DEFAULT: '#FF004F',
          light: '#FF3366',
          dark: '#CC0040',
          50: '#FFF0F4',
          100: '#FFE0E8',
          200: '#FFC1D1',
          300: '#FF91A8',
          400: '#FF5177',
          500: '#FF004F',
          600: '#E6004A',
          700: '#CC0040',
          800: '#B30038',
          900: '#99002F',
        },
        // Colores de fondo
        background: {
          light: '#FAF9F6',
          dark: 'rgba(10, 15, 20, 0.95)',
        },
        // Glassmorphism
        glass: {
          light: 'rgba(250, 249, 246, 0.7)',
          dark: 'rgba(10, 15, 20, 0.7)',
          border: {
            light: 'rgba(255, 255, 255, 0.2)',
            dark: 'rgba(255, 255, 255, 0.1)',
          }
        },
        // Colores adicionales
        accent: {
          orange: '#FF6B35',
          blue: '#4A90E2',
          green: '#7ED321',
          purple: '#9013FE',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'glass': '16px',
        'card': '12px',
        'button': '8px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
        'glass-hover': '0 12px 40px rgba(31, 38, 135, 0.5)',
        'primary': '0 4px 15px rgba(255, 0, 79, 0.3)',
        'primary-hover': '0 8px 25px rgba(255, 0, 79, 0.4)',
        'glow': '0 0 20px rgba(255, 0, 79, 0.3)',
        'glow-strong': '0 0 30px rgba(255, 0, 79, 0.6)',
        'neon': '0 0 10px theme(colors.primary.DEFAULT), 0 0 20px theme(colors.primary.DEFAULT), 0 0 30px theme(colors.primary.DEFAULT)',
        'neon-green': '0 0 10px #3DFFAB, 0 0 20px #3DFFAB, 0 0 30px #3DFFAB',
      },
      backdropBlur: {
        'glass': '20px',
        'glass-light': '15px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-in': 'slide-in 0.6s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 0, 79, 0.3)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 0, 79, 0.6)' },
        },
        'slide-in': {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { 
            opacity: '0',
            transform: 'scale(0.9)',
          },
          to: { 
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
};