/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        navy: "#374375",
        cloud: "#FFFCF5",
        peri: "#BABDE2",
        maroon: "#895159",
        peach: "#DFAEA1",
        slate: "#4D5C60",
        keylime: "#EEF4CE",
        },
        fontFamily: {
          DEFAULT: ["Poppins", "sans-serif"],
          playfair: ["Playfair Display", "serif"],
        },
    },
  },
  plugins: [],
}

