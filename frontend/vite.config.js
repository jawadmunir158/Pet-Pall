import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Pets/', // Correct the base path if your app is inside a subfolder
  server: {
    port: 5174,
    open: true, // Automatically open browser on start
  },
});
