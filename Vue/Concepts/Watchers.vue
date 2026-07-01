
        

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



