/* 
					             FEATURES OF JAVASCRIPT


       							DYNAMICALLY TYPED
		      	  Javascript is a dynamically typed language, meaning that any variable can change its data type at any time
					let count = 4;
					count = true;

     							SINGLE-THREADED
	    		  Javascript is single threaded, meaning that it can only perform one task at a time

     							GARBAGE COLLECTORS
		    	  Javascript will automatically free up space when a variable or object is not being used anymore

 							      SCOPES
	      		  Scope refers to the area of access that a variable in Javascript has. Javascript has three 
	   		 types of scope; function scope, block scope, and global scope.

 							   LEXICAL SCOPE
			  Lexical scope refers to the way variable access is determined within functions. Javascript has a hierarchical 
			  scope structure, where the inner function has access to the variables declared in the outer function, but not the
			  other way around. Variable access is determined during the definition of the function and NOT during the execution
     			  of the function.
						function outer(){
						     const x = 2;
						     function inner() {
							 console.log(x);     //x can be accessed here
						     }
						}

      							       CLOSURES
		    	 A closure in Javascript is the concept that allows functions to use variables and objects that are declared 
			 outside of its local scope. Variables being used inside a closure will not be garbage collected during the lifetime
    			 of the functions execution context.

    						const x = 5;

       						function myFunc(){		//this function formed a closure with the x variable
	     					   console.log(x);
						}

      						          SCOPE CHAIN RESOLUTION
			 Scope chain resolution is the concept that javascript uses to determine which declaration of variables to use 
    			 within a function. When a function uses a variable or object within its local scope, javascript will look for the 
			 declaration of the variable in the local scope first. If it doesn't find it there, then it will look for the 
    			 declaration in the outer scopes.
							
							const x = 7;				//javascript will not use this declaration
							function outermost(){
       							    const x = 4;			//javascript finds a declaration here
							    function outer(){
								function inner(){
								    function innermmost(){
	    								console.log(x);	        //we start scope chain resolution here and look to the outer functions
								    }
								}							
							   }
							}
 
    	
  							      STACK/HEAP
		         Javascript uses the stack and the heap to store and manage temporary data. The Stack is used for function calls, 
	   		 every function call creates a stack frame that contain the execution context(local variables, other function calls) 
       			 of the function, the stack frame is then placed into the stack. The heap is used to store objects and large data structures.
			 The stack is faster, but has limited spaced. The heap is slower, but has dynamic memory allocation, in other words, it can
    			 grow as needed.

							       EVENT LOOP
    			 Node.js uses the event loop to process and handle tasks, even though Node.js is single-threaded, we use the
    			 event loop to simultaneously perform multiple tasks. All synchronous tasks are placed in the call-stack,
		  	 and executed one by one. All asynchronous tasks are taken out of the call-stack and processed in a different 
		    	 thread (this thread is NOT part of node.js). Once the asynchronous task has completed in the 
		         separate thread, it will then be placed in the Queue. Once the call-stack is empty, all tasks in the 
			 queue then get placed in the call-stack for execution in the main node.js thread. Keep in mind that the queue
    			 divides its tasks into microtasks and macrotasks; microtasks(promises) have a higher priority, and macrotasks(setTimeout) 
			 have a lower priority

				   JAVASCRIPT THREAD			    SEPARATE THREAD											 	
			 	
				     Call stack												  	  
			  	   |		|										
				   |		|												
				   |  syncFunc	|											
				   |  AsyncFunc	| --------------> this async function is taken out of the call stack 	
				   |  syncFunc	|		  and processed in a separate thread. Once the function				
				   |  syncFunc	|                 finishes processing, it gets placed in the Queue				
				   |  syncFunc	|				|								
				   -------------				|								
					^					|
					| 					|	
				       Queue					|
				   |		|				|
				   |		|	<---------------------- |
				   |		|
				   |		|
				   |		|
				   | AsyncFunc  |		The Queue will complete all microtasks before completing macrotasks
				    ----------				

       	           					    EVENT PROPAGATION
		           When an event is triggered in the DOM, JS will use Event Propagation.
		           Lets say that we have a button nested inside a div, the button was clicked and triggered
		           its on-click event. What happens next are the 3 main phases/steps of Event Propagation
	
		                   1) Capturing Phase: JS will look for the button element that initially triggered the event.
		                                       It starts at the top of the DOM tree (HTML) and works 
		                                       its way down until it finds the button element. If there are any event listeners
		                                       for the capturing phase in the parent elements, these elements will handle event
		                                       before it reaches the button element
		        
		                                       div.addEventListener('click', () => {
		                                           console.log('Div clicked during capturing phase');
		                                        }, true);                             //third argument specifies that the event listener will be triggered on the capturing phase
		        
		                   2) Target Phase: Once JS finds the button element, it will trigger the on-click event handler
		        
		                   3) Bubbling Phase: The event will then 'bubble' up to the top of the DOM tree. Starting from the 
		                                      button element, then finally to the html element. If any element (html, div) has an event listener for the 
		                                      bubbling phase of the event, it will be triggered.    
		        
		                                      div.addEventListener('click', () => {
		                                          console.log('Div clicked during bubbling phase');
		                                        });






*/






//====================================================================DATA TYPES =================================================================================
//Expressions: are lines of code that produces a value
"hello";                            //produces "hello"
2 == 2;                             //produces true
4 < 1;                              //produces false



//Statement: are lines of code that DON'T produce a value
let hi = 6;



//primitive types
null;                               // a placeholder that is used to assign a variable when we dont need it or when we are debugging
undefined;                          // a placeholder that is automatically assigned to a variable that is not assign a value
Boolean;                            // true or false
Number;                             // a whole number or fraction
BigInt;                             // an extremely large number or extremely small number
String;                             // a string 
Symbol;                             // gives a unique value to a variable with an optional description, let x = Symbol("description");   x will always have a unique value


//reference types
Object;                             // a collection of properties and values that are used to organize data
Array;                              
Set;
Map;
Date;                               //object that returns the current date
Function;                           //functions are objects in javascript
RegExp;
Math;

//keep in mind that the non-primitive types (except function) above are actually constructors(functions) 
let x = new Object({name: "abel"});                               //these two lines have the same effect                          
let x = {name: "abel"};

let y = new Boolean(4 > 5);                                       //these two lines have the same effect  
let y = 4 > 5;

let y = new Number(3);                                            //these two lines have the same effect
let y = 3;

let x = new Array([1,2,3]);                                       //these two lines have the same effect
let x = [1,2,3];













 


//=================================================== WINDOW OBJECT ========================================================
// The window object represents the browsers window or the tab that displays the app or website. It is the parent of all objects
// that are created in JS. All objects, variables, functions and classes are automatically members of the window object
// Some useful properties in the window object are the following...


window.navigator; 		//this will return an object that contains data relative to the operating system of the user (read-only)
window.scrollTo(0,0)
window.addEventListener('scroll', () => {})








	


//================================================= MODULES ==============================================================
/* 
	Modules are a way of breaking down code into smaller parts
*/


// Module.js
export const func1 = () => {}
export const func2 = () => {}
export default {myData: 34};



// Index.js
import data, {func1, func2} from './Module.js';

func1();
func2();







//=============================================== NAMESPACE ===============================================================
/* 
	Namespaces group together a bunch of variables, objects, and functions under one roof
*/

let obj = {};

obj.name = 'abel';
obj.method = function(){
	console.log('hi');
}


















//============================================================== DOM ==============================================================

//keep in mind that every element in a document is considered a "node" and the text inside an element are called text nodes
document.getElementById("random_ID").childNodes[0];                             //you can use .childNodes[] as an array to reference any child elements
const node = document.getElementById("random_ID");                              //this returns a reference to an element                      
document.querySelector("class/tagName").removeChild(node.childNodes[0]);           //removing a nested child element from the parent container
document.querySelector("class/tagName").removeChild(parent);
document.querySelector("class/tagName").appendChild(new_node);                     //inserts a child node AT THE END of an parent element
document.querySelector("class/tagName").insertBefore(new_node, existing_child_node);//inserts a new child element/node before an existing child element/node



//the different ways to reference an element from the DOM
document.getElementById("random_ID");                                           
document.getElementsByTagName("div");                                            //this will return an array of references
document.getElementsByTagName("div")[0];                                        //you can use array syntax to get the first, second,... element of a specific tag type, this can be used by ALL methods
document.getElementsByClassName("my_class");                   
document.querySelector("p.class_name");                                         //this follows the same syntax as css , this will return the first occurance within the document that matches the specified selector
document.querySelectorAll("p.class_name");                                      //this will return an array with all the elements that have <p class="class_name">
//you can use either id or name attributes here
document.forms["form_id"];                                                      //this returns a reference to a form with the ID "form_ID"     
document.forms["form_id"]["input_name"];                                        //getting a child element <input> that has the attribute name = "input_name" 
document.forms["form_id"]["input_name"].value;                                  //getting the value inputted by the user


