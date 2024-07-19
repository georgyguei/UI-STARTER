import type { Config } from "tailwindcss";

const config: Config = {
  mode: "jit",
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {},
  plugins: [],
};
export default config;
