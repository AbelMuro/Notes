/* 
        React is a JS library designed to make User Interfaces on the front-end.

        Bookmarks:
                1) Features of React
                2) Steps to initialize a React app
                3) State
                4) Props (Child props, Prop validation)
                5) JSX
                6) React Lists (Keys)
                7) Synthetic Events and Event handlers
                8) Modularization (import and export statements)
                9) Components (Function Components, Class Components, Controlled Components, Uncontrolled Components)
                10) Virtual DOM (Client side rendering and server side rendering)
                11) Conditional Rendering
                12) React Hooks
                13) Memo()
                14) React Router
                15) Lazy Loading
                16) Suspense
                17) Server-side Rendering (Suspense on the server)
                18) Debouncing
                19) Advanced Concepts in React (Error Boundaries, Lifting State up, Render Props, High order components)


                                                             FEATURES OF REACT 

                                                            STATE CHANGE PROCESS
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

                                                                RECONCILIATION
                   Reconciliation is an algorithm that React uses to efficiently update the DOM. It starts by first mounting a component (and its element). 
                   React will then create an Virtual DOM in memory. When a state change occurs, React will generate another Virtual DOM. At this point, 
                   we have 2 Virtual DOMs in memory. React will use a process called 'diffing' to compare every node of both Virtual DOMs in memory,
                   and will decide which nodes to update in the Real DOM. Once React has decided which nodes to change in the Real DOM, it will decide
                   to either update, remove, or create nodes in the Real DOM. If a node needs to be updated, React will use a process called patching to 
                   update the node. If a node needs to be removed or created, React will simply delete the node or create a new node in the Real DOM

                                                                PATCHING
                   Patching is the process in React that updates nodes in the Real DOM when the state changes.
                   If a node was updated, React will not re-create the node, but instead just update it.
                   Keep in mind, patching is only used for nodes that have been updated. If a new node was detected by React,
                   React will simply create a new node in the Real Dom
        
                        function App() {
                          const [message, setMessage] = useState("hello world");
                          return <div>{message}</div>;
                        }
        
                   If we change the state above, React will not recreate the <div> element in the Real DOM, instead, it will only update it

                                                                 VIRTUAL DOM 
                    The virtual DOM is an exact copy of the REAL DOM, but it is used by React developers to 'mutate' the real DOM 
                    in the most efficient way possible. The virtual DOM is used in the Reconciliation algorithm to improve performance.                    

                                                                  LIFECYCLE
                    Lifecycle refers to the process that a component takes to be mounted onto the DOM and unmounted from the DOM.
                    The lifecycle has 4 main phases; Initialization phase,  Mounting phase, Updating phase, and the Unmounting phase. The initialization phase starts by creating 
                    the props, state, and functions of the component. The mounting phase begins by rendering the component onto the DOM. The updating phase begins 
                    when the state of the component is updated, thus triggering a re-render(stuff gets updated on the screen) on the component.
                    Then the umounting phase starts by removing the component (its JSX) from the DOM.

                                                            SYNTHETIC EVENT OBJECT
                     React uses an event object that is an instance of the SyntheticEvent class. The SyntheticEvent class is modeled after 
                     the native Event class in the browser, but it is used to ensure consistent behavior across web browsers.

                                     const handleClick = (e) => {                Using the e object will ensure the same behavior across web browsers
                                             e.preventDefault();                
                                             e.stopPropagation();
                                     }      

                                                             SYNTHETIC EVENT SYSTEM
                     React has its own implemenation of an event system that is similar to the native event system in the browser
                     When an event is triggered in the DOM, React will use a variation of Event Propagation.
                     Lets say that we have a button nested inside a div, the button was clicked and triggered
                     its on-click event. What happens next are the 3 main phases/steps of Event Propagation
        
                             1) Capturing Phase: React will look for the button element that initially triggered the event.
                                                 It starts at the top of the DOM tree (HTML) and works 
                                                 its way down until it finds the button element. If there are any event handlers
                                                 for the capturing phase in the parent elements, these elements will handle the event
                                                 before it reaches the button element

                                                 <div onClickCapture={handleClick}/>     //onClickCapture will call the function during the capturing phase
                        
                
                             2) Target Phase:  Once JS finds the button element, it will trigger the on-click event handler
                
                             3) Bubbling Phase: The event will then 'bubble' up to the top of the DOM tree. Starting from the 
                                                button element, then finally to the html element. If any element (html, div) has 
                                                an event handler attached, it will be triggered.   
                
                                                <div onClick={handleClick}>
          

                                                               ONE-WAY DATA BINDING
                    All data in a React app flows in one direction. Typically, the parent component can pass its state down as props to the child component.

                                                           COMPONENT-BASED ARCHITECTURE
                    React uses a component-based architecture, where every part of the UI is broken down into components. Every component is separate 
                    from other components, to the point that if a state change happens in one component, the other component will not be affected.
                    Each component will be responsible for its part in the UI.
                    
                                                               AUTOMATIC BATCHING 
                    Batching is when React groups multiple setState updates into a single re-render for better performance.
                    Lets say we have 4 setState() being called in succession inside of an event handler. React will automatically
                    group together these 4 setState() functions into one re-render. Keep in mind, if a setState() is called within a 
                    promise, setTimeout, or after using await; the setState() will NOT be batched.

                                                                 CODE SPLITING
                    Instead of downloading the entire app before users can use it, code-splitting allows you to split your code into 
                    small chunks which you can then load on demand. React achieves this by using the React.lazy() and React.suspense()
                    Code Splitting is also the idea of breaking down the UI into different components
                    
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

                                                               CLIENT SIDE RENDERING
                      Client side rendering is the process of rendering your application on your browser (React does this by default)           
                               1. First, we load the JavaScript to the client. When that has finished we can…                  
                               2. Fetch the data from the server. When that has finished we can….
                               3. We render the react components in the DOM… When that has finished we can…
                               4. We can use the application. — see the content on the page, click on things etc.
                                                           
                                                                SERVER SIDE RENDERING
                       Server side rendering is the process of rendering your application on the server and sending 
                       it to the client as fully rendered HTML pages 
                                1. First, we fetch data from the server for the entire application.                      
                                2. Then we render the HTML for the entire application in the server and send it to the client
                                3. Load javascript to the client for the entire application
                                4. Then Hydrate the page for the entire application (rendering components and attaching event handlers)                           
                        In React 18, suspense on the server (server-side rendering) is implemented by using the 'renderToPipeableStream' API
                        renderToPipeableStream() is a new API that allows you to render a React tree to a pipeable Node.js stream, 
                        which can improve the performance and user experience of server-side rendering          
                                
                        

*/



