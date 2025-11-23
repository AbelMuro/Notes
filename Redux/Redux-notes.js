
/* 
            Redux is a state management library that is used to centralize the state of an React application.

            Bookmarks:
                1) Features of Redux
                2) Reducer
                3) Store
                4) Accessing the state from the store (without subscribing, store.getState)
                5) Subscribing components to the store (useSelector, store.subscribe)
                6) Dispatch actions to the store (useDispatch, store.dispatch)
                7) Connect()
                8) Redux Toolkit (createSlice, createReducer)
                9) Middleware
                10) Redux Thunk
                11) Redux Promise
                12) Redux Saga
                13) Redux Persist
                14) Redux Deep Persist

                                                         FEATURES OF REDUX

                                                       STATE UPDATES PROCESS 
            All state updates in Redux behave asynchronously, and all re-renders behave asynchronously.
            Redux will batch all the synchronous dispatch() calls, and wait until the callstack is empty to apply the state updates
            and the re-render. If the callstack has an asynchronous function (fetch, Redux-Thunk), then all the batched dispatch()
            calls will trigger the state update and cause a re-render BEFORE the asynchronous function is taken out of the callstack.
            
                                                            ARCHITECTURE
            Redux has an architecture that consists of waiting for an event to be triggered in the UI by the user. This event
            will dispatch an action to the reducer. The reducer will use the action to return a new updated state. Redux will then 
            compare the new returned state with the old state, if they differ, then Redux will re-render all components that are 
            subscribed to the store. Redux's architecture follows a similar approach to the FLUX architecture but with some differences. 
            Flux has multiple stores, but Redux has a single store. Flux uses a dispatcher to receive actions from the application and 
            then sends them to its stores, but Redux allows the application to directly send the actions to the store.
            
                                                                STORE
            The store in Redux is a centralized object that represents the single source of truth. The entire state object of the application
            is stored here, and any components subscribed to the store will be re-rendered when the state is updated.

                                                              GLOBAL STATE
            The global state is the applications entire state object, it is stored within the Store and updated by the Reducer. This
            state should only have serializable data (objects, arrays, primitive values). Any non-serializable values will not be safely stores
            (non-serializable = you will lose some data if you use JSON.parse(JSON.stringify()))

                                                                REDUCER
            The reducer is a function within the Store that is responsible for updating the global state. The reducer will not 
            mutate the global state directly, instead it will return a new global state. Redux will compare the new state with the 
            old state, and if the states are different, then a re-render will occur. It is because of this reason the global state 
            should never be mutated directly. If the global state is mutated directly within the global store and returned, Redux will 
            compare the old state with the old state, as a result, Redux will not trigger a re-render.

                                                                ACTIONS
            Actions are objects that contain new data that will be dispatched to the reducer. The reducer will use these actions
            to update the global state. Actions will typically follow the following format...

                                                const action = {
                                                    type: 'UPDATE_NAME',
                                                    payload: 'new name'
                                                }






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




            INTEGRATING TYPESCRIPT WITH REDUX

                        1) In your store.js file, update the following lines of code

                                    import {configureStore} from '@reduxjs/toolkit';
                                    import rootReducer from './Reducers';
                                    
                                    const store = configureStore({
                                        reducer: rootReducer,
                                    });
                                    
                                    export type RootState = ReturnType<typeof store.getState>;
                                    export type TypedDispatch = typeof store.dispatch;
                                    export default store;

                        2) In your index.js file, update the following lines of code

                                    import store from './Store';
                                    import type {RootState, TypedDispatch} from './Store';
                                    
                                    export {RootState, TypedDispatch};
                                    export default store;

                        3) In your reducer, make sure to create cases similar to the one below
                                    import { PayloadAction } from '@reduxjs/toolkit'

                                    .addCase(showPopup, (state, action: PayloadAction<string>) => {                       
                                            state.open = true;
                                            state.message = action.payload;
                                    })

                        3) useTypedSelector();

                                     import {RootState} from '../../Store';
                                     import {TypedUseSelectorHook, useSelector} from 'react-redux';
                                     
                                     const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector;

                                    function App() {
                                          const open = useTypedSelector<boolean>(state => state.popup.open);
                                    }

                        4) useTypedDispatch();

                                    import { useDispatch} from "react-redux";
                                    import {TypedDispatch} from '../../Store';
                                    
                                    const useTypedDispatch = () => useDispatch<TypedDispatch>();

                                    function App() {
                                        const dispatch = useTypedDispatch();
                                    }
                                    
                                    
*/