//changing the content and attributes of elements
document.querySelector("class/tagName").innerHTML = "adding text";                 //innerHTML is inside the tags of the element
document.querySelector("class/tagName").innerHTML;                                 //this will return a text node that contains the text inside the tag elements
document.querySelector("class/tagName").height = "100px";                           //you can assign a different value to ANY ATTRIBUTE by their name directly
document.querySelector("class/tagName").style.backgroundColor = "red";             //to change a CSS property, this is the syntax you must use, remember that the properties are camel case
document.querySelector("class/tagName").setAttribute(color, "red");                //you can also add a new attribute to an element


//creating and deleting elements, these elements only show up on the document if they are inserted to an existing element in the document
document.createElement("div");                                                  //creating a <div> </div> element
document.createTextNode("hello world!");                                        //creating a text node (same as innerHTML) and returns a reference to that node
document.body.removeChild(node);                                                //this is how you remove an entire element 


document.getElementById("div").childNodes[0].nodeValue;                         //you can reference a child element with childNodes[0],and nodeValue is the same as .innerHTML              
document.getElementById("div").firstElementChild;                               //references the first child element nested within
document.getElementById("div").lastElementChild;                                //references the last child element nested within
document.getElementById("div").closest(".className")                            //will choose the closest parent/grandparent element that has the specified selector
document.querySelector("div").scrollIntoView({behavior: 'smooth'});             //you can automatically scroll to a specific element by using scrollIntoView()

// EVENT LISTENERS are triggered by the user
document.getElementById("id").onclick = function() {                
    //code goes here
}
document.getElementById("id").resize = function() {                             //functions is called when the element is resized
    //code goes here
}
document.getElementById("id").onmouseover = function() {                        //function is called when the user hovers over the element
    //code goes here
}
document.getElementById("id").onload = function() {                             //this function is called when the user enters the page          
    //code goes here                                                            //this can be used to check cookies on the webpage, and check the visitors browser type and version
}
document.getElementById("id").onunload = function() {                           //this function is called when the user leaves the page            
    //code goes here
}
document.getElementById("id").onchange = function() {                           //function is called in conjunction with input fields, when the user inputs something, and leaves the field,           
    //code goes here                                                                the function will be invoked 
}
document.getElementById("id").onfocus = function() {                            //function is called when a user focuses on an input field
    //code goes here
} 
document.getElementById("id").addEventListener("click", myFunction);            //this is the same as the event handlers above, this is useful for adding multiple functions for the same event
document.getElementById("id").addEventListener("click", mySecondFunction);
document.getElementById("parent").addEventListener("click", mySecondFunction, false)//third parameter specifies whether the parent element or the child element will have their even handleled first
document.getElementById("child").addEventListener("click", mySecondFunction, false) //default is false, which means that the child event will be handleled first and then the parent event
document.getElementById("id").addEventListener("click", function() {myThirdFunction(a,b)});     //in case you want to call a function that has parameters
document.getElementById("id").addEventListener("click", (e) => {

    //keep in mind that you can access any attribute of an element that you target
    e.target;                           //targeting the element that triggered the event,
    e.target.parentElement              //targeting the parent element of the element that triggered the event
    e.target.value                      //targeting the element that triggered the event and getting their value attribute, this is useful for form elements
    e.target.children                   //targeting the element that triggered the event and returning all child nodes nested within that element
    e.target.id                         //targeting the element that triggered the event and getting the value in their ID attribute
    e.target.classList                  //targetting the element that triggered the event and getting the classlist of the element
    e.target.src                        //targetting the element that triggered the event and getting the src attribute
    e.target.style.width = "300px"      //targeting the element that triggered the event and assigning 300px to its width property (setting inline styles)
    e.target.matches(".someClass");     //this is useful for trying to target an element only if it matches the requested selector (will return true or false)
})


// EVENT EMITTERS are triggered manually by the programmer

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('customEvent', () => {
  console.log('an event occurred!');
});

myEmitter.emit('customEvent');			//emit() can trigger the event 





















// ====================================================================== LEXICAL SCOPE ====================================================================== 
// Scope is the area around a variable that can be used.
// note, any variable defined outside a function or {} will have global scope, 
// any variables defined inside a function or {} will have local scope

// let variables can be used ANYWHERE inside the {}, where it is declared (BLOCK SCOPE)
function LET_variables() {
      let x = 10;                                                       // let variables are block scope     
      let x = 11;                                                       // you CAN'T redeclare a let variable
            
      if(true) {
           let y = 10                                                   // 'y' can ONLY be used here
           x;                                                           // 'x' can be used here
      }             
      x;                                                                // 'x' can be used here  
      y;                                                                // 'y' CANT be used here
}


//  var variables can be used ANYWHERE inside the function, where it is declared (FUNCTION SCOPE)
function VAR_variables() {
       var x = 10;                                                      // var variables have function scope
       var x = 11;                                                      // you can redeclare a var variable
            
       if(true){
            var y = 10;                                                
            x;                                                          // x can be used here
       }    
            
       x;                                                               // x can be used here
       y;                                                               // y can be used here
            
      function more_VAR_variables() {                                   // nested function
            x;                                                          // x can be used here      
            var z = 10;
      }
          
     z;                                                                 // z CANT be used here           
}

// const variables can be used ANYWHERE inside the {}, where it is declared
function CONST_variables() {
       const x = 10;                                                    // const variables have block scope
       x = 11;                                                          // you CANNOT reassign a value to a const variable          
}

//-------------------------------------------------------HOISTING----------------------------------------------------
//hoisting is a process where javascript hoists all variable declarations to the top of its scope, however, their values do not get hoisted
//keep in mind that functions also get hoisted up with their definitions
//all var, let and const variables get hoisted to the top of the functions scope and assigned the value of undefined
//function declarations also get hoisted up, but they all get hoisted up WITH its definition
//but let and const cannot be accessed before its declaration because everything before the declaration is the temporal dead zone

Hoisting();                                               // this is still legal, but if you use a function expression, then it wont work
function Hoisting() {                                     // this is how hoisting really looks like    
     //var x = undefined;                                 // var variables get assigned the value of undefined
     //let y;                                             // this will throw a reference error                                
     //const z;                                           // this will throw a reference error
       
      console.log(x);                                     // x will be undefined    
      console.log(y);                                     // will return a reference error
      console.log(z);                                     // will return a reference error
      
      var x = 10;                                         // this will be hoisted to the top of the top of this function
      let y = 4;                                          // this will be hoisted to the top of the top of this function
      const z = 5;                                        // this will be hoisted to the top of the top of this function
}

//-------------the reason we have hoisting in js ----------------
//in the functions below, we have functions that are calling other functions BEFORE they are being declared and defined.
//This is possible because JS hoists the definitions and declarations of the functions to the top of the current scope
//If hoisting wasn't possible in JS, then the developer would have to refactor the code to make sure the function calls
// happen after the declaration and definitions of the functions

function a() {
	b();
  	console.log('a')
}
function b() {
  	c();
	console.log('b')
}
function c() {
	console.log('c')
}
a();

//--------------variables without let, const and var---------------
// By omitting let, const and var, you are creating a property in the window object
// keep in mind that these variables do NOT get hoisted up

foo = 5;			//window.foo
console.log(foo)
			


//-------------------------------------------------------------- TEMPORAL DEAD ZONE ------------------------------------------------
//Temporal dead zone is the term used to describe the state of a variable that is within the scope but has not yet been declared
//This usually applies to let and const variables

{
 	// This is the temporal dead zone for the age variable!
	// This is the temporal dead zone for the age variable!
	// This is the temporal dead zone for the age variable!
 	// This is the temporal dead zone for the age variable!
	let age = 25; // Whew, we got there! No more TDZ
	console.log(age);
}

//-------------------------------------------------------------- SCOPE CHAIN RESOLUTION-------------------------------------------------------------------------
/* 
      Scope Chain Resolution is the process of functions that look for a declaration/definiton of a variable starting from the local scope,
      and work their way outward towards the global scope

      Take a look at the example below
*/


function outer() {
      var x = 4;
      function inner(){
            console.log(x);               // this will console log undefined because the function will not look at the parent function scope for 'x' 
            var x = 10;                   // because 'x' is already declared in the local scope of this function
      }
      console.log(x);                     //this will console log 4
}


function outerMost() {                       //outerMost has a declaration for x, so it uses x for the closure in innerMost()
      var x = 3;
      function outer(){                      //outer() doesnt have a declaration for x, so it searches for x in the grandparent scope
            function inner() {
                  function innerMost() {     //innerMost() doesnt have a declaration for x, so it searches for x in the parent scope
                        console.log(x);      //this will console log 3
                  }
            }
      }
}




































//====================================================================== PROTOTYPE ===================================================================
// Prototype is basically the mechanism that allows objects to inherit methods and properties from another object
// Keep in mind that prototype is an object that contains methods and properties that are inherited by another object

// All objects in javascript have two default properties, __proto__ and prototype
// Prototype is used to add new methods and properties to an object after its declaration and initialization
// _proto_ is used to look up methods and properties that have been inherited by other objects


function Constructor(){
      this.name = "abel";
      this.last = "muro";
      this.age = 678;
}

Constructor.prototype.birthplace = "san francisco";
Constructor.prototype.getName = function() {		    //you can also add new methods to constructors like this
      return this.name
}                                  
 

