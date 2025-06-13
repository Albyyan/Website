import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // anything starting with /api will be forwarded...
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,           // if you ever use HTTPS on Flask
        rewrite: (path) => path  // keeps /api/classify as-is
      },
    },
  },
})
