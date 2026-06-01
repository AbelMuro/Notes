/* 
              INDEX SIGNATURE

        You can use an index signature to statically type an index inside an object or array
        This is usefull for creating a statically typed object in which you need to use different
        property names

*/


type x = {
  [key : string] : string                  // [key: string] can represent any property name
}