let myObject = new Constructor();                           //everytime you use constructor, the object will also have the new property birthplace
object.getName();    



//------------------------------------------------------------------- PROTOTYPE CHAIN ------------------------------------------------------------------
// visual example... (myArray is an object that has the property Prototype)

// let myArray = new Array([1,2,3])                               
//       |
//       |   
//       -> [[prototype]]: -> pop() 
//                         -> forEach()
//                         -> push()
//                         -> ...
//                         -> [[prototype]]: -> toString()
//                                           -> hasOwnProperty()
//                                           -> valueOf()
//                                           -> ...
//					     -> [[Prorotype]]: null	
      




//----------------------------------------------------- setPrototypeOf() and getPrototypeOf()--------------------------------------------------------
//The two methods setPrototypeOf() and getPrototypeOf() enable you to manually inherit methods and properties from one object to another


var objOne = {
    x: 1
}

var objTwo = {
    getX() {
  	return x;
    }
}	            

Object.setPrototypeOf(objOne, objTwo);	//objOne will inherit the methods and properties from objTwo
console.log(objOne);		
/* 				
       var objOne = {			//this is what will be displayed in the console
  	   getX: getX() {
    		return x;
  	   },
  	   x: 1
	}
*/

const currentProto = Object.getPrototypeOf(objOne);	//this function will display all the methods and properties that have been inherited to objOne
console.log(currentProto)
/* 
	var objOne = {			//this is what will be displayed in the console
  	   getX: getX() {		//getX has been inherited from objTwo
    		return x;
  	   }
	}
*/

//------------------------------------------------ USING PROTOTYPE PROPERTY -------------------------------------------------------------------------
//With the prototype property, you can add new methods and properties to an object that has already been declared


//adding methods and properties to function constructors
function Person(name) {
    this.name = name;
}

Person.prototype.sayHello = function () {		//adding a new method for the Person constructor
	console.log('hello world')
}

const person = new Person('David');

person.sayHello();






















//============================================================== FUNCTIONS ==============================================================
//Functions are similar to the functions in math, they take an input(argument), process the input, and return an output
//keep in mind that the return statement should be on the same line as the output being returned from the function                


//------------------------------------------------------pure function----------------------------------------------------------------
//The function does not rely on external variables in a closure
//The function produces the same result if the same arguments are passed to the function
//The function doesn't make any HTTP calls to a server
//The function doesn't mutate the arguments passed to it
	
function myFunction(a, b){                                      	     //a and b are called arguments   
    let c = a + b;
    return c;                                                                 //function will return a string
}
function_with_parameters(1, 2);                                               // this is how you call a function


//-------------------constructor function; this function lets you create objects---------------------------------
function myConstructor(name, age, city){                                     //This is a constructor function, it allows us to create objects
    this.name = name;
    this.age = age;
    this.city = city;
    this.method = function () {
    	return this.name + this.age + this.city;	
    }
}
let myObject = new myConstructor("abel", 29, "San Francisco");


//---------------------------------different ways of accepting arguments in function-----------------
function destructuring({valueOne, valueTwo})                                  //you can pass an object that has two properties to this function
function defaultValues(a, b, c = "string")				      //you can initialize a parameter if the function call doesnt have enough arguments
function manyArguments(...nums){                                              //you can use the REST operator to group together all the arguments into an array
      nums.forEach((num) => {                                                 //nums is an array at this point                                               
            console.log(num);
      })
}
      
      
//--------------------------------- CALL(), APPLY(), BIND()------------------------------------------------------------
// Call(), Apply(), Bind() will	'tie' a function into an object as if it belonged to that object.
// Traditionally in JavaScript, you can have objects that have their own properties and methods. 
// For example, object1 cannot use the methods of object2 and vice versa.
// Call(), Apply() and Bind() can solve this problem
	
var obj = { 
	num: 2,
	//add: function (a = 1) {					      //this is what it looks like when we use call() below 
	      //return this.num + a;
        //}
};
function add(a = 1){						  	      //call() can also work if add() was a method in an object
     return this.num + a;
}
	
add.call(obj, 2);							     //the Add constructor will access all the properties and methods from 'obj' in this call()
add.apply(obj, [2,3,4])	

	
//-------- bind() works a little different, it was design to bind 'this' to a function and returns a new function -------------------
// The reason you want to do this is to pass a function that uses 'This' into another function because 'This' will lose its value

const person = {
  firstName: "John",						//this value will be replaced by the value in the employee object
  lastName: "Doe",
  method: function () {
    return this.firstName + " " + this.lastName;
  },
};

const employee = {
  firstName: "Jane",
  lastName: "Smith",
};

let employeeName = person.method.bind(employee);		//all properties in 'person' will be replaced by the properties in 'employee'

console.log(employeeName()); // Jane Smith
	

//---------------------------------IIFE: immediately invoked function expression------------------------
//IIFE are functions that get called on the spot

//keep in mind that IIFE functions are now part of a block scope
(function(){                                          //the moment you define the function, it gets called right away
    let a = 100;
})();


//------------------------------------------ arrow functions--------------------------------------------
//Arrow functions help reduce the syntax of a regular function
//another thing to note is that arrow functions dont have their own 'this'
//meaning that if you use 'this' in an arrow function, then it will refer to the scope in which the function was defined


(a, b) => {return "something"};                                                 //This is an arrow function, it has different syntax but it does the same thing as a function

e => e + 1;                                                                      //this arrow function will automatically return e + 1, no return keyword is nesessary                                                                          

	
	
//-------------------------------------------- Generator functions -----------------------------------------
//Generators are functions that can be paused during execution and resumed, 
// instead of executing all of a function’s statements in one pass.
//When you invoke a generator function, it will return an iterator object,
// With each call of the iterator’s next() method, the generator’s body 
// will be executed until the next yield statement, where it will then pause:

	
function* myGenerator(){
    let first = yield 'first yield value';
    let second = yield 'second yield value';
    return 'third returned value';
}
	
const myIterator = myGenerator()
console.log(myIterator.next()); // {value: "first yield value", done: false}
console.log(myIterator.next()); // {value: "second yield value", done: false}
console.log(myIterator.next()); // {value: "third returned value", done: true}
console.log(myIterator.next()); // {value: "undefined", done: true}      



//-------------------------------------------------- THIS in functions ------------------------------------------------
//keep in mind that arrow functions dont have 'this' binded, but regular functions do

this;					// 'this' is the same as the 'this' in the function below
const myArrowFunc = () => {
	this;
}

myArrowFunc();

























//================================================================ CLOSURES ===========================================================
// Closures are functions that maintain a REFERENCE to the variables/objects that are defined outside of its local scope
// Keep in mind that in other programming languages, a function does not have access to variables defined outside of its scope
// but its possible in Javascript because of closures
// Remember that a closure is stored in the heap memory and NOT the call stack, this can consume alot of memory if the closure contains alot of variables
// Variables inside of a closure cannot be garbage collected because the variables will be needed for the closure

//If you console log the name of a function, it will give you the definition of a function and a property called closure
//this 'property' will have a list of all the variables and objects that the function can use in its lifetime

      
let y = 2;

function inner(){            //inner() formed a closure with is surrounding scope, the closure consists of just the global variable y = 2;
      let x = 3;
      return x + y; 
}
   

// ----------------another example of closure------------------------------------
//in the example below, we call outerFunction() in two different instances,
//one instance has the closure with the variables x = 5, y = 2
//the other instance has the closure with the variables x = 10, y = 2
      
      
function outerFunction(x) {
      return function innerFunction(y) {                                  //keep in mind that makeAdder will return a reference to another function
            return x + y;                                                 // but it will NOT call the inner function
      };
}

const add5 = outerFunction(5);                                            // calling outerFunction will make innerFunction "remember" that x is 5                            
const add10 = outerFunction(10);                                          // calling outerFunction will make innerFunction "remember" that x is 10

console.log(add5(2));                                                     // will console log 7 because innerFunction remembers that x is 5
console.log(add10(2));                                                    // will console log 12 because innerFunction remembers that x is 10
     
      
      
         
          
	       
	       
	       
	       
	       
	       
	       
	       
	     
	       
	       
	       
	       
	       
	       
	       
	       
	       
      
      
//============================================================== THIS ============================================================== 
//THIS is a keyword that refers to an object in javascript

//-----------------------------THIS in the global scope----------------------------


this;                                       //if you use THIS in the global scope, then it refers to the global object Window



//------------------------------THIS in regular functions------------------------------
//THIS in functions refers to the object that calls/invokes the function
//remember, for an function to be owned by an object you made, 
//you must assign the function to one of the properties inside the object

//myObject 'owns' the function 'myMethod'
let myObject = {
      name: "abel",
      age: 29,
      myMethod: function() {                  //since we assigned this function to one of the properties of myObject, this function belongs to myObject 
            function inner(){}                //this inner function is not owned by myObject, it is owned by Window global object
            return this.name + this.age;      //THIS refers to myObject
      }
}

//Window 'owns' this function
function myFunction(){
    return this;                            //this will also return the global window object;
}

window.myFunction();                       //all functions are part of the window object

