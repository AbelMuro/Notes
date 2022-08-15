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
                npm install @babel-loader --save-dev        //installs a loader that babel uses to transpile JS code into valid JS code
                npm install @babel/preset-react --save-dev  //installs a group of plugins that will transpile JSX into valid JS
                npm install @babel/preset-env --save-dev    //installs a group of plugins that will transpile all the new features of JS 
                npm install html-webpack-plugin --save-dev  //installs a plugin that will create an html file in the /dist folder based on a template we have in /src
                                                                (look at webpack notes for more info)
                                                                
              5) configure webpack
              
              6) create /src folder with index.js and index.html (index.html must have <div id="root"> </div>)
              
              7) generally, index.js will have 
                 const root = ReactDOM.createRoot(document.getElementById('root'));
                 root.render(<App/ >)
                 
               8) then you should create a /components folder that will have all the functions and classes that are exported
*/      










//-----------------------------------------REACT DOM -----------------------------------------------------------------------------------------
import ReactDOM from 'react-dom/client';             //importing methods from built in packages in react

const root = ReactDOM.createRoot(document.getElementById('root'));  //root is an element from the HTML file that will be managed by the REACT DOM
//root.render("hello world");                                          //using render() method to print a string onto the root, you can print any expression or REACT element















//------------------------------------------- JSX syntax ---------------------------------------------------------------------------------------------
function example() {
    return "greetings";
}

//remember, any valid javascript expression is allowed inside {}
//also keep in mind that you cannot change an element in the flow of the program, after it has been created

const link = "https://wwww.google.com";
const name = "World";
const elementONE = <h1 className='name'> hello, {name} </h1>;   //any valid javascript expression can go inside the {}, 
const elementTWO = <a href={link}> link </a>;                   //you can also add attributes in JSX with {}
const elementTHREE = <p> {example()} </p>;                      //you can also call functions with {}
const elementFOUR =  (                                          //you can also add children to the elements
    <div>                                                       
        <p>
            you can create elements with children
        </p>
        <p>
            like this as well
        </p>
    </div>
);

//React.createElement() does the same thing as elementFOUR
const element = React.createElement(
    'h1',                                                       //tag name
    {className: "myClass"},                                     //attributes
    'hello, world'                                              //content
)



//======================================================================== REACT ROUTER ===========================================================================================================================



function NavigationBar() {
    return(
        <>
            <Link to="/" className="example"> Home</Link> <br/>               {/*you can style the links with className attribute*/}
            <Link to="/AboutUs" className="example"> About Us</Link><br/>
            <Link to="/ContactUs" className="example"> Contact Us</Link><br/>
            <Link to="/DonateUs" className="example"> Donate Us</Link> <br/>
            <hr/>
            <Outlet />
        </>
    )
}
function Home() {return(<><p>Home</p></>)}

function AboutUs() {return(<><p>About us</p></>)}

//-------------------------------------------- nested Routes that display automatically after the parent route is clicked

function NestedNavigationBar() {
    return(
        <>
            <Link to="/ContactUs/email" className="example">Email us</Link>  
            <Link to="/ContactUs/call" className="example"> Call us</Link>
            <Outlet />
        </>
    )
}
function EmailUs() {return (<p> Email us</p>)}

function CallUs() {return (<p> Call us</p>)}

//-------------------------------------------- Routes can pass URL parameters (data) to other routes 

function DonateUs() {
    const navigate = useNavigate();            //this hook is used to navigate to a different page, its useful if its used inside even handlers          

    {/* navigate hook has the same effect as clicking on one of the <Link>*/}
    const handleChange = (e) => {
        if(e.target.value != "")
            navigate(e.target.value);
    }

    return(
        <div>
            <p>Donate Us</p>

            {/* you can use a select tag as if the <option> were <Link> */}
            <select onChange={handleChange}>
                <option value=""> Select payment method</option>
                <option value="/DonateUs/cash"> Cash</option>                       {/* value can be passed to the useParams() in <ThankYou /> */}
                <option value="/DonateUs/credit"> Credit </option>                  {/* value can be passed to the useParams() in <ThankYou /> */}
            </select> 

             {/* These <Link> correspond to the <option> above */}
            <Link to="/DonateUs/cash" className="example"> Cash </Link><br/>        {/* 'cash' will be passed to the useParams() in the <ThankYou /> component*/}
            <Link to="/DonateUs/credit" className="example"> Credit </Link><br/>    {/* 'credit' will be passed to the useParams() in the <ThankYou /> component*/}
        </div>
    )
}