//================================================== REDUCER ==============================================
/* 
            The reducer is a function that uses action objects to mutate state data
            reducer must be a pure function, meaning it must not change the state directly 
            and must return a new state if change occured, but must return old state if no change occured
            to make changes to the state object in the reducer, you want to make use of these array functions
            that return an updated version of the array and doesnt mutate the original array
*/
            import { createAction, createReducer } from '@reduxjs/toolkit'
            
            const increment = createAction('INCREMENT')                            //create an action that will be used to update a specific part of the state
            const decrement = createAction('DECREMENT')
            const incrementByAmount = createAction('INCREMENT_BY_AMOUNT')
            const initialState = { value: 0 }            
            
            const counterReducer = createReducer(initialState, (builder) => {       //builder, as the name implies, is an object that builds the reducer with .addCase
              builder
                .addCase(increment, (state, action) => {                          
                  state.value++
                })
                .addCase(decrement, (state, action) => {
                  state.value--                         
                })
                .addCase(incrementByAmount, (state, action) => {
                  state.value += action.payload.amount
                })
            })

            export default counterReducer;


//------------------- Splitting Reducers
/* 
            Keep in mind that every reducer can manage a part of the state
            in other words, one reducer can handle one property of the state
            it should not access the property of the state that is managed 
            by another reducer
*/
            import {combineReducers} from 'redux';
            import ListReducer from './ListReducer';
            import CounterReducer from './CounterReducer';
            
            const rootReducer = combineReducers({
                list: ListReducer,                           //generally, you want to name the reducers after the property of the state in which they manipulate
                counter: CounterReducer
            });
            export default rootReducer;






















//================================================================= STORE ===================================================================
//The global store is a file that contains the state of our application. 
//Any component in the application can access the state from the global store

// store.js
import {rootReducer} from './reducer/index.js';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({              //creating a 'store' that will contain our state data
    reducer: rootReducer,                   //our custom reducer
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(myMiddleware)  //adding a new middleware to our store
}); 

export default store;



//  index.js
import {Provider} from 'react-redux';
import store from './store.js';

root.render(
    <Provider store={store}>            {/*you must wrap your application with <provider store={store}> to enable the child components to dispatch actions and view state*/}
        <App/>  
    </Provider>
)





























//================================================================= ACCESSING THE STATE FROM THE STORE ===================================================================
/* 
            You can access the state from the store without subscribing 
            the component that is using it. The store object that is 
            returned from configureStore() has the getState() method
            that retrieves the state.
*/


import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({reducer: myReducer});

const state = store.getState();                                              //gets the complete state from the store
const todos = store.getState(state => state.todos)                           //accessing a slice from the state



























//================================================================= SUBSCRIBING COMPONENTS TO THE STORE ===================================================================
/* 
            By subscribing components to the store, any state updates will re-render those components
*/


//------------------- useSelector() hook
/* 
            You can use the useSelector() hook to subscribe a component to the store.
            It is also possible to subscribe to a very specific part of the store 
            with this hook
*/

import {useSelector, shallowEqual} from 'react-redux';  
import {createSelector} from '@reduxjs/toolkit';              

const selectState = createSelector(                                //createSelector() can help you organize which parts of the state you want to subscribe
    (state) => state.list,                 
    (list) => list.names     

)

function App() {
    const selectOne = useSelector(state => state.name)                // subscribing component to the 'name' property of the global state
    const selectTwo = useSelector(state => state.list, shallowEqual)  // subscribing component to the first level of properties and values in the 'list' object
    const selectThree = useSelector(selectState);                     // using a createSelector() to select a specific part of the state
}




//--------------------- .subscribe() method
/* 
            The store object that is returned from configureStore()
            has the subscribe() method. You can use this method
            to subscribe components to the store
*/
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({reducer: myReducer});

store.subscribe(Component)





























//================================================================= DISPATCHING ACTIONS TO THE STORE ===================================================================
/* 
            When you dispatch an action to the store, it will trigger a re-render in 
            all subscribed components.
*/

//------------------- useDispatch() hook
/* 
            You can dispatch actions to the store by using
            the useDispatch hook. This hook will return a function
            that can be used to actually dispatch the actions.
*/
import {useDispatch} from 'react-redux';

function App() {
    const dispatch = useDispatch();
    
    const handleClick = (e) => {
        dispatch({type: 'ADD_ITEM', payload: {newItem: 'item'}})     
    }
    return (
        <button onClick={handleClick}> 
                Click Me
        </button>
    )
}



//------------------- .dispatch() method
/* 
            The store object that is returned from configureStore()
            has the dispatch() method. You can use this method to 
            dispatch actions to the store.
*/


import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({reducer: myReducer});

store.dispatch({type: 'ADD_ITEM', payload: {item: 'milk'}});                 //Dispatch an action to the store





























