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
*/







//==================================================== STATIC TYPING ====================================================
/* 
    Interfaces and Types allow variables to have a static type. Keep in mind that typescript allows additional data types to be used

    any - allows any data type
    unknown - user must declare the data type
    never - this type will never happen
    void - a function that returns undefined or has no value
*/