function ThankYou() {
    const {repoName} = useParams();                         //repoName is the URL parameter that was passed 'down' from <Route path="/DonateUs">
    return(
        <div>
            <h2>Thank you for donating</h2>
        </div>
    )
}

//------------------------------------------

function NoPage() {return(<><p>Page doesnt exist</p></>)}

function RouterStuff() {
    return(
        <Router> 
            <Routes>
                <Route path="/" element={<NavigationBar/>}>                      {/* This Route has an <Outlet> that will be replaced by one of the nested Routes*/}          
                    <Route index element={<Home/>}/>                                {/* <Route index> will always be rendered first , you can also use <IndexRoute>*/}
                    <Route path="/AboutUs" element={<AboutUs/>}/>                   {/* <Route path="AboutUs"> will only be displayed if the user clicks on the Link in <Layout>*/}
                    <Route path="/ContactUs" element={<NestedNavigationBar/>}>      {/* This Route has an <Outlet> that will be replaced by one of the nested Routes*/}
                        <Route path="/ContactUs/email" element={<EmailUs/>}/>           {/* This Route will only be rendered after the parent <Route> is rendered */}   
                        <Route path="/ContactUs/call" element={<CallUs/>}/>             {/* This Route will only be rendered after the parent <Route> is rendered */}
                    </Route>
                    {/* If you nest <Route path="/DonateUs/:repoName"/> inside <Route path="/DonateUs"/>      then the content in <Route path="/DonateUs"/> will not dissapear*/}
                    {/* but you must add an <Outlet /> in the parent Route*/}
                    <Route path="/DonateUs" element={<DonateUs />}/>                {/* This Route will send a URL parameter to the Route below*/}
                    <Route path="/DonateUs/:repoName" element={<ThankYou />}/>      {/* :repoName is a placeholder, it can be sent as useParam() to the <ThankYou /> */} 
                    <Route path="*" element={<NoPage />}/>                          {/* <Route path="*">  will only be rendered if the page requested does not exist*/}
                </Route>
            </Routes>
        </Router>
    )
}

root.render(<RouterStuff />)
























//============================================================================= REACT CLASSES ======================================================================================================================
//classes are to be replaced with hooks****



class ClassComponent extends React.Component {

    constructor(props) {
        super(props);                                        //we should always call the parent constructor of a class component
        this.state = {value: 0};                             //state is an object that stores data that should only be changed by this component
    }

    componentDidMount() {                                   //lifecycle method that will be called after the component has been first rendered to the DOM
    }

    componentDidUpdate() {                                  //lifecycle method that gets called after every render, except the first render

    }

    componentWillUnmount() {                                //lifecycle method that will be called after the component has been removed from the DOM
    }

    handleState(item) {
        this.setState(item);                                //React will then call render() once setState() call is finished
    }                                                      
                                                         

    handleClick() {                                         //event handler
        this.setState({value: 1})                           //using the setState() will update the state object and cause a re-render
    }

    handleChange() {                                        //event handler
        this.setState(                                      //you can use the setState() to access the previous state value and props
            (prevState, props) => ({value: prevState.value + props.value}));   
    }


    render() {
        return (
            <div>
                <h1>state object is: {this.state.value} </h1>
                <Cat state={this.state} changeState={this.handleState}/>
            </div>            
        )
    }
}






//============================================================================== REACT HOOKS ===========================================================================================================================
//import React, { useEffect, useState, createContext } from 'react';
//hooks are functions that let you 'hook into' React features from function components



//using useState hook to declare a state object and a function that can be used to update that state object
//after the component has been rendered for the second time, 
// useState will have its argument ignored and will instead read the previous state value and store it in the state object
function HooksOne() {
    const[state, setState] = useState(1);           //you can initialize state with any string, object, array or number
    const[stateTwo, setStateTwo] = useState('can be a string');
    const[stateThree, setStateThree] = useState({one: 1, two: 2, three: 3});
}   //const [first, second] = ['one, 'two']           and now you can use first and second as variables that reference the two elements in the array ['one', 'two']














