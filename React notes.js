import React, { useEffect, useState, createContext , useContext, useRef, useReducer, useMemo, useCallback, } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams, useNavigate } from 'react-router-dom';


/* 
        steps to initialize React in your application
            
            1) npm init -y                  //creates package.json

            2) npm install react            //installs the react library
               npm install react-dom        //installs the react dom library 
            
             3) npm install webpack --save-dev       //installs webpack core
               npm install webpack-cli --save-dev   //install webpack command line interface (terminal stuff)
               npm install webpack-dev-server --save-dev 
               
             4) npm install @babel/core --save-dev          //installs the core files for babel (@ means that the package comes in modules)
                npm install babel-loader --save-dev         //installs a loader that webpack uses to transpile JS code into valid JS code
                npm install @babel/preset-react --save-dev  //installs a group of plugins that will transpile JSX into valid JS
                npm install @babel/preset-env --save-dev    //installs a group of plugins that will transpile all the new features of JS 
               
              5) npm install html-webpack-plugin --save-dev  //installs a plugin that will create an html file in the /dist folder based on a template we have in /src
               
              6) npm install css-loader --save-dev                    //installs the loaders for css files and <style> tags
                 npm install style-loader --save-dev
               
              7) configure webpack   (look at webpack notes for more info)
              
              8) In your package.json file, write the following scripts
                     "start": "webpack-dev-server --mode development --open",
                     "build": "webpack --mode production"
              
              8) create /src folder with index.js and index.html (index.html must have <div id="root"> </div>)
              
              9) generally, index.js will have..
              
                 import {App} from './components/App.js'
                 const root = ReactDOM.createRoot(document.getElementById('root'));
                 root.render(<App/ >)
                 
               10) then you should create a /components folder that will have all the functions and classes that are exported
               
               
               
               
         IF YOU DECIDE TO USE PARCEL AS THE BUNDLER, there is a few differences to note here
               
               1) npm install parcel
               
               2) the entry point of the application will be the index.html file and NOT the index.js
               
               3) the index.html file must include a <script type="module"> tag that imports the index.js file 
               
               4) parcel will install babel for you
               
               
               
               
         Alot of the times, you will use icons for your applicatons, here are the steps to install Font Awesome
         
                1) npm install @fortawesome/fontawesome-svg-core    @fortawesome/free-solid-svg-icons    @fortawesome/react-fontawesome
               
                1.5) npm install   @fortawesome/free-brands-svg-icons                           this package includes icons for social media
               
                2) import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
                   import {faHouse, faMagnifyingGlass, faCartShopping, faUser, faX} from '@fortawesome/free-solid-svg-icons'; 
                                
               2.5) import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';             for social media icons
                   import {faTiktok, faTwitter} from '@fortawesome/free-brands-svg-icons'
               
               
                3) <FontAwesomeIcon icon={faMagnifyingGlass} className={myClass}/>
*/      



/* 
                                        COMPONENT RE-RENDERING PROCESS
                 1) User interacts with App. Let us say the user clicks a button.

                 2) state object is updated because the button triggered a setState()

                 3) DOM is updated 
                 
                 3.5) cleanup function from useLayoutEffect() is called here, and then useLayoutEffect() is then called here
                 
                 4) changes are painted on the screen
                 
                 5) cleanup function is invoked to clean up effects from previous render (clean up function it the callback that is returned from useEffect())
                 
                 6) useEffect() is then called
*/


/* 

                                                                VIRTUAL DOM
                    The virtual DOM is an exact copy of the REAL DOM, but it is used by React developers to 'mutate' the real DOM 
                    in the most efficient way possible. Everytime we update the virtual DOM, what happens is that React will generate
                    ANOTHER virtual DOM with the changes that we made, and will compare the new virtual DOM with the old virtual DOM,
                    and calculate the most minimal way to update the real DOM. This in turn will increase performance of the application

                                                             
*/
























//=========================================== IMPORT STATEMENTS =========================================== 

/*                                              CODE SPLITING
         Instead of downloading the entire app before users can use it, code-splitting allows you to split your code into 
         small chunks which you can then load on demand. React achieves this by using the React.lazy() and React.suspense()
         
         Code Splitting is also the idea of breaking down the UI into different components
*/




//--------------------------------------------DEFAULT IMPORT------------------------------------------------
//each file can only have ONE export default

// ./HomePage.js
export default Home;


// ./App.js
import Home from './HomePage.js';                      //this only works if 'HomePage' file has a 'default export'
import HomeComponent from './HomePage.js'              // you can use any name for the component that was exported with default



//----------------------------------------------NAMED IMPORT-------------------------------------------------------
//a file can export as many components/variables as you want

// ./HomePage.js
export Home;
export const number = 34;


// ./App.js
import {Home} from './HomePage.js';                         //this will work
import {HomeComponent} from './HomePage.js'                 //this will NOT work because HomePage.js is not exporting HomeComponent
import {number as myNumber} from './HomePage.js'            //this will work


//--------------------------------------------- DYNAMIC IMPORT ----------------------------------------------
//instead of importing a moduleA with the import statement, you can dynamically load a module at runtime with the module() function
//import() is a built-in function for JS

function DynamicImport {
        
          const handleClick = () => {
                import('./moduleA')                     //this will return a promise
                      .then(({ moduleA }) => {
                        // Use moduleA
                      })
                      .catch(err => {
                        // Handle failure
                      });
          };

          render() {
            return (
              <div>
                <button onClick={this.handleClick}>Load</button>
              </div>
            );
          }
}


