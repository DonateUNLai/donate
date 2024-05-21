import type { Config } from "tailwindcss";
import { nextui } from '@nextui-org/react';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ["Poppins"]
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui({
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: {
            DEFAULT: 'rgba(94, 219, 208, 1)'
          }
        }
      }
    }
  })],
};
export default config;
