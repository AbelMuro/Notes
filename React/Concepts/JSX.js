
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



