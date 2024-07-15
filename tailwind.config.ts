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
    primary: "#7038ff"
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
   }
  }
 },
 plugins: [require("@tailwindcss/typography")]
};
export default config;
