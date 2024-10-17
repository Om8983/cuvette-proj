/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        "mygrad" : 'linear-gradient(90deg, hsla(73, 100%, 82%, 1) 0%, hsla(156, 68%, 88%, 1) 50%, hsla(195, 96%, 80%, 1) 100%)'
      }
    },
  },
  plugins: [],
}

