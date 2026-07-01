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
