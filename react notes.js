import React, { useEffect, useState, createContext , useContext, useRef, useReducer, useMemo, useCallback, } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useParams, useNavigate } from 'react-router-dom';
import './react.css'


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
               
                2) import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
                   import {faHouse, faMagnifyingGlass, faCartShopping, faUser, faX} from '@fortawesome/free-solid-svg-icons'; 
               
                3) <FontAwesomeIcon icon={faMagnifyingGlass} className={myClass}/>
*/      













//=========================================== IMPORT STATEMENTS =========================================== 


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












//=========================================== INDEX FILE IN FOLDERS =========================================== 
//With React, you can have folders that contain ALL the modules of a specific component
//this lets you organize your modules much better


// /someFolder/INDEX.js
import someComponent from './someComponent.js'
export default someComponent;

// /someFolder/SOMECOMPONENT.js
function someComponent() { /* some logic*/};
export default someComponent;

// /someFolder/STYLES.css
.someClass {
      color: black;
      background-image: url("./someURL.jpg")
}



// the file below is in the same directory as ./someFolder, but not inside it
import someComponent from './SomeFolder';                       //by just importing a component from a folder, react will look for the index.js











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


// rememeber that you can use logical operators inside {} in JSX
// 'true && expression' will always return the expression

let variable = true
{true && <MyComponent />}                   //MyComponent will render
{null && <MyComponent />}                               //MyComponent will not render











//======================================================================== REACT ROUTER ===========================================================================================================================

//keep in mind that you want to use useNavigate() inside the useEffect() hook or in an event handler

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
    const navigate = useNavigate();            //this hook is used to navigate to a different page, its useful if its used inside even handlers          
    navigate("/DonateUs/cash");                //when this function hook is called, it will have the same effect as <Link>;
        
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

























//============================================================================= REACT CLASSES ======================================================================================================================
//classes are to be replaced with hooks****



class ClassComponent extends React.Component {

