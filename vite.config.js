import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    //VITE PWA PLUGIN
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Je cours pour ma forme',
        short_name: 'Jcpmf',
        description: "Application pour le suivi d'entrainement de course à pied",
        theme_color: '#002e4a',
        background_color: '#88ba16',
        display: 'standalone',
        start_url: '/',
        icons: [
          //48x48 96x96 192x192
          {
            src: 'icons/logo-48-48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: 'icons/logo-96-96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'icons/logo-192-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
