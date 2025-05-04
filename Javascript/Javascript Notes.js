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

							       HOISTING
			Hoisting is the process of taking the declaration of variables and hoisting them up to the top of its scope, javasscript 
   			will automatically assigned undefined as the value to those variables. The initial values of the variables are not hoisted. 
      			Var variables are hoisted up and can be used before its declaration. Let and Const variables are also hoisted up, but they
	 		can't be used before its declaration because of the temporal dead zone. The area between the declaration of the Let/Const 
    			variables and the top of its scope is known as the temporal dead zone, if the Let/Const variable is used in this zone, 
       			then an Error will be thrown.


   						function hoising() {
						   console.log(x)		// will log undefined
     						   var x = 5;
						}

      							       PROMISES
		    	A promise is an object that tells us when an asynchronous operation has been completed, or if something went wrong in the operation. 
       			The promise will have one of three states; pending, fulfilled or rejected. Promises are the modern way of handling asynchronous operations. 
	  		Before the invention of promises, asynchronous operations were handled by callbacks. But it was easy to fall into the callback hell 
     			(unmanagable mess of code). Promises solve the problem of the callback hell. In javascript, we use the Promise constructor to 
			create a promise object. These promise objects have .then() and catch() methods that each handle the fulfilled and rejected 
   			states of the promise. Keep in mind, that the promise constructor is synchronous, but the callback argument is asynchronous.

					const promise = new Promise((resolve, reject) => {
     						const success = true;
    						if(success)
     						    resolve('success');
	    					else
	   					    reject('rejected');
					})
     					promise
	  				    .then((result) => {			//will be called if promise resolves	
	  				       console.log(result);
					    })
     					    .catch((error) => {			//will be called if promise rejects
	  					console.log(error);
					    })
 

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
			                                        }, true);                //third argument specifies that the event listener will be triggered on the capturing phase
		        
		                   2) Target Phase: Once JS finds the button element, it will trigger the on-click event handler
		        
		                   3) Bubbling Phase: The event will then 'bubble' up to the top of the DOM tree. Starting from the 
		                                      button element, then finally to the html element. If any element (html, div) has an event listener for the 
		                                      bubbling phase of the event, it will be triggered.    
		        
			                                      div.addEventListener('click', () => {
			                                          console.log('Div clicked during bubbling phase');
			                                        });

	

					                 PROTOTYPE INHERITANCE
			   Prototype inheritance allow objects in javascipt to inherit methods and properties from 
      			   other objects. Every function constructor in javascript has a property called prototype. This prototype 
	    		   property is an object that has methods and properties that can be used by the objects constructed from the 
	  		   constructor. This same prototype object has ANOTHER property called prototype that points to the Object Prototype,
			   and this prototype has another collection of method and properties that can be used by the object itself.
      			   This is what creates the prototype chain in javascript. When a method inside an object is called, javascript 
	    		   will first look for the definition of the method inside the object, if it doesn't find it there, then it 
	  		   looks up the prototype chain for the definition. The examples below shows how prototype is used in javascript

				-------- VISUAL ---------
    
	    				[[Prototype]] is an internal reference that links an object/array to its prototype
					Every reference-type in javascript has this internal reference.
	    			   	and every instance of a function constructor also has this internal reference
	
	    				const array = [];  		 //this is the same as new Array()
					   |
					   |
					   |
					   |
					    ---> [[Prototype]]  --> Array.Prototype = {
										push, 
										pop, 
										filter, 
										map, 
										[[Prototype]]  -->  Object.Prototype = {
									    }			     		   toString, 
														   hasOwnProperty, 
														   [[Prototype]] -------> null
														}	             	     							
 				------- CUSTOM PROTOTYPE -------

	     				function Person(name) {
		 			    this.name = name
					}
	
	    				Person.prototype.greet = () => {		// Using prototype will save memory in JS because you create only one instance of this method
					   console.log(`Hello ${this.name}`);		// declaring the greet method inside the constructor will create an instance of the method
					}						//   EVERYTIME we create an object from the Person() constructor
	
	    				const carlos = new Person('Carlos');
	 				carlos.greet();


				------- ARRAYS PROTOTYPE (most reference-types in JS follow this pseudo implementation) -------

  				        function Array() {			// pseudo code
	     				    this.array = [];
				        }

       					Array.prototype.push = () => {}
	    				Array.prototype.pop = () => {}
	 				Array.prototype.map = () => {}

      					const myArray = new Array();		// same as myArray = []
	   				myArray.push(1);
     


