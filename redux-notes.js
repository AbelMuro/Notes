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
//       4) the components that are subscribed to the state will re-render to show the updated state














//=================================================REDUCER==============================================
//The reducer is a function that uses action objects to mutate state data
//reducer must be a pure function, meaning it must not change the state directly 
//and must return a new state if change occured, but must return old state if no change occured

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





















//=============================== USE DISPATCH HOOK =================================================
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













//======================================= USE SELECTOR HOOK ===================================================================
// you can use useSelector() hook to access the state object
// keep in mind that every component that has useSelector() 
// will be re-rendered when the state object changes

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
//creating a store (this is usually done in the /src/index.js)
import {Provider} from 'react-redux';
import {rootReducer} from '../reducer/index';

const store = configureStore({              //creating a 'store' that will contain our state data
    reducer: rootReducer,                   //our custom reducer
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myMiddleware) //this property accepts a callback that is used to include a middleware
}); 

root.render(
    <Provider store={store}>            {/*you must wrap your application with <provider store={store}> to enable the child components to dispatch actions and view state*/}
        <App/>  
    </Provider>
)

//some built in functions for a store
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
//you can think of middleware as promises.

import {applyMiddleware} from 'redux';
const myStore = createStore(rootReducer, applyMiddleware(thunk));



//----------------------you can create your own custom middleware------------------
//middlewares are basically 3 functions that are nested within each other
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

















 //========================================================REDUX THUNK=======================================================
 //thunk is a middleware that is used to define ASYNC action creators that return a function instead of an object
 // this type of middleware is a perfect place to make external calls to a server with fetch() or axios
 // normally you would have to import thunk from 'redux-thunk'
 // but configureStore() automatically comes with thunk




// This is an async action creator, it will create an action AFTER it has finished its external call to a server to get data
// once it finishes, then it will dispatch the action to the reducer
function usingThunk(URL) {
    return dispatch => {
          fetch(URL)
                .then(response => response.json())
                .then(json => dispatch(addName("add", json.title)))       //at this point, json is a javascript object
        )
    }
}    

 //action creator
function addName(addOrRemove, name){    
    let action = {
        type: addOrRemove,
        name: name
    }
    return action;
}

export default usingThunk;




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



