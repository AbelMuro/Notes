import { configureStore, combineReducers, applyMiddleware } from 'redux';


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

reducer(undefined, {});                                  //this will return the initial state

//--------------You can also split reducers to handle different parts of the state--------------


//../reducer/reducerOne
const reducerOne = (state = {list: []}, action) => {
    let stateList = state.list;
    switch(action.type) {
        case "add item":
            return {list: [...stateList, action.item] };
        default:
            return state;
    }
}
export default reducerOne;


//../reducer/reducerTwo
const reducerTwo = ((state = {list: []}, action)=>{
    let stateList = state.list;
    switch(action.type) {
        case "remove item":
            return {list: stateList.filter((item)=>{return item != action.item})}
        default:
            return state;
    }
})
export default reducerTwo;


//../reducer/index.js
import {combineReducers} from 'redux';
import reducerOne from './reducerOne';
import reducerTwo from './reducerTwo';

const rootReducer = combineReducers({
    reducerOne: reducerOne,
    reducerTwo: reducerTwo
});
export default rootReducer;





//---------------------------------to dispatch actions to the reducer--------------------

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



//-----------------------------------to view state properties from state-----------
import {useSelector} from 'react-redux';
import {createSelector} from 'reselect';            //dont forget to view the documentation for reselect

//createSelectors enable us to manipulate how the state properties will be viewed
const selectList = createSelector(
    (state) => state.list,                          //first callback must return a property from the state
    (list) => {                                     //second callback can be used to manipulate the property 
        list.forEach((item)=> {})                   // that was pass down from the first callback
    }
)

function ChildComponent() {
    //different ways to access state
    const selectOne = useSelector((state)=> state.list)     //useSelector will return the property list       
    const selectTwo = useSelector(selectList);              //useSelector will return the property list after we manipulated it
}















//================================================= STORE ==============================================
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

















 //=======================================REDUX THUNK=======================================================
 //thunk is a middleware that calls the action creators that return 
 //a function instead of an action object, 
 //this is useful for calling asynchronous functions
 // normally you would have to import thunk from 'redux-thunk'
 //but configureStore() automatically comes with thunk


 //action creator
function addItem(addOrRemove, item){    
    let action = {
        type: addOrRemove,
        item: item
    }
    return action;
}

//the action creator above will be called by the async function below after a 5 second delay
function usingThunk(addOrRemove, item) {
    return dispatch => {
        setTimeout(
            ()=>{dispatch(addItem(addOrRemove, item))},
            5000,        
        )
    }
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





//============================================ CONNECT =======================================================