*/






//==================================================================== DATA TYPES =================================================================================
/* 
	Javascript has primitive types and reference types. 

*/

//------------------- primitive types
null;                               // a falsy value that represents an empty value, we use this value for variables we are done using
undefined;                          // a falsy value  that is automatically assigned to a variable that is not assign a value
Boolean;                            // true or false
Number;                             // represents integer
BigInt;                             // an extremely large number or extremely small number
String;                             // a string 
Symbol;                             // gives a unique value to a variable with an optional description, let x = Symbol("description");   x will always have a unique value


//------------------- reference types
Object;                             // a collection of properties and values that are used to organize data
Array;                              
Set;
Map;
Date;                               //object that returns the current date
Function;                           //functions are objects in javascript
RegExp;
Math;

//keep in mind that the non-primitive types (except function) above are actually constructors
let x = new Object({name: "abel"});                               //these two lines have the same effect                          
let x = {name: "abel"};

let y = new Boolean(4 > 5);                                       //these two lines have the same effect  
let y = 4 > 5;

let y = new Number(3);                                            //these two lines have the same effect
let y = 3;

let x = new Array([1,2,3]);                                       //these two lines have the same effect
let x = [1,2,3];













 


//=================================================== WINDOW OBJECT ========================================================
/* 
	 The window object represents the browsers window or the tab that displays the app or website. It is the parent of all objects
	 that are created in JS. All objects, variables, functions and classes are automatically members of the window object
	 Some useful properties in the window object are the following...
*/



window.navigator; 		//this will return an object that contains data relative to the operating system of the user (read-only)
window.scrollTo(0,0)
window.addEventListener('scroll', () => {})








	


//================================================= IMPORT AND EXPORT ==============================================================
/* 
	Modules are files with their own scope, you can use the import and export statements to
 	make the functions and classes within the module reusable
*/


// Module.js

function func1() {
   console.log('func1')	
}

function func2() {
   console.log('func2');
}

function func3() {
    console.log('func3');
}

export {func1, func2}
export default func3;



// Index.js
import func3, {func1, func2} from './Module.js';

func1();
func2();

















//============================================================== DOM ==============================================================
/*
	The DOM (Document Object Model) is an tree-like structure that represents the actual website. This structure is
 	made of nodes that each represents a section/part of the website. In Javascript, we have the Document object that
  	has a collection of methods and properties that we can use to manipulate the DOM and update the actual website.

		Node Methods and properties:
	
		   	const node = document.querySelector('');
		
			const parent = node.parentNode;
		 	const childNodes = node.childNodes;				//returns all child elements as an array (includes text nodes)
	   		const children = node.children;					//returns all child elements as an array (excludes text nodes)   
	   
	   		const firstChild = node.firstChild;				//returns the first child node of the element (includes text nodes)
	     		const lastChild = node.lastChild;				//returns the last child node of the element (includes text nodes)
	     		const firstElementChild = node.firstElementChild;		//returns the first child node of the element (excludes text nodes)
	       		const lastElementChild = node.lastElementChild;			//returns the last child node of the element (excludes text nodes)       
	       
	       		const nextSibling = node.nextSibling;				//returns the next sibling element
		 	const previousSibling = node.previousSibling;			//returns the previous sibling element
	
		 	const innerHTML = node.innerHTML;				//returns the HTML of the element, can also be used to set the HTML of the element
	   		const textContent = node.textContent;				//returns the text child node of the element, can also be used to set the text of the element
		
	       		node.setAttribute('class', 'myNewClass');			//sets an attribute with the specified value
		 	node.removeAttribute('class');					//removes an attribute
		 	const attribute = node.getAttribute('class');			//returns an attribute's value as a string
	
	   		node.appendChild(node);						//adds a child node to the element
	     		node.removeChild(node);						//removes the child node from the element
	       		node.replaceChild(newNode, oldNode);				//replaces an existing node with a new node
		 
		 	const clonedNode = node.cloneNode(true)				//clones an exact copy of a node, if argument is true, then the child elements also get cloned
*/





