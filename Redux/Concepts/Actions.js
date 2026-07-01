//================================================================= ACTIONS ===================================================================
/* 
            An action is an object that is sent to the reducer, the reducer will then use this object to update the state
            this will re-render all subscribed components 
*/

//------------------- useDispatch() hook
/* 
            You can dispatch actions to the store by using
            the useDispatch hook. This hook will return a function
            that can be used to actually dispatch the actions.
*/
import {useDispatch} from 'react-redux';

function App() {
    const dispatch = useDispatch();
    
    const handleClick = (e) => {
        dispatch({type: 'ADD_ITEM', payload: {newItem: 'item'}})     
    }
    return (
        <button onClick={handleClick}> 
                Click Me
        </button>
    )
}



//------------------- .dispatch() method
/* 
            The store object that is returned from configureStore()
            has the dispatch() method. You can use this method to 
            dispatch actions to the store.
*/


import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({reducer: myReducer});

store.dispatch({type: 'ADD_ITEM', payload: {item: 'milk'}});                 //Dispatch an action to the store


