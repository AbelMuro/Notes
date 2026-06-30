<!-- 
        VUE.JS is a JS framework that is used to build User Interfaces (UI) and has many similarities to the React library
        VUE.JS uses Vite as the build tool to bundle the files of the app into one file ready for production

        Bookmarks
                1) Features
                2) Single-File Components (dynamic components, importing, exporting)
                3) Templates (In-DOM templates)
                4) State
                5) Props (validating props, child props)
                6) Directives (v-)
                7) Dynamic Attributes (v-bind)
                8) Conditional Rendering (v-if, v-else-if, v-else, v-show)
                9) List Rendering (v-for)
                10) Event Handlers (v-on)
                11) Forms (v-model, two way data binding)
                12) LifeCycle Hooks (onMount, onUpdate, onUnmount, etc...)
                13) Debugging Hooks (onRenderTracked, onRenderTriggered, etc...)
                14) Watchers (side-effects)
                15) Computed (caching values)
                16) Template Refs


                                                   RENDERING PROCESS
        1) Before a component is first mounted, the templates are compiled into render functions, which will then generate a branch
           in the virtual dom tree. 

        2) Once the component is mounted, the render function is called, creating the nodes in the virtual dom.

        3) When a state change occurs, the render function is called again, and a new virtual dom is created.
           At this point, there will be two virtual doms in memory, and each node from both trees are going to be compared.
           Once the comparison is complete, the real dom will be updated accordingly


                                                  

                                                    VIRTUAL DOM
        Vue uses the virtual DOM, just like React. The Virtual DOM is an exact copy of the real DOM, and its used to determine which nodes 
        in the real DOM have to be updated. When a component is first mounted, Vue will create a corresponding Virtual DOM node in the tree.

                                                ONE WAY DATA BINDING
        Vue supports one way data binding with props. Typically, the parent component can pass down its state to the child component as props.

                                                TWO WAY DATA BINDING
        Vue primarily uses two way data binding with the 'v-model' directive and the defineModel() function. A parent component can pass 
        down its state to the child component, and the child component can update the state directly with its own data. This is one way 
        of passing data from the child component to the parent component. Keep in mind that the state used between the parent and child are 
        synced. Any changes made to the state by the child component will reflect the state in the parent component, and vice versa
    
                                                     LIFECYCLE
        Every component has a lifecycle that outlines the step by step process that it takes from creation to destruction
        In Vue, the lifecycle is similar to the React lifecycle, having 4 main phases

                1) Creation Phase: the template is first compiled into a render function.
                   The render function will return a Virtual DOM tree branch that represents the component
        
                2) Mounting Phase: The render function is then called and this will mount the component onto the 
                   Virtual DOM, and then finally to the Real DOM
        
                3) Updating Phase: Vue will use the reactivity system to 'patch' or 'update' the component 
                   when the state changes.
        
                4) Destruction Phase: The component will be removed from the Virtual DOM, and then from the Real DOM
                   all event listeners, child components and state are destroyed.


                                                COMPONENT-BASED ARCHITECTURE
         Vue uses a component-based architecture that breaks down the UI into different re-usable components. Each part
         of the UI will be manipulated by a component


                                                      BATCHING
          Vue has a similar batching process to the automatic batching used in React. When there are multiple state updates
          that happen synchronously, Vue will 'batch' all these state updates into one asynchronous re-render. Keep in mind that
          state updates that occur inside promises and setTimeout() will also be batched together.


                                                NATIVE EVENT SYSTEM
           Vue uses the native event system in the browser, it doesn't have a synthetic event system like React
           RECAP: When an event is triggered in the DOM, JS will use Event Propagation.
           Lets say that we have a button nested inside a div, the button was clicked and triggered
           its on-click event. What happens next are the 3 main phases/steps of Event Propagation

                   1) Capturing Phase: JS will look for the button element that initially triggered the event.
                                       It starts at the top of the DOM tree (HTML) and works 
                                       its way down until it finds the button element. If there are any event listeners
                                       for the capturing phase in the parent elements, these elements will handle event
                                       before it reaches the button element
        
                                       div.addEventListener('click', () => {
                                           console.log('Div clicked during capturing phase');
                                        }, true);                             //third argument specifies that the event listener will be triggered on the capturing phase
        
                   2) Target Phase: Once JS finds the button element, it will trigger the on-click event handler
        
                   3) Bubbling Phase: The event will then 'bubble' up to the top of the DOM tree. Starting from the 
                                      button element, then finally to the html element. If any element (html, div) has an event listener for the 
                                      bubbling phase of the event, it will be triggered.    
        
                                      div.addEventListener('click', () => {
                                          console.log('Div clicked during bubbling phase');
                                        });











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
        




        STEPS TO IMPLEMENT TYPESCRIPT IN YOUR VUE APP

                1) npm install -D typescript vue-tsc @types/node
        
                2) create a tsconfig.json file in the root directory
        
                        {
                          "compilerOptions": {
                            "target": "ESNext",
                            "module": "ESNext",
                            "moduleResolution": "Node",
                            "strict": true,
                            "jsx": "preserve",
                            "types": ["vite/client"]
                          }
                        }
        
                3) In your single file components, you must use the following syntax to enable TS
        
                        <script setup lang="ts">
                            const x : number = 1
                        </script>






