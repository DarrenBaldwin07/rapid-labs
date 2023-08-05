import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build: {
      outDir: './dist'
    },
    server: {
      host: '0.0.0.0',
      port: 3001,
      // proxy: {
      //     // with options
      //     '/api': {
      //         target: 'http://localhost:8080',
      //         changeOrigin: true,
      //         secure: false,
      //         rewrite: (path) => path.replace(/^\/api/, ""), // we need to pull off "api" because the backend server does not have an api resource (we could change this in the future)
      //     },
      // }
    }
  }
})
