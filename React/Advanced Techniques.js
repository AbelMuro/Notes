

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









