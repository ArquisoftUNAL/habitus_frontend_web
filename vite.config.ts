import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { default as dotenv } from 'dotenv'

dotenv.config();

const BASE_PATH = process.env.ASSET_URL || '';

// https://vitejs.dev/config/
export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },

    host: true,
    strictPort: true,
    port: 5000,

  }
})
