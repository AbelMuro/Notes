/* 
                                                                         CONCURRENCY 
                                                                         
                    Concurrency refers to having multiple tasks in progress at the same time (i.e tasks can overlap).
                    React could only handle one task at a time in the past (which was referred to as Blocking rendering). 
                    To solve this problem, concurrent mode was introduced in React as an experimental feature.
                    Concurrency just means we can have two tasks on hand and can switch between them depending on the priority.
                    
                                            - To enable concurrent mode:    (index.js)
                                                        const rootEl = document.getElementById("root")
                                                        const root = ReactDOM.createRoot(rootEl);
                                                        root.render(<App/>);    
                                                        
                                            - To use legacy mode:             (index.js)
                                                        const rootEl = document.getElementById('root')
                                                        ReactDOM.render(<App />, rootEl)  
  
*/
