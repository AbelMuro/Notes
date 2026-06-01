/* 
                                  CALL SIGNATURE

          You can use a signature to define how a function is supposed to look like
*/

type callback = (x : number) => void;        // function defined must contain x as an argument of type number 
type callback = {                            // another way of declaring a call signature 
  (): void                                   // const myFunc : callback() {};
}
