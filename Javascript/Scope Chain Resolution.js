/* 
          						          SCOPE CHAIN RESOLUTION
                                
			     Scope chain resolution is a technique that javascript uses to determine which declaration of variables to use 
    			 within a function. When a function uses a variable or object within its local scope, javascript will look for the 
			     declaration of the variable in the local scope first. If it doesn't find it there, then it will look for the 
    			 declaration in the outer scopes.

*/
							
							const x = 7;				        // javascript will not use this declaration
							function outermost(){
       						const x = 4;			      // javascript finds a declaration here
							    function outer(){
								      function inner(){
								          function innermmost(){
	    								      console.log(x);	   // we start scope chain resolution here and look to the outer functions
								      }
								    }							
							   }
							}
