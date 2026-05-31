/* 
                  TYPES and INTERFACES
                  
      Type keyword can be used to create a custom data type for a variable, object, array or function
*/



type customDataType = {
      x: number,
      y: string,
      z?: string,                        //the question mark means that the property is optional
      m: string | number,                //either string or a number value are acceptable
      [key: string] : number,            //this syntax can represent any property name 
      list: Array<string>,               //value must be an array of strings
}






// ===================================== IMPORTING AND EXPORTING TYPES =======================================



// ----------------- Types.ts

      export type MyType = {
            name: string
      }

      type OtherType = {
            name: string
      }

      export default OtherType;



// ------------------ index.ts

      import type OtherInterface from './Types';
      import type { MyInterface } from "./Types";

      export default OtherInterface;
      export type {Bookmark};













// ===================================== ARRAYS =======================================
/* 
    You can use the type keyword to statically type an array
*/

type Bookmark = {
      name: string,
      age: number
}

let myArr : Array<Bookmark> = [];
let myArr : Array<string> = [];
let myArr : Array<[string, number]> = [];                  //will only accept an array with 2 elements of a string value and a number value
let myArr : string[] = [];

















// ===================================== OBJECTS =======================================
/* 
   You can use types to statically type an object. 
   The object created from the interface must have the 
   same property names and data types as the type
*/

type User {
  name: string;
  id: number;
}

const user: User = {
  name: 'abel',        //must be 'name'
  id: 123,              //must be 'id'
  anyProperty: 2        //can be any and many properties
}













// ===================================== CLASSES =======================================
/* 
  You can use interfaces to statically type an object created from a class. 
  The object created from the class must follow the rules of the interface
*/

type User {
  name: string;
  id: number;
}
 
class UserAccount {
  name: string;
  id: number;
 
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
 
const user: User = new UserAccount("Murphy", 1);














// ===================================== FUNCTIONS =======================================
/*
    You can use a type to statically type the arguments and the return type of a function.
*/

type User{
    name: string,
    id: number,
}

function myUser(user: User){          //object passed as argument must be of type User
      
}   

function getUser(): User {            //object returned must be of type 'User'
      
}    

myUser({                             //objects passed to the function above don't have to be declared with :User
      name: 'abel',
      id: 123
});