//you can pass a callback to setState() to access one of the elements stored inside the state object
//keep in mind that calling setState() will remove previous data stored inside state variable, unless you pass a callback like in the example below
function HooksTwo() {
    const [state, setState] = useState({first: 'pizza', second: 'bannana', third: 'cheese'});

    const eventHandler = () => {                            //this is how you declare event handlers in function components
        setState(previousState => {
            return{...previousState, first: 'blue'}         //...previousState breaks down an object into the number of elements it has
        })                                                  // first: 'pizza', second: 'bannana', third: 'cheese'  
    }                                                       //if you have two arguments that are the same, the argument farthest to the right takes precedence

    return(
        <>
            <div> {state.first}</div>
            <div> {state.second}</div>
            <div> {state.third}</div>
            <button onClick={eventHandler}> click here</button>
        </>
    )
}














//useEffect() is a combination of ComponentDidMount, ComponentDidUpdate, ComponentWillUnmount
//this function gets called after every re-render (when the state variable changes, it causes a re-render)
//you can have multiple useEffect() calls in the same function component, this is useful for separating unrelated code and uniting related code
//keep in mind that after every render, useEffect will 'clean up'/'unmount', this means it will clean up the previous effects and apply the effect in the return statement
function HooksThree() {
    const [count, setCount] = useState(0);                      //useState is a Hook, it initializes 'count' to 0 and declares a function 'setCount' to update the 'count'
    const [calculation, setCalculation] = useState(0)

    useEffect(() => {
        setCalculation(count + 2);                              //these are 'effects', changes made to the DOM are also effects            
        return () => {                                          
            //unmounting on every render              
        }
    }, [count]); //if you specify a second argument in useEffect(), then useEffect() will only RE-RUN if this variable changes value, if its [] empty, then useEffect() will only run once
           
    return (
        <>
            <div>{count}</div>
            <button onClick={()=> setCount(count + 1)}> Click here</button>   
            <div>{calculation}</div>
        </>                         //we call setCount function to update our state variable, 
    )                               //to use an event handler, you must include it in an arrow function 
}                                   //by default, setState() will only re-render the component if the state variable changes














//passing state object and setState() to child components by using createContext() and useContext()
const StateObject = createContext();