//---------------------------------------------- LAZY LOADING ----------------------------------------------
//lazy loading is the technique of making certain parts of a website have a delay in loading, instead of having the entire website load in one go.
//this can greatly improve loading time for a website

import {lazy} from 'react';

const ProjectSection = lazy(() => import('./ProjectSection'));          //you pass a callback and you wrap arround the directory of the folder with import()




































//-----------------------------------------REACT DOM -----------------------------------------------------------------------------------------
//When React first renders all components, it creates a VIRTUAL DOM with react.createElement and all the elements will be initially placed in the real dom
//when React notices that a component has been updated (state was updated, which causes a re-render), it will generate another VIRTUAL DOM
//then the two virtual DOMS get compared and react will calculate the best and most efficient way of update the real DOM


import ReactDOM from 'react-dom/client';             //importing methods from built in packages in react
import App from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));  //root is an element from the HTML file that will be managed by the REACT DOM
root.render(<App /> )                                       //using render() method to print a string onto the root, you can print any expression or REACT element










            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            





//------------------------------------------- JSX syntax ---------------------------------------------------------------------------------------------
//JSX stands for Javascript syntax extension, it was designed by React for the purpose of using HTML syntax in a javascript file
//this greatly improves readability.
//once you have written your JSX code (usually in the return statement of a function component or in the render() of a class component)
// React will then convert the JSX code into React.createElement(), which will actually create an element in the DOM

//remember, any valid javascript expression is allowed inside {}    
//the attributes used in JSX are very similar to the regular attributes in HTML
//but most are written in camelCase
            
function UsingJSX() {
        
        //you can use any html semantic tag in JSX, the only difference is that some of the attributes are spelled differently
        return(
               <>
                   <h1 className="someClass"> 
                        "hello," + {name} 
                   </h1>
                   <a href={"http://www.google.com"}> 
                       "click here" 
                   </a>
                   <p> 
                       {example()} 
                   </p>    
                   <div>                                                       
                        <p>
                           "you can create elements with children"
                        </p>
                        <p>
                           "like this as well"
                        </p>
                   </div>
               </>     
        )
}
            
         
//JSX will get transpiled to the function below by babel
const element = React.createElement(
    'h1',                                                       //tag name
    {className: "myClass"},                                     //attributes
    'hello, world'                                              //content
)






























//----------------------------------------------------- && and Ternary operators--------------------------------------------------------------------
// You can use logical operators inside {} in JSX
// {true && expression} will always return the expression
// {false && expression} will not return anything

{true && <MyComponent />}                   //MyComponent will render
{false && <MyComponent />}                   //MyComponent will not render

//there may be some bugs with using && operators in React
//take a look at the example below...
//lets assume that the array has numbers and null values
//what we want to do is iterate through the values and only display the numbers
//but the problem here is that the code below will not display 0 because it is considered a falsey value

array.map((val, i) => {
        return {val && <div> {val} </div> }             //the bug here is that we will not display 0, even though it is a number
})
      
 
//It is considered good practice to use Ternary operators instead of &&
 {true ? <div> "true" </div> : <div> "false" </div> }




 
 
 
 
 
 
 
 
 
 
 
 






//========================================================== ERROR BOUNDARIES =================================================
 // Error Boundaries are basically class components that will catch any errors that are thrown in any child component
 // The idea is to wrap your entire application with these Error Boundaries and it will automatically detect any errors thrown from the child
 // keep in mind that the try catch block will only work with vanilla JS, look at the example below
 
 // 1) ------  this is completely fine, this will catch any errors thrown by the server
 function App() {
        const [state, setState] = useState({});
         
         useEffect(() => {
              try{                                              
                 fetch('url')
                      .then(response => response.json())
                      .then(results => setState(results))
              }   
              catch(error){
                console.log(error, 'AN ERROR HAS OCCURED');
              }
         }, [])
         
         return(
                 <>
                   {state}
                </>
         )
 }
  
// 2) ------- however, this is NOT fine because the catch block will not catch any errors thrown by the component
function Publications() {
          try {
               return (<SomeComponent/>)                      //any errors thrown here will NOT be caught by the catch block below
            ))
          } catch (error) {
                 return (<> 'AN ERROR HAS OCCURED' </>)        
          }
}


 // 3) ------- one way to use error boundaries is in the following code
 // keep in mind that the <ErrorBoundary/> will automatically catch errors in the components nested within
 
 import ErrorBoundary from './ErrorBoundary.js';
 
 function App() {
       return (                 {/* ErrorBoundary will not catch errors from event handlers, Asynchronous code*/}
            <>  
              <ErrorBoundary>                 
                    {/* the rest of your application */}
              </ErrorBoundary/>
            </>
  )
}
  
// ./ErrorBoundary.js
 class ErrorBoundary extends Component {
         constructor(props) {
            super(props);
            this.state = { error: false, errorMessage: '' };
         }
         
         static getDerivedStateFromError(error) {
            // Updating state (this method will automatically catch errors in the child component)
            return { error: true, errorMessage: error.toString() };
          }

          componentDidCatch(error, errorInfo) {
            // Log error to an error reporting service like Sentry
            console.log({ error, errorInfo });
          }

          render() {
            const { error, errorMessage } = this.state;
            const { children } = this.props;

            return error ? <ErrorFallbackUI {...{ error, errorMessage }} /> : children;
          }
}


















//============================================================================= REACT CLASSES ======================================================================================================================
//classes are to be replaced with hooks****


//extends means that ClassComponent is the child of React.Component
 //so that means that ClassComponent can inherit the methods and properties from React.Component
class ClassComponent extends React.Component {

