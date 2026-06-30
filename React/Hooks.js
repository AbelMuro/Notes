



//=========================================== REACT HOOKS ================================================
//import React, { useEffect, useState, createContext } from 'react';
//hooks are functions that let you 'hook into' React features from function components




//------------------------------------- USE STATE() HOOK -------------------------------------

// useState() hook lets you declare a state object and a function that can be used to update that state object...
// after the component has been rendered for the second time, useState will have its argument ignored 
// and will instead read the previous state value and store it in the state object

// Keep in mind, that if you have multiple setState() functions being called in succession, 
// React will group together the setState() calls into one re-render, instead of making multiple re-renders

function HooksOne() {
    const[state, setState] = useState(1);           //you can initialize state with any string, object, array or number
    const[stateTwo, setStateTwo] = useState('can be a string');
    const[stateThree, setStateThree] = useState({one: 1, two: 2, three: 3});
}   //const [first, second] = ['one, 'two']           and now you can use first and second as variables that reference the two elements in the array ['one', 'two']



// TIP: you can pass a callback to setState() to access one of the elements stored inside the state object
// keep in mind that calling setState() will remove previous data stored inside state variable, unless you pass a callback like in the example below
function HooksTwo() {
    const [state, setState] = useState({first: 'pizza', second: 'bannana', third: 'cheese'});

    const eventHandler = () => {                            //this is how you declare event handlers in function components
        setState(previousState => {
            return{...previousState, first: 'blue'}        
        })                                                 
    }                                                       
    return(                                                //this is how you access state 
        <>
            <div> {state.first}</div>                     
            <div> {state.second}</div>
            <div> {state.third}</div>
            <button onClick={eventHandler}> click here</button>
        </>
    )
}



//------------------------------------- USE EFFECT() HOOK -------------------------------------
// useEffect() is a function used to apply side-effect (tasks that are performed outside the scope of react, fetch())
// This hook is the primary lifecycle hook that is used to call a function during any phases of the lifecycle
// the second argument of this hook lets you control when the useEffect() will be called
// When a component is first mounted, the useEffect of the parent component will be called first, then 
// the useEffect of the child component will be called afterward
 // When a component is unmounted, the cleanup function in the child component will be called first,
 // the clean up function in the useEffect of the parent component will be called afterward

 /* 
         Second argument of useEffect()

         [] means the useEffect will only run when the component mounts

         [state] means the useEffect will run when the component mounts and when the state changes

         the cleanup function in the useEffect will be called after before every re-render, and will
         also be called before the unmounting phase of the component
 
 */

function HooksThree() {  
        
    useEffect(() => {
       let button =  document.querySelector(".someButton");                              //this gets called after the first render and after every re-render       
       button.addEventListener("click", nameOfFunction);
            
       return () => {                                                                   //unmounting before every re-render
            button.removeEventListener("click", nameOfFunction)            
        }
    }, [count]); 
           
    return (
        <>
            <button className="someButton"> click me </button>
        </>                         
    )                               
}       

//------------------------------------- MAPPING LIFECYCLE METHODS WITH USEEFFECT() -------------------------------------

// Mounting Phase

useEffect(() => {          //getDerivedStateFromProps()
},[props.value]);

useEffect(() => {          //componentDidMount()
},[]);



//updating phase

useEffect(() => {          //getDerivedStateFromProps()
},[props.value]);

memo();                    //shouldComponentUpdate()

useEffect(() => {          //componentDidUpdate()
});

useCustomHook(() => {      // getSnapshotBeforeUpdate()                  
})                         // you would have to implement your own custom hook to replicate this lifecycle method


//unmounting phase

useEffect(() => {
    const unmount = () => {}; //function must be defined and declared inside the local scope of the useEffect
    return unmount;       //componentWillUnmount
})





//------------------------------------- USE LAYOUT EFFECT() HOOK -------------------------------------
//useLayoutEffect is similar to useEffect(), the difference here is that useLayoutEffect() gets called BEFORE each render.
//this is usefull if you want to make changes to the DOM after the state object is updated.
//using useEffect to make changes to the DOM can cause a flickering effect
//useLayoutEffect can prevent this



function Example() {
        const [state, setState] = useState(0);

        const handleClick = () => {
            setState(state + 1);
        }
        
        useLayoutEffect(() => {
             console.log('before render happens')
        }, [state])
        
        return(
              <button onClick={handleClick}>
                  3
              </button>
        )
}




//------------------------------------- USE CONTEXT() HOOK -------------------------------------
// you can pass state object and setState() to child components by using createContext() and useContext()
//its a good idea to export const StateObject = createContext() if you are modularizing your code
// Rememeber that its a good idea to use high order components to augment the App component with Context


// 1) ----- You should use a HOC to implement context in your application

//        ./Context
export const Context = createContext();

export default function ShareContext (App) {                                        //you pass the app component as an argument
    
    return () => {
        const [stateOne, setStateOne] = useState('');
        const [stateTwo, dispatch] = useReducer(reducer, initialState);            //you can implement your reducer in a different file

       const value = {
            stateOne, setStateOne,
            stateTwo, dispatch
        }

        return(
            <Context.Provider value={value}>                                        //make sure to surround the app with Context.Provider
                <App/>
            </Context.Provider>
        )
    }
}


