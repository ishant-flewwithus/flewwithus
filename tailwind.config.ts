import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#CCCDE9",
          100: "#BEBFE2",
          200: "#A1A3D6",
          300: "#8588CA",
          400: "#696CBD",
          500: "#4D51B0",
          600: "#3C3F89",
          700: "#2B2D62",
          800: "#1A1B3B",
          900: "#090914",
          950: "#000000",
        },
        onprimary: "#FFFFFF",
        textheading: "#222222", // Main eg title
        textbody: "#979797", // Secondary eg desc,
        background: "#EEF2F8",
        disabled: "#ACB8C9",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
export default config;
