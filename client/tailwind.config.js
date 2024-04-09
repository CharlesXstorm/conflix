/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      oleo: ["Oleo Script"],
      lobster: ["Lobster"],
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      netflix: ["bebas_neueregular"]
    },
    
    // colors: {
    //   transparent: "transparent",
    //   current: "currentColor",
    //   cherryred: "#e50914",
    //   purple: "#3f3cbb",
    //   midnight: "#121063",
    //   metal: "#565584",
    //   tahiti: "#3ab7bf",
    //   silver: "#ecebff",
    //   "bubble-gum": "#ff77e9",
    //   bermuda: "#78dcca"
    // },
    extend: {
      transitionProperty: {
        'height': 'height',
        // 'spacing': 'margin, padding',
      }
    }
  },
  plugins: []
};
