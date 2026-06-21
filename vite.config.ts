import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    base: "/",
    build: {
      outDir: "dist",
    },
    server: {
      port: parseInt(env.VITE_PORT) || 5173,
      strictPort: true,
      allowedHosts: ["pry-agile-scouring.ngrok-free.dev"],
    }
  }
})
