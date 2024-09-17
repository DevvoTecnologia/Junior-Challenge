import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Pode ser necessário em algumas configurações do sistema de arquivos, como WSL ou Docker.
    },
    hmr: {
      overlay: true, // Mostra os erros diretamente no browser, útil para ver feedback imediato.
    },
  },
})