// 2) -----  To use the Context in other files, you will need to import the Context object
import {Context} from './Context';
import React, {useContext} from 'react';

function AnotherComponent() {
    const {stateOne, setStateOne} = useContext(Context);                //you can use any variable or function in the value object ABOVE
   // ....
}



//------------------------------------- USE REF() HOOK -------------------------------------
// useRef() is a hook that can creates a constant reference to an element or can be used to store a value
// keep in mind that useRef() is a way to bypass the virtual DOM and directly access the underlying element in the real DOM
// this hook does not cause a re-render everytime it gets updated
// useRef() is very similar in concept to querySelector()

function App() {
    const inputElement = useRef();
    const DivElement = useRef();

    useEffect(()=>{
        console.log(inputElement.current);                   //this will log <input type="text">
        console.log(inputElement.current.value);             //this will return the value that the user typed in the input box
        console.log(inputElement.current.getAttribute("type"))//keep in mind that you can use any method in the DOM with useRef()
    })

    return(
        <> 
            <input type="text" ref={inputElement}/>
            <div ref={DivElement}> </div>
        </>
    )
}


//TIP: useRef() can be used to store a counter or some value that can be updated
function Ref() {
    const [count, setCount] = useState(0);
    const myRef = useRef(0);            //you can pass any type of argument; string, objects, arrays, numbers.

    useEffect(() => {
        myRef.current += 1;             //this doesnt cause a re-render, this can be used to track the number of times something happens
    })

    return(
        <>
            {count}
            <button onClick={()=>setCount(count + 1)}> Click here</button>
            {myRef.current}
        </>
    )
}


//you can also use useRef() dynamically like this..
function RefDynamically({product}) {                                    //product is an array of objects, each object has an img

     const myRef = useRef([]);
     
        
     return(
        <>
             
            {product.map((item, i) => {
                   return(
                        <div className={styles.product} key={i}>           
                            <img src={item.image} ref={(ref) => {allImages.current[i] = ref}}/>          //check out the ref attribute in this line      
                        </div>
                   ) 
            })}
             }                     
        </>
     )
}


//if you are planning on setting the styles of an element with useRef after the first render, its better to use useCallback to do this
function Ref() {
     const elementRef = useCallback((ref) => {
             if(!ref) return;
             
             else
                 //you can style the element here after the first render, DO NOT USE A USEEFFECT FOR THIS
     }, [])
     
                
     return(
             <>
                <div ref={elementRef}> 
                                    
                </div>
            </>)

}



//------------------------------------- FORWARD REF() HOOK -------------------------------------
//you can use useRef() and forwardRef() together to make a parent component have control over an element in a child component
//keep in mind that forwardRef() on a component has the same functionality as a regular React component,
//the only difference is that you can now pass a ref along with the props


function ParentComponent() {
    const someRef = useRef();
        
     useEffect(() => {
        someRef.current;                //someRef.current now references the <div> element in the ChildComponent
        
     })    
        
    return(
        <ChildComponent ref={someRef}>
    )    
}

//syntax is different, but this is still a react component
const ChildComponent = forwardRef((props, ref) => {
        return(
           <div ref={ref}> greetings </div>
        )
})






//------------------------------------- USE IMPERATIVE HANDLE() HOOK -------------------------------------
//useImperativeHandle() was designed to be used together with forwardRef(), it enables the parent component to access MULTIPLE refs from the child component
//also keep in mind that the parent component can access ANYTHING from the child component, including state


function ParentComponent() {
     const example = useRef();
        
     const handleClick = () => {
        example.current.inputOne;               //you are calling the inputOne method inside useImperativeHandle() in the child component, the () is not necessary
        example.current.inputTwo;               //this returns one of the refs in the child component
        example.current.inputThree.value;
     }   
        
     return(<ChildComponent ref={example} onClick={handleClick}/>)
        
}

const ChildComponent = forwardRef((props, ref) => {
     const inputOne = useRef();
     const inputTwo = useRef();
     const inputThree = useRef();
        
     useImperativeHandle(ref, () => ({
        get inputOne(){
              return inputOne.current
        }
        get inputTwo() {
              return inputTwo.current;                 
        }
        get inputThree() {
              return inputThree.current;
        }
     }));


     return(
             <div>
                <input ref={inputOne}/>
                <input ref={inputTwo}/>
                <input ref={inputThree}/>
             <div>
     
     )


});


//------------------------------------- USE REDUCER() HOOK -------------------------------------
// useReducer() can be used to extract state management logic out of a component
// however, the component will still be a statefull componenent, because it still owns the state object
// this hook must be used with useContext hook to pass down state and the dispatcher

// this is the object that will contain the values to initialize the state object 
const initialState = {           
    list: []
}

// this is the reducer, this is where the state management happens
// it will return the new state object
function reducer (state, action) {
    const stateList = state.list;

    switch(action.type) {
        case 'addItem':
            return {list: [...stateList, action.item]}
        case 'removeItem':
            return {list: stateList.filter((item) => {                      //filter can be used to remove elements from an array
                        return item != action.item;                         //if this returns false, then the new array will NOT contain the item
                })
            };
        default:
            return state;        
    }
}

