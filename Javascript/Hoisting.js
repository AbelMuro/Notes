/* 
                            HOISTING
    
    			Hoisting is the process of taking the declaration of variables and hoisting them up to the top of its scope, javascript 
       		will automatically assign undefined as the value to those variables. The initial values of the variables are not hoisted. 
          Var variables are hoisted up and can be used before its declaration. Let and Const variables are also hoisted up, but they
    	 		can't be used before its declaration because of the temporal dead zone. The area between the declaration of the Let/Const 
        	variables and the top of its scope is known as the temporal dead zone, if the Let/Const variable is used in this zone, 
          then an Error will be thrown.

*/


   						function hoisting() {
						       console.log(x)		// will log undefined
     						   var x = 5;

                  console.log(y);  // will throw an error
                  let y = 1;
						}
