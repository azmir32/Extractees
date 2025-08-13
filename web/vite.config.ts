import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./@', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 5174,
    strictPort: true,
    open: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5174,
    },
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  preview: {
    host: true,
    port: 5174,
    strictPort: true,
    open: true,
  },
})