//------------------- querySelector()
/* 
	querySelector() will select a node from the DOM in various ways.
 	We can use the class, ID, attribute, and tag name.
*/
const node = document.querySelector(".myClass");        
const node = document.querySelector("div");
const node = document.querySelector("#myID");                     	
const node = document.querySelector("div[class]");
const nodes = document.querySelectorAll("p.class_name");		//returns an array of nodes





//------------------- getElementById()
/* 
	getElementById() will select a node from the DOM by using 
 	the ID attribute of the element
*/
const node = document.getElementById("random_ID");              





//------------------- getElementsByClassName()
/* 
	getElementsByClassName() will select multiple node from the DOM by using
 	the class attribute of the element. The returned value is an array of nodes
*/
const nodes = document.getElementsByClassName("my_class");






//------------------- getElementsByTagName()
/* 
	getElementsByTagName() will select multiple nodes from the DOM by using
 	the tag name of the element. The returned value is an array of nodes
*/
const nodes = document.getElementsByTagName("div");                                  






//------------------- forms[]
/* 
	forms[] will select a form from the DOM by using the ID attribute 
 	of the form element.
*/
const node = document.forms["form_id"];                                                       
const node = document.forms["form_id"]["input_name"];                                
const inputValue = document.forms["form_id"]["input_name"].value;                    





//------------------- Adding Nodes to the DOM
/* 
	You can dynamically create nodes with createElement() and put 
 	them in the DOM. Keep in mind that to actually place these
  	nodes, you will need to use append() on a node that already 
   	exists in the DOM
*/

const divNode = document.createElement("div");                                               
const textNode = document.createTextNode("hello world!");                                      
divNode.append(textNode)

const node = document.querySelector('.myClass');		
node.append(divNode);






//------------------- Removing Nodes from the DOM
/* 
	You can remove nodes from the DOM by using removeChild()
 	You will need to get the reference of the child node first
  	and pass it as an argument to removeChild
*/

const childNode = document.querySelector('#childNode');
const parentNode = document.querySelector('#parentNode');
parentNode.removeChild(childNode);                






//------------------- Event Handlers
/* 
	Event handlers are functions that are invoked when a certain event was 
 	triggered by the user. These event handlers are usually binded to elements 
  	in the DOM. Each event handler will have an argument 'e' that represents 
   	the event that was triggered. You can access meta data on the element and 
    	the event with this argument

     	With event handlers, you can only bind one function
*/

document.getElementById("id").onclick = (e) => {}                
document.getElementById("id").resize = (e) => {}                          
document.getElementById("id").onmouseover = (e) => {}                         
document.getElementById("id").onload = (e) => {}                                   
document.getElementById("id").onunload = (e) => {} 
document.getElementById("id").onchange = (e) => {} 
document.getElementById("id").onfocus = (e) => {
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
} 





//------------------- Event Listeners
/* 
	Event listeners are functions that wait until an event was triggered
 	on a certain element. The event listeners are also binded to the elements
  	of the DOM. Each event handler will have an argument 'e' that represents 
   	the event that was triggered. You can access meta data on the element and 
    	the event with the 'e' argument.

     	With event listeners, you can bind multiple functions.
*/

document.getElementById("id").addEventListener("click", myFunction);            
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






