    constructor(props) {
        super(props);                                        //we should always call the parent constructor of a class component because it will let us use the variables declared in the parent constructor (props)
        this.state = {value: 0};                             //state is an object that stores data that should only be changed by this component
        this.handleClick = this.handleClick.bind(this);      //you should always bind(this) with event handlers because 'this' gets lost in the event handlers
        this.handleChange = this.handleChange.bind(this);
    }
 
    static getDerivedStateFromProps(props, state){        //lifecycle method that is called before the first render and after every render, and is used when the state is dependent on props
        if(props.value !== state.value)
              return {value : props.value};                             //this will be the new state
        else
             return null;                                               //no changes are made to state
    }
        
X   componentDidMount() {                                   //lifecycle method that is called ONLY after the first render
    }
      
    shouldComponentUpdate(nextProps, nextState){           //lifecycle method that determines if the component will update or not
            if(this.props.val == nextProps.val && this.state.value == nextState.value)
                  return false;                                         //will NOT update
            else
                 return true                                            //will update
    }    
        
    getSnapShotBeforeUpdate(){                             //lifecycle method that is called before every render (but not before the first render)
    }                                                                                     //anything that is returned from this function will be passed to compondentDidUpdate as an argument
        
        
X   componentDidUpdate(prevProps, prevState, snapshot) {                                  //lifecycle method that gets called after every render, except the first render
    }

X   componentWillUnmount() {                                //lifecycle method that will be called after the component has been removed from the DOM
    }

    handleState(item) {                                     //event handler
        this.setState(item);                                //React will then call render() because setState() will always cause a re-render
    }                                                      
                                                         

    handleClick() {                                         //event handler
        this.setState({value: 1})                           //using the setState() will update the state object and cause a re-render
    }

    handleChange() {                                        //event handler
        this.setState(                                      //you can use the setState() to access the previous state value and props
            (prevState, props) => ({value: prevState.value + props.value}));   
    }


    render() {
        //any data manupulation can go here
        let currentState = this.state.value;            //accessing state object
        return (
            <div>
                <h1> state object is: {currentState} </h1>
                <SomeComponent state={this.state} changeState={this.handleState}/>      //this is typically how you pass state and setState to components
            </div>            
        )
    }
}
 

//----------------------------------------------------------- PURE COMPONENTS---------------------------------------------------------
//Pure Components are class components that extends Pure.Component
//These components do NOT rely on variables/objects defined outside of its scope
//These components will automatically re-render IF the previous state/props 
// is different that the new state/props. If its not different, then the component will not re-render


//this component will only be re-render if props is different from the previous props
class PercentageStat extends React.PureComponent {
        
   //shouldComponentUpdate(){}                  //you dont have to use this lifecycle method anymore in pure components            

  render() {
        const { label, score = 0, total = Math.max(1, score) } = this.props;

        return (
             <div>
                 <h6>{ label }</h6>
                 <span>{ Math.round(score / total * 100) }%</span>
            </div>
    )
  }

}























//============================================================================== REACT HOOKS ===========================================================================================================================
//import React, { useEffect, useState, createContext } from 'react';
//hooks are functions that let you 'hook into' React features from function components




//----------------------------------------------------------------USE STATE HOOK---------------------------------------------------------

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



//------------------------------------------------------------- USE EFFECT HOOK-----------------------------------------------------
// useEffect() is a combination of ComponentDidMount, ComponentDidUpdate, ComponentWillUnmount
// this function gets called after the first render, after every re-render, and once the component is unmounted from the DOM
// you can have multiple useEffect() hooks in the same function component, this is useful for separating unrelated code and uniting related code
//its a good idea to use the useEffect hook AFTER you call the setState() function
function HooksThree() {  
        
    useEffect(() => {
       let button =  document.querySelector(".someButton");                              //this gets called after the first render and after every re-render       
       button.addEventListener("click", nameOfFunction);
            
       return () => {                                                                   //unmounting before every re-render
            button.removeEventListener("click", nameOfFunction)            
        }
    }, [count]); //if you specify a second argument in useEffect(), then useEffect() will only RE-RUN if this variable changes value, if its [] empty, then useEffect() will only run once
           
    return (
        <>
            <button className="someButton"> click me </button>
        </>                         
    )                               
}           


//------------------------------------------------------------USE LAYOUT EFFECT HOOK----------------------------------------------------------------
//useLayoutEffect is similar to useEffect(), the difference here is that useLayoutEffect() gets called BEFORE each render.
//this is usefull if you want to make changes to the DOM after the state object is updated.
//using useEffect to make changes to the DOM can cause a flickering effect
//useLayoutEffect can prevent this



function Example() {
        
        useLayoutEffect(() => {
             const document.querySelector("div").innerHTML = 5;                 //this is typically how you want to use useLayoutEffect()
        })
        
        return(
              <div>
                  3
              <div>
        )
}







//------------------------------------------------------------ USE CONTEXT HOOK --------------------------------------------
// you can pass state object and setState() to child components by using createContext() and useContext()
//its a good idea to export const StateObject = createContext() if you are modularizing your code
// Rememeber that its a good idea to use high order components to augment the App component with Context



// 1) ----- This component is similar to a redux reducer, it has event handlers that can update the state and any component can call these functions

//      /app.js
export const Context = createContext();         // <----- you will need to export the Context object to other components so they can use the global state       
export function App() {
    const [list, setList] = useState([{id: 'abel', data: 45}, {id: 'david', data: 43}, {id: 'john', data: 67}]);
        
    const deleteItem = (id) => {                        
        setList(list.filter((item) => {
             if(item.id == id)
                  return false;
             else
                  return true;
        }))
    }
    const addItem = (newItem) => {
           setList((prevList) => {
                return [...prevList, newItem];
           })
    }
    return(                                     //all components can use the state and functions that are passed as an object to the value attribute
            <>
                <Context.Provider value={{list, deleteItem, addItem}}>    
                    <AnotherComponent/>                        
                </Context.Provider>    
            </>
    )
}


