/* 
                                                            STATE UPDATES PROCESS
                                                            
                    A component will be re-rendered (updated) when there is a change in the state object.
                    All state updates behave asynchronously in react, and DOM updates also behave asynchronously.
                    The React will schedule a state-update and re-render in the most optimal time. Typically, React 
                    batches all synchronous setState() calls in the Queue, and waits for the callstack to be empty to update 
                    the state and cause a re-render. However, if the callstack has an asynchronous function (fetch, Promise),
                    all synchronous batched setState() functions that were called BEFORE the asynchronous function will update 
                    the state and cause one re-render

                                            const handleClick = () => {
                                                    setLoading(true);               // we schedule a change in the loading state
                                            }                                       // once we exit from the function, React will update the state and cause a re-render
                    
                                            const handleClick = async () => {
                                                  setLoading(true);                // scheduling a state update 
                                                  await fetch();                   // React will immediately trigger the state update and re-render for setLoading(true), before this async function is taken out of the callstack
                                                  setLoading(false)                // scheduling another state update
                                            }                                      // once we exit from the function, React will trigger the state update and re-render for setLoading(false) 

*/
