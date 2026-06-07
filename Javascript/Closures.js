/* 
                            CLOSURES
            
		   A closure in Javascript is the concept that allows functions to use variables and objects that are declared 
			 outside of its local scope. Variables being used inside a closure will not be garbage collected during the lifetime
    	 of the functions execution context.
*/

    				const x = 5;

       			function myFunc(){		//this function formed a closure with the x variable
	     					   console.log(x);
						}



// ------ complex example of using closures

    function closure() {
        let x = 5;
        return () => {                // even thought the execution context of the parent function has ended, the returned function will still
            x++;                      // have access to the x variable
            console.log(x);
        }
    }

    const increment = closure();
    increment();                  