// 2) -----  To use the Context in other files, you will need to import the Context object
import {Context} from './App.js';
import React, {useContext} from 'react';

function AnotherComponent() {
    const {list, addItem} = useContext(Context);                //you can use ALL the functions and state that was passed in the value prop ABOVE
        
    const addToList = () => {
        addItem({id: 'carlos', data: 98});
    } 
        
    return(         
        <h2>
            <button type="button" onClick={() => setState("this is now different")}> Click here</button>
            {state} 
        </h2>
    )
}



//----------------------------------------------------------- USE REF HOOK -----------------------------------------------------
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



//--------------------------------------------------------FORWARD REF()---------------------------------------------------------------------------
//you can use useRef and forwardRef together to make a parent component have control over an element in a child component
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

//------------------------------------------------------USE IMPERATIVE HANDLE HOOK-----------------------------------------------------------------
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


//---------------------------------------------------- USE REDUCER HOOK ------------------------------------------------------------------
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
    //accessing the two properties in our state object
    const stateList = state.list;

    //using a switch statement to determine what to do with the state object
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

//below is the syntax for a component that uses a reducer
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
            //the buttons below will dispatch actions to the reducer
            <button onClick={()=> dispatch(actionOne)}> Click here to dipatch</button>
            <button onClick={()=> dispatch(actionTwo)}> Click here to dipatch</button>

            //the component below and all of its child components will be able to use the reducer and the state
            <StateObject.Provider value={{state, dispatch}}>
                    <SomeComponent />                           //make sure to use view notes about useContext()
            </StateObject.Provider>
        </>  
    )
}



//-------------------------------------------------- USE CALLBACK HOOK ----------------------------------------------------
//useCallback() can be used to force a function to only be recreated when a certain variable changes
//useCallback() was designed to be used with a memoized component(component that gets exported with memo())
//keep in mind that everytime a component get re-rendered, the functions get recreated, which can potentially affect performance
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






//-------------------------------------------------- USE MEMO HOOK -------------------------------------------------------------
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




//------------------------------------------------ MAPPING LIFECYCLE METHODS WITH REACT HOOKS----------------------------------------------------------------

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
    return () => {};       //componentWillUnmount
})





































//=========================================================== MEMO ===========================================================================================
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






































//------------------------------------------------------ CUSTOM HOOKS --------------------------------------------------
// you can create your own custom hooks that encapsulates stateful behavior (calculating something) and makes code reusable

//in the example below, we are reusing a function that can 'fetch' data from an external server
function useCustomHook(URL) {
    const [custom, setCustom] = useState(null);
    
    useEffect(() => {
       fetch(URL)
            .then((response) => response.JSON)
            .then((data) => setState(data))
    },[URL])
        
  return [custom];
}

function ExampleWithCustomHooks() {
    const [data] = useCustomHook("https://jsonplaceholder.typicode.com/todos");
    return (
        <>
             {data && data.map((item) => {return <p key={item.id}> {item.title} </p> })} 
        </>
    )    
}

function AnotherExampleWithCustomHooks() {
    const [data] = useCustomHook("https://someServer.whatever.com/someData");
    return (
        <>
            {data && data.map((item) => {return <p key={item.id}> {item.title} </p> })}  
        </>
    )
}



    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    
    
//============================================================ CHANGING THEMES ========================================================================
//you can use css variables to change the styling of elements from one theme to another
    
 // styles.css
 
 :root{
     --loading-light: grey;
     --loading-dark: purple;
 }
 
        
        
 
 // changeTheme.js
        
 const lightTheme = [
    "--bg-color: white",
    "--text-color: black",
    "--box-shadow: red",
    "--loading-theme: var(--loading-light)"                             //you can also use var() to assign other variables 
  ];
  
 const darkTheme = [
    "--bg-color: black",
    "--text-color: white",
    "--box-shadow: purple",
    "--loading-theme: var(--loading-dark)"
];
  
    
    
function ChangeTheme(turnSwitch) {
    const root = document.getElementsByTagName("html")[0];
    let theme;

    if(turnSwitch)
        theme = darkTheme
    else
        theme = lightTheme;

    root.style.cssText += theme.join(";");                              //cssText lets you re-assign the values of css variables
        
}
    
    
    
    
    
    
    
    
    



    

//======================================================================== REACT ROUTER ===========================================================================================================================
//npm install react-router-dom
    
    
//const navigate = useNavigate();                   
//navigate("/aboutUs", {state: {data: "whatever"}});     //  will navigate to the '/aboutUs' component and pass {data: "whatever"} to another component

//const {state} = useLocation();                         // '/aboutUs' component can use useLocation() to access the data being passed from navigate()
    
