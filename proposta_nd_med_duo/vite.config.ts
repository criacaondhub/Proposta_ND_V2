import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  // Publicada em https://⚠️DOMINIO/proposta (mesmo padrão de deploy do nginx.conf e do docker-compose.yml).
  // Se a proposta for morar na raiz de um subdomínio, troque por '/'.
  base: '/proposta/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