function ComponentOne() {
    const [state, setState] = useState("pass this down");

    return(                                     //all the child components called inside <StateObject.Provider /> can use the state object
    <>
        <h1>{state}</h1>
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
    const {state, setState} = useContext(StateObject);      //this child component can still display the state object and you can call setState() to update the state object

    return(         
        <h2>
            <button type="button" onClick={() => setState("this is now different")}> Click here</button>
            {state} 
        </h2>
    )
}

//root.render(<ComponentOne/>)

















//useRef() is a hook that initializes a "state" object that does not cause a re-render everytime it gets updated
function Ref() {
    const [count, setCount] = useState(0);
    const myRef = useRef(0);            //you can pass any type of argument; string, objects, arrays, numbers.

    useEffect(()=>{
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

//you can use useRef() to select an element in the DOM
function App() {
    const inputElement = useRef();

    useEffect(()=>{
        console.log(inputElement.current);          //this will log the <input type="text">
        console.log(inputElement.current.value);            //this will return the value that the user typed in the input box
        console.log(inputElement.current.getAttribute("type"))//keep in mind that you can use any method in the DOM with useRef()
    })

    return( //can be any element, doesnt have to be an <input>
        <> 
            <input type="text" ref={inputElement}/>
        </>
    )
}


//useRef() can be used to store a previous value from the state object
function UsingRef() {
    const[state, setState] = useState(0);
    const previousState = useRef(0);

    useEffect(()=>{
        previousState.current = state;                  //remember, this does NOT cause a re-render!,
    },[state])              

    return(
        <>
            <button onClick={()=>setState(state + 1)}> Click Me</button><br/>
            Current State: {state} <br/>
            Previous State: {previousState.current}     
        </> //even though state and previousState have the same value AFTER every render, what is being displayed is different
    )

}


















//useReducer() can be used to extract state management logic out of a component

//this is the object that will contain the values to initialize the state object
const initialState = {           
    counter: 0,
    list: []
}

//this is the reducer, this is where the state management happens
//it will return the new state object
function reducer (state, action) {
    //accessing the two properties in our state object
    const stateCounter = state.counter;
    const stateList = state.list;

    //using a switch statement to determine what to do with the state object
    switch(action.type) {
        case 'addItem':
            stateList.push(action.item)
            return {...state, counter: stateCounter + 1}
        case 'removeItem':
            return {counter: stateCounter - 1, 
                list: stateList.filter((item) => {                          //filter can be used to remove elements from an array
                        return item != action.item;                         //if this returns false, then the new array will NOT contain the item AT THIS POINT
                })
            };
        default:
            throw new Error();        
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
            <button onClick={()=> dispatch(actionOne)}> Click here to dipatch</button>
            <button onClick={()=> dispatch(actionTwo)}> Click here to dipatch</button>
            {state.counter}
            {state.list}
        </>  
    )
}














//useMemo() can be used to make a component run only when a certain variable has changed

function UsingMemo() {
    const [firstCount, setFirstCount] = useState(0);
    const [secondCount, setSecondCount] = useState(0);
    const calculation = useMemo(() => expensiveCalculation(), [secondCount]);       //since we are using useMemo(), the function will only be recreated, if secondCount changes

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


//root.render(<UsingMemo/>)








//using function hooks with inputs

function InputText() {
    const [value, setValue] = useState('');

    return(
        <>
            <input type="text" value={value} onChange={(e)=>setValue(e.target.value)}/>
            {value}
        </>
    )

}





















//you can create your own custom hooks that encapsulates stateful behavior (calculating something) and makes code reusable
//remember that every hook has their isolated state variable

function useCustomHook(random) {
    const [custom, setCustom] = useState(random);
    
    for(let i=0; i < 20; i++){
        custom++;
    }


    return custom;
}

function ExampleWithCustomHooks(props) {
    const myCustom = useCustomHook(props.random);
}

function AnotherExampleWithCustomHooks(props) {
    const myCustom = useCustomHook(props.whatever);
}






































//------------------------------------------------ COMPONENTS -----------------------------------------------------------------------------------------------------------------------

//FUNCTION components: props means properties
//keep in mind that you can pass a function component as an argument into another component
function ExampleOne (props) {
    return <h1> hello, {props.name} </h1>;
}
const myElement = <ExampleOne name="Abel Muro JR"/>;           //syntax used for calling a component function, name is a property of props object
//root.render(myElement);


function ExampleTwo(props) {                                       //you can split large functions into smaller components: this is the whole point of function components 
    return (
        <div>
            <a href={props.src}> </a>
            <p> {props.author.name} </p>
            <p> {props.author.age} </p>   
            <p> <ExampleTwo name="abel"/> </p>             
        </div>
    );  
}
const me = {name:"John", age: "54" };
const myOtherElement = <ExampleTwo src="https://www.google.com" author= {me}/>; //you can pass objects to function components
//root.render(myOtherElement);












//CLASS components: you can pass a class components state to another component(function or class)
class Welcome extends React.Component {
    render() {
        return <h2>hello, world</h2>;
    }
}                                    
//root.render(<Welcome />);                                   //this is the syntax for calling class components


class Greetings extends React.Component {

    constructor(props) {
        super(props);                                       //we should always call the parent constructor of a class component
        this.state = props;                                 //state is an object that stores data that can only be used by this component
        //this.whatever = props;                             //remember that you can create a class field with any name
    }

    componentDidMount() {                                   //lifecycle method that will be called after this class component has been rendered to the DOM
       this.timerID = setInterval(                          //we use setInterval to repeatedly call a function with a fixed time delay between each call
        () => this.change(),
        1000
       );
    }

    componentDidUpdate() {                                  //gets called after every render

    }

    componentWillUnmount() {                                //lifecycle method that will be called after the component has been removed from the DOM
        clearInterval(this.timerID);                        //we clear the interval to free up space
    }

    change() {
        this.setState({color: "pizza"});                     //setState is a function that changes the value stored in this.state, React will merge the object with the object already stored inside this.state
        this.setState(
            (prevState, props) => ({number: prevState.number + props.number})   //function will recieve previous state object and props retains its first value always
        )
    }                                                       //React will then call render() once setState() call is finished
                                                         
    render() {
        return (
            <div>
                <h1> My favorite color is {this.state.color} </h1>
                <h2> My favorite food is {this.state.food} </h2>
                <h3> Current Number is {this.state.number} </h3>
            </div>            
        )
    }
}

//root.render(<Greetings color="purple" food="hot dog" number={1}/>)     //here we are passing two properties to the constructor, React will put these props into an object

































//----------------------------------------------------- CONDITIONAL RENDERING -----------------------------------------------------------------------------

// rememeber that you can use logical operators inside {} in JSX
// 'true && expression' will always return the expression


function UserGreeting() {
    return <p>Welcome back</p>
}

function GuestGreeting() {
    return <p>Welcome Guest</p>
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn)
        return <UserGreeting />

    else
        return <GuestGreeting />
}
//root.render(<Greeting isLoggedIn={true} />);





class LoginControl extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin() {
        this.setState(
            {isLoggedIn: true}
        );
    }

    handleLogout() {
        this.setState(
            {isLoggedIn: false}
        );
    }

    render() {
        let isLoggedIn = this.state.isLoggedIn;
        let button;

        if(isLoggedIn) 
            button = <button onClick={this.logout}> Log out </button>
        
        else
            button = <button onClick={this.login}> Log In </button>

        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        )
    }
}

//root.render(<LoginControl />);






































//----------------------------------------------LISTS/ARRAYS AND KEYS ----------------------------------------------------------------------------------

//keys help React identify which list items have changed
// the 'key' property has a special meaning in React, in the same way that 'this.state' has special meaning

function ListItem(props) {
    return <li>{props.value}</li>
}

function MakeList(props) {
    const numbers = props.array;
    return numbers.map(                                      //using map function to create a <li> for each element in the array
        (number) =>
        <ListItem key={number.toString()} value={number} />  //keep in mind that every list item must have a unique "key"
    )
}

const numbers = [1, 2, 3, 4, 5, 6];

//root.render(<MakeList array={numbers}/>);









































//------------------------------------------------- EVENT HANDLERS -------------------------------------------------------------------------------------------------------------------
//event handlers are always camelCase

//functions that handle events
function handleChange(e) {                          //e represents the event itself
    e.preventDefault();                             //you call the event handlers with e
}
const elementFIVE = <button onClick={handleChange}> Click Here </button>;   //when you call a function in an event handler attribute, you also pass the event itself
//root.render(elementFIVE);




//classes that handle events
class TurnLight extends React.Component {

    constructor(props) {
        super(props);
        this.state = {istoggleLightOn : false};                 
        this.handleClick = this.handleClick.bind(this);         // We use bind(this) to make sure that 'this' references the methods/members in TurnLight component
    }                                                           // keep in mind that 'this' in a function represents the global object Window

    handleClick() {                                         
        this.setState(                                          
            prevState => ({
                istoggleLightOn : !prevState.istoggleLightOn
            })
        )
    }

    render() {
        return (                                                //when lightSwitch method is called via clicking, 'this' will lose its scope, so we must bind it to make sure it references this component
            <button onClick={this.handleClick}> 
                {this.state.istoggleLightOn ? 'Light is on' : 'Light is off'}
            </button>
        )
    }
}
//root.render(<TurnLight />);















































//--------------------------------------------------------------------FORMS ---------------------------------------------------------------------------

//even though you will have more lines of code when you let React handle the Forms in HTML, you will have better control over what is being
//inputed in the forms

class TextBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: 'Type here'};
        this.handleChange = this.handleChange.bind(this); 
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({value: e.target.value});                  //e.target is the element that triggered the event, .value is getting the value from that element
    }

    handleChange(e) {
        alert("your input is " + this.state.value);
        e.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleChange}>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