// ====================================================================== SCOPE ====================================================================== 
/* 
	Scope refers to the accessibility of a variable. It determines where a
 	variable can be used. Javascript has 3 types of scope; Global, Function 
  	and Block scope

   	We use the three keywords; let, const and var, to assign a specific scope
    	to a variable
*/

//------------------- LET variables
/* 
	LET variables can be used ANYWHERE inside {}
 	This is BLOCK scope
*/
function LET_variables() {
      let x = 10;                                                       // let variables are block scope     
      let x = 11;                                                       // you CAN'T redeclare a let variable
            
      if(true) {
           let y = 10                                                   // 'y' can ONLY be used here
           console.log(x);                                                           // 'x' can be used here
      }             
      console.log(x);                                                                // 'x' can be used here  
      console.log(y);                                                                // 'y' CANT be used here
}



//------------------- VAR variables
/* 
	VAR variables can be used ANYWHERE inside the function, 
 	This is FUNCTION scope
*/
function VAR_variables() {
       var x = 10;                                                      // var variables have function scope
       var x = 11;                                                      // you can redeclare a var variable
            
       if(true){
            var y = 10;                                                
            console.log(x);                                              // x can be used here
       }    
            
       console.log(x);                                                    // x can be used here
       console.log(y);                                                    // y can be used here
            
      function more_VAR_variables() {                                     // nested function
            console.log(x);                                               // x can be used here      
            var z = 10;
      }
          
     console.log(z);                                                       // z CANT be used here           
}



//------------------- CONST variables
/* 
	CONST variables can be used ANYWHERE inside the {}, 
  	This is BLOCK scope. Keep in mind that if you assign
    	a primitive value to a CONST variable, you cannot update 
      	or change the value. If you assign an object to a CONST variable
       	you cannot change the reference to the object, but you can change 
	the values of the object
*/

function CONST_variables() {
      const x = 10;                                                      
      const x = 11;                                                       // you CAN'T redeclare a let variable
            
      if(true) {
           const y = 10                                                   // 'y' can ONLY be used here
           console.log(x);                                                // 'x' can be used here
      }             
      console.log(x);                                                     // 'x' can be used here  
      console.log(y);                                                     // 'y' CANT be used here
}























//============================================================== FUNCTIONS ==============================================================
//Functions are similar to the functions in math, they take an input(argument), process the input, and return an output
//keep in mind that the return statement should be on the same line as the output being returned from the function                


//------------------- Pure function
//The function does not rely on external variables in a closure
//The function produces the same result if the same arguments are passed to the function
//The function doesn't make any HTTP calls to a server
//The function doesn't mutate the arguments passed to it
	
function myFunction(a, b){                                      	     //a and b are called arguments   
    let c = a + b;
    return c;                                                                 //function will return a string
}
function_with_parameters(1, 2);                                               // this is how you call a function


//------------------- Constructor function
function myConstructor(name, age, city){                                     //This is a constructor function, it allows us to create objects
    this.name = name;
    this.age = age;
    this.city = city;
    this.method = function () {
    	return this.name + this.age + this.city;	
    }
}
let myObject = new myConstructor("abel", 29, "San Francisco");


//------------------- Function arguments-----------------
function destructuring({valueOne, valueTwo})                                  //you can pass an object that has two properties to this function
function defaultValues(a, b, c = "string")				      //you can initialize a parameter if the function call doesnt have enough arguments
function manyArguments(...nums){                                              //you can use the REST operator to group together all the arguments into an array
      nums.forEach((num) => {                                                 //nums is an array at this point                                               
            console.log(num);
      })
}
      
      
//------------------- CALL(), APPLY(), BIND()
// Call(), Apply(), Bind() will	'bind' a function into an object as if it belonged to that object.
// Traditionally in JavaScript, you can have objects that have their own properties and methods. 
// For example, object1 cannot use the methods of object2 and vice versa.
// Call(), Apply() and Bind() can solve this problem


