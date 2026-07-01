


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












