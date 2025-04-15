<!-- 
    VUE.JS is a JS framework that is used to build User Interfaces (UI) and has many similarities to the React library
    VUE.JS uses Vite as the build tool to build the app into files ready for production



    Steps to initialize Vue.js

      1) npm init -y

      2) npm install vue
         npm install vite
         npm install vite-plugin-vue-devtools
         npm install @vitejs/plugin-vue

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
                  <div id="app"></div>
                  <script type="module" src="/index.js"></script>            //this is the most important part, make sure your script tag imports the index.js file correctly
              </body>
          </html>

      5) Create an index.js file

          import { createApp } from 'vue'
          import App from './App.vue'
          
          createApp(App).mount('#app')                                      //make sure that you reference the div element in your html file correctly

      6) Create an App.vue file

            <template>
                <div> 
                    Hello world
                </div>
            </template>
-->


<!-- ============================================ VUE SYNTAX ======================================================= -->

<!-- script tag allows you to import different modules from different files, you can also define the props -->
<script>
  import HelloWorld from './components/HelloWorld.vue'     //assume that this component has the props 'msg'
  defineProps({        
    random: {
      type: String,
      required: true,
    },
    attributes: {                  
      type: Object,
      required: false
    }
  })
</script>



<!-- template tag allows you to use HTML syntax to declare and define your DOM elements (template tag will automatically be exported from this file)-->
<template>
    <HelloWorld msg="You did it!" />                                      <!-- You can pass props to a component like this --> 
    <p class="myClass"> {{random === '' ? 'n' : 'v'}} </p>                <!-- {{}} allows you to use any JS expression in Vue-->

      <!-- Directives-->
    <div v-bind:class="'expression/variable goes here'"></div>          <!-- Attributes declared with v-bind: will make the attribute into a dynamic attribute, shorthand : -->
    <div v-bind:[random === "" ? "id" : "class"]="url"></div>           <!-- You can dynamically assign a single attribute with the v-bind keyword -->
    <div v-bind={{attributes}}></div>                                   <!-- You can dynamically assign multiple attributes with the v-bind keyword -->
    <div v-if="'truthy or falsy expression/variable'"></div>            <!-- You can apply conditional rendering in Vue with the v-if directory-->
    <button v-on:click="handleClick()"> Click here </button>            <!-- You can bind event handlers with the v-on directory, shorthand @ -->
</template>



<!-- style tag allows you to use (remember to use scoped attribute to make sure the styles are scoped locally to a file)-->
<style scoped>            
  header {
    line-height: 1.5;
  }

  .myClass {
    color: red;
  }

  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: calc(var(--section-gap) / 2);
    }
  }
</style>