//root.render(<TextBox />);




class TextArea extends React.Component {

    constructor(props) {
        super(props)
        this.state = {value: "Please Type Here..."};
        this.handleChange = this.handleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    } 

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleChange(e) {
        alert("You have submitted your answer " + this.state.value)
        e.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleChange}>
                <textarea value={this.state.value} onChange={this.handleChange}></textarea>
                <input type="submit" value="Submit"/>          
            </form>
        );
    }
}

//root.render(<TextArea />);




class Select extends React.Component {

    constructor(props) {
        super(props);
        this.state = {usersChoice: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.setState({usersChoice: e.target.value})
    }

    handleChange(e) {
        alert("You have choosen " + this.state.usersChoice);
        e.preventDefault();
    }   

    render() {
        return (
            <form onSubmit={this.handleChange}>    
                <label>
                    Choose your favorite color: 
                    <select onChange={this.handleChange}>
                        <option value="red"> Red</option>
                        <option value="green"> green</option>
                        <option value="blue"> blue</option>
                        <option selected value="orange"> orange</option>
                    </select>                    
                </label>
                <input type="submit" value="SUBMIT"/>
            </form>
        )
    }
}

//root.render(<Select />);


class MultipleInputs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            InputOne : "first box",
            InputTwo : "second box"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const inputName = e.target.name;
        const value = e.target.value;

