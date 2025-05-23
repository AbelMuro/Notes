/* 

	Bookmarks:
 		1) Features of Javascript
   		2) Data types (primitive types, reference types)
     		3) Window Object
       		4) Import and Export (Modules)
	 	5) DOM
   		6) Scope (function scope, block scope, global scope, let, var, const)
     		7) Strings
       		8) Regular Expressions (ReqExp)
       		9) Boolean 
     		10) Functions (pure functions, constructors, generators, arrow functions, etc...)
       		11) Objects
   		12) THIS (context)
		13) Arrays
  		14) Sets
    		15) Maps
      		16) Classes
 		17) Loops (while, for, do while)
		18) Promises (promise, constructor, then, catch, async await)
  		19) Error Handling (try, catch, finally, Error Constructor);
    		20) Audio
      		21) Date


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




//------------------- Node reference methods
/* 
	Once you obtain a reference to an element using the methods above.
 	You can use the following methods to get additional meta data of
  	the node.
*/

const node = querySelector('.myElement');

const parent = node.parentNode;					//returns the parent node of the current node
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


const rect = node.getBoundingClientRect();			/* returns a object with the width, height, top, bottom, left, right (relative to viewport) css properties of the element as it appears on the browser
								   includes padding and border and transformations in the width and height values*/	

const styles = window.getComputedStyle(node);			/* returns an object containing ALL the css properties of the element as it appears on the browser
								   Excludes padding and border and transformations in the width and height values */

const offsetWidth = node.offsetWidth; 				/* returns the width and height of the element as it appears on the browser, including paddings and borders, but excludes transformations*/
const offsetHeight = node.offsetHeight;						

const clientWidth = node.clientWidth;				/* returns the width and height of the element as it appears on the browser, excluding paddings and borders and transformations */
const clientHeight = node.clientHeight;

/* 
   Once the browser is done processing all stylesheets, inline styles, and other css manipulations.
   getBoundingClientRect(), getComputerStyle(), offsetHeight and clientHeight 
   will return the values of what the element actually looks like in the browser
*/





















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































	




//=========================================================== REG EXP ============================================================================
/* 
	Regular Expressions are used to create a pattern that can be used to select certain
 	parts of a string

     	modifiers          /i   perform an case-insensitive matching
                           /g   perform a global match (doesnt stop at the first match)  
                           /m   perform a multi-line match

        sequence = any group of characters
	character-set = a set of characters with a common category (letters, numbers, symbols)

       [] means a character set		
       () can be used to group together a sequence or patterns
*/


//------------------- Find a letter character
string.match(/[a-zA-Z]/);


//------------------- Find a non-letter character
string.match(/[^a-zA-Z]/);

	
//------------------- Find a number character
string.match(/[0-9]/)


//------------------- Find a non-number character
string.match(/[^0-9]/);


//------------------- Find a pattern at the start of a string
string.match(/^[0-9]/);
string.match(/^sequence/)
string.match(/^s/)


//------------------- Find a pattern at the end of a string
string.match(/[0-9]$/);
	

//------------------- Setting a length for a pattern
string.match(/[0-9]{2,3}/)			//find 2 to 3 digits that are grouped together
string.match(/[0-9]{2}/)			//find exactly 2 digits grouped together
string.match(/[0-9]{5,}/)			//find a group of digits that has at least 5 digits
string.match(/[0-9]{1,4}/);			//find a group of digits that has at most 4 digits


//------------------- Grouping together patterns
string.match(/([0-9][a-zA-Z])/)				//a number must be placed before a letter '9b'
string.match(/([A-Z]8)/)				//a capital letter must be placed before 8


