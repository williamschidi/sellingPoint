import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  esbuild: {
    jsx: "automatic",
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-router")) return "router";
            if (id.includes("react-dom") || id.includes("/react/")) return "react-vendor";
            if (id.includes("@headlessui")) return "headlessui";
            if (id.includes("react-day-picker") || id.includes("date-fns")) {
              return "calendar";
            }
          }
        },
      },
    },
  },
  test: {
    globals: true,
    include: ["src/**/*.test.{js,jsx}"],
    setupFiles: ["src/test/setup.js"],
    environment: "jsdom",
  },
});