        this.setState({
            [inputName]: value                                              //you can use [] in case there are multiple elements calling this method
        })
    }

    handleChange(e) {
        alert(
            "You have entered " + this.state.InputOne + " " +
            "You have entered " + this.state.InputTwo
        );
    }

    render() {
        return(                                     //keep in mind that when you assign something to 'value', you prevent the user from changing the textbox 
            <form onSubmit={this.handleChange}>
                <input type="text" name="InputOne" value={this.state.InputOne} onChange={this.handleChange}/> 
                <input type="text" name="InputTwo" value={this.state.InputTwo} onChange={this.handleChange}/>
                <input type="submit" value="submit"/>
            </form>
        )
    }
}

//root.render(<MultipleInputs />);






















//-------------------------------------------------------------------MANIPULATING STATE -----------------------------------------------------------------------

//When you are dealing with multiple components that are nested within each other,
//make sure to have only ONE component that has the state object containing ALL the
//data being manipulated


class Pets extends React.Component {

    constructor(props) {
        super(props);
        this.addPetInfo = this.addPetInfo.bind(this);
        this.state={
            cat: {
                name: "nothing",
                breed: "",
                age: "",
                healthy: true
            }
        };
    }

    addPetInfo(animal, newInfo) {                                       //all child components will call this function to update the state object in this parent component
        this.setState({
            [animal]: {
                name: newInfo.name,
                breed: newInfo.breed,
                age: newInfo.age,
                healthy: newInfo.healthy              
            }
        })
        
    }

    render() {
        console.log(this.state.cat);
        return (                                                        //passing the method (that updates the state object) to the child component
            <div>                                                       
                <Cats storePetInfo={this.addPetInfo}/>                  
            </div>
        )

       
    }
}

class Cats extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        this.props.storePetInfo("cat", {                                        // .storePetInfo was passed from the parent component
                name: e.target.catName.value,
                breed: e.target.breedName.value,
                age: e.target.age.value,
                healthy: e.target.isHealthy.value
        });
        e.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Enter the name of your cat:
                    <input name="catName"type="text"/>                    
                </label>
                <label>
                    Enter the breed:
                    <input name="breedName" type="text"/>
                </label>
                <label>
                    Enter the age:
                    <input name="age"type="text"/>
                </label>
                <label>
                    Is your cat healthy? :
                    <select name="isHealthy">
                        <option value="true">
                            yes
                        </option>
                        <option value="false">
                            no
                        </option>
                    </select>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        )
    }
};






























//----------------------------------------------------------------COMPOSITION (using child components)---------------------------------------------------------------------------------------------
//remember that PROPS can accept any primitive value, React components and functions

//you can pass nested elements in JSX to function components
function CreateBorder(props) {
    return (                                                        //you can use the built-in property 'children' to pass child elements onto this component
        <div style={{color: props.color}}>                      
            {props.children}                                  
        </div>
    )                                                               //you can use any property passed from a parent component in the same way that we
}                                                                   // used props.name