-->









































        


















        




<!-- =========================================== DIRECTIVES =================================================== --!>
<!-- 
        Directives are used with attributes in elements inside templates, they apply additional logic to the attribute.
        All directives start with a prefix v-

        Syntax for directives:
                v-on:click.prevent="JS expression"
                directive:attribute.modifier="JS expression"    

        Modifiers: They are denoted as directive postfixes with a dot. They apply even more logic to the attribute. 
        Keep in mind that modifiers can be chained together
                .prevent modifier will call the e.preventDefault()
                .passive modifier will call the event handler immediately instead of waiting for the event to finish

        Directly below are the most common directives in Vue
-->
















<!-- ============================================ DYNAMIC ATTRIBUTES (V-BIND) ========================================= -->
<!-- 
    You can use the v-bind attribute to dynamically set an attribute or value to an element
    shorthand :
-->

<script setup>
    import {ref, computed} from 'vue';

    const stateOne = ref('class-one');
    const stateTwo = ref('class-two');
    const dynamic = 'expression that resolves to a string'

    const computedClasses = computed({                                    //rememeber to use state objects here to create dependencies
        classOne: 'expression that resolves to a boolean value',
        classTwo: 'expression that resolves to a boolean value'
    })
    
</script>




<template>
    <div v-bind:class="{active: true, menu: false}">                    <!-- Dynamically assigning classes to this element-->    
    <div v-bind:[dynamic]="url"></div>                                  <!-- Dynamically assigning a single attribute to this element -->
    <div v-bind={{attributes}}></div>                                   <!-- Dynamically assigning multiple attributes to this element -->
    <div v-bind:class="computedClasses"></div>                          <!-- Dynamically assigning classes with a computed value-->
    <div v-bind="[stateOne, stateTwo]"></div>                           <!-- Dynamically assigning multiple classes to this element with state objects (must be strings) -->
</template>

















<!--  ============================================ CONDITIONAL RENDERING (V-IF, V-ELSE-IF, V-ELSE, V-SHOW) =========================================-->
<!--
    You can conditionally render your elements by using the v-if, v-else-if, and v-else directive

    v-if, v-else-if, v-else:     these directives will conditionally render your elements based on an expression that resolves to a boolean value
    v-show:                      this directive will conditionally toggle the display css property of the element, the element will remain in the DOM


    Facts to keep in mind:
        -v-if has higher toggle costs, while v-show has higher initial render costs
        -Choose v-show if you need to toggle something very often, and choose v-if if the condition is unlikely to change at runtime.
        -All of these directories accept an expression that resolves to a boolean value
-->

<script setup>
    import {ref} from 'vue';
    const display = ref('A');
</script>



