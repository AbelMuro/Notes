/* 

        Vite is a bundler that puts together all the files in a project into a single file, bundle.js. This file
        is then served to the browser by a server when a client requests to visit a webpage or web app.


                                                  BUNDLING PROCESS
        
          1) File Analysys 
                The bundler will look for the entry point of the application (index.vue) and will analyze all 
                imports and dependencies used in the application. The bundler will also check for syntax errors 
        
          2) Dependency Graph:
                Then the bundler starts a dependency graph by linking all the modules and
                assets together. 
        
          3) Transpilation: 
                  3.1)  Vue Templates:
                        Once the dependency graph is completed, the bundler will transpile the templates into
                        javascript render functions. T
  
                  3.2) Script Tags:
                       Bundler will use esbuild to transpile any Javascript code in the script tags (Typescript, ES6+ syntax)
  
                  3.3) Style Tags
                       The Style tags are checked to see if they need further transpilation (if using a pre-processor like SASS)
                       The developer will need to install the necessary pre-processor compilers (PostCSS, node-sass, etc...)
        
          4) Optimization: 
                 The bundler will then implement tree-shaking, which is a process of removing any unused code
                 in the application. All whitespaces will be removed and variable names will be shortened to 
                 optimize the size of the file.
  
          5) Bundling: 
                  Once the steps above have been completed, the bundle will bundle all the files into one 
                  file, bundle.js. If the developer implemented lazy-loading, the bundler will split the bundle.js
                  into multiple files, each file will be loaded on the browser when necessary
*/



//----------------------------- Initializing Vite
/* 
    You can initialize vite by importing the defineConfig and invoking. 
    The object it returns must be exported as default. This must be within 
    the config file for vite

    ./vite.config.js
*/

//npm install vite --save-dev


import { defineConfig } from 'vite'

export default defineConfig({})







//----------------------------- root
/* 
    You can use the root property in the defineConfig() function
    to define the root directory of your project. This property will 
    default to the directory that you use to run the command 'npm start'
*/


import { defineConfig } from 'vite'

export default defineConfig({
  root: '/'
})




//----------------------------- base
/* 
    You can use the base property in the defineConfig() function
    to give a prefix to all URLS resolved in the project. This includes all 
    css files, images, js files, and text files as well. The base value will
    be relative to the directory of the vite config file
*/


import { defineConfig } from 'vite'

export default defineConfig({
  base: './myApp/'                      // if i import an image from '/icons/my-icon.png', the url will be resolved to '/myApp/icons/my-icon.png'
})















import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})



