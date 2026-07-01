/* 

    STEPS TO INITIALIZE VUE
        
              1) npm init -y
        
                        (make sure your package.json file looks like this...)
        
                               "type": "module",
                               "scripts": {
                                    "start": "vite --open",
                                    "build": "vite build"
                                  },   
        
              2) npm install vue
                 npm install vite -D
                 npm install vite-plugin-vue-devtools -D
                 npm install @vitejs/plugin-vue -D
        
              3) create a vite.config.js file 
        
                    import { fileURLToPath, URL } from 'node:url'         // these functions will handle file paths in a cross-platform enviroment
                    import { defineConfig } from 'vite'                   // self explanatory
                    import vue from '@vitejs/plugin-vue'                  // vue plugin that enables Vue support for Vite
                    import vueDevTools from 'vite-plugin-vue-devtools'    // plugin that enables DevTools in your project to help you debug
                    
                    export default defineConfig({
                      root: './src',                                      // declaring the root directory, vite will look for the index.html file inside the src folder
                      plugins: [
                        vue(),
                        vueDevTools(),
                      ],
                      resolve: {
                        alias: {                                                     //this is similar to the babel-root-plugin-import that defines long directories with a flag
                          '@': fileURLToPath(new URL('./src', import.meta.url))      //we are creating an alias for import statements, instead of using ./src, you can use @/
                        },
                      },
                    })
        
              4) create a ./src folder and add the index.html file
        
                    <html lang="en">
                      <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>Vite App</title>
                      </head>
                      <body>
                          <div id="root"></div>
                          <script type="module" src="/index.js"></script>            //this is the most important part, make sure your script tag imports the index.js file correctly
                      </body>
                  </html>
        
              5) Create an index.js file
        
                  import { createApp } from 'vue'
                  import App from './App.vue'
                  
                  createApp(App).mount('#root')                                      //make sure that you reference the div element in your html file correctly
        
              6) Create an App.vue file
        
                    <template>
                        <div> 
                            Hello world
                        </div>
                    </template>
        
                7) If you want to add .env variables to your project, create a .env file and declare your env variables like this..
        
                        VITE_API_KEY=w3yodgbaodb22
        
                   Then, in your components, use the following syntax to utilize the env variable
        
                        import.meta.env.VITE_API_KEY
        
                   KEEP IN MIND, the .env file has to be declared in the root directory. Check your vite.config.js file for the actual root
                   directory. I usually use the ./src folder as the root directory.
*/
