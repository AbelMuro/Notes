/* 
                                                                    LIFECYCLE
                                                                    
                    Lifecycle refers to the process that a component takes to be mounted onto the DOM and unmounted from the DOM.
                    The lifecycle has 4 main phases; Initialization phase,  Mounting phase, Updating phase, and the Unmounting phase. 
                    
                      1) The initialization phase starts by creating the props, state, and functions of the component. 
                    
                      2) The mounting phase begins by rendering the component into the DOM for the first time. 
                    
                      3) The updating phase begins  when the state of the component is updated, thus triggering 
                      a re-render(stuff gets updated on the screen) on the component.
                    
                      4) Then the umounting phase starts by removing the component (its JSX) from the DOM.

*/



// ------------------------------------- CLASS LIFECYCLE METHODS -------------------------------------

class ClassComponent extends React.Component {                    
 
    static getDerivedStateFromProps(props, state){                                //lifecycle method that is called before the first render and after every render, and is used when the state is dependent on props
        if(props.value !== state.value)
              return {value : props.value};                                               //this will be the new state
        else
             return null;                                                                 //no changes are made to state
    }
        
X   componentDidMount() {                                                         //lifecycle method that is called ONLY after the first render
    }
      
    shouldComponentUpdate(nextProps, nextState){                                  //lifecycle method that determines if the component will update or not
            if(this.props.val == nextProps.val && this.state.value == nextState.value)
                  return false;                                                         //will NOT update
            else
                 return true                                                            //will update
    }    
        
    getSnapShotBeforeUpdate(){                                                   //lifecycle method that is called before every render (but not before the first render)
    }                                                                                     //anything that is returned from this function will be passed to compondentDidUpdate as an argument
        
        
X   componentDidUpdate(prevProps, prevState, snapshot) {                         //lifecycle method that gets called after every render, except the first render
    }

X   componentWillUnmount() {                                                     //lifecycle method that will be called after the component has been removed from the DOM
    }
                                             
}










//------------------------------------- FUNCTION LIFECYCLES -------------------------------------

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

