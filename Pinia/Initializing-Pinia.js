/*
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

*/
