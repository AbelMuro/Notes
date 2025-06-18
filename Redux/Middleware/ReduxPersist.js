//==================================================== REDUX PERSIST ====================================================
// redux persist is a library that you can use to 'persist' the state in a redux application. The library lets you use either
// local storage or session storage to store the state
// npm install redux-persist


//------------------ /store.js 
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

// 1)  creating a persisted reducer and specifying the local storage to be used to persist the state                            
const persistedReducer = persistReducer({key: 'root', storage}, RootReducer);      

// 2) {serializableCheck} will make sure that redux doesn't check to see if redux-persist actions are serializable
export const store = configureStore({                      
    reducer: persistedReducer,                                                   
    middleware : getDefaultMiddleware => getDefaultMiddleware({serializableCheck: {ignoredActions: [PERSIST, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}})
})

// 3) this function will make the global store persist and rehydrate the store
export const persistedStore = persistStore(store);                                  




//------------------ /app.js
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










//======================================================== REDUX DEEP PERSIST ===========================================================================
// You can use redux-deep-persist to persist a part of the state. 
// The only difference below is that there is one extra step we do before we create a persisted reducer
// npm install redux-deep-persist

//you can persist properties of the state like this,
//   state.prop1    state.prop1.prop2  ....

import { getPersistConfig } from 'redux-deep-persist';
import RootReducer from './Reducers'; 

// 1)
const config = getPersistConfig({
    key: 'root',
    storage,
    whitelist: ['theme', 'theme.color', 'theme.color.saturation'],  
});

// 2)
const persistedReducer = persistReducer(config, RootReducer);       


