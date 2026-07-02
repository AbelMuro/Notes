/* 
                                                          STATE UPDATE PROCESS
            All updates to the global state are synchronous, but all updates to the DOM behave asynchronous. Pinia will use Vue's reactivity system
            to detect any changes made to the global state. Any component that imports the global state AND maintains the reactivity 
            will be re-rendered.
*/
