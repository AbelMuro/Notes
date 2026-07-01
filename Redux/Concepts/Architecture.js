/* 
                                                            ARCHITECTURE
            Redux has an architecture that consists of waiting for an event to be triggered in the UI by the user. This event
            will dispatch an action to the reducer. The reducer will use the action to return a new updated state. Redux will then 
            compare the new returned state with the old state, if they differ, then Redux will re-render all components that are 
            subscribed to the store. Redux's architecture follows a similar approach to the FLUX architecture but with some differences. 
            Flux has multiple stores, but Redux has a single store. Flux uses a dispatcher to receive actions from the application and 
            then sends them to its stores, but Redux allows the application to directly send the actions to the store.
            
*/