//-------------------------------THIS in arrow functions------------------------------------
//THIS in arrow functions refers to the parent object of the object that owns the arrow function
//remember, that functions in javascript are also objects


//arrowFunction doesnt have a parent object, so THIS will just point to the window object
window.arrowFunction();
let arrowFunction = () => {
      console.log(this);                              //this will return the global object
}

//Parent Object of myObject is the window object
window.myObject.myMethod();                           //THIS in myMethod will point to the window object because its the parent object
let myObject = {
      name: "john",
      age: "24",
      myMethod: () => {
          console.log(this);                          //even though this arrow function is 'owned' by myObject
      }                                               //THIS will refer to the parent object of myObject, which 
}

//innerFunction is still owned by the window object
window.innerFunction();
function outerFunction() {
      let innerFunction = () => {console.log(this)}                       //this arrow functions doesnt belong to myFunction()
}


//
window.myObject.myMethod()
let myObject = {
      name: "john",
      age: "24",
      myMethod: function() {
           () => {console.log(this)}                  //the scope of the arrow function is myObject, so this will console.log 'myObject'                                                          
      }       
}

function example() {
      let x = () => {console.log(this)}               //THIS will refer to the global object because THIS will refer to the scope of the object that owns it
      x();
}




      



			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			






//====================================================================== STRINGS ====================================================================== 

let name = "abel"
`You can add variables to strings like this ${name}`;                  //string interpolation
"this is a string";
let x = "hello" + "world" + 67;                                        //strings can be concantenated, 67 will be converted into a string
x[0]                                                                   //characters in strings can be accessed as if it was an array, but you can't mutate the string by doing x[0] = 'r'                
let z = "4" - 3;                                                       //this will return a number 1 because - will convert the string into a number;

'a' < 'b';                                                             // We are comparing the hexadecimal value of the letters in the string                                                                         
'!' < 'x';                                                             // the hexadecimal value of '!' is 0021, and the hexadecimal value of 'x' is 0078
                                                                       // '!' is lower in the hexadecimal chart than 'x' so this will return TRUE
'string' >= 'strong';                                                //keep in mind that EVERY letter in the string will be compared until a comparison returns false
                                                                       // 's', 't', 'r' are the same, so at this point, everything is true
                                                                       // but 'i' is less than 'o' in the hexadecimal chart, so the whole comparison return false

let num = 123123                                                        //.toLocaleString() will add commas to a number, but keep in mind that the number will be converted into a string
console.log(num.toLocaleString());                                      //will display '123,123'
num.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})		//.toLocaleString() has two arguments that you can use




//the following function enables adding two extremely large numbers without BigInt(not all versions of node.js and browsers can support BigInt)
//the logic of the following functions goes like this..

//elementary style adding...

//         111                //all the carries
//   345675366745             //we must iterate through the largest number, if both numbers are the same length, then no difference will be made
//         453323
//----------------
//   345675820068

function addNumbers(first = "9999523423423423435", second = "2762342342342342345") {
      let longestString;
      let shortestString;
    	if(first.length < second.length){                                 //you want to figure out if one string is bigger than the other
        	shortestString = first;
            longestString = second;
        }
        else{
        	shortestString = second;
            longestString = first;
        }
        	
        let carry = 0;
        let totalSum = "";
             
        for(let x = 0; x < longestString.length; x++){                           
        	let a = parseInt(longestString.charAt(first.length - 1 - x));
            let b = parseInt(shortestString.charAt(second.length - 1 - x));
            b = b ? b : 0;									
            let currentSum = a + b + carry;
            if(currentSum >= 10){
            	currentSum = currentSum.toString();
                carry = 1;
                totalSum += (currentSum.charAt(1).toString())
            }
            else{
                carry = 0;
                totalSum += (currentSum.toString());
            }  
        }   
        if(carry){
        	totalSum += carry;
        }
        totalSum = Array.from(totalSum).reverse();
        totalSum = totalSum.toString().replaceAll(",", "")
        console.log(totalSum);
            
    } 






// ==================================================== BASE (RADIX) ==========================================================================

/* 
	A base is a numerical system that uses symbols to represent numbers, the base that everyone is used to is base 10 (1, 2, 3, 4, ..... infinity);

 	Base 36
  		
		0
	 	1
	  	2
	   	3
	    	4
	     	5
	        6
	        7
	      	8
	        9
	        A		represents 10
	        B		represents 11
	        C		represents 12
		D		represents 13




	There are two functions that you can use to utilize these bases (the second argument has to be the same symbol that is used in the base)

  	const base36A = parseInt('a', 36)		//we get the number that is represented by 'a' in BASE 36, and that is 10
   	const letter = (13).toString(36)		//we get the number that is represents by '13' in BASE 36, and that is D

    

    	The only time that i ever used these bases was in leetcode to convert letters to numbers and vice versa
     	What you can do is create a mapping like this.. 

      		a -> 1
		b -> 2
  		c -> 3
        	..

  	you can use parseInt() and toString() to convert a to 1 and vice versa

	parseInt('a', 36) - 9							//this will convert 'a' into 1, this is useful for finding the location of a letter in the alphabet  a -> 1  b -> 2   c -> 3 ....  y -> 25  z -> 26
	
	const index = 2
	const letter = (index + 9).toString(36)					//this will convert 2 into 'b', this is usefull for getting letters in the alphabet based on their position   1 -> a   b -> 2   3 -> c  ....  25 -> y   26 -> z

 
*/


















//============================================================== OBJECTS ============================================================== 

let obj = new Object();				              // you can create objects using the constructor notation
let obj = {name: 'abel', age: '30'};			      // the typical way of creating objects in JS
obj['name'] = 'muro';				              // you can use array-notation to change values of objects
obj.age = 45;						      // the typical syntax of accessing a value of an object
'name' in objectOne;					     // returns true if 'name' is a property in objectTwo
delete objectOne['name'];				     // deletes a property from the object


//Rememeber that Object is a CLASS with its own methods that can be used for objects
let objectOne = {name: "abel"};				    
let objectTwo = {age: "29"};
Object.assign(objectOne, ObjectTwo);                         // assign will add all the properties from the second argument to the first argument (creates a shallow copy)
Object.freeze(objectOne);                                    // freeze will prevent you from adding or changing properties on the object
Object.seal(objectOne);                                      // seal will let you change the properties of an object, but wont let you add new ones 
Object.defineProperty(objectOne, "birthplace", value: "richmond", writable: false) //lets you add a new property to the object, writable means that you cant change the value


//------------------------------------------------------------Object literal----------------------------------------------------------
let test_scores = { 
    math: 23, 
    science: 45, 
    history: 67, 
    P_E: "didnt show up", 
    my_method: function(){                                                  // you can also add functions/methods inside objects
        return this.math + this.science;}
};  
test_scores.math = 56;                                                      //this is how you access the elements of an object
test_scores['math'];                                                        //you can use array notation to access a property from the object
test_scores.my_method();                                                    // this is how you access an objects' method
test_scores.prototype.english = "45";                                       // all objects have this property called prototype that lets you add properties and methods 



//---------------------------------------------------------SPREAD OPERATOR with objects-----------------------------
//keep in mind that the spread operator will return a SHALLOW copy of the original object, 
//meaning that changes made to the new object will affect the original object

//clever way of joining two objects together
let example = {valueOne: 1, valueTwo: 2};
let anotherExample = {...example, valueThree: 3};                        


//you can also destructure objects.
let randomness = {value: 1, value: 2}
let {exampleOne, exampleTwo} = randomness;                                  //exampleOne and exampleTwo can be used like variables
let result = exampleOne + exampleTwo;




//-------------------------------------------------- CLONING objects------------------------------------------------------
//to make a DEEP clone of an object, do the following steps below...

let data = {name: "alice", age: "26"};   

const deepCopyOne = JSON.parse(JSON.stringify(data));                //creates a deep copy of data

const deepCopyTwo = structuredClone(data);                           //creates a deep copy of data






//-------------------------------------------------------------------- ARRAYS ------------------------------------------------------------------------------------------
//with const arrays, u can change the contents of the elements of the array, but not the order
//keep in mind that you can also use negative values as an index for an element 
//array[-1] = 5;

let array = ["first", "second", "third"];   
array[0] = "reasigned";                                                     //this is how you access the elements of the array
//keep in mind that changes to j will also affect changes to array
var j = array;                                                              //you can assign the entire array onto a variable and it will be concantenated   
array.push("new Element");                                                  //adds a new element to the array at the end of the array, also returns the length of the array
array.unshift("new element");                                               //adds a new element to the array at the beginning of the array, also returns the length of the array
array.splice(1, 1);                                                         //removes the element at index 1 and will remove 1 element after that index   
array.pop();                                                                //deletes the last element of an array, also returns the element that was deleted
array.shift();                                                              //deletes the FIRST element of an array, also returns the element that was deleted
array.sort();                                                               //will sort the array based on the first letter of the strings in the elements, keep in mind that JS will convert any number to string if there is no callback function                                        
array.sort((a,b) => {return a - b});                                        // sorting the array in ascending order
array.sort((a,b) => {return b - a});                                         //sorts numbers in descending order           
array.sort((a,b) => {                                                       //you can also sort an array of objects
      if(a.property < b.property)                                           //this particular function will sort an array of objects (in ascending order) 
             return -1;                                                     //based on the property that is being compared
      else if(a.property > b.property)                                  //property must be either a string or number
            return 1;
      else
            return 0;
})
Array.from();                                                               //create an array from a string or from a list of DOM elements


