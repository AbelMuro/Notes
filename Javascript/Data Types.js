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
