import { configureStore, combineReducers, applyMiddleware } from 'redux';

//                   TO INSTALL REDUX IN YOUR APPLICATION
//
//      1) npm install redux                        //install the core files for redux
//      2) npm install react-redux                  //installs the library that react uses to work with redux
//      3) npm install @reduxjs/toolkit             //installs other useful functions/methods for state management


//                  REDUX TERMINOLOGY
//      Action: an object that usually contains two properties, 'type' and 'payload'    
//              'type' will tell the reducer what to do with the object, 'type: addItem'
//              'payload' contains the actual data that we want to add to the state object (you can name the property however you want)
//      
//      Reducer: a function that uses action objects to mutate state data
//
//      Store: a global object that contains the state of the application, this is the single source of truth
//
//      Dispatch: a function that is used to 'dispatch' actions to the reducer
//
//      Selectors: a function that can retrieve the state from the store


//                  REDUX FLOW
//
//       1) an event is triggered in the UI by the user
//              
//       2) the event will then dispatch an action to the reducer   
//            
//       2.5) if you have a middleware, then the action will first go to the middleware and then to the reducer
//            if the middleware returns a function, then most likely the function is making an external call to a server with fetch() or axios
//            the middleware will wait until it gets the requested data from the server, and then it will dispatch an action to the reducer
//
//       3) the reducer then receives the action and the old state object in the store and returns the new state if changes occured
//
//       4) the components that have useSelector() hook will re-render to show the updated state
/* 

            REDUX HAS 4 MAIN COMPONENTS
          1) action
          
          2) reducer
          
          3) store
          
          4) view (DOM)

*/


//       KEEP IN MIND that the global store should ONLY have serializable values
//          serializable values means you can use JSON.parse(JSON.stringify()) WITHOUT losing data (arrays, object)
//          non-serializable values means that you will lose some data if you use JSON.parse(JSON.stringify())

/* 
            REDUX USES A VARIATION OF THE FLUX ARCHITECTURE
         Redux can only have a single global store, but FLUX can have multiple stores
         Redux doesn't have a dispatcher, but FLUX does have a dispatcher (a dispatcher is an array of callbacks that each connect to a store)
         Redux can only have a single state, but FLUX can have multiple states
         

*/



//                  STEPS TO INTEGRATE REDUX INTO YOUR REACT APPLICATION
//      1) create a folder called './store' with the file store.js
//
//      2) store.js will have the following boilerplate code
//      
            import {configureStore} from '@reduxjs/toolkit';
            import Reducer from './Reducers';

            const store = configureStore({                      //this will create the store with a reducer
                reducer: Reducer
            })

            export default store;
//  
//      3) then create another folder inside './store' and name it './Reducers'. Then place the file 'Reducers.js' inside of it
//
//      4) Reducers.js will have the following boilerplate code
//      
            export default function Reducer(state = {conditionColor: "white"}, action){
                    switch(action.type){
                       case "set":
                            return {conditionColor: action.color};
                       case "get":
                            return state;
                       default: 
                            return state;
                }
            }
//
//       5) Go to your app.js and import the following
//
            import {Provider} from 'react-redux';
            import store from './store';
            
            function App() {
                 return(
                       <Provider store={store}>
                             
                        </Provider>
                 )
                        
            }







//================================================== REDUCER ==============================================
//The reducer is a function that uses action objects to mutate state data
//reducer must be a pure function, meaning it must not change the state directly 
//and must return a new state if change occured, but must return old state if no change occured
//to make changes to the state object in the reducer, you want to make use of these array functions
// that return an updated version of the array and doesnt mutate the original array

// state.filter((element, index) => {           //removes certain elements from the array
//                  if(element > 1) 
//                      return true;            //element will be included in the new array
//                  else
//                     return false;           //element will be excluded from the new array
//                })
//
// state.map((element, index) => {             //similar to forEach(), but returns an updated array and
//              return element + 1;            //doesnt affect the original array
//  })

const reducer = (state = {list: []}, action) => {       //you can initialize state with a global object if you want
    let stateList = state.list;
    switch(action.type) {
        case "add item": 
            return {list: [...stateList, action.item] };
        case "remove item":
            return {list: stateList.filter((item)=>{return item != action.item})}
        default:
            return state;
    }
}