//SPREAD OPERATOR, keep in mind that this will create a shallow copy of the arrays,
//meaning that any changes made to arr3, will affect the affect arr1 and arr2
let arr1 = [1,2,3];
let arr2 = [4,5,6];
let arr3 = [...arr1, ...arr2]    //[1,2,3,4,5,6]


//DECONSTRUCTURING ARRAYS
let someArray = [1, 2];
const [first, second] = someArray;                                    // first and second now reference specific elements in the array 
let someValue = first + second;                                       // and they can be used as variables


//CLONING arrays
const deepCopyOne = JSON.parse(JSON.stringify(data));                //creates a deep copy of data
const deepCopyTwo = structuredClone(data);                           //creates a deep copy of data


//Usefull prototype methods for arrays.
let myArray = [1,2,3,4,5];

myArray.filter((val, i, origArray) => {               //removes certain elements from the array and returns an updated version of the array
        if(element > 1)                               // however, it will not affect the original array
             return true;                             //element will be included in the new array
        else
             return false;                            //element will be excluded from the new array
})

myArray.map((val, i, origArray) => {                     //similar to forEach(), but returns an updated array and
        return element + 1;                             // doesnt affect the original array
})

myArray.forEach((val, i, origArrat) => {                 //will call a function for each element in the array, the whole point of this method is to access the elements
      console.log(val, i);                               //forEach() will not return an updated version of the array or affect the original array
})
			
myArray.every((val, i, origArray) => {			// this function will continue iterating through an array UNTIL the callback returns false
	if(true)					//this function returns true or false
	   return true;					//passes the test and will continue the iteration			
	else
	   return false;				//doesnt pass the test and will exit the loop
})
           			
myArray.some((val) => {					//this function will iterate through the array UNTIL it finds a specific element
	if(val == 5)					//the function will return true or false				
	  return true;					//once we return true, we exit the loop
})

myArray.find((val) => {				        //this function will iterate through the array UNTIL it finds a specific element
	if(val == 5)					//the function will return the element of the array
	  return true					//once we return true, we exit the loop
})
			
myArray.findIndex((val) => {				//this function will iterate through the array UNTIL it finds a specific element
	if(val == 5)					//the function will return the index of the element
	   return true					//once we return true, we exit the loop
})
			
myArray.flat(3);					//this function will 'flattened' an array 3 levels down
							/* 	[
								   [1,2,3, [2,3,4]],
								   [3,4,5, [2,[3,4]]],
							           [1,2,3]
								]
								
								[1,2,3,2,3,4,3,4,5,2,3,4,1,2,3]					
							*/
		
let accumulatedValues = myArray.reduce((accumulator, currentVal) => { // reduce() is a method to accumulate the values in an array, the array can also be strings and other primitives
      return accumulator + currentVal;                  // The first time that the callback is run, there will be no "return value of the previous calculation". So we can supply a second argument
}, initialValue);                                       // If supplied, the initial value may be used in its place. Otherwise the array element at index 0 is used as     
                                                        // the initial value and iteration starts from the next element    
							// the initialValue can be any primitive type or even a reference type
							// keep in mind that something needs to be returns after EVERY iteration
			
let accumulatedValues myArray.reduceRight((accumulator, currentValue) => { //same thing as above but the array is iterated from the right instead of left
	return accumulator + currentValue;
}, initialValue)			
			
			

//------------------------------------------------------------- SETS --------------------------------------------------------------------------------------------

//SETS are similar to arrays, except that the elements can only occur once in the set, if you add the same element to the set, it will not be saved
//sets are not iterable objects, u must use my_set.values() to return the iterable object of sets, THEN u can use "for of" loops to iterate 
let my_set = new Set([1 ,2 ,3 ,4 ,5 ,"whatever"]);                         //you dont have to initialize a Set with an array
my_set.add("new element");                                                 // adds an element to the end of the Set
my_set.delete("whatever");                                                 // deletes the specified element
my_set.has(1);                                                             // returns true if the value exists in the 
my_set.clear();                                                            // removes all elements in the set
my_set.values();                                                           // returns an iterator that can be used to iterate through the values in the array
my_set.keys();                                                             // returns an iterator that can be used to iterate through the keys in the array
my_set.entries();                                                          // returns an iterator that iterates with [key, value] pairs from a set





//-------------------------------------------------------------- MAPS -------------------------------------------------------------------------------------------
//MAPS are similar to objects, but the differences are that the properties can be any value type, and the maps remembers the original insertion of each element
//MAPS are basically linked lists, so that makes them iterable, so you can use a 'for of' to iterate through the map 
//MAPS cannot contain duplicate keys, if a duplicate key is added to the Map, then it will replace the other key in the map
let my_map = new Map([["name", "abel"],
                    ["age", 28],
                    ["city", "san francisco"]]);
my_map.get("age");                                                         //this method will return the value associated with the property "age"
my_map.set("new element", 56);                                             //adding a new element to the map, u can also use this method to change an existing element's value
my_map.delete("city");                                                     //deleting the element "city" from the map
my_map.has("name");                                                        // returns true or false if the map contains the specified element
my_map.values();                                                           // returns an iterator with all the values of the map (you can use this in a `for of` loop)
my_map.keys();                                                              // returns an iterator with all the keys of the map
my_map.entries();
my_map.forEach(function(value,key) {                                       //forEach() will call a function for EACH element in the map
    //code goes here
});

//REMEMEBER, you should NOT use the following lines of code
my_map["propety"] = 2;                                                     //you wont be able to use the get() methods to retrieve this value from the map


//although u can use arrays and objects as keys in a map, you must make sure that you use the reference to the objects in your get() and set() methods
let arr = [1,2,3];                                                         //creating a reference

//OK!
my_map.set(arr, "value")                                                   //you must save the reference for later use
my_map.get(arr)   // returns "value"                                      

//NOT OK!
my_map.set([1,2,3], "value");                                              //this will work
my_map.get([1,2,3]);                                                       //this will not work because both [1,2,3] are pointing to a different spot in memory








			
			
			
			
			
			
			
	










//==============================================================  CLASSES =============================================================================== 
//classes are blueprints that you use to define how an object is going to look like


//syntax for creating a class                  
class MyClass{
    constructor(grade) {                                              //every class MUST have a constructor
        this.grade = grade;                                           //you declare the properties of the object like this
    }
    get getGrade() {                                                 //get keyword is used for a method that 'gets' the properties for the class
      return this.grade;
    }
      
    set setGrade(newGrade) {                                          //set keyword is used for a method that 'sets' the properties for the class
      this.grade = newGrade;
    }
      
    static my_second_method() {                                        //static methods are not part of any object, they can be called my_class.my_other_method()
        return "omg";
    }     
      
    calculateGrade() {                                                //you can still define a method without any of the above keywords
        this.grade += "whatever";
    }

}
let myObject = new MyClass("F");                                   //declaring an object of my_class by calling the constructor
MyClass.my_second_method();				            //you can call static methods with this syntax
myObject.setGrade("B");                                             //calling method inside object
myObject.new_variable = "t";                                        //you can create new properties for a class like this: 






//inheritance: other_class will inherit all the methods from my_class
class other_class extends my_class{
    constructor(one) {
        this.one = one;
        super(one);                                                     //calling parent constructor in my_class
    }
    other_method() {
        return this.my_method();                                        //you can access the parent methods with "this."
    }
    get other_member() {                                                //The "get" keyword can be used for a method that will return a member of an object
        return this.one;
    }
    set other_member(x) {                                               //The "set" keyword can be used for a method that will change a member of an object
        this.one = x;
    }

}
let _object = new other_class("C+");
_object.my_other_method();







//this is a convenient way of categorizing certain functions/methods
//this is mostly used with javascript libraries like gsap
//gsap has functions like gsap.timeline() which require the new keyword
class class_one {
    constructor() {
            this.name="abel";
     }
 }

class_one.class_two = class {
      constructor() {
            this.age="28";
     }
}

let my_variable = new class_one.class_two();



















//============================================================== ERROR CATCHING ============================================================== 

//this will try a block of code, if there is any error within this block, then the catch(err) block will execute
try{
    //code goes here
    if(true) throw "anything goes here";                                                          
}
catch(err){
        //err = "anything goes here"
        //code goes here
}
finally{
    //block of code that will be executed regardless of the try/catch result

}
//Here are the different types of errors, the name of these errors can be accessed by err.name
SyntaxError;                                //example: "this is a string         
ReferenceError;                             //using a variable that has not been declared
TypeError;                                  //using the wrong type, for example, number.toString()
































//==============================================================  PROMISES ============================================================== 


