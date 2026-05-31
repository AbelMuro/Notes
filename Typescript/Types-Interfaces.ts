/* 
                  TYPES and INTERFACES
                  
      Both keywords are used to statically type a custom data type to a variables/array/function

      Types should be used if you need better manipulation of the properties for the custom data type
      you can better decide which properties can be included based on some condition
*/



type customDataType = {
      x: number,
      y: string,
      z?: string,                        //the question mark means that the property is optional
      m: string | number,                //either string or a number value are acceptable
      [key: string] : number,            //this syntax can represent any property name 
      list: Array<string>,               //value must be an array of strings
}

interface customDataType = {
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






