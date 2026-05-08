import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      // In local dev, run `vercel dev` on port 3001 to handle /api/* functions.
      // This proxy forwards /api requests there so the frontend at :3000 can reach them.
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
