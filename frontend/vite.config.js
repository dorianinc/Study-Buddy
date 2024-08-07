import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open:true,
    port: 3000,  // Optional: Change this to your preferred port
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // Express server URL
        changeOrigin: true,
      },
    },
  },
})
