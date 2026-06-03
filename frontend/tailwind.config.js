/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   "#915EFF",
        secondary: "#00FFFF",
        dark:      "#050816",
        "dark-100": "#0d1224",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter:   ["Inter", "sans-serif"],
      },
      animation: {
        "spin-slow":   "spin 8s linear infinite",
        "bounce-slow": "bounce 2s infinite",
        "pulse-glow":  "pulseGlow 2s ease-in-out infinite",
        "shimmer":     "shimmer 2s linear infinite",
        "float":       "float 3s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 8px #915EFF, 0 0 20px #915EFF40" },
          "50%":      { boxShadow: "0 0 20px #915EFF, 0 0 40px #915EFF80" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
}