//------------------- Special characters
/* 
	Some characters in regular expression have special meaning and 
 	require the \ to use them. Keep in mind, that not all characters 
  	with special meaning require the \

   	/\w/	    		     if you took away the \, the regular express would look for the character 'w'
*/
string.match(/\w/)	             //Find an alphanumeric character (letter and number)  [^a-zA-Z0-9_]
string.match(/\W/)	             //Find an non-alphanumeric character (letter and number) [^a-zA-Z0-9_]
string.match(/\d/)	             //Find a digit
string.match(/\D/)	             //Find a non-digit character
string.match(/\s/)	             //Find a whitespace character
string.match(/\S/)                   //Find a non-whitespace character
string.match(/\b/)	             //Find a match at the beginning/end of a word,    beginning like this: \bHI,      end like this: HI\b
string.match(/\B/)	             //Find a match, but not at the beginning/end of a word
string.match(/\0/)	             //Find a NULL character
string.match(/\n/)	             //Find a new line character
string.match(/\f/)	             //Find a form feed character
string.match(/\t/)	             //Find a tab character
string.match(/\v/)	             //Find a vertical tab character
string.match(/./);		     //Finds any character (this character doesnt require \)
string.match(/m+/)		     //Finds one or more patterns of the preceding element (this character doesnt require \)	
string.match(/a*/);		     //Finds zero or more of the preceding character



