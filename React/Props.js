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