//--------------You can also split reducers to handle different parts of the state--------------
// keep in mind that every reducer should 'own' a part of the state
// in other words, one reducer should handle only ONE property of the state
// it should not access the property of the state that is 'owned' by another reducer

//../reducer/ListReducer
const ListReducer = (state = {list: []}, action) => {
    let list = state.list;
    switch(action.type) {
        case "add item":
            return {list: [...list, action.item] };
        case "remove item":
            return {list: list.filter((item) => {return item != action.item})}
        default:
            return state;
    }
}
export default ListReducer;


//../reducer/CounterReducer
const CounterReducer = ((state = {counter: 0}, action) => {
    let currentCounter = state.counter;
    switch(action.type) {
        case "increment":
            return {counter: currentCounter++ }
        case: "decrement":
            return {counter: currentCounter-- }
        default:
            return state;
    }
})
export default CounterReducer;


//../reducer/index.js
import {combineReducers} from 'redux';
import ListReducer from './ListReducer';
import CounterReducer from './CounterReducer';

const rootReducer = combineReducers({
    list: ListReducer,                           //generally, you want to name the reducers after the property of the state in which they manipulate
    counter: CounterReducer
});
export default rootReducer;







//=============================================== CREATE SLICE() ===============================================================
//createSlice() does multiple things for you at once, it creates a reducer, and generates action creators that 
//correspond to the 'case' or 'types 'in your reducers
//the whole point of this function is to reduce boilerplate code.


import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 0 }

