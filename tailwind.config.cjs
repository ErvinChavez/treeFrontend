module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0f1a01",     // Rangoon Green
          light: "#afaa9a",    // Eagle
          wood: {
            primary: "#77552f",   // Old Copper
            secondary: "#694a30", // Cape Palliser
          },
          accent: "#C74900"
        }
      }
    },
  },
  plugins: [],
};