<template v-if="true">                            <!-- You can conditionally render a whole template with the v-if directive-->
    
    <div v-if="display === 'A'"></div>
    <div v-else-if="display === 'B'"></div>
    <div v-else></div>

    <div v-show="true"></div>                     <!-- v-show will conditionally toggle the display css property of the element-->
    
</template>

<template v-else-if="false"></template>          <!-- You can conditionally render different templates like this as well-->
<template v-else="false"></template>

















<!--  ============================================ LIST RENDERING (V-FOR) ========================================= -->
<!-- 
    You can use the v-for directive to render a list of items in an array.
    Every item in a list will have its own 'key' attribute that is used to identify the 
    item in the list. Vue uses an in-place patching strategy to update the items in the list.
    When an item in the list was removed, Vue will efficiently remove 
    the item from the DOM, while leaving all the other items alone. If the order of the
    items was changed, Vue will update(patch) the items in the list to reflect the 
    new list order. This strategy is efficient for most cases, except if an item is a 
    child-component or an element that relies on some state

    Facts to keep in mind    (you will get the same result with 'for' and 'in')
        - if list is an array        v-for="(value, index) in list"           
        - if list is an object       v-for="(value, key, index) in list"
        - you can use v-for directive on templates as well
        - Do not use v-if and v-for on the same element
        - if you want to create a list of components, then use v-for in the component

    Reminder about For() loops
        - for (let value of fruits) will iterate over the values of an object or array
        - for (let key in fruits) will iterate over the property names or the indices 
-->

<script setup>
    import {ref} from 'vue';
    const list = ref(['A', 'B', 'C']);
    const people = ref([{name: 'carlos'}, {name: 'david'}, {name: 'stephanie'}])
</script>

<template>
    
    <div v-for="(item, index) in list" :key="item">          <!-- This will create 3 div elements (list.length === 3)-->
        {{item}} - {{index}}                                 <!-- the key prop is used by vue to identify the item in the list (list must be a state)-->
    </div>

    <div v-for="n in 15">                                    <!-- You can create a range of values to iterate through to create a list-->
        {{n}}
    </div>
    
    <MyComponent 
        v-for="(item, index) in list" 
        :key="item" 
        :prop="item"/>                                         <!-- You can create a list of components (all props to these components must be dynamic)-->

    <div v-for="item in list" :key="item.id">
      <span v-for="childItem in item.children" :key="childItem">   <!-- You can also nest v-for directives-->
        {{ childItem }}
      </span>
    </div>
    
</template>












        









<!--  =========================================== EVENT HANDLERS (V-ON)=============================================== -->
<!-- 
    You can use the v-on directive to bind event handlers to your elements
    Shorthand is @

    Modifiers to remember:

        v-on:click.once          this will trigger the event handler only once
        v-on:click.self          this will trigger the event handler if the event was created by THIS element
        v-on:click.capture       this will create an event listener when the element triggers the event for the first time
        v-on:scroll.passive      this will call the event handler immediately, instead of waiting for the scroll event to complete (best used for mobile devices)
        v-on:submit.prevent      e.preventDefault()
        v-on:click.stop          this will stop the bubbling phase of event propagation

-->

<script setup>
    import {ref} from 'vue';

    const count = ref(0);

    const handleClick = (e) => {                                // e is the Native DOM event
        e.target.tagName;                
        count++;
    }
</script>


<template>
    <button v-on:click="handleClick"></button>                     <!-- handleClick is a method handler -->
    <button v-on:click="handleClick($event)"></button>             <!-- handleClick() is an inline handler, using $event is another way of getting the event object-->
</template>




<!-- 
                                Component Event Handlers

        Parent Components can assign a custom event handler to a child component
        The child component will emit the event handler with the $emit() function.
-->

<!-- Parent Component -->
<script setup>
    import {ChildComponent} from './ChildComponent.vue';
    const handleSomething = () => {}
</script>

<template>
     <ChildComponent @customEvent="handleSomething"/>        <!-- you can use any name for your event handler-->
</template>



