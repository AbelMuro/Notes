//================================================ REDUX PROMISE (ASYNC ACTION CREATOR) ================================================
/* 
     npm install redux-promise

     Redux-promise will "teach" the dispatch function how to accept a promise. Redux-promise will 
     wait for the promise to resolve or reject before sending an action to the reducer.
     Redux-promise does NOT come pre-installed with configureStore, so you have to manually 
     configure it in the store.js file


     /store.js
          import {configureStore} from '@reduxjs/toolkit';
          import promiseMiddleware from 'redux-promise';
          import rootReducer from './reducers';
          
          const store = configureStore( 
             rootReducer,
             middleware: (defaultMiddleware) => {defaultMiddleware().concat(promiseMiddleware)}
          );
          
          export default store;
*/


//------------------ reducer.js

const userReducer = createReducer(initialState, builder => {
  builder                                                             // The name of the case is the name of the function that returns the promise
    .addCase(usingReduxPromise, (state, action) => {                  // Fulfilled: The action payload contains the resolved data
        state.user = action.payload;
        state.error = null;
    })
    .addMatcher(
        (action) => action.payload instanceof Error,                   // Rejected: If the promise failed, handle the error
        (state, action) => {
          state.error = action.payload.message;
        }
    );
});



//------------------ /index.js

const usingReduxPromise = async (URL) => {                           // usingReduxPromise() will be the name of the case in the reducer that received the resolved value
      const response = await fetch(URL);
      return response.json();
};

function App() {
       const dispatch = useDispatch();
            
       const handleClick = () => {
            dispatch(usingReduxPromise('https://someApi/'))       
       }     
       
       return(
            <button onClick={handleClick}> 
                 Click Me       
            </button>
       )
}

