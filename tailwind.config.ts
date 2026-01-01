import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        // Scans your app folder
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",      // Scans pages (if any)
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Scans components
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
