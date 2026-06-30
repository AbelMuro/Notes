/* 
                                                             CONCURRENCY 
                                                             
        Concurrency refers to having multiple tasks in progress at the same time (i.e tasks can overlap).
        React could only handle one task at a time in the past (which was referred to as Block rendering). 
        To solve this problem, concurrent mode was introduced in React as an experimental feature.
        Concurrency just means we can have two tasks on hand and can switch between them depending on the priority.
        
                                - To enable concurrent mode:    (index.js)
                                            const rootEl = document.getElementById("root")
                                            const root = ReactDOM.createRoot(rootEl);
                                            root.render(<App/>);    
                                            
                                - To use legacy mode:             (index.js)
                                            const rootEl = document.getElementById('root')
                                            ReactDOM.render(<App />, rootEl)  


                      You can use the following Hooks to implement debouncing/concurrency
  
*/








//------------------------------------- USE TRANSITION() HOOK -------------------------------------
// Transitions is a feature that takes a heavy computational task and reserves it for a low priority queue
// In React, we create transitions with the useTransition hook
// For Example, typing in an <input/> has high priority but is a light computational task
// Re-styling a list of 1000 employee names is a low priority but heavy computation task
// This hook will most likely be used in scenarios that involve search boxes and displaying results

// The component below will have an input and will have a long list of movie names displayed below it
// The component below basically has the logic that the search state updates are going to have priority over the results state updates

import {useState, useTransition} from 'react';

function SearchBar() {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([])
    const [isPending, startTransition] = useTransition();

    const handleSearch = (e) => {
        setSearch(e.target.value);
        startTransition(() => {
            fetch('url')
                .then(response => response.json())
                .then(results => setResults(results))
        })
    }

    return(
        <fieldset className={styles.inputContainer}>
            <input 
                type='text' 
                className={styles.searchBar} 
                value={search}
                onChange={handleSearch}
                placeholder='Search for movies or TV series'
             />
             {isPending && <span> 'Loading..' </span>}                //fallback loading UI
             {results.map((result) => {                               //state that will be updated when search state stops being updated
                     return(
                         //display results;
                     )
             })}
        </fieldset

    )
}






//------------------------------------- USE DEFFERED VALUE() HOOK -------------------------------------
// useDeferredHook() will accept a state variable as an argument and will return a 'copy' of the state. 
// The changes made to the original state will have high priority
// The changes made to the copy state will have low priority
// Changes made to the original state will reflect on the copy ONLY after the dom has been updated with the original state
// This is similar to useTransition()... 
//   but the difference is that useTransition() will label a function as low priority
//   and useDeferredValue() will label a copy of the state as low priority


//The component below has this logic, we have a state variable (search) with a copy of that state (deferredSearch)
//The whole component is a controlled component
//When the user types a character in the <input/>, the update to the copy state will wait UNTIL the original state has
// changed in the DOM
//If the user continues typing in the <input/>, the update to the copy state will wait UNTIL the user stops typing
// this is basically debouncing

function App() {
  const [search, setSearch] = useState('');                               //This state is high priority
  const [results, setResults] = useState([]);
  const deferredSearch = useDeferredValue(search, {timeoutMs: 1000});     //This state copy is low priority (the second argument can be used to delay the state update for 1 second)

  const handleSearch = (event) => {
     setSearch(event.target.value);
  };
        
  useEffect(() => {
    fetch(`https://example.com/api/search?q=${deferredSearch}`)
      .then(response => response.json())
      .then(results => setResults(results));
  }, [deferredSearch]);                                             


  return (
    <>
      <input 
          type="text" 
          value={search} 
          onChange={handleSearch} 
          placeholder="Search" 
        />
        {results.map((result) => {
                  return (
                        //display results
                  )
        })}          
      
    </>
  );
}
