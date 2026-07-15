/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0A",
        panel: {
          DEFAULT: "#111814",
          light: "#161B18",
        },
        mil: {
          border: "#2D3A31",
          text: "#D5E8D4",
          sub: "#AAB9AA",
          green: "#73C76B",
          olive: "#556B2F",
          danger: "#C73E3E",
          warning: "#D2AF3A",
          info: "#5EA9FF",
          success: "#6FCF97",
        },
        // shadcn compatibility (mapped to military palette)
        background: "#0A0A0A",
        foreground: "#D5E8D4",
        card: {
          DEFAULT: "#111814",
          foreground: "#D5E8D4",
        },
        popover: {
          DEFAULT: "#111814",
          foreground: "#D5E8D4",
        },
        primary: {
          DEFAULT: "#73C76B",
          foreground: "#0A0A0A",
        },
        secondary: {
          DEFAULT: "#161B18",
          foreground: "#D5E8D4",
        },
        muted: {
          DEFAULT: "#161B18",
          foreground: "#AAB9AA",
        },
        accent: {
          DEFAULT: "#161B18",
          foreground: "#D5E8D4",
        },
        destructive: {
          DEFAULT: "#C73E3E",
          foreground: "#D5E8D4",
        },
        border: "#2D3A31",
        input: "#2D3A31",
        ring: "#73C76B",
      },
      borderRadius: {
        lg: "6px",
        md: "6px",
        sm: "4px",
      },
      fontFamily: {
        header: ["Rajdhani", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      keyframes: {
        "led-blink": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "1" },
        },
        "radar-sweep": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "grid-scroll": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "40px 40px" },
        },
        "cursor-blink": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        "coord-slide": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        "led-blink": "led-blink 1.6s ease-in-out infinite",
        "radar-sweep": "radar-sweep 4s linear infinite",
        "grid-scroll": "grid-scroll 8s linear infinite",
        "cursor-blink": "cursor-blink 1s step-end infinite",
        "coord-slide": "coord-slide 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
