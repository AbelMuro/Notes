/* 
    The vite-plugin-vue-devtools plugin allows you to use DevTools to help you debug your vue application. 
    In the browser, press (F12) and then navigate to the Vue tab to inspect components, state and routes.

    npm install vite-plugin-vue-devtools
*/

import {defineConfig} from 'vue';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  plugins: [
      vueDevTools(),
  ]
})
