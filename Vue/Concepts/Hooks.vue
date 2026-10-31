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







  

<!--  =========================================== COMPUTED() =============================================== -->
<!--
    Functions within the <script/> tag are only created once, every re-render will not re-create the function.
    Once the function forms a closure with a state or other value, it will NOT keep track of any updates to the state

    To solve this problem, Vue uses computed() to re-create a function when a state is updated
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