//------------------- call()
/* 
	call() will bind the 'this' context of an object to a function.
 	The arguments passed to the function must be separated by commas
*/
var obj = { 
	num: 2,
	//add: function (a = 1) {					      //this is what it looks like when we use call() below 
	      //return this.num + a;
        //}
};
function add(a = 1){						  	      //call() can also work if add() was a method in an object
     return this.num + a;
}
	
add.call(obj, 2);	




//------------------- apply()
/* 
	apply() does the same thing as call(). The main difference
 	is that the arguments to the function must be inside of an array
*/

add.apply(obj, [2,3,4])	




//------------------- bind() 
/* 
	Bind() was design to bind 'this' of an object to a function and 
 	then returns a new function. The returned function will permanently have 
  	a new 'this' context
*/

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
	



//-------------------IIFE (immediately invoked function expression)
//IIFE are functions that get called on the spot

//keep in mind that IIFE functions are now part of a block scope
(function(){                                          //the moment you define the function, it gets called right away
    let a = 100;
})();




//------------------- Arrow functions
//Arrow functions help reduce the syntax of a regular function
//another thing to note is that arrow functions dont have their own 'this'
//meaning that if you use 'this' in an arrow function, then it will refer to the scope in which the function was defined


const arrowFunction = (a, b) => {return "something"};                         // This is an arrow function, it has different syntax but it does the same thing as a function

const arrowFunction = e => e + 1;                                             // this arrow function will automatically return e + 1, no return keyword is nesessary                                                                          


this;							// 'this' is the same as the 'this' in the function below
const myArrowFunc = () => {
	this;
}
	


//------------------- Generator functions 
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













  
	       
	       
	       
	       
	       
	       
	       
	       
      
      
//============================================================== THIS ============================================================== 
//THIS is a keyword that refers to an object that owns a function that was called

//-------------------THIS in the global scope


this;                                       //if you use THIS in the global scope, then it refers to the global object Window



//-------------------THIS in regular functions
//THIS in functions refers to the object that calls/invokes the function
//For an object to 'own' a function, the function must be one of the 
//properties of the object

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



//------------------- THIS in arrow functions
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
      let innerFunction = () => {console.log(this)}    //this arrow function doesnt belong to myFunction()
}


//arrow functions inside regular functions
window.myObject.myMethod()
let myObject = {
      name: "john",
      age: "24",
      myMethod: function() {
           () => {console.log(this)}                  //the scope of the arrow function is myObject, so this will console.log 'myObject'                                                          
      }       
}

function example() {
      let x = () => {console.log(this)}               //THIS will refer to the global object because THIS refers to the scope of the arrow function, and thats the example function scope
      x();
}




      



			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			






//====================================================================== STRINGS ====================================================================== 
/* 
	Strings are a primitive data type that groups together a sequence of characters.
*/

let name = "abel";


//------------------- String interpolation
/* 
	String interpolation lets you create a string with the value of a variable
*/
let interpolation = `You can add variables to strings like this ${name}`;       



//------------------- String concantenation
/* 
	String concantenatiion lets you use the '+' operator to put together
 	two or more strings, you can also put together certain data types with
  	strings as well.
*/
let x = "hello" + "world" + 67;                                        //67 will be converted into a string
let x = "hello" + null;						       //null will be converted into a string	
let x = "hello" + {name: 'abel'}				       //{name: 'abel'} will be converted into a string [object Object]



//------------------- Strings and array notation
/* 
	You can use array notation to access a certain character
 	in a string. Keep in mind that you cannot mutate the character
  	with this notation
*/
let x = 'hello world';
console.log(x[0]);			//will display the first character of the string                                                                              




//------------------- String prototype methods
/* 
	Strings have a variety of methods and properties that 
 	you can use to mutate the string.
*/

let str = 'hello world';

