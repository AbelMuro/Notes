/* 
                                                                GLOBAL STATE
            The global state is the applications entire state object, it is stored within the Store and updated by the Reducer. This
            state should only have serializable data (objects, arrays, primitive values). Any non-serializable values will not be safely stores
            (non-serializable = you will lose some data if you use JSON.parse(JSON.stringify()))




                                                                STATE UPDATES

            All state updates in Redux behave asynchronously, and all re-renders behave asynchronously.
            Redux will batch all the synchronous dispatch() calls, and wait until the callstack is empty to apply the state updates
            and the re-render. If the callstack has an asynchronous function (fetch, Redux-Thunk), then all the batched dispatch()
            calls will trigger the state update and cause a re-render BEFORE the asynchronous function is taken out of the callstack.
*/
