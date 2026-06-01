/* 
              INDEX SIGNATURE

        You can use an index signature to statically type an index inside an object or array
        This is usefull for creating a statically typed object in which you need to use different
        property names

*/


type x = {
  [key : string] : string                  // [key: string] can represent any property name
}


type x = Record<string, number>            // this means [key: string] : number



// if you want to restrict the property names for an object, you can do the following

type names = 'carlos' | 'david' | 'mark' | 'stefan';

type x = Record<names, string>;
