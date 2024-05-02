import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000/",
        changeOrigin: true
        // secure: false,
        // rewrite: (path) => path.replace(/^\/api\/v1\/conflix/, '')
      }
    }
    // Proxying API requests to the backend server running on localhost:5000
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:5000",
    //     secure: false,
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api\//, '')
    //   }
    // }
  }
});
