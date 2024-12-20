import type { Config } from "tailwindcss";

const config: Config = {
 darkMode: ["class"],
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
    primary: "var(--color-primary)",
    secondary: "var(--color-secondary)",
    accent: "var(--color-accent)",
    "secondary-accent": "var(--color-secondary-accent)",
    muted: "var(--color-muted)",
    "secondary-muted": "var(--color-secondary-muted)",
    "bg-nav": "var(--color-bg-nav)",
    "bg-content": "var(--color-bg-content)",
    text: "var(--color-text)"
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
    },
    "slide-in-bottom": {
     "0%": {
      transform: "translateY(100%)",
      opacity: "0"
     },
     "100%": {
      transform: "translateY(0)",
      opacity: "1"
     }
    }
   },
   animation: {
    "slide-in-bottom": "slide-in-bottom 0.5s ease-out forwards"
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
    }
   });
  },
  function ({ addUtilities }: { addUtilities: any }) {
   addUtilities({
    ".text-fade": {
     color: "transparent",
     "background-image": "linear-gradient(to bottom left, #eb07ff, #7038ff)",
     "background-clip": "text"
    },
    ".bg-fade": {
     "background-image": "linear-gradient(to bottom left, #eb07ff, #7038ff)"
    }
   });
  }
 ]
};

export default config;
