/* 
     STEPS TO INTEGRATE REDUX INTO YOUR REACT APPLICATION 
         
                  0)  npm install redux                        //install the core files for redux
                      npm install react-redux                  //installs the library that react uses to work with redux
                      npm install @reduxjs/toolkit             //installs other useful functions/methods for state management
                      
                  1) create a folder called './store' with the file store.js
          
                  2) store.js will have the following boilerplate code
                
                              import {configureStore} from '@reduxjs/toolkit';
                              import Reducer from './Reducers';
                  
                              const store = configureStore({                      //this will create the store with a reducer
                                  reducer: Reducer,
                                  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})                      //you may need to use this if you are storing unserializable data in the store
                              })
                  
                              export default store;
                      
                   3) then create another folder inside './store' and name it './Reducers'. Then place the file 'Reducers.js' inside of it
          
                   4) Reducers.js will have the following boilerplate code
                
                              import { createAction, createReducer } from '@reduxjs/toolkit'
                              
                              const increment = createAction('counter/increment')
                              const decrement = createAction('counter/decrement')
                              const incrementByAmount = createAction('counter/incrementByAmount')
                              const initialState = { value: 0 }
                              
                              const counterReducer = createReducer(initialState, (builder) => {       //builder, as the name implies, is an object that builds the reducer with .addCase
                                builder
                                  .addCase(increment, (state, action) => {                            //the 'case'
                                    state.value++
                                  })
                                  .addCase(decrement, (state, action) => {
                                    state.value--                         
                                  })
                                  .addCase(incrementByAmount, (state, action) => {
                                    state.value += action.payload
                                  })
                              })
                  
                              export default counterReducer;
          
          
                   5) Go to your app.js and import the following
          
                              import {Provider} from 'react-redux';
                              import store from './store';
                              
                              function App() {
                                   return(
                                         <Provider store={store}>
                                               
                                          </Provider>
                                   )                     
                              }

  
*/
