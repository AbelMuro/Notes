/* 
      Pinia is a state management library that is primarily used for newer Vue apps. Legacy Vue apps still use Vuex.


            HOW TO INITIALIZE PINIA IN YOUR APP

                  1) npm install pinia

                  2) In your index.js file, use the following code..
            
                        import { createApp } from 'vue'
                        import {createPinia} from 'pinia';
                        import App from './App.vue'
                        
                        const pinia = createPinia();
                        const app = createApp(App);
                        
                        app.use(pinia);
                        app.mount('#root');  


                  3) Create a /Store folder and a file Store.js with the following code

                        import {defineStore} from 'pinia';
                        import {ref} from 'vue';
                        
                        const useCounterStore = defineStore('counter', {
                            state: () => ({count: 0}),
                            actions: {
                                increment(){
                                    this.count++;
                                }
                            }
                        })
                        
                        export default useCounterStore;


                  4) You can now import the store in your single file components

                        <script setup>
                              import useCounterStore from '~/Store';
                              import {storeToRefs} from 'pinia';
                        
                              const store = useCounterStore();                                
                        
                              const {count} = storeToRefs(store);                             // reactive
                              const {count} = store;                                          // non-reactive
                              count++;                                                        // you can update the property of the state directly, regardless if you keep reactivity
                              
                              const {increment} = store;                                      //all actions/functions should be destructured
                        
                        </script>


                                                            FEATURES OF PINIA


                                                                STORE
            The store in Pinia is a centralized object that represents the single source of truth. The entire state object of the application
            is stored here.

                                                              GLOBAL STATE
            The global state is the applications entire state object, it is stored within the Store and updated and tracked by Vue's reactivity system. 
        
*/





















//========================================== GLOBAL STORE =====================================================
/* 
      You can create a global store in Pinia by using the defineStore() function. The first argument defines the name 
      for the store, and the second argument defines the initial state and the actions for the store.

      To use the store, you must call the defineStore() function in a Stores.js file and export the returned function
      to the single file component that will use it.

      In Pinia, there are two types of stores; The options stores and the setup stores
*/

//------------------------- Options API Store

// Store.js
import {defineStore} from 'pinia'

const useCounterStore = defineStore('counter', {
      state: () => ({count: 0}),                                    // initial state    
      actions: {                                                    // actions
            increment(){
                  this.count++;
            },
            decrement(){
                  this.count--;
            }
      }
})

export default useCounterStore;





//------------------------- Compositions API Store

// Store.js
import {defineStore} from 'pinia'

const useCounterStore = defineStore('counter', () => {
        const count = ref(0)
        function increment() {
          count.value++
        }
      
        return { count, increment }
})

export default useCounterStore;



//------------------------- Accessing the store
/* 
      There are two different ways of accessing the properties and actions of the store
      You can use storeToRefs() or you can simply destructure the state within the single 
      file component

      -storeToRefs() will keep the reactivity of the state, causing a re-render of
      the single file component

      -Destructuring the state will lose the reactivity of the state, this will NOT
      cause a re-render of the single file component

            -USEFULL STORE METHODS

                  const store = useCounterStore();
                  
                  store.$state = {count: 24};            // $state() will replace the entire state      
                  store.$reset();                        // $reset() will reset all properties of the state to their initial value (this only works for options API stores)
                  
                  store.$patch({                         // $patch() can be used to update multipe properties of the state     
                        count: 2,
                        age: 120,
                        name: 'Carlos',
                  });    
                  store.$patch((state) => {              // $patch() can also accept a function for more complex logic
                        state.count++;
                        state.age = 1244;
                        state.name = 'David';
                  })

                  store.$subscribe((mutation, state) => {  // $subscribe() is similar to watch() but it will only trigger once after $patch() is called with a callback
                        mutation.type;                     // 'direct' | 'patch object' | 'patch function'
                        mutation.storeId;                  // 'counter'
                        mutation.payload;                  // patch object passed to .$patch()
                  }, {detached: true})                     // the second argument accepts the same property objects as the third argument of the watch method
                                                                  //detached: true will 'detach' the subscribe method from the component, so event after the component
                                                                    has been unmounted, the subscribe method will continue to persist
      
*/

// Composition API only
<script setup>
      import useCounterStore from '~/Store';
      import {storeToRefs} from 'pinia';

      const store = useCounterStore();                                //the returned object will have all the properties and actions of the state

      const {count} = storeToRefs(store);                             //accessing the properties of the state while maintaining reactivity
      const {count} = store;                                          //accessing the properties of the state, but breaking reactivity
      count++;                                                        //you can update the property of the state directly, regardless if you keep reactivity
      
      
      const {increment} = store;                                      //all actions/functions should be destructured

</script>




// Options API only
<script>
      import { mapState, mapActions, mapWritableState } from 'pinia'
      import { useCounterStore } from '../stores/counter'
      
      export default {
              computed: {
                ...mapState(useCounterStore, ['count']),                  // the component can access the count property of the global state
                ...mapWritableState(useCounterStore, ['count']),          // the component can access AND mutate the count property of the global state 
              },
              methods: {
                ...mapActions(useCounterStore, ['increment']),            // the component can access the increment action of the global state
              }
      }     
</script>











