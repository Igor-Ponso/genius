import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      stylus: {
        imports: [path.resolve(__dirname, "./src/assets/stylus/*.styl")],
      },
    },
  },
  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 8000,
    open: false,
    cors: true,
  },
});
