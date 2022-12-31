//==================================================================== TYPES =================================================================================
//javascript is a loosely typed language, meaning that the variables in JS are not bound to any particular type and can be assigned any type at any given time
//javascript has garbage collectors, meaning that javascript will automatically free up space when a variable or object is not used anymore
//javascript uses the stack and the heap to store data, the stack is used to store primitive values and references to objects, 
      // and the heap is used to store the actual objects and data structures
//also keep in mind, that in javascript, you dont need to put a semi-colon at the end of each line of code, javascript will do that for you

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





























// ====================================================================== SCOPES ====================================================================== 
// note, any variable defined outside a function or {} will have global scope, 
// any variables defined inside a function or {} will have local scope

// let variables can be used ANYWHERE inside the {}, where it is declared
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


//  var variables can be used ANYWHERE inside the function, where it is declared
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
            
       //const variables behave like let variables             
}



//-------------------------------------------------------VAR, LET, CONST and FUNCTION can be hoisted ----------------------------------------------------
//hoisting is a process where javascript hoists all variable declarations to the top of its scope, however, their values/definitions do not get hoisted
//keep in mind that functions get hoisted up with their definitions

Hoisting();                                               // this is still legal, but if you use a function expression, then it wont work
function Hoisting() {                                     // this is how hoisting really looks like    
     //var x = undefined;                                 // var variables get assigned the value of undefined
     //let y;                                             // let variables do not get assigned a value of undefined                                    
     //const z;                                           // const variables do not get assigned a value of undefined
       
      console.log(x);                                     // x will be undefined    
      console.log(y);                                     // will return a reference error
      console.log(z);                                     // will return a reference error
      
      var x = 10;                                         // this will be hoisted to the top of the top of this function
      let y = 4;                                          // this will be hoisted to the top of the top of this function
      const z = 5;                                        // this will be hoisted to the top of the top of this function
}























//====================================================================== STRINGS ====================================================================== 

let name = "abel"
`You can add variables to strings like this ${name}`;                  //string interpolation
"this is a string";
let x = "hello" + "world" + 67;                                        //strings can be concantenated, 67 will be converted into a string
x[0]                                                                   //characters in strings can be accessed as if it was an array                
let y = "2" + 2;                                                       //this will return a string '22'
let z = "4" - 3;                                                       //this will return a number 1 because - will convert the string into a number;

'a' < 'b';                                                             // We are comparing the hexadecimal value of the letters in the string                                                                         
'!' < 'x';                                                             // the hexadecimal value of '!' is 0021, and the hexadecimal value of 'x' is 0078
                                                                       // '!' is lower in the hexadecimal chart than 'x' so this will return TRUE
'string' >= 'strong';                                                //keep in mind that EVERY letter in the string will be compared until a comparison returns false
                                                                       // 's', 't', 'r' are the same, so at this point, everything is true
                                                                       // but 'i' is less than 'o' in the hexadecimal chart, so the whole comparison return false


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























//=========================================================== REG EXP ============================================================================
//REGEXP are used to create a pattern that can be used to select certain parts of a string

//syntax for regular expressions...  /pattern/modifiers

//modifiers             /i   perform an case-insensitive matching
//                      /g   perform a global match (doesnt stop at the first match)  
//                      /m   perform a multi-line match

//assertions            ^
//   

//BECAREFULL WITH THE SPACES IN BETWEEN THE EXPRESSION BELOW

/ [a-zA-Z] /         //Find a letter character
/ [^a-zA-Z] /        //Find a character that is NOT a letter
/ \w /	      //Find an alphanumeric character (letter and number)
/ \W /	      //Find an non-alphanumeric character (letter and number)
/ \d /	      //Find a digit
/ \D /	      //Find a non-digit character
/ \s /	      //Find a whitespace character
/ \S /            //Find a non-whitespace character
/ \b /	      //Find a match at the beginning/end of a word,    beginning like this: \bHI,      end like this: HI\b
/ \B /	      //Find a match, but not at the beginning/end of a word
/ \0 /	      //Find a NULL character
/ \n /	      //Find a new line character
/ \f /	      //Find a form feed character
/ \t /	      //Find a tab character
/ \v /	      //Find a vertical tab character
/ \n+ /           //Find a string that contains at least one n
/ \^n /           //Find a string that contains n at the beginning of it
/ [^n]/         //find any character that is NOT n
/ \n$ /           //Find a string with n at the end of it
/ \a* /           //find zero or more of `a`
/ . /             //will find all single characters from the string (its basically like splitting the string into an array)


