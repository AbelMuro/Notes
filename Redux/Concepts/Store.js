/* 
                                                                  STORE
            The store in Redux is a centralized object that represents the single source of truth. The entire state object of the application
            is stored here, and any components subscribed to the store will be re-rendered when the state is updated.

*/


// --------------------- store.js
import {rootReducer} from './reducer/index.js';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({              //creating a 'store' that will contain our state data
    reducer: rootReducer,                   //our custom reducer
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(myMiddleware)  //adding a new middleware to our store
}); 

export default store;



// ---------------------- index.js
import {Provider} from 'react-redux';
import store from './store.js';

root.render(
    <Provider store={store}>            {/*you must wrap your application with <provider store={store}> to enable the child components to dispatch actions and view state*/}
        <App/>  
    </Provider>
)








// ------------------------ accessing the state from the store
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











// ------------------------ Subscribing components to the store
/* 
            By subscribing components to the store, any state updates will re-render those components
            You can use the following functions to subscribe.
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




