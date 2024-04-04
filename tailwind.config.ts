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
        "code": "#454545",
        "table": "#808080",
      },
    },
  },
  daisyui: {
    themes: [
      {
        theme: {

          "primary": "#4f46e5",

          "secondary": "#5e63ff",

          "accent": "#514d4b",

          "neutral": "#353332",

          "base-100": "#292524",

          "info": "#009cff",

          "success": "#4ade80",

          "warning": "#fbbf24",

          "error": "#ef4444",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
