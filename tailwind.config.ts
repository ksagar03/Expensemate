import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
          dark: "#1b1b1b",
          light: "#f5f5f5",
          primary: "#B63E96", // 240,86,199
          primaryDark: "#58E6D9", // 80,230,217}
          yellowgreen: "#9acd32",
      },
    },
    screens: {
      "3xl": { max: "2580px" },
      // it will add a media query of max width
      "2xl": { max: "1920px" },
      // => @media (max-width: 1535px)

      xl: { max: "1279px" },
      // => @media (max-width: 1279px)

      lg: { max: "1023px" },
      // => @media (max-width: 1023px)

      md: { max: "767px" },
      // => @media (max-width: 767px)

      sm: { max: "639px" },
      // => @media (max-width: 639px)

      xs: { max: "479px" },
      // => @media (max-width: 479px)
    },
  },
  plugins: [],
};
export default config;
