import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".")[1];
          if (extType == "css") {
            return `[name][extname]`;
          }
          return `Resources/[name][extname]`;
        },
      },
    },
  },
});
