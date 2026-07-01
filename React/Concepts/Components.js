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

