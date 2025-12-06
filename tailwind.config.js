// tailwind.config.js
export default {
   darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        logo: ["Pacifico", "cursive"],  // Stylish script font
        sans: ["Poppins", "sans-serif"], // Clean modern font
      },
      colors: {
        // 🌞 Light mode palette
        background: "#f9fafb",  // soft white-gray background
        surface: "#ffffff",     // card/section background
        primary: "#1e3a8a",     // navy blue (main accent)
        secondary: "#0ea5e9",   // teal/sky blue (hover, highlights)
        text: "#111827",        // dark text
        subtle: "#6b7280",      // muted text

        // 🌙 Dark mode palette (used automatically when .dark is applied)
        darkbg: "#0f172a",      // deep navy background
        darksurface: "#1e293b", // slightly lighter navy (for cards)
        darktext: "#f1f5f9",    // almost white text
        darksubtle: "#94a3b8",  // grayish text for secondary info

        // ✨ Accent tones (optional for buttons, details, or hover)
        gold: "#d4af37",        // soft golden accent (matches your earlier brand)
        goldDark: "#b8860b",    // deeper gold for hover states
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: [],
};
