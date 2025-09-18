import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#0B0B0D', // dark surface used site-wide (match hero)
        accent: {
          pink: '#FF4B8A', // tweak to your current pink
        },
      },
      boxShadow: {
        'soft-glow': '0 0 24px rgba(255, 75, 138, 0.25)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