function RouterStuff() {
    return(
            
         <BrowserRouter>     
                <NavigationBar/>                                                //you can also define a NavigationBar component like this
                <Routes>                                                        //and when you click on one of the <Link>'s in the NavigationBar component
                        <Route index element={<HomePage />}>                    //it will automatically activate one of the corresponding routers below
                        <Route path="/AboutUs" element={<AboutUs />}>           
                        <Route path="/Contact" element={<ContactUs />}>
                        <Route path="/DonateUs" element={<DonateUs />}>
                </Routes>
         </BrowserRouter>
            



        <BrowserRouter>  
            <NavigationBar/>                    
            <Routes>
                {/* This router will always be rendered first, index is the same as path="./" */}                
                <Route index element={<Home/>}/>                                
                    
                {/* (1) The parent Route has an <Outlet> that will be replaced by one of the nested Routes below*/} 
                <Route path="/ContactUs" element={<NestedNavigationBar/>}>      
                     <Route path="/ContactUs/email" element={<EmailUs/>}/>           
                     <Route path="/ContactUs/call" element={<CallUs/>}/>            
                </Route>

                {/*(2) This Route will send a URL parameter to the Route below*/}
                <Route path="/:repoName" element={<Whatever/>}>
                <Route path="/DonateUs" element={<DonateUs />}/>                
                <Route path="/DonateUs/:repoName" element={<ThankYou />}/>      {/* :repoName is a placeholder, it can be sent as useParam() to the <ThankYou /> */} 
                <Route path="/DonateUs/:repoName/:otherRepoName" element={<Whatever/>}   
 
                {/*(3) This nested route has nested routes that will each pass a url parameter to the other */}
                <Route path="/Complaints" element={<Complaints>}>
                        <Route path="/Complaints/:pageOne" elements={<PageOne/>}>
                        <Route path="/Complaints/:pageOne/:pageTwo" elements={<PageTwo/>}>                           
                </Route>
 
                 {/* (4) This Route can be used for error handling*/}
                 Route path="*" element={<NoPage />}/>                          {/* <Route path="*">  will only be rendered if the page requested does not exist*/}
            </Routes>
        </BrowserRouter>
    )
}




function NavigationBar() {
    return(
        <>
            <Link to="/" className="example"> Home</Link> <br/>               {/*you can style the links with className attribute*/}
            <Link to="/AboutUs" className="example"> About Us</Link><br/>
            <Link to="/ContactUs" className="example"> Contact Us</Link><br/>
            <Link to="/DonateUs" className="example"> Donate Us</Link> <br/>   
            <Link to="/thisCanBeAnything" className="example">Cancel Us </Link>   {/*this Link will target the route with path="/:repoName" */}
        </>
    )
}

//--------------------------------------------------------- (1) ------------------------------------------------------------------------------------------- 
//nested Routes that will display and replace the <Outlet />
function NestedNavigationBar() {
    return(
        <>
            <Link to="/ContactUs/email" className="example">Email us</Link>  
            <Link to="/ContactUs/call" className="example"> Call us</Link>
            <Outlet />                                                          //this outlet will be replaced by one of the routers
        </>
    )
}
                           
                           
//------------------------------------------------------------ (2) ---------------------------------------------------------------------------- 
//Routes can pass URL parameters to other routes 
function DonateUs() {
    const navigate = useNavigate();                                //this hook is used to navigate to a different page, its useful if its used inside even handlers          
    navigate("/DonateUs/cash");                                    //this will have the same effect as <Link>
        
    return(
        <div>
            <Link to="/DonateUs/cash" className="example"> Cash </Link><br/>        {/* 'cash' will be passed to the useParams() in the <ThankYou /> component*/}
            <Link to="/DonateUs/credit" className="example"> Credit </Link><br/>    {/* 'credit' will be passed to the useParams() in the <ThankYou /> component*/}
        </div>
    )
}

function ThankYou() {                                       //repoName = "cash"  
    const {repoName} = useParams();                         //repoName is the URL parameter that was passed 'down' from <Route path="/DonateUs">                                                         
    const navigate = useNavigate();
    navigate("/DonateUs/" + repoName + "whatever")          //"whatever" is another URL parameter that will be passed 'down' to the whatever component
}

function Whatever() {
     const {repoName, otherRepoName} = useParams();                //repoName = "cash"    otherRepoName = "whatever"     
     const navigate = useNavigate();
     navigate("/DonateUs/" + repoName + otherRepoName + "somethingElse");   
     
}
//--------------------------------------------------------------- (3) ---------------------------------------------------------------------------------------

function Complaints() {
       const navigate = useNavigate(); 
       navigate("/Complaints/page-one");                        
        return(                                                 
            <>
               <Link to="/Complaints/page-one"> 
                <Outlet/>                                               //this will be replaced by the nested routes                 
            </> 
        )
}

function PageOne(){
     const {pageOne} = useParams();
     const navigate = useNavigate();
        
     navigate("/Complaints" + pageOne + "page-two")      
}

function PageTwo(){
     const {pageOne, pageTwo} = useParams();
     const navigate = useNavigate();
        
     navigate("/Complaints" + pageOne + Page)
        
}




//---------------------------------------------------------------- (4) ---------------------------------------------------------------------------------------
//default page that appears when the user accesses a page that doesnt exist

function NoPage() {return(<><p> 404: Page doesnt exist</p></>)}


















//--------------------------------------------- REACT-RESPONSIVE---------------------------------------------------
import {useMediaQuery} from 'react-responsive';
import MediaQuery from 'react-responsive';

