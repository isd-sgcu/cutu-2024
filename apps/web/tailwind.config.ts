import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "cu-dark-pink" : "#EE457B",
        "cu-pink" : "#F1678D",
        "cu-light-pink" : "#FFBAE3",
        "tu-light-orange" : "#FFD69A",
        "tu-orange" : "#F68548",
        "tu-dark-orange" : "#EB4145",
        "cu-primary": "#EE457B",
        "cu-secondary": "#F1678C",
        "tu-primary": "#ED1C24",
        "tu-secondary": "#FBAF44",
        "tu-text" : "#EC473F",
        "display": "#D9D9D9",
      }
    },
  },
  plugins: [],
};
export default config;
