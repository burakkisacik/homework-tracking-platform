module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        mainBackgroundColor: "#f3eee4",
        footer: "#f6e5bc",
        niceRed: "#bb1350",
        buttonColor: "#1c2334",
        buttonBorder: "#f486ae",
        lightYellow: "#eaca71",
        darkYellow: "#e5be54",
      },
    },
  },
  variants: {
    extend: {
      zIndex: ["hover"],
    },
  },
  plugins: [],
};
