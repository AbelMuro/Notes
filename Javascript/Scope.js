// ====================================================================== SCOPE ====================================================================== 
/* 
	Scope refers to the accessibility of a variable. It determines where a
 	variable can be used. Javascript has 3 types of scope; Global, Function 
  and Block scope

  We use the three keywords; let, const and var, to assign a specific scope to a variable
*/



//------------------- LET variables
/* 
	LET variables can be used ANYWHERE inside {}
 	This is BLOCK scope
*/
function LET_variables() {
      let x = 10;                                                       // let variables are block scope     
      let x = 11;                                                       // you CAN'T redeclare a let variable
            
      if(true) {
           let y = 10                                                   // 'y' can ONLY be used here
           console.log(x);                                                           // 'x' can be used here
      }             
      console.log(x);                                                                // 'x' can be used here  
      console.log(y);                                                                // 'y' CANT be used here
}



//------------------- VAR variables
/* 
	VAR variables can be used ANYWHERE inside the function, 
 	This is FUNCTION scope
*/
function VAR_variables() {
       var x = 10;                                                      // var variables have function scope
       var x = 11;                                                      // you can redeclare a var variable
            
       if(true){
            var y = 10;                                                
            console.log(x);                                              // x can be used here
       }    
            
       console.log(x);                                                    // x can be used here
       console.log(y);                                                    // y can be used here
            
      function more_VAR_variables() {                                     // nested function
            console.log(x);                                               // x can be used here      
            var z = 10;
      }
          
     console.log(z);                                                       // z CANT be used here           
}



//------------------- CONST variables
/* 
	CONST variables can be used ANYWHERE inside the {}, 
  	This is BLOCK scope. Keep in mind that if you assign
    	a primitive value to a CONST variable, you cannot update 
      	or change the value. If you assign an object to a CONST variable
       	you cannot change the reference to the object, but you can change 
	the values of the object
*/

function CONST_variables() {
      const x = 10;                                                      
      const x = 11;                                                       // you CAN'T redeclare a let variable
            
      if(true) {
           const y = 10                                                   // 'y' can ONLY be used here
           console.log(x);                                                // 'x' can be used here
      }             
      console.log(x);                                                     // 'x' can be used here  
      console.log(y);                                                     // 'y' CANT be used here
}