//SYNCHRONOUS:  by default, javascript is synchronous... which means all the lines are placed in a stack and executed one by one

	console.log("a");                                           //all these lines of code are placed on a stack and executed in order
	console.log("b");                             
	console.log("c");
	
	//output: a b c




//ASYNCHRONOUS means NOT simultaneously. if a line of code is async, then it will be taken out of the stack, and will wait until the stack
//finishes executing before the async operation starts executing

	console.log(setTimeout("a", 0);                             //because setTimeout is async, it will be taken out of the stack 
	console.log("b");                                           //and will wait until the code below finishes executing
	console.log("c");
	
	//output: b c a




//Promise objects were designed to handle async events (calls to a server), and it will be resolved when the event is successful
//Promises are also useful for chaining callbacks together, which in turn prevent callback hell
//The reason why you want to use promises for an operation that takes a while to complete is because
// you may want to chain callbacks with then() AFTER the operation has finished executing
// All synchronous events are taken out of the normal stack of execution and will wait until 
// the stack finishes executing

//Some methods to use for Promises
const result = Promise.resolve(123);			//resolve() will automatically resolve a value to a promise
result.then(() => {});

const result = Promise.reject('error');			//reject() will automatically reject the returning promise with the given message
result.catch(() => {})

const results  = Promise.all([Promise.resolve('hello'), Promise.resolve('world')]);  // all() will accept an array of promises that must ALL be resolved for all() to be resolved
results.then((arrResults) => { console.log(arrResults)});	 	             // arrResults is an array that contains the results of the promises		    					
results.catch(() => {});						             //if one of the promises in the array is rejected, then all() will be rejected

const results = Promise.allSettled([Promise.resolve('hello'), Promise.reject('word')]); // .allSettled() will accept an array of promises, .allSettled() will ALWAYS resolve once all promises have been settled
results.then((arrResults) => {console.log(arrResults)});				//arrResults is an array that contains the results of the promises


//The code below will return a "promise" object, 
//in this case, it will take 5 seconds for the promise to resolve, 
//just assume that it will take 5 seconds for the server to respond
let myPromise = new Promise((resolve, reject) => {   
    setTimeout(() => {                  
        resolve("ok")                              //once this line of code has been reached, then the promise has been resolved
    }, 5000)
})

myPromise.then((results) => {                       //then() is a function that can be used to access the results of the promise
    let newResult = doSomethingWith(results);
    return newResult
})
.then((newResult) => {                              //you can also chain callbacks this way to prevent callback hell
    let newerResult = doSomethingElseWith(newResult);
    return newerResult;
})

doSomethingElse();                                  //this function will be called immediately after the Promise constructor is called 





























//============================================================== ASYNC/AWAIT ============================================================== 
//async and await makes promises even easier to write
//very often we will not need a reject function

//async means that the function will always return a promise
//await means that the next line of code in the async function will wait until the promise has been resolved or rejected

async function createPromise(number) {                                              
    let results = await new Promise((resolve) => { setTimeout(() => { results("ok") }, 5000)
    console.log(results);                 //this line of code will wait for the promise above, so you dont have to use .then() to chain together callbacks
    
    return results;                       //the async function will return another promise with these results  
};                                        //you dont have to return the results 

let promise = createPromise(10);
promise.then((results)=>{
    //do something with the results of the promise
});

doSomethingElse();                                                                  //this line of code will not be read by javascript UNTIL myPromise has been fulfilled or rejected
























//============================================================== BOOLEAN VALUES ============================================================== 
//falsey values are the following..
0
0n
null
undefined
false
NaN
""
//truthy values are anything BUT the values above


Boolean(10 > 2);                                                          //pre define function that returns true or false
10 > 2;                                                                     //using comparison values can have the same effect as above
10 == 2;                                                                    // this statement will also return true or false
10 === 2;                                                                    // must have the same value AND the same data type
10 !== 2;                                                                   // not equal value and not equal data type

&&                                                                       // logical and
||                                                                       // logical or    
!                                                                        // logical not

      
//take note on the line below
5 < 6 < 7;                                                              //comparison starts at the far left first
true < 7                                                                //boolean values get converted to 1 when using the < or > operator
1 < 7                                                                   //true will get converted to 1

//ternary operator
let password = "Darkness33";
let name = (password == "Darkness33") ? "correct pwd": "incorrect pwd";      //if (password=="Darkness33") returns true, then "correct pwd" will be assigned to name; if its false, then "incorrect pwd" will be assigned to name
                                                                            





      
      
      
      
      
      
      
      
      
      
      
      
      
      






//============================================================== LOOPS ==============================================================

//Do not use "for in" over an Array if the index order is important.
//It is better to use a "for loop", a "for of loop", or Array.forEach() when the order is important.

      
//ITERATING THROUGH ARRAYS AND ITERATORS
let my_array = ["hello", "world", "how", "are", "you"];
      
for(let x of my_array){                                    
      console.log(x);                                                  //x will be the values of the array ("hello", "world", "how", etc...)      
};      
for(let x in my_array){
      console.log(x);                                                  //x will be the indices of the array (0, 1, 2, etc...)
      console.log(my_array[x]);                                        //my_array[x] will be the values of the array ("hello", "world", "how", etc...)
}
      
      
//ITERATING THROUGH OBJECTS (you can't use 'for of' with objects because they are not iterable)
let my_object = {name: "abel", age: 28};                           
for(let y in my_object){                                              
       console.log(y);                                                //y will be the properties of the object (name, age, etc...)
       console.log(my_object[y]);                                     //my_object[y] will be the values of the object ("abel", 28)
};

      
      
//you can use break statements to break out of a loop
//you can use continue statements to "skip" the full iteration of one loop
for (let i = 0; i < my_array.length(); i++){                         //you can declare more than one variable next to i = 0, these variables can be used outside the loop
    //code you can use with i variable
};

let d = 0;
while(d < 10){
    //if(true){ continue;}                                            //continue will skip the code below and continue to the next iteration of the loop
    d++;
};


do{
    //code goes here
}
while(false);












	


     
// ========================================================== EVENT LOOP: CALL-STACK & QUEUE ==========================================================
// The event loop is a mechanism that we use as a workaround for javascript's single threaded nature
// Everytime we call a function in JS, we place the function call on the STACK
// An execution context is the environment of a function, this includes all the variables/objects, this, and parameters 
// call-stack is a collection of execution context's
      
function multiply(a, b) {                                   
      return a * b;
}                                   //this is the order in which the functions will be called (we will use FIFO stack technique)
                                                                                             ______________________
function square(n) {                            |                |                          |                      |
      return multiply(n, n)                     |                |                  |       |         |            v
}                                               |                |                  |       |         |         multiply() 
                                                |                |                  |       |         |    
                                                | multiply()     |                  |       ^         |
function printSquare(n){                        | squared()      |                  | squared()       |
      let squared = square(n);                  | printSquared() |                  | printSquared()  |
      console.log(squared);                     |________________|                  |_________________|
}
      
printSquared(4);


// using asynchronous operations with the call stack, keep in mind that when JS encounters an asynchronous line of code, 
// it is removed from the stack and placed in the webAPI thread, even though JS is single threaded, we can still call concurrent
// code because the browsers have these API's that are essentially another thread.
                        
 console.log("Hi");                    
                        
 setTimeout(() => {
       console.log("there")
 }, 5000);
                                                //EVENT LOOP
  console.log("ho");
                        
            //call stack                                                                    //webAPI's
                                                                    
       |                   |                                                        |               |
       | console.log("ho") |  //setTimeout() will be removed from the stack         |               |     //once setTimeout() finishes its delay, 
       | setTimeout()      |              -------------------------->               |  setTimeout() |     // it will be placed in the task queue    
       | console.log("hi") |  //and will be placed in the WebAPI 'stack'            |               | 
       |___________________|                                                        |_______________|

                     ^                                                                     |
                     |                                                                     |
                     |                                                                     |
                     |                                                                     |
                     |   //task queue                                                      |
            |                           |  <______________________________________________ |      
            |                           |
            |                           | 
            |    setTimeout()           |
            |___________________________|
            //keep in mind that the setTimeout() will only be placed in the call stack ONCE THE STACK IS EMPTY



//MICROTASK vs MACROTASK
/* 
	microtask: task that will complete straightaway after the code block is executed
 	macrotask: task that will complete AFTER the browser completes all of its tasks(microtasks) in the queue FIRST

  	Microtask has a higher priority compared to the Macrotask
   	Remember that we have two queues in the event loop
	Microtask queue and Macrotask queue
 	JS will first execute all tasks in the Microtask queue and then it will execute all tasks in the Macrotask queue
*/

		//macrotask (asynchronous)
	setTimeout(() => {console.log('task 1')}, 0)				

		//microtask (asynchronous)
	Promise.resolve(3).then((num) => {console.log('task ' + num)})

		//synchronous
	console.log('task 3')							


	// order of console logs
	1) 'task 3'
	2) 'task 2'
	3) 'task 1'








	       


	


//============================================================= AUDIO OBJECT ==============================================================================
//you can use the audio constructor to load mp3 or wav files.




