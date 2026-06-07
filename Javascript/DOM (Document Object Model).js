
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

