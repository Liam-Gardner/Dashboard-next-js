import type { Config } from 'tailwindcss/types/config';

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        customDisabled: '#DAE2ED',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled', 'hover', 'disabled:hover'],
    },
  },
  plugins: [],
} satisfies Config;