const counterSlice = createSlice({
  name: 'counter',                                                          //name of reducer
  initialState,                                                             //initial state of reducer
  reducers: {                                                               //the reducer function
    increment(state) {                                                      // you can think of this as a 'case' in the 'switch' of a reducer function
      state.value++
    },
    decrement(state) {                                                       // you can think of this as a 'case' in the 'switch' of a reducer function
      state.value--
    },
    incrementByAmount(state, action) {                                       // you can think of this as a 'case' in the 'switch' of a reducer function
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions                 //automatically creating action creators to dispatch
export default counterSlice.reducer                                                             //exporting the reducer









//======================================================= CREATE REDUCER =========================================================
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









//===================================================== USE DISPATCH HOOK =================================================
// you can use the useDispatch hook to dispatch actions to the reducer

import {useDispatch} from 'react-redux';

function ChildComponent() {
    const dispatch = useDispatch();
    
    const handleClick = (e) => {
        const newItem = e.target.value;
        dispatch({type: "add item", item: newItem})      //dispatching an action object to the reducer
    }
    return (
        <><button onClick={handleClick}> Click Me</button></>
    )
}













//=========================================================== USE SELECTOR HOOK ===================================================================
// you can use useSelector() hook to access the state object
// keep in mind that every component that has useSelector() 
// will be re-rendered when the state object changes
// useSelector() will automatically have the new state every time

import {useSelector} from 'react-redux';             //must be used within a component to cause a re-render when state changes
import {createSelector} from '@reduxjs/toolkit';     //createSelectors enable us to manipulate how the state properties will be viewed        


//the createSelector below was designed for Apps that only have one reducer
const selectList = createSelector(
    (state) => state.list,                          //first callback must return a property from the state
    (list) => list                                  //second callback can be used to manipulate the property that was pass down from the first callback
)

//the createSelector below was designed for Apps that have more than one reducer
const selectCounter = createSelector(
    (state) => state.CounterReducer,                 //first callback must return one of the names of the reducer
    (CounterReducer) => CounterReducer.counter       //second callback you can access the actual property

)

function SomeComponent() {
    //different ways to access state
    const selectOne = useSelector((state) => state.list)     //useSelector will return the property list from the state object       
    const selectTwo = useSelector(selectCounter);             //useSelector will return the property list after we manipulated it
}















//================================================================= STORE ===================================================================
//The global store is a file that contains the state of our application. 
//Any component in the application can access the state from the global store

// store.js
import {rootReducer} from './reducer/index.js';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({              //creating a 'store' that will contain our state data
    reducer: rootReducer,                   //our custom reducer
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myMiddleware)                     //adding a new middleware to our store
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



//some built in functions to use for debugging or testing
store.getState()                                    //will return the current state in the store
store.dispatch({type: "action"})                    //will dispatch an action object to the reducer
store.subscribe(() => {console.log(store.getState())})//subscribe will call the callback everytime there is a change in the state



















//================================================ ACTION OBJECTS========================================================
//action objects
let action = {
    type: "add item",                               //all action object must have a type property
    item: "horse",
}

//action creators
function createAction(addOrRemove, item){           //you can define a function that will help you create an action object
    let action = {
        type: addOrRemove,
        item: item
    }
    return action;
}













//================================================= MIDDLEWARE ==============================================
//middleware can be used to interact with a action object BEFORE it dispatches to the reducer
//redux provides pre built middlewares such as redux-thunk and redux-promise

//custom middlewares are basically 3 functions that are nested within each other
//the 'action' function manipulates action somehow... when it finishes doing that... 
//then 'next' function is called and that same function passes the updated action to the reducer
//the 'store' function is just there to help us access the state before and after the action is dispatched


//this is the syntax for a middleware
const myMiddleware = store => next => action => {
    console.log(store.getState());         //this will log the state BEFORE the action is dispatched to the reducer
    next(action);                          //we call this function to pass the action to the 'next' middleware
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
















 //========================================================REDUX THUNK =======================================================
 // configureStore() automatically comes with redux-thunk

 // redux-thunk "teaches" dispatch how to accept functions, by intercepting the function and calling it instead of passing it on to the reducers
 // The function it intercepts is used to make AJAX calls and will instead call the dispatch function

 


function usingThunk(URL) {
    return dispatch => {
          dispatch({type: "isLoading", isLoading: true})                            //you can dispatch this action to a different reducer to simulate a loading screen
          fetch(URL)
                .then(response => response.json())
                .then((results) => {
                      dispatch({type: 'add', name: results.data});
                      dispatch({type: "isLoading", isLoading: false})              //loading stops here
                 }) 
                .catch((err) => {
                      console.log("error")
                      dispatch({type: "isLoading", isLoading: false})
                })
    }
}    

function ExampleWithThunk() {
    const dispatch = useDispatch()
    
    const handleClick = () => {
            dispatch(usingThunk("https://jsonplaceholder.typicode.com/todos/1"));           //remember that 'thunk' is just an action creator that makes an AJAX call 
                .then((response) => response.json())                                        // (OPTIONAL) redux-thunk can also control what is being returned from the dispatch function
                .then((results) => results)                                                 // it can make the dispatch function return a promise
    }
    
    return(
            <button onClick={handleClick}>
                 Click Here
            </button>
     )
}




















//================================================ REDUX PROMISE (ASYNC ACTION CREATOR)================================================
// npm install redux-promise

// redux-promise "teaches" dispatch how to accept promises, 
// by intercepting the promise and dispatching actions when the promise resolves or rejects.



// store.js
import {configureStore} from '@reduxjs/toolkit';
import promiseMiddleware from 'redux-promise';
import rootReducer from './reducers';

const store = configureStore( 
   rootReducer,
   middleware: (defaultMiddleware) => {defaultMiddleware().concat(promiseMiddleware)}
);

export default store;



// action-creators.js
export function usingReduxPromise(URL) {
  const somePromise = fetch(URL);

  return {                                         //this action will be returned when the promise is resolved
    type: 'fetch posts',
    payload: somePromise
  };
}


//app.js
import {usingReduxPromise} from './action-creators.js';
import {useDispatch} from 'react-redux';

function App() {
       const dispatch = useDispatch();

       const handleClick = () => {
            dispatch(usingReduxPromise('https://someApi/'))        //usingReduxPromise() will return a promise, and redux promise will intercept the promise and return a new action when the promise resolves
       }     
       
       return(
            <button onClick={handleClick}> 
                 Click Me       
            </button>
       )
}




























//=================================================== REDUX SAGA ====================================================
//npm install redux-saga -D

//Redux-saga will intercept an action of a specific type


// store.js
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducers'
import rootSaga from './saga.js'                                        //this function is coming from the 'file' below

const sagaMiddleware = createSagaMiddleware();

export default const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {getDefaultMiddleware().concat(sagaMiddleware)}
})

sagaMiddleware.run(rootSaga);






// sagas.js
import {takeEvery,                                          // takeEvery allows concurrent actions to be handled (user clicks on add cart like 10 times or something)
        takeLatest,                                         // takeLatest will get the last action that is dispatched from a list of concurrent actions, any previous concurrent actions before the first one will be ignored
        takeLeading,                                        // takeLeading will get the first action that is dispatched froma list of concurrent actions, any other concurrent actions after the first one will be ignored
        all, 
        call, 
        put} from 'redux-saga/effects';   
import {getPosts, addPost} from './fetchFunctions.js'         // assume that getPosts and addPost is a regular function that is making a fetch request (remember that the last .then() MUST return the results! )


1) function* getPostsSaga() {
     try{
            const data = yield call(getPosts);                     //you must use call() to make a call to a regular function in saga
            yield put({type: 'get post success', payload: data})   //dispatching an action to the reducer     
     }
     catch(err) {
            yield put({type: 'get posts failed', error: err});
     }
}
2) function* addPostSaga(action) {
       try{
          const data = yield call(addPost, action.payload)      //second argument will be used as an argument for addPost function
          yield put({type: 'add post success', payload: data})  //dispatching an action to the reducer 
       }
        catch(error){
             yield put({type: 'add posts failed', error: err});
        }
}
3) function* getPostsWatcher() {                              
     yield takeEvery('get posts', getPostsSaga)              //this will call getPostsSaga everytime an action with type: 'get posts' is dispatched
}                                                            
4) function* addPostWatcher(){
     yield takeLeading('add post', addPostSaga)               //this will call addPostSaga everytime an action with type: 'add posts' is dispatched
}                                                            

