/* 
    The @vitejs/plugin-vue is an essential pluging that enables Vite to use Single file components in Vue

    npm install @vitejs/plugin-vue
*/

import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [
    vue(),
  ],
})
