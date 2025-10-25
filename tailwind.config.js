/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@codearemo/livemenu-ui/dist/**/*.{js,jsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        livemenu: {
          light: {
            DEFAULT: '#fef2e5',
            hover: '#feedbd',
            active: '#fcddb8'
          },
          DEFAULT: '#ff7c30',
          hover: '#dd7000',
          active: '#e46300',
          dark: {
            DEFAULT: '#b85d00',
            hover: '#934a00',
            active: '#6e3800'
          },
          darker: '#562b00'
        },
        primary: {
          50: '#fef2e5',
          100: '#feedbd',
          200: '#fcddb8',
          300: '#ffc894',
          400: '#ffa05d',
          500: '#ff7c30',
          600: '#e46300',
          700: '#b85d00',
          800: '#934a00',
          900: '#6e3800',
          950: '#562b00'
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d'
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        dark: {
          bg: {
            primary: '#1a1a1a',
            secondary: '#2d2d2d',
            tertiary: '#3d3d3d'
          },
          text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
            tertiary: '#808080'
          },
          border: '#404040'
        }
      }
    }
  },
  safelist: [
    {
      pattern: /^(bg|text|border|ring|from|to|via)-(livemenu|primary|secondary|success|danger|warning|info)/,
      variants: ['hover', 'focus', 'active', 'dark']
    },
    {
      pattern: /^(bg|text|border|ring)-(livemenu|primary|secondary|success|danger|warning|info)-(50|100|200|300|400|500|600|700|800|900|950)/,
      variants: ['hover', 'focus', 'active', 'dark']
    }
  ],
  plugins: []
}