    constructor(props) {
        super(props);                                        //we should always call the parent constructor of a class component
        this.state = {value: 0};                             //state is an object that stores data that should only be changed by this component
        this.handleClick = this.handleClick.bind(this);      //you should always bind(this) with event handlers because 'this' gets lost in the event handlers
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {                                   //lifecycle method that will be called after the component has been first rendered to the DOM
    }

    componentDidUpdate() {                                  //lifecycle method that gets called after every render, except the first render

    }

    componentWillUnmount() {                                //lifecycle method that will be called after the component has been removed from the DOM
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






//============================================================================== REACT HOOKS ===========================================================================================================================
//import React, { useEffect, useState, createContext } from 'react';
//hooks are functions that let you 'hook into' React features from function components




//----------------------------------------------------------------USE STATE HOOK---------------------------------------------------------

// useState() hook lets you declare a state object and a function that can be used to update that state object...
// after the component has been rendered for the second time, useState will have its argument ignored 
// and will instead read the previous state value and store it in the state object

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













//------------------------------------------------------------ USE CONTEXT HOOK --------------------------------------------
// you can pass state object and setState() to child components by using createContext() and useContext()

const StateObject = createContext();

function ComponentOne() {
    const [state, setState] = useState("pass this down");

    return(                                     //all the child components called inside <StateObject.Provider /> can use the state object
    <>
        <StateObject.Provider value={{state, setState}}>    
            <ComponentTwo />                        
        </StateObject.Provider>    
    </>

    )
}
function ComponentTwo() {
    return(
        <ComponentThree/>
    )
}

function ComponentThree() {
    return(
        <ComponentFour/>
    )
}

function ComponentFour() {
    const {state, setState} = useContext(StateObject);     
    return(         
        <h2>
            <button type="button" onClick={() => setState("this is now different")}> Click here</button>
            {state} 
        </h2>
    )
}

















//----------------------------------------------------------- USE REF HOOK -----------------------------------------------------
// useRef() is a hook that can create a constant reference to an element or can be used to reference a value
// this hook does not cause a re-render everytime it gets updated
// useRef() has the same effect as querySelector()

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
              //even though there will be a re-render everytime we click on the button below
              // DisplayList will not re-render because its props havent changed
        <>
            <DisplayList onclick={handleClick}/>                  
            <button onClick={increment}> increment </button>                    
        </>
    )
}





















//------------------------------------------------------ CUSTOM HOOKS --------------------------------------------------
// you can create your own custom hooks that encapsulates stateful behavior (calculating something) and makes code reusable
// remember that every hook has their isolated state variable

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
//when you create an array of JSX elements, each element
//must have a unique key that identifies it.
//you can use any string as a key. but its best to use the 
// uuid api to create universaly unique ID's 
        
import {v4 as uuid} from 'uuid';
        
function ListItem(props) {
    return <li>{props.value}</li>
}

function MakeList(props) {
    const numbers = props.array;
        //using map function to create a <li> for each element in the array
    return numbers.map((number) =>
        <ListItem key={uuid()} value={number} />  //uuid() will always create a unique ID for each key in the array
    )
}

const numbers = [1, 2, 3, 4, 5, 6];

root.render(<MakeList array={numbers}/>);






















//------------------------------------------------- SYNTHETIC EVENTS and EVENT HANDLERS-------------------------------------------------------------------------------------------------------------------
//keep in mind that React uses Synthetic events, 
//React uses a cross-browser object that is usually named 'e' (synthetic event)
//keep in mind that browsers have different interactions for 
//different events such as preventDefault() and stopPropagation()
//what react does is pool together these events under a single API
//and that API will have only one type of interaction with those events
//in other words, e.preventDefault() will do the same thing across all browsers



function EvenHandlers() {
        
     const handleClick = (e) => {\
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

// Components that handle the data of the input/select/forms with its state are called controlled components
// you have must better control of what is being inputed by the user
// KEEP IN MIND, that the value attribute is ONLY for controlled components
// if you want to use input/select/forms in UNCONTROLLED components, then you should use defaultValue attribute


//everytime the user inputs something, the entire component gets re-rendered
function Login() {
    const [userName, setUserName] = useState("");                      
    const [password, setPassword] = useState(""); 
        
     //this is a useful way of making sure a password meets certain constraints
     let disable = password.length < 6 || password.match(/[a-zA-Z]/g) == null ||password.match(/\d/g) == null || password.match(/\W/g) == null;
     //password must has at least one leter, one digit, and must have a non alphanumeric character and must be greater than 6 characters   
        
    return(
        <>
            <form action="login" method="POST">
                <label htmlFor="username">
                    Username: 
                </label>
                <input type="text" id="username" name="username" value={userName} onChange={(e) => {setUserName(e.target.value)}}/>
                <label htmlFor="password">
                    Password: 
                </label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                <input disabled = {disabled} type="submit" value="Login"/>      
            </form> 
        </>

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


































//---------------------------------------------------------------- RENDER PROPS ---------------------------------------------------------
//the idea behind render props is to reuse stateful behavior with other components
//the example below is how we use render props to make code more reusable
//keep in mind that MouseTracker should be at the bottom..


class MouseTracker extends React.Component {

    render() {
      return (        
        <>
          <Mouse render={mouse => (<Cat mouse={mouse}/>)} />        //with render props, the whole point is to pass another component
          <Mouse render={mouse => (<Dog mouse={mouse}/>)} />        
          <Mouse render={mouse => (<Bird mouse={mouse}/>)} />
          <Mouse render={mouse => (<Chicken mouse={mouse}/>)} />
       </>
      );
    }
}


//this component is now reusable
class Mouse extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (      
        <div>                                   //THIS IS THE WHOLE POINT OF RENDER PROPS, 'this.props.render(this.state)' is a placeholder and can be any component
             {this.props.render(this.state)}    //this is the same as.... <Cat mouse={this.state}/>    <Dog mouse={this.state}/>      <Bird mouse={mouse}/>                          
        </div>                                              
      );
    }
}
















//-------------------------------------------------------------------THINKING IN REACT--------------------------------------------------------

//React recommends that you break down a UI component into smaller components.
//the first step is to build a static version of the UI, that is.. only using props to pass down data from parent to child component
//the second step is to identify which data can be stored inside state, (data must be mutable data)
//the third step is to then implement the state object on the parent component, (identify where state should live)
//the fourth step is to actually change the state object with event handlers