//its a good idea to use String.match() to use a reg exp to check if the pattern exists in the string
//match will return an array with the characters that match the pattern, 
//if the string doesnt contain characters that match the pattern, then match will return null
let myString = "this is just an example for reg exp 1 2 3 4 5";
myString.match( / this /g );                       //will search for 'this' in the string
myString.match( / (this)|(is) /g );                //will search for 'this' and 'is' in the string
myString.match( / [1-4] /g);                       //will search for all numbers between 1 and 4 in the string
myString.match( / \d /g);                          //will search for a digit in the string
myString.match( / greetings\d /g);                //will search for 'greetings' and the first digit next to it
myString.match( / greetings\d+ /g);                //will search for 'greetings' and all the digits next to it 
myString.match( / \bLO /g);                        //will seach for a word that has 'LO' at the beginning of the word (will not select HELLO, but will select LOOK) 
myString.match( / \never\d+\.\d+ /g)               //you can chain together reg exp, this will select 'never' then any digit, then a period, then another digit
myString.match( / \.js$ /g);                      //the '$' is used to select the pattern at the END of a string



//using variables to define patterns with regexp
const str = "how are you today";
const p = "a";
const pattern  = RegExp(p, "g");
str.match(pattern);





























//============================================================= WEB WORKERS API ===========================================================================
//in the case where you want to load more than one script files. you can use web workers api to handle one script while the main thread handles the other.
//Generally, javascript is single threaded, but with web workers, they make it possible to run different processes on a different thread.

//--------------------------index.js or index.html------------------------------------

       if(window.Worker){
            let worker = new Worker("./scriptOne.js");                              //creating a Worker object

            worker.onmessage = function(e){                                         //passing a function that will handle all incoming responses from the worker
                console.log(e.data)             
            }            
            let button = document.querySelector("#selectButton");                   //clicking on this button will trigger a postMessage() that will send data to the worker
            button.addEventListener("click", () => {
                worker.postMessage("my first worker");
            })
       }




//---------------------- Worker.js ------------------------------------------------

      this.onmessage = function(e){
            let temp = e.data + "yes";                                              //e.data is the data that was sent by worker.postMessage in previous file
            this.postMessage(temp);                                                 //this postMessage will send a reply back to the main thread
      }


















//====================================================================== DATA STRUCTURES =============================================================================
 



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
Array.from();                                                               //create an array from a string or from a list of DOM elements


//SPREAD OPERATOR, keep in mind that this will create a shallow copy of the arrays,
//meaning that any changes made to arr3, will affect the affect arr1 and arr2
let arr1 = [1,2,3];
let arr2 = [4,5,6];
let arr3 = [...arr1, ...arr2]    //[1,2,3,4,5,6]


//DESTRUCTURING ARRAYS
let someArray = [1, 2];
const [first, second] = someArray;                                          // first and second now reference specific elements in the array 
let someValue = first + second;                                             // and they can be used as variables


//CLONING arrays


const deepCopyOne = JSON.parse(JSON.stringify(data));                //creates a deep copy of data
const deepCopyTwo = structuredClone(data);                           //creates a deep copy of data





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


































//============================================================== THIS ============================================================== 
//THIS is a keyword that refers to an object in javascript

//-----------------------------THIS in the global scope----------------------------


this;                                       //if you use THIS in the global scope, then it refers to the global object Window



//------------------------------THIS in regular functions------------------------------
//THIS in functions refers to the object that 'owns' the function
//remember, for an function to be owned by an object you made, 
//you must assign the function to one of the properties inside the object

//myObject 'owns' the function 'myMethod'
let myObject = {
      name: "abel",
      age: 29,
      myMethod: function() {                  //since we assigned this function to one of the properties of myObject, this function belongs to myObject 
            function inner(){}              //this inner function is not owned by myObject, it is owned by Window global object
            return this.name + this.age;   //THIS refers to myObject
      }
}

