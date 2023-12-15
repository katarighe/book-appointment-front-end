import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Specify the output directory for the build
    assetsDir: 'assets', // Specify the assets directory
  },
  server: {
    open: true, // Open the default browser when Vite starts
  },
});