5) export default function* rootSaga(){
      yield all([getPostsWatcher(), addPostWatcher()])       //this will run all of our watchers in parallel
}



// app.js 
import {sagaMiddleware} from './store.js';

function App() {
      const dispatch = useDispatch()     
            
      const handleGetPosts = () => {
            dispatch({type: 'get posts'})                                                       //action will be intercepted by redux-saga
      }
                                                                                                //to my future self: if redux saga isnt working, try to create a function that returns an action for dispatch()
      const handleAddPost = () => {
            dispatch({type: 'add post', payload: {post: 'whatever'}})                            //callback will be intercepted by redux-saga
      }

      return(
          <> 
             <button onClick={handleGetPosts}>
                 'get all posts'
             </button>
             <button onClick={handleAddPost}>
                  'add post'
             </button>                  
          </>
     )
}





















//==================================================== REDUX PERSIST ====================================================
// redux persist is a library that you can use to 'persist' the state in a redux application. The library lets you use either
// local storage or session storage to store the state
// npm install redux-persist


// store.js 
import {configureStore} from '@reduxjs/toolkit';
import RootReducer from './Reducers';                                               //KEEP IN MIND, that RootReducer must be an instance of CombineReducers({})
import {                
    persistStore,                                                                   //this function is used to make the global store persist the state
    persistReducer,                                                                 //this function is used to make the ROOT reducer persist the state
    FLUSH,                                                                          //these are all default actions that are used by redux-persist in the background 
    REHYDRATE,                                                                      // to persist the state in the local storage
    PAUSE,                                                                          // Keep in mind that these actions are non-serializable
    PERSIST,                                                                        // so you have to make sure that redux doesnt use serializableCheck on these actions
    PURGE,                                                                          // in the configureStore()
    REGISTER} from 'redux-persist';
import storage from 'redux-persist/lib/storage';                                    //using the local storage to store the state
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'            //using the session storage to store the state

                               
const persistedReducer = persistReducer({key: 'root', storage}, RootReducer);       //creating a persisted reducer and specifying the local storage to be used to persist the state

export const store = configureStore({                      
    reducer: persistedReducer,                                                     // {serializableCheck} will make sure that redux doesn't check to see if redux-persist actions are serializable
    middleware : getDefaultMiddleware => getDefaultMiddleware({serializableCheck: {ignoredActions: [PERSIST, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}})
})
export const persistedStore = persistStore(store);                                  //this function will make the global store persist and rehydrate the store




// app.js
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, peristedStore} from './'

function App() {

        return(
                <Provider store={store}>
                    <PersistGate 
                            loading={null}                              //you can put a loading screen here
                            persistor={persistedStore}>                 //the persistedStore instance                                                                              
                                      
                                //The rest of the App goes here
                                                                             
                    </PersistGate>
                </Provider>
         )


}































//=================================================REDUX TESTING WITH JEST=================================================
//KEEP IN MIND THAT THE TESTING MUST BE INSIDE A TEST.JS
//also keep in mind that jest does not support ES6, so you must include babel
//to transpile ES6 code in the test.js file

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



