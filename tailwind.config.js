/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        // => @media (min-width: 320px) { ... }
      },
      backgroundImage: {},
      colors: {
        overlay: "rgba(72, 72, 72, 0.5)",
        placeholder: "#8D8B8B",
        lightGreen: "#D3E5E5",
        unfocused: "#A8CCCC",
        semiWhite: "#E6EAEE",
        inputBorder: "rgba(124, 148, 107, 0.25)",
        headerDivider: "#D4D4D4",
        otpBorder: "rgba(0, 128, 128, 0.5)",
        "why-choose-us": "#F6F6F6",

        academia: {
          neutral: "#827717",
          dark: "#245305",
          primary: {
            80: "#9E9D24",
            90: "#827717",
          },
          error: {
            10: "#6A0101",
            20: "#FC3131",
            30: "#FEDCDC",
            40: "#FFEBEB",
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