//using HTML audio tag to load audio files
<audio src={"https://www.computerhope.com/jargon/m/example.mp3"} controls id="#audio" controlsList="nodownload" autoPlay loop></audio>
//  or
<audio controls id="audio" controlsList="nodownload" autoPlay loop>
      <source src="https://www.computerhope.com/jargon/m/example.mp3" />
</audio>





//using JS to load audio files
const audio = new Audio("https://www.computerhope.com/jargon/m/example.mp3");
audio.type = "audio/mp3";
audio.addEventListener("play", (e) => {
         //this event will trigger when the user plays the audio
})

try{
    await audio.play();                   //you always want to wait until the client receives the response from the server
    audio.volume = 4;                     //you can increase or decrease the volume with this property
}
catch(err){
      console.log("could not play audio");
}








//============================================================ COOKIES ==========================================================
// cookies have a capacity of 4kb
// cookies live on the client side, typically, cookies should be used to store data that is NOT sensitive, such as user's preferences
// by default, a cookie is deleted when the browser is closed

//keep in mind that cookies should always be assigned data that has 'name and value'
document.cookie = "username=john doe";                                              //all cookies must be in this format... "property: value"
document.cookie = "username=jane box";                                              //replacing the value in cookie username 
document.cookie = "username=john doe; expires=Thu, 08 Dec 12:00:00 UTC";            //you can set the expiration date for cookies
document.cookie = "username=john doe; expires=Thu, 08 Dec 12:00:00 UTC; path='/'"   //path='/' tells the browser which path/route the cookie belongs to
document.cookie = "username= ; expires=Thu, 09 Dec 1970 00:00:00 UTC; path='/'"     //to delete a cookie, just put the expiration date before today, also you should include the path="/" because some browsers might need it



function cookieExists(key) {
	var cookies = document.cookie;
	
	// Check if the cookie name is present in the string
	if (cookies.indexOf("user=") >= 0) 
	    return true
	else 
	    return false
	
}

function addCookie(key, value) {
	document.cookie = key + '=' value;
}

function updateCookie(key, newValue) {
  let oldCookieValue = '';
  key = key + "=";
  let allCookies = document.cookie.split(';');					//we split the cookie string into an array
	
  for(let i = 0; i < allCookies.length; i++) {
	    let cookie = allCookies[i];
	    while (cookie.charAt(0) === ' ') 
	      cookie = cookie.substring(1);
	    
	    if (cookie.indexOf(key) === 0) 
	      oldCookieValue = cookie.substring(key.length, cookie.length);
	    
  }
  //if you want to get the previous value of a cookie,
  let newCookieValue = oldCookieValue + newValue;
  document.cookie = key + "=" + newCookieValue;


  //if you want to add new data to a cookie
  let prevValue = JSON.parse(newCookieValue);	//at this point, you have either an object or an array, you can append data to these objects

}

//using .cookie twice wont overwrite the previous value assigned to .cookie
document.cookie = "usename=HotStuff69";
document.cookie = "password=cobra69";                                               //console.log() will display 'username=usename=HotStuff69;password=cobra69'
   

//it is strongly recommended that you use npm install js-cookies for the set and get methods for cookies, 
//cookies doesn't have any pre-build set and get methods, but there is an npm package that implements these methods
















//============================================================== SESSION ==============================================================================
//session is another way of storing data, similar to local storage and cookies
//sessions have a capacity of 5mb
//sessions are only for data on the same browser tab, and will be deleted when the browser tab closes
//sessions are only for the browser, they dont get sent to the server like cookies do with every request
//sessions are more similar to local storage than cookies

//you should use json.stringify() to pass data to the sessionStorage
//and json.parse() to get the data from the session

sessionStorage.setItem("key", "value");
sessionStorage.setItem("data" , JSON.stringify(object));
      
sessionStorage.getItem("key");                              //returns a string
sessionStorage.getItem("data");                             //make sure to JSON.parse() this JSON formatted data

sessionStorage.removeItem("data");
sessionStorage.clear();

sessionStorage.clickcount = 1;                             //a property that you can use to keep track of the number of clicks of the user













       
//======================================================= HTTP ===========================================================================     
// HTTP stands for hyper text transfer protocol, it's a protocol that describes how a web browser and a web server communicates with each other.
// The web browser will send a request to the web server and will wait for a response from the web server.
/* HTTP VERBS: are methods that we use to interact with the web server and database
	      GET method
	      POST method
	      DELETE method
	      PUT method
	             
	       
// CORS (Cross Origin Resource Sharing)	is a 'HTTP-header based mechanism' that allows a server to specify which domains/scheme/port are ALLOWED 
// to get resources from the server. CORS relies on another mechanism called Pre-flight requests, in these preflight request, it will contain the 
// http method (put, delete, post), the domain of the client, etc.., of the original request that is being made. The server will then check the 
// pre-flight request and send a pre-flight response back to the client. In this Pre-flight response, it will contain the http methods that 
// the server will permit the client to make.	
	       
// This allows web developers to control how their site reacts to cross-site requests 
// https://domain-name.com/....	     
	       
/* 
	Pre-flight request that is sent by the web browser to the web server			
		OPTIONS /resource/foo
		Access-Control-Request-Method: DELETE					<-------------
		Access-Control-Request-Headers: origin, x-requested-with
		Origin: https://foo.bar.org

	Pre-flight response that is sent by the web server back to the web browser
		HTTP/1.1 204 No Content
		Connection: keep-alive
		Access-Control-Allow-Origin: https://foo.bar.org
		Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE		<-------------
		Access-Control-Max-Age: 86400
		
	Since the pre-flight response contains the delete method in one of the headers,
	then that means the client can send delete requests to the server

*/










//================================================================== API's =====================================================================    
	       
// API means Application Programming Interface, it is an interface that is used between two programs to communicate with each other. 
// The two programs are called the Client and the Server. Typically, the Client will send a request to the server to either request 
// data or to update the database somehow. The server will receive the request and then will send a response back to the client. The response
// is either a message telling the client that the request is succefull/rejected, or the actual data that the client requested

// Alot of the times, the API may have alot of resources/data that a user can request. One way to 'organize' this data is by using API endpoint	
// API endpoints represent a digital location where the API receives requests about a specific resource 
// With API endpoints, you can request a specific resource from an API that has alot of resources.
// One good example would be the Twitter API, this API has endpoints for fetching posts, messages, followers, etc.. 
// Basically, you can use the API endpoint for fetching posts, another API endpoint for fetching messages, etc..
	       

	       
	       
	       
// We can use URL's to specify an endpoint of an API
fetch('https://horoscopes-ai.p.rapidapi.com/get_horoscope/aries/today/general/en');    
fetch('https://horoscopes-ai.p.rapidapi.com/get_horoscope/libra/tomorrow/general/en');
	       
	       
//------------------------------------------------------------ RESTful API's -----------------------------------------------------------------
// REST stands for REpresentation State Transfer. REST is the way that HTTP should be used. For an API to be restful, 
// it needs to use the following conventions(keep in mind that there are much more convetions that were not listed below)			
			
	       
/* 
	1) Separate client and server: any changes made to the code in the client should NOT affect the server in any way, and vice versa
           different clients can send requests to the same server and they all receive the same response with the same data
	   
	2) Stateless: Each request must contain all of the info necessary to be understood by the server WITHOUT being dependent on the
   	   server remembering prior requests. The server cannot store any session data from the client.
	 
	3) Communication between client and server: the server basically uses the HTTP methods to communicate with the client


	4) Response Codes: The server must send responses that contain one of the status codes below...
	
	200 (OK)			This is the standard response for successful HTTP requests.
	201 (CREATED)			This is the standard response for an HTTP request that resulted in an item being successfully created.
	204 (NO CONTENT)		This is the standard response for successful HTTP requests, where nothing is being returned in the response body.
	400 (BAD REQUEST)		The request cannot be processed because of bad request syntax, excessive size, or another client error.
	403 (FORBIDDEN)			The client does not have permission to access this resource.
	404 (NOT FOUND)			The resource could not be found at this time. It is possible it was deleted, or does not exist yet.
	500 (INTERNAL SERVER ERROR)	The generic answer for an unexpected failure if there is no more specific information available.
*/	       
	       
	       
	       
	  












	

	

//================================================= BITWISE OPERATORS =====================================================
//Every number, letter and symbol has a binary representation that is used by the computer
//Take the example below...
const a = 5; // 00000000000000000000000000000101
const b = 3; // 00000000000000000000000000000011



//you can get the binary representation of a number by using the following line of code
let num = 5;
(num >>> 0).toString(2);    //returns 00000000000000000000000000000101




console.log(5 & 3);	// returns 1   (00000000000000000000000000000001) 	
			/* 
   			   5	00000000000000000000000000000101
   			   3	00000000000000000000000000000011
       			  ---------------------------------------	//compares both binary representations and returns all COMMON 1's
	   		   1	00000000000000000000000000000001
   			*/

console.log(5 | 3);    // returns 7    (00000000000000000000000000000111)
			/* 
   			   5	00000000000000000000000000000101
   			   3    00000000000000000000000000000011
	 	          ----------------------------------------    // compares both binary representations and returns all 1's in BOTH numbers
	     	           7    00000000000000000000000000000111
   			*/

