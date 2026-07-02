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
      actions: {                                                    // setter methods
            increment(){
                  this.count++;
            },
            decrement(){
                  this.count--;
            }
      },
      getters: {                                                     // getter methods 
            getCount: (state) => state.count,                        // (these methods can return a callback that can accept an argument, YOU MUST USE THE VALUE PROP WITHIN SCRIPT SETUP)
            getUser: (state) => {return (userId) => state.users.find((user) => user.id === user.id)},
            getStateFromOtherStore: (state) => {                     //you can access properties of the state from a different store within the getter method
                  const otherStore = useOtherStore();      
                  return otherStore.data;            
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







