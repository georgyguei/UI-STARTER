import type { Config } from 'tailwindcss';
import customTheme from './src/lib/theme';

const config: Config = {
  mode: 'jit',
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
    extend: {
      ...customTheme,
      animation: {
        border: 'borderFlash 1s',
      },
      keyframes: {
        borderFlash: {
          '0%': {
            borderColor: 'transparent',
          },
          '50%': {
            borderColor: 'red',
          },
          '100%': {
            borderColor: 'transparent',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
