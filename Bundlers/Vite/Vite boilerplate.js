import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  root: './src',
  build: {
    outputDir: '../dist'
  },
  plugins: [
    vue(),
    vueDevTools()
  ]
  resolve: {
    alias: {
      '@': './src'
    },
  },
})
