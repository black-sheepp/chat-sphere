/** @type {import('tailwindcss').Config} */
module.exports = {
     content: [
          "./pages/**/*.{js,ts,jsx,tsx,mdx}",
          "./components/**/*.{js,ts,jsx,tsx,mdx}",
          "./app/**/*.{js,ts,jsx,tsx,mdx}",
     ],
     theme: {
          extend: {
               colors: {
                    c0: "#101010",
                    c1: "#131313",
                    c2: "#202329",
                    c3: "#8B8D93",
                    c4: "#6b8afd",
                    c5: "#2E343D",
               },
               backgroundImage: {
                    "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                    "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
               },
          },
     },
     plugins: [],
};
