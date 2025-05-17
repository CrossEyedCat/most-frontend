// vite.config.js
import { fileURLToPath, URL } from 'node:url'
import { defineConfig }     from 'vite'
import vue                  from '@vitejs/plugin-vue'
import vueDevTools          from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue': 'vue/dist/vue.esm-bundler.js'
    },
  },
  server: {
    port: 8085,

    proxy: {
      '/api': {
        target: 'https://most-pol.ru/',
        changeOrigin: true,
        secure: false,     // if your cert is self-signed
      },
      '/stream': {
        target: 'https://most-pol.ru/',
        changeOrigin: true,
        secure: false,
      },
      '/websocket': {
        target: 'wss://most-pol.ru/',
        ws: true,
        changeOrigin: true,
        secure: false,
      },
      '/auth': {
        target: 'https://most-pol.ru/',
        changeOrigin: true,
        secure: false,
      },
      '/egisz': {
        target: 'https://most-pol.ru/',
        changeOrigin: true,
        secure: false,
      },
    }
  }
})