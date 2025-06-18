//======================================================== REDUX THUNK (ASYNC ACTION CREATOR) =======================================================
 // npm install redux-thunk

/* 
     Redux-Thunk "teaches" the dispatch method how to accept functions. Redux Thunk will call 
     the function before sending an action to the reducer. The function it calls is used to make AJAX calls 
     and once its done with the AJAX call, it will dispatch an action to the reducer.

     You want to use Redux-Thunk if you want the global state to be in-sync with the database.
     You can update the database if the global state changes, or update the global state 
     if the database changes

     KEEP IN MIND, when you use Redux Thunk on the dispatch method (dispatch(useThunk()))
     the dispatch method will return a promise, making the dispatch method asynchronous
     
     createAsyncThunk() must ALWAYS return a promise!
     
           createAsyncThunk(arg, (_, thunkAPI) => {              // this callback is going to be returned by createAsyncThunk
                   return fulfillWithValue();                    // action sent to reducer will be action.payload
                   return rejectWithValue();                     // action sent to reducer will be action.payload
                   return Promise.resolve();                     // action sent to reducer will be action.payload
                   return Promise.reject({message});             // action sent to reducer will be action.error (you can return an object with ONLY one property, message)
                   return new Promise((resolve, reject) => {     // If promise is resolved, then action.payload
                      resolve();                                 // If promise is rejected, then action.error (you can return an object with ONLY one property, message)
                      reject({message});
                   })
             })
              
                  thunkAPI = {
                        dispatch,            // Allows dispatching additional actions within the async function.
                        getState,            // Provides access to the COMPLETE global state (not just the slice).
                        extra,               // Contains any extra argument passed when configuring the store.
                        requestId,           // A unique identifier for the current async request.
                        signal,              // An AbortSignal that can be used to cancel the async operation.
                        rejectWithValue,     // Enables returning a custom error payload when rejecting the promise.
                        fulfillWithValue,    // Allows returning a custom success payload.   
                        abort,               // A function to manually abort the async operation.
                    }


*/


//------------------ /Reducer.js

import { createReducer, createAsyncThunk } from '@reduxjs/toolkit';

const fetchData = createAsyncThunk('fetchData', async (URL, thunkAPI) => {          //you will need to call this function inside the dispatch method
      const response = await fetch(URL);                                  
      return response.json();                                                       //this function must return a promise
});

const dataReducer = createReducer(initialState, (builder) => {
      builder
        .addCase(fetchData.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchData.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchData.rejected, (state, action) => {
          state.loading = false;
          const message = action.error.message;
          state.error = message;
        });
});

export {fetchData}
export default dataReducer




//------------------ /index.js

import {useDispatch} from 'react-redux';
import {fetchData} from '../../Store/reducer.js'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchData('URL'))                        // returns a promise
            .then((result) => {
                result.meta.rejectedWithValue         // returns a boolean, indicating if the rejectedWithValue() function was called
            })       
  }, [])
  
  return(<>Hello World</>)
}






