//================================================== REDUCER ==============================================
/* 
            The reducer is a function that uses action objects to mutate state data
            reducer must be a pure function, meaning it must not change the state directly 
            and must return a new state if change occured, but must return old state if no change occured
            to make changes to the state object in the reducer, you want to make use of these array functions
            that return an updated version of the array and doesnt mutate the original array
*/
            import { createAction, createReducer } from '@reduxjs/toolkit'
            
            const increment = createAction('INCREMENT')                            //create an action that will be used to update a specific part of the state
            const decrement = createAction('DECREMENT')
            const incrementByAmount = createAction('INCREMENT_BY_AMOUNT')
            const initialState = { value: 0 }            
            
            const counterReducer = createReducer(initialState, (builder) => {       //builder, as the name implies, is an object that builds the reducer with .addCase
              builder
                .addCase(increment, (state, action) => {                          
                  state.value++
                })
                .addCase(decrement, (state, action) => {
                  state.value--                         
                })
                .addCase(incrementByAmount, (state, action) => {
                  state.value += action.payload.amount
                })
            })

            export default counterReducer;


//------------------- Splitting Reducers
/* 
            Keep in mind that every reducer can manage a part of the state
            in other words, one reducer can handle one property of the state
            it should not access the property of the state that is managed 
            by another reducer
*/
            import {combineReducers} from 'redux';
            import ListReducer from './ListReducer';
            import CounterReducer from './CounterReducer';
            
            const rootReducer = combineReducers({
                list: ListReducer,                           //generally, you want to name the reducers after the property of the state in which they manipulate
                counter: CounterReducer
            });
            export default rootReducer;





