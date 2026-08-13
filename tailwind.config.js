/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F6F3',
        ink: '#12233D',
        'ink-soft': '#3C4E63',
        appraisal: {
          50: '#EAF3EF',
          100: '#CFE3DA',
          400: '#3E8A72',
          500: '#2F6F5E',
          600: '#255A4C',
          700: '#1C4539',
        },
        brass: {
          400: '#D3A15C',
          500: '#B8873D',
          600: '#96692C',
        },
        line: '#DBDFD8',
        'line-strong': '#C3C9BE',
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(18, 35, 61, 0.04), 0 8px 24px -8px rgba(18, 35, 61, 0.10)',
        stamp: '0 2px 4px rgba(18, 35, 61, 0.06), 0 16px 40px -12px rgba(47, 111, 94, 0.25)',
      },
      backgroundImage: {
        ledger:
          'repeating-linear-gradient(to bottom, transparent, transparent 39px, rgba(18,35,61,0.05) 40px)',
      },
      keyframes: {
        'stamp-in': {
          '0%': { opacity: '0', transform: 'scale(0.9) rotate(-3deg)' },
          '60%': { opacity: '1', transform: 'scale(1.03) rotate(-1deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(-1deg)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'stamp-in': 'stamp-in 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-up': 'fade-up 0.4s ease-out',
      },
    },
  },
  plugins: [],
}