/* 
        Steps to initialize React in your application

            0) npx create-react-app my-app
            
            1) npm init -y                                                          //creates package.json
                   make sure to add "homepage": ".",                                //this will tell react to start looking for the deployed files at the '/' directory

            2) npm install react                                                    //installs the react library
               npm install react-dom                                                //installs the react dom library 
            
             3) npm install webpack --save-dev                                      //installs webpack core
               npm install webpack-cli --save-dev                                   //install webpack command line interface (terminal stuff)
               npm install webpack-dev-server --save-dev 
               
             4) npm install @babel/core --save-dev                                  //installs the core files for babel (@ means that the package comes in modules)
                npm install babel-loader --save-dev                                 //installs a loader that webpack uses to transpile JS code into valid JS code
                npm install @babel/preset-react --save-dev                          //installs a group of plugins that will transpile JSX into valid JS
                npm install @babel/preset-env --save-dev                            //installs a group of plugins that will transpile all the new features of JS 
                npm install postcss-loader --save-dev                               //installs a loader that will automatically transfrom your selector and styles
                npm install autoprefixer --save-dev                                 //installs a package that will be used with postcss-loader, autoprefixer will automatically apply any prefix vendors to your selectors in css (-webkit-, moz, etc..)

                        in webpack...

                                module: {
                                    rules: [
                                       test: /\.css$/,
                                       use: [{loader: 'postcss-loader'}]    
                                    ]
                                }

                        create a file postcss.config.js
                        
                                module.exports = {
                                    plugins: [
                                        require('autoprefixer')
                                    ]
                                }

               
              5) npm install html-webpack-plugin --save-dev                          //installs a plugin that will create an html file in the /dist folder based on a template we have in /src
               
              6) npm install css-loader --save-dev                                   //installs the loaders for css files and <style> tags
                 npm install style-loader --save-dev                                 

              7) npm install babel-plugin-root-import --save-dev                    //enables you to create flags like '~/' to represent a specific directory like './src'                    
                                                                                    //check .babelrc notes for more info
              7) configure webpack   (look at webpack notes for more info)
              
              8) In your package.json file, write the following scripts
                     "start": "webpack-dev-server --mode development --open",
                     "build": "webpack --mode production"
              
              8) create /src folder with index.js and index.html (index.html must have <div id="root"> </div>)
                 make sure to implement your <meta/> tags for SEO (DONT FORGET TO ADD A FAVICON!)
                            <meta name="author" content="Abel Muro"/>       
                            <meta name="keywords" content="front-end quiz, html quiz, css quiz, javascript quiz, accessibility quiz"/>
                            <meta name="description" content="Front-end quiz that will test your skills in HTML, CSS, Javascript and Accessibility!"/> 
                            <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F4F6FA" />                           //you can remove the media attribute if you just want ONE custom theme
                            <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#313E51" />
                            <base href="/" />                                                                    //this will set the base url to '/'    this will force all relative urls to resolve to '/'     profile/overview will resolve to  /profile/overview
              
              9) generally, index.js will have..
              
                 import {App} from './components/App.js'
                 const root = ReactDOM.createRoot(document.getElementById('root'));
                 root.render(<App/ >)
                 
               10) then you should create a /components folder that will have all the functions and classes that are exported
        
*/      





