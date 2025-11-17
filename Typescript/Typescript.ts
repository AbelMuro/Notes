/* 
      Typescript is a superset of javascript that is designed to add static typing to a language.


                                    STRUCTURAL TYPE CHECKING
      
      Typescript also uses a structural type system that checks the 'shape' of a object during type checking
      As long as the object has the specified properties and data types defined in the interface, it will pass 
      the type checking. This also implies that the object can have multiple properties that are not included in 
      interface.

                  interface User {
                      name: string;
                      id: number;
                  }
                  
                  const user = {            // this object doesnt have to be declared with an interface to be accepted as an argument to getUser();
                      name: 'abel',        
                      id: 123,
                      random: 'random',      //even though this property is not defined in the interface, it will still be accepted as an argument
                  }

                  getUser(user)
                        
                  function getUser(user: User){}





      HOW TO INTEGRATE TYPESCRIPT INTO A REACT APP

            0) npm install @types/react @types/react-dom

            1) Create a tsconfig.json file and put it in the root directory

                  {
                    "compilerOptions": {
                      "allowSyntheticDefaultImports": true,
                      "outDir": "./dist/",
                      "noImplicitAny": true,
                      "module": "es6",
                      "target": "es5",
                      "jsx": "react",
                      "allowJs": true,
                      "moduleResolution": "node"
                    },
                      "include": ["src", "global.d.ts"]
                  }
      
            2) Create a global.d.ts file and also put it in the root directory
               The code below will enable the following syntax
               import * as styles from './styles.module.css';

                  declare module '*.module.css' {
                        const classes: { [key: string]: string };
                        export = classes;
                  }

            
            3)  Then add the following lines of code to your webpack.config.js file
                  module.exports = {
                        module: {
                            rules: [    
                                {
                                  test: /\.tsx?$/,
                                  use: 'ts-loader',
                                  exclude: /node_modules/,
                                },                     
                            ]
                        },
                        resolve: {
                              extensions: ['.tsx', '.ts', '.js'],
                        },
                  }
*/







//==================================================== INTERFACES ====================================================
/* 
    Interfaces allow variables to have a static type. Keep in mind that typescript allows additional data types to be used

    any - allows any data type
    unknown - user must declare the data type
    never - this type will never happen
    void - a function that returns undefined or has no value
*/


//---------------------------------- Variables
let example : string;
let otherExample: number;



//---------------------------------- Objects
/* 
   You can use interfaces to statically type an object. 
   The object created from the interface must have the 
   same property names and data types as the interface
*/
interface User {
  name: string;
  id: number;
}

const user: User = {
  name: 'abel',        //must be 'name'
  id: 123              //must be 'id'
}






//---------------------------------- Classes
/* 
  You can use interfaces to statically type an object created from a class. 
  The object created from the class must follow the rules of the interface
*/
interface User {
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




//---------------------------------- Functions
/*
    You can use an interface to statically type the arguments and the return type of a function.
*/

interface User{
    name: string,
    id: number,
}

function myUser(user: User){}

function getUser(): User {}    //object returned must be of type 'User'

const user = {                 //objects passed to the function above don't have to be declared with :User
      name: 'abel',
      id: 123
}
myUser(user);







//==================================================== COMPOSING TYPES ====================================================
/* 
    You can create complex types using the Types keyword in typescript
*/


//---------------------------------- Unions
/*
      You can use unions to force a variable to only accept a 
      specific value. The syntax for unions is using the 'OR' operator.
*/


//------- Variables
type MyBool = true | false;
type MyStr = 'closed' | 'open' | 'opening' | 'closing';
type MyNum = 1 | 2 | 3 | 4 | 5;


//------- Function arguments
function getLength(obj: string | string[]) {     
  typeof obj;                  //this will return the type of the argument
}








//---------------------------------- Generics
/* 
      You can use genetics to force an array to only accept a value of a specific type
*/



//------- Arrays
type StringArray = Array<string>;            //must be a real data type
type NumberArray = Array<number>;



//------- Interfaces and generics
interface Backpack<Type> {                  //interfaces can also have generics
  add: (obj: Type) => void;                 //Type is just a placeholder
  get: () => Type;
}

let stringBackpack: Backpack<string>;       //declaring an object with the data type 'Backpack', you must pass a real data type












//==================================================== EVENT TYPES ====================================================
/* 
      Typescript also supports event types that can be used in event handlers
*/

import {ChangeEvent} from 'react';

const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
      e.target;
}























