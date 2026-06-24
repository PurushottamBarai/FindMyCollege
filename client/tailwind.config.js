/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        brand: {
          light: '#EEF2FF',
          DEFAULT: '#173c7f',
          dark: '#002171',
          accent: '#000080',
          navy: '#000080',
          purple: '#8B5CF6',
          purpleHover: '#6366F1',
        }
      }
    },
  },
  plugins: [],
}
