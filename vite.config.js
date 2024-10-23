import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Configurando a porta a partir de uma variável de ambiente, com fallback para 3000
    port: 3000, // Certifique-se que a variável de ambiente está prefixada com VITE_
  },
})
