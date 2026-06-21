import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [tailwindcss()],
    server: {
      port: parseInt(env.VITE_PORT) || 5173,
      strictPort: true,
      allowedHosts: ["pry-agile-scouring.ngrok-free.dev"],
    }
  }
})
