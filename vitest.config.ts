import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

export default defineConfig({
  // Cast plugin to any to avoid Vite type mismatches between Vitest's bundled Vite and the root Vite types.
  plugins: [react() as any],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./tests/setup-tests.ts"],
    include: ["tests/**/*.{test,spec}.{ts,tsx}"],
    reporters: process.env.CI ? ["dot"] : ["default"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});