//Window 'owns' this function
function myFunction(){
    return this;                            //this will also return the global window object;
}


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


//using .cookie twice wont overwrite the previous value assigned to .cookie
document.cookie = "usename=HotStuff69";
document.cookie = "password=cobra69";                                               //console.log() will display 'username=usename=HotStuff69 password=cobra69'
   

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





































//==============================================================  CLASSES =============================================================================== 
//classes are blueprints that you use to define how an object is going to look like


//syntax for creating a class                  
class my_class{
    constructor(grade) {                                              //every class MUST have a constructor
        this.grade = grade;                                           //you declare the members of the object like this

    }
    my_method() { 
        return this.grade;
    }
    static my_second_method() {                                        //static methods are not part of any object, they can be called my_class.my_other_method()
        return "omg";
    }
}
let abels_object = new my_class("F");                                   //declaring an object of my_class by calling the constructor
abels_object.my_second_method();                                        //calling method inside object
object.new_variable = "t";                                              //you can create new members for a class like this: 






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






































//============================================================== OBJECTS ============================================================== 

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






































//====================================================================== PROTOTYPE ===================================================================
// All objects in javascript have a default property called prototype that lets you add methods and properties to that object.
// All objects in javascript also have a hidden property called [[Prototype]] that points to the object constuctor's methods and properties

let myObject = new Object();
let myObject = {whatever: 3};                                //remember that this is the same as 'new Object' (Object is a constructor function that has its own methods)
myObject.toString();                                              //these methods belong to the Object constructor
myObject.hasOwnProperty();                                        //these methods belong to the Object constructor
myObject.valueOf();                                               //these methods belong to the Object constructor

// even though myObject does not have the methods .toString(), hasOwnProperty(), valueOf() defined inside the {}. it can still use the methods
// because it has a built in property called prototype which points to those methods.


//-------------------------------------------------------------------prototype inheritance---------------------------------------------
// If we take for example Arrays, since Arrays are also objects in javascript. They also share the prototype property that points to the methods
// in the Object constructor while also maintaining its own set of methods

let myArray = new Array();
let myArray = [1,2,3];                                       //remember that this is the same as 'new Array()' (Array is a constructor that has its own methods)
myArray.push(5);                                                  //these methods belong to the Array constructor
myArray.pop();                                                    //these methods belong to the Array constructor
myArray.forEach(() => {})                                         //these methods belong to the Array constructor
myArray.toString();                                               //these methods belong to the Object constructor
myArray.hasOwnProperty();                                         //these methods belong to the Object constructor
myArray.valueOf();                                                //these methods belong to the Object constructor



//------------------------------------------------------------------- PROTOTYPE CHAIN ------------------------------------------------------------------
// visual example... (myArray is an object that has the property Prototype)

// let myArray = new Array([1,2,3])                               
//       |
//       |   
//       -> myArray -> [[prototype]]: Array  -> pop() 
//                                           -> forEach()
//                                           -> push()
//                                           -> ...
//                                           -> [[prototype]]: Object --------------------> toString()
//                                                                                        -> hasOwnProperty()
//                                                                                        -> valueOf()
//                                                                                        -> ...


//you can also use prototype to add new methods or properties to constructors

function constructor(){
      this.name = "abel";
      this.last = "muro";
      this.age = 678;
}

constructor.prototype.birthplace = "san francisco";
constructor.prototype = {                                  //you can also add new methods to constructors like this
      getName() {
          return this.name
      }
} 

let myObject = new constructor();                           //everytime you use constructor, the object will also have the new property birthplace
object.birthplace;                              








































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










































//============================================================== FETCH API ============================================================== 
// the fetch API can be used to make requests to servers or used to fetch a resource
//to display the data of a JSON file, you must use response.json() which will return a promise 
//to display the data of a text file, you must use response.text() which will return a promise
//by default, fetch will do a 'GET' request