<!-- Child Component -->
<script setup>
    import {ref} from 'vue';
    const state = ref(1);
    const emit = defineEmits(['customEvent'])                        //build in function in vue 
    emit('customEvent')                                              //you can use emit() to programatically emit an event
</script>

<template>
    <button @click="$emit('customEvent')"> Click here </button>
</template>














        



<!--  ============================================ FORMS (V-MODEL) ========================================= -->
<!-- 
        You can use the v-model directive to synchronize the state in Vue with the input inside a form
        By using v-model, you dont need an on-change event handler to update the state, Vue will
        automatically update the state for you.

        Modifiers to remember..

                v-model.lazy       state will ONLY be updated when the user stops typing and loses focus of the input (text will still be displayed on screen)
                v-model.number     state will be typecast into a number, if the state can't be typecasted, then a string will be the result (this modifier is applied automatically if type='number' is used)
                v-model.trim       state will be updated to remove all whitespaces
-->



<!-- TEXT FIELDS -->

<script setup>
      import {ref} from 'vue';
      const text = ref('');
      const otherText = ref('');
</script>

<template>
    <form>
        <input type="text" v-model="text"/>                <!-- state will automatically be updated when the user types in the input-->         
    </form>
</template>





<!-- TEXT AREA (Do NOT use interpolation {{text}} inside the textarea tag -->

<script setup>
      import {ref} from 'vue';
      const message = ref('')
</script>

<template>
    <form>
         <textarea v-model="message">
        </textarea>
    </form>
</template>
                 




<!-- CHECKBOXES (value attribute can be dynamic as well (v-bind))-->

<script setup>
    import {ref} from 'vue';
    const checkedBoxes = ref([]);
</script>

<template>
     <form>
        <input type="checkbox" value="one" v-model="checkedBoxes"/>                  <!-- clicking this checkbox will automatically get the value attribute and put it in the state array-->
        <input type="checkbox" value="two" v-model="checkedBoxes"/>
        <input type="checkbox" value="three" v-model="checkedBoxes"/>
        <input type="checkbox" v-model="toggle" true-value="yes" false-value="no"/>  <!-- If toggle state is equal to "yes", then the checkbox will be checked,-->
     </form>                                                                         <!-- If toggle state is equal to "no", then the checkbox will NOT be checked -->
</template>                                                                          <!-- true-value and false-value enable you to set default values for the checked state and unchecked state-->
                                                                                     <!-- The state of the checkbox doesnt have to be a boolean value if you use these attributes -->




<!-- RADIO BUTTONS (value attribute can be dynamic as well (v-bind))-->

<script setup>
     import {ref} from "vue";
     const color = ref("red");
</script>

<template>
     <form>
        <input type="radio" value="red" v-model="color">
        <input type="radio" value="blue" v-model="color">
        <input type="radio" value="green" v-model="color">
     </form>
</template>



<!-- SELECT -->

<script setup>
     import {ref} from "vue";
     const selected = ref("");
</script>

<template>
     <form>
        <select v-model="selected">
             <option disabled value=""> Select a letter </option>                <!-- This can be used as a placeholder in a select tag-->
             <option value="A">A</option>
             <option value="B">B</option>
             <option value="C">C</option>
             <option :value="{message: 'hello world'}">D</option>                <!-- the value attribute can be assigned an object-->
        </select>
     </form>
</template>





<!-- COMPONENTS -->
<!--
        You can use v-model to implement a two-way data binding 
        relationship between the parent component and the child
        component. Just rememmber to use defineModel() in the 
        child component

        v-model in a component can also accept arguments, this
        can be usefull when you need to pass multiple states 
        to the child component. Each argument can have a modifier 
        as well
-->

        
<!-- Parent Component-->        
<script setup>
    import {ref} from 'vue';
    import {ChildComponent} from './ChildComponent.vue';

    const state = ref(1);
    const otherState = ref(3);
    const lastState = ref('hello world');
        
</script>

<template>
    <ChildComponent 
            v-model:first="state" 
            v-model:second="otherState"
            v-model:third.capitalize="lastState"/>         <!-- the modifiers will not do anything unless you implement their behavior on the second argument of defineModel()-->
</template>


<!-- Child Component -->
<script setup>
    const state = defineModel('first');
    const otherState = defineModel('second');
    const [lastState, lastStateModifier] = defineModel('third', {        //the second argument can be used to pass a setter method that
            set(value){                                                  //mutates the state before the child component receives it
                if(lastStateModifier.capitalize)
                    return value[0].toUpperCase() + value.slice(1);  
                else 
                    return value;
            }
    })

    const handleState = () => {                        // The child component can directly update the parent components' state
         state.value++;                                // This can also be used to pass data from the child to the parent
    }    
</script>

<template>
     <button @click="handleState">
             click here
     </button>
</template>
















        
<!-- =========================================== LIFECYCLE HOOKS =============================================== -->
<!-- 
        Lifecycle hooks are functions that are called at certain phases of the lifecycle of a component   
        Keep in mind that all of these hooks have to be called synchronously, and these hooks do not
        allow you to specify state dependencies like watchers do. This means that as long as the component 
        was re-rendered from a state change, the hooks will always be called.

        The hooks in a child component will always be called BEFORE the hooks in the parent components

        These hooks are NOT called during server-side rendering
-->





<!-- 
                                onBeforeMount()
        Lifecycle hook that gets called before the mounting phase of a component
-->

<script setup>
    import {onBeforeMount} from 'vue';

    onBeforeMount(() => {
         console.log('component hasnt been mounted yet');
    })
</script>


        
<!--
                                onMounted()
        Lifecycle hook that gets called after the mounting phase of a component has ended.
-->

<script setup> 
     import {onMounted} from 'vue';

     onMount(() => {
         console.log('component has been mounted')
     })
        
</script> 




<!-- 
                                onBeforeUpdated()
        Lifecycle hook that gets called before every re-render, but after
        the state update occurs.
-->


<script setup>
    import {onBeforeUpdated} from 'vue';

    onBeforeUpdated(() => {
         console.log('state change occurred but re-render hasnt happened yet')   
    })

</script>
        

<!-- 
                                onUpdated()
        Lifecycle hook that gets called after every re-render
-->

<script setup>
    import {onUpdated} from 'vue';

    onUpdated(() => {
         console.log('State change occurred and re-render already happened')   
    })

</script>



        

<!-- 
                        onBeforeUnmount()
        Lifecycle hook that gets called before the component is unmounted
-->


<script setup>
    import {onBeforeUnmount} from 'vue';

    onBeforeUnmount(() => {
         console.log('component is about to be unmounted')   
    })

</script>


        

<!-- 
                        onUnmounted()
        Lifecycle hook that gets called after the component is unmounted
-->

<script setup>
    import {onUnmounted} from 'vue';

    onUnmounted(() => {
         console.log('component has been unmounted')   
    })

</script>


<!-- 
                        onErrorCaptured()
        Lifecycle hook that gets called when an error is thrown from
        one of the child components. The error can be thrown from the 
        event handlers, at the top level, hooks, and other functions.
-->


<script setup>
    import {onErrorCaptured} from 'vue';

    onErrorCaptured((error, instance, info) => {
         console.log('error was thrown from the child components ', error)   
    })

</script>



<!-- 
                        onActivated()
        This hook will be called after a component that uses <KeepAlive/> has been mounted
        REMINDER, in conditional rendering and dynamic components, you
        can persist a component on the DOM with the <KeepAlive/> built in component
-->

<script setup>
    import {onActivated} from 'vue';

    onActivated(e) => {
         console.log('This component that uses <KeepAlive> has been mounted')
    })