function MyComponent() {
    //dispatch is a function that will dispatch an action to the reducer
    const [state, dispatch] = useReducer(reducer, initialState);           

    const actionOne = {            //this is the object that defines how we want to update the state object
        type: 'addItem',          //can be increase, decrease, add, remove, etc...
        item: 'dodge dart 2014'
    }

    const actionTwo = {
        type: 'removeItem',
        item: 'dodge dart 2014'
    }

    return (
        <>
            <button onClick={()=> dispatch(actionOne)}> Click here to dipatch</button>
            <button onClick={()=> dispatch(actionTwo)}> Click here to dipatch</button>
        </>  
    )
}



//------------------------------------- USE CALLBACK() HOOK -------------------------------------
//useCallback() can be used to force a function to only be recreated when a certain variable changes
//useCallback() was designed to be used with a memoized component(component that gets exported with memo())
//keep in mind that everytime a component get re-rendered, the functions get recreated, which can potentially affect performance
// when the functions get re-created, it will cause a change in the props if the function is being passed as props
//this hook is similar to useMemo(), but the main difference is that... 
//useCallback() returns a function
//useMemo() returns a value

function UsingCallbackHook() {
        
   const handleClick = useCallback(() => {                       //this event handler will only be recreated when the second argument's variable changes
          console.log("you clicked on this button")             //in this case, the variable is []... so this means that the function will only be recreated ONCE
    }, []);
        
    return(
        <>
           <button onClick={handleClick}> click me </button>
        </>
    )
}






//------------------------------------- USE MEMO() HOOK -------------------------------------
// useMemo() can be used to force a function to run only when a certain state/object has changed
// this hook should be used for functions that require alot of processing power or just take a long time

function UsingMemo() {
    const [firstCount, setFirstCount] = useState(0);
    const [secondCount, setSecondCount] = useState(0);
        
    //below is a good use of useMemo() hook     
    const calculation = expensiveCalculation();                                 //this function will be called every time there is a re-render, this can affect performance                             
    const calculation = useMemo(() => expensiveCalculation(), [secondCount]);   //to solve this problem, we can useMemo() on the function, now the function will
                                                                                //only be called when secondCount changes
        
    const addFirstCount = () => {
        setFirstCount((prevCount) => prevCount + 1)
    }

    const addSecondCount = () => {
        setSecondCount((prevCount) => prevCount + 1)
    }
    
    return(
        <>
            <button onClick={addFirstCount}> add the first count: </button> {firstCount}
            <button onClick={addSecondCount}> add the second count and call expensive calculation:</button> {secondCount}
            <br/>
            {calculation}
        </>
    )
}

function expensiveCalculation() {
    let num = 0;
    for(let i = 0; i < 1000000000; i++) {
        num++;
    }

    return num;
}


//------------------------------------- USEID() HOOK -------------------------------------
// useID() can be used to generate a unique id

function App() {
        const myID = useId()
        
        return(
               <div id={myID}> 
                        
                </div>
        )
}

//------------------------------------- CUSTOM HOOKS -------------------------------------
// Custom hooks are designed to share code between functional components


function useFetch(url) {
      const [data, setData] = useState(null);           

        const makeFetch = () => {
             fetch(url)
                   .then((response) => response.json())
                   .then((data) => setData(data))
                   .catch((error) => {setData(error)})
        }
        
        useEffect(() => {
               makeFetch();
        }, [url])
        
        return [data, makeFetch];                               //the state must be returned from this hook to cause a re-render on the parent component
}                                                               //you can also pass the setData function to cause a re-render in this hook AND the parent component
















//=========================================== MEMO() ================================================
// memo() is used to force a function to only re-render when its props have changed, this can improve performance.

//look at the example below...
//DisplayList() component will continue to re-render when MyApp() is re-rendered, even though its props havent changed, this can cause performance issues
//to solve this problem, you can use memo(DisplayList) while exporting a component to make it only re-render when its props value changes


//---------anotherFile.js---------
import {memo, useCallback} from 'react';

function DisplayList(props) {
     console.log("component rendered");                      
    return(
        <>
            <p> "this should only be rendered when the props change"</p>
        </>
    )
}
 export default memo(DisplayList);                    //now, DisplayList will only update when its props changes


//----------index.js----------------
import DisplayList from 'anotherFile.js';
        
function MyApp() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1)
    };
    
    const handleClick = useCallback(() => {          //REMEMBER, you must use useCallback() on event handlers that are passed as props to a memoized component
        alert("you clicked here")                    //these even handlers are recreated every time there is a render, so that means the props have actually changed
    },[])

    return(   //we only want <DisplayList /> to re-render when its props have changed
              // even though the parent component will be re-rendered everytime we click on the button below
              // DisplayList will not re-render because its props havent changed
        <>
            <DisplayList onclick={handleClick}/>                  
            <button onClick={increment}> increment </button>                    
        </>
    )
}

