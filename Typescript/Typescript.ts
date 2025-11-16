/* 
      Typescript is a superset of javascript that is designed to add static typing to a language.

*/




//==================================================== INTERFACES ====================================================
/* 
    Interfaces allow variables to have a static type. Keep in mind that typescript allows additional data types to be used

    any - allows any data type
    unknown - user must declare the data type
    never - this type will never happen
    void - a function that returns undefined or has no value
*/


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

function getUser(): User {}    //object returne







//==================================================== TYPES ====================================================
/* 
    You can create complex types using the Types keyword in typescript
*/















