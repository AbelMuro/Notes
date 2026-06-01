/* 
                      GENERICS

        You can use generics to dynamically type another data type
*/

type Box<T> = {                              // T can represent any data type
    example : T
}

const box : Box<string>;                     // this is how you use generics
