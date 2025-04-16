<!-- 
    VUE.JS is a JS framework that is used to build User Interfaces (UI) and has many similarities to the React library
    VUE.JS uses Vite as the build tool to build the app into files ready for production




    REACTIVITY SYSTEM:
        -Deep Reactivity: all nested objects and arrays will be tracked within the state object
        -Shallow Reactivity: Only a certain level of nested objects and arrays will be tracked within the state object

        Every component in Vue.js will keep track of ALL of its state objects (ref)
        When the state is updated, the component will be re-rendered.
        
        Vue uses objects as state, because Vue can intercept the get and set operations of an object 
        with the setter and getter methods

            const myRef = {
              _value: 0,                   // the state value

              get value() {
                track()                    // when a value has been accessed by a component, we start the tracking process
                return this._value
              },

              set value(newValue) {
                this._value = newValue     // When the state changes, we cause a re-render
                triggerRe-Render()
              }
            }


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


<!-- ============================================ SINGLE FILE COMPONENTS ======================================================= -->
<!-- 
    Single file components are files that contain one component (basically one template)
    The template tag will automatically be exported from the file
-->

<!-- script tag allows you to write JS code -->
<script>
    const x = 2 + "3";
    const str = "random";
    const myFunc = () => {
        return "Hello-World"
    }

    export default {                                                    //you can use the export default keyword and the setup function to use variables and functions within your template
        setup(){
            const otherFunc = () => console.log('Other function');
            return {
                x,
                str,
                myFunc,
                otherFunc,
            }
        }
    }
</script>



<!-- template tag allows you to use HTML syntax to declare and define your DOM elements (template tag will automatically be exported from this file)-->
<template>
    <p class='myClass'> Hello World </p>                                      <!-- You can pass props to a component like this --> 
    <button v-on:click="otherFunc()"> Click Here </button>                    <!-- Any variable or function exported using setup() will be available in the template-->
</template>



<!-- style tag allows you to use css (remember to use scoped attribute to make sure the styles are scoped locally to a file)-->
<style scoped>            
  .myClass {
    color: red;
  }
</style>








<!--==================================================== TEMPLATES ======================================================== -->
<!--
    You can use the template tag to use html syntax to declare your elements within your single-file component
-->

<template>
    <HelloWorld msg="You did it!" />                                      <!-- You can pass props to a component like this --> 
    <p class="myClass"> {{random === '' ? 'n' : 'v'}} </p>                <!-- {{}} allows you to use any JS expression in Vue-->

      <!-- Directives (anything inside the "" and [] must be an expression or variable that resolves to a string)-->
    <div v-bind:class="dynamicValue"></div>                             <!-- Attributes declared with v-bind: will make the attribute into a dynamic attribute, shorthand : -->
    <div v-bind:[dynamicAttribute]="url"></div>                         <!-- You can dynamically assign a single attribute with the v-bind keyword -->
    <div v-bind={{attributes}}></div>                                   <!-- You can dynamically assign multiple attributes with the v-bind keyword -->
    <div v-if="display"></div>                                          <!-- You can apply conditional rendering in Vue with the v-if directory (display must resolve to a truthy or falsey value)-->
    <button v-on:click="handleClick()"> Click here </button>            <!-- You can bind event handlers with the v-on directory, shorthand @ -->
    <form v-on:submit.prevent="handleSubmit()"></form>                  <!-- You can use modifiers to call certain functions for an event, prevent will call the e.preventDefault() for the submit event-->
</template>









<!-- ===================================================== STATE ============================================================ -->
<!-- 
    You can create a state object within your single-file component with the ref() function
    You can also create a state object with the reactive() function

        const countRef = ref(0);
        const countReactive = reactive({count: 1, people: 23}); 

    The difference is that the component will keep track of ALL the properties in countReactive, 
    and the component will keep track of the 'value' property in countRef

    Facts to keep in mind
        -Do not pass down state as props directly
        -All updates to the state are synchronous, but updates to the DOM are asynchronous
         When you update multiple state objects, Vue will wait until all states have been updated,
         then Vue will update the DOM by causing a re-render
         If you want to change the state, update the dom, then change the state again synchronously, use the nextTick() function

                async function incremenentThenDecrement() {
                    count.value++;                     
                    await nextTick();     //you can force a re-render here to update the DOM, instead of waiting for all states to be updated first
                    count.value--;
                }
        

-->

<!-- All state objects and functions will be exported from the script when you use the setup attribute -->
<script setup>                             
    import {ref, reactive, nextTick} from 'vue';
    
    const count = ref(0);                  //Declaring state object with initial value of 0 
    const state = reactive({ count: 0 })   //Declaring state object with initial value of {count: 0}
    
    function increment() {               
        count.value++;                     //Every state object will have a value property, this is where the actual state is
    }

    function decrement() {
        count.value--;                           
    }
    
    console.log(count);             //{value: 0}
    count.value++;                  //All updates to the state are synchronous
    console.log(count);             //{value: 1}
</script>


<template>
    <div> {{count}} </div>    <!-- You dont have to use the .value property of the state-->
    <button v-on:click="increment()"> increase </button>
</template>