//=========================================== STATE OBJECT ================================================
/* 
        A state is an object that contains data, when this data is updated or changed, it will cause a re-render
*/


function App() {
        const [count, setCount] = useState();

        const handleCount = () => {
                setCount(count + 1);
        }

        return(
           <button onClick={handleCount}> 
                Click here
           </button>
        )
}










//=========================================== PROPS ================================================
/* 
        Props means properties
        props are used to pass data from one component to another
*/

    
 function App() {
        const [state, setState] = useState("exmaple");                                  //for passing state, its best that you use useContext() hook       
        let someString = "passing this as props";
        const someEventHandler = (e) => {
             console.log(e.target);
        } 
       
        return (
             <HomePage myString={someString} myEventHandler={someEventHandler} state={state}/>   //you can pass any type of data as props to other components 
        )
 }
        
 function HomePage(props){
        props.myString;                                 //"passing this as props"
        props.someEventHandler();                       //event handler that was passed as props
        props.state;                                    //passing the state object to child components   
 }


//------------------------------------- CHILD PROPS -------------------------------------
//you can pass nested elements in JSX to function components

function CreateBorder({color, children}) {
    return (                                                       
        <div style={{color: color}}>                      
            {children}                                         //props.children will be replaced by the nested elements
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



//------------------------------------- PROPS VALIDATION -------------------------------------
//You can validate the props of a component with propTypes, this can help reduce bugs and unexpected behavior

import PropTypes from 'prop-types';

function Greeting({ name }) {
      return <h1> Hello, {name}! </h1>;
}

Greeting.propTypes = {
  name: PropTypes.string.isRequired,         // Ensures 'name' is a required string
  age: PropTypes.number.isRequired
};

export default Greeting;








//=========================================== JSX ================================================
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









        


//=========================================== REACT LISTS ================================================

/* 
        A React list is an array of JSX elements, each of these elements
        must have a key prop to help identify the item in the list.
        React will use the key to see which items in a list have changed.
        If the key of an item has changed, then the item will be re-rendered.
        But if the key doesn't change, then the item will be left alone.
        All keys should have unique values, and they should represent the data
        in the list.

        You should not use the index of the array as the key of an item for the reasons below..

        <ul>
                <li key=0 > 0 </li>        <---    lets say we delete this item from the list
                <li key=1 > 1 </li>
                <li key=2 > 2 </li>
                <li key=3 > 3 </li>
        </ul>


        -deleting an item will cause a re-render, but because we have to iterate through the list again
        every item will have a new key, thus re-rendering ALL 

        <ul>
                <li key=0 > 1 </li>                    // <li> 1 </li> used to have a key that was set to 1, but now it is 0
                <li key=1 > 2 </li>                    // all the list items have had their keys changed as well
                <li key=2 > 3 </li>                    // now React will look at this and will re-render all the items because their keys have changed
        </ul>

*/

   
function MakeList(props) {
    const [names, setNames] = useState(['david', 'carlos', 'stephanie'])
        
    return (names.map((name) =>
        <div key={name}> 
             {name} 
        </div>
    ));
}

















//=========================================== SYNTHETIC EVENTS AND EVENT HANDLERS ================================================
//Keep in mind that React uses Synthetic events... 
// ...and all browsers have their own set of native events (onClick, onSubmit, onChange, etc...) 
// (although browsers all use the same name for the native events, some of them have different effects that are not consistent across all browsers)

//React uses a cross-browser wrapper object that is usually named 'e' (synthetic event)
//that pools together all the native events together and makes sure that the event works the same across all browsers
//The whole point of this is to improve compatibility between all browsers and react


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















//=========================================== MODULARIZATION ================================================
//You can use import and export statements to modularize your code

// ./MyComponent.js
function MyComponent() {
        return (
            <div> Hello World </div>
        )
}
export default MyComponent;


// ./App.js
import MyComponent from './MyComponent.js';

function App(){
        return(
             <MyComponent /> 
        )
}



//------------------------------------- DEFAULT IMPORT -------------------------------------
//each file can only have ONE export default

// ./HomePage.js
export default Home;


// ./App.js
import Home from './HomePage.js';                      //this only works if 'HomePage' file has a 'default export'
import HomeComponent from './HomePage.js'              // you can use any name for the component that was exported with default



//------------------------------------- NAMED EXPORT -------------------------------------
//a file can export as many components/variables as you want

// ./HomePage.js
export {Home};
export const number = 34;


// ./App.js
import {Home} from './HomePage.js';                         //this will work
import {HomeComponent} from './HomePage.js'                 //You can't change the name of a named export
import {number as myNumber} from './HomePage.js'            //this will work
import * as objectName from'./HomePage.js';                //this will import ALL of the named exports into an object


//------------------------------------- DYNAMIC IMPORT -------------------------------------
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

export default DynamicImport;
















// =========================================== COMPONENTS ================================================
/* 
        React has two types of components, Class and Function commponents. These are the building blocks of React
        We also have the following variations of function/class components
                -Stateful components are components with a state.
                -Stateless components are components with no state.
                -Controlled components are components with a state that is binded to one of its inputs.
                -Uncontrolled components are components that don't have a state that is binded to one of its inputs.
        

*/


//------------------------------------- FUNCTION COMPONENTS -------------------------------------
//function components use hooks, go to the hooks section to learn more about hooks
function App() {
        const [count, setCount] = useState();                //creating a state object with the useState() hook
        const myRef = useRef();                              //creating a ref object that can be used to reference an element in the real dom 

        const handleCount = () => {
                setCount(count + 1);
        }

        useEffect(() => {
                
        }, [])

        return (
                <div ref={myRef}> 
                    {count}
                </div>
        )
}





// ------------------------------------- CLASS COMPONENTS -------------------------------------
// (class components are to be replaced with function components)
class ClassComponent extends React.Component {                //extends means that ClassComponent is the child of React.Component (ClassComponent can access the methods and properties of React.Component)

    constructor(props) {                                       //Keep in mind that props is only accessible in the constructor, it cannot be accessed outside yet
        super(props);                                        //we should always call the parent constructor of a class component because it allows use to use this.props for the whole scope of this component
        this.state = {value: 0};                             //state is an object that stores data that should only be changed by this component
        this.handleClick = this.handleClick.bind(this);      //you should always bind(this) with event handlers because the value of 'this' gets lost when you pass down the event handler to the child components
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
        const props = this.props;                        //because we called super(props), we can access the props outside the constructor     
        const currentState = this.state.value;            //accessing state object
            
        return (
            <div>
                <h1> state object is: {currentState} </h1>
                <SomeComponent state={this.state} changeState={this.handleState}/>      //this is typically how you pass state and setState to components
            </div>            
        )
    }
}



//------------------------------------- PURE CLASS COMPONENTS -------------------------------------
//Pure Components are class components that extends Pure.Component
//These components do NOT rely on variables/objects defined outside of its scope
//Passing the same argument to these components will always return the same result
//These components will automatically re-render IF the previous state/props 
// is different that the new state/props. If its not different, then the component will not re-render


//this component will only re-render if the props or state change (similar to using the memo() function)
class PercentageStat extends React.PureComponent {
        
   //shouldComponentUpdate(){}                  //you dont have to use this lifecycle method anymore in pure components            

  render() {
        const { label, score = 0, total = 56 } = this.props;

        return (
             <div>
                 <h6>{ label }</h6>
            </div>
    )
  }
}


//------------------------------------- CONTROLLED COMPONENTS -------------------------------------

// CONTROLLED TEXT FIELD COMPONENTS
function TextField() {
        const [text, setText] = useState('');

        const handleText = (e) => {
                setText(e.target.value);
        }

        return (
                <form>
                        <input value={text} onChange={handleText}/>
                </form>
        )
}



// CONTROLLED RADIO BUTTON COMPONENTS
function RadioButtons() {
    const [radio, setRadio] = useState('one')

    const handleChange = (e) => {
        setRadio(e.target.value);
    }


    return(
        <form>
             <input 
                  type='radio' 
                  value='one'
                  checked={payment === 'one'}                //radio button will be checked if expression returns true
                  onChange={handleChange}
                  name='one' />
                          
             <input 
                  type='radio'
                  value='two'
                  checked={payment === 'two'}                    //radio button will not be checked if expression returns false
                  onChange={handleChange}                        
                  name='two' />
        </form>
    )
}

// CONTROLLED CHECKBOX COMPONENTS
function CheckBoxes() {
     const [blue, setBlue] = useState(false);
     const [red, setRed] = useState(false);
        
     const handleBlue = () => {
        setBlue(!blue);
     }   
        
     const handleRed = () => {
        setRed(!red);
     }
     
     
     return(
            <form>
                   <input 
                       type="checkbox" 
                       onChange={handleBlue} 
                       checked={blue}                       //the checkbox will be checked if blue is a truthy value
                     />
                     <input 
                       type="checkbox" 
                       onChange={handleRed} 
                       checked={red}                         //the checkbox will be unchecked if red is a falsey value
                     />
            </form>
     )     
}

// ------------------------------------- UNCONTROLLED COMPONENTS -------------------------------------
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













//=========================================== VIRTUAL DOM ================================================
//How to render components onto the virtual DOM

import ReactDOM, {hydrateRoot} 'react-dom/client';             //importing methods from built in packages in react
import App from './components';

const root = document.getElementById('root')

//For client-side rendering
const clientRoot = ReactDOM.createRoot(root);  
clientRoot.render(<App /> )                                     

//For server-side rendering            
const hydrateRoot = hydrateRoot(root);     // Create a root and attach React to the existing HTML
hydrateRoot.render(<App />);















//=========================================== CONDITIONAL RENDERING ================================================
// You can use logical operators inside {} in JSX
// {true && expression} will always return the expression
// {false && expression} will not return anything

{true && <MyComponent />}                   //MyComponent will render
{false && <MyComponent />}                   //MyComponent will not render
{true ? <MyComponent/> : <MyOtherComponent/>} //MyComponent will render

 
 











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



















    

//=========================================== REACT ROUTER ================================================
/* 
       React Routers implements Client side routing in a React application. This library will
       connect a component to a specific route.

       npm install react-router-dom
       
*/




//------------------------------------- Browser Router
/* 
        BrowserRouter component is a context provider that enables all the 
        React Router features in your application. You can also have custom
        components as a child in this provider.

*/

function App() {

        return (
                <BrowserRouter> 
                        <CustomComponent/>
                </BrowserRouter>
        )
}





//------------------------------------- Create Browser Router
/* 
        You can use the createBrowserRouter() function to 
        organize components and routes in a different way.
*/
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
       
        const router = createBrowserRouter([
                {
                    path: "/",
                    element: <Home />,
                },
        ]};

        return (
            <RouterProvider router={router}/>
        )
}






//------------------------------------- Routes Component
/* 
        The Routes component is a container for all the routes in your
        application. This component cannot have any custom components as
        a child.
*/

function App() {

        return (
                <BrowserRouter> 
                        <Routes> 
                
                        </Routes>
                </BrowserRouter>
        )
}




//------------------------------------- Route Component
/* 
        The Route component defines the actual routes in your application. 

                Syntax: 
                        <Route path={} element={}>

                                path:  The path to the route
                                element: the commponent that will be rendered in the route
*/

function App(){
        return (
            <BrowserRouter> 
                        <Routes> 
                             <Route path={'/'} element={<HomePage />}>
                             <Route path="*" element={<PageNotFound />}/>                /// if the user goes to a route that doesnt exist, this route will be displayed (404 page)
                        </Routes>
           </BrowserRouter>
        )
}



//------------------------------------- Navigating Routes (useNavigate hook, Link component)
/* 
        You can use the <Link/> component or the useNavigate() hook to 
        navigate to different routes.
*/

function App(){
        const navigate = useNavigate();

        const handleClick = () => {
                navigate("/aboutUs", {state: {data: "whatever"}});     // will navigate to the '/aboutUs' component and pass {data: "whatever"} to another component
                navigate('..');                                        // will navigate to the parent route of the current route
                navigate(-1);                                          // will navigate to the previous route
                navigate('contactUs')                                  // will add contactUs to the current pathname      (/account   ->    /account/contactUs)
                navigate('aboutUs');                                   // keep in mind that calling navigate like this again will only change the last parameter of the pathname  (/account/contactUs    ->     /account/aboutUs)
        }

        return (
                <>                                                         //state prop will pass data from one route to another
                         <Link to="/ContactUs/email" className="example" state={{ message: "Hello from Home!" }}> Email us </Link>
                         <Link to="/ContactUs/phone" className="example" state={{ message: "Hello from Home!" }}> Call us </Link>
                </>   
        )
}





//------------------------------------- Nested Route Components
/* 
        Every Route component can have other nested Route components.
        The parent Route must have an <Outlet/> component that can
        be used to render the nested Route components. Use <base href="/" /> 
        in the index.html when you are using nested routes, this will 
        prevent your app from sending a request to a route in the server.
*/

function App() {
        return(
                <BrowserRouter> 
                        <Routes> 
                                <Route path="/ContactUs" element={<ContactUs/>}>      
                                     <Route path="/ContactUs" element={<ContactUs/>}/>                          /// if the child route has the same path as the parent, it will still be displayed
                                     <Route path="/ContactUs/email" element={<EmailUs/>}/>                      /// this child route will be displayed ONLY if the pathname is /ContactUs/email
                                     <Route path="/ContactUs/phone" element={<CallUs/>}/>                       /// this child route will be displayed ONLY if the pathname is /ContactUs/phone
                                </Route>
                        </Routes>
                </BrowserRouter>
        )
}

function ContactUs() {                                     //as long as the current pathname starts with /ContactUs, this component will be rendered
        return(
                <div> 
                        <h1> Contact Us<h1>
                        <Outlet />                         //this will render either /ContactUs/email   or   /ContactUs/phone
                </div>    
        )
}





//------------------------------------- Routes with dynamic paths (useParams hook)
/* 
      You can create a dynamic path for a route with the following syntax

      /:path               // path can be any placeholder

      You can access the dynamic path by using useParams()
*/

function App(){
        return(
                <BrowserRouter> 
                        <Routes>
                                <Route path="/:path" element={<ContactUs/>}>
                                <Route path="/DonateUs" element={<Donate/>}/>                
                                <Route path="/DonateUs/:path" element={<ThankYou />}/>            
                                <Route path="/DonateUs/:path/:otherPath" element={<DonateMore/>}  
                        </Route>
                </BrowserRouter>
        )
}

function ThankYou() {                                      
    const {path} = useParams();                             // path is the dynamic path placeholder that you used in the pathname of the route                                                        
}

function DonateMore(){
    const {path, otherPath} = useParams();                 // if the route has multiple dynamic paths, you can access all of them through this hook
}




//------------------------------------- Passing Data between Routes (useLocation hook)
/* 
        You can pass data from one route to another with the useLocation()
        hook.
*/

function Home() {
        const navigate = useNavigate();
        
        navigate('/aboutus', {
                state: {
                        {data: 'whatever'}
                }
        });
}

function AboutUs() {
        const location = useLocation();

        location.pathname;                        // A string representing the current URL path.
        location.search;                          // A string representing the query parameters of the URL (everything after ?).
        location.hash;                            // A string representing the fragment identifier (everything after #).
        location.state;                           // The state object passed via link or navigate, typically for persisting data between navigations.
        location.key;                             // A unique identifier for the current location entry in the history stack.
}








//------------------------------------- Blocking navigation until user gives consent (useBlocker hook)
/* 
        You can use the useBlocker() hook to prevent a user
        from navigating away from the current page until 
        they give consent. This hook will automatically detect
        any changes made to the navigation. But the component that 
        uses the hook must have the returned value of the useBlocker hook

        KEEP IN MIND, to use the useBlocker() hook, 
        your app can't use the <BrowserRouter/> context provider.
        You need to use the two components createBrowserRouter and
        RouterProvider

                function App() {
                        const router = createBrowserRouter([
                                {
                                    path: "/",
                                    element: <Home />,
                                },
                        ]};
        
                        return (
                            <RouterProvider router={router}/>
                        )
                }


*/


function useConfirmNavigation(shouldBlock) {
    const block = useBlocker(shouldBlock);

    useEffect(() => {
        if(block.status !== 'blocked') return;

        const confirmed = confirm('Are you sure you want to leave? You will forfeit the match in doing so');
        if(confirmed)
            block.proceed();                        
        else        
            block.reset();                //prevents the user from navigating away
    }, [block.status])

    return block;                         //component that uses useConfirmNavigation() must have this object for the blocker to work
}

















//=========================================== LAZY LOADING ================================================
//lazy loading is the technique of making certain parts of a website have a delay in loading, instead of having the entire website load in one go.
//this can greatly improve loading time for a website

import {lazy} from 'react';
const ProjectSection = lazy(() => import('./ProjectSection'));          // you pass a callback and you wrap arround the directory of the folder with import()
                                                                        
function App() {
        return (
           <main>
                <ProjectSection/>                                       // this component will be lazily loaded  
           </main>
        )
}












//=========================================== SUSPENSE ================================================
// Suspense lets you specify a loading screen for a part of the component tree if it’s not yet ready to be displayed
// Before React 18, <Suspense/> was designed to display a loading screen when a component was being lazy loaded.

import { Suspense } from 'react';

function App() {
  return (
    <div>                                                       //<Suspense/> will display a fallback UI while <MyComponent/> is being rendered
      <Suspense fallback={<div>Loading...</div>}>               
        <Lazyloaded />                                          //thi
      </Suspense>
    </div>
  );
}


// But now with React 18, you can use <Suspense/> to display a loading screen for components that fetch data inside
// an application that has been rendered on the server

import { Suspense } from 'react';

function App() {
  return (
    <div>                                                       //<Suspense/> will display a fallback UI while <MyComponent/> is being rendered
      <Suspense fallback={<div>Loading...</div>}>               
        <MakesFetchRequest/>
      </Suspense>
    </div>
  );
}


















//=========================================== SUSPENSE ON THE SERVER (SERVER SIDE RENDERING) ================================================
//Below is an example of implementing suspense on the server (server side rendering)


import React, { Suspense } from 'react';
import ReactDOMServer from 'react-dom/server';
import { createFetch, createFromFetch } from 'react-fetch';
import App from './App';
import express from 'express';

const server = express();
const fetch = createFetch();

server.use(express.static('build'));                                // Serve the static files from the build folder


server.get('*', async (req, res) => {                                // Handle all requests with a wildcard
  const suspenseFetch = createFromFetch(fetch, req);
        
  const stream = ReactDOMServer.renderToPipeableStream(
    <Suspense fallback={<div>Loading...</div>}>
      <App fetch={suspenseFetch} />
    </Suspense>
  );

  // Send the HTML response with the stream
  res.write(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>React SSR with Suspense Example</title>
      </head>
      <body>
        <div id="root">
  `);

  stream.pipe(
    res,
    { end: false }
  );

  stream.on('end', () => {
    res.write(`
        </div>
        <script src="/bundle.js"></script>
      </body>
    </html>
    `);
    res.end();
  });
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

























//=========================================== DEBOUNCING ================================================
//Debouncing is the idea that some function will be triggered when the user stops typing
//The logic below works like this...
//The onChange event handler will detect any changes made by the user.
//Everytime the user types something in the input, it will start a timer with setTimeout
//But as long as the user keeps typing, it will continuously reset the timer
//When the user stops typing, the timer will start and when it finishes, it will call the setTimeout
// and execute the function that was passed to debounce()

function debounce(cb, d) {
        let timer;
        let text;
        return (e) => {                              //this is the function that is passed to the onChange attribute in the <input/>
             text = e.target.value;                  //you cannot pass the synthetic event to another function below, so you must assign the value of input here
             if(timer) clearTimeout(timer)            
             timer = setTimeout(() => {
                     cb(text)                        //this is the function that was passed to debounce as the first argument
             }, d)
        }
}

 function App() {
         
      const handleChange = debounce((text) => {        //the callback passed to the first argument will be used in the setTimeout()
             console.log(text);
      }, 1000)
 
      return(
          <input type='text' onChange={handleChange}/>
      )
 }


























//=========================================== ADVANCED CONCEPTS IN REACT ================================================





//------------------------------------- ERROR BOUNDARY CLASS COMPONENT -------------------------------------
 // Error Boundaries are basically class components that will catch any errors that are thrown in any child component
 // The idea is to wrap your entire application with these Error Boundaries and it will automatically detect any errors thrown from the child
 // keep in mind that the try catch block will only work with vanilla JS, look at the example below
 
 // keep in mind that the <ErrorBoundary/> will automatically catch errors in the components nested within
 
 import ErrorBoundary from './ErrorBoundary.js';
 
 function App() {
       return (                 {/* ErrorBoundary will not catch errors from event handlers, Asynchronous code*/}
            <>  
              <ErrorBoundary>                 
                    <MyComponent/>
              </ErrorBoundary/>
            </>
          )
}
  
// ./ErrorBoundary.js
 class ErrorBoundary extends Component {
         constructor(props) {
            super(props);
            this.state = { error: false, message: '' };
         }
         
         static getDerivedStateFromError(error) {
            return { 
                    error: true, 
                    message: error.toString()                        // Updating state (this method will automatically catch errors in the child component)
                  };            
          }

          render() {
            const { error, message } = this.state;
            const { children } = this.props;

            return error ? 
                        <div> 
                            {message} 
                        </div>  : 
                        children;
          }
}


//MyComponent.js
 class MyComponent extends React.Component {
          constructor(props) {
            super(props);
            this.state = { data: null };
          }
        
          componentDidMount() {
            fetch("https://invalid.url")                // This will throw an error because the URL is invalid
              .then((response) => response.json())
              .then((data) => this.setState({ data }));
          }
        
          render() {
             return <div>{this.state.data.length}</div>;       // This will also throw an error if data is null
          }
        }




//------------------------------------- LIFTING STATE UP -------------------------------------
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







//------------------------------------- RENDER PROPS -------------------------------------
// Render props is basically a function that is passed to a component, this function tells the component what to render
// the idea with Render Props is to sharing code between react components by using props whose value is a function/component
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




















//------------------------------------- HIGH ORDER COMPONENTS (HOC) -------------------------------------
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









