/*
                            LEXICAL SCOPE:
                            
			  Lexical scope refers to the way variable access is determined within functions. Javascript has a hierarchical 
			  scope structure, where the inner function has access to the variables declared in the outer function, but not the
			  other way around. Variable access is determined during the definition of the function and NOT during the execution
     		of the function.
*/
            function outerMost() {          //x can't be accessed here
               	function outer(){
                    const x = 2;  
                    function inner() {
                  	   function innerMost() {  //x can be accessed here
							             console.log(x);     
						           }           
                    }
						      }       
            }
