//================================================== REDUCER ==============================================
/* 
            The reducer is a function within the Store that is responsible for updating the global state. The reducer will not 
            mutate the global state directly, instead it will return a new global state. Redux will compare the new state with the 
            old state, and if the states are different, then a re-render will occur. It is because of this reason the global state 
            should never be mutated directly. If the global state is mutated directly within the global store and returned, Redux will 
            compare the old state with the old state, as a result, Redux will not trigger a re-render.
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





