import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/** Override with VITE_BASE_PATH in CI; default matches prohorweb/archex on GitHub Pages */
export default defineConfig(({ mode }) => ({
  base:
    process.env.VITE_BASE_PATH ||
    (mode === "production" ? "/archex/" : "/"),
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
    sourcemap: false,
  },
}));