function Dialog() {
    return (                                                        //everything inside <CreateBorder> </CreateBorder> will be passed as props.children
        <CreateBorder color={"red"}>
            <h1>Welcome Home</h1>
            <h2> Abel Muro</h2>
        </CreateBorder>
    )
}









//=========================================================== MEMO ===========================================================================================

//look at the example below
//DisplayList() component will continue to re-render when MyApp() is re-rendered, even though its props havent changed, this can cause performance issues
//to solve this problem, you can use memo(DisplayList) while exporting a component to make it only re-render when its props value changes


//---------anotherFile.js---------
// import {memo} from 'react'
function DisplayList(props) {
    let list = props.list;
    return(
        <>
            {list.map((item)=>{return item})}
        </>
    )
}
// export default memo(DisplayList);                    //now, DisplayList will only update when its props changes


//----------index.js----------------
// import DisplayList from 'anotherFile.js'
function MyApp() {
    const [count, setCount] = useState(0);
    const [list, setList] = useState(['pizza', 'burger'])

    const increment = () => {
        setCount(count + 1)
    };

    return(
        <>
            <DisplayList list={list}/>
            <button onClick={increment}> increment</button>
        </>

    )
}


//there is a problem with memo(), if you pass an event handler like this     <DisplayList list={list} function={eventHandler}/>
//then its props will change because after every re-render, the functions get recreated, so that means the props have actually changed, so it will re-render regardless
//one way to fix this is to use the hook useCallback(), this will make sure that the function will only be recreated when necessary


//---------anotherFile.js---------
// import {memo} from 'react'
function DisplayMyList(props) {
    let list = props.list;
    let addItem = props.addItem;
    return(
        <>
            <button onClick={addItem}> Add Item</button>
            {list.map((item)=>{return item})}
        </>
    )
}
// export default memo(DisplayList);                    //now, DisplayList will only update when its props changes


//----------index.js----------------
// import DisplayList from 'anotherFile.js'
function UsingCallBack() {
    const [count, setCount] = useState(0);
    const [list, setList] = useState(['pizza', 'burger'])

    const increment = () => {
        setCount(count + 1)
    };

    const addItem = useCallback(() => {
    setList((items)=>[...items, 'new item']);
     }, [list]);                                       //the function will only get recreated when the list state object changes


    return(
        <>
            <DisplayMyList list={list} addItem={addItem}/>
            <button onClick={increment}> increment</button>
        </>

    )
}






















//---------------------------------------------------------------- RENDER PROPS ---------------------------------------------------------
//the idea behind render props is to reuse stateful behavior with other components
//in the example below we have the stateful behavior inside MouseWithCat
//but this example will not make it possible to reuse the stateful behavior

class Catss extends React.Component {
    render() {
        const mouse = this.props.mouse;
        return (
            <img src="./cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
        );
    }
}
class MouseWithCat extends React.Component {
    constructor(props) {
      super(props);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.state = {x: 0, y: 0};
    }
    handleMouseMove(event) {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }
    render() {
      return ( 
        <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
            <Catss mouse={this.state} />                                          
        </div>
      );
    }
}
class MouseTrackers extends React.Component {
    render() {
      return (
        <div>
          <h1>Move the mouse around!</h1>
          <MouseWithCat />
        </div>
      );
    }
}




//the example below is how we use render props to make code more reusable

class Cat extends React.Component {

    render() {
        const mouse = this.props.mouse;
        return (
            <img src="./cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
        );
    }
}

class Mouse extends React.Component {
    constructor(props) {
      super(props);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.state = {x: 0, y: 0};
    }

    handleMouseMove(event) {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }

    render() {
      return (      //we are calling the render function that was passed down by <MouseTracker />
        <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
           {this.props.render(this.state)}                                               
        </div>
      );
    }
}

class MouseTracker extends React.Component {

    render() {
      return (              //we are passing a callback function that will render <cat> component with a mouse property
        <div>
          <h1>Move the mouse around!</h1>
          <Mouse render={mouse => (<Cat mouse={mouse}/>)} />
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