</script>



        

<!-- 
                        onDeactivated()
        This hook will be called after a component that uses <KeepAlive/> has been unmounted
-->

<script setup>
    import {onDeactivated} from 'vue';

    onDeactivated(e) => {
         console.log('This component that uses <KeepAlive> has been unmounted')
    })

</script>




<!--         
                        onServerPrefetch() 
        This hook will be called before the component is mounted and 
        before the component is rendered on the server.
        This hook should only be used with Server side rendering
-->

<script setup>
    import {onServerPrefetch} from 'vue';

    onServerPrefetch(e) => {
         console.log('This component has yet to be mounted')
    })

</script>
        








        

<!-- =========================================== DEBUGGING HOOKS =============================================== -->
<!--
       Vue has debugging hooks that can help in debuggin components and their state.
       These hooks should only be used in development.
-->


<!-- 
                                 onRenderTracked() 
       This hook will be called when a state has been tracked by component thas was re-rendered.
       In other words, the component was re-rendered, and the result of this re-render caused
       the component to track a new state.
-->

<script setup>
    import {onRenderTracked} from 'vue';

    onRenderTracked((e) => {
         console.log('This component has tracked a new state due to a re-render ')
         e = {
          effect: ReactiveEffect
          target: object
          type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
          key: any
        }
    })

