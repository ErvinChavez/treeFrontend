module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#191913",     // Rangoon Green
          light: "#bbbbad",    // Eagle
          wood: {
            primary: "#77422f",   // Old Copper
            secondary: "#9d6345", // Cape Palliser
          }
        }
      }
    },
  },
  plugins: [],
};