//================================================================= CONNECT() ===================================================================
/* 
            You can subscribe components with the Connect() function in redux.
            The Connect() function accepts two callbacks as arguments
            mapStateToProps() and mapDispatchToProps().

            mapStateToProps() will let a component subscribe to a specific part 
            of the state by passing the state as props to the component

            mapDispatchToProps() will let a component have access to the dispatch
            method.
*/

import { connect } from 'react-redux';

function App({count, dispatch}) {                        // this component has access to a part of the state and the dispatch method     
      return (
           <div>
              {count}
           </div>
       );
}

const mapStateToProps = (state) => {                      // this function has access to the global state
      return {
           count: state.count                             // passing a part of the state as props to the <App/>
      };
}

const mapDispatchToProps = (dispatch) => {                // this function has access to the dispatch method
      return {
          dispatch: dispatch                              // passing the dispatch method as props to the <App/>
      };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);


































//================================================ REDUX TOOLKIT ===========================================================




//------------------------------------------------------------ CREATE SLICE() ------------------------------------------------------------
/* 
            createSlice() does multiple things for you at once, it creates a reducer, 
            and generates action creators that correspond to the cases in your reducers
*/


import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 0 }

const counterSlice = createSlice({
  name: 'counter',                                                          //name of reducer
  initialState,                                                             //initial state of reducer
  reducers: {                                                               //the reducer function
    increment(state) {                                                      // you can think of this as a 'case' in the 'switch' of a reducer function
      state.value++
    },
    decrement(state) {                                                     
      state.value--
    },
    incrementByAmount(state, action) {                                     
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions                 // increment is an action creator function;   dispatch(increment())
export default counterSlice.reducer                                                             // exporting the reducer







//------------------------------------------------------------ CREATE REDUCER() ------------------------------------------------------------
/* 
            createReducer() lets you create a reducer
*/
//another way of creating a reducer, although you have to use createActions() from redux tool kit with createReducer()

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





















//================================================= MIDDLEWARE ==============================================
/* 
            Middleware can be used to interact with a action object BEFORE it dispatches to the reducer
            redux provides pre built middlewares such as redux-thunk and redux-promise
            
            Custom middlewares are basically 3 functions that are nested within each other
            the 'action' function returns the action that is scheduled to be dispatched. 
            then 'next' function is used to dispatch the action to the reducer or to the next middleware
            the 'store' function is just there to help us access the state before and after the action is dispatched

*/

const myMiddleware = store => next => action => {
    console.log(store.getState());          //this will log the state BEFORE the action is dispatched to the reducer
    next(action);                           //we call this function to dispatch the action to the reducer or next middleware
    console.log(store.getState());          //this will log the state AFTER the action is dispatched to the reducer
}    

//think of it like this...
 function myMiddleware(store){
    return function(next){
        //once the function below is done with the action object, 
        //the function above will send the action object to the reducer
        return function(action){
            //we do something with the action object
        }
    }
 }

 //adding a new middleware to our store
const store = configureStore({              
    reducer: rootReducer,                   
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myMiddleware)                    
}); 






































//=================================================REDUX TESTING WITH JEST=================================================
//KEEP IN MIND THAT THE TESTING MUST BE INSIDE A TEST.JS

//npm install --save-dev jest
//npm install --save-dev babel-jest

//include the following in the babelrc. file
{
    "presets": ["@babel/preset-env"]
}

//also add the script below to your package.json file
{
    "script": {
        "test": "jest",
    }
}



//-----------------------------testing action creators----------------------------------
//you can have as many it(), expect().toEqual() as you want

// ./test.js
import action from './src/actionCreators/addOrRemoveItem'

describe('actions', () => {                                         //the first argument will appear in the terminal
    it('this is a message that will appear in terminal', ()=> {     
        const expectedAction = {                                    //we create an object that we expect will be the output of an action creator
            type: "add item",
            item: "big mac"
        }
        //this is where the test actually happens, we want action() to equal to expectedAction
        expect(action("add item", "big mac")).toEqual(expectedAction);//we call the action creator and compare it to expectedAction
    })
})

//then run the script in your package.json file,
//   npm run test
    


//------------------------you can also test reducers------------------------------------
import reducer from './src/reducers/reducer'


describe('reducer', () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual(                         //reducer(undefined, {}) will return the initial state
            {
                order: []
            }
        )
    })
    it("should add the item to the store", ()=>{
        //here we are initializing state with the first argument and passing the action object
        expect(reducer({order: []}, {type: "add item", item: "big mac"})).toEqual({order: ["big mac"]})
    })

})