function MediaQueries() {
      const mobile = useMediaQuery({query: "(max-width: 600px)"});
      
      return({mobile ? <>'you are on mobile' <> 
                      : <>'you are NOT on mobile'</>;
      )
}


function MediaQueriesWithComponents{
        
        return(
                <MediaQuery maxWidth={1224}>
                        <> 'You are on desktop'</>
                </MediaQuery>
                <MediaQuery minWidth={800}>
                        <> 'You are on mobile'</>        
                </MediaQuery>
                )

}
























//------------------------------------------------ JS-COOKIES---------------------------------------------------------------------------------------------------
//npm install js-cookies                this package lets you use cookies but with set and get methods
import Cookies from 'js-cookies';

function MyCookies () {
        
        Cookies.set("name", "jason");                   //same syntax for vanilla cookies
        Cookies.set("age", "23", {expires: 7});         //expires in 7 days
        Cookies.set("gender", "male", {path: ''});      //cookie is visible to the current page
        Cookies.set("mood", "happy", {domain: 'myWebsite.com'}; //cookie will be visible to this domain and all the sub-domains
        Cookies.set("searchResult", "funny video", {sameSite: strict}); //allowing to control whether the browser is sending a cookie along with cross-site requests.
        Cookies.set("birthplace", "san francisco", {expires: 5, path: '' }); //you can use multiple attributes for the third argument

        Cookies.get("name");                            //returns jason
        Cookies.get();                                  //returns all visible cookies

        //keep in mind that the only attributes that you have to include to remove a cookie, is path and domain
        Cookies.remove("name");                         //removes the name cookie
        Cookies.remove("gender", {path: ''})            //to remove the gender cookie, you will have to include the path used to create the cookie
}












//================================================== USING JSON DATA IN REACT ======================================================

// ./data.json

{
     "name" : "abel",
     "birthday" : "july 22, 1993",
     "age" : "29",
}

// ./index.js

const data = require('./data.json');                            //this will automatically parse the json into js for you
export default data;


// ./someComponent.js

import data from './data';




















//------------------------------------------------ PROPS -----------------------------------------------------------------------------------------------------------------------

//props means properties
//props are similar to attributes in HTML, 
//but props are used to pass data from one component to another
    
 function App() {
        //you can pass any type of data as props to other components
        const [state, setState] = useState("exmaple");                                  //for passing state, its best that you use useContext() hook       
        let someString = "passing this as props";
        const someEventHandler = (e) => {
             console.log(e.target);
        } 
       
        return (
             <HomePage myString={someString} myEventHandler={someEventHandler} state={state}/>
        
        )
 }
        
 function HomePage(props){
        props.myString;                                 //"passing this as props"
        props.someEventHandler();                       //event handler that was passed as props
        props.state;                                    //passing the state object to child components   
 }






























//----------------------------------------------------------------KEYS and UUID----------------------------------------------------------------------------------

// keys help React identify which list items have changed
// the 'key' property has a special meaning in React, 
// when you create an array of JSX elements, each element
// must have a unique key that identifies it.
// you can use any string as a key. but its best to use the 
// uuid api to create universally unique ID's 
        
import {v4 as uuid} from 'uuid';
        
function ListItem(props) {
    return <li>{props.value}</li>
}

function MakeList(props) {
    const numbers = props.array;
        
    return (numbers.map((number) =>
        <ListItem key={uuid()} value={number} />  
    ));
}

const numbers = [1, 2, 3, 4, 5, 6];

root.render(<MakeList array={numbers}/>);





//KEEP IN MIND that you should not use the index of a list item as a key.. take the example below

function Keys () {
     const [list, setList] = useState(["foo", "bar", "baz"]);
        
     const deleteItem = (e) => {
           const indexToDelete = e.target.key;  
           const newList = list.filter((item, index) => { 
                   if(index !== indexToDelete)
                       return false;
                   else
                        return true;
           })
           setList(newList);
     }        
       
      return(
             <ul>
                {list.map((item, i) => {
                     return(<li key={i} onClick={deleteItem}> {item[i]} </li>)
                })}       
             </ul>
      )  
}


//VISUAL presentation

/* 
        <ul>
                <li key=0 > 0 </li>        <---       //lets say we delete this item from the list
                <li key=1 > 1 </li>
                <li key=2 > 2 </li>
                <li key=3 > 3 </li>
        </ul>


        //deleting an item will cause a re-render, so we will have to iterate through the list again

        <ul>
                <li key=0 > 1 </li>                    // <li> 1 </li> used to have a key that was set to 1, but now it is 0
                <li key=1 > 2 </li>                    // all the list items have had their keys changed as well
                <li key=2 > 3 </li>                    // now React will look at this and will re-render all the items because their keys have changed
        </ul>


*/













































//------------------------------------------------- SYNTHETIC EVENTS and EVENT HANDLERS-------------------------------------------------------------------------------------------------------------------
//Keep in mind that React uses Synthetic events... 
// ...and all browsers have their own set of native events (onClick, onSubmit, onChange, etc...) 
// (although browsers all use the same name for the native events, some of them have different effects that are not consistent across all browsers)

//React uses a cross-browser wrapper object that is usually named 'e' (synthetic event)
//that pools together all the native events together and makes sure that the event works the same across all browsers
//The whole point of this is to improve compatibility between all browsers and react
//there may be cases where a native event may have a different



function EvenHandlers() {
        
     const handleClick = (e) => {
          e.target;
          e.preventDefault();
          alert("e is a synthetic event");
     }
     
     function handleClicked(){
          alert("e is a synthetic event")
     }

    return(
        <>              //event handlers are always camelCase attributes
              <button onClick={handleClick}> Click here </button>
              <button onClick={(e) => {handleClicked(e)}}> Click here </button>
        </>
    )

}






























//--------------------------------------------------------------------CONTROLLED COMPONENTS---------------------------------------------------------------------------

// Controlled components are components that bind its state to its input, select, textfields, etc...
// Uncontrolled components are components that dont bind its state to its input, select, textfields
// you have better control of what is being inputed by the user
// KEEP IN MIND, that the value attribute is ONLY for controlled components



// CONTROLLED TEXT FIELDS COMPONENTS
function Login() {                  
    const [password, setPassword] = useState(""); 
    const inputElement = useRef();
    let disable = password.length < 6 || password.match(/[a-zA-Z]/g) == null || password.match(/\d/g) == null || password.match(/\W/g) == null;   //password must has at least one leter, one digit, and must have a non alphanumeric character and must be greater than 6 characters  
             
    const handleFocus = () => {                                         //onFocus event is triggered when the user clicks on an input
       //you can do some styling here to indicate the input is focused on
    }

    const handleBlur = () => {                                          //onBlur event is triggered when the user clicks on something else that is not the input
        if(inputElement.current.checkValidity()){               
            //you can do some styling here to indicate the input is valid           
        }
        else{
            //you can do some styling here to indicate the input is invalid
        }
    } 
    
    const handleInvalid = (e) => {                                      //onInvalid event is triggered when the user click on submit and the input is invalid
        e.target.setCustomValidity(' ')                                 //this may remove the default message box that appears for invalid inputs
    }                                                                   //but make sure to pass an empty string to setCustomValidity('') when the user starts typing again
            

    const handleChange = (e) => {                                       //onChange event is triggered everytime the user types in something in the input
          setPassword(e.target.value);
    }
   
    useEffect(() => {
         inputElement.current.setCustomValidity('');                    //its a good idea to remove the invalid state of the input once the user starts typing again 
    }, [password])
  
    return(
        <>
            <form>
                <input 
                     type="password" 
                     onFocus={handleFocus} 
                     onBlur={handleBlur} 
                     onInvalid={handleInvalid} 
                     value={password} 
                     onChange={handleChange}
                     ref={inputElement}
                />
                <input disabled={disabled} type="submit" value="Login"/>      
            </form> 
        </>

    )
}





// CONTROLLED RADIO BUTTON COMPONENTS

function PaymentDetails() {
    const [payment, setPayment] = useState('eMoney')

    const handleChange = (e) => {
        setPayment(e.target.value);
    }

    useEffect(() => {
        if(payment === 'eMoney'){
            //you can do some styling here
        }

        else if(payment === 'cash on delivery'){
            //you can do some styling here
        }
    }, [payment])


    return(
        <form>
             <input 
                  type='radio' 
                  value='eMoney'
                  checked={payment === 'eMoney'}
                  onChange={handleChange}
                  name='paymentMethod'/>
                          
             <input 
                  type='radio'
                  value='cash on delivery'
                  checked={payment === 'cash on delivery'}
                  onChange={handleChange}                        
                  name='paymentMethod'/>
        </form>
    )
}






//CONTROLLED CHECKBOX COMPONENTS

function CheckBoxes() {
     const [blue, setBlue] = useState(false);
     const [red, setRed] = useState(false);
     const [yellow, setYellow] = useState(false);
        
     const handleBlue = () => {
        setBlue(!blue);
     }   
        
     const handleRed = () => {
        setRed(!red);
     }
     
     const handleYellow = () => {
        setYellow(!yellow);
     }
     
     useEffect(() => {
        if(blue)
             //you can do some styling here
     
     }, [blue])
     
     useEffect(() => {
        if(red)
             //you can do some styling here
     
     }, [red])

     useEffect(() => {
        if(yellow)
             //you can do some styling here
     
     }, [yellow])
     
     return(
            <form>
                   <input 
                       type="checkbox" 
                       onChange={handleBlue} 
                       checked={blue} 
                     />
                     <input 
                       type="checkbox" 
                       onChange={handleRed} 
                       checked={red} 
                     />
                     <input 
                       type="checkbox" 
                       onChange={handleYellow} 
                       checked={yellow} 
                     />
            </form>
     
     )
     
}



//--------------------------------------------------------- Uncontrolled Components --------------------------------------------------------------------
//Components that handle data WITHOUT its state binded to the inputs are called uncontrolled components
//You can use defaultValue attribute on uncontrolled inputs

function Uncontrolled() {
        const input = useRef("");
        
        const handleInput = () => {
                console.log(input.current.value);               //you can access the value of the input using Ref
        }
        
          
        return(        
            <form>
                <input ref={input}>
                <button onClick={handleInput}>
                       "Click here"        
                </button>
            </form>
        )
        

}



























//----------------------------------------------------------------COMPOSITION (using child components)---------------------------------------------------------------------------------------------
//remember that PROPS can accept any primitive value, React components and functions

//you can pass nested elements in JSX to function components
function CreateBorder(props) {
    return (                                                       
        <div style={{color: props.color}}>                      
            {props.children}                                         //props.children will be replaced by the nested elements
        </div>
    )                                                               
}                                                                   


function Dialog() {
    return (                                                        
        <CreateBorder color={"red"}>                                 /* everything inside <CreateBorder> </CreateBorder> will be passed as props.children */
            <h1> Welcome Home </h1>                                    
            <h2> Abel Muro</h2>
        </CreateBorder>
    )
}




























//======================================================= ADVANCED CONCEPTS IN REACT ===============================================










//---------------------------------------------------------------- RENDER PROPS ---------------------------------------------------------
//the idea with Render Props is to sharing code between react components by using props whose value is a function/component
// the whole point of render props is to re-use stateful behavior and pass the state down to the child components
// after it finishes manipulating the state

//Keep in mind that the example below will force 3 images to follow the mouse on the screen
//each of the three images will be in different components while the mouse component will
//use its state behavior to keep track of the mouse movements on the screen
//we essentially pass the 3 image components to the mouse component to position the images


//the state behavior of this component is now re-usable.
function Mouse(props) {
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
        
    const handleMouseMove = (e) => {                  //this is basically what we are sharing with the other components
        setMouseX(e.clientX);
        setMouseY(e.clientY);
    }
    
    useEffect(() => {                                 
        console.log(mouseX, MouseY);
    })
    
     return (      
        <div onMouseMove={handleMouseMove}>             // we are making {props.render()} dynamic, we can call ANY component like this
             {props.render({x: mouseX, y: mouseY})}    // <Cat mouse={this.state}/>    <Dog mouse={this.state}/>      <Bird mouse={mouse}/>                          
        </div>                                             
      );
}


//this component is receiving the state as props from another component (mouse is the state)
function Cat(props) {
     const mouse = props.mouse;        
     return (
           <img src="./cat.png" style={{position: "absolute", left: mouse.x, top: mouse.y }}>
     ) 
}


//this component is receiving the state as props from another component (mouse is the state)
function Dog(props) {
     const mouse = props.mouse;        
     return (
           <img src="./dog.png" style={{position: "absolute", left: mouse.x, top: mouse.y }}>
     )
}


//this component is receiving the state as props from another component (mouse is the state)
function Bird(props) {
    const mouse = props.mouse;        
    return (
         <img src="./bird.png" style={{position: "absolute", left: mouse.x, top: mouse.y }}>
    )
     
}

//<Mouse> is the component that we want to re-use for its stateful behaviour 
//<Cat> , <Dog>, <Bird> components will use the state behavior in <Mouse>
//mouse is the state variable that is passed from <Mouse> to <Cat>, <Dog> and <Bird>
function App{
    return (        
     <>
        <Mouse render={mouse => (<Cat mouse={mouse}/>)} />       
        <Mouse render={mouse => (<Dog mouse={mouse}/>)} />           
        <Mouse render={mouse => (<Bird mouse={mouse}/>)} />  

        <Mouse render={Bird}/>  //this has the same effect as above, calling the render prop in Mouse will still behave like a function that accepts the state
      </>                                                       
    );
}




















//----------------------------------------------------------------- HIGH ORDER COMPONENTS (HoC) ------------------------------------------------
//High order components are components that take in another component as an argument, 
// enhance it somehow, and then return the same component
//The whole point of these HoC is to re-use component behavior such as re-using event handlers and lifecycle methods


// 1) ------- this component will have its component behavior re-used over and over
function HoC(Input) {
        return function CreateNewInput(props) {                                         //Remember that this WHOLE function gets returned!                          
                const [state, setState] = useState("");                                 //now we can re-use this state variable

                const handleChange = (e) => {                                           //now we can re-use this event handler
                      setState(e.target.value)
                }

                useEffect(() => {                                                       //now we can re-use this useEffect()
                       console.log(state);
                },[])

                return(
                      <Input value={state} handleChange={handleChange} {...props}>      //these props are being passed to MyInput()
                )          
        }
}


// 2) ------- this component will be passed to the HoC, then it will be returned with new event handlers and lifecycle methods
function MyInput(props){
      return (
        <input type="text" {...props}/>         
      )                                     // if you are adding event handlers or state to this component with HoC() 
}                                           // it is essential that you add the props inline to the component's jsx


//3) ------- using HoC
function App(){
     const InputOne = HoC(MyInput);                          // instead of having six onChange handlers and 6 state objects        
     const InputTwo = HoC(MyInput);                          // each of these inputs will have their event handlers defined by the HoC                          
     const InputThree = HoC(MyInput);                        // keep in mind that these functions that are returned are the same
     const InputFour = HoC(MyInput);                         // as CreateNewInput() in the Hoc()
     const InputFive = HoC(MyInput);
     const InputSix = HoC(MyInput);
        
     return(                                                   //the style prop is being passed to CreateNewInput()   
        <>
             <InputOne style={{backgroundColor: 'red'}}/>                                  
             <InputTwo style={{backgroundColor: 'blue'}}/>
             <InputThree style={{backgroundColor: 'green'}}/>
             <InputFour style={{backgroundColor: 'red'}}/>
             <InputFive style={{backgroundColor: 'purple'}}/>
             <InputSix style={{backgroundColor: 'red'}}/>
        </>
     )   
}
























//------------------------------------------------------ LIFTING STATE UP ------------------------------------------------------
// Lifting state up is the idea that when two components rely on the same data in state, you can make those two components
// into siblings in a parent component, and then you can 'lift' the state up to the parent component instead of having 
// the state in both siblings


// 1) -------- take the example below....
//We have two functions that have the same state but its being used for different reasons
function DisplayList() {
        const [list, setList] = useState([1,2,3,4,5]); 
        return(
             props.map((value) => {
                   return(<div> {value} </div>)
             })   
        )
}

function DisplayListLength(props) {
        const [list, setList] = useState([1,2,3,4,5]); 
        return(
              <div> {props.length}</div> 
        )
}



//2) ---------- the example below is lifting state up to a common parent component.
// and is making the two components into siblings so they can share the state

function List() {
        const [list, setList] = useState([1,2,3,4,5]);  //this is considered lifting state up, now the 
        
        return(                                         
             <DisplayList list={list}>                         
             <DisplayListLength length={list.length}>
        )

}

function DisplayList(props) {
        return(
             props.map((value) => {
                   return(<div> {value} </div>)
             })   
        )
}

function DisplayListLength(props) {
        return(
              <div> {props.length}</div> 
        )
}



















//-------------------------------------------------------------------THINKING IN REACT--------------------------------------------------------

//React recommends that you break down a UI component into smaller components.
//the first step is to build a static version of the UI, that is.. only using props to pass down data from parent to child component
//the second step is to identify which data can be stored inside state, (data must be mutable data)
//the third step is to then implement the state object on the parent component, (identify where state should live)
//the fourth step is to actually change the state object with event handlers











