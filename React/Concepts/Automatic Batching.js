/*
                            AUTOMATIC BATCHING 
                            
            Batching is the process of grouping multiple setState() updates into a single re-render for better performance.
            Lets say we have 4 setState() being called in succession inside of an event handler. React will automatically
            group together these 4 setState() functions into one re-render. React will batch all synchronous and asynchronous
            state updates.

*/
