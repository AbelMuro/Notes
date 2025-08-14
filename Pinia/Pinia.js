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






                                    FEATURES OF PINIA


                                          GLOBAL STORE

                        Just like redux, pinia also has a global store that serves as a centralized entity that contains the state
                        of the application. 



                                             STATE
                        Pinia centralizes the state of the application within the global store.                  
        
*/







//========================================== GLOBAL STORE =====================================================
/* 
      You can create a global store in Pinia by using the defineStore() function. The first argument defines the name 
      for the store, and the second argument defines the initial state and the actions for the store.

      To use the store, you must call the defineStore() function in a Stores.js file and export the returned function
      to the single file component that will use it.

      In Pinia, there are two types of stores; The options stores and the setup stores
*/

//------------------------- Option Store

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





//------------------------- Setup Store

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



//------------------------- Using the store
/* 
      There are two different ways of accessing the properties and actions of the store
      You can use storeToRefs() or you can simply destructure the state within the single 
      file component

      -storeToRefs() will keep the reactivity of the state, causing a re-render of
      the single file component

      -Destructuring the state will lose the reactivity of the state, this will NOT
      cause a re-render

*/


<script>
      import useCounterStore from '~/Store';
      import {storeToRefs} from 'pinia';

      const store = useCounterStore();                                //the returned object will have all the properties and actions of the state

      const {count} = storeToRefs(store);                             //accessing the properties of the state while maintaining reactivity
      const {count} = store;                                          //accessing the properties of the state, but breaking reactivity
      count++;                                                        //you can update the property of the state directly, regardless if you keep reactivity
      
      
      const {increment} = store;                                      //all actions/functions should be destructured

</script>


