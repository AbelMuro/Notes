<!-- 
    VUE.JS is a JS framework that is used to build User Interfaces (UI) and has many similarities to the React library
    VUE.JS uses Vite as the build tool to build the app into files ready for production




    REACTIVITY SYSTEM:
        -Deep Reactivity: all nested objects and arrays will be tracked within the state object
        -Shallow Reactivity: Only the first level of nested objects and arrays will be tracked within the state object (typically the value property)

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
<script setup>
    const x = 2 + "3";
    const str = "random";
    const myFunc = () => {
        return "Hello-World"
    }
</script>



<!-- template tag allows you to use HTML syntax to declare and define your DOM elements (template tag will automatically be exported from this file)-->
<template>
    <p class="myClass"> Hello World </p>                                     
    <button v-on:click="otherFunc"> Click Here </button>                    <!-- Any variable or function exported using setup() will be available in the template-->
</template>



<!-- style tag allows you to use css (remember to use scoped attribute to make sure the styles are scoped locally to a file)-->
<style scoped>            
  .myClass {
    color: red;
  }

    @media(max-width: 550px){
        .myClass{
            color: blue;
        }
    }
</style>














<!--==================================================== TEMPLATES ======================================================== -->
<!--
    You can use the template tag to use html syntax to declare your elements within your single-file component
    Templates typically use directives to dynamically alter the elements in some way
    Keep in mind that most directives accept an expression or variable that resolves to a string
-->

<script setup>
    const dynamic = "expression that resolves to a string";
</script>

<template>
    <HelloWorld msg="You did it!" />                                      <!-- You can pass props to a component like this --> 
    <p class="myClass"> {{random === '' ? 'n' : 'v'}} </p>                <!-- {{}} allows you to use any JS expression in Vue-->

      <!-- Directives-->
    <div v-bind:class="dynamic"></div>                                  <!-- Dynamically assigning a class to this element, shorthand : -->
    <div class="container" v-bind:class="dynamic">                      <!-- A directive can co-exist with the plain attribute as well-->
</template>
















<!-- ===================================================== STATE ============================================================ -->
<!-- 
    You can create a state object within your single-file component with the ref() and reactive() function

    Using the ref() and reactive() functions will have deep reactivity by default

        const countRef = ref(0);                                    //will keep track of the 'value' property only (and all its nested objects)
        const countReactive = reactive({count: 1, people: 23});     //will keep track of ALL the properties (and all its nested objects)


    Using the shallowRef() and shallowReactive() will have shallow reactivity by default

        const countRef = shallowRef();                             //will keep track of the 'value' property only (but NOT its nested objects)
        const countReactive = shallowReactive({count: [{n: '2'},2,3]}) //will keep track of ALL the properties (but NOT its nested objects)



    Facts to keep in mind
        -When you create a state object in Vue, the state object will automatically be unwrapped
         meaning that you don't have to use the value property of the state object.
         Unwrapping only occurs if the ref() or reactive() functions are at the top level of your script

                const state = ref(10);
                console.log(state);            //you dont need the 'value' property here

                const otherState = reactive({name: 'carlos', age: 23});
                otherState.name;               //you dont need the 'value' property here

        -When you have a state object that contains an array of other state objects,
         those state objects will not be unwrapped automatically

                const stateOne = ref(2)
                const stateArray = ref(['1', 34, stateOne]);
                stateArray[2].value;            //you need to use the 'value' property

                
        -Do not pass down state as props directly
        -You can mutate the property values of a state directly
        -You can assign a state object as a propetyy to another state object, 
         any changes made to the state object will affect the parent state object

                const stateOne = ref(1);
                const stateTwo = reactive({            //changes made to stateTwo will also reflect on stateOne
                    stateOne
                });

                stateTwo.stateOne = 10;
                console.log(stateOne.value);           //will log 10
            
        -Do not destructure your state object, doing so will disconnect the destructured variable from the state

                const state = ref(0);
                const { count } = state;
                count++;                           //this will not trigger a re-render
            
        -When you pass the state object to a function, make sure to pass the whole object to retain reactivity
         if you pass an individual property to a function, you are only passing a copy of that value

                const count = ref(0);
                someFunction(count);               //changes made to count will cause a re-render
                otherFunction(count.value);        //changes made to count.value will NOT cause a re-render
                

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














<!-- ============================================== PROPS ==================================================== -->
<!-- 
    You can pass data to a component using props
    Keep in mind that props are immutable, meaning that you can't 
    change the value of props once a component received it
-->