fetch('/somePath', {                                                    //this will will return a promise..... 
      method: "POST",                                                   //POST, GET, PUT, DELETE
      credentials: "include",                                           //used for including credentials such as cookies
      headers: {                                                        //defines the data that will be sent to the server
          "Content-Type" : "application/json"                           //data will be formatted into json, you can also use 'application/x-www-form-urlencoded'
      },      
      body: JSON.stringify({data : "data"}),                            //this is the actual data that we are sending with the post request(it must be in JSON)
})
.then(response => { return response.text();                              // response is an object that contains the response from the server
                           response.json();                              // text() will parse the data into text, json() will be parse the json data into javascript
                 });                                                    // text() and json() will return a promise       
.then(data => {                                                         //using the parsed data
      //do something with the data                                      //can manipulate the DOM to display data
})




//making a POST request with FORMS

fetch('/', {
      method: "POST",
      headers: {
            "Content-Type" : "application/x-www-form-urlencoded"        // an example of x-www-form-urlencoded is...  form-name=contact&name=Carlos&email=abelmuro93%40gmail.com&message=I%20like%20your%20website!
      }
      body : encode({"form-name" : "contant", name: name, email: email, message: message});
})


function encode(data) {
      return Object.keys(data)                                                            //returns an array with all the property names but NOT the values
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))    //encodeURIComponent will replace certain characters like '&' with escape characters.
            .join("&");   //we convert the array into a string separated by &                    //sometimes a user will input an '&' in the form's input, the '&' has special meaning that identifies the start of a new field,
}                                                                                                // so we want to make sure that we replace the characters that have special meaning with escape characters, so it wont jepordize the data































    
//============================================================== SYNCHRONOUS ============================================================== 

//by default, javascript is synchronous... which means all the lines are placed in a stack and executed one by one


console.log("a");                                           //all these lines of code are placed on a stack and executed in order
console.log("b");                             
console.log("c");

//output: a b c








//============================================================== ASYNCHRONOUS ==============================================================
//asynchronous means NOT simultaneously. if a line of code is async, then it will be taken out of the stack, and will wait until the stack
//finishes executing before the async operation starts executing