</script>


<!-- 
                               onRenderTriggered()     
        This hook will be called after the component was re-rendered
-->

<script setup>
    import {onRenderTracked} from 'vue';

    onRenderTracked((e) => {
         console.log('This component has been re-rendered ')
         e = {
          effect: ReactiveEffect
          target: object
          type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
          key: any
          newValue?: any
          oldValue?: any
          oldTarget?: Map<any, any> | Set<any>
        }
    })

</script>





        

<!-- =========================================== WATCHERS =============================================== -->
<!-- 
        You can use watchers in Vue to apply side-effects to a component before or after a state change occurs.
        If there are one thousand state updates, Vue will 'batch' all these state updates into one invocation of the watcher.
        Calling synchronous watchers will create an asynchronous task in the queue. The task will wait until the callstack
        is empty before being called. Watchers by default are bound to the component, if the component is unmounted,
        the watcher will be freed from memory as well. But this is only true if watcher is called synchronously
-->            


<!--    
                                        Watch()   
        
        You can use the watch() method in vue to keep track of a small number of state objects. You have to explicitly define 
        the state objects as dependencies. On a positive note, Watch() provides better control on when the function
        will be called, and which levels of nested properties will be tracked. By default, Watch() will NOT be called 
        after the mounting phase. 


                -First argument for watchers 

                        watch(state, callback);                             // Watcher will keep track of any reference changes made to the state
                        watch(() => state.value, callback)                  // Watcher will keep track of any changes made to the value property of the state

                -Third argument for watchers

                        watch(state, () => {}, {
                            deep: 2,                                         // Watcher will be called if the properties on the first and second nested level in state object are updated
                            immediate: true,                                 // Watcher will be called after the component has mounted
                            once: true,                                      // Watcher will be called only once
                            flush: 'post or sync'                            // If its post, then watcher will be called AFTER the re-render occurs
                        })                                                   // if its sync, then watcher will be called synchronously after EVERY state update  


                const unwatch = watch(state, callback);
                unwatch();                                                   //will free up the watcher from memory and stop the calls to the function    
-->

<script setup>
    import { ref, watch } from 'vue';

    const {data} = defineProps({
            data: String
    })
    const state = ref('');
    const handleClick = () => {
        state.value = 'new state'
    }

    watch(() => state.value, (newState, oldState) => {})                              // watcher will be called after a state change has occured
    watch(() => data, () => {})                                                       // watcher will be called after a prop change has occured
    watch([state, otherState], ([newState, newOtherState]) => {});                    // watcher that has multiple dependencies
</script>


<template>
    <button @click="handleClick">
        Click Here
    </button>
<template>




<!-- 
                                        watchEffect()    or         watchPostEffect()
       You can use WatchEffect() to keep track of a large number of state objects. You don't have to explicitly define 
       the state objects as dependencies. WatchEffect() has less control on when the function can be called, and which levels 
       of properties will be tracked. By default, watchEffect() will be called after the mounting phase.  

        Keep in mind, watchEffect() will only keep track of state objects that are ACCESSED within the callback. Any state object
        that is assigned a new value in the callback will not trigger a call to the watchEffect().