<script setup>
    import SomeComponent from './SomeComponent.vue';     //assume this component has a prop called message
    const { foo } = defineProps(['foo']);                //you can define props using an array 
    const {title, likes} = defineProps({                 //you can also define props using an object
      title: String,
      likes: Number,
      name: {                                           //prop validation, you can make a certain prop a requirement for a component
        type: String,
        required: true
      },
      group: {
        validator(value, props) {
          return ['success', 'warning', 'danger'].includes(value) // The value must match one of these strings
        }
  },
    })
</script>


<template>
    <div>
        Props passed to this component is {{title}}
    </div>
    <SomeComponent :message="'expression/variable goes here'"/>       <!-- props can also be dynamic by using the v-bind directive -->
</template>













<!-- =========================================== COMPUTED() ===============================================
<!-- 
    You can use the Computed function from Vue to simplify a JS expression within your template

    Keep in mind that computed() will be called automatically when one of its dependencies changes.
    Even though a re-render will call all functions in the component, it will not call computed() unless 
    the state object being used inside computed() causes the re-render.

    Facts to keep in mind.
        
        -computed() is similar to the useMemo() hook in react
        -You should only use state objects in computed()
        -You can use the return value of computed() with any directive

-->

<script setup>
    import {ref, computed} from 'vue';

    const count = ref(0);
    const firstName = ref('John')
    const lastName = ref('Doe');
    
    // 1) computed() will only be called when the count state is updated
    const computedRef = computed(() => {       
          return count > 34 ? 'yes' : 'no';           //count is now a dependency of computedRef
    })

    // 2) you can use computed() to get and set a state object
    const fullName = computed({                  
          get(previous) {                            //you can also get the previous state in the getter method
            return firstName + ' ' + lastName
          }
          set(newValue) {
            [firstName, lastName] = newValue.split(' ')
          }
    })
    fullName = 'Carlos barrang';        //will trigger the setter method
    console.log(fullName);              //will trigger the getter method


    // 3) you can get the previous state with callbacks
    const previousState = computed((previous) => {   
          if(count < 3)
             return count;
          return previous
    })

    //4) you can use a computed value and assign it to a directive
    const dynamicClasses = computed({
        classOne: firstName === 'my name',
        classTwo: lastName === 'my other name'
    })

</script>


<template>
    <div> 
        {{computedRef}}
    </div>
    <button :class="dynamicClasses">        <!-- you can also use the computed value in a directive-->
        Click here
    </button>
</template>










<!-- =========================================== CONDITIONAL RENDERING ===============================================-->
<!--
    You can conditionally render your elements by using the v-if directive
-->

<script setup>
    import {ref} from 'vue';

    const display = ref(false);
    
</script>


<template>
    <div v-if="display">     <!-- this element will be displayed if display is a truthy value-->
        Hello World
    </div>
</template>








        

        


<!-- ============================================ DYNAMIC ATTRIBUTES AND VALUES ========================================= -->
<script setup>
    import {ref, computed} from 'vue';

    const stateOne = ref('class-one');
    const stateTwo = ref('class-two');
    const dynamic = 'expression that resolves to a string'

    const computedValue = computed({                                    //rememeber to use state objects here to create dependencies
        classOne: 'expression that resolves to a boolean value',
        classTwo: 'expression that resolves to a boolean value'
    })
    
</script>

        

<template>
    <div v-bind:class="{active: true, menu: false}">                    <!-- Dynamically assigning classes to this element-->    
    <div v-bind:[dynamic]="url"></div>                                  <!-- Dynamically assigning a single attribute to this element -->
    <div v-bind={{attributes}}></div>                                   <!-- Dynamically assigning multiple attributes to this element -->
    <div v-bind:class="computedValue"></div>                            <!-- Dynamically assigning classes with a computed value-->
    <div v-bind="[stateOne, stateTwo]"></div>                           <!-- Dynamically assigning multiple classes to this element with state objects (must be strings) -->
</template>














        
<!--  =========================================== EVENT HANDLERS =============================================== -->
<!-- 
    You can use the v-on directive to bind event handlers to your elements
    Shorthand is @
-->

<script setup>
    import {ref} from 'vue';

    const count = ref(0);

    const handleClick = () => {
        count++;
    }

    const handleSubmit = () => {
        
    }
    
</script>


<template>
    <button v-on:click="handleClick">                     <!-- clicking on this button will invoke the handleClick() function -->
        Click Here
    </button>
    <form v-on:submit.prevent="handleSubmit()"></form>    <!-- You can use modifiers to call certain functions for an event, prevent will call the e.preventDefault() for the submit event-->
</template>












