import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { replace } from 'react-router-dom'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000,
    proxy: {
      '/jobApi': {
        target: "http://localhost:8000/jobs",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/jobApi/, "")
      }
    }
  }
})
