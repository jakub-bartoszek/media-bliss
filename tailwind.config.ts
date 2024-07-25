import type { Config } from "tailwindcss";

const config: Config = {
 content: [
  "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./components/**/*.{js,ts,jsx,tsx,mdx}",
  "./app/**/*.{js,ts,jsx,tsx,mdx}"
 ],
 theme: {
  extend: {
   backgroundImage: {
    "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
    "gradient-conic":
     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
   },
   colors: {
    primary: "#7038ff",
    "primary-light": "#8e38ff"
   },
   keyframes: {
    "logo-appear": {
     "0%": {
      opacity: "0",
      transform: "translateY(1rem);"
     },
     "100%": {
      opacity: "1",
      transform: "translateY(0);"
     }
    },
    "button-appear": {
     "0%": {
      opacity: "0",
      transform: "translateY(-2rem);"
     },
     "40%": {
      opacity: "0",
      transform: "translateY(-2rem);"
     },
     "100%": {
      opacity: "1",
      transform: "translateY(0);"
     }
    }
   },
   height: {
    screen: "100dvh"
   }
  }
 },
 plugins: [
  require("@tailwindcss/typography"),
  function ({ addComponents }: { addComponents: any }) {
   addComponents({
    ".prose": {
     color: "currentColor",
     "& h1, & h2, & h3, & h4, & h5, & h6": {
      color: "currentColor"
     },
     "& a": {
      color: "currentColor"
     }
     // Add more styling rules as needed
    }
   });
  }
 ]
};

export default config;