console.log(5 << 2)	// returns 20    (00000000000000000000000000010100)
			/* 
   		 	   5   00000000000000000000000000000101
	  		   2   00000000000000000000000000000010	    // will find the first occurence of 1 from the left,
			  --------------------------------------    // and shift the bits to the left
   			   20  00000000000000000000000000010100
   			*/

console.log(5 >> 2);	// returns 1      (00000000000000000000000000000001)
			/* 
   		 	   5   00000000000000000000000000000101
	  		   2   00000000000000000000000000000010	    // will find the first occurence of 1 from the left
			  --------------------------------------    // and shift the bits to the right
   			   1   00000000000000000000000000000001
   			*/

console.log(5 ^ 3)      // returns 6      (00000000000000000000000000000110)
			/* 
   			    5   00000000000000000000000000000101
	  		    3   00000000000000000000000000000011    //finds all the 1's in both binaries, but NOT the common 1's
	 		   --------------------------------------
       		            6   00000000000000000000000000000110
   			*/




      
      
      
      
     



             
             



	
             
             
             
             
             



//====================================================== MEDIA QUERIES WITH JAVASCRIPT =========================================
//you have more flexibility and control of the css properties when you use window.matchMedia than css media queries


let mediaquery = window.matchMedia("(max-width: 1050px)");                      //you can use any media feature here
mediaQuery.addEventListener("change", changeProperties);                        //the event must be a change event

function changeProperties(mediaQuery) {
     let elements = document.querySelectorAll(".someClass");                   
     if(mediaQuery.matches){                                                   //returns true if the viewport is 1050px 
            elements.style.width = "100px";
            elements.style.display = "flex";                                //you can change any css property this way 
     }
    else{
            //go back to default values for properties
    }
}


//or... you can use window.innerWidth and 'resize' for responsive design

window.addEventListener("resize", someEventHandler);

function someEventHandler() {
      if(window.innerWidth > 1000)
            document.querySelector(".someClass").style.color = "white";
      
      else
            document.querySelector(".someClass").style.color = "red";
            
}














	


//========================================================= REDEFINING NODE methods =============================================
                        
//the whole poing of redefining the function below is to define a conditional statement that must return false before we call the original removeChild()                
 
        const originalRemoveChild = Node.prototype.removeChild;               //saving a reference to original removeChild()
        Node.prototype.removeChild = (child) => {                             //redefining the removeChild() function
            if (child.parentNode !== this) {                                  // 'this' represents the parentNode that called removeChild()
                return child;
            }
            return originalRemoveChild.apply(this, arguments);                //apply() will call the original removeChild()
        }


















//============================================================== JQUERY ==============================================================


//------------------------------------------syntax:  $(element).action(speed, callback)   speed="slow", "fast" or milliseconds----------------------------------
//                                                  $(element).action(speed) is also allowed
//make sure to specify the ancestral elements to select a specific element


//the methods below can call a function AFTER the effect is finished
// if you call a function after the method .show(), the function will be called before the method finishes
$("#my_id");                                                    // ID selectors
$(".class_name");                                               // class selectors
$("*");                                                         // selects all elements
$("p").hide();                                                  // will hide all <p> elements, remember that .hide(speed, callback), speed can be in milliseconds, "slow" or "fast"
$("p").show();                                                  // will show all <p> elements, remember that .show(speed, callback) -> .show(1000, function(){}).... the function is executed after .show 
$("p").toggle();                                                // toggles between show and hide
$("p").fadeIn();                                                // element will fade in, also this method has the same parameters as .show and .hide
$("p").fadeOut();                                               // same as .show(), except it fades out
$("p").fadeToggle();                                            // same as .show(), except it toggles between fading in and out
$("p").fadeTo();                                                // same as .show(), except it has another parameter .fadeTo(speed, opacity, callback), opacity must be a number between 0 and 1, the element will fade to that opacity
$("p").slideDown();                                             // displays an element by "sliding down" from another element. .slideDown(speed, callback) -> the parameters are the same as .show()
$("p").slideUp();                                               // hides an element by "sliding up" towards another element... function syntax is the same as above
$("p").slideToggle();                                           // toggles between sliding up or down, function syntax is the same as .slideDown()
$("div").css("color", "red").slideUp().slideDown();             // CHAINING METHODS: the methods will be called in the order that it is written
$("div").wrap(<p></p>);                                         // wraps around <div> with a <p>


//inserting elements inside existing elements
$("div").append("<p> some element </p>");                        // appending element at the end of div element
$("div").prepend("<p> some element </p>");                       // appending element at the beginning of div element


//get and set methods for elements are below
$("p").text();                                                  //returns the text inside all <p> elements
$("p").text("<b> setting text for this element </b>");          //setting the specified text inside <p>, remember that you can also assign pre formatted text or any element inside .text()  
$("p").text(function(index, origText){ })                       //the function will be called and will return the content that will replace whaever is inside <p>...... also, index means the current element in the list of elements selected (if more than one <p> is selected)
$("<p></p>").text("this goes inside");                          //this will return a string: "<p> this goes inside </p>""
$("p").html();                                                  //returns the entire content inside <p> including any formatting tags (<b>, <pre>, etc...) as text
$("p").html("<b> setting pre formatted text </b>");             //setting text that is pre formatted by some tag                                                  
$("input").value();                                             //returns the value that a user inputted
$("div").attr("backgroundColor", "red");                        //changing the attribute background color of every <div> to red
$("div").attr("backgroundColor", function(index, origValue){}); //same as the callback function in .text()
$("div").attr({                                                 //you can change multiple attributes like this
    "backgroundColor": "blue",
    "textAlign": "center",
    "color" : "green"
});
$("div").remove();                                               //removes the selected element from the document, including any child elements
$("div").empty();                                                //removes the child elements from the parent containter
$("div").addClass("my_class other_class");                       //adding two new css classes to every element <div>
$("div").removeClass("my_class");                                //removing my_class from every element "div" 
$("div").toggleClass("my_class");                                //this method will toggle between addClass() and removeClass()

//dimension methods are below, remember that you can set a width/height for an element by .width(500)
$("div").width();                                               //returns the width of the element, excluding any padding, border or margin
$("div").height();
$("div").innerWidth();                                          //returns the width of the element, inludes padding but not border or margin
$("div").innerHeight();
$("div").outerWidth();                                          //returns the width of the element, includes padding and border, but not the margin
$("div").outerHeight();
$("div").outerWidth(true);                                      //returns the width of the element, inluding all padding, border and margin
$("div").outerHeight(true);
$(window).width();                                               //returns the width of the viewport, this can be extremely useful
$(window).height();

//jquery arrays
$.makeArray($("div"));                                            //returns an array



//--------------------------------------------event handlers, the above methods can go inside the functions() {} below that are nested inside the parameters-----------------------------------------------
$("p").click(function(){ $(this).hide() });                     //this keyword refers to the <p> element
$("p").hover(function(){});
$("input").focus(function(){});
$("p").on("click", function(){});                               //you can add more than one event handler inside the "on()" method
$("p").on({                                                     //same as above but just different syntax
    click: function(){},
    mouseenter: function(){},
    mouseleave: function(){}
});





//--------------------------------------------CSS with jquery syntax------------------------------------------------------------
$("div").css("background-color","red");             // changing the css attribute of every <div>
$("div").css("background-color");                   /// when you omit the second parameter, the method will return the value of background-color
$("div").css({                                      // you can set multiple attributes with this method
    "background-color" : "yellow",
    "color" : "red",
    "text-align" : "center"
});
$("div p");                                         // selects every <p> that is nested within every <div>
$["div, p, section"];                               // selecting all <div>, <p>, <section>
$("div[color=red]");








//---------------------------------------------ANIMATE with jquery--------------------------------------------------------------

//make sure to rememeber to set the position of the element as either relative, fixed, or absolute to actually move it
//you can animate almost ALL css properties, just remember that the syntax is paddingLeft instead of padding-left

$("div").animate({
    left: "250px",                          //moving the object towards a position that has a distance of 250px from the left of the viewport
    opacity: "0.5",                         //during the duration of the animation, the element will become half transparent
    height: "150px",                        //during the timeline of the animation, the element will become bigger and bigger until it reaches 150 px in height
    width: "150px",                             // and 150px in width        
    });
//if height:"+=150" then this means that 150 will be added to the current height of the element 
$("div").animate({ fontSize: "100px"}, "slow");     //the second parameter of .animate() can take slow, fast or a value in milliseconds, this means that the element will have a "slow" animation and stop until it reaches 100px


//when you create multiple .animate(), jquery will call the methods one by one
$("div").animate({height:"250px"});
$("div").animate({height:"250px"});
$("div").animate({height:"250px"});
$("div").animate({height:"250px"});
$("div").stop();                                //stops the current animation,  .stop(stopAll, goToEnd)  ->  stopAll is boolean, specifies whether to stop all queued animations, goToEnd is boolean, specified whether to go to end of animations 









//---------------------------------------document ready function-------------------------------------------

$(document).ready( function(){} );                              // this will call the specified function when the document has finished loading
$(function(){});                                              // this does the same thing as above








