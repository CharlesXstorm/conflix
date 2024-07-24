/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sass from "vite-plugin-sass";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    sass({
      sassOptions: {
        indentedSyntax: true
      }
    })
  ],
  server: {
    proxy: {
      "/proxy": {
        target: `${process.env.VITE_PROXY_URL}`,
        changeOrigin: true,
        // secure: false,
        rewrite: (path) => path.replace(/^\/proxy/, "")
      }
    }
  }
});