console.log(setTimeout("a", 0);                             //because setTimeout is async, it will be taken out of the stack 
console.log("b");                                           //and will wait until the code below finishes executing
console.log("c");

//output: b c a








































//==============================================================  PROMISES ============================================================== 
//Promise objects were designed to handle async events (calls to a server), and it will be resolved when the event is successful
//Promises are also useful for chaining callbacks together, which in turn prevent callback hell
//The reason why you want to use promises for an operation that takes a while to complete is because
// you may want to chain callbacks with then() AFTER the operation has finished executing
// All synchronous events are taken out of the normal stack of execution and will wait until 
// the stack finishes executing


//The code below will return a "promise" object, 
//in this case, it will take 5 seconds for the promise to resolve, 
//just assume that it will take 5 seconds for the server to respond
let myPromise = new Promise((results) => {   
    setTimeout(() => {                  
        results("ok")                              //once this line of code has been reached, then the promise has been resolved
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
                                                                            





      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      




//============================================================== SELECTION STATEMENTS ============================================================== 


//-------------------------------------------------------- IF/ELSE-IF/ELSE ---------------------------------------------------------------------------------
let age = 25;
if(age > 19 && age < 34){                                                  //the if statement will only execute if the expression inside returns true
    //code goes here
}

else if(age == 15){
    //code goes here
}

else{                                                                       //will only execute if all the other if statements above are false
    //code goes here
};



//---------------------------------------------------------- SWITCH ----------------------------------------------------------------------------------

switch(some_variable_of_any_type){                                          //switch statements check the value of the variable with the cases below                       
    //cases use === when comparing values
    case 0:                                                                 //case can be any value of any type
        //code goes here
    break;                                                                  //breaks out of the switch block

    case "can be a string too": 
        //code goes here
    break;

    default:                                                                //if all cases dont equal the variable in switch(), then default will execute
        //code goes here

};













      
      
      
      
      
      
      
      
      
      
      
      
      






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









      
      
      
      
      
      
      
      
      








//============================================================== LABELS ==============================================================
    //labels start with the syntax "label: statements"

some_label:{                                                        //you can create any type of label with any type of identifier
    let i = 8;
    i++;
    i += 2; 
    break some_label;                                               //break can be used here as well as continue
    i += 3;
};











      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      






//============================================================== FUNCTIONS ==============================================================
//Functions are similar to the functions in math, they take an input(argument), process the input, and return an output
//keep in mind that the return statement should be on the same line as the output being returned from the function                


//-----------------pure function; this function does not mutate the arguments passed to it------------------------------------
function myFunction(a, b){                                      //a and b are called arguments   
    let c = a + b;
    return c;                                                                 //function will return a string
}
function_with_parameters(1, 2);                                               // this is how you call a function

//----------------inpure function; this function mutates the arguments passed to it--------------------------
function myOtherFunction(a, b){
      a = 1;
      b = 2;
      return a + b
}
myOtherFunction(5, 6)


//-------------------constructor function; this function lets you create objects---------------------------------
function myConstructor(name, age, city){                                     //This is a constructor function, it allows us to create objects
    this.name = name;
    this.age = age;
    this.city = city;
}
let myObject = new myConstructor("abel", 29, "San Francisco");


//---------------------------------different ways of accepting arguments in function-----------------
function destructuring({valueOne, valueTwo})                                  //you can pass an object that has two properties to this function
function defaultValues(a = 1, b , c = "string")
function manyArguments(...nums){                                              //you can use the spread operator to accept an infinite number of arguments
      nums.forEach((num) => {                                                 //nums is an array at this point                                               
            console.log(num);
      })
}
      
      
//--------------------------------- CALL(), APPLY(), BIND()------------------------------------------------------------
 function someFunc(nums){
      console.log(nums);
 }

someFunc.call(5, 6, ...);                                                     //will call a function by passing a certain number of arguments   
someFunc.apply([1,2,3], 4, ...)                                               //will call a function by passing arguments that can also be arrays
let anotherFunc = someFunc.bind(2);                                           //will create a new function that already has its parameters set to the arguments that you send it
anotherFunc();                                                                //this function will be called with default paramete nums set to 2


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



      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      

//---------------------------------------------------------------- CLOSURES --------------------------------------------------------
//Closures is a combination of a function and the lexical scope around that function
//in other words, a function A that is returned from B will have access to the scope of function A and its parameters 
// even though function A has already been executed


function outerFunction(x) {
     x += 5;
     x += 6;
     x -= 10;
     function innerFunction() {                                            //innerFunction has access to x because of its closure
         return x + 5                                                      // even though x was never defined in innerFunction
      }      
     return innerFunction();
}

console.log(outerFunction(3))                                             // will console log 9


// ----------------another example of closure------------------------------------
      
function outerFunction(x) {
      return function innerFunction(y) {                                  //keep in mind that makeAdder will return a reference to another function
            return x + y;                                                 // but it will NOT call the inner function
      };
}

const add5 = outerFunction(5);                                            // calling outerFunction will make innerFunction "remember" that x is 5                            
const add10 = outerFunction(10);                                          // calling outerFunction will make innerFunction "remember" that x is 10

console.log(add5(2));                                                     // will console log 7 because innerFunction remembers that x is 5
console.log(add10(2));                                                    // will console log 12 because innerFunction remembers that x is 10
     
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
//------------------------------------------------------CALL STACK----------------------------------------------------------------------------
//Everytime we call a function in JS, we place the function call on the STACK
      
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


//using asynchronous operations with the call stack, keep in mind that when JS encounters an asynchronous line of code, 
// it is removed from the stack and placed in the webAPI thread, even though JS is single threaded, we can still call concurrent
// code because the browsers have these API's that are essentially another thread.
                        
 console.log("Hi");                    
                        
 setTimeout(() => {
       console.log("there")
 }, 5000);
                                                //EVENT LOOP
  console.log("ho");
                        
            //stack                                                                    //webAPI's
                                                                    
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
            //keep in mind that the setTimeout() will only be placed in the stack ONCE THE STACK IS EMPTY

      
      
      
      
      
      
      
      
      
      
      
      




             
             
             
             
             
             
             
             



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


//event handlers, remember that these handlers can also be called inline as attributes
//also remember that these even handlers can be used on the "window" object
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