-->

<script setup>
    import {ref, watchEffect} from "vue";

    const state = ref("");
    const otherState = ref(2);

    const handleClick = () => {
            state.value = 'new state';
    }

    watchEffect(() => {
        console.log(state.value);                //watchEffect() will be called if value property changes, or if ANY of the nested property changes as well
        otherState.value = 23;                   //otherState.value will NOT be a dependency
    })

</script>

<template>
    <button @click="handleClick">Click</button>
</template>




<!-- 
                                        onWatcherCleanup()
        You can perform a clean up function inside a watcher to free up sources or to cancel certain fetch requests
        Keep in mind that onWatcherCleanup() must be called synchronously, it cannot be called after an await statement
-->

<script setup>
     import {ref, watch, onWatcherCleanup} from "vue";

     const state = ref('');

     watch(state, (newState) => {
         console.log(newState);
              
         fetch('someURL').then(() => {});                        //do NOT use await before calling onWatcherCleanup()
             
         onWatcherCleanup(() => {
                 //do some clean up here; free up resources, remove event listeners..
         })
     }) 
        
</script>










        

                 
<!-- =========================================== COMPUTED() =============================================== -->
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
          return count.value > 34 ? 'yes' : 'no';           //count is now a dependency of computedRef
    })

    // 2) you can use computed() to get and set a state object
    const fullName = computed({                  
          get(previous) {                            //you can also get the previous state in the getter method
            return firstName.value + ' ' + lastName.value
          }
          set(newValue) {
            firstName.value = newValue.split(' ')[0];
            secondName.value = newValue.split(' ')[1];
          }
    })
    fullName = 'Carlos barrang';        //will trigger the setter method
    console.log(fullName);              //will trigger the getter method


    // 3) you can get the previous state with callbacks
    const previousState = computed((previous) => {   
          if(count.value < 3)
             return count.value;
          return previous
    })

    //4) you can use a computed value and assign it to a directive
    const dynamicClasses = computed({
        classOne: firstName.value === 'my name',
        classTwo: lastName.value === 'my other name'
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












        

<!-- =========================================== TEMPLATE REFS =============================================== -->
<!-- 
        Vue uses ref objects to maintain a reference to an element in the real DOM. Ref objects
        will bypass the Virtual DOM and access the real DOM directly. Keep in mind that to access
        ref objects, they must first be binded to an element that exists in the real DOM. In other words,
        please wait until the component has been mounted before using the ref object.

        Template refs can be used inside watchers as well, but you will need a conditional statement
        to check if the ref object has a truthy or falsy value.

        You can use template refs to reference components as well, this is one way for a parent component
        to access the variables and methods of a child component
-->


<!-- Parent Component -->
<script setup>
    import {useTemplateRef, onMount} from 'vue';
    import ChildComponent from './ChildComponent';

    const myRef = useTemplateRef('any-name goes here');//You can use any name to define a ref object
    const inputRef = useTemplateRef('text-input');     //You can use ref objects to reference an element
    const childRef = useTemplateRef('child');          //You can use ref objects to reference components
    const listRef = useTemplateRef('list')             //You can use ref objects to reference lists created with v-for

    onMount(() => {
        inputRef.value.focus();                 
        childRef.value.method;                   // the parent component will have access to the variables and methods from the child component
        listRef.value[2];                        
    })
</script> 

<template>
    <input ref="text-input">
    <ChildComponent ref="child"/>                <!-- you can use ref objects with components, this ref will reference the instance of the component-->
    <ul v-for="n in 10" ref="list"></ul>
    <div :ref="(ref) => {/* assign the reference to some property*/}">
</template>




<!-- Child Component -->
<script setup>
     const x = 4;
     const method = () => {}

     defineExpose({                                // <script setup> by default makes all variables and methods private
         x, method                                 // but using defineExpose() will make certain variables public and usable 
     })                                            // defineExpose() is a built in function that must be called synchronously
</script>





        