str.length;				//Returns the length of a string.
str.charAt(index);	 		//Returns the character at the specified index.
str.charCodeAt(index); 			//Returns the Unicode value of the character at the given index.
str.concat(string1, string2, ...);	 //Joins two or more strings with str
str.includes(searchString, atIndex);	//Checks if a string contains another string.
str.indexOf(searchString, fromIndex);	//Returns the index of the first occurrence of a specified value.
str.lastIndexOf(searchString, fromIndex); //Returns the index of the last occurrence of a specified value.
str.match(regex);			 //Searches a string for a match against a regular expression.
str.replace(searchValue, replaceValue);	 //Replaces part of the string with another value.
str.search(regex); 			 //Searches for a specified pattern and returns the index.
str.slice(startIndex, endIndex);	//Extracts a section of a string and returns it as a new string.
str.split(separator, limit);		//Splits a string into an array of substrings.
str.substring(startIndex, endIndex); 	//Returns the part of the string between the given indexes.
str.toLowerCase();		 	//Converts the string to lowercase.
str.toUpperCase();			//Converts the string to uppercase.
str.trim();				//Removes whitespace from both ends of a string.
str.trimStart() / str.trimEnd();	//Removes whitespace from the start or end of a string.
str.padStart(targetLength, padString);	//Adds the specified 'padString' to the start of the string until the string reaches the length specified with 'targetLength'
str.padEnd(targetLength, padString)	//Adds the specified 'padString' to the end of the string until the string reaches the length specified with 'targetLength'















//============================================================== OBJECTS ============================================================== 
/* 
	Objects are a container of data that organizes the data with properties (keys) and values.
 	The properties identify what a value is about. The values are the actual data.
*/

//------------------- Creating Objects
/* 
	You can create objects in javascript by using the Object Constructor
 	or using an object literal. Keep in mind that the Javascript engine 
  	will compile the object literal into the Object Constructor.
*/
let obj = new Object();				              // Object Constructor
let obj = {name: 'abel', age: '30'};			      // Object Literals



//------------------- Updating properties in Objects
let obj = {name: 'abel', age: '30'};
obj['name'] = 'muro';				              // you can use array-notation to change values of objects
obj.age = 45;						      // the typical syntax of accessing a value of an object
obj.location = 'Richmond';				      // you can dynamically add new properties to the object


//------------------- Deleting properties in objects
delete obj['name'];				     	      // deletes a property from the object
delete obj.name;



//------------------- Object methods
let test_scores = { 
    math: 23, 
    science: 45, 
    history: 67, 
    P_E: "didnt show up", 
    my_method: function(){                                                  // you can also add functions/methods inside objects
        return this.math + this.science;}
};  

test_scores.my_method()




//------------------- Spread operator with objects
/* 
	You can use the spread operator to get all the properties
 	of an object and assign them to another object.
  	If the object has reference-type values, then any changes
   	made to these values are going to reflect on both objects
	
*/

let example = {valueOne: 1, valueTwo: 2};
let anotherExample = {...example, valueThree: 3};    			   // anotherExample = {valueOne: 1, valueTwo: 2, valueThree: 3}                    



//------------------- Deconstructing Objects
/* 
	You can deconstruct objects by using the 'equal' sign 
 	operator and the properties of the object.
  	Once the properties are deconstructed, you can use them 
   	like variables
*/
//you can also destructure objects.
let randomness = {valueOne: 1, valueTwo: 2}
let {valueOne, valueTwo = otherValue} = randomness;     		 // valueOne and otherValue will be treated as variables                             





//------------------- Cloning objects
/* 
	If you assign an object to two variables, those two variables will have 
 	a reference to the object in memory. In other words, both variables will
  	use and update the same object in memory. To avoid this, you can clone
   	the object and assign it to one of the variables
*/


let data = {name: "alice", age: "26"};   

const deepCopyOne = JSON.parse(JSON.stringify(data));                //creates a deep copy of the 'data' object
























//============================================================== ARRAYS ============================================================== 
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








