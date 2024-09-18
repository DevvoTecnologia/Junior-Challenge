import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Color styles */
        "neutral-950": "hsla(20, 14.3%, 4.1%, 1)",
        "neutral-900": "hsla(24, 9.8%, 10%, 1)",
        "neutral-800": "hsla(12, 6.5%, 15.1%, 1)",
        "neutral-700": "hsla(30, 6.2%, 25.1%, 1)",
        "neutral-600": "hsla(33, 5.5%, 32.4%, 1)",
        "neutral-300": "hsla(24, 5.7%, 82.9%, 1)",
        "neutral-200": "hsla(20, 5.9%, 90%, 1)",
        "neutral-100": "hsla(60, 4.8%, 95.9%, 1)",
        "neutral-50": "hsla(60, 9.1%, 97.8%, 1)",
        "warning-800": "hsla(0, 70%, 35.3%, 1)",
        "warning-200": "hsla(0, 96.3%, 89.4%, 1)",
        "warning-50": "hsla(0, 85.7%, 97.3%, 1)",
        "secondary-800": "hsla(273, 67.2%, 39.4%, 1)",
        "secondary-600": "hsla(263, 70%, 50.4%, 1)",
        "secondary-500": "hsla(262, 83.3%, 57.8%, 1)",
        "secondary-100": "hsla(251, 91.3%, 95.5%, 1)",
        "primary-400": "hsla(47, 94.2%, 73.1%, 1)",
        "primary-700": "hsla(32, 94.6%, 43.7%, 1)",
        "success-800": "hsla(86, 69%, 22.7%, 1)",
        "success-300": "hsla(82, 84.5%, 67.1%, 1)",
        "success-50": "hsla(78, 92%, 95.1%, 1)",
      },
      keyframes: {
        "fade-in-scale": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "fade-in-translate-up": {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in-translate-right": {
          "0%": { transform: "translateX(8px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in-scale": "fade-in-scale 0.250s ease-in-out",
        "fade-in-translate-up": "fade-in-translate-up 0.250s ease-in-out",
        "fade-in-translate-right": "fade-in-translate-right 0.250s ease-in-out",
      },
    },
  },
  plugins: [],
};
export default config;
