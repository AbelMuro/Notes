// ===================================== FUNCTIONS =======================================
/*
    You can use a type to statically type the arguments and the return type of a function.
*/


function myUser(user: string){          //object passed as argument must be of type string
      
}   

function getUser(): string {            //object returned must be of type string
      
}    

let x : ReturnType<typeof setTimeout>;  //x will only accept the object/value that is returned from setTimeout 
