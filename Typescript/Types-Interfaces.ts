/* 
                  TYPES and INTERFACES
                  
      Both keywords are used to statically type a custom data type to a variables/array/function
      
      Differences between types and interfaces

          - Interfaces can merge, but types can't

              interface A { x: number }
              interface A { y: number }           // A becomes { x: number; y: number }

          - Interfaces can use the extend keyword to extend a data type, but types can't

              interface A { x: number }
              interface B extends A {y: string}   // B becomes { x: number, y: string}

          - Types can use Unions, primites and tuples, but interfaces can't (at the top level)

              type A = string | number
              type A = string;
              type A = (x: number) => void;
              type A = Array<string>

*/



type customDataType = {
      x: number,
      y: string,
      z?: string,                        //the question mark means that the property is optional
      m: string | number,                //either string or a number value are acceptable
      [key: string] : number,            //this syntax can represent any property name 
      list: Array<string>,               //value must be an array of strings
      method: (value : string) => number //accepts the function with the following signature 
}

interface customDataType {
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






