import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // ✅ this is what you want for Vercel
  server: {
    port: 5174,
    open: true,
  },
});