//------------------- Escaping Special Characters
/* 
	Some characters in regular expressions have special meaning.
 	But if you want to match a pattern with those characters without
  	the special meaning, you need to escape them with \

   	/./		the . means to match ALL characters

    	/\./		if you want to create a pattern with . 
     			then you have to escape the character
*/
string.match(/\./);			//now you can use . in a pattern
string.match(/\*/);			//now you can use * in a pattern
string.match(/\+//);			//now you can use + in a pattern
string.match(/\^/);			//now you can use ^ in a pattern



//------------------- Conditional patterns (?)
/* 
	? is the conditional character. The string may or may not have 
 	the pattern and still be valid.

  	syntax: 
   		[char-set]?	        // this means 0 or 1 occurence of the preceding char-set
		m?			// m represents a single character, this means 0 or 1 occurences of the preceding character

  		[char-set](?=pat)	// this will match if a single character from the char-set has 'pat' right after it (apat)
     		sequence(?=pat)		// 'sequence' can be any group of characters, this will match only if 'sequence' has 'pat' right after it (wordpat)	
       		m(?=pat)		// m represents a single character, this will match only if 'm' has 'pat' right after it (mpat)
     
*/
string.match(/[0-9]?/)			//matches 0 or 1 digit
string.match(/[a-z](?=4)/)		//matches any single lower-case letter, but only if '4' comes right after it
	


//------------------- Conditional OR (|)
/* 
	| is a conditional character. You can use two patterns with this character
 	and the regular expression will match if the string contains one or both 
  	of the patterns

	syntax: 
 		/sequence-one|sequence-two/       // this will match if the string has either sequence
   		/m|m/				  // this will match if the string has either single character
     		/[char-set]|[char-set]/		   //this will match if the string has at least one character from either char-set
   
*/
string.match(/hello|world/);			// this will match if the string has 'hello' or 'world'
string.match(/x|y/)				// this will match if the string has 'x' or 'y'
string.match(/[a-z]|[0-9]/);			// this will match if the string has at least one lower-case letter or at leastone digit	



//------------------- Requirements
/* 
	You can use the ?=.* to create a requirement in a string.
 	This is most usefull in <input/>

  	syntax:
   		(?=.*[char-set])		// input must have at least one character from the char-set
     		(?=.*sequence)			// sequence can be any group of characters
       		(?=.*m)				// m can be any single character
*/
<input type='text' pattern="(?=.*[0-9])(?=.*[a-zA-Z]).{6,}">

	






































//============================================================== BOOLEAN VALUES ============================================================== 
/* 
	Javascript uses truthy and falsy values to represent the boolean values of true and false.

 	The falsy values of javascript are the following...

  		0
		0n
		null
		undefined
		false
		NaN
		""
  
  	The truthy values of javascript is ANY value except for the values above  		
*/


//------------------ True and false
/*
	The most basic primitive value, true and false.
*/

const x = true;
const y = false;




//------------------ Expressions that return true or false
/* 
	Most operators and conditional statements rely on the boolean
 	values of true and false
*/

if(10 > 2)
if(10 === 2)
if(10 !== 2)								// logical not
if(true && false)							// logical and
if(true || false)							// logical or
const name = true ? 'abel' : 'carlos';					// ternary operators rely on an expression that resolves to a boolean value























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






























//============================================================== ARRAYS ============================================================== 
/* 
	Arrays are a data structure that groups together values of different data types.
 	Each value is indexed by an integer

*/


//------------------- Creating arrays
const myArr = new Array(64);						     // creating an array of 64 empty slots
const myArr = new Array("first", "second", "third");			    // Creating an array with the Array constructor
const myArr = ["first", "second", "third"];				    // This will be compiled to new Array()



//------------------- Updating elements in the array
const array = ["first", "second", "third"];   
array[0] = "reasigned";                                                    // replacing the value at index 0



//------------------- Deleting elements in the array
const array = ["first", "second", "third"];   
array.splice(2, 1);							   // deleting element at index 2 from the array
const deletedElement = array.pop();					   // deleting the last element in the array
const deletedElement = array.shift();					   // deleting the first element in the array




//------------------- Spread operator with arrays
/* 
	You can use the spread operator to get all the values of one array
 	and place them in a different array. Keep in mind, that if the values
  	contain reference types, then any changes made to these values will
   	reflect on both arrays
*/
const arr1 = [1,2,3];
const arr2 = [4,5,6];
const arr3 = [...arr1, ...arr2];



//------------------- Deconstructing arrays
/* 
	You can deconstruct an array by assigning the values of an 
 	array to different variables. Keep in mind, that if the values 
  	that were deconstructed have reference types, then any changes made
   	to the variables will reflect on the original array
*/

const someArray = [1, 2];
const [first, second] = someArray;                                    // first and second now reference specific elements in the array 


//------------------- Cloning arrays
/* 
	You can make a deep clone of an array by using the JSON.stringify()
 	and JSON.parse() methods
*/

const array = [1,2,3,4];
const deepCopyOne = JSON.parse(JSON.stringify(array));               




//------------------- Traversing through arrays
/* 
	Arrays are iterable objects, you can use a for loop or a 
 	prototype method to traverse through the elements
*/

for(let val in array){}

for(let key of array){}
array.forEach((val, i, origArray) => {                 		    	    //traverses through the array  
      console.log(val, i);                               		   
})
const udpatedArray = myArray.filter((val, i, origArray) => {                //traverses through the array and removes certain elements from the array
        if(element > 1)                               			    
             return true;                             			    	//element will be included in the new array
        else
             return false;                            			    	//element will be excluded from the new array
})
const updatedArray = myArray.map((val, i, origArray) => {                   //traverses through the array and returns an updated array
        return element + 1;                             		    
})		
const result = array.every((val, i, origArray) => {			    //traverses through the array UNTIL the callback returns false 
	if(val > 2)					
	   return true;							    //passes the test and will continue the iteration	(if every element returns true, result will be true)		
	else
	   return false;						    //doesnt pass the test and will exit the loop	(result will be false)
})      			
const result = array.some((val) => {					    //traverses through the array UNTIL the callback returns true
	if(val === 5)									
	   return true;							    //once we return true, we exit the loop (result will be true)
	else
	   return false;						    //we continue the loop (if every element returns false, result will be false)
})
const result = array.find((val) => {				            //traverses through the array UNTIL it the callback returns true
	if(val === 5)					
	   return true;							    //once we return true, we exit the loop (result will be the current value)
	else 
	   return false;						    //we continue the iteration (if every element returns false, result will be false)
})		
const result = array.findIndex((val) => {			            //traverses through the array UNTIL the callback returns true
	if(val == 5)							   
	   return true							    //once we return true, we exit the loop (result will be true)
})
const result = myArray.reduce((accumulator, currentVal) => {                //traverses through the array and accumulates the values (result will be the total accumulated value)
      return accumulator + currentVal;                  
}, initialValue);    							    //initialValue can be a primitive type or non-primitive type

let accumulatedValues myArray.reduceRight((accumulator, currentValue) => {  //same thing as above but the array is iterated from the right instead of left
	return accumulator + currentValue;
}, initialValue)




//------------------- Array Prototype methods and properties  
Array.from({ length: 64 }, (_, i) => i)					    //creating an array of length 64 and using a callback to populate each element
array.push("new Element");                                                  //adds a new element to the array at the end of the array, also returns the length of the array
array.unshift("new element");                                               //adds a new element to the array at the beginning of the array, also returns the length of the array
array.splice(1, 1);                                                         //removes the element at index 1 and will remove 1 element after that index   
array.pop();                                                                //deletes the last element of an array, also returns the element that was deleted
array.shift();                                                              //deletes the FIRST element of an array, also returns the element that was deleted
array.sort();                                                               //will sort the array based on the first letter of the strings in the elements, keep in mind that JS will convert any number to string if there is no callback function                                        
array.sort((a,b) => {return a - b});                                        //sorting the array in ascending order
array.sort((a,b) => {return b - a});                                        //sorts numbers in descending order           
array.flat(3);								   //this function will 'flattened' an array 3 levels down
										/* 	[
											   [1,2,3, [2,3,4]],
											   [3,4,5, [2,[3,4]]],
										           [1,2,3]
											]
											
											[1,2,3,2,3,4,3,4,5,2,3,4,1,2,3]					
										*/
	                                
				














			

//============================================================== SETS ============================================================== 
/* 
	Sets are data structures that organize data with keys and values, very similar to an array.
 	Sets do not allow duplicate values in the data structure. If a duplicate value is added, nothing
  	will happen.

   	Never try to mutate the set using array notation
    
    	set[2] = 'new value';			// dont do this!
*/

//------------------- Creating sets
/* 
	You can create a set with the Set() constructor
*/
let my_set = new Set([1,2,3,4,5,"whatever"]);                        	 





//------------------- Adding elements to a set
/* 
	You can use the add() method to add a new element
 	to the set
*/
my_set.add("new element");                                                 // adds an element to the end of the Set




//------------------- Deleting elements in a set
/* 
	You can use the delete() and clear() methods to 
 	delete all elements or one element in the set
*/
my_set.delete("whatever");                                                 // deletes the specified element
my_set.clear();                                                            // removes all elements in the set




//------------------- Finding elements in a set
/* 
	You can use the has() method to check if a set has
 	a certain value
*/
my_set.has(1);                                                             // returns true if the value exists in the 




//------------------- Traversing through a set
/* 
	Sets are not iterable objects like arrays are, so you
 	will need to use the value() method to return an iterator
  	that can be used to traverse through the values of a set
*/
const iteratorValues = my_set.values();                                    // returns an iterator that can be used to iterate through the values in the array
const iteratorKeys = my_set.keys();                                        // returns an iterator that can be used to iterate through the keys in the array
const iteratorKeyValue = my_set.entries();                                 // returns an iterator that iterates with [key, value] pairs from a set

for(let val in iteratorValues){
	//val will be the values of the set
}



























//============================================================== MAPS ============================================================== 
/* 
	Maps are the hash tables for Javascript. They are a data structure that maps keys to values.
 	Maps remember the original insertion of each element. Maps do not allow duplicate key values.
  	If a duplicate key is added, it will replace the other key.

   	Never try to mutate the maps using array notation
    
    	my_map["propety"] = 2; 				//dont do this!

*/

//------------------- Creating maps
/* 
	You can create a map with the Map() constructor
*/
let my_map = new Map([["name", "abel"], ["age", 28], ["city", "san francisco"]]);



//------------------- Adding keys and values to a map
/* 
	You can add an a key that maps to a value with the set() method
*/
my_map.set("new element", 56);                                             //adding a new element to the map, u can also use this method to change an existing element's value




//------------------- Getting values in a map
/* 
	You can get a value from the map with the get() method.
 	You have to pass the key to the value as an argument.
*/
const value = my_map.get("age");                                           //this method will return the value associated with the key "age"




//------------------- Deleting keys and values in a map
/* 
	You can delete a key from the map with the delete() method.
 	The value associated with the key will also be deleted.
*/
my_map.delete("city");                                                     //deleting the element "city" from the map




//------------------- Finding values in a map
/* 
	You can find a value in a map with the has() method.
 	You have to pass the key as an argument.
 	
*/
const result = my_map.has("name");                                        // returns true or false if the map contains the specified element




//------------------- Traversing through a map
/* 
	To traverse through a map, you have to use the values(), keys() and
 	entries() methods. These methods return an iterator that can be used
  	to traverse throught the keys and values of the map
*/
const iteratorValues = my_map.values();                                     // returns an iterator with all the values of the map 
const iteratorKeys = my_map.keys();                                         // returns an iterator with all the keys of the map
const iteratorValuesKeys = my_map.entries();				    // returns an iterator with the values and keys in an array [key, val]
my_map.forEach((value, key) => {                                            // forEach() will call a function for EACH key and value in the map
    //code goes here
});

for(let val in iteratorValues){
	
}








			
			
			
			
			
			
			
	










//==============================================================  CLASSES =============================================================================== 
/* 
	Classes are blueprints that you use to define how an object is going to look like
*/
               
class MyClass{
    constructor(grade) {                                              // every class MUST have a constructor
        this.grade = grade;                                           // you declare the properties of the object like this
    }
	
    get getGrade() {                                                  // a getter method, this method will return a property of the class
      return this.grade;
    }
      
    set setGrade(newGrade) {                                          // a setter method, this method will update a property of the class
      this.grade = newGrade;
    }
      
    static myMethod() {                                               // a static method, these methods are not part of any object
        return "omg";
    }     
      
    calculateGrade() {                                                // you can still define a method without any of the above keywords
        this.grade += "whatever";
    }
}

let myObject = new MyClass("F");                                    // instantiating MyClass and creating an object
MyClass.myMethod();				            	    // you can call static methods with this syntax
myObject.setGrade("B");                                             // calling the setted method inside object
myObject.newVariable = "t";                                         // you can create new properties for the object, but not the class






//------------------- Class inheritance
/* 
	Classes can inherit properties and methods from other classes 
 	by using the extends keyword
*/
class otherClass extends MyClass{
    constructor(one) {
        this.one = one;
        super(one);                                                   //calling parent constructor in MyClass
    }

    get getOne() {                                                    //The "get" keyword can be used for a method that will return a member of an object
        return this.one;
    }
    set setOne(x) {                                                   //The "set" keyword can be used for a method that will change a member of an object
        this.one = x;
    }	

    getParentPropert(){
	return this.grade;					      // accessing the grade property of the parent class
    }
	
    otherMethod() {
        return this.myMethod();                                       // accessing the methods of the parent class
    }
}

let _object = new otherClass("C+");
_object.otherMethod();
























//============================================================== LOOPS ==============================================================
/* 
	Loops allow us to repeat a certain logic. You can traverse through iterable objects like arrays and 
 	re-use code.
*/



//------------------- While Loop
/* 
	You can use the while loop to iterate a certain logic. The loop
 	will continue until the conditional expression returns false
	
*/
let count = 0;

while(count < 10){
    count++;
}





//------------------- For Loop
/* 
	You can use the For loop to iterate a certain logic. The loop
 	uses a counter and will continue to iterate until the counter
  	doesn't meet a certain condition

   	'for of' will iterate through the values of an object/array
    	'for in' will iterate through the keys/properties/index of an object/array
*/

for(let i = 0; i < 10; i++){
    console.log(i);
}

for(let val of array){				
     console.log(val)
}

for(let index in array){
      console.log(index);
}





//------------------- Do While Loop
/* 
	Do While loops are similar to while loops. The main difference
 	is that the loop will iterate at least once
*/

do{ 
   count++;
}
while(count < 10);




//------------------- Break and Continue Statements
/* 
	You can use Break statement to exit from the loop
 	You can use a continue statement to skip a block of code
  	in the current iteration and skips to the next iteration
*/
for(let i = 0; i < 10; i++){
    if(i === 4)
	 continue;
    else if(i === 6)
	 break;
}


























//==============================================================  PROMISES ============================================================== 
/* 
	Promises are objects that tells use when an asynchronous operation has been completed.
 	You can create a promise by using the Promise constructor
*/
const promise = new Promise((resolve, reject) => {
	if(true)
	    resolve('any value goes here')
	else
	   reject('error message can go here')
})





//------------------- .then() method
/* 
	You can use the .then() method to call a function when the promise
 	resolves. Keep in mind that you can chain together as many .then()
  	methods that you want. The .then() must return a promise for you to be 
   	able to chain them together
*/
promise.then((result) => {console.log(result)})
promise.then((result) => Promise.resolve(result)).then((result) => console.log(result));






//------------------- .catch() method
/* 
	You can use the .catch() method to call a function if the promise 
 	was rejected. This method will also catch any errors that are thrown 
  	inside .then()
*/
promise.then((response) => {
	if(response.status !== 200)
		throw new Error('error has occurred');
})
.catch((error) => {
    const message = error.message;
    console.log(message);
})





//------------------- Async and Await
/* 
	You can use Async and Await to make it easier to write promises.
 	It lets you write asynchronous code in a synchronous way.
  	Keep in mind, that declaring a function with async will not
   	automatically take the function out of the callstack.
    	When the await keyword is executed, everything below the await
     	keyword will be taken out of the callstack. But every above the await
      	keyword will NOT be taken out of the callstack

  	Async will make the function return a promise
   	Await will also return a promise
*/

async function usingAsyncAwait() {
	const response = await fetch('URL');					// expression on the right side of await MUST return a promise
	return response.json();
}

const promise = usingAsyncAwait();
promise.then(() => {})






//------------------- Prototype methods for Promises
/* 
	Promises have alot of usefull methods and properties that you can use
*/

const result = Promise.resolve(123);							//resolve() will automatically resolve a value to a promise
result.then(() => {});

const result = Promise.reject('error');							//reject() will automatically reject the returning promise with the given message
result.catch(() => {})

const results  = Promise.all([Promise.resolve('hello'), Promise.resolve('world')]);   // all() will accept an array of promises that must ALL be resolved for all() to be resolved
results.then((arrResults) => { console.log(arrResults)});	 	              // arrResults is an array that contains the results of the promises		    					
results.catch(() => {});						              // if one of the promises in the array is rejected, then all() will be rejected

const results = Promise.allSettled([Promise.resolve('hello'), Promise.reject('word')]); // .allSettled() will accept an array of promises, .allSettled() will ALWAYS resolve 
results.then((arrResults) => {console.log(arrResults)});				// arrResults is an array that contains the results of the promises




























//============================================================== ERROR HANDLING ============================================================== 
/* 
	In javascript, we have errors that are thrown automatically by javascript if
 	a logic doesn't follow the rules of javascript. Javascript will throw an instance
  	object of the Error() constructor.
    

	  	Syntax Errors: 	These are errors thrown by Javascript if we 
	   			are not using the right syntax
	
	        Reference Error: These are errors thrown by javascript if we
				 use a variable or function that hasn't been declared 
	    			
		Type Error: 	 These are errors thrown by javascript if we
	 			 perform an operation with an incompatible type
	     
	     			 	null()  or  '23.toUpperCase()
	
	  	Range Error:     These are errors thrown by javascript if we
	   			 use a value that is above or below its allowable 
	       			 range.
	
	    				let arr = new Array(-5);		//must be greater than 1
	
					let value = 10.12345;
					console.log(value.toFixed(150))		//argument must be between 1 and 100
*/



//------------------ TRY CATCH BLOCK
/* 
	You can catch errors thrown by javascript by using the try catch block.	
 	Keep in mind that all errors caught by the catch() block are instances of
  	the Error() constructor
*/

try{
    	const num = 4;
    	num();					// this will throw a reference error
}
catch(error){					
	const error = error.message;		// the message of the error
	const name = error.name;		// the name of the error
	const stack = error.stack;		// tells you where in the callstack, the error has occurred
}
finally{
    console.log('the finally block will always be executed')
}



//------------------ CUSTOM ERRORS
/* 
	You can create and throw a custom error using the Error() constructor.
 	Keep in mind, you should not mutate the 'cause' and the 'stack' properties
  	of the error object. The 'cause' property is read-only, and the 'stack' property
   	will contain the original stack trace that tells us where the error occurred.
*/

try{
	const error = new Error('custom error message', {cause: 'cause of the error'})
	error.name = 'custom error name';	// assigning a new name to the error
	error.message = 'update message';	// assigning a new message to the error
	console.log(error.stack);		// displays the stack trace and shows where exactly the error occurred
	console.log(error.cause);		// dispays the cause of the error	
	
	throw error;				// throw will stop the next line of execution and will skip to the catch() block
}
catch(error){
	const message = error.message;
	const name = error.name;
	const stack = error.stack;
	const cause = error.cause;
}
















      
      





	


     



	       


	


//============================================================= AUDIO ==============================================================================
/* 
	You can use the Audio constructor in Javascript to load an audio file.
 	The Audio constructor is a way of loading and playing music or sounds
  	without having to use the <audio/> tag
*/



//------------------ Creating Audio objects
/* 
	You can create audio objects with the Audio constructor.
 	You can pass the URL of a music file or the directory that has 
  	the file. It's always a good idea to see if the browser can play
   	a certain type of audio file, you can do this with the .canPlayType()
    	method...

	const result = audio.canPlayType(type)				//type refers to the mimetype of the audio file	

 		type = 'audio.mpeg'	if file is an .mp3
   		type = 'audio/ogg'	if file is an .ogg
     		type = 'audio/wav'	if file is an .wav
       		type = 'audio/wav'	if file is an .aac

  		result = 'probably'	means that the browser can play it
    		result = 'maybe'	means that the browser might support it
      		result = ''		means the browser doesnt support it
*/

const audio = new Audio();
const audio = new Audio("/path/to/file/music.mp3");


//------------------ Loading audio files
/* 
	You can use the 'src' property to load a music file with the Audio object
*/

const audio = new Audio("/path/to/file/music.mp3");
audio.src = '/path/to/file/music.mp3'



//------------------ Playing audio files
/* 
	You can use the .play() method to play the audio file
*/

audio.play();



//------------------ Pausing audio file
/* 
	You can use the .pause() method to pause the audio file
*/

audio.pause();



//------------------ Reloading audio files
/* 
	You can use the .load() method to play the audio
 	from the beginning
*/

audio.load();



//------------------ Setting the Volume of the audio
/* 
	You can use the 'volume' property to increase or decrease the 
 	volume of the music being played. The value must be an integer 
  	between 0 and 1
*/

audio.volume = 0.7;


//------------------ Events for Audio
/* 
	If you ever need an event listener for an audio object,
 	here are the common events that are triggered for audio

  	ended, play, pause, timeupdate.
*/

audio.addEventListener(event, callback);  



//------------------ Miscellaneous properties for Audio

console.log(audio.currentTime);					// gets the current time being played in the audio file in seconds
console.log(audio.duration);					// gets the total length of the audio file in seconds
console.log(audio.paused);					// returns true or false, indicating if the audio is paused or not
console.log(audio.readyState);					// returns an integer (0 - 4), it represents the loading state of the audio file
audio.loop = true;						// indicates if the audio should replay when it reaches the end
audio.muted = false;						// indiicates if the audio should be muted or not
audio.playbackRate = 1.3;					// indicates the speed of playback (1.0 is default)























//============================================================= DATE ==============================================================================
/* 
    You can use the Date() constructor to get the current date in different formats
    
    Epoch: January 1, 1970
*/

const date = new Date();                                              // returns  YYYY-MM-DDTHH:mm:ss.sssZ      ss = seconds     sss = milliseconds    z = timezone offset



//------------------ Getting current month
/* 
	You can get the current month by using the .getMonth() method.
 	The method will return an integer between 0 and 11, representing 
  	the month of the year
*/
const month = date.getMonth();                                      



//------------------ Getting current hour
/* 
	You can get the current hour by using the .getHour() method.
 	The method will return an integer between 1 and 24.
  	This method uses a 24 hour format
*/
const hour = date.getHours();                                         
hour = hour % 12;                                                     //converting to 12 hour format
hour = hour ? hour : 12;					      // 24 % 12 will return 0, so we just reassign the value to 12



//------------------ Getting current year
/* 
	You can get the current year using the .getFullYear() method.
*/
const year = date.getFullYear();                                      //this will return the current year



//------------------ Getting current day of the week
/* 
	You can get the current day of the week with the .getDay() method.
 	The method will return an integer between 0 and 6, representing the
  	current day of the week
*/
const day = date.getDay();                                            //this will return the current day of the week (0 represents sunday, 6 represents saturday)



//------------------ Getting the milliseconds between today and the epoch
/* 
	You can use the .now() method to get the milliseconds between today and
 	the epoch (January 1, 1970). 
*/
const milliseconds = Date.now();                                      //this function will return the current milliseconds between today's date and the epoch
const SevenMinutesIntoFuture = new Date(milliseconds + (7 * 60000))   //you can get a future date by adding milliseconds like this  (1 minute is 60000 milliseconds)

















     
	       
	  












	

	

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







