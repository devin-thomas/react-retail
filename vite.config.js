import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/react-retail/" : "/",
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["src/test/setup.js"],
  },
}));
