//=================================================== REDUX SAGA ====================================================
/* 
      npm install redux-saga -D
  
      Redux-saga will intercept an action of a specific type, and will use generator functions to 
      implement a logic before dispatching the action it intercepted to the reducer.


      /store.js
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
      
*/


//------------------ /sagas.js
import {
        takeEvery,                                          // takeEvery allows concurrent actions to be handled (user clicks on add cart like 10 times or something)
        takeLatest,                                         // takeLatest will get the last action that is dispatched from a list of concurrent actions, any previous concurrent actions before the first one will be ignored
        takeLeading,                                        // takeLeading will get the first action that is dispatched froma list of concurrent actions, any other concurrent actions after the first one will be ignored
        all, 
        call, 
        put
  } from 'redux-saga/effects';   

// 1) define a function that returns a promise
function fetchData() {
  return fetch('https://example.com/api/data')
    .then(response => response.json())
}

// 2)  define a generator function that uses the 'call' effect to invoke the fetchData function
//     and the 'put' effect to dispatch an action with the data
function* fetchSaga() {
  try {
        const data = yield call(fetchData)
        yield put({ type: 'FETCH_SUCCESS', payload: data })                        //dispatching actions to the reducers
  } 
  catch (error) {
        yield put({ type: 'FETCH_FAILURE', payload: error })                       //dispatching actions to the reducers
  }
}

// 3) use the takeEvery effect to intercept all actions with type 'FETCH_REQUEST'
function* rootSaga() {
  yield takeEvery('FETCH_REQUEST', fetchSaga)
}

// 4) export the root saga to the store.js file
export default rootSaga





//------------------ /app.js 
import {sagaMiddleware} from './store.js';

function App() {
      const dispatch = useDispatch()     
                                                                        // to my future self: if redux saga isnt working, try to create a function that returns an action for dispatch()
      const handleFetch = () => {
            dispatch({type: 'FETCH_REQUEST'})                           // will be intercepted by redux-saga
      }

      return(
             <button onClick={handleFetch}>
                 'Click me'
             </button>                
     )
}
